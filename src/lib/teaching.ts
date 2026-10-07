import type { Lesson, Segment, ThinkQuestion, Widget } from "@/content/courses/types";
import { seededOrder } from "./variants";

/**
 * The teaching model's rules, kept pure so they're easy to test:
 *  - what the browser may see (answers stay on the server),
 *  - how activities are checked,
 *  - the coaching ladder when a kid is struggling.
 */

// ---------------- Coaching ladder ----------------

/**
 * Each miss on a segment's quick think moves one rung up:
 *  1 miss  -> coaching on the exact choice they picked
 *  2 misses -> a different way in: an everyday analogy
 *  3 misses -> a worked example, a smaller first step, and the AI coach steps in
 *  4 misses -> show the answer with the full reason, mark "needed support", move on
 * "I'm lost" climbs one rung without counting as a miss.
 */
export const LADDER = { hint: 1, analogy: 2, example: 3, reveal: 4 } as const;

export interface SegmentState {
  misses: number;
  /** Highest rung of help shown. */
  rung: number;
  lost: number;
  /** The simpler first-step question was answered right. */
  simplerDone: boolean;
  /** "passed" on their own (or with light help); "supported" after the answer was shown. */
  done: "" | "passed" | "supported";
  aiRescues: number;
  /** Total time spent answering (ms). */
  ms?: number;
}

export interface TeachState {
  segments: SegmentState[];
  activity: { tries: number; done: boolean };
  explain: { tries: number; done: boolean; understood: boolean; feedback: string };
  masteryTries?: number;
  /** The current round of the interactive mastery check. */
  masteryItems?: { tries: number; credit: number; done: boolean; ms: number }[];
  masteryRounds?: number;
  /** Which version of the lesson they are on (see lib/variants.ts). */
  variant?: number;
  /** Set when a kid has had plenty of goes and the mastery meter is not moving:
   *  they are let through and the parents are told, rather than grinding on. */
  stuck?: boolean;
}

export function emptySegment(): SegmentState {
  return { misses: 0, rung: 0, lost: 0, simplerDone: false, done: "", aiRescues: 0 };
}

export function parseState(raw: string | null | undefined, segments: number): TeachState {
  let s: Partial<TeachState> = {};
  try {
    s = raw ? JSON.parse(raw) : {};
  } catch {
    s = {};
  }
  const segs = Array.from({ length: segments }, (_, i) => ({ ...emptySegment(), ...(s.segments?.[i] ?? {}) }));
  return {
    segments: segs,
    activity: { tries: 0, done: false, ...(s.activity ?? {}) },
    explain: { tries: 0, done: false, understood: false, feedback: "", ...(s.explain ?? {}) },
    masteryTries: s.masteryTries ?? 0,
    masteryItems: s.masteryItems,
    masteryRounds: s.masteryRounds ?? 0,
    variant: s.variant ?? 0,
    stuck: s.stuck ?? false,
  };
}

/** What the kid sees after a quick-think answer, given the segment and its state after the answer. */
export function coachingFor(seg: Segment, st: SegmentState, choice: number) {
  const hint = seg.think.hints[choice] || "Not quite. Look again at the key idea above.";
  return {
    hint,
    analogy: st.rung >= LADDER.analogy ? seg.approaches.analogy : null,
    example: st.rung >= LADDER.example ? seg.approaches.example : null,
    simpler: st.rung >= LADDER.example && !st.simplerDone ? publicThink(seg.approaches.simpler) : null,
    reveal: st.rung >= LADDER.reveal ? { answer: seg.think.answer, why: seg.think.why } : null,
  };
}

/** A segment is finished once passed or supported. Teaching is finished when every segment is. */
export function teachingDone(lesson: Lesson, state: TeachState): boolean {
  const segs = lesson.teach ?? [];
  return segs.every((_, i) => !!state.segments[i]?.done);
}

/** Everything the interactive part of a lesson requires before the final check and task. */
export function interactiveDone(lesson: Lesson, state: TeachState): boolean {
  if (!lesson.teach?.length) return true;
  return teachingDone(lesson, state) && (!lesson.activity || state.activity.done) && (!lesson.explain || state.explain.done);
}

