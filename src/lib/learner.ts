/**
 * The learner model: from every answer a kid gives (accuracy, speed, tries,
 * help used) it builds a per-subject profile, spots when they're starting to
 * fall behind (before they fail), and decides how to adapt the teaching.
 *
 * It adapts to what has actually worked for this child (their own results),
 * not to a fixed "learning style" label.
 */

export interface LearningEvent {
  /** Concept id: a lesson part or a math skill. */
  concept: string;
  /** Right on the first try, with no help. */
  firstTry: boolean;
  /** 0-1 credit on the final answer. */
  score: number;
  /** How long the kid took. */
  ms: number;
  /** How long a kid who knows it should take. */
  expectedMs: number;
  /** Any help used: hints, "I'm lost", coach, worked example. */
  helped: boolean;
  /** Event time (ms since epoch). */
  at: number;
}

export type Status = "new" | "ahead" | "on-track" | "watch" | "behind";

export interface Profile {
  events: number;
  /** First-try accuracy, recent window (0-1). */
  accuracy: number;
  /** Change vs the window before (positive = improving). */
  accuracyTrend: number;
  /** Median time / expected time on correct answers (1 = as expected, <1 faster). */
  speed: number;
  speedTrend: number;
  /** Share of items that needed help. */
  helpRate: number;
  helpTrend: number;
  /** Average estimated mastery across concepts (0-1). */
  mastery: number;
  /** Concepts with the lowest estimated mastery. */
  weakest: { concept: string; p: number }[];
  status: Status;
  reasons: string[];
}

const WINDOW = 20;

const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

function windowStats(evs: LearningEvent[]) {
  const right = evs.filter((e) => e.score >= 1 && e.expectedMs > 0);
  return {
    accuracy: mean(evs.map((e) => (e.firstTry ? 1 : 0))),
    speed: median(right.map((e) => Math.min(5, e.ms / e.expectedMs))),
    helpRate: mean(evs.map((e) => (e.helped ? 1 : 0))),
  };
}

/**
 * Knowledge tracing, simplified: each concept starts at 0.3 known. An
 * unaided first-try right answer moves it up a lot, a right answer with help
 * a little, and a miss pulls it down.
 */
export function conceptMastery(events: LearningEvent[]): Map<string, number> {
  const p = new Map<string, number>();
  for (const e of [...events].sort((a, b) => a.at - b.at)) {
    let v = p.get(e.concept) ?? 0.3;
    if (e.firstTry && !e.helped) v += (1 - v) * 0.45;
    else if (e.score >= 1) v += (1 - v) * 0.12;
    else v *= 0.6;
    p.set(e.concept, Math.min(0.99, Math.max(0.01, v)));
  }
  return p;
}

export function buildProfile(events: LearningEvent[]): Profile {
  const sorted = [...events].sort((a, b) => a.at - b.at);
  const recent = sorted.slice(-WINDOW);
  const before = sorted.slice(-2 * WINDOW, -WINDOW);
  const now = windowStats(recent);
  const prev = before.length >= 5 ? windowStats(before) : now;
  const mastery = conceptMastery(sorted);
  const masteryValues = [...mastery.values()];
  const weakest = [...mastery.entries()]
    .map(([concept, p]) => ({ concept, p: round(p) }))
    .sort((a, b) => a.p - b.p)
    .slice(0, 3);

  const profile: Profile = {
    events: sorted.length,
    accuracy: round(now.accuracy),
    accuracyTrend: round(now.accuracy - prev.accuracy),
    speed: round(now.speed),
    speedTrend: round(now.speed - prev.speed),
    helpRate: round(now.helpRate),
    helpTrend: round(now.helpRate - prev.helpRate),
    mastery: round(mean(masteryValues)),
    weakest,
    status: "on-track",
    reasons: [],
  };
  classify(profile);
  return profile;
}

/**
 * Early warning. "Behind" means struggling now; "watch" means the signs that
 * come before falling behind (accuracy sliding, needing more help, slowing
 * down) even if scores still look fine.
 */
