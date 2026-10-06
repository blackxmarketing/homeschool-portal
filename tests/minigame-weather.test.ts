import { describe, expect, it } from "vitest";
import {
  ALL_WEATHER_LEVELS,
  CLIMATES,
  DRESS_FOR,
  ITEMS,
  PLACE_INFO,
  WEATHERS,
  WEATHER_LEVELS,
  answerFor,
  askFor,
  bestDesign,
  checkAnswer,
  cleanMoves,
  extreme,
  itemGrid,
  kidGrid,
  passes,
  perfectMoves,
  predictRange,
  promptFor,
  replay,
  skyGrid,
  starsFor,
  teachFor,
  weatherWatch,
  weatherWatchInfo,
  type WeatherRound,
} from "@/lib/minigames/weather";
import { gameById, levelsForKid } from "@/lib/minigames";

/** A wrong answer for any round (to test feedback and partial credit). */
function wrongFor(r: WeatherRound): string {
  switch (r.kind) {
    case "record":
      return r.days.map((d) => (d === "sunny" ? "snowy" : "sunny")).join(",");
    case "count":
      return r.ask === "most" || r.ask === "fewest" ? WEATHERS.find((w) => w !== answerFor(r))! : "99";
    case "dress":
      return "umbrella,sunhat,mittens";
    case "storm":
      return r.places.find((p) => !PLACE_INFO[p].safe)!;
    case "kit":
      return "kite";
    case "graph":
      return r.data.values.map(() => 0).join(",");
    case "read":
      return "-5";
    case "predict":
      return String(r.data.max);
    case "climate":
      return r.places.map(() => "desert").join(",");
    case "design":
      return r.test.designs[0].id;
  }
}

