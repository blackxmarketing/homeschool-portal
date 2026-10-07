import type { Lesson } from "@/content/courses/types";

/**
 * The lesson plan: what a kid is going to do, in order, so they can see where
 * they are and what is left. One list, used in two places - the quest card on
 * the map (lib/gameState.ts) and the rail beside the lesson itself - so the two
 * can never tell them different things.
 *
 * It is worked out from the lesson, not written by hand, so every lesson has one.
 */

export type PlanKind = "learn" | "try" | "show" | "make";

export interface PlanItem {
  /** Stable id for ticking: "part:0", "practice", "explain", "boss", "mission". */
  key: string;
  label: string;
  icon: string;
  kind: PlanKind;
  /** Roughly how long this takes, in minutes. */
  minutes: number;
}

/** Words a kid reads or hears per minute, for the time estimates. */
const WORDS_PER_MINUTE = 150;
/** How long one hands-on question and one activity tend to take. */
const PROBE_SECONDS = 40;
const ACTIVITY_SECONDS = 90;
const EXPLAIN_SECONDS = 120;

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
const roundUp = (minutes: number) => Math.max(1, Math.round(minutes));

/** How long a teaching part takes: the talking plus its hands-on bits. */
export function partMinutes(seg: {
  teach: string;
  methods?: { expect: string; scenes: { say: string }[] }[];
  probe?: unknown;
  visual?: unknown;
}): number {
  // Only the first way of teaching it counts towards the estimate: that is
  // what a kid who gets it will actually sit through.
  const first = seg.methods?.[0];
  const said = first ? first.scenes.reduce((t, sc) => t + words(sc.say), 0) + words(first.expect) : words(seg.teach);
  const extras = (seg.probe || first ? PROBE_SECONDS : 0) + (seg.visual ? 45 : 0);
  return roundUp(said / WORDS_PER_MINUTE + extras / 60);
}

/** The whole plan for a lesson, in the order a kid meets it. */
export function lessonPlan(lesson: Lesson): PlanItem[] {
  const out: PlanItem[] = [];
  (lesson.teach ?? []).forEach((seg, i) => {
    out.push({ key: `part:${i}`, label: seg.title, icon: "📖", kind: "learn", minutes: partMinutes(seg) });
  });
  if (lesson.activity) {
    out.push({ key: "practice", label: "Practise it", icon: "✏️", kind: "try", minutes: roundUp(ACTIVITY_SECONDS / 60) });
  }
  if (lesson.explain) {
    out.push({ key: "explain", label: "Explain it back", icon: "💬", kind: "show", minutes: roundUp(EXPLAIN_SECONDS / 60) });
  }
  if (lesson.mastery?.length) {
    out.push({
      key: "boss",
      label: "Boss challenge: show what you know",
      icon: "⚔️",
      kind: "show",
      minutes: roundUp((lesson.mastery.length * PROBE_SECONDS) / 60),
    });
  }
  if (lesson.task) {
    out.push({
      key: "mission",
      label: `Field mission: ${lesson.task.kind === "write" ? "write it" : "do it for real"}`,
      icon: "🚩",
      kind: "make",
      minutes: 10,
    });
  }
  return out;
}

/** Minutes of being taught versus minutes of doing, for "about 7 minutes of teaching, then you try it". */
export function planMinutes(plan: PlanItem[]): { teaching: number; doing: number; total: number } {
  const teaching = plan.filter((p) => p.kind === "learn").reduce((t, p) => t + p.minutes, 0);
  const doing = plan.filter((p) => p.kind !== "learn").reduce((t, p) => t + p.minutes, 0);
  return { teaching, doing, total: teaching + doing };
}

/**
 * The plan with each item ticked or not. `partsDone` is per teaching part;
 * the rest follow the lesson's own progress.
 */
export function tickedPlan(
  plan: PlanItem[],
  state: { partsDone: boolean[]; activityDone: boolean; explainDone: boolean; masteryPassed: boolean; taskDone: boolean },
): { item: PlanItem; done: boolean }[] {
  return plan.map((item) => {
    if (item.key.startsWith("part:")) return { item, done: state.partsDone[Number(item.key.slice(5))] ?? false };
    if (item.key === "practice") return { item, done: state.activityDone };
    if (item.key === "explain") return { item, done: state.explainDone };
    if (item.key === "boss") return { item, done: state.masteryPassed };
    return { item, done: state.taskDone };
  });
}

/**
 * What a kid should be able to do by the end, in their own words. Authored
 * `objectives` when a lesson has them, otherwise its key ideas - so every
 * lesson can state its goals from day one.
 */
export function lessonObjectives(lesson: Lesson): string[] {
  const authored = (lesson.objectives ?? []).filter((s) => s.trim());
  return authored.length ? authored : (lesson.keyIdeas ?? []).filter((s) => s.trim());
}
