#!/usr/bin/env bash
# Pull latest main, build, and publish dist/ to the nginx web root.
# Run from the repo root on the server: ./scripts/deploy.sh
set -euo pipefail

# Small droplets: let Node use swap-backed memory so the Vite build does not OOM.
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}"

WEB_ROOT="${WEB_ROOT:-/var/www/portfolio/html}"
BRANCH="${BRANCH:-main}"

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "ERROR: .env missing. Create it from .env.example (EmailJS values) before building." >&2
  exit 1
fi

echo "==> Pulling $BRANCH (fast-forward only)"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
npm run build

for f in index.html 404.html robots.txt sitemap.xml og-image.jpg; do
  [ -f "dist/$f" ] || { echo "ERROR: dist/$f missing, aborting before publish" >&2; exit 1; }
done

echo "==> Publishing to $WEB_ROOT"
mkdir -p "$WEB_ROOT"
rsync -a --delete dist/ "$WEB_ROOT"/

echo "==> Done: $(git rev-parse --short HEAD)"
