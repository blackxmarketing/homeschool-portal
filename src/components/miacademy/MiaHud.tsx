"use client";

import { useEffect, useRef, useState } from "react";
import {
  BUDDIES,
  MIA_CHECKIN_ANSWER_SECONDS,
  MIA_LINES,
  MIA_MINUTES,
  MIA_REMIND_AFTER_SECONDS,
  MIA_REMIND_EVERY_SECONDS,
  MIA_SUBJECTS,
  type MiaSettings,
  type MiaSubject,
} from "@/content/miacademy";
import { isOpen, isRunning, lateMs, remaining, type MiaTimerState } from "@/lib/miaTimer";
import Buddy from "./Buddy";
import Checklist from "./Checklist";
import type { MiaChecklist } from "@/lib/store";

export type Timers = Record<string, MiaTimerState | null>;

/** One call to the portal's /api/mia. The portal page uses fetch; the Chrome extension goes through its background worker. */
/** One call to the portal (default /api/mia). The portal page uses fetch; the Chrome extension goes through its background worker. */
export type MiaApi = (
  body: Record<string, unknown>,
  path?: string,
) => Promise<{
  ok: boolean;
  data: { timers?: Timers; settings?: MiaSettings; checklists?: Checklists; serverNow?: number; error?: string } & Record<string, unknown>;
}>;
export type Checklists = Record<string, MiaChecklist | null>;

/** What hosts the page (the Chrome extension) adds. Missing in a normal browser tab. */
interface HostBridge {
  onMiacademy?: (cb: (open: boolean) => void) => void;
  /** New checklists after the extension reports what Miacademy's pages show. */
  onChecklists?: (cb: (c: Checklists) => void) => void;
  setFullscreen?: (on: boolean) => void;
}
const bridge = (): HostBridge | undefined =>
  typeof window === "undefined" ? undefined : (window as unknown as { miaHud?: HostBridge }).miaHud;

export const portalApi: MiaApi = async (body, path = "/api/mia") => {
  try {
    const res = await fetch(path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    return { ok: res.ok, data: await res.json().catch(() => ({})) };
  } catch {
    return { ok: false, data: { error: "Can't reach the portal. Check the internet." } };
  }
};

const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];

