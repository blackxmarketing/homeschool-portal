"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BUDDIES,
  MIA_BETWEEN_BREAK_MINUTES,
  MIA_CHECKIN_ANSWER_SECONDS,
  MIA_LINES,
  MIA_MINUTES,
  MIA_OVERTIME_MAX_MINUTES,
  MIA_REMIND_AFTER_SECONDS,
  MIA_REMIND_EVERY_SECONDS,
  MIA_SUBJECTS,
  type MiaSettings,
  type MiaSubject,
} from "@/content/miacademy";
import { isOpen, isRunning, lateMs, remaining, type MiaTimerState } from "@/lib/miaTimer";
import Buddy, { GrownUp } from "./Buddy";
import { ringGrid } from "@/lib/pixel/miaRings";
import Checklist from "./Checklist";
import { moneySound } from "@/components/voice";
import BreakScene, { nextActivity, type BreakActivity } from "./BreakScene";
import type { MiaChecklist, MiaRing, MiaVocab } from "@/lib/store";

export interface MiaBankView {
  monthCents: number;
  thisWeek: { ring: string; cents: number }[];
}

export type Timers = Record<string, MiaTimerState | null>;

/** Between two classes: the question, then (maybe) a quick break. */
type Between =
  | { from: string; next: string; day: string; phase: "ask" }
  | { from: string; next: string; day: string; phase: "break"; activity: BreakActivity; lenMs: number; endAt: number };

/** One call to the portal's /api/mia. The portal page uses fetch; the Chrome extension goes through its background worker. */
/** One call to the portal (default /api/mia). The portal page uses fetch; the Chrome extension goes through its background worker. */
export type MiaApi = (
  body: Record<string, unknown>,
  path?: string,
) => Promise<{
  ok: boolean;
  data: {
    timers?: Timers;
    settings?: MiaSettings;
    checklists?: Checklists;
    rings?: MiaRing[];
    bank?: MiaBankView;
    serverNow?: number;
    error?: string;
  } & Record<string, unknown>;
}>;
export type Checklists = Record<string, MiaChecklist | null>;

