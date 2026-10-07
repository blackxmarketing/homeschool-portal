import type { PublicSegment, PublicMethod, AdaptView, TeachInitial } from "@/components/TeachPlayer";
import type { PublicWidget } from "./teaching";
import type { PublicProbe } from "./probes";
import { beatAt, cuePositions, type PublicBeat, type PublicShow } from "./storyboard";
import type { PlanItem } from "./lessonPlan";
import type { Term } from "@/content/courses/types";
import { sentences } from "@/components/voice";

/**
 * Turns a lesson into a tutoring conversation, Synthesis-style: the teacher
 * says one or two sentences at a time, and every few lines the kid does
 * something hands-on (a model to play with halfway through, then an
 * interactive problem to solve). No multiple choice.
 * Pure, so it can be tested.
 */

export type TutorStep =
  | { kind: "brief"; key: string; part: 0; title: string; objectives: string[]; plan: PlanItem[]; teaching: number; doing: number }
  | { kind: "present"; key: string; part: number; seg: number; scene: number; of: number; heading: string; text: string; show?: PublicShow; terms?: Term[] }
  | { kind: "checkin"; key: string; part: number; seg: number; scene: number; probe: PublicProbe; text: string }
  | { kind: "recap"; key: string; part: number; objectives: string[]; keyIdeas: string[]; next: "boss" | "mission" | "done" }
  | { kind: "say"; key: string; part: number; text: string; show?: PublicShow; label?: string; video?: boolean }
  | { kind: "explore"; key: string; part: number; seg: number | null; widget: PublicWidget; text: string }
  | { kind: "think"; key: string; part: number; seg: number; q: string; choices: string[]; optional?: boolean }
  | { kind: "probe"; key: string; part: number; seg: number; probe: PublicProbe; text: string }
  | { kind: "activity"; key: string; part: number; widget: PublicWidget; text: string }
  | { kind: "explain"; key: string; part: number; prompt: string }
  | { kind: "review"; key: string; part: number; items: { lessonId: string; seg: number; title: string; probe: PublicProbe }[] };

export interface TutorInput {
  hook?: { text: string; visual?: PublicWidget; show?: PublicShow };
  segments: PublicSegment[];
  activity?: PublicWidget;
  explain?: { prompt: string };
  initial: TeachInitial;
  adaptation?: AdaptView;
  review?: { lessonId: string; seg: number; title: string; probe: PublicProbe }[];
  /** For the opening brief and the closing recap. */
  lessonTitle?: string;
  objectives?: string[];
  keyIdeas?: string[];
  plan?: PlanItem[];
  hasMastery?: boolean;
  hasTask?: boolean;
}

/** Parts of the lesson for the progress bar: 0 = opening, 1..n = teaching parts, then practice. */
export function partNames(input: TutorInput): string[] {
  return ["Opening", ...input.segments.map((s) => s.title), "Practice"];
}

/**
 * Splits teaching text into short lines the teacher says one at a time.
 * Support mode uses one sentence per line; challenge mode allows three.
 */
export function chunkLines(text: string, mode: AdaptView["mode"] = "standard"): { text: string; start: number; end: number }[] {
  const per = mode === "support" ? 1 : mode === "challenge" ? 3 : 2;
  const maxChars = mode === "support" ? 160 : mode === "challenge" ? 320 : 230;
  const out: { text: string; start: number; end: number }[] = [];
  let cur: [number, number] | null = null;
  let count = 0;
  for (const [a, b] of sentences(text)) {
    if (cur && (count >= per || b - cur[0] > maxChars)) {
      out.push({ text: text.slice(cur[0], cur[1]).trim(), start: cur[0], end: cur[1] });
      cur = null;
      count = 0;
    }
    cur = cur ? [cur[0], b] : [a, b];
    count++;
  }
  if (cur) out.push({ text: text.slice(cur[0], cur[1]).trim(), start: cur[0], end: cur[1] });
  return out.filter((l) => l.text);
}

