# Updating and tweaking the portal

## The easy way: the Content page

Log in as a parent and open **Content** in the top menu. Everything below can be
edited there with no code: feature switches, AI limits, the fact-drill target,
the 2-hour-day blocks and their daily ideas, the AI teachers and their teaching
method, courses and every lesson (reading, check questions, task and rubric), quests and missions (add your own), focus presets and brain breaks.
Changes show up for the kids on their next page load. Each section has a
"Reset to defaults" button.

The files below are the *defaults*. Edits made on the Content page win over
them, so only change the files if you want new defaults for everyone.

The portal is built so most changes are edits to plain content files. Push the
change to GitHub and the server updates itself within about 5–10 minutes (once
auto-update is turned on, see below). Every update backs up the database first,
so the kids' progress is safe.

## The files you'll change most

All of these live in `src/content/`:

| File | What it controls |
|---|---|
| `features.ts` | Turn whole phases on or off (`true` / `false`): side quests, missions, focus sprints, AI teachers. Also the daily limit on AI teacher messages. |
| `teachers.ts` | The AI teacher characters (names, personalities, stories they tell) and `TEACHING_METHOD`, the teaching style every teacher follows. |
| `schedule.ts` | The 2-hour day: the blocks, their minutes, subjects and daily activity ideas, plus the fact-drill fluency target. |
| `quests.ts` | Side quests (brain benders, creative challenges) and real-world missions. Add one by copying an existing entry and giving it a new `id`. |

Other settings you might tweak:

| File | What it controls |
|---|---|
| `src/lib/focus.ts` | Starting focus settings for kids with and without attention challenges (sprint length, breaks, side-quest frequency, screen cap), and the brain-break ideas. Parents can still change each kid's settings in Settings. |
| `src/lib/game.ts` | Levels, ranks, world names and badges. |
| `src/lib/curriculum/skills.ts` | The math skills, their question generators and pictures. |

## Making a change

1. Edit the file (on GitHub's website: open the file, click the pencil icon, edit, then "Commit changes").
2. That's it. With auto-update on, the server picks it up within about 5–10 minutes.

To update right away instead, open the Droplet console and run:

```bash
bash /opt/homeschool-portal/deploy/update.sh
```

## Turning on auto-update (one time)

In the Droplet console:

```bash
bash /opt/homeschool-portal/deploy/enable-auto-update.sh
```

Watch it work: `tail -f /var/log/homeschool-auto-update.log`. Turn it off:
`rm /etc/cron.d/homeschool-auto-update`.

## Turning on the AI teachers' full brains

Without an API key, teachers still work but reply with each skill's built-in
hints and solutions. For real conversations, add an Anthropic API key:

```bash
nano /opt/homeschool-portal/.env      # set ANTHROPIC_API_KEY=...  then Ctrl+O, Enter, Ctrl+X
cd /opt/homeschool-portal && docker compose up -d
```

Every message kids send and every reply is saved; parents can read them on each
kid's page under "Teacher conversations". `AI_LIMITS` in `features.ts` caps how
many messages each kid can send per day.

## Turning on the natural teacher voice (ElevenLabs)

Without a key, teachers read aloud with the browser's built-in voice. For a
natural, human-sounding voice:

1. Make an account at elevenlabs.io and pick a plan (the Starter plan covers
   a family; every sentence is made once and saved on the server, so lessons
   are only paid for the first time they're heard).
2. In ElevenLabs: your profile → API Keys → create a key (you can limit it to
   "Text to Speech" and "Voices: read").
3. On the server:

```bash
nano /opt/homeschool-portal/.env      # add ELEVENLABS_API_KEY=...  then Ctrl+O, Enter, Ctrl+X
cd /opt/homeschool-portal && docker compose up -d
```

The portal picks a warm male and female narrator from your ElevenLabs voices
(male teachers get the male voice). To choose your own, add their voice ids:
`ELEVENLABS_VOICE_MALE=...` and `ELEVENLABS_VOICE_FEMALE=...`.
`ELEVENLABS_DAILY_CHARS` (default 20000) caps how many new characters can be
made per day, so nothing can run up a bill. If ElevenLabs is ever unavailable,
the browser voice takes over automatically.

## Checking a change before it goes live

On a computer with Node 22+:

```bash
npm install
npm test            # content and engine checks
npm run typecheck
npm run build
```

`npm test` checks that every quest, teacher and question generator is complete
and consistent, so a typo in a content file gets caught before it ships.
