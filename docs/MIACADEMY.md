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

The page talks to whatever is hosting it through `window.miaHud` (the
extension sets it):

- `onMiacademy(cb)`: calls `cb(true/false)` when Miacademy opens or closes (drives
  the reminder).
- `setFullscreen(on)`: asks for full screen during a break, and back afterwards.
