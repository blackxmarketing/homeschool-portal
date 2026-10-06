import { describe, expect, it } from "vitest";
import {
  WORD_LEVELS,
  bankFor,
  hintFor,
  isRight,
  levelById,
  needed,
  perfectMoves,
  replay,
  starsFor,
  wordBuilder,
} from "@/lib/minigames/wordbuilder";

describe("Word Builder levels", () => {
  it("has 3 levels for each of grades K, 1 and 2 with unique ids that name the grade", () => {
    expect(new Set(WORD_LEVELS.map((l) => l.id)).size).toBe(WORD_LEVELS.length);
    for (const g of [0, 1, 2]) {
      const ls = wordBuilder.levelsForGrade!(g);
      expect(ls).toHaveLength(3);
      for (const l of ls) expect(l.id.startsWith(g === 0 ? "k-" : `g${g}-`)).toBe(true);
    }
    expect(wordBuilder.levelsForGrade!(3)).toEqual([]);
    expect(wordBuilder.grades).toEqual([0, 1, 2]);
  });

  it("every round is 5-8 rounds long, spells its word, and names a standard in the intro", () => {
    for (const l of WORD_LEVELS) {
      expect(l.rounds.length, l.id).toBeGreaterThanOrEqual(5);
      expect(l.rounds.length, l.id).toBeLessThanOrEqual(8);
      expect(l.intro).toMatch(/RF\.[K12]\.\d/);
      for (const r of l.rounds) {
        expect(r.parts.join(""), `${l.id} ${r.word}`).toBe(r.word);
        expect(r.extras.length).toBeGreaterThanOrEqual(2);
        expect(r.tip.length).toBeGreaterThan(10);
        expect(r.emoji).toBeTruthy();
        // No extra tile can stand in for the word's own tile in the same slot.
        for (const e of r.extras) expect(needed(l, r)).not.toContain(e);
      }
    }
  });

  it("banks are seeded: the same every time, with every needed tile", () => {
    for (const l of WORD_LEVELS)
      l.rounds.forEach((r, i) => {
        const b = bankFor(l, i);
        expect(bankFor(l, i)).toEqual(b);
        expect(b).toHaveLength(needed(l, r).length + r.extras.length);
        expect([...b].sort()).toEqual([...needed(l, r), ...r.extras].sort());
      });
  });

  it("hints never throw and reveal the spelling on the second wrong try", () => {
    for (const l of WORD_LEVELS)
      l.rounds.forEach((r, i) => {
        const h1 = hintFor(l, i, [], 1);
        expect(h1.note.length).toBeGreaterThan(5);
        const h2 = hintFor(l, i, ["?"], 2);
        expect(h2.note).toContain(needed(l, r)[0]);
      });
    expect(hintFor(WORD_LEVELS[0], 99, [], 1).note).toBe("");
  });
});

describe("Word Builder scoring", () => {
  it("every level reaches 3 stars with the right tiles on the first try", () => {
    for (const l of WORD_LEVELS) {
      const r = replay(l, perfectMoves(l));
      expect(r.stars, l.id).toBe(3);
      expect(r.total).toBe(l.rounds.length * 2);
      expect(wordBuilder.score(l.id, perfectMoves(l))).toEqual({ stars: 3, best: l.rounds.length * 2 });
    }
  });

  it("replays are deterministic", () => {
    const l = levelById("g1-2")!;
    const m = perfectMoves(l);
    expect(wordBuilder.score(l.id, m)).toEqual(wordBuilder.score(l.id, JSON.parse(JSON.stringify(m))));
  });

  it("a wrong first try, then right, earns 1 point for that round", () => {
    const l = levelById("k-2")!;
    const m = perfectMoves(l);
    const right = m[0][0];
    const wrongTry = [...right].reverse();
    expect(isRight(l, 0, wrongTry)).toBe(false);
    m[0] = [wrongTry, right];
    const r = replay(l, m);
    expect(r.points[0]).toBe(1);
    expect(r.total).toBe(l.rounds.length * 2 - 1);
    // One slip still earns 3 stars (12 rounds points, 11 needed); two slips do not.
    expect(r.stars).toBe(3);
    m[1] = [[...m[1][0]].reverse(), m[1][0]];
    expect(replay(l, m).stars).toBe(2);
  });

  it("rejects repeated tiles and out-of-range indexes", () => {
    const l = levelById("k-3")!;
    expect(isRight(l, 0, [0, 0, 0])).toBe(false);
    expect(isRight(l, 0, [99, 1, 2])).toBe(false);
    expect(isRight(l, 0, [0.5, 1, 2])).toBe(false);
  });

  it("garbage moves score 0 without throwing", () => {
    for (const junk of [null, undefined, 42, "abc", {}, [null], [[null]], [[["x"]]], [[[1e9, -1]]], Array(500).fill([[49, 48, 47]])]) {
      for (const l of WORD_LEVELS) {
        const s = wordBuilder.score(l.id, junk);
        expect(s).not.toBeNull();
        expect(s!.stars).toBe(0);
      }
    }
  });

  it("unknown levels return null", () => {
    expect(wordBuilder.score("nope", [])).toBeNull();
    expect(wordBuilder.score("s1", perfectMoves(WORD_LEVELS[0]))).toBeNull();
  });

  it("stars follow the rules", () => {
    expect(starsFor(12, 12)).toBe(3);
    expect(starsFor(11, 12)).toBe(3);
    expect(starsFor(10, 12)).toBe(2);
    expect(starsFor(8, 12)).toBe(2);
    expect(starsFor(4, 12)).toBe(1);
    expect(starsFor(3, 12)).toBe(0);
    expect(starsFor(0, 0)).toBe(0);
  });
});
