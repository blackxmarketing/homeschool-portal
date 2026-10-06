/**
 * One learning standard for grades K-5 (docs/WORLDS.md).
 * - math: Common Core, e.g. "K.CC.A.1", "3.NF.A.2"
 * - ela: Common Core, e.g. "RF.K.2", "RL.3.2", "W.1.3", "L.2.1"
 * - sci: NGSS performance expectations, e.g. "K-PS2-1", "3-LS4-3", "K-2-ETS1-1"
 * - soc: C3 Framework indicators plus common state topics, e.g. "D2.Civ.1.K-2", "D2.Geo.2.3-5"
 * - span: ACTFL World-Readiness Standards, e.g. "ACTFL.1.1" (interpersonal), "ACTFL.1.2", "ACTFL.1.3", "ACTFL.2.1"
 */
export interface Standard {
  code: string;
  /** What a kid can do, in plain words. */
  text: string;
  /** The grade-specific standards (math, ELA, science) must all be taught; the others are a guide. */
  required: boolean;
}
