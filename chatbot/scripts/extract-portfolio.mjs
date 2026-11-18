// Snapshots the portfolio's own content (projects, achievements) from
// ../src/constants/index.js into data/portfolio.json so the chatbot answers
// match what the site shows. The constants file imports images, which we do
// not need, so imports are stripped and unknown identifiers evaluate to
// undefined. Run: npm run extract:portfolio
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = await readFile(path.join(here, "../../src/constants/index.js"), "utf8");

const code = src
  .replace(/^import[\s\S]*?;\s*$/gm, "") // import statements
  .replace(/^export\s*\{[^}]*\};?\s*$/gm, "") // export { a, b }
  .replace(/^export\s+/gm, ""); // export const x

const sandbox = new Proxy(
  {},
  {
    has: () => true,
    get: (_t, k) => (k === Symbol.unscopables ? undefined : undefined),
  }
);
// eslint-disable-next-line no-new-func
const run = new Function(
  "sandbox",
  `with (sandbox) { ${code}\n return { projects, achievements }; }`
);
const { projects, achievements } = run(sandbox);

const out = {
  projects: projects.map((p) => ({
    name: p.name,
    description: p.description,
    tags: (p.tags || []).map((t) => t.name),
    features: p.features || [],
    source_code_link: p.source_code_link || "",
    live_demo_link: p.live_demo_link || "",
    stars: p.metrics?.stars ?? 0,
  })),
  achievements: achievements.map((a) => ({
    title: Array.isArray(a.title) ? a.title.join(" / ") : a.title,
    date: a.date || "",
    points: a.points || [],
    link: a.link || "",
  })),
};
await writeFile(path.join(here, "../data/portfolio.json"), JSON.stringify(out, null, 1));
console.log(`portfolio.json: ${out.projects.length} projects, ${out.achievements.length} achievements`);
