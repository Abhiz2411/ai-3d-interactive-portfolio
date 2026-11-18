// Input validation and a cheap prompt-injection screen. Anything caught here
// is answered with a canned reply and never reaches the model, so attacks
// cost no quota. The system prompt is the second layer; the model is never
// given tools or secrets, so even a successful injection can only change the
// wording of a public answer.
import { config } from "./config.js";

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩]/g;

const INJECTION = [
  /ignore (all |any |the |your )?(previous|prior|above|earlier|system) (instructions?|prompts?|rules?|messages?)/i,
  /disregard (all |any |the |your )?(previous|prior|above|system)/i,
  /(reveal|show|print|repeat|output|leak|tell me)\b.{0,30}\b(system prompt|your (prompt|instructions|rules)|hidden (prompt|instructions)|initial prompt)/i,
  /what (is|are) your (system )?(prompt|instructions)/i,
  /you are (now|no longer)\b/i,
  /\b(jailbreak|DAN mode|developer mode|do anything now)\b/i,
  /pretend (to be|you are|that you)/i,
  /act as (if )?(you (are|were)|an? )(?!recruiter)/i,
  /(api[\s_-]?key|secret|password|token)s?\b.{0,20}\b(show|give|reveal|print|what)/i,
  /<\/?(system|assistant|context|instructions?)>/i,
  /\[\/?(INST|SYSTEM)\]/i,
];

export const CANNED = {
  injection:
    "I can only talk about Abhijit's work, projects and background. Ask me about his experience, GenAI projects or skills.",
  empty: "Ask me something about Abhijit, for example his projects, experience or skills.",
  tooLong: `Please keep questions under ${config.maxUserChars} characters.`,
  malformed: "That request didn't look right. Please try again.",
};

export const clean = (s) =>
  String(s ?? "")
    .replace(CONTROL, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * @returns {{ok:true, messages:Array<{role:string,content:string}>} | {ok:false, code:string, message:string}}
 */
export function validate(body) {
  const raw = body?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 40)
    return { ok: false, code: "malformed", message: CANNED.malformed };

  const messages = [];
  for (const m of raw.slice(-config.maxHistoryMessages)) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string")
      return { ok: false, code: "malformed", message: CANNED.malformed };
    // Assistant turns come from the client, so treat them as untrusted data too.
    const max = m.role === "user" ? config.maxUserChars : 1500;
    const content = clean(m.content);
    if (m.role === "user" && content.length > config.maxUserChars)
      return { ok: false, code: "too_long", message: CANNED.tooLong };
    messages.push({ role: m.role, content: content.slice(0, max) });
  }
  // Must start with a user turn and end with a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return { ok: false, code: "malformed", message: CANNED.malformed };
  if (!last.content) return { ok: false, code: "empty", message: CANNED.empty };
  return { ok: true, messages };
}

export const looksLikeInjection = (text) => INJECTION.some((re) => re.test(text));
