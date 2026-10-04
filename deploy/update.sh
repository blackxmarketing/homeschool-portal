#!/usr/bin/env bash
# Pull the latest code and restart. Run as root:  bash /opt/homeschool-portal/deploy/update.sh
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
APP_DIR="$(pwd)"

# Back up the database before every update.
if [[ -f data/learning.db ]]; then
  mkdir -p /opt/homeschool-backups
  sqlite3 data/learning.db ".backup '/opt/homeschool-backups/learning-pre-update-$(date +%F-%H%M).db'"
fi

git pull --ff-only
docker compose up -d --build
docker image prune -f >/dev/null
echo "Updated. Site: https://$(grep '^SITE_ADDRESS=' "$APP_DIR/.env" | cut -d= -f2)"
