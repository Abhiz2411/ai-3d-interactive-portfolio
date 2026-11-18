// Pulls Abhijit's public GitHub profile, repos and README excerpts into
// data/github.json. Uses only public endpoints (no token). Run: npm run fetch:github
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const USER = "Abhiz2411";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../data/github.json");
const MAX_README_REPOS = 30;
const README_CHARS = 1800;

const gh = async (url) => {
  const r = await fetch(url, { headers: { "User-Agent": "portfolio-chatbot-ingest" } });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
};

const user = await gh(`https://api.github.com/users/${USER}`);
const repos = await gh(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`);
const own = repos.filter((r) => !r.fork && !r.archived && r.name !== USER);

// Prefer starred repos, then ones with descriptions, then recent activity.
own.sort(
  (a, b) =>
    b.stargazers_count - a.stargazers_count ||
    Number(!!b.description) - Number(!!a.description) ||
    b.pushed_at.localeCompare(a.pushed_at)
);

const cleanReadme = (md) =>
  md
    .replace(/<[^>]+>/g, " ") // html
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, " ") // badge links
    .replace(/```[\s\S]*?```/g, " ") // code blocks
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/[#>*_`|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const items = [];
for (const [i, r] of own.entries()) {
  let readme = "";
  if (i < MAX_README_REPOS && (r.description || r.stargazers_count > 0)) {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${USER}/${r.name}/HEAD/README.md`);
      if (res.ok) readme = cleanReadme(await res.text()).slice(0, README_CHARS);
    } catch {}
  }
  items.push({
    name: r.name,
    description: r.description || "",
    language: r.language || "",
    stars: r.stargazers_count,
    forks: r.forks_count,
    topics: r.topics || [],
    homepage: r.homepage || "",
    url: r.html_url,
    pushed_at: r.pushed_at.slice(0, 10),
    readme,
  });
}

const data = {
  fetched_at: new Date().toISOString().slice(0, 10),
  profile: {
    name: user.name,
    bio: user.bio,
    location: user.location,
    followers: user.followers,
    public_repos: user.public_repos,
    created_at: user.created_at.slice(0, 10),
    total_stars_own_repos: own.reduce((s, r) => s + r.stargazers_count, 0),
    url: user.html_url,
  },
  repos: items,
};
await writeFile(OUT, JSON.stringify(data, null, 1));
console.log(`github.json: ${items.length} repos, ${items.filter((x) => x.readme).length} readmes, ${data.profile.total_stars_own_repos} stars`);
