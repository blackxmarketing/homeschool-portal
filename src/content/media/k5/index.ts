import type { CourseMedia } from "../types";
import { mathKMedia } from "./math-k";
import { elaKMedia } from "./ela-k";
import { sciKMedia } from "./sci-k";
import { socKMedia } from "./soc-k";
import { spanKMedia } from "./span-k";
import { math1Media } from "./math-1";
import { ela1Media } from "./ela-1";
import { sci1Media } from "./sci-1";
import { soc1Media } from "./soc-1";
import { span1Media } from "./span-1";
import { math2Media } from "./math-2";
import { ela2Media } from "./ela-2";
import { sci2Media } from "./sci-2";
import { soc2Media } from "./soc-2";
import { span2Media } from "./span-2";
import { math3Media } from "./math-3";
import { ela3Media } from "./ela-3";
import { sci3Media } from "./sci-3";
import { soc3Media } from "./soc-3";
import { span3Media } from "./span-3";
import { math4Media } from "./math-4";
import { ela4Media } from "./ela-4";
import { sci4Media } from "./sci-4";
import { soc4Media } from "./soc-4";
import { span4Media } from "./span-4";
import { math5Media } from "./math-5";
import { ela5Media } from "./ela-5";
import { sci5Media } from "./sci-5";
import { soc5Media } from "./soc-5";
import { span5Media } from "./span-5";

const ALL: Record<string, CourseMedia> = {
  "math-k": mathKMedia,
  "ela-k": elaKMedia,
  "sci-k": sciKMedia,
  "soc-k": socKMedia,
  "span-k": spanKMedia,
  "math-1": math1Media,
  "ela-1": ela1Media,
  "sci-1": sci1Media,
  "soc-1": soc1Media,
  "span-1": span1Media,
  "math-2": math2Media,
  "ela-2": ela2Media,
  "sci-2": sci2Media,
  "soc-2": soc2Media,
  "span-2": span2Media,
  "math-3": math3Media,
  "ela-3": ela3Media,
  "sci-3": sci3Media,
  "soc-3": soc3Media,
  "span-3": span3Media,
  "math-4": math4Media,
  "ela-4": ela4Media,
  "sci-4": sci4Media,
  "soc-4": soc4Media,
  "span-4": span4Media,
  "math-5": math5Media,
  "ela-5": ela5Media,
  "sci-5": sci5Media,
  "soc-5": soc5Media,
  "span-5": span5Media,
};

/** Only courses that have slides yet. */
export const K5_MEDIA: Record<string, CourseMedia> = Object.fromEntries(Object.entries(ALL).filter(([, m]) => Object.keys(m).length > 0));
