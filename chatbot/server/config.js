// Central config. Values come from environment variables (or chatbot/.env, which
// is gitignored). The Gemini key is read here and nowhere else, and is never
// sent to the browser or logged.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env loader (no dependency). Real environment variables win.
const envFile = path.join(ROOT, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m || line.trim().startsWith("#")) continue;
    if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const int = (name, def) => {
  const v = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(v) ? v : def;
};

export const config = {
  port: int("PORT", 3001),
  geminiKey: process.env.GEMINI_API_KEY || "",
  // Newest Flash-Lite on the free tier; the fallback is tried if the primary 404s.
  model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
  fallbackModel: process.env.GEMINI_FALLBACK_MODEL || "gemini-3.1-flash-lite",
  embedModel: process.env.GEMINI_EMBED_MODEL || "gemini-embedding-001",
  embedDims: int("EMBED_DIMS", 768),

  // ---- rate limiting (protects the free-tier key) ----
  perIpPerMinute: int("LIMIT_PER_IP_PER_MIN", 3),
  perIpPerDay: int("LIMIT_PER_IP_PER_DAY", 15),
  // Global ceiling of chatbot answers per day (Pacific day, matching Gemini's
  // quota reset). Kept well under the lowest published Flash-Lite free RPD.
  globalPerDay: int("LIMIT_GLOBAL_PER_DAY", 350),
  maxConcurrent: int("LIMIT_MAX_CONCURRENT", 3),

  // ---- request shape ----
  maxUserChars: int("MAX_USER_CHARS", 500),
  maxHistoryMessages: int("MAX_HISTORY_MESSAGES", 6),
  maxOutputTokens: int("MAX_OUTPUT_TOKENS", 700),
  topK: int("RETRIEVAL_TOP_K", 6),

  // ---- launch gate: nothing but a coming-soon page is served before this ----
  launchAt: new Date(process.env.LAUNCH_AT || "2026-11-24T00:00:00+05:30").getTime(),
  ownerToken: process.env.OWNER_TOKEN || "",
  // Local development bypasses the gate.
  devOpen: process.env.DEV_OPEN === "1",

  stateDir: process.env.STATE_DIR || path.join(ROOT, "data", "state"),
  ipSalt: process.env.IP_SALT || "change-me-in-env",
  contactUrl: "https://abhijitzende.com/#contact",
  trustProxy: process.env.TRUST_PROXY !== "0",
};
