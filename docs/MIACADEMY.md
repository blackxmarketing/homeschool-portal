# Miacademy timers

A strip on the right of each kid's screen while they work in Miacademy: four
30-minute subject timers (Math, Language Arts, Science, History), each run once
a day. Separate from the 2-hour day. The design prototype is
`prototypes/learning-timers.html`.

## How it works

- **Kid page:** `/kid/miacademy` (`src/components/miacademy/MiaHud.tsx`). Tap a
  subject to open it (the others hide), press Start. When it ends it goes back
  to the four timers, dimmed and marked done. `?demo=1` runs at demo speed
  (1-minute timer, 40-second break) in the preview only, never in production.
- **The rules:** `src/lib/miaTimer.ts`, pure functions of (state, now), tested in
  `tests/miacademy.test.ts`. The server keeps each timer in `mia_timers` (one row
  per kid, day and subject); the screen only asks for changes via `/api/mia`.
- **Teacher voice** (female, through `speak()` in `voice.tsx`):
  - when the timer starts, at 15 minutes left and at 5 minutes left;
  - when time is up;
  - check-ins at 5, 10 and 20 minutes in. At 5 and 20 it asks "Are you on task?"
    and the kid taps "Yes, I'm on it!"; a missed answer is counted. At 10 it
    encourages.

  The words are in `src/content/miacademy.ts`.
- **Pause** (parents can turn it off) asks why:
  - **I need help:** the timer waits and a parent is alerted. It restarts with
    the parent PIN on the kid's screen (optional per kid), or with "Restart
    timer" on the family overview.
  - **I need a break:** one per subject, 1-5 minutes (set per kid). The kid's
    buddy (panda or wolf, set per kid) walks across a full-screen break, with a
    30-second warning. After the break the kid must press Start. If they don't
    within 60 seconds, a parent is alerted.
- **Reminder:** when Miacademy is open but no timer is running, the strip
  reminds the kid after 2 minutes, then every 5. The third reminder also alerts
  a parent (at most every 15 minutes).
- **Parents:**
  - Settings → each kid → "Miacademy timers": pausing, break length, PIN for
    help, buddy.
  - Settings → "Parent PIN" (4-6 digits; five wrong tries lock it for 5 minutes).
  - Family overview: alerts, plus today's timers with Restart / Allow again today
    / Stop and reset.

## The step-by-step checklist (phase 4)

Turned on per kid and subject in Settings ("lessons a week"; Off = no checklist).
Started with Bryce's General Science, 1 lesson a week.

- **Where lessons come from.** The extension's `page-hook.ts` runs in Miacademy's
  page and passes on (read-only) the assignments data Miacademy loads for itself
  (`LearningPathController/BatchConvertAssignedCourses`) and any lesson-PDF links.
  It sends them to `/api/mia/path`; `miaPathSync` (store.ts) keeps track of the
  lesson each kid is on.
  - Only tasks a parent checked in Miacademy show up there.
  - Reaching the quiz means the video is done; moving to a new lesson means the
    quiz is done. Miacademy itself makes them retake a failed quiz.
