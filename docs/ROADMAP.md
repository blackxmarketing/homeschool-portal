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

## ✅ Phase 5d — Lessons for every grade, and story mini-games (built)
- Grades 4–5 and 9–12 versions of all six Academy courses (5 lessons each),
  picked automatically from the kid's grade; 26 high school math skills.
- Four more lessons in each grades 6–8 course (budgeting, smart shopping,
  giving, taxes; marketing, sales, teams, bookkeeping; goals, ownership,
  resilience, service; first civilizations, Middle Ages, exploration,
  Lincoln; matter, ecosystems, Earth, electricity; grammar, research,
  poetry, letters and speeches).
- Six story mini-games as side quests, one per land, with levels per grade
  band and a report after every move that teaches why it worked. Scores are
  checked on the server by replaying the moves. See `docs/GAME.md`.

## ✅ Phase 5c — Lessons as game scenes (built)
- Every challenge in a lesson is a scene in its land's scenery: the hero
  faces an obstacle that solving the problem overcomes (fill in -> rune gate,
  build -> bridge, match -> portals, numbers -> target, place -> crystal,
  sort/order/highlight -> treasure chest, simulations -> machine). Wrong tries
  shake it; solving it plays the win and shows the stars (`src/lib/pixel/scene.ts`).
- "Show what you know" is a boss battle against the land's Shade: one
  question at a time, each right answer drains its darkness (full hit first
  try, half on the second), 80% turns it back into light. Testing out early
  fights the same boss.
- The task is a field mission that lights the beacon for good. Course pages
  now open the matching land.