/** What hosts the page (the Chrome extension) adds. Missing in a normal browser tab. */
interface HostBridge {
  onMiacademy?: (cb: (open: boolean) => void) => void;
  /** New checklists after the extension reports what Miacademy's pages show. */
  onChecklists?: (cb: (c: Checklists) => void) => void;
  setFullscreen?: (on: boolean) => void;
  /** Slide the strip away to a small tab on the edge (or bring it back). Only the extension can. */
  setCollapsed?: (on: boolean) => void;
  /** The Miacademy task (video, practice, quiz) the kid has open, or null. Only the extension knows. */
  onTask?: (cb: (taskKey: string | null) => void) => void;
  /** Read the kid's Miacademy assignments again now (new checklists come through onChecklists). False if it can't yet. */
  refreshPath?: () => boolean;
  /** Go to a Miacademy task's page (or the assignments page). False if neither is known yet. */
  openTask?: (taskKey: string | null) => boolean;
}
export const bridge = (): HostBridge | undefined =>
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
  initialRings = [],
  initialBank = { monthCents: 0, thisWeek: [] },
  initialVocab = null,
  serverNow,
  demo,
  api = portalApi,
  say: sayRaw,
}: {
  kidName: string;
  settings: MiaSettings;
  initialTimers: Timers;
  initialChecklists?: Checklists;
  initialRings?: MiaRing[];
  initialBank?: MiaBankView;
  /** Today's Vocabulary step (done first, before the core classes), or null. */
  initialVocab?: MiaVocab | null;
  serverNow: number;
  demo: boolean;
  api?: MiaApi;
  /** Speaks a line in the teacher's voice. */
  say: (text: string) => void;
}) {
  const [timers, setTimers] = useState<Timers>(initialTimers);
  const [settings, setSettings] = useState<MiaSettings>(initialSettings);
  const [checklists, setChecklists] = useState<Checklists>(initialChecklists);
  const [rings, setRings] = useState<MiaRing[]>(initialRings);
  const [bank, setBank] = useState<MiaBankView>(initialBank);
  // A full ring's pay: pops up in the middle of the screen ("show"), flies into the bank ("drop"), then counts ("landed").
  const [coin, setCoin] = useState<{ ring: string; cents: number; key: number; phase: "show" | "drop" | "landed"; to?: { x: number; y: number } } | null>(null);
  const bankFace = useRef<HTMLSpanElement>(null);
  // Between two classes: ask "keep going or a quick break?", then the break itself. Kept in this browser so a reload doesn't lose it.
  const [between, setBetweenState] = useState<Between | null>(null);
  const betweenKey = `mia-between-${kidName}`;
  const setBetween = (b: Between | null) => {
    setBetweenState(b);
    try {
      if (b) localStorage.setItem(betweenKey, JSON.stringify(b));
      else localStorage.removeItem(betweenKey);
    } catch {
      // Storage can be blocked; it just won't survive a reload.
    }
  };
  useEffect(() => {
    try {
      const b = JSON.parse(localStorage.getItem(betweenKey) ?? "null") as Between | null;
      if (b && b.day === new Date().toDateString()) setBetweenState(b);
    } catch {
      // Nothing saved.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const lastActivity = useRef<BreakActivity | null>(null);
  const [offset, setOffset] = useState(() => serverNow - Date.now());
  const [now, setNow] = useState(serverNow);
  const [focus, setFocus] = useState<string | null>(() => MIA_SUBJECTS.find((s) => isOpen(initialTimers[s.id]))?.id ?? null);
  const [error, setError] = useState<string | null>(null);
  const [checkin, setCheckin] = useState<Checkin | null>(null);
  const [reminder, setReminder] = useState(false);
  const [miaOpen, setMiaOpen] = useState(false);
  const [vocab, setVocab] = useState<MiaVocab | null>(initialVocab);
  // (Not once the core classes are done for the day, e.g. marked done by a parent.)
  const vocabFirst = !!vocab && !vocab.done && !MIA_SUBJECTS.every((s) => timers[s.id]?.finishedAt);
  const [taskKey, setTaskKey] = useState<string | null>(null);
  // Slid away for the rest of the day (remembered in this browser until tomorrow).
  const collapseKey = `mia-collapsed-${kidName}`;
  const [collapsed, setCollapsed] = useState(false);
  const [canCollapse, setCanCollapse] = useState(false);
  useEffect(() => {
    setCanCollapse(!!bridge()?.setCollapsed);
    try {
      if (localStorage.getItem(collapseKey) === new Date().toDateString()) setCollapsed(true);
    } catch {
      // Storage can be blocked; the strip just starts open.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function setCollapsedSaved(on: boolean) {
    setCollapsed(on);
    try {
      if (on) localStorage.setItem(collapseKey, new Date().toDateString());
      else localStorage.removeItem(collapseKey);
    } catch {
      // Not remembered; fine.
    }
  }
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

  // Vocabulary comes first each school day; the teacher says so once when the strip opens.
  const vocabRef = useRef(initialVocab);
  useEffect(() => {
    if (initialVocab && !initialVocab.done) {
      const t = setTimeout(() => say(MIA_LINES.vocabStart), 1500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function vocabFinished() {
    await post({ action: "vocabDone" });
  }

  // A ring filled up this week: drop its money into the buddy bank (once per ring).
  const paid = useRef(new Set(initialBank.thisWeek.map((p) => p.ring)));
  function applyBoard(data: { rings?: MiaRing[]; bank?: MiaBankView; vocab?: MiaVocab | null }) {
    if (data.vocab !== undefined) {
      if (vocabRef.current && !vocabRef.current.done && data.vocab?.done) say(MIA_LINES.vocabDone);
      vocabRef.current = data.vocab;
      setVocab(data.vocab);
    }
    if (data.rings) setRings(data.rings);
    if (!data.bank) return;
    setBank(data.bank);
    const fresh = data.bank.thisWeek.filter((p) => !paid.current.has(p.ring));
    fresh.forEach((p) => paid.current.add(p.ring));
    const first = fresh[0];
    if (first) {
      const ring = (data.rings ?? rings).find((r) => r.id === first.ring);
      const key = Date.now();
      setCoin({ ring: first.ring, cents: first.cents, key, phase: "show" });
      moneySound("ching");
      if (!first.ring.startsWith("overtime:")) setTimeout(() => say(`Your ${ring?.name ?? ""} ring is full! ${first.cents} cents go in your bank.`), 700);
      setTimeout(() => {
        // Fly from the middle of the screen to the bank.
        const b = bankFace.current?.getBoundingClientRect();
        const to = b ? { x: Math.round(b.left + b.width / 2 - window.innerWidth / 2), y: Math.round(b.top + b.height / 2 - window.innerHeight / 2) } : undefined;
        setCoin((c) => (c?.key === key ? { ...c, phase: "drop", to } : c));
      }, 1800);
      setTimeout(() => {
        setCoin((c) => (c?.key === key ? { ...c, phase: "landed" } : c));
        moneySound("clink");
      }, 2700 + 200);
      setTimeout(() => setCoin((c) => (c?.key === key ? null : c)), 4800);
    }
  }
  // After a checklist change, fetch the rings and bank too.
  async function refreshBoard() {
    const { ok, data } = await api({ action: "sync" });
    if (ok) applyBoard(data);
  }

  async function post(body: Record<string, unknown>): Promise<boolean> {
    setBusy(true);
    setError(null);
    const { ok, data } = await api({ ...body, demo });
    if (data.serverNow) setOffset(data.serverNow - Date.now());
    if (data.timers) setTimers(data.timers);
    if (data.settings) setSettings(data.settings);
    if (data.checklists) setChecklists(data.checklists);
    applyBoard(data);
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
      applyBoard(data);
    }, waitingForHelp ? 5000 : 30000);
    return () => clearInterval(id);
  }, [api, waitingForHelp]);
  const act = (subject: string, action: string, extra: Record<string, unknown> = {}) => post({ subject, action, ...extra });

  // ---- The clock: announcements, check-ins, breaks, finishing, reminders ----
  const live = useRef({ timers, offset, checkin, miaOpen, openId, allDone, taskKey, vocabFirst });
  live.current = { timers, offset, checkin, miaOpen, openId, allDone, taskKey, vocabFirst };
  // The task that was open when time ran out: overtime ends when it's done (the kid moves on from it).
  const overtimeTask = useRef<string | null>(null);
  const last = useRef<{ key: string; rem: number; brem: number } | null>(null);
  const sent = useRef(new Set<string>());
  const remind = useRef<{ since: number | null; count: number }>({ since: null, count: 0 });

  useEffect(() => {
    const tick = () => {
      const { timers, offset, checkin, miaOpen, openId, allDone, taskKey, vocabFirst } = live.current;
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
      if (miaOpen && !openId && !allDone && !vocabFirst) {
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
        if (rem <= 0) {
          const finish = () => once(`${key}:finish`, () => void finishRef.current(openId));
          if (s.overtimeSince) {
            // Overtime ends when the task is done (they've moved on from it), or at the most we allow.
            overtimeTask.current ??= taskKey;
            if (taskKey !== overtimeTask.current || t - s.overtimeSince >= (demo ? 30 : MIA_OVERTIME_MAX_MINUTES * 60) * 1000) finish();
          } else if (taskKey) {
            once(`${key}:overtime`, async () => {
              overtimeTask.current = taskKey;
              if (await act(openId, "overtime")) say(MIA_LINES.overtime);
            });
          } else finish();
        }
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
    bridge()?.onTask?.((k) => setTaskKey(k));
  }, []);
  const onBreak = (!!openId && timers[openId]?.pause?.type === "break") || between?.phase === "break";
  useEffect(() => {
    bridge()?.setFullscreen?.(onBreak);
  }, [onBreak]);
  const slidAway = collapsed && allDone && !openId;
  useEffect(() => {
    bridge()?.setCollapsed?.(slidAway);
  }, [slidAway]);

  // ---- Actions ----
  async function finishClass(subject: string) {
    const went = timers[subject]?.overtimeSince;
    if (!(await act(subject, "finish"))) return;
    overtimeTask.current = null;
    setFocus(null);
    setCheckin(null);
    const next = MIA_SUBJECTS.find((x) => x.id !== subject && !timers[x.id]?.finishedAt);
    if (went) say(MIA_LINES.overtimeDone);
    if (next) {
      setBetween({ from: subject, next: next.id, phase: "ask", day: new Date().toDateString() });
      say(fill(MIA_LINES.between, subject).replace("{next}", next.name));
    } else say(fill(MIA_LINES.done, subject));
  }
  const finishRef = useRef(finishClass);
  finishRef.current = finishClass;
  function keepGoing(b: Between) {
    setBetween(null);
    setFocus(b.next);
    void start(b.next);
  }
  function quickBreak(b: Between) {
    const activity = nextActivity(lastActivity.current);
    lastActivity.current = activity;
    const lenMs = (demo ? 40 : MIA_BETWEEN_BREAK_MINUTES * 60) * 1000;
    setBetween({ ...b, phase: "break", activity, lenMs, endAt: Date.now() + offset + lenMs });
    say(MIA_LINES.betweenBreak);
  }
  function betweenOver(b: Between) {
    setBetween(null);
    setFocus(b.next);
    say(MIA_LINES.betweenOver.replace("{next}", subjectName(b.next)));
  }
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
  // Done getting help (the kid presses Start), or the supplies are ready / skipped. No PIN.
  async function helpRestart(subject: string, skip = false) {
    if (await act(subject, "helpResume", { skip })) say(skip ? `Okay! On to the next activity in ${subjectName(subject)}.` : fill(MIA_LINES.helpDone, subject));
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
  // The last core timer just finished: time for electives (said once, after the "time's up" line).
  const wasAllDone = useRef(allDone);
  useEffect(() => {
    if (allDone && !wasAllDone.current) window.setTimeout(() => say(MIA_LINES.electives), 4000);
    wasAllDone.current = allDone;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone]);
  const hello = allDone
    ? "Core classes done! Now your electives. 🎉"
    : vocabFirst && !focused
      ? "Start with Vocabulary & Spelling!"
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

  // Done for the day: the strip can slide away to a small tab (until tomorrow, or until a timer is going again).
  if (collapsed && allDone && !openId)
    return (
      <button className="mia-tab" onClick={() => setCollapsedSaved(false)} title="Show my timers">
        <span className="mia-tab-face">
          <Buddy kind={settings.buddy} head />
        </span>
        <span className="mia-tab-text">Timers</span>
      </button>
    );

  return (
    <div className={`mia-hud ${focused ? "focus" : ""}`}>
      {/* With a class open, only its timer and checklist show; the rest comes back when it's done. */}
      {!focused && (
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
      )}

      {coin && coin.phase !== "landed" && (
        <div
          key={coin.key}
          className={`mia-payout ${coin.phase}`}
          style={{ ["--dx" as string]: `${coin.to?.x ?? 0}px`, ["--dy" as string]: `${coin.to?.y ?? 0}px` }}
          aria-live="polite"
        >
          <span className="mia-payout-coin">🪙</span>
          <b>+{coin.cents}¢</b>
          <small>{coin.ring.startsWith("overtime:") ? "Overtime bonus!" : `${rings.find((r) => r.id === coin.ring)?.name} ring full!`}</small>
        </div>
      )}

      {rings.length > 0 && !focused && (
        <div className="mia-week-board">
          <div className="mia-rings">
            {rings.map((r) => (
              <div key={r.id} className={`mia-ring ${r.full ? "full" : ""}`} title={`${r.name}: ${Math.round(r.progress * 100)}%`}>
                <PixelRing color={r.color} progress={r.progress} />
                <span className="mia-ring-icon">{r.full ? "✓" : r.icon}</span>
                <span className="mia-ring-name">{r.name}</span>
                {r.ahead > 0 && <span className="mia-ring-ahead">+{r.ahead}</span>}
              </div>
            ))}
          </div>
          <div className="mia-bank">
            <span className="mia-bank-face" ref={bankFace}>
              <Buddy kind={settings.buddy} head />
            </span>
            <span>
              {/* The new money counts once its coin lands. */}
              <b key={coin?.phase === "landed" ? coin.key : "total"} className={coin?.phase === "landed" ? "mia-bank-bump" : undefined}>${((bank.monthCents - (coin && coin.phase !== "landed" ? coin.cents : 0)) / 100).toFixed(2)}</b> in your bank this month
            </span>
            {coin?.phase === "landed" && <span className="mia-bank-plus">+{coin.cents}¢</span>}
          </div>
        </div>
      )}

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

      {allDone && (
        <div className="mia-reminder mia-electives" role="status">
          <span className="mia-wiggle">🎨</span> {MIA_LINES.electives}
        </div>
      )}
      {allDone && !focused && (
        <div className="mia-row">
          {canCollapse ? (
            <button className="mia-btn" onClick={() => setCollapsedSaved(true)}>
              ↦ Slide my timers away
            </button>
          ) : (
            <a className="mia-btn" href="/kid">
              🌍 Go to my world
            </a>
          )}
        </div>
      )}
      {reminder && !openId && (
        <div className="mia-reminder" role="alert">
          <span className="mia-wiggle">⏰</span> {MIA_LINES.remind}
        </div>
      )}
      {error && (
        <div className="mia-error" role="alert" onClick={() => setError(null)}>
          {error}
        </div>
      )}

      {vocabFirst && !focused && (
        <div className="mia-vocab" role="status">
          <div className="mia-vocab-head">First: Vocabulary &amp; Spelling</div>
          <p>Do today&apos;s Vocabulary and Spelling in Miacademy. Your core classes start after that.</p>
          {vocab!.tasks.length > 0 && (
            <ul>
              {vocab!.tasks.map((t, i) => (
                <li key={i} className={t.done ? "done" : ""}>
                  <span className="mia-vocab-box">{t.done ? "✓" : ""}</span>
                  {t.title}
                </li>
              ))}
            </ul>
          )}
          <button className="mia-btn big go" onClick={vocabFinished} disabled={busy}>
            ✓ I finished Vocabulary &amp; Spelling
          </button>
        </div>
      )}

      {!focused &&
        MIA_SUBJECTS.map((s) => {
          const t = timers[s.id];
          const done = !!t?.finishedAt;
          const waiting = !done && !t && vocabFirst;
          const blocked = (!done && !!openId && openId !== s.id) || waiting;
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
                  {s.name}
                </div>
                <div className="mia-time">{done ? "All done!" : `${mmss(t ? remaining(t, now) : (demo ? 60 : MIA_MINUTES * 60) * 1000)}`}</div>
                {!done && <div className="mia-status">{t ? "Keep going ▶" : waiting ? "After Vocabulary & Spelling" : blocked ? "Finish your other subject first" : "Tap to start ▶"}</div>}
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
          onFinish={() => finishClass(focused.id)}
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
            onChecklists={(c) => {
              setChecklists(c);
              void refreshBoard();
            }}
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
                <span className="mia-emoji">
                  <GrownUp className="mia-choice-buddy" />
                </span>
                I need help<small>A grown-up will come</small>
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

      {/* Between classes: keep going, or a quick break first */}
      {between?.phase === "ask" && !openId && (
        <div className="mia-scrim" style={{ ["--c" as string]: MIA_SUBJECTS.find((x) => x.id === between.next)?.color }}>
          <div className="mia-chooser">
            <h2>Great job on {subjectName(between.from)}!</h2>
            <div className="mia-choices">
              <button className="mia-choice" onClick={() => keepGoing(between)} disabled={busy}>
                <span className="mia-emoji">▶</span>I&apos;m ready!<small>Start {subjectName(between.next)}</small>
              </button>
              <button className="mia-choice" onClick={() => quickBreak(between)} disabled={busy}>
                <span className="mia-emoji">
                  <Buddy kind={settings.buddy} head className="mia-choice-buddy" />
                </span>
                Quick break<small>{demo ? "40 seconds (demo)" : `${MIA_BETWEEN_BREAK_MINUTES} minutes`}</small>
              </button>
            </div>
          </div>
        </div>
      )}
      {between?.phase === "break" && (
        <BreakScene
          endAt={between.endAt}
          lenMs={between.lenMs}
          now={now}
          buddy={settings.buddy}
          color={MIA_SUBJECTS.find((x) => x.id === between.next)?.color ?? "#2340ff"}
          activity={between.activity}
          title="Quick break!"
          onDone={() => betweenOver(between)}
          onWarn={() => say(MIA_LINES.breakWarn)}
          onTimeUp={() => betweenOver(between)}
        />
      )}

      {/* Break: the buddy walks across the screen for the whole break */}
      {focused && ft?.pause?.type === "break" && (
        <BreakScreen t={ft} now={now} buddy={settings.buddy} color={focused.color} onDone={() => endBreakEarly(focused.id)} />
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
  onFinish,
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
  onFinish: () => void;
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
        <div className="mia-waiting">✋ Paused while you get help. When you&apos;re ready, press Start!</div>
        <button className="mia-btn big go" onClick={() => onHelpRestart()} disabled={busy}>
          ▶ Start!
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
  else if (isRunning(t) && t.overtimeSince)
    controls = (
      <>
        <div className="mia-waiting">⏱ Overtime! Finish what you&apos;re working on.</div>
        <button className="mia-btn big go" onClick={onFinish} disabled={busy}>
          ✓ I finished
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
        {subject.name}
      </div>
      {/* Clock and countdown side by side, so the checklist below fits on the screen. */}
      <div className="mia-big-clock">
        <Face color={subject.color} fraction={t ? rem / t.durMs : 1} big />
        {t?.overtimeSince && isRunning(t) ? (
          <div className="mia-time mia-overtime">+{mmss(Math.max(0, now - t.overtimeSince))}</div>
        ) : (
          <div className="mia-time">{mmss(rem)}</div>
        )}
      </div>
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

function BreakScreen({ t, now, buddy, color, onDone }: { t: MiaTimerState; now: number; buddy: MiaSettings["buddy"]; color: string; onDone: () => void }) {
  const p = t.pause?.type === "break" ? t.pause : null;
  if (!p) return null;
  return <BreakScene endAt={p.endAt} lenMs={p.lenMs} now={now} buddy={buddy} color={color} onDone={onDone} />;
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
        <text key={`n${m}`} className="mia-face-num" x={tx} y={ty} textAnchor="middle" dominantBaseline="central" fill="currentColor" opacity={0.75}>
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

function PixelRing({ color, progress }: { color: string; progress: number }) {
  const runs = useMemo(() => ringGrid(color, progress).runs(), [color, progress]);
  return (
    <svg className="mia-pixel" viewBox="0 0 22 22" shapeRendering="crispEdges" aria-hidden="true">
      {runs.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
      ))}
    </svg>
  );
}