- **The items.** When a lesson's Student PDF link is known (seen on the lesson page,
  or guessed from the last lesson's), Claude reads the checklist box on page 1
  (`readLessonPdf` in ai.ts). Each activity becomes one item, minus online
  practice, optional, bonus and re-watch lines (`MIA_SKIP_ITEMS`).
  - Video / quiz: checked off by Miacademy.
  - Worksheets: a photo, compared with the answer key (same name, "Answer Key"
    instead of "Student PDF") by `checkWorksheetPhoto`. The app lists what to fix;
    the kid fixes it with a pen and takes another photo until it's right. The first
    photo's score is kept, and under 70% alerts a parent. Stuck after three tries:
    finish, and a parent is told.
  - Hands-on / supplies: the timer pauses by itself to gather supplies. A parent
    restarts it (family overview, or the PIN on the kid's screen) or skips the
    activity. Afterwards a photo goes to the parent to approve.
- **The strip** shows the next three items (the top one big, two dim). A finished
  item pops away and the next slides up. "This week: 0 of 1 lesson" counts lessons
  whose every item is done, Monday to Sunday.
- Photos are kept in `DATA_DIR/mia-photos/<kidId>/`; parents see them at
  `/api/mia/photo/...`.
- Preview without a Claude key: the photo check answers with a stand-in (two to
  fix, then all fixed), so the screens can be tried. Never on the live site.

### Rules per lesson (miaLessonRules, MIA_COURSE_PLANS in src/content/miacademy.ts)

- Guided notes are always done in the packet and checked off with a tap; only
  PDF activities are photo-checked. Optional and bonus lines are always left off.
- Science, Math: video, guided notes, PDF activities, quiz (no online practice).
  Math "Wrap Up" lessons: online practice levels instead of the packet.
- U.S. Geography (History): video, guided notes (Listening Sheet), every online
  practice level (one "all levels" item, since its packet has no checklist), quiz.
- Language Arts is three classes sharing one 30-minute timer. Today's first class
  gets the first 15 minutes (until it's done for the week), then Level E (Revised):
  - Reading Comprehension: 1 lesson a week, Mondays (carries over to the next day if
    unfinished), online only.
  - Edition 1: 1 lesson a week, Tuesday-Thursday, online only.
  - Level E (Revised 2026): 2 lessons a week, the rest of the time, and keeps going
    ahead into next week. The lesson before each unit assessment (spotted by
    reading the next numbered PDF) gets 4 school days and counts as a whole week.
  - Online-only classes list each Miacademy task as it comes up (no PDF items).
  - Plain Level G (no edition, Emme): 2 lessons a week, keeps going ahead. A unit
    project or portfolio lesson (by its title) gets 4 school days and counts as a whole week.
  - Each kid only gets the classes Focus Buddy has seen them take (calendar,
    assignments page or lessons); with none seen yet, one of each.
- Ancient World History: video, guided notes, PDF activities, quiz; never online practice.
- Science: online practice only when the parent marked it in Miacademy.

### Parent mode: the checklist from the parent's Miacademy calendar

Focus Buddy on a parent's computer (Settings → "Focus Buddy on a parent's
computer" → parent connect code). When the parent opens a child's **Calendar**
tab on parents.miacademy.co, `extension/src/parent.ts` reads (GET only) that
child's calendar for this week and the next five and sends it to `/api/mia/plan`.

- `lib/miaPlan.ts` turns it into tasks (`mia_plan_tasks`): only marked tasks are
  on it, each with its lesson, type, status and exact PDF link. Students are
  matched to kids by first name; Settings → "Miacademy students" can change it.
- `miaPlanLessons` builds each lesson's items from those tasks (video, practice
  levels, quiz by task id; guided notes and activities read off the exact PDF),
  with the same rules as before. A task is done when Miacademy says so, or when
  the kid's assignments page (`mia_path`) has moved past it.
- Classes not on the calendar yet fall back to learning from the kid's pages.

## The build, in phases

It runs as a **Chrome extension**: the timer strip appears on the right of every
Miacademy page by itself, and the extension can read the page, so it knows which
lesson a kid is on. (A desktop app could only see the window title.) The portal
keeps everything else: the timers' state, the teacher voice, settings and
alerts.

| Phase | What | Needs from the parents |
|---|---|---|
| 1 | **Kid-friendly look**: buddy greeting, big chunky buttons, stars for finished subjects | |
| 2 | **Chrome extension**: the strip on Miacademy pages, a connect code from Settings, teacher voice, full-screen breaks, the "don't forget your timer" reminder. Tested on a pretend Miacademy page | |
| 3 | **Go live**: portal deployed; extension published **unlisted** on the Chrome Web Store; installed and locked on each kid's computer | A Chrome Web Store developer account (one-time $5 Google fee), then installing on each computer |
| 4 | **Miacademy connection**: reading the lesson pages; the step-by-step checklist (online lessons + packets); the packet photo check against the answer keys; alerts under 70% | A walk-through of the Miacademy pages (signed in by a parent) and where the packets and answer keys are |
| 5 | **Weekly goals and money**: lessons per week per subject (Mon-Thu, weekend catch-up); on-task tracking (tab switching); 25¢ / 15¢ / 0¢ per class; the panda / wolf bank and the monthly transfer | Lessons per week for each subject |
| 6 | **Phone notifications** for alerts | Adding the portal to a phone's home screen |
| 7 | **Elective timers** | Which electives |

## The Chrome extension ("Focus Buddy", `extension/`)

- **Connecting:** a parent opens Settings → the kid → "Chrome extension" → **Make a
  connect code** (6 letters, works once, for 15 minutes). On the kid's computer,
  they click the Focus Buddy icon in Chrome and type the code. The extension gets
  its own token (`mia_devices`; only a hash is kept). Settings lists connected
  computers with **Disconnect**. Disconnecting from the extension itself needs the
  parent PIN, so a kid can't switch it off.
- **Parts:**
  - `src/content.tsx` draws the same `MiaHud` strip on Miacademy pages (in a
    shadow root, 360px wide, pushing the page over).
  - `src/background.ts` makes every portal call with the token (`Authorization:
    Bearer`, accepted by `/api/mia` and `/api/voice`).
  - `src/offscreen.ts` plays the teacher's voice (the portal's natural voice,
    or Chrome's own if that's off) and the chime.
  - `static/popup.html` is the connect screen.
