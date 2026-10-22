import { MIA_SKIP_ITEMS } from "@/content/miacademy";

/**
 * The step-by-step checklist for one Miacademy lesson (docs/MIACADEMY.md).
 * Items come from the checklist box on page 1 of the lesson's Student PDF,
 * minus online practice, optional and bonus items. Pure functions only.
 */

/** How an item gets checked off. */
export type ItemCheck =
  /** Miacademy marks the video done. */
  | "video"
  /** Miacademy marks the quiz done (it makes them retake a failed quiz itself). */
  | "quiz"
  /** A photo of the page, compared with the answer key. */
  | "photo"
  /** Needs supplies: the timer pauses to gather them, and a parent approves it. */
  | "parent";

export interface LessonItem {
  id: string;
  title: string;
  check: ItemCheck;
  /** Student PDF pages for this activity (1-based). */
  pages: number[];
  /** What to gather, for "parent" items. */
  supplies: string[];
}

/** What Claude reads off the PDF's checklist and pages. */
export interface ParsedActivity {
  title: string;
  kind: "video" | "quiz" | "worksheet" | "hands_on" | "other";
  pages: number[];
  supplies: string[];
}

export interface ItemState {
  done: boolean;
  at?: number;
  /** Skipped by a parent. */
  skipped?: boolean;
  /** Photo check result: right/total from the first photo; wrong = what's still left to fix. */
  right?: number;
  total?: number;
  wrong?: { question: string; answer: string }[];
  /** Photo sent, waiting for a parent to approve. */
  waitingForParent?: boolean;
  /** A parent said the supplies are ready (so the timer doesn't pause again). */
  suppliesReady?: boolean;
  photo?: string;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "item";

/** Turns what was read off the PDF into checklist items, in order, without the ones the kids skip. */
export function buildItems(parsed: ParsedActivity[]): LessonItem[] {
  const seen = new Set<string>();
  const items: LessonItem[] = [];
  for (const a of parsed) {
    const title = a.title.trim();
    if (!title || MIA_SKIP_ITEMS.some((re) => re.test(title))) continue;
    let id = slug(title);
    for (let n = 2; seen.has(id); n++) id = `${slug(title)}-${n}`;
    seen.add(id);
    const check: ItemCheck =
      a.kind === "video" ? "video" : a.kind === "quiz" ? "quiz" : a.kind === "hands_on" || a.supplies.length > 0 ? "parent" : "photo";
    items.push({ id, title, check, pages: a.pages.filter((p) => Number.isInteger(p) && p > 0), supplies: a.supplies.slice(0, 12) });
  }
  return items;
}

/** Items still to do, in order. */
export function remainingItems(items: LessonItem[], states: Record<string, ItemState>): LessonItem[] {
  return items.filter((i) => !states[i.id]?.done);
}

export function lessonDone(items: LessonItem[], states: Record<string, ItemState>): boolean {
  return items.length > 0 && remainingItems(items, states).length === 0;
}

/**
 * The answer key sits next to the Student PDF with the same name:
 * ".../SC4 Forces Gravity Student PDF.pdf" -> ".../SC4 Forces Gravity Answer Key.pdf".
 */
export function answerKeyUrl(studentPdf: string): string | null {
  return /Student(\+|%20| )PDF\.pdf$/i.test(studentPdf) ? studentPdf.replace(/Student(\+|%20| )PDF\.pdf$/i, (_m, sep) => `Answer${sep}Key.pdf`) : null;
}

/**
 * Guess a lesson's Student PDF from another lesson's in the same course:
 * same folder and course code, lesson title without punctuation.
 */
export function guessStudentPdf(knownPdf: string, knownTitle: string, newTitle: string): string | null {
  const enc = (t: string) =>
    t
      .replace(/[^A-Za-z0-9 ]+/g, " ")
      .trim()
      .split(/\s+/)
      .join("+");
  const known = enc(knownTitle);
  if (!known || !knownPdf.includes(known)) return null;
  return knownPdf.replace(known, enc(newTitle));
}

/** Monday of the week a date falls in (YYYY-MM-DD in, YYYY-MM-DD out). */
export function weekStart(day: string): string {
  const d = new Date(`${day}T12:00:00Z`);
  const back = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - back);
  return d.toISOString().slice(0, 10);
}

/** "Forces: Gravity Student PDF" -> "Forces: Gravity". */
export function lessonTitleFromTask(title: string): string {
  return title
    .replace(/\s*Student PDF$/i, "")
    .replace(/:\s*Video Lesson$/i, "")
    .trim();
}
