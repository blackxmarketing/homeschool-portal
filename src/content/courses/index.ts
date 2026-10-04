import type { Course } from "./types";
import { science } from "./science";
import { history } from "./history";
import { writing } from "./writing";
import { money } from "./money";
import { entrepreneurship } from "./entrepreneurship";
import { leadership } from "./leadership";

/** Default courses. Parents can edit these on the Content page. */
export const COURSES: Course[] = [writing, science, history, money, entrepreneurship, leadership];

export type { Course, Lesson, CheckQuestion, Task, TaskKind, Stage } from "./types";
