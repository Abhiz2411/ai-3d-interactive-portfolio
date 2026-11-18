import express from "express";
import { existsSync, readFileSync } from "node:fs";
import { timingSafeEqual } from "node:crypto";
import path from "node:path";
import { ROOT, config } from "./config.js";
import { GeminiError, streamAnswer } from "./gemini.js";
import { CANNED, looksLikeInjection, validate } from "./guard.js";
import { check, consume, remainingFor, stats } from "./limits.js";
import { buildContents, SYSTEM_PROMPT } from "./prompt.js";
import { loadIndex, retrieve, tokenize } from "./retrieval.js";

if (!config.geminiKey) console.warn("[warn] GEMINI_API_KEY is not set; chat will fail.");
const idx = loadIndex();
console.log(`[index] ${idx.count} chunks, built ${idx.builtAt}`);

const DENSE_FLOOR = Number(process.env.DENSE_FLOOR ?? 0.57);
const app = express();
app.disable("x-powered-by");
if (config.trustProxy) app.set("trust proxy", "loopback");
app.use(express.json({ limit: "16kb" }));

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'"
  );
  next();
});

// ---------- launch gate (server-side, so changing a device clock does nothing) ----------
const safeEq = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};
const cookieOf = (req, name) =>
  (req.headers.cookie || "")
    .split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === name)?.[1];
const isOwner = (req) => !!config.ownerToken && safeEq(cookieOf(req, "owner") ?? "", config.ownerToken);
const isLive = (req) => config.devOpen || Date.now() >= config.launchAt || isOwner(req);

const comingSoon = readFileSync(path.join(ROOT, "server", "coming-soon.html"), "utf8").replace(
  "{{LAUNCH_AT}}",
  String(config.launchAt)
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use((req, res, next) => {
  // Owner preview link: /?preview=<OWNER_TOKEN> sets a cookie, then redirects.
  if (req.method === "GET" && config.ownerToken && req.query.preview !== undefined) {
    if (safeEq(String(req.query.preview), config.ownerToken)) {
      res.setHeader(
        "Set-Cookie",
        `owner=${config.ownerToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${req.secure ? "; Secure" : ""}`
      );
    }
    return res.redirect(302, "/");
  }
  if (isLive(req)) return next();
  if (req.path.startsWith("/api/")) return res.status(403).json({ error: "not_live" });
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Cache-Control", "no-store");
  // Static page with its own inline script/style (no user data, no external loads).
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; frame-ancestors 'none'"
  );
  res.type("html").send(comingSoon);
});

// ---------- chat ----------
const sse = (res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-store",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  return (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);
};

const REASONS = {
  minute: "You're sending messages quickly. Please wait a moment.",
  daily: "You've reached today's message limit. Please come back tomorrow.",
  global: "The assistant has hit its daily capacity. Please try again tomorrow.",
  busy: "The assistant is busy right now. Please try again in a few seconds.",
};

let breakerUntil = 0; // set when Gemini reports quota exhaustion

app.post("/api/chat", async (req, res) => {
  const v = validate(req.body);
  if (!v.ok) return res.status(400).json({ error: v.code, message: v.message });

  const ip = req.ip || req.socket.remoteAddress || "";
  const last = v.messages[v.messages.length - 1].content;

  if (looksLikeInjection(last)) {
    const send = sse(res);
    send({ t: "token", v: CANNED.injection });
    send({ t: "done", remaining: remainingFor(ip), sources: [] });
    return res.end();
  }

  if (Date.now() < breakerUntil) {
    return res
      .status(503)
      .json({ error: "upstream", message: "The assistant is resting for a moment. Please try again shortly." });
  }

  const gate = check(ip);
  if (!gate.ok) {
    res.setHeader("Retry-After", String(gate.retryAfter));
    return res.status(429).json({
      error: `rate_${gate.reason}`,
      message: REASONS[gate.reason],
      retryAfter: gate.retryAfter,
      remaining: gate.remaining,
    });
  }
  const slot = consume(ip);

  const ac = new AbortController();
  res.on("close", () => ac.abort());
  const send = sse(res);

  try {
    // Short follow-ups ("and his education?") retrieve better with the previous question.
    const prevUser = [...v.messages.slice(0, -1)].reverse().find((m) => m.role === "user");
    const query = tokenize(last).length < 4 && prevUser ? `${prevUser.content} ${last}` : last;

    const r = await retrieve(query, { signal: ac.signal });
    const offTopic = r.bestBm25 === 0 && (!r.usedDense || r.bestDense < DENSE_FLOOR);

    const sources = r.hits.map((h, i) => ({ n: i + 1, title: h.title, source: h.source, url: h.url }));
    send({ t: "meta", sources: offTopic ? [] : sources });

    if (offTopic) {
      send({
        t: "token",
        v: `I don't have anything about that in Abhijit's resume, LinkedIn or GitHub. Try asking about his projects, experience or skills, or reach him through the [contact section](${config.contactUrl}).`,
      });
    } else {
      for await (const piece of streamAnswer({
        system: SYSTEM_PROMPT,
        contents: buildContents(v.messages, r.hits),
        signal: ac.signal,
      })) {
        send({ t: "token", v: piece });
      }
    }
    send({ t: "done", remaining: slot.remaining });
  } catch (err) {
    if (ac.signal.aborted) return;
    if (err instanceof GeminiError && err.status === 429) {
      breakerUntil = Date.now() + 60_000; // stop hammering an exhausted quota
      send({ t: "error", code: "upstream", message: "The assistant is at capacity right now. Please try again in a minute." });
    } else {
      console.error("[chat]", err instanceof GeminiError ? `gemini ${err.status}` : err?.message);
      send({ t: "error", code: "server", message: "Something went wrong. Please try again." });
    }
  } finally {
    slot.release();
    res.end();
  }
});

app.get("/api/status", (req, res) => {
  const ip = req.ip || "";
  res.json({ remaining: remainingFor(ip), perDay: config.perIpPerDay, maxChars: config.maxUserChars });
});

if (process.env.SHOW_STATS === "1") app.get("/api/_stats", (_req, res) => res.json(stats()));

// ---------- static chat UI ----------
const dist = path.join(ROOT, "web", "dist");
if (existsSync(dist)) {
  app.use(express.static(dist, { index: "index.html", maxAge: "1h", setHeaders: (r, p) => p.endsWith(".html") && r.setHeader("Cache-Control", "no-cache") }));
}
app.use((_req, res) => res.status(404).type("text").send("Not found"));

app.listen(config.port, "127.0.0.1", () =>
  console.log(`[chatbot] http://127.0.0.1:${config.port}  model=${config.model}  live=${Date.now() >= config.launchAt || config.devOpen}`)
);
