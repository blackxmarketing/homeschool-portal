/**
 * Learning-plan math for parents and kids: knowledge grade, pace forecasts,
 * the accuracy band, the waste meter and the struggle detector. Pure
 * functions so they're easy to test.
 */

export interface GradeRow {
  grade: number;
  mastered: number;
  total: number;
}

/** Share of a grade's skills that must be mastered to call the grade "done". */
export const GRADE_DONE = 0.9;

/** The grade of material the kid is working in: the lowest grade not yet done (90% mastered). */
export function knowledgeGrade(rows: GradeRow[]): number {
  const open = rows.find((r) => r.mastered / r.total < GRADE_DONE);
  return open ? open.grade : rows[rows.length - 1].grade + 1;
}

export interface Forecast {
  /** Skills still to master to finish the grade. */
  remaining: number;
  /** Skills mastered per week recently. */
  perWeek: number;
  /** Weeks to finish at the current pace (null when there's no pace yet). */
  weeks: number | null;
  /** Weeks to finish with one extra hour of practice a day, 5 days a week. */
  weeksWithExtraHour: number | null;
}

/**
 * How long until a grade is done. Pace comes from the last few weeks: skills
 * mastered and minutes practiced. More minutes are assumed to produce
 * proportionally more mastery (a simple, explainable model).
 */
export function forecast(row: GradeRow, masteredRecently: number, minutesRecently: number, weeksObserved: number): Forecast {
  const remaining = Math.max(0, Math.ceil(row.total * GRADE_DONE) - row.mastered);
  const perWeek = weeksObserved > 0 ? masteredRecently / weeksObserved : 0;
  if (remaining === 0) return { remaining, perWeek, weeks: 0, weeksWithExtraHour: 0 };
  if (perWeek <= 0) return { remaining, perWeek, weeks: null, weeksWithExtraHour: null };
  const minutesPerWeek = minutesRecently / weeksObserved;
  const boost = minutesPerWeek > 0 ? (minutesPerWeek + 60 * 5) / minutesPerWeek : 1;
  const round = (n: number) => Math.max(1, Math.round(n * 10) / 10);
  return { remaining, perWeek, weeks: round(remaining / perWeek), weeksWithExtraHour: round(remaining / (perWeek * boost)) };
}

export type AccuracyBand = "too-easy" | "on-target" | "too-hard" | "not-enough-data";

/**
 * Over 95% correct means the material is too easy (not learning much); under
 * 70% means it's too hard or the kid is guessing. 70-95% is the learning zone.
 */
export function accuracyBand(correct: number, total: number): AccuracyBand {
  if (total < 20) return "not-enough-data";
  const a = correct / total;
  if (a > 0.95) return "too-easy";
  if (a < 0.7) return "too-hard";
  return "on-target";
}

export interface WasteInput {
  correct: boolean;
  responseMs: number;
  /** Time from seeing the result to asking for the next question (null if unknown). */
  reviewMs: number | null;
}

/** Answers faster than this that are wrong look like guessing. */
export const RUSH_MS = 4000;
/** Time on one question beyond this is treated as walked away (the extra is wasted). */
export const IDLE_MS = 120_000;
/** Moving on in under this after a wrong answer means the explanation wasn't read. */
export const SKIM_MS = 3000;

export interface WasteReport {
  /** Share of practice time that was wasted, 0-100. */
  pct: number;
  rushed: number;
  idleMinutes: number;
  skippedExplanations: number;
  wrongAnswers: number;
}

/**
 * The waste meter: how much practice time didn't turn into learning.
 * Counts rushed wrong answers (guessing), idle time on a question, and wrong
 * answers where the kid moved on without reading the explanation.
 */
export function wasteMeter(attempts: WasteInput[]): WasteReport {
  let total = 0;
  let wasted = 0;
  let rushed = 0;
  let idle = 0;
  let skipped = 0;
  let wrong = 0;
  for (const a of attempts) {
    total += a.responseMs;
    if (!a.correct) wrong++;
    if (!a.correct && a.responseMs < RUSH_MS) {
      rushed++;
      wasted += a.responseMs;
    }
    if (a.responseMs > IDLE_MS) {
      idle += a.responseMs - IDLE_MS;
      wasted += a.responseMs - IDLE_MS;
    }
    if (!a.correct && a.reviewMs !== null && a.reviewMs < SKIM_MS) {
      skipped++;
      // A skipped explanation wastes the whole question: the mistake wasn't learned from.
      wasted += Math.min(a.responseMs, IDLE_MS);
    }
  }
  return {
    pct: total ? Math.min(100, Math.round((wasted / total) * 100)) : 0,
    rushed,
    idleMinutes: Math.round(idle / 60000),
    skippedExplanations: skipped,
    wrongAnswers: wrong,
  };
}

/**
 * Struggle detector: a skill isn't clicking when the last 3 answers were all
 * wrong, or after 12+ tries the recent accuracy is under 50%.
 */
export function isStruggling(recent: { correct: boolean }[], attemptsSoFar: number): boolean {
  const last3 = recent.slice(-3);
  if (last3.length === 3 && last3.every((a) => !a.correct)) return true;
  const last10 = recent.slice(-10);
  return attemptsSoFar >= 12 && last10.filter((a) => a.correct).length / last10.length < 0.5;
}

/** Correct answers per minute in a fact drill. */
export function factsPerMinute(correct: number, seconds: number): number {
  return seconds > 0 ? Math.round((correct / seconds) * 60) : 0;
}
