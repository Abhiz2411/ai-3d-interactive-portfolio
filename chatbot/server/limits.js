// Three layers protect the free-tier key:
//   1. per-visitor: N / minute (sliding window) and N / day
//   2. global: a hard ceiling of answers per Pacific day (Gemini's quota day)
//   3. concurrency: at most a few answers streaming at once
// Counters survive restarts via a small JSON file. Visitor IPs are never
// stored raw: only a salted hash, and only for the current day.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import path from "node:path";
import { config } from "./config.js";

const FILE = path.join(config.stateDir, "limits.json");

const pacificDay = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(new Date());

let state = { day: pacificDay(), global: 0, ips: {} };
try {
  const saved = JSON.parse(readFileSync(FILE, "utf8"));
  if (saved.day === state.day) state = saved;
} catch {
  /* first run */
}
const windows = new Map(); // ipHash -> recent timestamps (memory only)
let inFlight = 0;
let dirty = false;

const rollDay = () => {
  const today = pacificDay();
  if (state.day !== today) {
    state = { day: today, global: 0, ips: {} };
    windows.clear();
    dirty = true;
  }
};

// IPv6 visitors rotate within their /64, so bucket by that prefix.
const bucket = (ip = "") => {
  if (ip.includes(":") && !ip.startsWith("::ffff:")) return ip.split(":").slice(0, 4).join(":");
  return ip.replace(/^::ffff:/, "");
};
export const hashIp = (ip) =>
  createHash("sha256").update(config.ipSalt + bucket(ip)).digest("hex").slice(0, 24);

function persist() {
  if (!dirty) return;
  try {
    mkdirSync(config.stateDir, { recursive: true });
    const tmp = FILE + ".tmp";
    writeFileSync(tmp, JSON.stringify(state));
    renameSync(tmp, FILE);
    dirty = false;
  } catch {
    /* disk problems must never break chat */
  }
}
setInterval(persist, 10_000).unref();
for (const sig of ["SIGINT", "SIGTERM", "exit"]) process.on(sig, () => persist());

/** Check without consuming. */
export function check(ip) {
  rollDay();
  const id = hashIp(ip);
  const now = Date.now();
  const recent = (windows.get(id) || []).filter((t) => now - t < 60_000);
  const day = state.ips[id] || 0;

  if (state.global >= config.globalPerDay)
    return { ok: false, reason: "global", remaining: 0, retryAfter: secondsToPacificMidnight() };
  if (day >= config.perIpPerDay)
    return { ok: false, reason: "daily", remaining: 0, retryAfter: secondsToPacificMidnight() };
  if (recent.length >= config.perIpPerMinute)
    return {
      ok: false,
      reason: "minute",
      remaining: config.perIpPerDay - day,
      retryAfter: Math.ceil((60_000 - (now - recent[0])) / 1000),
    };
  if (inFlight >= config.maxConcurrent)
    return { ok: false, reason: "busy", remaining: config.perIpPerDay - day, retryAfter: 5 };
  return { ok: true, remaining: config.perIpPerDay - day };
}

/** Consume one unit (call right before spending quota) and take a concurrency slot. */
export function consume(ip) {
  rollDay();
  const id = hashIp(ip);
  const now = Date.now();
  const recent = (windows.get(id) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  windows.set(id, recent);
  state.ips[id] = (state.ips[id] || 0) + 1;
  state.global += 1;
  inFlight += 1;
  dirty = true;
  let released = false;
  return {
    remaining: Math.max(0, config.perIpPerDay - state.ips[id]),
    release() {
      if (!released) {
        released = true;
        inFlight = Math.max(0, inFlight - 1);
      }
    },
  };
}

export function remainingFor(ip) {
  rollDay();
  return Math.max(0, config.perIpPerDay - (state.ips[hashIp(ip)] || 0));
}

export const stats = () => {
  rollDay();
  return { day: state.day, global: state.global, globalCap: config.globalPerDay, inFlight };
};

function secondsToPacificMidnight() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(now);
  const g = (t) => Number(parts.find((p) => p.type === t).value) % 24;
  return 86400 - (g("hour") * 3600 + g("minute") * 60 + g("second"));
}