describe("weather watch levels", () => {
  it("has 3 levels for K and grade 3, unique ids with the grade, 5-8 rounds, skill named", () => {
    expect(weatherWatch.grades).toEqual([0, 3]);
    expect(weatherWatch.id).toBe(weatherWatchInfo.id);
    for (const g of weatherWatchInfo.grades) {
      expect(WEATHER_LEVELS[g]).toHaveLength(3);
      expect(weatherWatch.levelsForGrade!(g)).toHaveLength(3);
      for (const l of WEATHER_LEVELS[g]) {
        expect(l.id.startsWith(g === 0 ? "k-" : `g${g}-`)).toBe(true);
        expect(l.rounds.length).toBeGreaterThanOrEqual(5);
        expect(l.rounds.length).toBeLessThanOrEqual(8);
        expect(l.intro).toMatch(/Skill/);
        expect(l.intro).toMatch(g === 0 ? /K-ESS/ : /3-ESS/);
      }
    }
    expect(new Set(ALL_WEATHER_LEVELS.map((l) => l.id)).size).toBe(ALL_WEATHER_LEVELS.length);
    expect(weatherWatch.levelsForGrade!(1)).toEqual([]);
    expect(gameById("weather")).toBe(weatherWatch);
    expect(levelsForKid(weatherWatch, 0).map((l) => l.id)).toEqual(["k-1", "k-2", "k-3"]);
    expect(levelsForKid(weatherWatch, 3).map((l) => l.id)).toEqual(["g3-1", "g3-2", "g3-3"]);
  });

  it("every round is well formed: one right answer, a prompt and a lesson", () => {
    for (const l of ALL_WEATHER_LEVELS)
      for (const r of l.rounds) {
        const a = answerFor(r);
        expect(a, `${l.id} ${r.kind}`).not.toBe("");
        expect(checkAnswer(r, a).correct, `${l.id} ${r.kind}`).toBe(true);
        expect(checkAnswer(r, wrongFor(r)).correct, `${l.id} ${r.kind} wrong`).toBe(false);
        expect(checkAnswer(r, wrongFor(r)).note.length).toBeGreaterThan(5);
        expect(promptFor(r).length).toBeGreaterThan(10);
        expect(teachFor(r).length).toBeGreaterThan(10);
        if (r.kind === "count" && (r.ask === "most" || r.ask === "fewest")) expect(extreme(r.days, r.ask)).not.toBeNull();
        if (r.kind === "count" || r.kind === "read") expect(askFor(r).length).toBeGreaterThan(10);
        if (r.kind === "storm") expect(r.places.filter((p) => PLACE_INFO[p].safe)).toHaveLength(1);
        if (r.kind === "record") expect(r.days.length).toBeLessThanOrEqual(5);
        if (r.kind === "count") expect(r.days.length).toBeLessThanOrEqual(10);
        if (r.kind === "graph" || r.kind === "read" || r.kind === "predict") {
          for (const v of r.data.values) {
            expect(v % r.data.step).toBe(0);
            expect(v).toBeLessThanOrEqual(r.data.max);
          }
        }
        if (r.kind === "read" && (r.ask.kind === "max" || r.ask.kind === "min")) {
          const best = r.ask.kind === "max" ? Math.max(...r.data.values) : Math.min(...r.data.values);
          expect(r.data.values.filter((v) => v === best)).toHaveLength(1);
        }
        if (r.kind === "predict") {
          expect(r.data.labels.length).toBe(r.data.values.length + 1);
          expect(r.data.labels[r.data.values.length]).toBe(r.next);
          const { lo, hi, target } = predictRange(r);
          expect(target).toBeGreaterThanOrEqual(lo);
          expect(target).toBeLessThanOrEqual(hi);
          expect(target % r.data.step).toBe(0);
        }
        if (r.kind === "climate") expect(new Set(r.places.map((p) => p.climate)).size).toBe(CLIMATES.length);
        if (r.kind === "design") expect(bestDesign(r.test)).not.toBeNull();
      }
  });

  it("weather facts: climates match their data, safe places, the right clothes", () => {
    for (const l of ALL_WEATHER_LEVELS)
      for (const r of l.rounds)
        if (r.kind === "climate")
          for (const p of r.places) {
            if (p.climate === "polar") expect(p.warm).toBeLessThan(32);
            if (p.climate === "desert") expect(p.rain).toBeLessThan(10);
            if (p.climate === "rainforest") {
              expect(p.cold).toBeGreaterThan(64);
              expect(p.rain).toBeGreaterThan(60);
            }
            if (p.climate === "temperate") expect(p.warm - p.cold).toBeGreaterThan(20);
          }
    expect(PLACE_INFO.tree.safe).toBe(false);
    expect(PLACE_INFO.house.safe).toBe(true);
    // Every piece of clothing belongs to exactly one weather.
    const worn = Object.values(DRESS_FOR).flat();
    expect([...worn].sort()).toEqual([...ITEMS].sort());
  });

  it("dress, record and design checks teach why", () => {
    const sunny: WeatherRound = { kind: "dress", weather: "sunny" };
    expect(checkAnswer(sunny, "sunglasses,sunhat").correct).toBe(true);
    expect(checkAnswer(sunny, "sunhat,sunglasses,sunhat").correct).toBe(true);
    expect(checkAnswer(sunny, "sunhat").note).toMatch(/eyes/);
    expect(checkAnswer(sunny, "sunhat,sunglasses,mittens").note).toMatch(/snowy/);
    expect(checkAnswer({ kind: "dress", weather: "windy" }, "jacket,umbrella").note).toMatch(/inside out/);
    const rec: WeatherRound = { kind: "record", days: ["sunny", "rainy", "cloudy"] };
    const c = checkAnswer(rec, "sunny,snowy,cloudy");
    expect(c.wrong).toEqual([1]);
    expect(c.note).toMatch(/Tuesday/);
    const design = WEATHER_LEVELS[3][2].rounds[0];
    if (design.kind !== "design") throw new Error("expected a design round");
    expect(bestDesign(design.test)?.id).toBe("wall8");
    expect(passes(design.test.designs[1], design.test)).toEqual([true, false, true, false]);
    expect(checkAnswer(design, "wall5").note).toMatch(/failed 2 of 4/);
    expect(checkAnswer(design, "wall12").note).toMatch(/costs less/);
  });
});

