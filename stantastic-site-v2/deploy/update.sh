#!/usr/bin/env bash
# Pull the latest code, rebuild and restart the site. Run on the Pi.
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$HOME/.local/node/bin:$PATH"

git pull
npm ci
npm run build
sudo systemctl restart stantastic
echo "Deployed $(git rev-parse --short HEAD)"