/** Segments where the kid needed real help (for the parent's report). */
export function supportSummary(lesson: Lesson, state: TeachState) {
  return (lesson.teach ?? [])
    .map((seg, i) => ({ title: seg.title, ...state.segments[i] }))
    .filter((s) => s.misses >= 2 || s.done === "supported" || s.lost > 0 || s.aiRescues > 0);
}

// ---------------- What the browser sees ----------------

export function publicThink(q: ThinkQuestion): { q: string; choices: string[] } {
  return { q: q.q, choices: q.choices };
}

export type PublicWidget =
  | { type: "sort"; prompt: string; buckets: string[]; items: { id: number; text: string }[] }
  | { type: "sequence"; prompt: string; steps: { id: number; text: string }[] }
  | { type: "highlight"; prompt: string; sentences: string[]; count: number }
  | Exclude<Widget, { type: "sort" | "sequence" | "highlight" }>;

/** Removes answers from activity widgets and shuffles them. Explorable widgets pass through. */
export function publicWidget(w: Widget, seed: string): PublicWidget {
  switch (w.type) {
    case "sort":
      return { type: "sort", prompt: w.prompt, buckets: w.buckets, items: seededOrder(w.items.length, seed).map((i) => ({ id: i, text: w.items[i].text })) };
    case "sequence":
      return { type: "sequence", prompt: w.prompt, steps: seededOrder(w.steps.length, seed).map((i) => ({ id: i, text: w.steps[i] })) };
    case "highlight":
      return { type: "highlight", prompt: w.prompt, sentences: w.sentences, count: w.correct.length };
    default:
      return w;
  }
}

export function isActivity(w: Widget | undefined): w is Extract<Widget, { type: "sort" | "sequence" | "highlight" }> {
  return !!w && (w.type === "sort" || w.type === "sequence" || w.type === "highlight");
}

/**
 * Checks an activity answer.
 *  sort:      answer[id] = bucket index chosen for item `id`
 *  sequence:  answer = item ids in the kid's order
 *  highlight: answer = selected sentence indexes
 * Returns which parts are right so the kid can fix just those.
 */
export function checkActivity(w: Widget, answer: number[]): { correct: boolean; parts: boolean[] } {
  switch (w.type) {
    case "sort": {
      const parts = w.items.map((it, i) => answer[i] === it.bucket);
      return { correct: parts.every(Boolean), parts };
    }
    case "sequence": {
      const parts = w.steps.map((_, pos) => answer[pos] === pos);
      return { correct: answer.length === w.steps.length && parts.every(Boolean), parts };
    }
    case "highlight": {
      const chosen = new Set(answer);
      const parts = w.sentences.map((_, i) => chosen.has(i) === w.correct.includes(i));
      return { correct: parts.every(Boolean), parts };
    }
    default:
      return { correct: true, parts: [] };
  }
}

/**
 * Without AI, "explain it back" is checked by looking for each key point's
 * important words in the kid's explanation. Generous on purpose: it's a
 * nudge to think, not a test.
 */
export function keywordExplainCheck(text: string, keyPoints: string[]): { covered: string[]; missing: string[] } {
  const words = new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? []);
  const stop = new Set(["the", "a", "an", "and", "or", "of", "to", "in", "is", "are", "it", "you", "your", "that", "for", "on", "with", "by", "be", "can", "more", "than", "from", "as", "at", "its", "they", "their", "this", "what", "how", "why"]);
  const covered: string[] = [];
  const missing: string[] = [];
  for (const p of keyPoints) {
    const key = (p.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((w) => w.length > 3 && !stop.has(w));
    const hits = key.filter((k) => words.has(k) || [...words].some((w) => w.length > 4 && (w.startsWith(k.slice(0, 5)) || k.startsWith(w.slice(0, 5)))));
    (key.length === 0 || hits.length / key.length >= 0.34 ? covered : missing).push(p);
  }
  return { covered, missing };
}
