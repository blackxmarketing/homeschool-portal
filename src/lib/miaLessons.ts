import { MIA_SKIP_ITEMS, miaLessonRules } from "@/content/miacademy";

/**
 * The step-by-step checklist for one Miacademy lesson (docs/MIACADEMY.md).
 * Items come from the checklist box on page 1 of the lesson's Student PDF,
 * minus online practice, optional and bonus items. Pure functions only.
 */

/** How an item gets checked off. */
export type ItemCheck =
  /** Miacademy marks the video done. */
  | "video"
  /** Miacademy marks an online practice level done. */
  | "practice"
  /** The kid taps "I finished" (guided notes: done in the packet, not photo-checked). */
  | "self"
  /** A Miacademy task in an online-only class: done when Miacademy moves past it. */
  | "online"
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
  /** A practice item standing for every level (when the PDF doesn't list them): done when Miacademy reaches the quiz. */
  allLevels?: boolean;
}

/** What Claude reads off the PDF's checklist and pages. */
export interface ParsedActivity {
  title: string;
  kind: "video" | "quiz" | "practice" | "notes" | "worksheet" | "hands_on" | "other";
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

/**
 * Turns what was read off the PDF into checklist items, in order, without the
 * ones the kids skip: optional and bonus lines always, and online practice or
 * PDF activities depending on the lesson (miaLessonRules).
 */
export function buildItems(parsed: ParsedActivity[], subject = "sci", lessonTitle = "", courseTitle = ""): LessonItem[] {
  const rules = miaLessonRules(subject, lessonTitle, courseTitle);
  const seen = new Set<string>();
  const items: LessonItem[] = [];
  for (const a of parsed) {
    const title = a.title.trim();
    if (!title || MIA_SKIP_ITEMS.some((re) => re.test(title))) continue;
    const practice = a.kind === "practice" || /online practice|^practice/i.test(title);
    if (practice && !rules.practice) continue;
    if ((a.kind === "worksheet" || a.kind === "hands_on" || a.kind === "other") && !rules.worksheets) continue;
    // "Video and Guided Notes" on one line (Math): two items, so the notes aren't lost.
    if (!practice && /video/i.test(title) && /guided notes|notes/i.test(title) && a.kind !== "hands_on") {
      push(items, seen, { id: "", title: "Watch the lesson video", check: "video", pages: [], supplies: [] });
      push(items, seen, { id: "", title: "Complete the guided notes", check: "self", pages: a.pages, supplies: [] });
      continue;
    }
    let id = slug(title);
    for (let n = 2; seen.has(id); n++) id = `${slug(title)}-${n}`;
    seen.add(id);
    const check: ItemCheck = practice
      ? "practice"
      : a.kind === "video"
        ? "video"
        : a.kind === "quiz"
          ? "quiz"
          : a.kind === "notes" || /guided notes/i.test(title)
            ? "self"
            : a.kind === "hands_on" || a.supplies.length > 0
              ? "parent"
              : "photo";
    items.push({ id, title, check, pages: a.pages.filter((p) => Number.isInteger(p) && p > 0), supplies: a.supplies.slice(0, 12) });
  }
  // Some packets (U.S. Geography) have no checklist, only note pages: the online parts come from Miacademy.
  if (!items.some((i) => i.check === "video")) items.unshift({ id: uniqueId(seen, "Watch the lesson video"), title: "Watch the lesson video", check: "video", pages: [], supplies: [] });
  const quizAt = items.findIndex((i) => i.check === "quiz");
  if (rules.practice && !items.some((i) => i.check === "practice")) {
    const all: LessonItem = { id: uniqueId(seen, "Online practice"), title: "Online practice (all levels)", check: "practice", pages: [], supplies: [], allLevels: true };
    if (quizAt >= 0) items.splice(quizAt, 0, all);
    else items.push(all);
  }
  if (!items.some((i) => i.check === "quiz")) items.push({ id: uniqueId(seen, "Online quiz"), title: "Online quiz", check: "quiz", pages: [], supplies: [] });
  return items;
}

function uniqueId(seen: Set<string>, title: string): string {
  let id = slug(title);
  for (let n = 2; seen.has(id); n++) id = `${slug(title)}-${n}`;
  seen.add(id);
  return id;
}

function push(items: LessonItem[], seen: Set<string>, item: LessonItem): void {
  if (item.check === "video" && items.some((i) => i.check === "video")) return;
  items.push({ ...item, id: uniqueId(seen, item.title) });
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

/**
 * A kid-friendly name for a Miacademy task in an online-only class, from its
 * description ("Can you watch all of this learning video: X?" -> "Watch the video: X").
 */
export function onlineTaskTitle(type: string | null, title: string | null, description: string | null): string {
  const d = (description ?? "").trim().replace(/\?+$/, "");
  const video = /video:\s*(.+)$/i.exec(d)?.[1];
  if (type === "Video" || video) return `Watch the video: ${video ?? title ?? "lesson"}`;
  if (type === "Assessment") return title ? `Quiz: ${title}` : "Take the quiz";
  const ask = /^can you (.+)$/i.exec(d)?.[1];
  if (ask) return ask.charAt(0).toUpperCase() + ask.slice(1);
  return title || d || "Miacademy activity";
}

/**
 * Math and Language Arts PDFs are numbered ("LS4 2.13.1 Student PDF.pdf"): the
 * next lesson is the next number in the unit, or the first of the next unit.
 */
export function nextNumberedPdfs(pdf: string): string[] {
  const m = /^(.*[+ ])(\d+)\.(\d+)\.1([+ ]Student[+ ]PDF\.pdf)$/i.exec(pdf);
  if (!m) return [];
  const [, head, unit, lesson, tail] = m;
  return [`${head}${unit}.${Number(lesson) + 1}.1${tail}`, `${head}${Number(unit) + 1}.1.1${tail}`];
}

/** Miacademy's task id from a task link ("...&taskAssignment=%22<uuid>%22..."). */
export function taskKeyFromLink(link: string): string | null {
  const m = /[?&]taskAssignment=(?:%22|")?([0-9a-f-]{36})/i.exec(link);
  return m ? m[1].toLowerCase() : null;
}

/** "Forces: Gravity Student PDF" -> "Forces: Gravity". */
export function lessonTitleFromTask(title: string): string {
  return title
    .replace(/\s*Student PDF$/i, "")
    .replace(/:\s*Video Lesson$/i, "")
    .trim();
}
