# Portfolio AI assistant (aichat.abhijitzende.com)

A rate-limited RAG chatbot that answers questions about Abhijit from his resume,
LinkedIn, GitHub and portfolio content. Node + Gemini (free tier), no database.

## How it works

```
browser ──POST /api/chat──▶ nginx (30 req/min/IP) ──▶ Node
                                                      │ 1 validate + injection screen (no LLM call if blocked)
                                                      │ 2 per-IP limits, global daily cap, concurrency cap
                                                      │ 3 hybrid retrieval: BM25 + Gemini embeddings, fused with RRF
                                                      │ 4 off-topic short-circuit (no LLM call if nothing relevant)
                                                      │ 5 Gemini 3.5 Flash-Lite, grounded prompt, streamed back (SSE)
```

Design choices (researched for 2026 RAG practice, sized for this corpus):

- **~100 entity-shaped chunks** (one per role, project, repo, post), each prefixed with its
  path ("Resume > Experience: ... > Project: ...") so a chunk is understandable alone.
- **Hybrid search**: BM25 catches exact names, numbers and tech terms; embeddings catch meaning;
  Reciprocal Rank Fusion merges them without score calibration.
- **No vector DB, no reranker**: at ~100 vectors a brute-force dot product is <1 ms, and a reranker
  would add latency and quota use for no measurable gain. Revisit past a few thousand chunks.
- **Grounded generation**: numbered context, `[n]` citations that are only rendered if backed by a
  retrieved source, explicit refusal when the context lacks the answer.
- **Evaluation**: `npm run eval` runs a 19-case golden set (retrieval recall, fact checks, refusals,
  privacy, injection). Run it after every data or prompt change.

## Protecting the free-tier key

| Layer | Default |
|---|---|
| nginx | 30 requests/min/IP on `/api/chat` |
| Per visitor | 3/min and 15/day (salted IP hash, /64 for IPv6) |
| Global | 350 answers per Pacific day (Gemini's quota day) |
| Concurrency | 3 answers streaming at once |
| Input | 500 chars/message, last 6 messages, control characters stripped |
| Quota exhausted | upstream 429 opens a 60 s circuit breaker |

Tune with `LIMIT_*` env vars (see `server/config.js`). The key lives only in `/etc/aichat.env` on the
server (or `chatbot/.env` locally, gitignored) and is never sent to the browser.

## Launch gate

Until `LAUNCH_AT` (default 2026-11-24T00:00:00+05:30) the server returns only a coming-soon page
(and 403 for `/api/*`). It is checked server-side on every request, so no client trick bypasses it.
Preview early with `https://aichat.abhijitzende.com/?preview=<OWNER_TOKEN>` (sets a 30-day cookie).

## Refreshing the data

```
# edit data/sources/resume.md or linkedin.md by hand, then:
npm run ingest      # GitHub API + portfolio constants + embeddings -> data/index.json
npm run eval        # make sure nothing regressed
```

## Local development

```
cd chatbot && npm install && cp .env.example .env   # add GEMINI_API_KEY, set DEV_OPEN=1
npm run dev                                         # API + built UI on :3001
cd web && npm install && npm run dev                # UI hot reload on :5174 (proxies /api)
```

## Production

See `deploy/`: `aichat.service` (systemd), `nginx-aichat.conf`, `deploy.sh`.
