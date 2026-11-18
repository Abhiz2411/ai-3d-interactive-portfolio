#!/usr/bin/env bash
# Update the chatbot on the droplet: pull, install, build UI, restart.
# Run from anywhere: ~/chat-src/chatbot/deploy/deploy.sh   (BRANCH=... to override)
set -euo pipefail
BRANCH="${BRANCH:-main}"
cd "$(dirname "$0")/../.."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"
cd chatbot
npm ci --omit=dev --no-audit --no-fund
( cd web && npm ci --no-audit --no-fund && npm run build )
mkdir -p data/state
sudo systemctl restart aichat
sleep 2
curl -fsS http://127.0.0.1:3001/api/health && echo " <- chatbot healthy"
