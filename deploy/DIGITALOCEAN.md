# Put the portal online with DigitalOcean

About 15 minutes, start to finish. When you're done, the kids open a normal
`https://` web address on any laptop.

## 1. Create the Droplet

In DigitalOcean: **Create → Droplets**.

- **Region:** San Francisco or another US West region (closest to Colorado).
- **Image:** Ubuntu 24.04 (LTS) x64.
- **Size:** Basic → Regular → **1 GB RAM / 1 CPU** (about $6/month).
  The 512 MB size is too small to build the app.
- **Backups:** turn on **weekly or daily backups**. It's a small extra cost and
  protects the kids' progress history.
- **Authentication:** choose a **password** (simplest) or an SSH key.
- **Hostname:** something like `homeschool-portal`.

Click **Create Droplet** and wait for it to finish.

## 2. Open the console

Click the Droplet, then **Access → Launch Droplet Console**. A black terminal
window opens, already logged in as `root`.

## 3. Give the server read-only access to the code

Your repository is private, so the server needs a key to download it.
Paste this into the console and press Enter:

```bash
ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519 -q && cat ~/.ssh/id_ed25519.pub
```

It prints one line starting with `ssh-ed25519`. Copy that whole line.

Then on GitHub, open
**github.com/blackxmarketing/homeschool-portal → Settings → Deploy keys → Add deploy key**:

- **Title:** `DigitalOcean server`
- **Key:** paste the line
- Leave **Allow write access** unchecked (the server only needs to read).
- Click **Add key**.

This key works for this one repository only, and only for reading.

## 4. Install and start the portal

Back in the console, paste this and press Enter:

```bash
ssh-keyscan -q github.com >> ~/.ssh/known_hosts && git clone git@github.com:blackxmarketing/homeschool-portal.git /opt/homeschool-portal && bash /opt/homeschool-portal/deploy/setup.sh
```

The first run takes about 5–10 minutes: it installs Docker, sets up the
firewall, builds the app, and turns on HTTPS. When it finishes it prints your
address, something like:

```
All set! Open https://164-90-12-34.sslip.io
```

That address is free. It's built from the server's IP address, and it gets a
real HTTPS certificate automatically.

## 5. Set it up

Open the address in a browser. The first visit may take up to a minute while
the certificate is issued. Then:

1. Create the parent account.
2. In **Settings**, add each kid with a 4-digit PIN.
3. Bookmark the address on each kid's laptop.

---

## Everyday tasks

**Turn on AI hints and weekly summaries** (optional). Put your Anthropic API key
in the settings file and restart:

```bash
nano /opt/homeschool-portal/.env        # fill in ANTHROPIC_API_KEY=..., then Ctrl+O, Enter, Ctrl+X
cd /opt/homeschool-portal && docker compose up -d
```

**Install updates** after new features are pushed to GitHub:

```bash
bash /opt/homeschool-portal/deploy/update.sh
```

This backs up the database first, then rebuilds and restarts.

**Backups.** The database is copied every night at 2:15 AM to
`/opt/homeschool-backups/`, and copies are kept for 30 days. DigitalOcean's
Droplet backups (step 1) also cover the whole server.

**Use your own domain later.** Point the domain's DNS (an `A` record) at the
Droplet's IP address, change `SITE_ADDRESS` in `/opt/homeschool-portal/.env`
to the domain, then run `cd /opt/homeschool-portal && docker compose up -d`.

**Check that it's running:**

```bash
cd /opt/homeschool-portal && docker compose ps
docker compose logs --tail 50 app      # app messages
docker compose logs --tail 50 caddy    # HTTPS / certificate messages
```

**Restore a backup** (for example, after a mistake):

```bash
cd /opt/homeschool-portal && docker compose stop app
cp /opt/homeschool-backups/learning-YYYY-MM-DD.db data/learning.db && rm -f data/learning.db-wal data/learning.db-shm
docker compose start app
```
