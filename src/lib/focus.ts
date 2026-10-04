/**
 * Focus toolkit settings. Every kid gets sprints, breaks, side quests and a
 * daily screen cap; the parent's answer to "attention challenges / ADHD?"
 * only changes the starting values. Parents can adjust any of them.
 *
 * The defaults follow common practice for attention support: short timed work
 * blocks (Pomodoro-style), movement breaks, frequent novelty, and capped
 * screen time balanced with hands-on work away from the screen. They are
 * starting points, not medical advice.
 */

export type AttentionAnswer = "yes" | "no" | "unsure";

export interface FocusProfile {
  attention: AttentionAnswer;
  /** Minutes of focused work before a break. */
  sprintMinutes: number;
  /** Length of the break, in minutes. */
  breakMinutes: number;
  /** A side quest pops up after this many questions. */
  sideQuestEvery: number;
  /** Portal screen time per day; after this, kids get off-screen missions instead. */
  dailyCapMinutes: number;
}

export const PRESETS: Record<AttentionAnswer, Omit<FocusProfile, "attention">> = {
  yes: { sprintMinutes: 10, breakMinutes: 3, sideQuestEvery: 5, dailyCapMinutes: 45 },
  unsure: { sprintMinutes: 15, breakMinutes: 4, sideQuestEvery: 6, dailyCapMinutes: 60 },
  no: { sprintMinutes: 20, breakMinutes: 5, sideQuestEvery: 8, dailyCapMinutes: 75 },
};

export const LIMITS = {
  sprintMinutes: [5, 45],
  breakMinutes: [1, 15],
  sideQuestEvery: [3, 20],
  dailyCapMinutes: [15, 240],
} as const;

export function defaultProfile(attention: AttentionAnswer = "unsure"): FocusProfile {
  return { attention, ...PRESETS[attention] };
}

export function parseProfile(raw: string | null | undefined): FocusProfile {
  if (!raw) return defaultProfile();
  try {
    const p = JSON.parse(raw) as Partial<FocusProfile>;
    const base = defaultProfile(p.attention ?? "unsure");
    return clampProfile({ ...base, ...p });
  } catch {
    return defaultProfile();
  }
}

export function clampProfile(p: FocusProfile): FocusProfile {
  const c = (v: number, [lo, hi]: readonly [number, number]) => Math.min(hi, Math.max(lo, Math.round(v) || lo));
  return {
    attention: (["yes", "no", "unsure"] as const).includes(p.attention) ? p.attention : "unsure",
    sprintMinutes: c(p.sprintMinutes, LIMITS.sprintMinutes),
    breakMinutes: c(p.breakMinutes, LIMITS.breakMinutes),
    sideQuestEvery: c(p.sideQuestEvery, LIMITS.sideQuestEvery),
    dailyCapMinutes: c(p.dailyCapMinutes, LIMITS.dailyCapMinutes),
  };
}

/** Quick movement and reset ideas shown during breaks. */
export const BREAKS = [
  { icon: "🏃", title: "Lap break", text: "Jog a lap around the house or yard. Back before the timer ends!" },
  { icon: "💪", title: "Power 20", text: "10 jumping jacks, 5 push-ups, 5 squats. Go!" },
  { icon: "🧘", title: "Box breathing", text: "Breathe in 4 seconds, hold 4, out 4, hold 4. Do it 4 times." },
  { icon: "💧", title: "Refuel", text: "Get a glass of water and a healthy snack." },
  { icon: "🤸", title: "Balance test", text: "Stand on one foot with your eyes closed. How long can you last? Switch feet." },
  { icon: "🧱", title: "Wall sit", text: "Back against the wall, knees bent. Hold it as long as you can." },
  { icon: "🌳", title: "Fresh air", text: "Step outside. Find 3 things you can hear and 2 things you can see that you never noticed." },
  { icon: "🎯", title: "Toss challenge", text: "Toss a rolled-up sock into a basket from 3 steps away. How many in 10 tries?" },
  { icon: "🪢", title: "Stretch it out", text: "Reach for the ceiling, touch your toes, twist left and right. Slow and steady." },
  { icon: "🐻", title: "Bear crawl", text: "Bear crawl down the hallway and back. Hands and feet only!" },
];
