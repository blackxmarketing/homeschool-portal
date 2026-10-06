import { describe, expect, it } from "vitest";
import {
  ALL_SPROUT_LEVELS,
  DAYS,
  KINDS,
  ORGS,
  PARTS,
  SPROUT_LEVELS,
  VARS,
  WEBS,
  answerFor,
  checkStep,
  cleanMoves,
  encodeDesign,
  extraDifferences,
  flows,
  grow,
  grownGrid,
  modelChain,
  partGrid,
  perfectMoves,
  potGrid,
  promptFor,
  replay,
  seedlingGrid,
  sproutLab,
  sproutLabInfo,
  starsFor,
  stepCount,
  teachFor,
  type SproutRound,
} from "@/lib/minigames/sproutlab";
import { gameById, levelsForKid } from "@/lib/minigames";

const wrongFor = (r: SproutRound, step: number, prev: string[][]): string => {
  switch (r.kind) {
    case "build":
    case "job":
      return PARTS.find((p) => p !== answerFor(r, step, prev))!;
    case "match":
      return KINDS.find((k) => k !== answerFor(r, step, prev))!;
    case "design":
      return step === 0 ? encodeDesign(r.a, r.a) : answerFor(r, step, prev) === "A" ? "B" : "A";
    case "spot":
      return answerFor(r, 0) === "fair" ? r.test : "fair";
    case "weigh":
      return "999999";
    case "sort":
      return "";
    case "chain":
      return "grass";
  }
};

describe("sprout lab levels", () => {
  it("has 3 levels for grades 1, 2 and 5, unique ids with the grade, 5-8 rounds, and the skill named", () => {
    expect(sproutLab.grades).toEqual([1, 2, 5]);
    for (const g of sproutLabInfo.grades) {
      expect(SPROUT_LEVELS[g]).toHaveLength(3);
      expect(sproutLab.levelsForGrade!(g).map((l) => l.id)).toEqual([`g${g}-1`, `g${g}-2`, `g${g}-3`]);
      for (const l of SPROUT_LEVELS[g]) {
        expect(l.rounds.length).toBeGreaterThanOrEqual(5);
        expect(l.rounds.length).toBeLessThanOrEqual(8);
        expect(l.intro).toMatch(/Skill/);
        expect(l.intro).toMatch(/\d-(LS|PS)\d-\d/);
      }
    }
    expect(new Set(ALL_SPROUT_LEVELS.map((l) => l.id)).size).toBe(ALL_SPROUT_LEVELS.length);
    expect(sproutLab.levelsForGrade!(3)).toEqual([]);
    expect(gameById("sproutlab")).toBe(sproutLab);
    expect(levelsForKid(sproutLab, 2).map((l) => l.id)).toEqual(["g2-1", "g2-2", "g2-3"]);
  });

  it("every round has prompts, teaching and a working answer", () => {
    for (const l of ALL_SPROUT_LEVELS)
      for (const r of l.rounds) {
        const prev: string[][] = [];
        for (let s = 0; s < stepCount(r); s++) {
          expect(promptFor(l, r, s).length, `${l.id} ${r.kind}`).toBeGreaterThan(10);
          const a = answerFor(r, s, prev);
          expect(checkStep(r, s, a, prev).ok, `${l.id} ${r.kind} step ${s}`).toBe(true);
          const w = wrongFor(r, s, prev);
          const c = checkStep(r, s, w, prev);
          expect(c.ok, `${l.id} ${r.kind} wrong ${w}`).toBe(false);
          expect(c.note.length).toBeGreaterThan(5);
          prev.push([a]);
        }
        expect(teachFor(r, prev).length).toBeGreaterThan(20);
      }
  });

  it("spot rounds differ in at most one extra thing, and design starts are not already right", () => {
    for (const l of ALL_SPROUT_LEVELS)
      for (const r of l.rounds) {
        if (r.kind === "spot") expect(extraDifferences(r.set, r.test, r.a, r.b).length).toBeLessThanOrEqual(1);
        if (r.kind === "design") expect(checkStep(r, 0, encodeDesign(r.a, r.b), []).ok, l.id).toBe(false);
      }
    // Both kinds of spot answers show up in grade 2.
    const spots = SPROUT_LEVELS[2].flatMap((l) => l.rounds).filter((r) => r.kind === "spot");
    expect(spots.some((r) => answerFor(r, 0) === "fair")).toBe(true);
    expect(spots.some((r) => answerFor(r, 0) !== "fair")).toBe(true);
  });

  it("gets harder: grade 2 design rounds start with more to fix", () => {
    const toFix = (lv: number) =>
      SPROUT_LEVELS[2][lv].rounds.filter((r) => r.kind === "design").reduce((s, r) => s + (r.kind === "design" ? VARS.g2.filter((_, i) => r.a[i] !== r.b[i]).length : 0), 0);
    expect(toFix(0)).toBeLessThan(toFix(2));
  });
});