function classify(p: Profile): void {
  const r: string[] = [];
  if (p.events < 6) {
    p.status = "new";
    p.reasons = ["Not enough answers yet to see a pattern."];
    return;
  }
  const behind = p.accuracy < 0.55 || p.helpRate >= 0.55;
  if (p.accuracy < 0.55) r.push(`Gets only ${Math.round(p.accuracy * 100)}% right on the first try.`);
  if (p.helpRate >= 0.55) r.push(`Needs help on ${Math.round(p.helpRate * 100)}% of questions.`);
  const warnings: string[] = [];
  if (p.accuracyTrend <= -0.15) warnings.push(`First-try accuracy dropped ${Math.round(-p.accuracyTrend * 100)} points recently.`);
  if (p.helpTrend >= 0.2) warnings.push(`Asking for help ${Math.round(p.helpTrend * 100)} points more often than before.`);
  if (p.speedTrend >= 0.4 && p.speed > 1.2) warnings.push("Slowing down: taking much longer than before on questions they get right.");
  if (p.accuracy < 0.7 && !behind) warnings.push(`First-try accuracy is ${Math.round(p.accuracy * 100)}%, below the 70% learning zone.`);
  const ahead = p.accuracy >= 0.85 && p.helpRate <= 0.15 && p.speed > 0 && p.speed <= 1 && p.events >= 10;

  if (behind) p.status = "behind";
  else if (warnings.length) p.status = "watch";
  else if (ahead) p.status = "ahead";
  else p.status = "on-track";

  if (p.status === "ahead") r.push(`${Math.round(p.accuracy * 100)}% right first try, quickly and mostly without help.`);
  if (p.status === "on-track") r.push("Steady: accuracy, speed and help are all in a healthy range.");
  p.reasons = [...r, ...warnings];
}

/** Which kind of help has actually turned misses into understanding for this kid. */
export type HelpKind = "hint" | "analogy" | "example";

export function whatHelps(rescues: { rungAtSuccess: number }[]): { best: HelpKind | null; counts: Record<HelpKind, number> } {
  const counts: Record<HelpKind, number> = { hint: 0, analogy: 0, example: 0 };
  for (const r of rescues) {
    if (r.rungAtSuccess === 1) counts.hint++;
    else if (r.rungAtSuccess === 2) counts.analogy++;
    else if (r.rungAtSuccess >= 3) counts.example++;
  }
  const total = counts.hint + counts.analogy + counts.example;
  if (total < 3) return { best: null, counts };
  const best = (Object.entries(counts) as [HelpKind, number][]).sort((a, b) => b[1] - a[1])[0][0];
  return { best, counts };
}

export interface Adaptation {
  mode: "support" | "standard" | "challenge";
  /** Show the worked example before asking ("I do, we do, you do"). */
  exampleFirst: boolean;
  /** Which kind of help to offer first when they miss. */
  leadWith: "analogy" | "example" | null;
  /** Start the lesson with a quick review of their weakest ideas in this subject. */
  reviewFirst: boolean;
  /** Let them prove they know it and skip ahead. */
  offerTestOut: boolean;
  /** Shown to the kid. */
  message: string;
  /** Shown to the parent. */
  why: string[];
}

export function adapt(profile: Profile, helps: { best: HelpKind | null }): Adaptation {
  const leadWith = helps.best === "analogy" ? "analogy" : helps.best === "example" ? "example" : null;
  switch (profile.status) {
    case "behind":
      return {
        mode: "support",
        exampleFirst: true,
        leadWith: leadWith ?? "example",
        reviewFirst: true,
        offerTestOut: false,
        message: "Your coach set up this lesson with extra examples and a quick warm-up. Let's build it step by step.",
        why: ["Worked examples come before each question", "A warm-up review of the weakest ideas", `Help starts with ${leadWith ?? "worked examples"}`, ...profile.reasons],
      };
    case "watch":
      return {
        mode: "support",
        exampleFirst: false,
        leadWith,
        reviewFirst: true,
        offerTestOut: false,
        message: "Quick warm-up first, so this lesson goes smoothly.",
        why: ["A warm-up review of the weakest ideas", ...(leadWith ? [`Help starts with ${leadWith === "analogy" ? "analogies" : "worked examples"} (what has worked before)`] : []), ...profile.reasons],
      };
    case "ahead":
      return {
        mode: "challenge",
        exampleFirst: false,
        leadWith,
        reviewFirst: false,
        offerTestOut: true,
        message: "You're flying in this subject. Want to test out and move ahead?",
        why: ["Offered a test-out to skip ahead", ...profile.reasons],
      };
    default:
      return { mode: "standard", exampleFirst: false, leadWith, reviewFirst: false, offerTestOut: false, message: "", why: profile.reasons };
  }
}
