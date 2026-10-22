import { MIA_SKIP_ITEMS, MIA_SUBJECT_MAP, miaLessonRules, type MiaCoursePlan } from "@/content/miacademy";
import { buildItems, lessonTitleFromTask, type LessonItem, type ParsedActivity } from "./miaLessons";

/**
 * The parent's Miacademy calendar (read by Focus Buddy's parent mode from
 * CalendarController/GetInitialWeeklyData) turned into each lesson's tasks.
 * Only marked (assigned) tasks are on that calendar; finished ones say so.
 * Pure functions only.
 */

export interface PlanTask {
  taskId: string;
  day: string;
  unitTitle: string;
  course: string;
  /** Our subject id (math, ela, sci, his), "vocab" for the Vocabulary class done first each day, or "" for subjects we don't time. */
  subject: string;
  lessonTitle: string;
  name: string;
  /** Miacademy's task type: Video, Pdf, Practice, Assessment, ... */
  type: string;
  status: string;
  pdfUrl: string | null;
  /** Order on the calendar (day, then the order Miacademy lists them). */
  order: number;
}

interface RawWeek {
  Days?: { Date?: string; UnitTasks?: { Unit?: string; TaskAssignments?: string[] }[] }[];
  UnitConversions?: { UnitId?: string; Subject?: string; Title?: string; CourseTitle?: string }[];
  TaskAssignmentConversions?: { TaskAssignmentId?: string; Name?: string; Type?: string; Status?: string; PreviewData?: { Url?: string; Title?: string } | null }[];
}

const PDF_URL = /^https:\/\/miaplaza-content\.s3[\w.-]*\.amazonaws\.com\/.+\.pdf$/i;

export function parsePlanWeek(raw: unknown): PlanTask[] {
  const week = (raw ?? {}) as RawWeek;
  const units = new Map((week.UnitConversions ?? []).map((u) => [u.UnitId ?? "", u]));
  const tasks = new Map((week.TaskAssignmentConversions ?? []).map((t) => [t.TaskAssignmentId ?? "", t]));
  const out: PlanTask[] = [];
  (week.Days ?? []).forEach((d, di) => {
    const day = typeof d.Date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d.Date) ? d.Date : null;
    if (!day) return;
    (d.UnitTasks ?? []).forEach((ut, ui) => {
      const unit = units.get(ut.Unit ?? "");
      (ut.TaskAssignments ?? []).forEach((id, ti) => {
        const t = tasks.get(id);
        if (!t || !unit) return;
        const name = String(t.Name ?? "");
        const url = String(t.PreviewData?.Url ?? "");
        out.push({
          taskId: String(id).toLowerCase(),
          day,
          unitTitle: String(unit.Title ?? ""),
          course: String(unit.CourseTitle ?? ""),
          subject: /vocabulary/i.test(String(unit.CourseTitle ?? "")) ? "vocab" : MIA_SUBJECT_MAP[String(unit.Subject ?? "")] ?? "",
          lessonTitle: String(t.PreviewData?.Title ?? "") || lessonTitleFromTask(name),
          name,
          type: String(t.Type ?? ""),
          status: String(t.Status ?? ""),
          pdfUrl: t.Type === "Pdf" && PDF_URL.test(url) ? url : null,
          order: di * 1_000_000 + ui * 1000 + ti,
        });
      });
    });
  });
  return out;
}

export interface PlanLesson {
  key: string;
  course: string;
  unitTitle: string;
  title: string;
  tasks: PlanTask[];
  /** The lesson's Student PDF, when it has one. */
  pdfUrl: string | null;
}

/** Groups a class's tasks into lessons, in calendar order. */
export function planLessons(tasks: PlanTask[]): PlanLesson[] {
  const byKey = new Map<string, PlanLesson>();
  for (const t of [...tasks].sort((a, b) => a.order - b.order)) {
    const key = `${t.course}|${t.unitTitle}|${t.lessonTitle}`;
    let l = byKey.get(key);
    if (!l) byKey.set(key, (l = { key, course: t.course, unitTitle: t.unitTitle, title: t.lessonTitle, tasks: [], pdfUrl: null }));
    l.tasks.push(t);
    if (!l.pdfUrl && t.pdfUrl) l.pdfUrl = t.pdfUrl;
  }
  return [...byKey.values()];
}

const practiceName = (name: string) => (/level/i.test(name) ? `Online practice: ${name.replace(/^practice\s*-?\s*/i, "")}` : `Online practice: ${name}`);

/**
 * A lesson's checklist from the calendar: Miacademy's online tasks (videos,
 * practice levels, quizzes) as their own items, keyed by task id, plus - for
 * classes with a packet - the guided notes and activities read off the PDF.
 * Which ones count follows the same rules as before (miaLessonRules / the class plan).
 */
export function planLessonItems(lesson: PlanLesson, subject: string, plan: MiaCoursePlan | null, pdf: ParsedActivity[] | null): LessonItem[] {
  const rules = miaLessonRules(subject, lesson.title, lesson.course);
  const items: LessonItem[] = [];
  const task = (t: PlanTask, title: string, check: LessonItem["check"]): LessonItem => ({ id: `task-${t.taskId}`, title, check, pages: [], supplies: [] });
  const skip = (name: string) => MIA_SKIP_ITEMS.some((re) => re.test(name));

  if (plan?.onlineOnly) {
    for (const t of lesson.tasks) {
      if (skip(t.name)) continue;
      if (t.type === "Pdf") {
        if (plan.readPdf) items.push(task(t, `${plan.readPdf}: ${lesson.title}`, "self"));
      } else if (t.type === "Video") items.push(task(t, `Watch the video: ${lessonTitleFromTask(t.name)}`, "online"));
      else if (t.type === "Practice") items.push(task(t, practiceName(t.name), "online"));
      else if (t.type === "Assessment") items.push(task(t, t.name || "Take the quiz", "online"));
      else items.push(task(t, t.name, "online"));
    }
    return items;
  }

  // The packet's own items: guided notes always, activities when the lesson uses the packet.
  const fromPdf = pdf ? buildItems(pdf, subject, lesson.title, lesson.course).filter((i) => i.check === "self" || i.check === "photo" || i.check === "parent") : [];
  let pdfPlaced = false;
  for (const t of lesson.tasks) {
    if (skip(t.name)) continue;
    if (t.type === "Video") items.push(task(t, "Watch the lesson video", "video"));
    else if (t.type === "Pdf") {
      if (!pdfPlaced) items.push(...fromPdf);
      pdfPlaced = true;
    } else if (t.type === "Practice") {
      // Everything on the calendar is marked: practice counts if the lesson's rules take marked practice.
      if (rules.practice || rules.practiceIfMarked) items.push(task(t, practiceName(t.name), "practice"));
    } else if (t.type === "Assessment") items.push(task(t, t.name || "Online quiz", "quiz"));
  }
  if (!pdfPlaced) items.push(...fromPdf);
  // Miacademy's order is PDF then video; the checklist does the video (and its notes) first.
  const video = items.findIndex((i) => i.check === "video");
  if (video > 0) items.unshift(...items.splice(video, 1));
  return items;
}