- **Build:** `npm run ext:build` makes `extension/dist` for the live portal (this
  is what goes to the Chrome Web Store); `extension/version.json` holds the
  version. `--dev` also allows `http://localhost:3100`.
- **Checking it without installing:** run `npm run ext:dev` (or the
  `focus-buddy-dev` preview, with `portal-dev` running too) and open
  http://localhost:3200. That's a pretend Miacademy page running the real content
  script. Make a connect code for a demo kid, then in the page's console run
  `__pair("CODE")`.
- **Miacademy addresses:** students use `miacademy.co`; the parent site
  (`parents.miacademy.co`) gets no timers (`build.mjs`).

The page talks to whatever is hosting it through `window.miaHud` (the
extension sets it):

- `onMiacademy(cb)`: calls `cb(true/false)` when Miacademy opens or closes (drives
  the reminder).
- `setFullscreen(on)`: asks for full screen during a break, and back afterwards.

### Between classes, and overtime

- When a class's 30 minutes are up and another class is left today, the kid
  picks "I'm ready!" (starts the next class) or a quick 5-minute break
  (`MIA_BETWEEN_BREAK_MINUTES`). That break uses the break screen
  (`src/components/miacademy/BreakScene.tsx`); the buddy takes turns walking,
  floating on its back, climbing a mountain or a tree, or riding a bike. When it
  ends, the next class opens and the teacher says to press Start.
- Overtime: if time runs out while the kid is on a Miacademy task page (the
  extension reports the `taskAssignment` in the address), the timer counts up
  instead of stopping. It finishes when they move on from that task, tap
  "I finished", or after `MIA_OVERTIME_MAX_MINUTES` (20). Finishing after
  overtime pays `MIA_PAY.overtime` (5¢) once per subject a day, on top of the
  rings; past `MIA_OVERTIME_ALERT_MINUTES` (15) a parent gets a note.

### Vocabulary first

Each school day (Monday-Thursday) a kid who takes a Miacademy Vocabulary class
starts with it: the strip shows "First: Vocabulary" with today's marked
vocabulary tasks from the parent's calendar, and the core timers wait ("After
Vocabulary"; the server refuses to start one too). It's done when Miacademy
marks today's tasks complete, when the kid's assignments page has moved past
them, or when the kid taps "I finished Vocabulary" (`mia_daily`). No timer, no
pay. The calendar files any course with "Vocabulary" in its title under its own
subject, `vocab`, so it never joins Language Arts. `miaVocab` in `store.ts`.
