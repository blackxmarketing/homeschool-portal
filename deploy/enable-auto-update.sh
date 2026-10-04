#!/usr/bin/env bash
# Turns on automatic deploys: every 5 minutes the server checks GitHub and
# updates itself when there are new commits. Run once as root:
#   bash /opt/homeschool-portal/deploy/enable-auto-update.sh
# To turn it off:  rm /etc/cron.d/homeschool-auto-update
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
APP_DIR="$(pwd)"

cat > /etc/cron.d/homeschool-auto-update <<CRON
# Deploy new commits from GitHub automatically (see deploy/auto-update.sh).
*/5 * * * * root bash $APP_DIR/deploy/auto-update.sh >> /var/log/homeschool-auto-update.log 2>&1
CRON
chmod 644 /etc/cron.d/homeschool-auto-update
echo "Auto-update is on. New commits on GitHub go live within about 5-10 minutes."
echo "Watch it:  tail -f /var/log/homeschool-auto-update.log"
