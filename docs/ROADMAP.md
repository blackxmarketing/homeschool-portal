# Roadmap

Goal: real learning (not test prep) for grades 6–8, modeled on mastery-based
"2-hour learning": short focused academic blocks with an AI tutor, then
real-world skills — money, business, leadership, character, science, history
and civics. Each phase can be switched on or off in `src/content/features.ts`.

## ✅ Phase 1 — Kid experience and focus toolkit (live)
- Game layer: levels, ranks, badges, combos, quest map of worlds
- Pictures with questions, worked examples
- Focus toolkit for every kid: Pomodoro sprints, brain breaks, side quests, daily screen cap
- Parent attention/ADHD question that sets each kid's starting focus settings
- Real-world missions approved by a parent (logged for Colorado records)

## ✅ Phase 2 — AI teachers (live)
- A teacher character for each math world, inspired by great thinkers
  (Ben Franklin, Ada Lovelace, Archimedes, Hypatia, Florence Nightingale…)
- Socratic chat about the current question; never gives the answer away
- "Teach me first" mini-lessons, "Why was my answer wrong?" explanations
- Grading stays in code; parents can read every conversation
- Needs `ANTHROPIC_API_KEY` for full AI replies (falls back to built-in hints)

## ✅ Phase 2b — The 2-hour day (live)
- Daily schedule of 4 × 25-minute subject blocks with daily rings
- Kid dashboard: lessons left per grade, long-term goals turned into daily goals
- Parent learning plan: age grade vs knowledge grade, weeks to finish a grade
  (and with +1 hour/day), accuracy band (too easy / too hard), waste meter
- Struggle detector (drops back to prerequisites) and math-fact speed drills
- MAP test score tracking (percentile and growth, three times a year)

## ✅ Phase 3b — Interactive teaching and coaching (built)
Every lesson teaches like a tutor instead of read-then-test:
1. Hook: a story or puzzle to spark curiosity
2. Teach in small parts, each with an interactive visual (simulations for
   compound interest, budgets, profit, levers, seasons, ramps and bounces;
   timelines, diagrams, flip cards, comparisons, sorting and sequencing)
   and a quick think
3. Struggle detection and rescue: misses, "I'm lost" and long pauses climb a
   coaching ladder: coaching on the exact wrong answer -> a different way in
   (analogy) -> a worked example, a smaller first step, and the AI coach
   re-explaining around the kid's mistakes -> the answer with the full reason,
   flagged for the parent
4. Hands-on activity (sort, sequence or highlight), checked on the server
5. Explain it back: the coach checks real understanding in the kid's words
6. Show what you know, then the task
Parents see where each kid needed extra help.

## ✅ Phase 3 — New subjects (live)
The Academy: every lesson is a short reading, a check graded by code (80% to
pass), then a task. Written tasks get AI feedback against a rubric; projects,
labs and speeches are approved by a parent. Lessons follow the classical stages
(grammar → logic → rhetoric) and log their minutes for records.
- Academics (fill the 2-hour day): Reading & Writing (great books, AI rubric
  feedback), Science Lab (hands-on labs), History & Civics (Greece, Rome, the
  Declaration, the Constitution, the Bill of Rights, inventors)
- Afternoon life skills: Money & Personal Finance, Entrepreneurship (each kid
  builds a real mini-business: problem, customers, pricing, pitch, launch, P&L),
  Leadership & Character (the classical virtues, integrity, decisions, teams,
  public speaking)
- Every course and lesson is editable on the parent Content page

## Phase 4 — Accreditation readiness
- Curriculum maps to standards, portfolios of real work, mastery records
- WASC accredits schools, not software: this needs a school entity, leadership,
  qualified teachers, a self-study and a site visit (usually a multi-year candidacy).
  Review WASC's current criteria before investing in the process.
