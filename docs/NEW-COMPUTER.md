# Setting up a new computer to build the portal

About 20 minutes, once. Works on Windows or Mac.

## 1. Access to the code

The code is on GitHub under Jake's account (blackxmarketing). This laptop uses
the same account: the first time you clone or push (step 3), a GitHub sign-in
window opens; Jake signs in there once and the laptop remembers it.

## 2. Install the tools

- **Git:** git-scm.com/downloads (Windows: keep the default options; this also
  installs "Git Bash").
- **Node.js 22 or newer (LTS):** nodejs.org.
- **Claude Code:** the Claude desktop app (Code tab) or the `claude` command
  line, signed in with Jake's Claude account.
- If `npm install` later fails on **better-sqlite3**:
  - Windows: install "Visual Studio Build Tools" with the
    "Desktop development with C++" option, then try again.
  - Mac: run `xcode-select --install`, then try again.

## 3. Get the project

Open a terminal (Windows: Git Bash; Mac: Terminal):

```bash
git clone https://github.com/blackxmarketing/homeschool-portal.git
cd homeschool-portal
npm install
cp .env.example .env.local
git config user.name "Jake"
git config user.email "jake@blackxmarketing.com"
```

Open `.env.local` in a text editor and fill in:

- `DATA_DIR=./data` (already set; your practice database lives here)
- `SESSION_SECRET=` followed by a long random value. Make one with:
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Leave `ANTHROPIC_API_KEY` empty. The AI parts fall back to built-in coaching
  on your computer; the live site has its own key.

## 4. Try it with the demo family

```bash
npm run dev
```

Open http://localhost:3000 once (this creates the practice database), then in a
second terminal:

```bash
node scripts/seed-demo.mjs
```

Now you can sign in as the demo parent (demo@example.test / demo1234) or the
demo kids Ava (PIN 1111) and Leo (PIN 2222). This is a practice copy on your
computer only. Your real kids' progress lives on the server and is never
touched.

## 5. Build with Claude

Open the `homeschool-portal` folder in Claude Code. It reads `CLAUDE.md`
automatically, which explains the project, the family's rules and how to work.

Each time you sit down:

1. Make sure nobody else is in the middle of a change, then ask Claude to
   `git pull` (or run it yourself) so you have the latest version.
2. Ask for what you want. Claude makes the change, tests it, and shows it in the
   preview.
3. When you're happy, ask Claude to commit and push. The live site updates by
   itself within about 5 minutes.
