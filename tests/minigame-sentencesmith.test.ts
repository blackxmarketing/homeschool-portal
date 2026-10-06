import { describe, expect, it } from "vitest";
import {
  SMITH_LEVELS,
  answerText,
  bankFor,
  checkTry,
  cleanMoves,
  isPunct,
  joinTiles,
  levelById,
  parseSentence,
  perfectMoves,
  replay,
  solveRound,
  starsFor,
  sentenceSmith,
  type Try,
} from "@/lib/minigames/sentencesmith";

const lower = (s: string) => s.toLowerCase();

describe("Sentence Smith levels", () => {
  it("has 3 levels for each of grades 1, 2 and 3 with unique ids that name the grade", () => {
    expect(new Set(SMITH_LEVELS.map((l) => l.id)).size).toBe(SMITH_LEVELS.length);
    expect(sentenceSmith.grades).toEqual([1, 2, 3]);
    for (const g of [1, 2, 3]) {
      const ls = sentenceSmith.levelsForGrade!(g);
      expect(ls).toHaveLength(3);
      for (const l of ls) expect(l.id.startsWith(`g${g}-`)).toBe(true);
    }
    expect(sentenceSmith.levelsForGrade!(0)).toEqual([]);
    expect(sentenceSmith.levelsForGrade!(4)).toEqual([]);
    expect(sentenceSmith.levels("sprout")).toEqual([]);
  });

  it("levels have 6-8 rounds, name a standard, and grade 3 has the most rounds", () => {
    for (const l of SMITH_LEVELS) {
      expect(l.rounds.length, l.id).toBeGreaterThanOrEqual(6);
      expect(l.rounds.length, l.id).toBeLessThanOrEqual(8);
      expect(l.intro).toMatch(new RegExp(`L\\.${l.grade}\\.\\d`));
      for (const r of l.rounds) {
        expect(r.rule.length).toBeGreaterThan(10);
        expect(r.show.length).toBeGreaterThan(5);
        expect(r.say.length).toBeGreaterThan(5);
      }
    }
    for (const l of sentenceSmith.levelsForGrade!(3)) expect(SMITH_LEVELS.find((x) => x.id === l.id)!.rounds.length).toBe(7);
  });

  it("sentences round-trip through tiles, and alternates use the same words", () => {
    for (const l of SMITH_LEVELS)
      for (const r of l.rounds) {
        const text = answerText(r);
        const p = parseSentence(text);
        expect(joinTiles(p.tiles) + p.end + p.close).toBe(text);
        const words = (a: string[]) => a.filter((w) => !isPunct(w)).map(lower).sort().join(" ");
        for (const a of r.answers.slice(1)) expect(words(a), text).toBe(words(r.answers[0]));
        // A wrong-form tile is never one of the sentence's own words.
        for (const e of Object.keys(r.extras)) {
          expect(r.answers[0].map(lower)).not.toContain(e);
          expect(r.extras[e].length).toBeGreaterThan(10);
        }
      }
  });

  it("banks are seeded, hold every tile in lowercase, and never start in order", () => {
    for (const l of SMITH_LEVELS)
      l.rounds.forEach((r, i) => {
        const b = bankFor(l, i);
        expect(bankFor(l, i)).toEqual(b);
        expect([...b].sort()).toEqual([...r.answers[0].map(lower), ...Object.keys(r.extras)].sort());
        expect(b.slice(0, r.answers[0].length).join(" ")).not.toBe(r.answers[0].map(lower).join(" "));
      });
  });

  it("every alternate sentence is accepted", () => {
    for (const l of SMITH_LEVELS)
      l.rounds.forEach((r, i) => {
        const bank = bankFor(l, i);
        for (const a of r.answers) {
          const used = new Set<number>();
          const t: Try = { o: [], c: [], e: r.end };
          for (const w of a) {
            const k = bank.findIndex((b, j) => !used.has(j) && b === lower(w));
            expect(k, `${l.id} ${w}`).toBeGreaterThanOrEqual(0);
            used.add(k);
            t.o.push(k);
            if (w !== lower(w)) t.c.push(k);
          }
          expect(checkTry(l, i, t).ok, `${l.id} ${joinTiles(a)}`).toBe(true);
        }
      });
  });
});