/**
 * The slides for one line: the slide already showing when the line starts,
 * then any slides cued inside the line (their cue words are in this line).
 */
export function lineShow(full: string, show: PublicShow | undefined, start: number, end: number): PublicShow | undefined {
  if (!show?.beats.length) return undefined;
  const pos = cuePositions(full, show.beats);
  const first = beatAt(pos, start);
  const beats: PublicBeat[] = [{ ...show.beats[first], at: undefined }];
  show.beats.forEach((b, i) => {
    if (i > first && pos[i] > start && pos[i] < end) beats.push(b);
  });
  return { beats };
}

function sayLines(prefix: string, part: number, text: string, show: PublicShow | undefined, mode: AdaptView["mode"], label?: string): TutorStep[] {
  return chunkLines(text, mode).map((l, i) => ({
    kind: "say" as const,
    key: `${prefix}:l${i}`,
    part,
    text: l.text,
    show: lineShow(text, show, l.start, l.end),
    ...(i === 0 && label ? { label } : {}),
  }));
}

function watchStep(key: string, part: number, watch: NonNullable<PublicShow["watch"]>): TutorStep {
  return { kind: "say", key, part, text: "Here's a short video that shows this in action. Press play, then tap Next when you're done.", show: { beats: [], watch }, label: "Watch", video: true };
}

/**
 * A part the author has written as a presentation: the teacher talks for a
 * scene at a time, with that scene's slides under the words, and usually
 * something to do straight after.
 */
export function methodSteps(i: number, part: number, m: PublicMethod, mi: number, mode: AdaptView["mode"]): TutorStep[] {
  const out: TutorStep[] = [];
  // Another way in, after a first go that didn't land: say so, so it reads as
  // help rather than the same thing again.
  if (mi > 0) {
    out.push({ kind: "say", key: `s${i}:m${mi}:intro`, part, text: `Let me show you another way. This one is called ${m.name}.`, label: "Another way" });
  }
  m.scenes.forEach((sc, j) => {
    out.push({
      kind: "present",
      key: `s${i}:m${mi}:sc${j}`,
      part,
      seg: i,
      scene: j,
      of: m.scenes.length,
      heading: sc.heading,
      text: sc.say,
      show: sc.show,
      ...(sc.terms?.length ? { terms: sc.terms } : {}),
    });
    if (sc.show?.watch) out.push(watchStep(`s${i}:m${mi}:sc${j}:video`, part, sc.show.watch));
    if (sc.visual) out.push({ kind: "explore", key: `s${i}:m${mi}:sc${j}:visual`, part, seg: i, widget: sc.visual, text: "Your turn. Play with this until it makes sense." });
    if (sc.check && mode !== "challenge") {
      out.push({ kind: "checkin", key: `s${i}:m${mi}:sc${j}:check`, part, seg: i, scene: j, probe: sc.check, text: "Quick check before we move on." });
    }
  });
  // What the practice is about to ask, then the practice itself.
  out.push({ kind: "say", key: `s${i}:m${mi}:expect`, part, text: m.expect, label: "Now you try" });
  out.push({ kind: "probe", key: `s${i}:m${mi}:probe`, part, seg: i, probe: m.probe, text: "Your turn. Show me what you've got." });
  return out;
}

