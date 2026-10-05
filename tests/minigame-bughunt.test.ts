import { describe, expect, it } from "vitest";
import { accepts, BUGHUNT_LEVELS, bugHunt, levelById, normalize, parse, replay, solution, starsFor, type BugLevel } from "@/lib/minigames/bughunt";

const all = Object.values(BUGHUNT_LEVELS).flat();
const firstCorrectWord = (level: BugLevel) => parse(level).tokens.findIndex((t) => t.bug < 0);

describe("Bug Hunt levels", () => {
  it("has 3 levels per band with the right number of bugs", () => {
    const ranges = { sprout: [3, 4], adventurer: [5, 6], strategist: [6, 8] } as const;
    for (const [band, levels] of Object.entries(BUGHUNT_LEVELS)) {
      expect(levels).toHaveLength(3);
      const [lo, hi] = ranges[band as keyof typeof ranges];
      for (const l of levels) {
        const n = parse(l).bugs.length;
        expect(n, l.id).toBeGreaterThanOrEqual(lo);
        expect(n, l.id).toBeLessThanOrEqual(hi);
      }
      // Getting harder: never fewer bugs than the level before.
      for (let i = 1; i < levels.length; i++) expect(parse(levels[i]).bugs.length).toBeGreaterThanOrEqual(parse(levels[i - 1]).bugs.length);
    }
  });

  it("parses cleanly: unique ids, no stray markup, every bug has a rule and fixes", () => {
    expect(new Set(all.map((l) => l.id)).size).toBe(all.length);
    for (const l of all) {
      const p = parse(l);
      for (const t of p.tokens) expect(t.text, l.id).not.toMatch(/[[\]|#]/);
      for (const b of p.bugs) {
        expect(b.accept.length, `${l.id} ${b.wrong}`).toBeGreaterThan(0);
        expect(b.rule).toBeTruthy();
        expect(accepts(b, b.wrong), `${l.id}: "${b.wrong}" should not fix itself`).toBe(false);
        for (const a of b.accept) expect(accepts(b, a)).toBe(true);
        expect(b.end).toBeGreaterThan(b.start);
      }
    }
  });

  it("is listed through the MiniGame interface", () => {
    expect(bugHunt?.id).toBe("bughunt");
    expect(bugHunt?.levels("sprout").map((l) => l.id)).toEqual(["bh-s1", "bh-s2", "bh-s3"]);
    expect(bugHunt?.score("nope", [])).toBeNull();
  });
});

describe("Bug Hunt scoring", () => {
  it("every level can reach 3 stars with the known fixes", () => {
    for (const l of all) {
      const r = replay(l, solution(l));
      expect(r.stars, l.id).toBe(3);
      expect(r.found).toBe(parse(l).bugs.length);
      expect(bugHunt!.score(l.id, solution(l))).toEqual({ stars: 3, best: r.found * 10 + l.nets });
    }
  });

  it("every alternate fix works too, typed sloppily", () => {
    for (const l of all) {
      const p = parse(l);
      const moves = p.bugs.map((b) => ({ wordIndex: b.end - 1, fix: `  ${b.accept[b.accept.length - 1].replace(/'/g, "’")}  ` }));
      expect(replay(l, moves).stars, l.id).toBe(3);
    }
  });

  it("is case-insensitive except for capital-letter bugs", () => {
    const l = levelById("bh-s1")!;
    const p = parse(l);
    const cap = p.bugs.find((b) => b.rule === "cap")!;
    expect(cap.caseMatters).toBe(true);
    expect(accepts(cap, "he")).toBe(false);
    expect(accepts(cap, "He")).toBe(true);
    const too = p.bugs.find((b) => b.rule === "to")!;
    expect(accepts(too, "TOO")).toBe(true);
    expect(normalize("rocks ;")).toBe("rocks;");
  });

  it("replays are deterministic", () => {
    const l = levelById("bh-a3")!;
    const moves = [{ wordIndex: 0, fix: "Each" }, ...solution(l).slice(0, 3), { wordIndex: 5, fix: "x" }, ...solution(l).slice(3)];
    expect(replay(l, moves)).toEqual(replay(l, moves));
    expect(bugHunt!.score(l.id, moves)).toEqual(bugHunt!.score(l.id, moves));
  });

  it("garbage moves score 0 and never throw", () => {
    const l = levelById("bh-h2")!;
    const junk: unknown[] = [null, undefined, 42, "moves", {}, { wordIndex: -1, fix: "x" }, { wordIndex: 9999, fix: "x" }, { wordIndex: 1.5, fix: "x" }, { wordIndex: "3", fix: "x" }, { wordIndex: 2, fix: 7 }, { wordIndex: 2, fix: "a".repeat(5000) }, [1, 2]];
    for (const moves of [null, undefined, 5, "x", {}, junk, [junk]]) {
      expect(() => bugHunt!.score(l.id, moves)).not.toThrow();
      expect(bugHunt!.score(l.id, moves)!.stars).toBe(0);
    }
    // Junk moves don't cost nets.
    expect(replay(l, junk).state.netsLeft).toBe(l.nets);
  });

  it("tapping correct words costs nets; out of nets ends the hunt", () => {
    const l = levelById("bh-s1")!;
    const w = firstCorrectWord(l);
    const silly = Array.from({ length: 20 }, () => ({ wordIndex: w, fix: "banana" }));
    const r = replay(l, [...silly, ...solution(l)]);
    expect(r.state.netsLeft).toBe(0);
    expect(r.state.over).toBe(true);
    expect(r.found).toBe(0);
    expect(r.stars).toBe(0);
  });

  it("unchanged words and repeat squashes don't count", () => {
    const l = levelById("bh-s2")!;
    const p = parse(l);
    const sol = solution(l);
    const r = replay(l, [{ wordIndex: 0, fix: p.tokens[0].text }, sol[0], sol[0], { wordIndex: sol[0].wordIndex, fix: "zzz" }, ...sol.slice(1)]);
    expect(r.state.misses).toBe(0);
    expect(r.stars).toBe(3);
  });

  it("stars follow the rules: all bugs + few misses = 3, all bugs = 2, half = 1", () => {
    const l = levelById("bh-a1")!; // 5 bugs, forgive 1, 4 nets
    const sol = solution(l);
    const w = firstCorrectWord(l);
    const miss = { wordIndex: w, fix: "oops" };
    expect(replay(l, [miss, ...sol]).stars).toBe(3);
    expect(replay(l, [miss, miss, ...sol]).stars).toBe(2);
    expect(replay(l, sol.slice(0, 3)).stars).toBe(1);
    expect(replay(l, sol.slice(0, 2)).stars).toBe(0);
    // A wrong fix on a real bug also costs a net.
    const wrongFix = { wordIndex: sol[0].wordIndex, fix: "qqq" };
    const r = replay(l, [wrongFix, wrongFix, ...sol]);
    expect(r.state.misses).toBe(2);
    expect(r.stars).toBe(2);
    expect(starsFor(l, 5, 0)).toBe(3);
    expect(starsFor(l, 4, 0)).toBe(1);
    // Sprout is more forgiving.
    const s = levelById("bh-s1")!;
    const sm = { wordIndex: firstCorrectWord(s), fix: "oops" };
    expect(replay(s, [sm, sm, ...solution(s)]).stars).toBe(3);
  });
});
