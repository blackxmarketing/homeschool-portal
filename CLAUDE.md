# Homeschool Learning Portal — notes for Claude

A family homeschool portal for two kids in grades 6–8, built by their parents
(Jake and his wife) with Claude Code. Live at https://137-184-200-44.sslip.io.
The look and feel follow 2 Hour Learning / Alpha School: bright royal blue and
white, big friendly buttons, one screen at a time.

## Rules from the parents (always follow)

- **No DEI, gender-identity or pop-culture social-identity content, and no
  present-day politics,** anywhere: lessons, slides, videos, AI prompts,
  quests. Teach academics, money and finance, business and entrepreneurship,
  leadership, character, science, history and civics, in a classical + modern
  style. Pass this rule on to any subagent that writes or picks content.
- **The goal is learning, not testing.** Mastery, coaching, explaining it back.
- **Parents can edit everything** from the parent Content page. New content
  types need defaults in `src/content/`, a sanitizer (`src/lib/content.ts`,
  `src/lib/courseContent.ts`) and a way to edit them.
- **Never touch real kids' data.** Preview with the demo family
  (`node scripts/seed-demo.mjs`, see below). Never point local work at the
  production database.
- **Never type passwords, PINs or API keys for the parents,** and never put
  secrets in chat, code or commits. `.env.local` stays local; the server has
  its own `.env` (the Anthropic key lives only there).
- Keep the kid UI simple and low-scroll: big colored buttons, tabs for extras.
  Test at phone width (375px) as well as laptop width.

## How to work

1. `git pull` first. Two people (and their Claudes) work on this repo; only one
   should change things at a time. Commit and push when a piece is done.
2. Make the change, then run `npm run typecheck`, `npm test` and `npm run build`.
   All must pass before pushing.
3. Check it in the preview (`.claude/launch.json` → `portal-dev`, port 3100) with
   the demo family. Seed it with `node scripts/seed-demo.mjs`; logins and
   ready-made session cookies (`lp_session`) are printed / saved in
   `<DATA_DIR>/demo-sessions.json`.
4. Push to `main`. The server checks GitHub every 5 minutes and redeploys on
   its own (`deploy/update.sh`, Docker + Caddy on a DigitalOcean droplet). To
   confirm a deploy, fetch the live site and look for something new (e.g. a
   new CSS class in a `/_next/static/*.css` file).
5. Commits go out under the family's GitHub account (Jake, jake@blackxmarketing.com),
   from either parent's laptop. If git has no name/email set, commit with
   `git -c user.name="Jake" -c user.email="jake@blackxmarketing.com" commit ...`.
   End commit messages with the Co-Authored-By line Claude Code adds.

Windows tip: in Git Bash, heredocs containing apostrophes or backticks break.
Write scripts to a file with the Write tool and run them with node instead.

## Where things are

- `src/content/` — default content: `courses/*.ts` (six Academy courses, each
  lesson with hook → teaching parts → activity → explain it back → mastery →
  task), `media/*.ts` (picture slides and videos per lesson), `teachers.ts`
  (math teachers), `avatars.ts` (each teacher's look, voice male/female, photo),
  `features.ts` (on/off switches), `quests.ts`, `schedule.ts`.
- `src/lib/` — `store.ts` (all database reads/writes), `db.ts` (SQLite schema,
  add new columns in `ADDED_COLUMNS`), `content.ts` (parent-editable content),
  `courseContent.ts` (lesson validation), `teaching.ts` / `probes.ts` (the
  coaching ladder and interactive questions, graded on the server),
  `learner.ts` (learner model and early warnings), `ai.ts` (Claude:
  `claude-opus-5-5` via `@anthropic-ai/sdk`), `media.ts` / `mediaFetch.ts`
  (Wikimedia photos, cached).
- `src/components/` — `TutorSession.tsx` (lessons as a tutor conversation;
  uses `src/lib/tutorFlow.ts` to build the steps and `src/lib/struggle.ts`
  to predict struggle), `TeachPlayer.tsx` (classic lesson page), `TeacherStage.tsx`
  (teacher + captions + controls), `TeacherFace.tsx` (photo teacher with
  looping clips), `voice.tsx` (read-aloud and mic), `StoryBoard.tsx` (slides),
  `Probes.tsx` (interactive questions).
- The kid side is a pixel-art game, Lumina: design in `docs/GAME.md`; art and
  maps in `src/lib/pixel/` (drawn in code), game data in `src/lib/gameState.ts`,
  screens in `src/components/pixel/`, pages `/kid` (world), `/kid/land/[id]`,
  `/kid/hero`.
- `src/app/kid/` — kid pages (home is `page.tsx`), `src/app/parent/` — parent
  pages, `src/app/api/` — routes (`coach` runs lesson coaching).
- Styles: `src/app/kid-theme.css` (current kid look; tokens on `.kidworld`),
  plus `game.css`, `teach.css`, `globals.css`.
- `public/teachers/` — photo-real teacher portraits (`<id>.jpg`) and clips
  (`<id>-talk.mp4`, `<id>-idle.mp4`), made with the Higgsfield CLI on Jake's
  account (it costs credits; ask before generating more).
- `tests/` — Vitest. `MEDIA_NET=1 npx vitest run tests/media-net.test.ts`
  checks every lesson photo and video still exists online.
- `docs/ROADMAP.md` (what each phase built), `docs/UPDATING.md` (how updates
  reach the server), `docs/NEW-COMPUTER.md` (setting up a new laptop).

## Good to know

- Teachers are original characters "inspired by" historical figures, never
  likenesses of real people.
- Lesson videos are reviewed by the parents on the Content page; pick only
  short, non-political clips from educational channels and verify the YouTube
  id exists (oEmbed) before adding one.
- Read-aloud uses ElevenLabs when `ELEVENLABS_API_KEY` is set on the server
  (`src/lib/tts.ts`, clips cached in DATA_DIR/voice), otherwise the browser's
  built-in speech. The mic uses the browser's speech-to-text.
- No multiple choice in lessons: kids solve hands-on problems (probes and
  widgets). Teachers are a voice by default ("Teacher faces" switch).