describe("weather watch scoring", () => {
  it("every level reaches 3 stars with perfect moves, and replays are deterministic", () => {
    for (const l of ALL_WEATHER_LEVELS) {
      const moves = perfectMoves(l);
      const r = replay(l, moves);
      expect(r.stars, l.id).toBe(3);
      expect(r.points).toBe(r.max);
      expect(replay(l, JSON.parse(JSON.stringify(moves)))).toEqual(r);
      expect(weatherWatch.score(l.id, moves)).toEqual({ stars: 3, best: r.max });
    }
  });

  it("right on a later try earns 1 point, never right earns 0", () => {
    for (const l of ALL_WEATHER_LEVELS) {
      const later = l.rounds.map((r) => ({ tries: [wrongFor(r), answerFor(r)] }));
      const rl = replay(l, later);
      expect(rl.points, l.id).toBe(l.rounds.length);
      expect(rl.stars).toBe(starsFor(l.rounds.length, l.rounds.length * 2));
      expect(rl.stars).toBe(1);
      const never = l.rounds.map((r) => ({ tries: [wrongFor(r), wrongFor(r), wrongFor(r)] }));
      expect(replay(l, never).points).toBe(0);
      // A 4th try doesn't count.
      const fourth = l.rounds.map((r) => ({ tries: [wrongFor(r), wrongFor(r), wrongFor(r), answerFor(r)] }));
      expect(replay(l, fourth).points).toBe(0);
    }
  });

  it("stars follow the rules", () => {
    expect(starsFor(14, 14)).toBe(3);
    expect(starsFor(13, 14)).toBe(3);
    expect(starsFor(12, 14)).toBe(2);
    expect(starsFor(9, 14)).toBe(2);
    expect(starsFor(8, 14)).toBe(1);
    expect(starsFor(5, 14)).toBe(1);
    expect(starsFor(4, 14)).toBe(0);
    expect(starsFor(0, 0)).toBe(0);
    const l = WEATHER_LEVELS[0][1];
    const moves = perfectMoves(l);
    moves[0] = { tries: [wrongFor(l.rounds[0]), answerFor(l.rounds[0])] };
    expect(replay(l, moves).stars).toBe(3); // 13 of 14
    moves[1] = { tries: [] };
    expect(replay(l, moves).stars).toBe(2); // 11 of 14
  });

  it("garbage moves score 0 without throwing, and unknown levels return null", () => {
    const junk: unknown[] = [
      null,
      undefined,
      42,
      "moves",
      {},
      [null, 1, "x", { tries: "sunny" }, { tries: [1, 2, null, {}] }],
      Array.from({ length: 100 }, () => ({ tries: Array(50).fill("x".repeat(10000)) })),
      [{ tries: [{ toString: () => { throw new Error("boom"); } }] }],
      [{ tries: ["__proto__", "constructor", "-0", "1e9", "NaN", ",,,,"] }],
    ];
    for (const l of ALL_WEATHER_LEVELS)
      for (const j of junk) {
        expect(() => weatherWatch.score(l.id, j)).not.toThrow();
        expect(weatherWatch.score(l.id, j)).toEqual({ stars: 0, best: 0 });
      }
    expect(cleanMoves([{ tries: ["a", "b", "c", "d"] }])[0].tries).toHaveLength(3);
    expect(weatherWatch.score("nope", perfectMoves(WEATHER_LEVELS[0][0]))).toBeNull();
    expect(weatherWatch.score("g1-1", [])).toBeNull();
  });
});

describe("weather watch pixel art", () => {
  it("draws the skies, the kid and the clothes", () => {
    for (const w of WEATHERS) for (const f of [0, 1]) expect(skyGrid(w, f).runs().length).toBeGreaterThan(20);
    expect(kidGrid([]).runs().length).toBeGreaterThan(10);
    expect(kidGrid(ITEMS).runs().length).toBeGreaterThan(10);
    for (const i of ITEMS) expect(itemGrid(i).runs().length).toBeGreaterThan(3);
  });
});
