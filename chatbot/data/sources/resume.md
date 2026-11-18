# Source: Resume (October 2026)
# Privacy: phone number and email intentionally omitted.

## Profile
Abhijit Lalasaheb Zende is a Lead AI Engineer based in Mumbai, India (hometown: Kolhapur, Maharashtra). He has 2+ years across software engineering, DevOps and applied AI, and ships production GenAI systems: LLM pipelines, RAG, real-time speech and self-hosted inference.
Links: LinkedIn linkedin.com/in/zende-abhijit, GitHub github.com/Abhiz2411, portfolio abhijitzende.com.

## Education
- PGP in AI & Data Science, Jio Institute, 2025-2026, CGPA 8.2. Coursework: Artificial Intelligence, Generative AI, Agentic AI, Data Science.
- Study abroad: NTU Singapore (Nanyang Technological University), July 2025, AI strategy module, with industry visits to Rockwell Automation and Accenture.
- B.Tech in Computer Science & Engineering, TKIET Warananagar (Tatyasaheb Kore Institute of Engineering and Technology), 2019-2023, 89.85%.
- Class XII, Maharashtra State Board, 2019, 82.62%.
- Class X, Maharashtra State Board, 2017, 87.20%.

## Skills
- Languages: Python, SQL, JavaScript, TypeScript.
- GenAI & LLMs: RAG, Agentic AI, inference, guardrails, evaluation, observability, cost efficiency.
- Speech & Vision: streaming speech-to-text, voice agents, FLUX, ComfyUI.
- Retrieval & Data: Qdrant, FAISS, hybrid search, rerankers, PostgreSQL, Redis, Pandas.
- Backend & Web: FastAPI, asyncio, Celery, WebSockets, Next.js, JWT.
- MLOps & Cloud: RunPod, AWS, Docker, Kubernetes, Terraform, CI/CD, Prometheus, Grafana, Git.

## Experience: Lead AI Engineer, Pure Billion Technologies (Apr 2026 - Present, Mumbai)
Leads end-to-end delivery of client GenAI products and runs self-hosted LLM inference on RunPod.

### Project: AI Inquiry-to-Quotation Engine for Braco Electricals
- Cut quote turnaround from 6-7 hours to about 1 hour (85% faster) on INR 3 crore per day of inquiries, at about 89% accuracy.
- Built an upload-to-quote pipeline with p99 under 8 minutes of machine time, plus a human review dashboard.
- Paired Gemini extraction with deterministic rule engines, ensuring zero hallucinated catalogue (CAT) numbers.
- Normalised 356 SKUs across 46 fields; added rule-traced review, role-based access control (RBAC) and a correction log.
- Tech: Python, FastAPI, Next.js, PostgreSQL, Alembic, Gemini structured output, JWT.

### Project: Live Image Generation (real-time speech-to-visuals for live discourse)
- Cut prompt latency from about 4-6 seconds to about 575 ms (90% faster), with 62 ms time-to-first-token, turning live speech into images.
- Halved LLM latency by splitting the critical-path prompt call from an off-path memory update.
- Self-hosted Qwen3-4B-AWQ on vLLM with guided decoding, chosen over Gemini, Groq and Ollama.
- Designed an event-driven accumulate-and-fire trigger that drops zero speech segments.
- Locked character identity via continuity memory, enum-constrained names and FLUX reference-image edits.
- Tech: Python, asyncio, Sarvam STT, vLLM, FLUX, ComfyUI, RunPod, FastAPI, Celery, Redis, WebSockets.

### Project: Transcription-GPT (multilingual RAG over a spiritual video archive)
- Indexed 1,372 videos (about 432 hours) of Hindi and Gujarati audio for roughly INR 19.4k in speech-to-text cost.
- Scored 0.97 context recall and 0.92 faithfulness (0.99 for Hindi) on RAGAS across 4 languages.
- Built hybrid dense + sparse retrieval with reciprocal rank fusion (RRF), LLM reranking and multi-turn chat.
- Raised chunks per transcript from about 3-4 to 25-70 with a danda-aware semantic chunker.
- Added 3-layer guardrails, Langfuse tracing, backend-for-frontend (BFF) auth and rate limiting.
- Tech: FastAPI, LangChain, Qdrant, Gemini 2.5 Flash, Sarvam, bge-m3, Guardrails AI, Next.js, PostgreSQL.

## Experience: AI Development Intern, Pure Billion Technologies (Oct 2025 - Nov 2025, Mumbai)
- Built an AI calling voice agent for Museum of Solutions in 9 Indian languages, enabling 24x7 support.
- Automated bookings, availability checks, upsells and payment links, reducing front-desk workload.

## Experience: DevOps Intern, StarAgile (Jun 2024 - Oct 2024)
- Achieved 25% faster deployments via FinanceMe microservices on Terraform, AWS and Kubernetes.
- Reduced incident response time by 30% with Prometheus and Grafana monitoring.
- Deployed ML models as Dockerized microservices on AWS with automated CI/CD.

## Experience: Trainee Software Engineer, Kanaka Software (Sep 2023 - Jun 2024)
- Delivered 18% faster inserts and a 2x database speedup in the Polaris project through SQL query tuning.
- Redesigned data workflows for parallel execution, cutting processing time.

## Academic projects (resume)
- FinChat: a RAG chatbot (local LLM, FAISS, Gradio) that explains finance concepts and routes stock queries to an analysis pipeline generating buy/sell signals; evaluated with RAGAS and traced with LangSmith.
- HomePriceML: a regression model tuned with Grid Search and deployed on AWS (Node.js, NGINX) as a web app returning instant house-price estimates.

## Extra-curricular
- Top 0.07% LinkedIn creator globally (Cleve, 2024): 190K+ impressions on AI posts.
- Grew his personal AI blog and portfolio to 3K+ organic monthly visits.

## Leadership & awards
- 1st of 16 teams (INR 1 lakh prize), Kanaka Hackathon 2023: led the Medi-Kavach health-record system.
- Mentor at the Tech4Change National AI Hackathon 2024: guided a team to 1st place (INR 75K prize), with Intel.
