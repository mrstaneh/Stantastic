#!/usr/bin/env bash
# One-time root setup on the Pi: site service + Caddy instead of OctoPi's haproxy.
# Run with: sudo bash deploy/setup-root.sh
set -euo pipefail
cd "$(dirname "$0")"

apt-get update
apt-get install -y caddy

cp stantastic.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now stantastic

systemctl disable --now haproxy
cp Caddyfile /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
systemctl enable caddy
systemctl restart caddy

systemctl --no-pager status stantastic caddy | grep -E "●|Active:"
