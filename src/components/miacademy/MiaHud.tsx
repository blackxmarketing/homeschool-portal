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
} from "@/content/miacademy";
import { isOpen, isRunning, lateMs, remaining, type MiaTimerState } from "@/lib/miaTimer";
import { chime, speak } from "@/components/voice";
import Buddy from "./Buddy";

type Timers = Record<string, MiaTimerState | null>;

/** What the desktop app (docs/MIACADEMY.md) adds to the page. Missing in a normal browser. */
interface DesktopBridge {
  onMiacademy?: (cb: (open: boolean) => void) => void;
  setFullscreen?: (on: boolean) => void;
}
const bridge = (): DesktopBridge | undefined =>
  typeof window === "undefined" ? undefined : (window as unknown as { miaHud?: DesktopBridge }).miaHud;

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
  settings,
  initialTimers,
  serverNow,
  demo,
}: {
  settings: MiaSettings;
  initialTimers: Timers;
  serverNow: number;
  demo: boolean;
}) {
  const [timers, setTimers] = useState<Timers>(initialTimers);
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

  const buddyName = BUDDIES.find((b) => b.id === settings.buddy)?.name ?? "Your buddy";
  const subjectName = (id: string) => MIA_SUBJECTS.find((s) => s.id === id)?.name ?? id;
  const fill = (text: string, subject?: string) =>
    text
      .replace("{subject}", subject ? subjectName(subject) : "")
      .replace("{minutes}", String(MIA_MINUTES))
      .replace("{buddy}", buddyName.toLowerCase());
  const say = (text: string) => {
    chime("pop");
    speak(`mia-${Date.now()}`, text, { kind: "female" });
  };

  const openId = MIA_SUBJECTS.find((s) => isOpen(timers[s.id]))?.id ?? null;
  const allDone = MIA_SUBJECTS.every((s) => timers[s.id]?.finishedAt);

  async function post(body: Record<string, unknown>): Promise<Timers | null> {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/mia", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, demo }) });
      const data = (await res.json().catch(() => ({}))) as { timers?: Timers; serverNow?: number; error?: string };
      if (data.serverNow) setOffset(data.serverNow - Date.now());
      if (data.timers) setTimers(data.timers);
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return null;
      }
      return data.timers ?? null;
    } catch {
      setError("Can't reach the portal. Check the internet.");
      return null;
    } finally {
      setBusy(false);
    }
  }
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
        const due = r.count === 0 ? first : first + r.count * every;
        if (t - r.since >= due) {
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

  // ---- The desktop app: knows when Miacademy is open, and makes the window full screen for breaks ----
  useEffect(() => {
    bridge()?.onMiacademy?.((open) => setMiaOpen(open));
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
  async function helpRestart(subject: string) {
    if (settings.helpPin && !pinOpen) {
      setPin("");
      setPinOpen(true);
      return;
    }
    if (await act(subject, "helpResume", settings.helpPin ? { pin } : {})) {
      setPinOpen(false);
      say(fill(MIA_LINES.helpDone, subject));
    }
  }
  function answerCheckin() {
    setCheckin(null);
    say(pick(MIA_LINES.checkinThanks));
  }

  // ---- Screens ----
  const focused = focus ? MIA_SUBJECTS.find((s) => s.id === focus)! : null;

  return (
    <div className={`mia-hud ${focused ? "focus" : ""}`}>
      <div className="mia-head">
        <span>{focused ? "Now learning" : "Today's subjects"}</span>
        {demo && (
          <button className="mia-demo" onClick={() => setMiaOpen((o) => !o)}>
            demo: Miacademy {miaOpen ? "open" : "closed"}
          </button>
        )}
      </div>

      {reminder && !openId && (
        <div className="mia-reminder" role="alert">
          ⏰ {MIA_LINES.remind}
        </div>
      )}
      {error && (
        <div className="mia-error" role="alert" onClick={() => setError(null)}>
          {error}
        </div>
      )}

      {!focused &&
        (allDone ? <div className="mia-alldone">🎉 All four subjects are done for today!</div> : null)}

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
              <Face color={s.color} fraction={t ? remaining(t, now) / t.durMs : 1} />
              <div>
                <div className="mia-name">{s.name}</div>
                <div className="mia-time">{done ? "0:00" : mmss(t ? remaining(t, now) : MIA_MINUTES * 60 * 1000 * (demo ? 1 / 30 : 1))}</div>
                <div className="mia-status">{done ? "✓ Done for today" : t ? "In progress: tap to open" : "Tap to open"}</div>
              </div>
            </button>
          );
        })}

      {focused && (
        <FocusedTimer
          subject={focused}
          t={timers[focused.id]}
          now={now}
          settings={settings}
          busy={busy}
          checkin={checkin}
          demo={demo}
          onStart={() => start(focused.id)}
          onPause={() => act(focused.id, "pause")}
          onBack={() => setFocus(null)}
          onHelpRestart={() => helpRestart(focused.id)}
          onAnswer={answerCheckin}
        />
      )}

      {focused && <div className="mia-checklist-soon">Your step-by-step checklist shows here once Miacademy is connected.</div>}

      {/* Pause: why? */}
      {focused && timers[focused.id]?.pause?.type === "choosing" && (
        <div className="mia-scrim" style={{ ["--c" as string]: focused.color }}>
          <div className="mia-chooser">
            <h2>Why do you need to pause?</h2>
            <div className="mia-choices">
              <button className="mia-choice" onClick={() => chooseHelp(focused.id)} disabled={busy}>
                <span className="mia-emoji">🙋</span>I need help<small>A grown-up will come</small>
              </button>
              <button className="mia-choice" onClick={() => chooseBreak(focused.id)} disabled={busy || (timers[focused.id]?.breaks ?? 0) >= 1}>
                <span className="mia-emoji">☕</span>I need a break
                <small>
                  {(timers[focused.id]?.breaks ?? 0) >= 1
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
      {focused && timers[focused.id]?.pause?.type === "break" && (
        <BreakScreen t={timers[focused.id]!} now={now} buddy={settings.buddy} buddyName={buddyName} color={focused.color} onDone={() => endBreakEarly(focused.id)} />
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
            <h2>Grown-up: start the timer again</h2>
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
                Start timer
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
  subject: (typeof MIA_SUBJECTS)[number];
  t: MiaTimerState | null;
  now: number;
  settings: MiaSettings;
  busy: boolean;
  checkin: Checkin | null;
  demo: boolean;
  onStart: () => void;
  onPause: () => void;
  onBack: () => void;
  onHelpRestart: () => void;
  onAnswer: () => void;
}) {
  const full = demo ? 60 * 1000 : MIA_MINUTES * 60 * 1000;
  const rem = t ? remaining(t, now) : full;
  let controls: React.ReactNode;
  if (!t)
    controls = (
      <>
        <button className="mia-btn" onClick={onStart} disabled={busy}>
          Start
        </button>
        <button className="mia-btn ghost" onClick={onBack}>
          Back
        </button>
      </>
    );
  else if (t.pause?.type === "help")
    controls = (
      <>
        <div className="mia-waiting">✋ Paused. A grown-up is coming to help.</div>
        <button className="mia-btn" onClick={onHelpRestart} disabled={busy}>
          Grown-up: start timer
        </button>
      </>
    );
  else if (t.pause?.type === "ready")
    controls = (
      <>
        <div className="mia-waiting">Break&apos;s over! Press Start when you&apos;re in your seat.</div>
        {t.pause.lateTold && <div className="mia-status">We let a grown-up know.</div>}
        <button className="mia-btn" onClick={onStart} disabled={busy}>
          Start
        </button>
      </>
    );
  else if (isRunning(t))
    controls = settings.allowPause ? (
      <button className="mia-btn" onClick={onPause} disabled={busy}>
        Pause
      </button>
    ) : null;

  return (
    <div className="mia-big" style={{ ["--c" as string]: subject.color }}>
      <div className="mia-name">{subject.name}</div>
      <Face color={subject.color} fraction={t ? rem / t.durMs : 1} big />
      <div className="mia-time">{mmss(rem)}</div>
      <div className="mia-row">{controls}</div>
      {checkin && (
        <div className="mia-checkin">
          <span className="mia-teacher">👩‍🏫</span>
          <div>
            <div>{checkin.text}</div>
            {checkin.ask && (
              <button className="mia-btn" onClick={onAnswer}>
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
      <h1>Break time!</h1>
      <div className="mia-count">{mmss(rem)}</div>
      <div className="mia-warn">30 seconds: head back to your seat!</div>
      <button className="mia-btn" style={{ ["--c" as string]: color }} onClick={onDone}>
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
    const [x1, y1] = p(major ? 40.5 : 42);
    const [x2, y2] = p(44.5);
    ticks.push(<line key={`t${m}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={major ? 1.4 : 0.6} opacity={0.55} />);
    if (major) {
      const [tx, ty] = p(51);
      ticks.push(
        <text key={`n${m}`} x={tx} y={ty} fontSize="7" fontWeight="800" textAnchor="middle" dominantBaseline="central" fill="currentColor" opacity={0.7}>
          {m}
        </text>,
      );
    }
  }
  return (
    <svg className={big ? "mia-face big" : "mia-face"} viewBox="-6 -6 112 112" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="#fff" stroke="#e3ded2" />
      {wedge && <path d={wedge} fill={color} />}
      {ticks}
      <circle cx="50" cy="50" r="4.5" fill="#fff" stroke="#e3ded2" />
    </svg>
  );
}
