// Builds data/index.json: structure-aware chunks (one per role, project, repo,
// post...) each prefixed with a short contextual header, then embedded once
// with Gemini (RETRIEVAL_DOCUMENT). Run after editing data/sources/*.md or
// refreshing GitHub/portfolio data: npm run ingest
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { embedDocuments } from "../server/gemini.js";
import { config } from "../server/config.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const data = (...p) => path.join(here, "../data", ...p);
const MAX_CHARS = 1100;

if (!config.geminiKey) {
  console.error("GEMINI_API_KEY missing (set it in chatbot/.env)");
  process.exit(1);
}

const chunks = [];
const add = (source, title, text, url = "") => {
  const body = text.trim();
  if (body.length < 40) return;
  chunks.push({ id: `${source}-${chunks.length}`, source, title, text: body, url });
};

// Split long bodies on bullet/paragraph boundaries, keeping each piece under MAX_CHARS.
const splitBody = (body) => {
  if (body.length <= MAX_CHARS) return [body];
  const parts = body.split(/\n(?=- |\n)/);
  const out = [];
  let cur = "";
  for (const p of parts) {
    if ((cur + "\n" + p).length > MAX_CHARS && cur) {
      out.push(cur);
      cur = p;
    } else cur = cur ? cur + "\n" + p : p;
  }
  if (cur) out.push(cur);
  return out;
};

// ---- markdown sources (resume, linkedin): heading-path chunks ----
async function markdownSource(file, source, label, url) {
  const md = await readFile(data("sources", file), "utf8");
  let h2 = "";
  let h3 = "";
  let buf = [];
  const flush = () => {
    const body = buf.join("\n").trim();
    buf = [];
    if (!body) return;
    // A "## Experience: ..." role carries into its "### Project" children as context.
    const title = [label, h2, h3].filter(Boolean).join(" > ");
    const pieces = splitBody(body);
    pieces.forEach((p, i) => add(source, pieces.length > 1 ? `${title} (part ${i + 1})` : title, p, url));
  };
  for (const line of md.split(/\r?\n/)) {
    if (line.startsWith("# ")) continue; // file header comments
    if (line.startsWith("## ")) {
      flush();
      h2 = line.slice(3).trim();
      h3 = "";
    } else if (line.startsWith("### ")) {
      flush();
      h3 = line.slice(4).trim();
    } else buf.push(line);
  }
  flush();
}

await markdownSource("resume.md", "resume", "Resume", "https://abhijitzende.com");
await markdownSource("linkedin.md", "linkedin", "LinkedIn", "https://www.linkedin.com/in/zende-abhijit/");

// ---- GitHub ----
const gh = JSON.parse(await readFile(data("github.json"), "utf8"));
add(
  "github",
  "GitHub profile overview",
  `GitHub user ${gh.profile.name} (Abhiz2411), ${gh.profile.location}. ${gh.profile.public_repos} public repositories, ${gh.profile.total_stars_own_repos} total stars across his own repositories, ${gh.profile.followers} followers, on GitHub since ${gh.profile.created_at}. Most-starred repository: ${gh.repos[0].name} (${gh.repos[0].stars} stars), his open-source 3D interactive portfolio template. Data fetched ${gh.fetched_at}.`,
  gh.profile.url
);
for (const r of gh.repos) {
  if (!r.description && !r.readme && r.stars === 0) continue; // empty placeholder repos
  const lines = [
    `GitHub repository "${r.name}"${r.language ? ` (${r.language})` : ""}, ${r.stars} stars, last pushed ${r.pushed_at}.`,
    r.description && `Description: ${r.description}`,
    r.homepage && `Live: ${r.homepage}`,
    r.readme && `README summary: ${r.readme}`,
  ].filter(Boolean);
  add("github", `GitHub repo: ${r.name}`, lines.join("\n"), r.url);
}

// ---- the portfolio site's own content ----
const pf = JSON.parse(await readFile(data("portfolio.json"), "utf8"));
for (const p of pf.projects) {
  add(
    "portfolio",
    `Portfolio project: ${p.name}`,
    [
      `Project "${p.name}". ${p.description}`,
      `Tech: ${p.tags.join(", ")}.`,
      p.features.length && `Features: ${p.features.join(" ")}`,
      p.live_demo_link && `Live demo: ${p.live_demo_link}`,
    ]
      .filter(Boolean)
      .join("\n"),
    p.source_code_link || p.live_demo_link
  );
}
for (const a of pf.achievements) {
  add("portfolio", `Achievement: ${a.title}`, `${a.title} (${a.date}). ${a.points.join(" ")}`, a.link);
}

// ---- site facts (stats shown on the site) ----
add(
  "portfolio",
  "Site stats and reach",
  "Abhijit's portfolio has had 30K+ lifetime views and his open-source 3D portfolio repository has 320+ GitHub stars. ChatGPT has recommended his repository among the top 10 3D interactive portfolios in India. He grew his personal AI blog and portfolio to 3K+ organic monthly visits and is a top 0.07% LinkedIn creator (190K+ impressions on AI posts).",
  "https://abhijitzende.com"
);

console.log(`${chunks.length} chunks; embedding with ${config.embedModel} (${config.embedDims}d)...`);
const vectors = await embedDocuments(chunks.map((c) => `${c.title}\n${c.text}`));
chunks.forEach((c, i) => (c.embedding = vectors[i].map((x) => Math.round(x * 1e5) / 1e5)));

await writeFile(
  data("index.json"),
  JSON.stringify({ builtAt: new Date().toISOString(), model: config.embedModel, dims: config.embedDims, chunks })
);
const bySource = chunks.reduce((m, c) => ((m[c.source] = (m[c.source] || 0) + 1), m), {});
console.log("index.json written", bySource);
