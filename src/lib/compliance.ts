/**
 * Colorado home-study tracking (C.R.S. 22-33-104.5): 172 days of instruction
 * a year, averaging 4 hours a day, covering the required subjects. This is a
 * record-keeping aid, not legal advice. Check the current statute and your
 * district's homeschool page each year.
 */

export const REQUIRED_DAYS = 172;
export const REQUIRED_AVG_HOURS = 4;

export const SUBJECTS = [
  "Math",
  "Reading",
  "Writing",
  "Speaking",
  "Literature",
  "History",
  "Civics",
  "Science",
  "U.S. Constitution",
  "Other",
] as const;

export type Subject = (typeof SUBJECTS)[number];

/** Subjects Colorado requires; "Other" (art, PE, music, projects) still counts toward hours. */
export const REQUIRED_SUBJECTS: Subject[] = SUBJECTS.filter((s) => s !== "Other");

export interface DayMinutes {
  date: string;
  subject: string;
  minutes: number;
}

export interface ComplianceSummary {
  days: number;
  totalHours: number;
  avgHoursPerDay: number;
  hoursBySubject: Record<string, number>;
  missingSubjects: string[];
  daysRemaining: number;
}

export function summarize(rows: DayMinutes[]): ComplianceSummary {
  const byDay = new Map<string, number>();
  const bySubject: Record<string, number> = {};
  for (const r of rows) {
    byDay.set(r.date, (byDay.get(r.date) ?? 0) + r.minutes);
    bySubject[r.subject] = (bySubject[r.subject] ?? 0) + r.minutes;
  }
  const days = [...byDay.values()].filter((m) => m > 0).length;
  const totalMinutes = [...byDay.values()].reduce((s, m) => s + m, 0);
  const hoursBySubject: Record<string, number> = {};
  for (const [k, v] of Object.entries(bySubject)) hoursBySubject[k] = Math.round((v / 60) * 10) / 10;
  return {
    days,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
    avgHoursPerDay: days ? Math.round((totalMinutes / 60 / days) * 100) / 100 : 0,
    hoursBySubject,
    missingSubjects: REQUIRED_SUBJECTS.filter((s) => !bySubject[s]),
    daysRemaining: Math.max(0, REQUIRED_DAYS - days),
  };
}

/** School year starts Aug 1 by default; returns the start date for the year containing `today`. */
export function schoolYearStart(today: string, startMonthDay = "08-01"): string {
  const year = Number(today.slice(0, 4));
  const candidate = `${year}-${startMonthDay}`;
  return today >= candidate ? candidate : `${year - 1}-${startMonthDay}`;
}
