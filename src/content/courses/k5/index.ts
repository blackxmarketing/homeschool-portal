import type { Course } from "../types";
import { mathK } from "./math-k";
import { elaK } from "./ela-k";
import { sciK } from "./sci-k";
import { socK } from "./soc-k";
import { spanK } from "./span-k";
import { math1 } from "./math-1";
import { ela1 } from "./ela-1";
import { sci1 } from "./sci-1";
import { soc1 } from "./soc-1";
import { span1 } from "./span-1";
import { math2 } from "./math-2";
import { ela2 } from "./ela-2";
import { sci2 } from "./sci-2";
import { soc2 } from "./soc-2";
import { span2 } from "./span-2";
import { math3 } from "./math-3";
import { ela3 } from "./ela-3";
import { sci3 } from "./sci-3";
import { soc3 } from "./soc-3";
import { span3 } from "./span-3";
import { math4 } from "./math-4";
import { ela4 } from "./ela-4";
import { sci4 } from "./sci-4";
import { soc4 } from "./soc-4";
import { span4 } from "./span-4";
import { math5 } from "./math-5";
import { ela5 } from "./ela-5";
import { sci5 } from "./sci-5";
import { soc5 } from "./soc-5";
import { span5 } from "./span-5";

/** Grades K-5, by grade then subject. Courses still being written (no lessons yet) are left out. */
export const K5_COURSES: Course[] = [
  mathK, elaK, sciK, socK, spanK,
  math1, ela1, sci1, soc1, span1,
  math2, ela2, sci2, soc2, span2,
  math3, ela3, sci3, soc3, span3,
  math4, ela4, sci4, soc4, span4,
  math5, ela5, sci5, soc5, span5,
].filter((c) => c.lessons.length > 0);
