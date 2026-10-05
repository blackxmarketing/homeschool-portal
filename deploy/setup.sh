#!/usr/bin/env bash
# One-time setup for a fresh Ubuntu DigitalOcean Droplet. Safe to re-run.
# Run as root from the cloned repo:  bash /opt/homeschool-portal/deploy/setup.sh
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR=/opt/homeschool-backups

if [[ $EUID -ne 0 ]]; then
  echo "Please run as root (the DigitalOcean console logs you in as root)." >&2
  exit 1
fi

echo "==> Installing packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ca-certificates curl git ufw sqlite3 >/dev/null

echo "==> Adding swap (the build needs more than 1 GB of memory)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile >/dev/null
  swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Installing Docker"
if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sh >/dev/null
fi

echo "==> Turning on the firewall (SSH, HTTP, HTTPS only)"
ufw allow OpenSSH >/dev/null
ufw allow 80/tcp >/dev/null
ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null

cd "$APP_DIR"
if [[ ! -f .env ]]; then
  echo "==> Creating settings (.env)"
  IP="$(curl -fsS --max-time 3 http://169.254.169.254/metadata/v1/interfaces/public/0/ipv4/address || true)"
  [[ -n "$IP" ]] || IP="$(curl -fsS --max-time 5 https://api.ipify.org)"
  cat > .env <<ENV
# Web address. sslip.io turns the server's IP into a free name that can get an HTTPS certificate.
# To use your own domain later, point it at this server and put it here (e.g. learn.example.com).
SITE_ADDRESS=${IP//./-}.sslip.io
SESSION_SECRET=$(openssl rand -hex 32)
APP_TIMEZONE=America/Denver
# Optional: turns on AI tutor hints and weekly summaries.
ANTHROPIC_API_KEY=
# Optional: natural teacher voices (see docs/UPDATING.md).
ELEVENLABS_API_KEY=
ENV
  chmod 600 .env
fi
mkdir -p data

echo "==> Building and starting the portal (this takes a few minutes the first time)"
docker compose up -d --build

echo "==> Scheduling nightly database backups (kept 30 days in $BACKUP_DIR)"
mkdir -p "$BACKUP_DIR"
cat > /etc/cron.d/homeschool-backup <<CRON
SHELL=/bin/bash
15 2 * * * root [ -f $APP_DIR/data/learning.db ] && sqlite3 $APP_DIR/data/learning.db ".backup '$BACKUP_DIR/learning-\$(date +\%F).db'" && find $BACKUP_DIR -name 'learning-*.db' -mtime +30 -delete
CRON

echo "==> Turning on automatic updates from GitHub"
bash "$APP_DIR/deploy/enable-auto-update.sh"

SITE="$(grep '^SITE_ADDRESS=' .env | cut -d= -f2)"
echo
echo "All set! Open https://$SITE"
echo "The first visit may take up to a minute while the HTTPS certificate is issued."
echo "Then create your parent account and add the kids."