describe("sprout lab science model", () => {
  it("grade 2 beans need water and light; too much water and sand slow them", () => {
    const d = DAYS.g2;
    const good = grow("g2", ["sun", "some", "potting"], d).value;
    expect(grow("g2", ["sun", "none", "potting"], d)).toMatchObject({ value: 0, look: "seed" });
    const dark = grow("g2", ["dark", "some", "potting"], d);
    expect(dark.value).toBe(0);
    expect(dark.look).toBe("pale");
    expect(dark.stem).toBeGreaterThan(grow("g2", ["sun", "some", "potting"], d).stem - 1); // tall and pale
    expect(grow("g2", ["sun", "lots", "potting"], d).value).toBeLessThan(good);
    expect(grow("g2", ["sun", "some", "sand"], d).value).toBeLessThan(good);
    expect(good).toBeGreaterThan(5);
  });

  it("grade 5 plants gain mass only with light, water and carbon dioxide", () => {
    const d = DAYS.g5;
    expect(grow("g5", ["sun", "some", "normal"], d).value).toBeGreaterThan(0);
    expect(grow("g5", ["dark", "some", "normal"], d).value).toBeLessThan(0);
    expect(grow("g5", ["sun", "none", "normal"], d).value).toBeLessThan(0);
    expect(grow("g5", ["sun", "some", "noco2"], d).value).toBeLessThan(0);
  });

  it("design checks: one change is fair, two changes are not, and the read step follows the kid's own design", () => {
    const r = SPROUT_LEVELS[2][0].rounds[0];
    expect(r.kind).toBe("design");
    expect(checkStep(r, 0, "sun,some,potting|dark,some,potting", []).ok).toBe(true);
    expect(checkStep(r, 0, "sun,some,potting|dark,none,potting", []).note).toMatch(/Not fair/);
    expect(checkStep(r, 0, "sun,some,potting|sun,some,potting", []).note).toMatch(/same light/);
    expect(checkStep(r, 0, "bogus", []).ok).toBe(false);
    // Kid put the dark pot first: then Pot B grew more.
    expect(answerFor(r, 1, [["dark,some,potting|sun,some,potting"]])).toBe("B");
    // Both pots dry: neither grows, "same" is the honest answer.
    expect(answerFor(r, 1, [["sun,none,potting|dark,none,potting"]])).toBe("same");
    // Three misses: the model design is used.
    expect(answerFor(r, 1, [["x", "y", "z"]])).toBe("A");
  });

  it("weighing: the plant's mass came mostly from air and water", () => {
    const w = SPROUT_LEVELS[5][0].rounds[0];
    expect(w.kind).toBe("weigh");
    if (w.kind !== "weigh") return;
    expect(answerFor(w, 0)).toBe("80");
    expect(answerFor(w, 1)).toBe("1");
    expect(answerFor(w, 2)).toBe("79");
    expect(checkStep(w, 0, "81", []).note).toMatch(/Subtract/);
    const willow = SPROUT_LEVELS[5][0].rounds[2];
    expect(willow.kind === "weigh" && answerFor(willow, 0)).toBe("164");
    expect(checkStep(willow, 1, "163", []).ok).toBe(true);
    expect(checkStep(willow, 1, "164", []).ok).toBe(true);
  });

  it("food webs: energy starts at the Sun, flows to plants, animals, then decomposers", () => {
    expect(flows("meadow", "sun", "grass")).toBe(true);
    expect(flows("meadow", "sun", "rabbit")).toBe(false);
    expect(flows("meadow", "rabbit", "grass")).toBe(false);
    expect(flows("meadow", "fox", "mushroom")).toBe(true);
    expect(flows("meadow", "sun", "mushroom")).toBe(false);
    for (const [id, w] of Object.entries(WEBS)) {
      for (const o of w.orgs) expect(ORGS[o], `${id} ${o}`).toBeTruthy();
      for (const [a, b] of w.eats) expect(w.orgs.includes(a) && w.orgs.includes(b)).toBe(true);
    }
    const r: SproutRound = { kind: "chain", web: "meadow", target: "fox", decomposer: true };
    expect(modelChain(r)[0]).toBe("sun");
    expect(checkStep(r, 0, "sun>grass>rabbit>fox", []).note).toMatch(/decomposer/);
    expect(checkStep(r, 0, "sun>grass>rabbit>fox>bacteria", []).ok).toBe(true);
    expect(checkStep(r, 0, "sun>rabbit>fox>bacteria", []).note).toMatch(/producers/);
    expect(checkStep(r, 0, "sun>grass>fox>rabbit>bacteria", []).ok).toBe(false);
    expect(checkStep(r, 0, "grass>rabbit", []).note).toMatch(/Sun/);
  });
});

