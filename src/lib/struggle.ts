/**
 * Predicts when a kid is starting to struggle on an interactive step, before
 * they get it wrong, from how they're working: taking much longer than
 * expected, not starting at all, going quiet, wrong tries, guessing fast,
 * asking for the line again, and how they've done in this subject before.
 *
 * The tutor uses it to step in early (offer a hint), scaffold (show a simpler
 * way in), or slow a fast guesser down; and to notice "flow" (fast and right)
 * so it can speed up.
 */

export interface Signals {
  /** Time on this step so far. */
  elapsedMs: number;
  /** How long a kid who knows this usually takes. */
  expectedMs: number;
  /** When they first touched or typed anything (null = not yet). */
  firstActionMs: number | null;
  /** Time since their last touch or keypress. */
  idleMs: number;
  wrong: number;
  /** Wrong answers given much faster than expected (guessing). */
  fastWrong: number;
  hints: number;
  /** Times they asked the teacher to say it again. */
  replays: number;
  /** From the learner model: 0 (ahead) to 1 (falling behind in this subject). */
  priorRisk: number;
}

const clamp = (n: number) => Math.max(0, Math.min(1, n));

/** 0 = smooth sailing, 1 = clearly stuck. */
export function struggleScore(s: Signals): number {
  const expected = Math.max(5000, s.expectedMs);
  const overtime = clamp((s.elapsedMs / expected - 1) / 1.5);
  const notStarted = s.firstActionMs === null && s.elapsedMs > expected * 0.6 ? 1 : 0;
  const quiet = clamp((s.idleMs - 12_000) / 30_000);
  const wrongs = Math.min(3, s.wrong) / 3;
  const help = Math.min(2, s.hints) / 2;
  const again = Math.min(3, s.replays) / 3;
  return clamp(overtime * 0.3 + notStarted * 0.2 + quiet * 0.15 + wrongs * 0.35 + help * 0.1 + again * 0.1 + s.priorRisk * 0.15);
}

export type Move = "nudge" | "scaffold" | "slow-down";

/** What the tutor should do now, if anything. Each move happens at most once per step. */
export function nextMove(s: Signals, done: ReadonlySet<Move>): Move | null {
  if (s.fastWrong >= 2 && !done.has("slow-down")) return "slow-down";
  const score = struggleScore(s);
  if (score >= 0.6 && !done.has("scaffold")) return "scaffold";
  if (score >= 0.38 && !done.has("nudge") && !done.has("scaffold")) return "nudge";
  return null;
}

/** A wrong answer counts as a guess when it comes in under a third of the expected time. */
export const isFastGuess = (ms: number, expectedMs: number) => ms < Math.max(2500, expectedMs / 3);

/** "In flow": the last few interactive steps were right the first time and quick. */
export function inFlow(history: { firstTry: boolean; ratio: number }[]): boolean {
  const last = history.slice(-3);
  return last.length === 3 && last.every((h) => h.firstTry && h.ratio <= 0.8);
}

/** Starting risk from the learner model's mode for this subject. */
export const priorRiskFor = (mode: "support" | "standard" | "challenge" | undefined) => (mode === "support" ? 0.6 : mode === "challenge" ? 0 : 0.2);
