// Thin Gemini REST client (no SDK). Key goes in a header, never in the URL.
import { config } from "./config.js";

const BASE = "https://generativelanguage.googleapis.com/v1beta";

const headers = () => ({
  "Content-Type": "application/json",
  "x-goog-api-key": config.geminiKey,
});

export class GeminiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const normalise = (v) => {
  const n = Math.hypot(...v) || 1;
  return v.map((x) => x / n);
};

/** Embed many texts (indexing). Small batches + backoff keep us under the free-tier per-minute quota. */
export async function embedDocuments(texts, { batch = 8, pauseMs = 9000 } = {}) {
  const out = [];
  for (let i = 0; i < texts.length; i += batch) {
    const slice = texts.slice(i, i + batch);
    for (let attempt = 0; ; attempt++) {
      const res = await fetch(`${BASE}/models/${config.embedModel}:batchEmbedContents`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          requests: slice.map((text) => ({
            model: `models/${config.embedModel}`,
            content: { parts: [{ text }] },
            taskType: "RETRIEVAL_DOCUMENT",
            outputDimensionality: config.embedDims,
          })),
        }),
      });
      if (res.status === 429 && attempt < 5) {
        await new Promise((r) => setTimeout(r, 30000));
        continue;
      }
      if (!res.ok) throw new GeminiError(res.status, (await res.text()).slice(0, 300));
      const j = await res.json();
      out.push(...j.embeddings.map((e) => normalise(e.values)));
      break;
    }
    process.stdout.write(`  embedded ${Math.min(i + batch, texts.length)}/${texts.length}\r`);
    if (i + batch < texts.length) await new Promise((r) => setTimeout(r, pauseMs));
  }
  process.stdout.write("\n");
  return out;
}

/** Embed one user query (serving). taskType RETRIEVAL_QUERY. */
export async function embedQuery(text, signal) {
  const res = await fetch(`${BASE}/models/${config.embedModel}:embedContent`, {
    method: "POST",
    headers: headers(),
    signal,
    body: JSON.stringify({
      model: `models/${config.embedModel}`,
      content: { parts: [{ text }] },
      taskType: "RETRIEVAL_QUERY",
      outputDimensionality: config.embedDims,
    }),
  });
  if (!res.ok) throw new GeminiError(res.status, (await res.text()).slice(0, 200));
  const j = await res.json();
  return normalise(j.embedding.values);
}

/**
 * Stream a grounded answer. Yields text fragments. Tries the primary model,
 * and the fallback only if the primary is missing (404) so a fallback never
 * silently doubles quota use on rate-limit errors.
 */
export async function* streamAnswer({ system, contents, signal }) {
  const body = {
    system_instruction: { parts: [{ text: system }] },
    contents,
    generationConfig: {
      temperature: 0.3,
      topP: 0.9,
      maxOutputTokens: config.maxOutputTokens,
    },
  };

  let res;
  for (const model of [config.model, config.fallbackModel]) {
    res = await fetch(`${BASE}/models/${model}:streamGenerateContent?alt=sse`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
      signal,
    });
    if (res.status !== 404) break;
  }
  if (!res.ok) throw new GeminiError(res.status, (await res.text()).slice(0, 300));

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
    let idx;
    while ((idx = buf.indexOf("\n\n")) >= 0) {
      const evt = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      const data = evt
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.slice(5).trim())
        .join("");
      if (!data || data === "[DONE]") continue;
      try {
        const j = JSON.parse(data);
        const cand = j.candidates?.[0];
        for (const p of cand?.content?.parts ?? []) if (p.text && !p.thought) yield p.text;
        if (cand?.finishReason === "SAFETY") yield "\n\n(I can't answer that one.)";
      } catch {
        /* partial JSON, ignore */
      }
    }
  }
}
