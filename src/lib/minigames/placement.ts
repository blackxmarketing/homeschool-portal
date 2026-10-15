import { placementQuestions, publicPlacement, placeFrom as placeChompers } from "./chompers";
import { placementWords, placeFrom as placeSpelling } from "./spellrush";

/**
 * The sit-down check that places an older kid part way up a drill ladder.
 *
 * Each game owns its own questions - squares that fit a rule in Number
 * Chompers, words to spell in XP Rush: Spelling - so this is the one place
 * that knows which game asks what. The page and the scoring route both come
 * through here rather than importing one game's questions and using them for
 * every game, which is what they used to do.
 */

export type PlacementKind = "cells" | "spell";

export type PlacementAsk =
  | { kind: "cells"; questions: ReturnType<typeof publicPlacement> }
  | { kind: "spell"; questions: ReturnType<typeof placementWords> };

/** What to ask this game's placement, with anything that gives the answer away taken out. */
export function placementFor(game: string, seed: number): PlacementAsk | null {
  if (game === "chompers") return { kind: "cells", questions: publicPlacement(placementQuestions(seed)) };
  if (game === "spellrush") return { kind: "spell", questions: placementWords(seed) };
  return null;
}

/** Mark a finished placement. The answers are only ever marked here, on the server. */
export function placeFor(game: string, seed: number, picks: unknown): { rung: number; title: string; right: number; asked: number } | null {
  if (game === "chompers") {
    const rows = Array.isArray(picks)
      ? picks.slice(0, 20).map((row) => (Array.isArray(row) ? row.slice(0, 12).map((v) => Math.trunc(Number(v))).filter((v) => Number.isFinite(v)) : []))
      : [];
    return placeChompers(seed, rows);
  }
  if (game === "spellrush") {
    const said = Array.isArray(picks) ? picks.slice(0, 20).map((v) => String(v ?? "").slice(0, 40)) : [];
    return placeSpelling(seed, said);
  }
  return null;
}
