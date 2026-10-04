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
- **Game layer.** XP, levels and ranks (Apprentice to Legend), streaks, combos,
  badges, and a quest map where each math strand is a world. Kids can work ahead
  of grade level as fast as they show mastery.
- **Pictures with the questions.** Percent grids, ratio tapes, balance scales,
  coordinate planes, shapes, marbles and charts, drawn from the question's own
  numbers. They show the setup, never the answer.
- **"Show me one first."** A worked example (plan, solve, answer) before the kid
  tries a new skill.
- **Focus toolkit, for every kid.** Timed focus sprints (Pomodoro-style) with a
  countdown and "2 minutes left" cues, movement breaks, side quests every few
  questions (brain benders and creative challenges), and a daily screen-time
  cap. After the cap, kids are pointed to real-world missions.
- **AI teachers (Phase 2).** A teacher character for each math world teaches
  Socratically: mini-lessons, chat about the current question (never giving the
  answer away), and "why was my answer wrong?" Parents can read every message.
  See [docs/UPDATING.md](docs/UPDATING.md) to tweak teachers, quests and features.
- **The 2-hour day (Phase 2b).** Four 25-minute blocks plus a 20-minute math
  booster, shown as daily rings. Off-screen blocks (reading, science and history,
  writing) have a timer and daily ideas; a parent approves them. Grade towers,
  kid-set goals, 60-second math-fact speed drills, and a struggle detector that
  sends a stuck kid back to the skills underneath.
- **The Academy (Phase 3).** Courses beyond math: Reading & Writing, Science
  Lab and History & Civics fill the 2-hour day; Money, Entrepreneurship (a real
  mini-business per kid) and Leadership & Character are afternoon life skills.
  Each lesson is a reading, a code-graded check and a task; writing gets AI
  rubric feedback, and projects, labs and speeches are approved by a parent.
- **Interactive teaching (Phase 3b).** Lessons teach in small parts with
  simulations and activities. When a kid struggles (wrong answers, "I'm lost",
  long pauses) the coach changes approach: targeted coaching, an analogy, a
  worked example and a smaller step, then an AI re-explanation built around
  their mistakes. Kids explain ideas back in their own words before the final
  check, and parents see where extra help was needed.
- **Real-world missions.** Off-screen tasks about money, business, leadership,
  character, science, history and civics. A parent approves each one, which
  awards XP and logs the minutes under the right subject for records.

**For parents**
- **Content page.** Edit features, the 2-hour day, AI teachers, quests and
  missions, focus presets and brain breaks from the parent portal, no code needed.
- **Focus settings per kid.** One question ("ADHD or trouble keeping focus?")
  sets the starting values: shorter sprints, more breaks, more side quests and
  a tighter screen cap for kids who need them. Every value can be changed.
- **Learning plan.** Age grade vs knowledge grade, weeks to finish each grade (and
  with an extra hour a day), the accuracy band (too easy / learning zone / too
  hard), a waste meter, fact fluency, and outside test scores (like MAP) over time.
- **Missions to check.** Approve or decline the missions kids say they finished,
  and read their creative-challenge answers on each kid's page.
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
src/lib/game.ts                Levels, ranks, worlds and badges
src/lib/focus.ts               Focus profile presets (sprints, breaks, side quests, screen cap)
src/lib/quests.ts              Side quests and real-world missions
src/components/Visual.tsx      SVG pictures drawn alongside questions
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
