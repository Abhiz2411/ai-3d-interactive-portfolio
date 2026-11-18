// Hybrid retrieval over a small in-memory index: BM25 (exact names, numbers,
// tech terms) + dense cosine (meaning), fused with Reciprocal Rank Fusion.
// The corpus is ~100 chunks, so a vector database would add latency and ops
// for no benefit; brute-force cosine over 768-d vectors takes well under 1 ms.
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT, config } from "./config.js";
import { embedQuery } from "./gemini.js";

const STOP = new Set(
  "a an and are as at be but by for from has have he her his how i in is it its me my of on or our she so than that the their them they this to was we what when where which who why will with you your about tell can does did do abhijit zende".split(
    " "
  )
);

export const tokenize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t && !STOP.has(t));

let chunks = [];
let docTokens = [];
let df = new Map();
let avgLen = 0;

export function loadIndex(file = path.join(ROOT, "data", "index.json")) {
  const index = JSON.parse(readFileSync(file, "utf8"));
  chunks = index.chunks;
  docTokens = chunks.map((c) => tokenize(`${c.title} ${c.text}`));
  df = new Map();
  for (const toks of docTokens) for (const t of new Set(toks)) df.set(t, (df.get(t) || 0) + 1);
  avgLen = docTokens.reduce((s, t) => s + t.length, 0) / Math.max(1, docTokens.length);
  return { count: chunks.length, builtAt: index.builtAt };
}

function bm25(queryTokens, k1 = 1.4, b = 0.75) {
  const N = chunks.length;
  return docTokens.map((toks) => {
    const tf = new Map();
    for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
    let score = 0;
    for (const q of new Set(queryTokens)) {
      const f = tf.get(q);
      if (!f) continue;
      const n = df.get(q) || 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * toks.length) / avgLen));
    }
    return score;
  });
}

const dot = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
};

const rank = (scores) =>
  scores
    .map((s, i) => [s, i])
    .sort((a, b) => b[0] - a[0])
    .map(([s, i], r) => ({ i, s, r }));

/**
 * @returns {{hits: Array, bestDense: number, bestBm25: number, usedDense: boolean}}
 */
export async function retrieve(query, { k = config.topK, signal } = {}) {
  const qTokens = tokenize(query);
  const sparse = bm25(qTokens);

  let dense = null;
  try {
    const qv = await embedQuery(query, signal);
    dense = chunks.map((c) => dot(qv, c.embedding));
  } catch {
    dense = null; // embedding quota/network issue: degrade to BM25 only
  }

  const sparseRank = rank(sparse);
  const denseRank = dense ? rank(dense) : null;

  // Reciprocal Rank Fusion; only chunks with a real signal participate.
  const K = 60;
  const fused = new Map();
  for (const { i, s, r } of sparseRank.slice(0, 20)) {
    if (s > 0) fused.set(i, (fused.get(i) || 0) + 1 / (K + r + 1));
  }
  if (denseRank) {
    for (const { i, r } of denseRank.slice(0, 20)) fused.set(i, (fused.get(i) || 0) + 1 / (K + r + 1));
  }

  const ordered = [...fused.entries()].sort((a, b) => b[1] - a[1]).slice(0, k);
  return {
    hits: ordered.map(([i, score]) => ({ ...chunks[i], embedding: undefined, score })),
    bestDense: dense ? Math.max(...dense) : 0,
    bestBm25: sparseRank[0]?.s ?? 0,
    usedDense: !!dense,
  };
}
