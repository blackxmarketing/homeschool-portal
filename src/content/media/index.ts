import type { Course } from "../courses/types";
import type { CourseMedia } from "./types";
import { scienceMedia } from "./science";
import { historyMedia } from "./history";
import { writingMedia } from "./writing";
import { moneyMedia } from "./money";
import { entrepreneurshipMedia } from "./entrepreneurship";
import { leadershipMedia } from "./leadership";
import { science45Media } from "./science-45";
import { scienceHsMedia } from "./science-hs";
import { history45Media } from "./history-45";
import { historyHsMedia } from "./history-hs";
import { writing45Media } from "./writing-45";
import { writingHsMedia } from "./writing-hs";
import { money45Media } from "./money-45";
import { moneyHsMedia } from "./money-hs";
import { business45Media } from "./business-45";
import { businessHsMedia } from "./business-hs";
import { leadership45Media } from "./leadership-45";
import { leadershipHsMedia } from "./leadership-hs";
import { K5_MEDIA } from "./k5";

export const MEDIA: Record<string, CourseMedia> = {
  science: scienceMedia,
  history: historyMedia,
  writing: writingMedia,
  money: moneyMedia,
  business: entrepreneurshipMedia,
  leadership: leadershipMedia,
  "science-45": science45Media,
  "science-hs": scienceHsMedia,
  "history-45": history45Media,
  "history-hs": historyHsMedia,
  "writing-45": writing45Media,
  "writing-hs": writingHsMedia,
  "money-45": money45Media,
  "money-hs": moneyHsMedia,
  "business-45": business45Media,
  "business-hs": businessHsMedia,
  "leadership-45": leadership45Media,
  "leadership-hs": leadershipHsMedia,
  ...K5_MEDIA,
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
