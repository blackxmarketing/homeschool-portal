import { readLessonPdf } from "./ai";
import { MIA_SUBJECT_MAP } from "@/content/miacademy";
import { buildItems } from "./miaLessons";
import { addParentAlert, getKid, miaChecklist, miaLesson, miaSetParseState, type MiaChecklist, type MiaPathCourse } from "./store";
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
      const parsed = await readLessonPdf(lesson.studentPdf!);
      const items = parsed ? buildItems(parsed.activities) : [];
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
    });
  }
  return out;
}

/** Each subject's checklist (null when the parent hasn't turned one on). */
export function miaChecklists(kidId: number): Record<string, MiaChecklist | null> {
  return Object.fromEntries(MIA_SUBJECTS.map((s) => [s.id, miaChecklist(kidId, s.id)]));
}