describe("Sentence Smith feedback", () => {
  const g1 = levelById("g1-1")!;
  const solved = (lvl = g1, i = 0) => solveRound(lvl, i);

  it("names the capital rule when the first word has no capital", () => {
    const t = solved();
    const c = checkTry(g1, 0, { ...t, c: [] });
    expect(c.ok).toBe(false);
    expect(c.step).toBe("caps");
    expect(c.note).toMatch(/starts with a capital/);
  });

  it("names the end-mark rule", () => {
    const t = solved();
    expect(checkTry(g1, 0, { ...t, e: "?" }).note).toMatch(/period/);
    const ask = levelById("g1-3")!;
    const q = solveRound(ask, 0);
    const c = checkTry(ask, 0, { ...q, e: "." });
    expect(c.step).toBe("end");
    expect(c.note).toMatch(/question mark/);
    expect(checkTry(ask, 0, { ...q, e: "" }).note).toMatch(/end mark/);
  });

  it("names the I and name rules", () => {
    const lvl = levelById("g1-2")!;
    const t = solveRound(lvl, 1); // Mia and I feed the ducks.
    const bank = bankFor(lvl, 1);
    const iIdx = t.o.find((k) => bank[k] === "i")!;
    expect(checkTry(lvl, 1, { ...t, c: t.c.filter((k) => k !== iIdx) }).note).toMatch(/word I/);
    const miaIdx = t.o.find((k) => bank[k] === "mia")!;
    expect(checkTry(lvl, 1, { ...t, c: t.c.filter((k) => k !== miaIdx) }).note).toMatch(/capital/);
    const duckIdx = t.o.find((k) => bank[k] === "ducks")!;
    expect(checkTry(lvl, 1, { ...t, c: [...t.c, duckIdx] }).note).toMatch(/doesn't need a capital/);
  });

  it("explains a wrong form tile", () => {
    const lvl = levelById("g2-1")!;
    const t = solveRound(lvl, 0); // The children fed the hens.
    const bank = bankFor(lvl, 0);
    const swap = t.o.map((k) => (bank[k] === "children" ? bank.indexOf("childs") : k));
    const c = checkTry(lvl, 0, { ...t, o: swap });
    expect(c.step).toBe("words");
    expect(c.note).toMatch(/children/);
  });

  it("explains word order, missing words and commas", () => {
    const t = solved();
    const c = checkTry(g1, 0, { ...t, o: [...t.o].reverse() });
    expect(c.ok).toBe(false);
    expect(c.step).toBe("words");
    expect(checkTry(g1, 0, { ...t, o: t.o.slice(0, -1) }).note).toMatch(/missing/);

    const lvl = levelById("g2-3")!;
    const s = solveRound(lvl, 0); // The sun came out, so we went outside.
    const bank = bankFor(lvl, 0);
    const noComma = s.o.filter((k) => bank[k] !== ",");
    expect(checkTry(lvl, 0, { ...s, o: noComma }).note).toMatch(/comma/);

    const q = levelById("g3-3")!;
    const d = solveRound(q, 1); // Mom said, “Please feed the dog.”
    const qb = bankFor(q, 1);
    expect(checkTry(q, 1, { ...d, o: d.o.filter((k) => qb[k] !== "“") }).note).toMatch(/quotation/);
    const pleaseIdx = d.o.find((k) => qb[k] === "please")!;
    expect(checkTry(q, 1, { ...d, c: d.c.filter((k) => k !== pleaseIdx) }).note).toMatch(/inside quotation marks/);
  });
});

describe("Sentence Smith scoring", () => {
  it("every level can reach 3 stars", () => {
    for (const l of SMITH_LEVELS) {
      const r = replay(l, perfectMoves(l));
      expect(r.total, l.id).toBe(r.max);
      expect(r.stars, l.id).toBe(3);
      expect(sentenceSmith.score(l.id, perfectMoves(l))).toEqual({ stars: 3, best: r.max });
    }
  });

  it("replays are deterministic and survive JSON", () => {
    for (const l of SMITH_LEVELS) {
      const moves = JSON.parse(JSON.stringify(perfectMoves(l)));
      expect(sentenceSmith.score(l.id, moves)).toEqual(sentenceSmith.score(l.id, moves));
    }
  });

  it("a fix on the second try earns 1 point, so stars reward first tries", () => {
    const l = levelById("g1-1")!;
    const moves = perfectMoves(l).map((tries) => [{ ...tries[0], e: "?" }, tries[0]]);
    const r = replay(l, moves);
    expect(r.points.every((p) => p === 1)).toBe(true);
    expect(r.stars).toBe(starsFor(6, 12));
    expect(r.stars).toBe(2);
    // One slip still earns 3 stars.
    const one = perfectMoves(l);
    one[0] = [{ ...one[0][0], c: [] }, one[0][0]];
    expect(replay(l, one).stars).toBe(3);
  });

  it("star thresholds", () => {
    expect(starsFor(0, 12)).toBe(0);
    expect(starsFor(12, 12)).toBe(3);
    expect(starsFor(11, 12)).toBe(3);
    expect(starsFor(10, 12)).toBe(2);
    expect(starsFor(6, 12)).toBe(2);
    expect(starsFor(5, 12)).toBe(1);
    expect(starsFor(3, 12)).toBe(1);
    expect(starsFor(1, 12)).toBe(0);
  });

  it("garbage moves score 0 without throwing", () => {
    const junk: unknown[] = [
      null,
      undefined,
      42,
      "moves",
      {},
      [null, 3, "x"],
      [[{ o: "abc", c: null, e: 7 }]],
      [[{ o: [0, 0, 0, 0], c: [0], e: "." }]],
      [[{ o: [-1, 999, 1.5, NaN], c: [1e9], e: "!!" }]],
      [[{ o: Array.from({ length: 1000 }, (_, i) => i), c: [], e: "." }]],
      Array.from({ length: 500 }, () => [[]]),
    ];
    for (const l of SMITH_LEVELS)
      for (const m of junk) {
        expect(() => sentenceSmith.score(l.id, m)).not.toThrow();
        expect(sentenceSmith.score(l.id, m)).toEqual({ stars: 0, best: 0 });
      }
    expect(cleanMoves(SMITH_LEVELS[0], [[{ o: [1, 1], c: [], e: "." }]])[0][0].o).toEqual([]);
  });

  it("unknown levels return null", () => {
    expect(sentenceSmith.score("nope", [])).toBeNull();
    expect(sentenceSmith.score("k-1", perfectMoves(SMITH_LEVELS[0]))).toBeNull();
    expect(levelById(5)).toBeUndefined();
  });
});
