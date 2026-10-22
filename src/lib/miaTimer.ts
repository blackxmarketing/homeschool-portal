import { BUDDIES, MIA_DEFAULT_SETTINGS, MIA_LATE_SECONDS, MIA_MINUTES, type MiaSettings } from "@/content/miacademy";

/**
 * The rules of one Miacademy subject timer for one day. Pure functions of
 * (state, now) so the server can apply them and the tests can check them.
 * The server keeps the state; the kid's screen only asks for changes.
 */

export type MiaPause =
  /** The kid pressed Pause and is choosing "help" or "break". */
  | { type: "choosing"; at: number }
  /** Waiting for a grown-up to restart it. */
  | { type: "help"; at: number }
  /** On a break (the Jimothy screen). */
  | { type: "break"; at: number; endAt: number; lenMs: number }
  /** Break over: waiting for the kid to press Start. */
  | { type: "ready"; since: number; lateTold: boolean }
  /** Gathering supplies for a hands-on activity: a grown-up restarts it (or skips the activity). */
  | { type: "supplies"; at: number; lessonId: number; itemId: string };

export interface MiaTimerState {
  durMs: number;
  /** Time left while stopped; ignored while running. */
  leftMs: number;
  /** When it runs out, while running. null while stopped. */
  endAt: number | null;
  pause: MiaPause | null;
  breaks: number;
  helps: number;
  missedCheckins: number;
  startedAt: number;
  finishedAt: number | null;
  /** Demo speed (preview only): 1 minute timer, 40 second break, 10 second late alert. */
  demo: boolean;
}

export type MiaAction =
  | "start"
  | "pause"
  | "cancel"
  | "help"
  | "break"
  | "breakDone"
  | "late"
  | "helpResume"
  | "finish"
  | "missedCheckin"
  | "supplies";

export class MiaRuleError extends Error {}

/** Allowed slack for a kid's clock when the timer runs out. */
const FINISH_SLACK_MS = 2000;

export function remaining(s: MiaTimerState, now: number): number {
  return s.endAt !== null ? Math.max(0, s.endAt - now) : s.leftMs;
}

export function isRunning(s: MiaTimerState | null | undefined): boolean {
  return !!s && s.endAt !== null && s.finishedAt === null;
}

/** Started and not finished: running, paused, on a break or waiting for help. */
export function isOpen(s: MiaTimerState | null | undefined): boolean {
  return !!s && s.finishedAt === null;
}

export function breakMs(s: MiaTimerState, settings: MiaSettings): number {
  return s.demo ? 40 * 1000 : settings.breakMinutes * 60 * 1000;
}

export function lateMs(s: MiaTimerState): number {
  return s.demo ? 10 * 1000 : MIA_LATE_SECONDS * 1000;
}

export function newTimer(now: number, demo = false): MiaTimerState {
  const durMs = demo ? 60 * 1000 : MIA_MINUTES * 60 * 1000;
  return { durMs, leftMs: durMs, endAt: now + durMs, pause: null, breaks: 0, helps: 0, missedCheckins: 0, startedAt: now, finishedAt: null, demo };
}

function freeze(s: MiaTimerState, now: number): MiaTimerState {
  return { ...s, leftMs: remaining(s, now), endAt: null };
}

function resume(s: MiaTimerState, now: number): MiaTimerState {
  return { ...s, pause: null, endAt: now + s.leftMs };
}

/** What happened, so the server knows when to tell a parent. */
export type MiaEvent = "help" | "late" | "finished" | "supplies" | null;

/**
 * Applies one action. Throws MiaRuleError when it isn't allowed right now.
 * "start" on a missing timer is handled by the caller (newTimer).
 */
