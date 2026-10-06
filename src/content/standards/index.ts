import type { Standard } from "./types";
import { mathKStandards } from "./math-k";
import { elaKStandards } from "./ela-k";
import { sciKStandards } from "./sci-k";
import { socKStandards } from "./soc-k";
import { spanKStandards } from "./span-k";
import { math1Standards } from "./math-1";
import { ela1Standards } from "./ela-1";
import { sci1Standards } from "./sci-1";
import { soc1Standards } from "./soc-1";
import { span1Standards } from "./span-1";
import { math2Standards } from "./math-2";
import { ela2Standards } from "./ela-2";
import { sci2Standards } from "./sci-2";
import { soc2Standards } from "./soc-2";
import { span2Standards } from "./span-2";
import { math3Standards } from "./math-3";
import { ela3Standards } from "./ela-3";
import { sci3Standards } from "./sci-3";
import { soc3Standards } from "./soc-3";
import { span3Standards } from "./span-3";
import { math4Standards } from "./math-4";
import { ela4Standards } from "./ela-4";
import { sci4Standards } from "./sci-4";
import { soc4Standards } from "./soc-4";
import { span4Standards } from "./span-4";
import { math5Standards } from "./math-5";
import { ela5Standards } from "./ela-5";
import { sci5Standards } from "./sci-5";
import { soc5Standards } from "./soc-5";
import { span5Standards } from "./span-5";

export type { Standard } from "./types";

/** Every K-5 standard, by course id ("math-k", "ela-3"...). */
export const STANDARDS: Record<string, Standard[]> = {
  "math-k": mathKStandards,
  "ela-k": elaKStandards,
  "sci-k": sciKStandards,
  "soc-k": socKStandards,
  "span-k": spanKStandards,
  "math-1": math1Standards,
  "ela-1": ela1Standards,
  "sci-1": sci1Standards,
  "soc-1": soc1Standards,
  "span-1": span1Standards,
  "math-2": math2Standards,
  "ela-2": ela2Standards,
  "sci-2": sci2Standards,
  "soc-2": soc2Standards,
  "span-2": span2Standards,
  "math-3": math3Standards,
  "ela-3": ela3Standards,
  "sci-3": sci3Standards,
  "soc-3": soc3Standards,
  "span-3": span3Standards,
  "math-4": math4Standards,
  "ela-4": ela4Standards,
  "sci-4": sci4Standards,
  "soc-4": soc4Standards,
  "span-4": span4Standards,
  "math-5": math5Standards,
  "ela-5": ela5Standards,
  "sci-5": sci5Standards,
  "soc-5": soc5Standards,
  "span-5": span5Standards,
};
