import type { Course } from "../courses/types";
import type { CourseMedia } from "./types";
import { scienceMedia } from "./science";
import { historyMedia } from "./history";
import { writingMedia } from "./writing";
import { moneyMedia } from "./money";
import { entrepreneurshipMedia } from "./entrepreneurship";
import { leadershipMedia } from "./leadership";

export const MEDIA: Record<string, CourseMedia> = {
  science: scienceMedia,
  history: historyMedia,
  writing: writingMedia,
  money: moneyMedia,
  business: entrepreneurshipMedia,
  leadership: leadershipMedia,
};

/** Adds the slides and videos to a course's lessons. */
export function withMedia(course: Course): Course {
  const media = MEDIA[course.id];
  if (!media) return course;
  return {
    ...course,
    lessons: course.lessons.map((l) => {
      const m = media[l.id];
      if (!m) return l;
      return {
        ...l,
        hook: l.hook && m.hook ? { ...l.hook, ...m.hook } : l.hook,
        teach: l.teach?.map((s, i) => (m.teach?.[i] ? { ...s, ...m.teach[i] } : s)),
      };
    }),
  };
}
