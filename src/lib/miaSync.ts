import { readLessonPdf } from "./ai";
import { MIA_SUBJECT_MAP, miaCoursePlan } from "@/content/miacademy";
import { buildItems, nextNumberedPdfs, taskKeyFromLink } from "./miaLessons";
import {
  addParentAlert,
  getKid,
  miaChecklist,
  miaClearStudentPdf,
  miaLesson,
  miaSetBigLesson,
  miaSetParseState,
  miaSetPdfParsed,
  miaBank,
  miaRings,
  type MiaChecklist,
  type MiaPathCourse,
} from "./store";
import { MIA_SUBJECTS } from "@/content/miacademy";

/**
 * Glue between Miacademy's pages (as the Chrome extension sends them) and the
 * checklist: turns Miacademy's data into our shape, and has Claude read each
 * new lesson's Student PDF in the background.
 */

const reading = new Set<number>();

/** Reads a lesson's Student PDF into checklist items (once; a failed read can be retried). */
export function readLessonInBackground(kidId: number, lessonId: number): void {
  if (reading.has(lessonId)) return;
  const lesson = miaLesson(kidId, lessonId);
  if (!lesson?.studentPdf || lesson.parseState === "ready") return;
  reading.add(lessonId);
  miaSetParseState(lessonId, "reading");
  void (async () => {
    try {
      // Level E (Revised): also look at the next lesson's PDF, to spot the lesson before a unit assessment.
      const plan = miaCoursePlan(lesson.subject, lesson.course);
      const nextPdf = plan?.bigLessonBeforeUnitTest ? nextNumberedPdfs(lesson.studentPdf!)[0] : undefined;
      const next = nextPdf && (await exists(nextPdf)) ? nextPdf : undefined;
      const parsed = await readLessonPdf(lesson.studentPdf!, next);
      // A guessed PDF has to be this lesson's; if not, wait for the real link (when the kid opens the lesson).
      // (Lessons from the parent's calendar have Miacademy's own link, so no check is needed.)
      if (parsed && !lesson.miaKey.startsWith("plan:") && !sameLesson(parsed.lessonTitle, lesson.title, lesson.course)) {
        miaClearStudentPdf(lessonId);
        return;
      }
      if (parsed?.nextIsUnitAssessment) miaSetBigLesson(lessonId, 2);
      if (parsed) miaSetPdfParsed(lessonId, parsed.activities);
      const items = parsed ? buildItems(parsed.activities, lesson.subject, lesson.title, lesson.course) : [];
      miaSetParseState(lessonId, items.length ? "ready" : "failed", items.length ? items : undefined);
      if (!items.length) {
        const kid = getKid(kidId);
        if (kid) addParentAlert(kid.family_id, kidId, "pdf", lesson.subject, `Couldn't read the checklist in ${kid.name}'s ${lesson.title} PDF. Their checklist will wait until it can.`);
      }
    } catch (e) {
      console.warn("Reading a Miacademy lesson PDF failed", e);
      miaSetParseState(lessonId, "failed");
    } finally {
      reading.delete(lessonId);
    }
  })();
}

async function exists(url: string): Promise<boolean> {
  try {
    return (await fetch(url, { method: "HEAD" })).ok;
  } catch {
    return false;
  }
}

/** Does a PDF's printed title belong to the lesson Miacademy shows? (Loose: punctuation and short words don't matter.) */
export function sameLesson(pdfTitle: string, lessonTitle: string, courseTitle = ""): boolean {
  const words = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);
  const a = words(pdfTitle);
  const b = words(lessonTitle);
  // Nothing to compare (the lesson is only known by its course name so far): trust the PDF.
  if (!a.length || !b.length || lessonTitle === courseTitle) return true;
  const shared = b.filter((w) => a.includes(w)).length;
  return shared >= Math.ceil(Math.min(a.length, b.length) / 2);
}

/** One entry of Miacademy's LearningPathController/BatchConvertAssignedCourses answer. */
interface RawPathCourse {
  Title?: unknown;
  LearningPathTask?: { TaskType?: unknown; ThumbnailTitle?: unknown; Description?: unknown; Link?: unknown; Thumbnail?: { OriginalUrl?: unknown } } | null;
}

/** Miacademy's lesson id from a task link like "/Content.Lesson/page?lesson=%22b208...%22&...". */
export function lessonKeyFromLink(link: string): string | null {
  const m = /[?&]lesson=(?:%22|")?([0-9a-f-]{36})/i.exec(link);
  return m ? m[1].toLowerCase() : null;
}

export function parsePathCourses(raw: unknown): MiaPathCourse[] {
  if (!Array.isArray(raw)) return [];
  const out: MiaPathCourse[] = [];
  for (const c of raw as RawPathCourse[]) {
    const t = c?.LearningPathTask;
    const str = (v: unknown) => (typeof v === "string" ? v : null);
    // The subject is in the task's background picture: ".../lessons/backgrounds/Science.svg".
    const bg = /backgrounds\/(\w+)\.svg/i.exec(str(t?.Thumbnail?.OriginalUrl) ?? "")?.[1] ?? "";
    const subject = MIA_SUBJECT_MAP[bg];
    if (!subject) continue;
    const video = /video:\s*(.+?)\?*$/i.exec(str(t?.Description) ?? "")?.[1] ?? null;
    out.push({
      subject,
      courseTitle: str(c.Title) ?? "",
      taskType: str(t?.TaskType),
      taskTitle: str(t?.ThumbnailTitle) ?? video,
      lessonKey: lessonKeyFromLink(str(t?.Link) ?? ""),
      taskKey: taskKeyFromLink(str(t?.Link) ?? ""),
      taskDescription: str(t?.Description),
    });
  }
  return out;
}

/** Each subject's checklist (null when the parent hasn't turned one on). Starts reading any Student PDF it still needs. */
export function miaChecklists(kidId: number): Record<string, MiaChecklist | null> {
  const all = Object.fromEntries(MIA_SUBJECTS.map((s) => [s.id, miaChecklist(kidId, s.id)]));
  for (const c of Object.values(all)) for (const part of c?.parts ?? []) for (const id of part.toRead) readLessonInBackground(kidId, id);
  return all;
}

/** Everything the strip shows besides the timers: the checklists, the six weekly rings and the buddy bank. */
export function miaBoard(kidId: number) {
  const checklists = miaChecklists(kidId);
  return { checklists, rings: miaRings(kidId), bank: miaBank(kidId) };
}
