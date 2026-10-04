/**
 * Mastery rules. A skill is mastered when the kid gets at least 9 of their
 * last 10 practice questions right without using a hint. A hinted answer
 * still counts as practice, just not as proof of mastery.
 */

export const MASTERY_WINDOW = 10;
export const MASTERY_CORRECT = 9;

/** Days until each spaced review after mastery. */
export const REVIEW_INTERVALS = [3, 7, 21, 60];
export const REVIEW_QUESTIONS = 3;
export const REVIEW_PASS = 2;

export interface AttemptLite {
  correct: boolean;
  usedHint: boolean;
}

export interface MasteryProgress {
  /** Unhinted correct answers in the window. */
  correct: number;
  /** Attempts in the window (up to MASTERY_WINDOW). */
  count: number;
  mastered: boolean;
}

/** `recent` is newest-last; only the last MASTERY_WINDOW attempts matter. */
export function masteryProgress(recent: AttemptLite[]): MasteryProgress {
  const window = recent.slice(-MASTERY_WINDOW);
  const correct = window.filter((a) => a.correct && !a.usedHint).length;
  return {
    correct,
    count: window.length,
    mastered: window.length >= MASTERY_WINDOW && correct >= MASTERY_CORRECT,
  };
}

export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export interface ReviewOutcome {
  passed: boolean;
  /** New review stage (index into REVIEW_INTERVALS) when passed. */
  stage: number;
  /** Next review date, or null if the skill goes back to learning. */
  nextReview: string | null;
}

/**
 * After a review set: pass moves to the next (longer) interval; fail sends
 * the skill back to practice so the gap gets fixed.
 */
export function reviewOutcome(stage: number, correct: number, today: string): ReviewOutcome {
  if (correct >= REVIEW_PASS) {
    const next = Math.min(stage + 1, REVIEW_INTERVALS.length - 1);
    return { passed: true, stage: next, nextReview: addDays(today, REVIEW_INTERVALS[next]) };
  }
  return { passed: false, stage: 0, nextReview: null };
}

export interface TimedAttempt extends AttemptLite {
  responseMs: number;
  skillId: string;
}

export interface Flag {
  kind: "rushing" | "stuck";
  skillId?: string;
  message: string;
}

/** Signals a parent should see: fast wrong answers, or a skill that isn't clicking. */
export function detectFlags(
  today: TimedAttempt[],
  learningStats: { skillId: string; attempts: number; recentAccuracy: number }[],
): Flag[] {
  const flags: Flag[] = [];
  const fastWrong = today.slice(-15).filter((a) => !a.correct && a.responseMs < 4000).length;
  if (fastWrong >= 4) {
    flags.push({
      kind: "rushing",
      message: `${fastWrong} quick wrong answers recently (under 4 seconds). May be guessing.`,
    });
  }
  for (const s of learningStats) {
    if (s.attempts >= 30 || (s.attempts >= 15 && s.recentAccuracy < 0.5)) {
      flags.push({
        kind: "stuck",
        skillId: s.skillId,
        message: `${s.attempts} questions without mastering it (recent accuracy ${Math.round(s.recentAccuracy * 100)}%). Worth sitting with them on this one.`,
      });
    }
  }
  return flags;
}