## ✅ Phase 5a — Lumina, the game world (built)
See docs/GAME.md for the whole design.
- The kid home is a pixel-art world: a HUD (hero, level, XP, coins, streak,
  minutes), the world map, and the quest log (today's training and each
  land's next quest, plus the daily rings). Side quests stay in the tabs.
- Seven lands around the home village; each land turns from grey to color
  as its lessons are mastered. Each land has its own map: a road with a
  beacon per quest (lit when mastered) and a quest card with objectives.
- Heroes: kids design a pixel Lightkeeper (skin, hair, outfit, hat, pet) on
  first visit; it walks the map. Coins come with XP (1 per 5 XP).
- Grade bands: 4-5 brighter and bigger, 6-8 classic, 9-12 darker and cleaner.
- All art is drawn in code (`src/lib/pixel/`).

## ✅ Phase 4a — The tutor (Synthesis-style lessons) (built)
- Lessons run as a one-on-one conversation on one screen: the teacher's
  voice with live captions in a bar on top, a big hands-on workspace below.
  The teacher says one or two sentences at a time with a matching slide; the
  hands-on model comes halfway through each part and every part ends with a
  hands-on challenge (fill in, build, match, sort, place on a line, run a
  simulation). No multiple choice. Every existing lesson is converted
  automatically (`src/lib/tutorFlow.ts`).
- Game scoring: each challenge is worth up to 3 stars (first try, no help),
  plus a streak counter, XP, bursts of color and soft chimes.
- Natural voices: with `ELEVENLABS_API_KEY` on the server, teachers speak
  with ElevenLabs voices (male teachers male, female teachers female), with
  word-by-word captions; each sentence is made once and saved
  (`src/lib/tts.ts`). Without a key, the browser voice is used.
- The teacher is a voice, not a face (parents can turn faces back on with
  "Teacher faces").
- Predicting struggle (`src/lib/struggle.ts`): the tutor watches time vs.
  expected, not starting, going quiet, wrong tries, quick guesses, "say that
  again" taps, hints, and the learner model's history for the subject. It
  offers a hint before a wrong answer, steps in with a new explanation
  (analogy, worked example, a smaller first step, an AI re-explanation) when
  a kid is stuck, and stops fast guessing ("let's slow down").
- Pace: support mode speaks one sentence at a time and shows worked examples;
  challenge mode uses longer lines and skips check-ins; three quick right
  answers in a row turn on the "fast lane" mid-lesson.
- Motivation: streak counter, XP, bursts of color and soft chimes (can be
  muted), and a friendly start screen that greets the kid by name.
- Parent switch: "Tutor mode" (off = the classic teaching page).

## ✅ Phase 3f — Lifelike teachers and a one-screen home (built)
- Every teacher is a photo-real (AI-generated, original) person in
  `public/teachers/<id>.jpg`, with short looping clips (<id>-talk.mp4 while
  reading aloud, <id>-idle.mp4 while listening). Set `photo`/`clips` in
  `src/content/avatars.ts`; teachers without a photo use the drawn character.
- Male teachers read in a male voice and female teachers in a female voice
  (`voice` in avatars.ts). The browser's most natural voice of that kind is
  used (Microsoft Edge has the most human-sounding ones); if a computer has
  only one kind, the pitch is shifted.
- The kid home page fits on one screen: a compact header, the 2-hour rings,
  and "Start here" as big, differently colored buttons (math skills, each
  course's next lesson, fact drill). Missions, path, fact speed and badges
  open as tabs.

## ✅ Phase 3e — Picture slides and videos (built)
- The teacher's board has a screen. As the teacher reads, slides change at
  the words they go with: real photos and paintings (from Wikimedia Commons,
  freely licensed, with the credit shown), big emoji pictures, and big numbers
  or key words. Kids can also flip through them.
- Every lesson in all six courses has slides for its opening and each
  teaching part; slides live in `src/content/media/<course>.ts` and show up
  in each lesson's teaching JSON on the Content page (`show` on a part).
- Short videos from educational channels (TED-Ed, Smithsonian, PBS and
  similar) in some lessons. Nothing loads from YouTube until a kid presses
  play (privacy-friendly player, no recommendations). Parents see every video
  on the Content page, can watch it first and hide any of them, and can add
  one by pasting a YouTube link into a part's `watch`.
- Photos are looked up on the server once and cached (30 days). Switches:
  "Picture slides" and "Lesson videos". Test: `MEDIA_NET=1 npx vitest run
  tests/media-net.test.ts` checks every photo and video still exists.

## ✅ Phase 3d — The teacher teaches out loud (built)
- An illustrated teacher for each course stands at the front
  of every lesson part, in a bright royal-blue and white look inspired by
  2 Hour Learning and Alpha School. Teachers blink and their mouths move as
  they talk. Looks live in `src/content/avatars.ts`.
- The teacher reads each part aloud with captions that highlight the current
  sentence and word. Kids can pause, start over, slow down or speed up, and
  turn auto-read off. Hints, praise, answers and feedback are read too, and
  every question has "Read it to me."
- Kids talk back with the mic: explain-it-back, writing and project tasks,
  the math teacher chat, and "Raise my hand" to ask the teacher anything
  during a lesson. Answers are read aloud and never give away the check.
- Teachers remember: what a kid asked or explained in earlier lessons of a
  course is given to the teacher, who connects new ideas to it. Parents can
  read every question on the kid's page.
- Parent switches on the Content page: "Teacher reads aloud" and "Kids can
  talk back (microphone)". Speech-to-text is done by the browser maker; the
  portal saves only text, never audio.

## ✅ Phase 3c — Interactive assessment and the learner model (built)
- Multiple choice replaced by interactive questions in every lesson part and
  every final check: fill in the blank (typed or word bank), number entry,
  drag markers onto number lines and timelines, matching, building
  sentences/equations from tiles, sorting/ordering/highlighting, and
  simulation goals (balance a lever, price for a profit, years to grow
  savings, find the month for a season). Graded on the server with partial
  credit and coaching for specific mistakes.
- Every answer is measured: right first try, time vs expected, tries, and help
  used. A learner model per subject estimates mastery per idea, tracks trends,
  and raises early warnings (accuracy sliding, help climbing, slowing down)
  before scores drop.
- The coach adapts automatically: worked examples first and a warm-up on the
  weakest ideas when a kid is slipping, leading with the kind of help that has
  actually worked for that kid, and a test-out to skip ahead when they're ahead.
- Parents see a learning profile per subject and early-warning flags on the
  overview; the AI weekly summary includes them.

## ✅ Phase 3b — Interactive teaching and coaching (live)
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