export function buildSteps(input: TutorInput): TutorStep[] {
  const mode = input.adaptation?.mode ?? "standard";
  const steps: TutorStep[] = [];
  const practicePart = input.segments.length + 1;
  const started = input.initial.segmentsDone.some(Boolean);

  // What they are about to learn, and the plan for getting there.
  if (!started && input.plan?.length && input.objectives?.length) {
    const teaching = input.plan.filter((p) => p.kind === "learn").reduce((t, p) => t + p.minutes, 0);
    const doing = input.plan.filter((p) => p.kind !== "learn").reduce((t, p) => t + p.minutes, 0);
    steps.push({
      kind: "brief",
      key: "brief",
      part: 0,
      title: input.lessonTitle ?? "",
      objectives: input.objectives,
      plan: input.plan,
      teaching,
      doing,
    });
  }

  if (input.review?.length && !started) steps.push({ kind: "review", key: "review", part: 0, items: input.review });

  if (input.hook && !started) {
    steps.push(...sayLines("hook", 0, input.hook.text, input.hook.show, mode));
    if (input.hook.show?.watch) steps.push(watchStep("hook:video", 0, input.hook.show.watch));
    if (input.hook.visual) steps.push({ kind: "explore", key: "hook:visual", part: 0, seg: null, widget: input.hook.visual, text: "Take a look at this. Try it out!" });
  }

  input.segments.forEach((seg, i) => {
    if (input.initial.segmentsDone[i]) return;
    const part = i + 1;
    // A taught part replaces the read-it-out-in-short-lines path. The choice is
    // per part, so a lesson can be half written and still play. Only the method
    // the kid is on is built now; if they miss its practice the player splices
    // in the next one.
    if (seg.methods?.length) {
      const mi = Math.min(input.initial.segmentMethod?.[i] ?? 0, seg.methods.length - 1);
      steps.push(...methodSteps(i, part, seg.methods[mi], mi, mode));
      return;
    }
    const lines = sayLines(`s${i}`, part, seg.teach, seg.show, mode, seg.title);
    // The hands-on model goes halfway through the explanation, so the kid is doing something every few lines
    // (sooner after a long hook, so there are never more than 6 lines in a row).
    let carry = 0;
    while (carry < steps.length && steps[steps.length - 1 - carry].kind === "say") carry++;
    const half = lines.length >= 3 ? Math.ceil(lines.length / 2) : lines.length;
    const mid = seg.visual ? Math.max(1, Math.min(half, 6 - carry)) : -1;
    lines.forEach((l, li) => {
      steps.push(l);
      if (li === mid - 1 && seg.visual)
        steps.push({ kind: "explore", key: `s${i}:visual`, part, seg: i, widget: seg.visual, text: "Your turn to try it. Play with this until it makes sense." });
    });
    if (seg.show?.watch) steps.push(watchStep(`s${i}:video`, part, seg.show.watch));
    if (seg.example) steps.push({ kind: "say", key: `s${i}:example`, part, text: seg.example, label: "Watch me do one first" });
    if (seg.probe) steps.push({ kind: "probe", key: `s${i}:probe`, part, seg: i, probe: seg.probe, text: "Your turn. Show me what you've got." });
    else steps.push({ kind: "think", key: `s${i}:think`, part, seg: i, q: seg.think.q, choices: seg.think.choices });
  });

  if (input.activity && !input.initial.activityDone) {
    steps.push({ kind: "activity", key: "activity", part: practicePart, widget: input.activity, text: "Hands-on time! Let's put it all together." });
  }
  if (input.explain && !input.initial.explainDone) steps.push({ kind: "explain", key: "explain", part: practicePart, prompt: input.explain.prompt });
  // What they just learned, ticked off against what they were promised.
  if (input.objectives?.length) {
    steps.push({
      kind: "recap",
      key: "recap",
      part: practicePart,
      objectives: input.objectives,
      keyIdeas: input.keyIdeas ?? [],
      next: input.hasMastery ? "boss" : input.hasTask ? "mission" : "done",
    });
  }
  return steps;
}

/** Fast lane: skip the extra practice models, worked examples and check-ins still ahead (the real problems stay). */
export function compress(steps: TutorStep[], from: number): TutorStep[] {
  return [
    ...steps.slice(0, from),
    ...steps
      .slice(from)
      .filter((s) => !(s.kind === "explore" && s.seg !== null) && !(s.kind === "say" && s.label === "Watch me do one first") && s.kind !== "checkin"),
  ];
}
