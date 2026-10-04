#!/usr/bin/env bash
# Runs from cron every few minutes. If GitHub has new commits on the deployed
# branch, it runs update.sh (which backs up the database, pulls and rebuilds).
# Log: /var/log/homeschool-auto-update.log
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Only one update at a time; a rebuild can take a few minutes.
exec 9>/tmp/homeschool-auto-update.lock
flock -n 9 || exit 0

branch="$(git rev-parse --abbrev-ref HEAD)"
git fetch --quiet origin "$branch"
if [[ "$(git rev-parse HEAD)" == "$(git rev-parse "origin/$branch")" ]]; then
  exit 0
fi

echo "==> $(date '+%F %T') new commits on $branch: $(git log --oneline HEAD..origin/"$branch" | head -5 | tr '\n' ';')"
bash deploy/update.sh
echo "==> $(date '+%F %T') now at $(git rev-parse --short HEAD)"
