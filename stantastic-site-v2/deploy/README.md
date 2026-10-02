# Hosting on the Raspberry Pi

Internet → router (ports 80/443) → Caddy on the Pi (HTTPS) → Node on `127.0.0.1:3000`.

The files here assume the user `stan`, the repo at `/home/stan/Stantastic` and Node in `~/.local/node`.
If yours differ, edit `User=` and `WorkingDirectory=` in `stantastic.service`.

## 1. DNS (at your domain registrar)

For both `stanjaworski.nl` and `stantastic.nu`, add these records:

| Type | Name | Value              |
|------|------|--------------------|
| A    | @    | your home public IP |
| A    | www  | your home public IP |

You can find your public IP at https://ifconfig.me.
Most home connections get a new IP now and then. If yours does, set up dynamic DNS
(for example with your registrar's API or ddclient), or use Cloudflare Tunnel instead
(see the end of this file).

## 2. Router

- Give the Pi a fixed local IP (a DHCP reservation in the router).
- Forward TCP **80** and **443** to that IP.

## 3. Pi setup (once)

Use 64-bit Raspberry Pi OS.

```bash
# Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git

# Caddy
sudo apt install -y caddy

# Code
cd ~
git clone https://github.com/mrstaneh/Stantastic.git
cd Stantastic/stantastic-site-v2
npm ci
npm run build

# Node service
sudo cp deploy/stantastic.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now stantastic

# Caddy config (it gets HTTPS certificates by itself)
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy

chmod +x deploy/update.sh
```

**On OctoPi:** OctoPi's haproxy holds ports 80/443, so turn it off before reloading Caddy:
`sudo systemctl disable --now haproxy`. The Caddyfile then serves OctoPrint (and the
webcam) on `http://octopi.local`, from your home network only.

If `apt install caddy` doesn't find the package, follow https://caddyserver.com/docs/install#debian-ubuntu-raspbian.

## 4. Updating the site

Push your changes from your PC, then run this on the Pi:

```bash
~/Stantastic/stantastic-site-v2/deploy/update.sh
```

## Troubleshooting

```bash
systemctl status stantastic       # is Node running?
journalctl -u stantastic -f       # Node logs
journalctl -u caddy -f            # Caddy / certificate logs
curl -I http://127.0.0.1:3000     # does the site respond on the Pi itself?
```

Caddy can only get certificates once DNS points to your IP and ports 80/443 are reachable.

## Alternative: Cloudflare Tunnel

Use this if your ISP puts you behind CGNAT, your IP keeps changing, or you'd rather not
open ports. Move both domains' DNS to Cloudflare, install `cloudflared` on the Pi, and point
the tunnel at `http://localhost:3000`. You can skip Caddy and the router steps.
