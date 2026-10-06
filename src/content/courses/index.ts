import type { Course } from "./types";
import { science } from "./science";
import { history } from "./history";
import { writing } from "./writing";
import { money } from "./money";
import { entrepreneurship } from "./entrepreneurship";
import { leadership } from "./leadership";
import { science45 } from "./science-45";
import { scienceHs } from "./science-hs";
import { history45 } from "./history-45";
import { historyHs } from "./history-hs";
import { writing45 } from "./writing-45";
import { writingHs } from "./writing-hs";
import { money45 } from "./money-45";
import { moneyHs } from "./money-hs";
import { business45 } from "./business-45";
import { businessHs } from "./business-hs";
import { leadership45 } from "./leadership-45";
import { leadershipHs } from "./leadership-hs";
import { K5_COURSES } from "./k5";
import { withMedia } from "../media";

/** Default courses. Parents can edit these on the Content page. */
export const COURSES: Course[] = [
  // Grades 6-8
  writing, science, history, money, entrepreneurship, leadership,
  // Grades 4-5
  science45, history45, writing45, money45, business45, leadership45,
  // Grades 9-12
  scienceHs, historyHs, writingHs, moneyHs, businessHs, leadershipHs,
  // Grades K-5 (explore worlds)
  ...K5_COURSES,
].map(withMedia);

export type { Course, Lesson, CheckQuestion, Task, TaskKind, Stage } from "./types";