function mmss(ms: number): string {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

interface Checkin {
  text: string;
  ask: boolean;
  at: number;
}

export default function MiaHud({
  kidName,
  settings: initialSettings,
  initialTimers,
  initialChecklists = {},
  serverNow,
  demo,
  api = portalApi,
  say: sayRaw,
}: {
  kidName: string;
  settings: MiaSettings;
  initialTimers: Timers;
  initialChecklists?: Checklists;
  serverNow: number;
  demo: boolean;
  api?: MiaApi;
  /** Speaks a line in the teacher's voice. */
  say: (text: string) => void;
}) {
  const [timers, setTimers] = useState<Timers>(initialTimers);
  const [settings, setSettings] = useState<MiaSettings>(initialSettings);
  const [checklists, setChecklists] = useState<Checklists>(initialChecklists);
  const [skipMode, setSkipMode] = useState(false);
  const [offset, setOffset] = useState(() => serverNow - Date.now());
  const [now, setNow] = useState(serverNow);
  const [focus, setFocus] = useState<string | null>(() => MIA_SUBJECTS.find((s) => isOpen(initialTimers[s.id]))?.id ?? null);
  const [error, setError] = useState<string | null>(null);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [checkin, setCheckin] = useState<Checkin | null>(null);
  const [reminder, setReminder] = useState(false);
  const [miaOpen, setMiaOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const openId = MIA_SUBJECTS.find((s) => isOpen(timers[s.id]))?.id ?? null;
  const doneCount = MIA_SUBJECTS.filter((s) => timers[s.id]?.finishedAt).length;
  const allDone = doneCount === MIA_SUBJECTS.length;

  const buddyName = BUDDIES.find((b) => b.id === settings.buddy)?.name ?? "Buddy";
  const subjectName = (id: string) => MIA_SUBJECTS.find((s) => s.id === id)?.name ?? id;
  const fill = (text: string, subject?: string) =>
    text
      .replace("{subject}", subject ? subjectName(subject) : "")
      .replace("{minutes}", String(MIA_MINUTES))
      .replace("{buddy}", buddyName.toLowerCase());
  // Only the tab the kid is looking at talks, in case Miacademy is open twice.
  const say = (text: string) => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
    sayRaw(text);
  };

  async function post(body: Record<string, unknown>): Promise<boolean> {
    setBusy(true);
    setError(null);
    const { ok, data } = await api({ ...body, demo });
    if (data.serverNow) setOffset(data.serverNow - Date.now());
    if (data.timers) setTimers(data.timers);
    if (data.settings) setSettings(data.settings);
    if (data.checklists) setChecklists(data.checklists);
    if (!ok) setError(data.error ?? "Something went wrong.");
    setBusy(false);
    return ok;
  }

  // Stay in step with the portal: a parent may restart a timer or change a setting.
  // Every 5 seconds while waiting for a grown-up, otherwise every 30.
  const waitingForHelp = !!openId && (timers[openId]?.pause?.type === "help" || timers[openId]?.pause?.type === "supplies");
  useEffect(() => {
    const id = setInterval(async () => {
      if (document.visibilityState === "hidden") return;
      const { ok, data } = await api({ action: "sync" });
      if (!ok) return;
      if (data.serverNow) setOffset(data.serverNow - Date.now());
      if (data.timers) {
        // A parent restarted a timer from the family overview.
        const was = live.current.openId ? live.current.timers[live.current.openId] : null;
        const now = live.current.openId ? data.timers[live.current.openId] : null;
        if ((was?.pause?.type === "help" || was?.pause?.type === "supplies") && now && isRunning(now)) say(fill(MIA_LINES.helpDone, live.current.openId!));
        setTimers(data.timers);
      }
      if (data.settings) setSettings(data.settings);
      if (data.checklists) setChecklists(data.checklists);
    }, waitingForHelp ? 5000 : 30000);
    return () => clearInterval(id);
  }, [api, waitingForHelp]);
  const act = (subject: string, action: string, extra: Record<string, unknown> = {}) => post({ subject, action, ...extra });

  // ---- The clock: announcements, check-ins, breaks, finishing, reminders ----
  const live = useRef({ timers, offset, checkin, miaOpen, openId, allDone });
  live.current = { timers, offset, checkin, miaOpen, openId, allDone };
  const last = useRef<{ key: string; rem: number; brem: number } | null>(null);
  const sent = useRef(new Set<string>());
  const remind = useRef<{ since: number | null; count: number }>({ since: null, count: 0 });

  useEffect(() => {
    const tick = () => {
      const { timers, offset, checkin, miaOpen, openId, allDone } = live.current;
      const t = Date.now() + offset;
      setNow(t);
      const once = (key: string, fn: () => void) => {
        if (sent.current.has(key)) return;
        sent.current.add(key);
        fn();
      };

      // Check-in answer window
      if (checkin) {
        const age = t - checkin.at;
        if (checkin.ask && age >= (demo ? 6000 : MIA_CHECKIN_ANSWER_SECONDS * 1000)) {
          setCheckin(null);
          if (openId) void act(openId, "missedCheckin");
        } else if (!checkin.ask && age >= 8000) setCheckin(null);
      }

      // Reminder: Miacademy is open but no timer is going
      if (miaOpen && !openId && !allDone) {
        const r = remind.current;
        r.since ??= t;
        const first = (demo ? 10 : MIA_REMIND_AFTER_SECONDS) * 1000;
        const every = (demo ? 15 : MIA_REMIND_EVERY_SECONDS) * 1000;
        if (t - r.since >= first + r.count * every) {
          r.count++;
          setReminder(true);
          say(MIA_LINES.remind);
          if (r.count === 3) void post({ action: "remindIgnored" });
        }
      } else {
        remind.current = { since: null, count: 0 };
        if (openId) setReminder(false);
      }

      if (!openId) {
        last.current = null;
        return;
      }
      const s = timers[openId]!;
      const key = `${openId}:${s.startedAt}`;
      const rem = remaining(s, t);
      const brem = s.pause?.type === "break" ? s.pause.endAt - t : 0;
      const prev = last.current?.key === key ? last.current : null;
      last.current = { key, rem, brem };

      if (isRunning(s)) {
        if (prev) {
          const half = s.durMs / 2;
          const five = s.durMs / 6;
          if (prev.rem > half && rem <= half) say(MIA_LINES.half);
          if (prev.rem > five && rem <= five) say(MIA_LINES.five);
          // Check-ins every 5 minutes: a question at 5 and 20 minutes in, encouragement at 10.
          const step = s.durMs / 6;
          const n = Math.floor((s.durMs - rem) / step);
          const prevN = Math.floor((s.durMs - prev.rem) / step);
          if (n > prevN && (n === 1 || n === 2 || n === 4)) {
            const ask = n !== 2;
            const text = fill(pick(ask ? MIA_LINES.checkinAsk : MIA_LINES.checkinCheer), openId);
            setCheckin({ text, ask, at: t });
            say(text);
          }
        }
        if (rem <= 0)
          once(`${key}:finish`, async () => {
            if (await act(openId, "finish")) {
              setFocus(null);
              setCheckin(null);
              say(fill(MIA_LINES.done, openId));
            }
          });
      } else if (s.pause?.type === "break") {
        if (prev && prev.brem > 30000 && brem <= 30000) say(MIA_LINES.breakWarn);
        if (brem <= 0)
          once(`${key}:break${s.pause.at}`, async () => {
            if (await act(openId, "breakDone")) say(fill(MIA_LINES.breakOver, openId));
          });
      } else if (s.pause?.type === "ready" && !s.pause.lateTold && t - s.pause.since >= lateMs(s)) {
        once(`${key}:late${s.pause.since}`, async () => {
          await act(openId, "late");
          say(fill(MIA_LINES.late, openId));
        });
      }
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo]);

  // ---- The host (Chrome extension): knows when Miacademy is open, and goes full screen for breaks ----
  useEffect(() => {
    bridge()?.onMiacademy?.((open) => setMiaOpen(open));
    bridge()?.onChecklists?.((c) => setChecklists(c));
  }, []);
  const onBreak = !!openId && timers[openId]?.pause?.type === "break";
  useEffect(() => {
    bridge()?.setFullscreen?.(onBreak);
  }, [onBreak]);

  // ---- Actions ----
  async function start(subject: string) {
    const fresh = !timers[subject];
    if (await act(subject, "start")) {
      setReminder(false);
      say(fresh ? fill(MIA_LINES.start, subject) : `Let's go! Back to ${subjectName(subject)}.`);
    }
  }
  async function chooseHelp(subject: string) {
    if (await act(subject, "help")) say(MIA_LINES.help);
  }
  async function chooseBreak(subject: string) {
    if (await act(subject, "break")) say(fill(MIA_LINES.breakStart, subject));
  }
  async function endBreakEarly(subject: string) {
    if (await act(subject, "breakDone")) say(fill(MIA_LINES.breakEarly, subject));
  }
  async function helpRestart(subject: string, skip = false) {
    const needPin = settings.helpPin || timers[subject]?.pause?.type === "supplies";
    if (needPin && !pinOpen) {
      setPin("");
      setError(null);
      setSkipMode(skip);
      setPinOpen(true);
      return;
    }
    if (await act(subject, "helpResume", { ...(needPin ? { pin } : {}), skip: skipMode || skip })) {
      setPinOpen(false);
      say(skipMode || skip ? `Okay! On to the next activity in ${subjectName(subject)}.` : fill(MIA_LINES.helpDone, subject));
    }
  }
  function answerCheckin() {
    setCheckin(null);
    say(pick(MIA_LINES.checkinThanks));
  }

  // ---- Screens ----
  const focused = focus ? MIA_SUBJECTS.find((s) => s.id === focus)! : null;
  const ft = focused ? timers[focused.id] : null;

  // Subjects with two classes a day: the first 15 minutes go to today's first class
  // (until it's done for the week), then the main class gets the rest.
  const fc = focused ? checklists[focused.id] : null;
  const mainPart = fc ? Math.max(0, fc.parts.findIndex((p) => p.slot === "main")) : 0;
  const halfOver = !!ft && ft.durMs - remaining(ft, now) >= ft.durMs / 2;
  const partIndex = fc && fc.firstToday !== null && !halfOver ? fc.firstToday : mainPart;
  const twoClasses = !!fc && fc.parts.length > 1;
  const prevPart = useRef<{ subject: string | null; part: number }>({ subject: null, part: -1 });
  useEffect(() => {
    const prev = prevPart.current;
    prevPart.current = { subject: focused?.id ?? null, part: partIndex };
    if (!fc || !twoClasses || !isRunning(ft) || prev.subject !== focused?.id || prev.part === partIndex || prev.part < 0) return;
    const was = fc.parts[prev.part]?.name ?? "your first class";
    const next = fc.parts[partIndex]?.name ?? "your next class";
    say(halfOver ? `Time to switch! Now work on ${next}.` : `Great job finishing ${was}! Now switch to ${next}.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partIndex, focused?.id]);
  const hello = allDone
    ? "You did it! All done today! 🎉"
    : !focused
      ? reminder
        ? "Don't forget your timer!"
        : "Pick a subject to start!"
      : !ft
        ? "Ready? Press Start!"
        : isRunning(ft)
          ? "You've got this!"
          : ft.pause?.type === "help"
            ? "Help is on the way!"
            : "Let's get back to it!";

  return (
    <div className={`mia-hud ${focused ? "focus" : ""}`}>
      <header className="mia-hello">
        <div className="mia-hello-face">
          <Buddy kind={settings.buddy} head />
        </div>
        <div>
          <div className="mia-hi">Hi, {kidName}!</div>
          <div className="mia-sub">{hello}</div>
        </div>
        {demo && (
          <button className="mia-demo" onClick={() => setMiaOpen((o) => !o)} title="Pretend Miacademy is open or closed">
            demo: Miacademy {miaOpen ? "open" : "closed"}
          </button>
        )}
      </header>

      {!focused && (
        <div className="mia-stars" aria-label={`${doneCount} of ${MIA_SUBJECTS.length} subjects done today`}>
          {MIA_SUBJECTS.map((s, i) => (
            <span key={s.id} className={i < doneCount ? "on" : ""}>
              ★
            </span>
          ))}
          <span className="mia-stars-text">
            {doneCount} of {MIA_SUBJECTS.length} done today
          </span>
        </div>
      )}

      {reminder && !openId && (
        <div className="mia-reminder" role="alert">
          <span className="mia-wiggle">⏰</span> {MIA_LINES.remind}
        </div>
      )}
      {error && !pinOpen && (
        <div className="mia-error" role="alert" onClick={() => setError(null)}>
          {error}
        </div>
      )}

      {!focused &&
        MIA_SUBJECTS.map((s) => {
          const t = timers[s.id];
          const done = !!t?.finishedAt;
          const blocked = !done && !!openId && openId !== s.id;
          return (
            <button
              key={s.id}
              className={`mia-card ${done ? "done" : ""}`}
              style={{ ["--c" as string]: s.color }}
              onClick={() => !done && !blocked && setFocus(s.id)}
              aria-disabled={done || blocked}
            >
              <Face color={s.color} fraction={done ? 0 : t ? remaining(t, now) / t.durMs : 1} />
              <div className="mia-card-text">
                <div className="mia-name">
                  <span className="mia-icon">{s.icon}</span> {s.name}
                </div>
                <div className="mia-time">{done ? "All done!" : `${mmss(t ? remaining(t, now) : (demo ? 60 : MIA_MINUTES * 60) * 1000)}`}</div>
                {!done && <div className="mia-status">{t ? "Keep going ▶" : blocked ? "Finish your other subject first" : "Tap to start ▶"}</div>}
              </div>
              {done && <span className="mia-sticker">⭐ Done!</span>}
            </button>
          );
        })}

      {focused && (
        <FocusedTimer
          subject={focused}
          t={ft}
          now={now}
          settings={settings}
          busy={busy}
          checkin={checkin}
          demo={demo}
          onStart={() => start(focused.id)}
          onPause={() => act(focused.id, "pause")}
          onBack={() => setFocus(null)}
          onHelpRestart={(skip) => helpRestart(focused.id, skip)}
          onAnswer={answerCheckin}
        />
      )}

      {focused && fc && twoClasses && (
        <div className="mia-classes">
          {fc.firstToday !== null && (
            <span className={partIndex === fc.firstToday ? "on" : "done"}>
              {partIndex === fc.firstToday ? "▶" : "✓"} First 15 min: {fc.parts[fc.firstToday].name}
            </span>
          )}
          <span className={partIndex === mainPart ? "on" : ""}>
            {partIndex === mainPart ? "▶ " : ""}
            {fc.firstToday !== null ? "Then: " : "All 30 min: "}
            {fc.parts[mainPart].name}
          </span>
        </div>
      )}

      {focused &&
        (fc ? (
          <Checklist
            key={`${focused.id}-${partIndex}`}
            checklist={fc.parts[partIndex]}
            part={partIndex}
            color={focused.color}
            running={isRunning(ft)}
            api={api}
            say={say}
            onChecklists={setChecklists}
            onSupplies={(lessonId, itemId) => void act(focused.id, "supplies", { lessonId, itemId })}
          />
        ) : (
          <div className="mia-checklist-soon">
            <span>📝</span> Your step-by-step checklist will show up here soon!
          </div>
        ))}

      {/* Pause: why? */}
      {focused && ft?.pause?.type === "choosing" && (
        <div className="mia-scrim" style={{ ["--c" as string]: focused.color }}>
          <div className="mia-chooser">
            <h2>Why do you need to pause?</h2>
            <div className="mia-choices">
              <button className="mia-choice" onClick={() => chooseHelp(focused.id)} disabled={busy}>
                <span className="mia-emoji">🙋</span>I need help<small>A grown-up will come</small>
              </button>
              <button className="mia-choice" onClick={() => chooseBreak(focused.id)} disabled={busy || ft.breaks >= 1}>
                <span className="mia-emoji">
                  <Buddy kind={settings.buddy} head className="mia-choice-buddy" />
                </span>
                I need a break
                <small>
                  {ft.breaks >= 1
                    ? `You already had your break for ${focused.name}`
                    : demo
                      ? "40 seconds (demo)"
                      : `${settings.breakMinutes} minute${settings.breakMinutes > 1 ? "s" : ""}`}
                </small>
              </button>
            </div>
            <button className="mia-btn ghost" onClick={() => act(focused.id, "cancel")} disabled={busy}>
              Never mind, keep going
            </button>
          </div>
        </div>
      )}

      {/* Break: the buddy walks across the screen for the whole break */}
      {focused && ft?.pause?.type === "break" && (
        <BreakScreen t={ft} now={now} buddy={settings.buddy} buddyName={buddyName} color={focused.color} onDone={() => endBreakEarly(focused.id)} />
      )}

      {/* Grown-up PIN to restart after help */}
      {pinOpen && focused && (
        <div className="mia-scrim">
          <form
            className="mia-chooser"
            onSubmit={(e) => {
              e.preventDefault();
              void helpRestart(focused.id);
            }}
          >
            <h2>{skipMode ? "Grown-up: skip this activity" : "Grown-up: start the timer again"}</h2>
            <input
              className="mia-pin"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="Parent PIN"
              autoFocus
            />
            {error && <div className="mia-error">{error}</div>}
            <div className="mia-row">
              <button type="button" className="mia-btn ghost" onClick={() => setPinOpen(false)}>
                Cancel
              </button>
              <button className="mia-btn" disabled={busy || pin.length < 4}>
                {skipMode ? "Skip it" : "Start timer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function FocusedTimer({
  subject,
  t,
  now,
  settings,
  busy,
  checkin,
  demo,
  onStart,
  onPause,
  onBack,
  onHelpRestart,
  onAnswer,
}: {
  subject: MiaSubject;
  t: MiaTimerState | null;
  now: number;
  settings: MiaSettings;
  busy: boolean;
  checkin: Checkin | null;
  demo: boolean;
  onStart: () => void;
  onPause: () => void;
  onBack: () => void;
  onHelpRestart: (skip?: boolean) => void;
  onAnswer: () => void;
}) {
  const full = (demo ? 60 : MIA_MINUTES * 60) * 1000;
  const rem = t ? remaining(t, now) : full;
  let controls: React.ReactNode;
  if (!t)
    controls = (
      <>
        <button className="mia-btn big go" onClick={onStart} disabled={busy}>
          ▶ Start!
        </button>
        <button className="mia-link" onClick={onBack}>
          ← Pick a different subject
        </button>
      </>
    );
  else if (t.pause?.type === "help")
    controls = (
      <>
        <div className="mia-waiting">✋ Paused. A grown-up is coming to help!</div>
        <button className="mia-btn" onClick={() => onHelpRestart()} disabled={busy}>
          Grown-up: start timer
        </button>
      </>
    );
  else if (t.pause?.type === "supplies")
    controls = (
      <>
        <div className="mia-waiting">🧰 Timer paused. Gather your supplies with a grown-up!</div>
        <button className="mia-btn" onClick={() => onHelpRestart()} disabled={busy}>
          Grown-up: supplies ready
        </button>
        <button className="mia-btn ghost" onClick={() => onHelpRestart(true)} disabled={busy}>
          Grown-up: skip it
        </button>
      </>
    );
  else if (t.pause?.type === "ready")
    controls = (
      <>
        <div className="mia-waiting">Break&apos;s over! Press Start when you&apos;re back in your seat.</div>
        {t.pause.lateTold && <div className="mia-status">We let a grown-up know.</div>}
        <button className="mia-btn big go" onClick={onStart} disabled={busy}>
          ▶ Start!
        </button>
      </>
    );
  else if (isRunning(t))
    controls = settings.allowPause ? (
      <button className="mia-btn soft" onClick={onPause} disabled={busy}>
        ⏸ Pause
      </button>
    ) : null;

  return (
    <div className="mia-big" style={{ ["--c" as string]: subject.color }}>
      <div className="mia-big-head">
        <span className="mia-icon">{subject.icon}</span> {subject.name}
      </div>
      <Face color={subject.color} fraction={t ? rem / t.durMs : 1} big />
      <div className="mia-time">{mmss(rem)}</div>
      <div className="mia-row">{controls}</div>
      {checkin && (
        <div className="mia-checkin">
          <Buddy kind={settings.buddy} head className="mia-checkin-face" />
          <div className="mia-bubble">
            <div>{checkin.text}</div>
            {checkin.ask && (
              <button className="mia-btn small" onClick={onAnswer}>
                👍 Yes, I&apos;m on it!
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BreakScreen({
  t,
  now,
  buddy,
  buddyName,
  color,
  onDone,
}: {
  t: MiaTimerState;
  now: number;
  buddy: MiaSettings["buddy"];
  buddyName: string;
  color: string;
  onDone: () => void;
}) {
  const p = t.pause?.type === "break" ? t.pause : null;
  const [width, setWidth] = useState(1000);
  useEffect(() => {
    const set = () => setWidth(window.innerWidth);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  if (!p) return null;
  const rem = Math.max(0, p.endAt - now);
  const progress = 1 - rem / p.lenMs;
  return (
    <div className={`mia-break ${rem <= 30000 ? "ending" : ""}`}>
      <div className="mia-sun" />
      <div className="mia-cloud c1" />
      <div className="mia-cloud c2" />
      <h1>Break time!</h1>
      <div className="mia-count">{mmss(rem)}</div>
      <div className="mia-warn">30 seconds! Head back to your seat!</div>
      <button className="mia-btn big" style={{ ["--c" as string]: color }} onClick={onDone}>
        I&apos;m ready to go back
      </button>
      <div className="mia-walker" style={{ transform: `translateX(${-220 + progress * (width + 220)}px)` }}>
        <span className="mia-tag">{buddyName}</span>
        <Buddy kind={buddy} className="mia-buddy" />
      </div>
    </div>
  );
}

/** A 30-minute visual timer: the coloured disk shrinks back toward 0. */
function Face({ color, fraction, big = false }: { color: string; fraction: number; big?: boolean }) {
  const f = Math.max(0, Math.min(1, fraction));
  let wedge = "";
  if (f >= 0.9999) wedge = "M50,10 A40,40 0 1 0 50,90 A40,40 0 1 0 50,10 Z";
  else if (f > 0) {
    const a = f * 2 * Math.PI;
    wedge = `M50,50 L50,10 A40,40 0 ${f > 0.5 ? 1 : 0} 0 ${(50 - 40 * Math.sin(a)).toFixed(2)},${(50 - 40 * Math.cos(a)).toFixed(2)} Z`;
  }
  const ticks = [];
  for (let m = 0; m < 30; m++) {
    const a = (m / 30) * 2 * Math.PI;
    const major = m % 5 === 0;
    // Rounded so the server and the browser draw exactly the same numbers.
    const p = (r: number) => [+(50 - r * Math.sin(a)).toFixed(2), +(50 - r * Math.cos(a)).toFixed(2)];
    const [x1, y1] = p(major ? 40 : 42);
    const [x2, y2] = p(44.5);
    ticks.push(<line key={`t${m}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={major ? 1.8 : 0.7} strokeLinecap="round" opacity={0.5} />);
    if (major) {
      const [tx, ty] = p(51.5);
      ticks.push(
        <text key={`n${m}`} x={tx} y={ty} fontSize="7.5" fontWeight="700" textAnchor="middle" dominantBaseline="central" fill="currentColor" opacity={0.75}>
          {m}
        </text>,
      );
    }
  }
  return (
    <svg className={big ? "mia-face big" : "mia-face"} viewBox="-7 -7 114 114" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#fff" stroke={color} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="40" fill="#f3f5fb" />
      {wedge && <path d={wedge} fill={color} />}
      {ticks}
      <circle cx="50" cy="50" r="5" fill="#fff" stroke={color} strokeWidth="2" />
    </svg>
  );
}
