# Learning Portal

A private, mastery-based learning portal for a homeschool. It follows the same
approach as AI-first schools (placement testing, mastery gating, spaced review,
short daily sessions, a parent "guide" dashboard), built from scratch with
original content.

**Phase 1 covers math, grades 3–8.** Reading, writing, science and history are
next on the roadmap. Time spent on those subjects can already be logged for
Colorado records.

## What it does

**For kids** (log in with an avatar and a 4-digit PIN)
- **Placement quest.** A short adaptive test finds each kid's real level in
  seven math strands. A kid who already knows grade 5 work isn't made to redo it.
- **Daily plan.** Due reviews come first, then skills already in progress, then
  new skills that are now unlocked. New skills are spread across strands.
- **Mastery gating.** A skill is mastered at 9 of the last 10 answers right
  *without a hint*. The next skills unlock only after that.
- **Spaced review.** Mastered skills come back after 3, 7, 21 and 60 days. Failing
  a review sends the skill back to practice.
- **Hints.** The AI tutor gives a hint that never reveals the answer, falling back
  to a built-in hint when there's no API key. A hinted answer doesn't count toward
  mastery.
- **XP, streaks, a daily-minutes goal, and a skill map.** Kids can work ahead of
  grade level as fast as they show mastery.

**For parents**
- **Overview.** The level each kid is working at, minutes, accuracy, and flags
  (guessing or rushing, or stuck on a skill).
- **Per-kid detail.** Every skill with its standard code, status and next review
  date, plus an optional AI-written weekly summary.
- **Activity log.** Record reading, science, history, projects and field trips
  done outside the portal.
- **Colorado records page.** Instruction days against 172, average hours a day
  against 4, hours per required subject, and testing-year reminders for grades 3,
  5, 7, 9 and 11. Print it or save it as a PDF.

## How answers are checked

Every question comes from a code generator that also produces the correct
answer, so practice never runs out and **grading never depends on an AI**. The
tests generate 300 questions per skill and check each one against its own answer.
Claude (optional) is used only for tutor hints and parent summaries. A hint that
contains the answer is thrown away, and the built-in hint is shown instead.

## Run it locally

Requires Node 22+.

```bash
cd learning-portal
npm install
cp .env.example .env.local   # optional: add ANTHROPIC_API_KEY for AI hints
npm run dev                  # http://localhost:3000
```

The first visit takes you to **/setup** to create the parent account. Then add
the kids in **Settings**.

```bash
npm test          # curriculum, mastery, placement, planner and compliance tests
npm run typecheck
npm run build
```

## Deploy (family-only)

**DigitalOcean (recommended):** follow
[deploy/DIGITALOCEAN.md](deploy/DIGITALOCEAN.md). You create a $6/month
Droplet and paste two commands. It comes with free HTTPS, a firewall, automatic
restarts and nightly database backups.

Any other server with Docker and a persistent disk works too:
`docker compose up -d --build`. It uses the `docker-compose.yml` and
`deploy/Caddyfile` in this repo, with a `.env` file like the one
`deploy/setup.sh` creates.

Settings (in `.env`):

| Variable | Needed | Purpose |
|---|---|---|
| `SITE_ADDRESS` | yes | Web address Caddy gets an HTTPS certificate for |
| `SESSION_SECRET` | yes | Signs login cookies (`openssl rand -hex 32`) |
| `ANTHROPIC_API_KEY` | optional | AI tutor hints and weekly summaries |
| `APP_TIMEZONE` | optional | Defaults to `America/Denver` |

Avoid hosts without a persistent disk, such as Vercel, Render's free tier or
DigitalOcean App Platform. The SQLite database would be wiped on restart.

## Project layout

```
src/lib/curriculum/skills.ts   Skill graph: grades 3-8, standard codes, prerequisites, generators
src/lib/curriculum/answers.ts  Answer parsing (fractions, mixed numbers, remainders, pairs, expressions)
src/lib/engine/mastery.ts      Mastery rule, spaced-review intervals, rushing/stuck flags
src/lib/engine/placement.ts    Adaptive placement (binary search per strand)
src/lib/engine/planner.ts      Daily plan builder
src/lib/compliance.ts          Colorado day/hour/subject tracking
src/lib/store.ts               Database operations
src/lib/ai.ts                  Optional Claude hints and summaries
src/app/                       Pages (kid portal, parent dashboard) and API routes
tests/                         Unit tests
```

## Colorado notes

Colorado home study (C.R.S. 22-33-104.5) requires:
- Written notice to your school district (Poudre School District for Fort Collins)
  14 days before you start, and every year after.
- 172 days of instruction a year, averaging 4 hours a day.
- The required subjects: reading, writing, speaking, math, history, civics,
  literature, science, and the U.S. Constitution.
- A nationally standardized test (above the 13th percentile) or a qualified
  evaluation in grades 3, 5, 7, 9 and 11.
- Attendance, test and immunization records.

The portal helps with the records, but it isn't legal advice. Check the current
statute and your district's homeschool page each year. The math skill codes
follow the grade-level codes used in the Colorado Academic Standards. Check the
Colorado Department of Education's published standards when you need the
official wording.

## Roadmap

1. **Reading & writing.** Leveled passages with comprehension checks (licensed
   or public-domain texts), vocabulary review, and AI writing feedback against a
   rubric.
2. **Science, history, civics.** Lessons and quizzes mapped to the Colorado
   standards, drawing on openly licensed sources (OpenStax, CK-12).
3. **Opening it to other families.** The schema already scopes everything by
   `family_id`. Before letting other families in: move to Postgres, add
   email verification and password reset, rate-limit logins, write a privacy
   policy, review COPPA requirements for children's data, and get a security
   review.