describe("sprout lab scoring", () => {
  it("every level can reach 3 stars", () => {
    for (const l of ALL_SPROUT_LEVELS) expect(sproutLab.score(l.id, perfectMoves(l)), l.id).toEqual({ stars: 3, best: l.rounds.length * 2 });
  });

  it("replays are deterministic", () => {
    for (const l of ALL_SPROUT_LEVELS) {
      const m = perfectMoves(l);
      expect(replay(l, m)).toEqual(replay(l, JSON.parse(JSON.stringify(m))));
    }
  });

  it("garbage moves score 0 without throwing; unknown levels are null", () => {
    const junk: unknown[] = [null, undefined, 42, "hi", {}, [], [null], [{ tries: "4" }], [{ tries: [[1e9, null, {}], "x"] }], [[[[]]]], [{ tries: [[NaN], [Infinity]] }], [{ tries: [["a".repeat(5000)]] }]];
    for (const l of ALL_SPROUT_LEVELS)
      for (const j of junk) {
        expect(() => sproutLab.score(l.id, j)).not.toThrow();
        expect(sproutLab.score(l.id, j)!.stars).toBe(0);
      }
    expect(sproutLab.score("nope", [])).toBeNull();
    expect(sproutLab.score("g3-1", perfectMoves(SPROUT_LEVELS[1][0]))).toBeNull();
  });

  it("first try earns 2, solved later earns 1, a 4th try doesn't count, and stars follow the points", () => {
    const l = SPROUT_LEVELS[1][0]; // 6 rounds, max 12
    const perfect = perfectMoves(l);
    const slip = (i: number) => {
      const r = l.rounds[i];
      const tries: string[][] = [];
      for (let s = 0; s < stepCount(r); s++) {
        const a = answerFor(r, s, tries);
        tries.push(s === 0 ? [wrongFor(r, s, tries), a] : [a]);
      }
      return { tries };
    };
    const oneSlip = perfect.map((m, i) => (i === 0 ? slip(0) : m));
    expect(replay(l, oneSlip)).toMatchObject({ points: 11, stars: 3 });
    const allSlips = l.rounds.map((_, i) => slip(i));
    expect(replay(l, allSlips)).toMatchObject({ points: 6, stars: 1 });
    const late = l.rounds.map((r) => {
      const a = answerFor(r, 0);
      const w = wrongFor(r, 0, []);
      return { tries: [[w, w, w, a], ...perfectMoves({ ...l, rounds: [r] })[0].tries.slice(1)] };
    });
    expect(replay(l, late).points).toBe(0);
    expect(replay(l, [...perfect, { tries: [["x"]] }]).points).toBe(12);
    expect(replay(l, perfect.slice(0, 3))).toMatchObject({ points: 6, stars: 1 });
    expect(starsFor(12, 12)).toBe(3);
    expect(starsFor(8, 12)).toBe(2);
    expect(starsFor(0, 12)).toBe(0);
  });

  it("cleans moves to short strings", () => {
    expect(cleanMoves([{ tries: [["roots", 5, "a".repeat(400)], "x"] }])).toEqual([{ tries: [["roots", "", "a".repeat(160)], []] }]);
    expect(cleanMoves("x")).toEqual([]);
  });
});

describe("sprout lab art", () => {
  it("draws every part, seedling, grown plant and pot", () => {
    for (const p of PARTS) for (const pl of ["sunflower", "bean", "tulip"] as const) expect(partGrid(p, pl).runs().length).toBeGreaterThan(3);
    for (const k of KINDS) {
      expect(seedlingGrid(k).runs().length).toBeGreaterThan(3);
      expect(grownGrid(k).runs().length).toBeGreaterThan(10);
    }
    for (const s of [["sun", "some", "potting"], ["dark", "lots", "sand"], ["sun", "none", "potting"]]) for (const d of [0, 7, 14]) expect(potGrid("g2", s, d).runs().length).toBeGreaterThan(5);
    for (const s of [["sun", "some", "normal"], ["dark", "some", "normal"], ["sun", "none", "noco2"]]) expect(potGrid("g5", s, 10).runs().length).toBeGreaterThan(5);
  });
});