export function applyMia(
  s: MiaTimerState,
  action: MiaAction,
  now: number,
  settings: MiaSettings = MIA_DEFAULT_SETTINGS,
  extra: { lessonId?: number; itemId?: string } = {},
): { state: MiaTimerState; event: MiaEvent } {
  if (s.finishedAt !== null) throw new MiaRuleError("This timer is done for today.");
  const p = s.pause;
  const ok = (state: MiaTimerState, event: MiaEvent = null) => ({ state, event });
  switch (action) {
    case "start":
      // Start again after a break (or after a parent stopped it).
      if (isRunning(s)) return ok(s);
      if (p && p.type !== "ready") throw new MiaRuleError("This timer can't start right now.");
      return ok(resume(s, now));
    case "pause":
      if (!settings.allowPause) throw new MiaRuleError("Pausing is turned off.");
      if (!isRunning(s)) throw new MiaRuleError("The timer isn't running.");
      return ok({ ...freeze(s, now), pause: { type: "choosing", at: now } });
    case "cancel":
      if (p?.type !== "choosing") throw new MiaRuleError("Nothing to cancel.");
      return ok(resume(s, now));
    case "help":
      if (p?.type !== "choosing") throw new MiaRuleError("Press Pause first.");
      return ok({ ...s, helps: s.helps + 1, pause: { type: "help", at: now } }, "help");
    case "break": {
      if (p?.type !== "choosing") throw new MiaRuleError("Press Pause first.");
      if (s.breaks >= 1) throw new MiaRuleError("You already had your break for this subject.");
      const lenMs = breakMs(s, settings);
      return ok({ ...s, breaks: s.breaks + 1, pause: { type: "break", at: now, endAt: now + lenMs, lenMs } });
    }
    case "breakDone":
      if (p?.type !== "break") throw new MiaRuleError("Not on a break.");
      return ok({ ...s, pause: { type: "ready", since: now, lateTold: false } });
    case "late":
      if (p?.type !== "ready" || p.lateTold || now - p.since < lateMs(s)) return ok(s);
      return ok({ ...s, pause: { ...p, lateTold: true } }, "late");
    case "helpResume":
      if (p?.type !== "help" && p?.type !== "supplies") throw new MiaRuleError("This timer isn't waiting for a grown-up.");
      return ok(resume(s, now));
    case "supplies":
      // Pauses on its own, whether or not the kid may pause: gathering supplies shouldn't use up the 30 minutes.
      if (!isRunning(s) || extra.lessonId === undefined || !extra.itemId) throw new MiaRuleError("The timer isn't running.");
      return ok({ ...freeze(s, now), pause: { type: "supplies", at: now, lessonId: extra.lessonId, itemId: extra.itemId } }, "supplies");
    case "finish":
      if (!isRunning(s) || remaining(s, now) > FINISH_SLACK_MS) throw new MiaRuleError("There's still time left.");
      return ok({ ...s, leftMs: 0, endAt: null, pause: null, finishedAt: now }, "finished");
    case "missedCheckin":
      return ok({ ...s, missedCheckins: s.missedCheckins + 1 });
  }
}

export function clampMiaSettings(raw: Partial<MiaSettings> | null | undefined): MiaSettings {
  const d = MIA_DEFAULT_SETTINGS;
  const mins = Math.round(Number(raw?.breakMinutes));
  return {
    allowPause: typeof raw?.allowPause === "boolean" ? raw.allowPause : d.allowPause,
    breakMinutes: Number.isFinite(mins) ? Math.min(5, Math.max(1, mins)) : d.breakMinutes,
    helpPin: typeof raw?.helpPin === "boolean" ? raw.helpPin : d.helpPin,
    buddy: BUDDIES.find((b) => b.id === raw?.buddy)?.id ?? d.buddy,
    lessonsPerWeek: Object.fromEntries(
      Object.keys(d.lessonsPerWeek).map((s) => {
        const n = Math.round(Number(raw?.lessonsPerWeek?.[s]));
        return [s, Number.isFinite(n) ? Math.min(10, Math.max(0, n)) : d.lessonsPerWeek[s]];
      }),
    ),
  };
}

export function parseMiaSettings(json: string | null | undefined): MiaSettings {
  if (!json) return clampMiaSettings(null);
  try {
    return clampMiaSettings(JSON.parse(json));
  } catch {
    return clampMiaSettings(null);
  }
}

export function parseMiaState(json: string): MiaTimerState | null {
  try {
    const s = JSON.parse(json) as MiaTimerState;
    return typeof s?.durMs === "number" && typeof s.startedAt === "number" ? s : null;
  } catch {
    return null;
  }
}
