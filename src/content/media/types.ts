import type { Beat, Video } from "../courses/types";

/** Slides and videos for one lesson: the hook, then each teaching part in order. */
export interface LessonMedia {
  hook?: { show?: Beat[]; watch?: Video };
  /** One entry per teaching part, in the same order as the lesson's `teach`. */
  teach?: ({ show?: Beat[]; watch?: Video } | null)[];
}

export type CourseMedia = Record<string, LessonMedia>;
