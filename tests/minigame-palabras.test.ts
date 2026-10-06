import { describe, expect, it } from "vitest";
import {
  PALABRAS_LEVELS,
  palabras,
  palabrasInfo,
  levelById,
  replay,
  perfectMoves,
  scoreRound,
  isRight,
  buildNote,
  norm,
  order,
  starsFor,
  speechParts,
  pickSpanishVoice,
  parrotGrid,
  type RoundMove,
} from "@/lib/minigames/palabras";
import { gamesForGrade, levelsForKid } from "@/lib/minigames";

describe("palabras levels", () => {
  it("has 3 levels for every grade K-5, unique ids that name the grade, and 5-8 rounds each", () => {
    expect(palabras.grades).toEqual([0, 1, 2, 3, 4, 5]);
    for (const g of palabrasInfo.grades) {
      const ls = palabras.levelsForGrade!(g);
      expect(ls).toHaveLength(3);
      for (const l of ls) expect(l.id.startsWith(g === 0 ? "k-" : `g${g}-`)).toBe(true);
      expect(levelsForKid(palabras, g)).toHaveLength(3);
      expect(gamesForGrade(g).some((x) => x.id === "palabras")).toBe(true);
    }
    expect(new Set(PALABRAS_LEVELS.map((l) => l.id)).size).toBe(18);
    for (const l of PALABRAS_LEVELS) {
      expect(l.rounds.length).toBeGreaterThanOrEqual(5);
      expect(l.rounds.length).toBeLessThanOrEqual(8);
      expect(l.intro).toMatch(/Skill/);
      expect(l.intro).toContain(l.actfl);
    }
    expect(palabras.levels("sprout")).toEqual([]);
  });

  it("gets harder: more rounds and more building each grade", () => {
    const avg = (g: number, f: (l: (typeof PALABRAS_LEVELS)[number]) => number) => {
      const ls = PALABRAS_LEVELS.filter((l) => l.grade === g);
      return ls.reduce((s, l) => s + f(l), 0) / ls.length;
    };
    const builds = (l: (typeof PALABRAS_LEVELS)[number]) => l.rounds.filter((r) => r.kind === "build" || r.kind === "reply").length;
    for (let g = 1; g <= 5; g++) {
      expect(avg(g, (l) => l.rounds.length)).toBeGreaterThanOrEqual(avg(g - 1, (l) => l.rounds.length));
    }
    expect(avg(5, builds)).toBeGreaterThan(avg(0, builds));
    // Every level makes kids build Spanish, not just pick it.
    for (const l of PALABRAS_LEVELS) expect(builds(l), l.id).toBeGreaterThanOrEqual(1);
    // Spoken questions with built answers from grade 3 up.
    for (const l of PALABRAS_LEVELS.filter((x) => x.grade >= 4)) expect(l.rounds.some((r) => r.kind === "reply"), l.id).toBe(true);
    expect(PALABRAS_LEVELS.filter((x) => x.grade <= 2).every((l) => l.rounds.every((r) => r.kind !== "reply"))).toBe(true);
  });

  it("content is well formed: choices and items unique, every build answer can be made from the tiles", () => {
    for (const l of PALABRAS_LEVELS)
      for (const r of l.rounds) {
        if (r.kind === "hear") {
          expect(new Set(r.choices.map((c) => c.pic)).size, `${l.id} ${r.choices[0].es}`).toBe(r.choices.length);
          expect(new Set(r.choices.map((c) => c.es)).size).toBe(r.choices.length);
        } else if (r.kind === "match") {
          expect(new Set(r.items.map((c) => c.pic)).size, l.id).toBe(r.items.length);
          expect(new Set(r.items.map((c) => c.es)).size).toBe(r.items.length);
          expect(r.items.length).toBeGreaterThanOrEqual(3);
        } else {
          // the first answer is made from the first tiles, in order
          const perfect = perfectMoves({ ...l, rounds: [r] })[0];
          expect(isRight(r, perfect.tries![0]), `${l.id}: ${r.answers[0]}`).toBe(true);
          // distractors exist from grade 1 on (K builds are short)
          if (l.grade >= 1 && !(r.kind === "build" && r.answers[0].startsWith("lunes"))) expect(r.tiles.length, `${l.id}: ${r.answers[0]}`).toBeGreaterThan(perfect.tries![0].length);
          // every alternate answer can also be made from the tiles
          for (const a of r.answers) {
            const words = r.kind === "build" && r.join === "" ? [a] : a.split(" ");
            if (r.kind === "build" && r.join === "") continue;
            const pool = r.tiles.map(norm);
            for (const w of words) {
              const k = pool.indexOf(norm(w));
              expect(k, `${l.id}: "${w}" in "${a}"`).toBeGreaterThanOrEqual(0);
              pool.splice(k, 1);
            }
          }
        }
      }
  });

  it("uses correct Spanish accents in key words", () => {
    const all = JSON.stringify(PALABRAS_LEVELS);
    for (const word of ["días", "miércoles", "sábado", "años", "fútbol", "béisbol", "comí", "jugué", "plátano", "mamá", "¿Cómo te llamas?", "está"]) expect(all).toContain(word);
    for (const wrong of ["dias", "miercoles", "anos", "futbol", "beisbol", "jugue ", "platano", "Como te llamas"]) expect(all.includes(`"${wrong}`) || all.includes(` ${wrong}"`)).toBe(false);
  });
});

describe("palabras scoring", () => {
  it("every level can reach 3 stars with perfect moves", () => {
    for (const l of PALABRAS_LEVELS) {
      expect(palabras.score(l.id, perfectMoves(l)), l.id).toEqual({ stars: 3, best: l.rounds.length * 2 });
    }
  });

  it("replays are deterministic", () => {
    for (const l of PALABRAS_LEVELS) {
      const m = JSON.parse(JSON.stringify(perfectMoves(l)));
      expect(replay(l, m)).toEqual(replay(l, m));
      expect(order(6, `${l.id}:0`)).toEqual(order(6, `${l.id}:0`));
    }
  });

  it("garbage moves score 0 without throwing; unknown levels return null", () => {
    const junk: unknown[] = [null, undefined, 42, "moves", {}, [], [null, 1, "x"], [{ picks: "0" }], [{ picks: [-1, 99, 1.5, "0"] }], [{ pairs: [[0], [0, 0, 0], ["0", "0"], [-1, -1]] }], [{ tries: [[999], [-1], ["0"], [0, 0]] }], [{ tries: "abc" }], Array(500).fill({ picks: [1] })];
    for (const l of PALABRAS_LEVELS)
      for (const j of junk) {
        expect(() => palabras.score(l.id, j)).not.toThrow();
        const r = palabras.score(l.id, j)!;
        expect(r.best, `${l.id} ${JSON.stringify(j)?.slice(0, 40)}`).toBeLessThanOrEqual(l.rounds.length * 2);
      }
    // Pure junk earns nothing.
    for (const j of [null, 42, "x", {}, [], [null, null]]) expect(palabras.score("k-1", j)).toEqual({ stars: 0, best: 0 });
    expect(palabras.score("nope", perfectMoves(PALABRAS_LEVELS[0]))).toBeNull();
    expect(palabras.score("", [])).toBeNull();
    expect(levelById("g9-1")).toBeUndefined();
  });

  it("first try earns 2, a retry earns 1, giving up earns 0", () => {
    const l = levelById("g1-2")!;
    const hearR = l.rounds[0];
    expect(scoreRound(hearR, { picks: [0] }).points).toBe(2);
    expect(scoreRound(hearR, { picks: [1, 0] }).points).toBe(1);
    expect(scoreRound(hearR, { picks: [1, 2] }).points).toBe(0);
    const matchR = l.rounds[1];
    expect(scoreRound(matchR, { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] }).points).toBe(2);
    expect(scoreRound(matchR, { pairs: [[0, 1], [0, 0], [1, 1], [2, 2], [3, 3]] }).points).toBe(1);
    expect(scoreRound(matchR, { pairs: [[0, 0], [1, 1], [2, 2]] }).points).toBe(0);
    // Re-matching a done pair doesn't count twice or as a mistake.
    expect(scoreRound(matchR, { pairs: [[0, 0], [0, 0], [1, 1], [2, 2], [3, 3]] }).points).toBe(2);
    const buildR = l.rounds[4]; // Me gusta la pizza (+ "el")
    if (buildR.kind !== "build") throw new Error("expected a build");
    const good = [0, 1, 2, 3];
    const elTile = buildR.tiles.indexOf("el");
    expect(scoreRound(buildR, { tries: [good] }).points).toBe(2);
    expect(scoreRound(buildR, { tries: [[0, 1, elTile, 3], good] }).points).toBe(1);
    expect(scoreRound(buildR, { tries: [[1, 0, 2, 3], [0, 1, elTile, 3], [3, 2, 1, 0]] }).points).toBe(0);
    // a 4th try is ignored
    expect(scoreRound(buildR, { tries: [[1, 0, 2, 3], [1, 0, 2, 3], [1, 0, 2, 3], good] }).points).toBe(0);
  });

  it("accepts alternate answers, ignores case and punctuation, but not missing accents", () => {
    const l = levelById("g5-1")!;
    const r = l.rounds[5]; // ¿Qué comiste ayer? -> Ayer comí tacos / Comí tacos
    if (r.kind !== "reply") throw new Error("expected a reply");
    expect(isRight(r, [1, 2])).toBe(true); // "comí tacos"
    expect(norm("¿Cómo te llamas?")).toBe("cómo te llamas");
    expect(norm("Como te llamas")).not.toBe(norm("¿Cómo te llamas?"));
  });

  it("stars follow the rules", () => {
    expect(starsFor(10, 10)).toBe(3);
    expect(starsFor(9, 10)).toBe(3);
    expect(starsFor(8, 10)).toBe(2);
    expect(starsFor(6, 10)).toBe(2);
    expect(starsFor(5, 10)).toBe(1);
    expect(starsFor(3, 10)).toBe(1);
    expect(starsFor(2, 10)).toBe(0);
    expect(starsFor(0, 0)).toBe(0);
    const l = levelById("k-2")!; // 5 rounds, max 10
    const moves: RoundMove[] = perfectMoves(l);
    moves[0] = { picks: [1, 0] }; // one retry: 9/10 -> 3 stars
    expect(replay(l, moves).stars).toBe(3);
    moves[2] = { picks: [1, 0] }; // two retries: 8/10 -> 2 stars
    expect(replay(l, moves).stars).toBe(2);
    expect(replay(l, moves.slice(0, 1)).stars).toBe(0); // quit after one round
  });

  it("gives teaching feedback for wrong builds", () => {
    const r = levelById("g3-3")!.rounds[1]; // La casa es roja (+ rojo)
    if (r.kind !== "build") throw new Error("expected a build");
    expect(buildNote(r, [1, 0, 2, 3])).toMatch(/order/);
    expect(buildNote(r, [0, 1, 2, 4])).toMatch(/rojo/);
    expect(buildNote(r, [0, 1])).toMatch(/missing/);
  });
});

describe("palabras voices and art", () => {
  it("reads tips with an English voice and Spanish words with a Spanish voice", () => {
    expect(speechParts("Rojo is red, like an apple.")).toEqual([
      { text: "Rojo", es: true },
      { text: "is red, like an apple.", es: false },
    ]);
    const p = speechParts("Put no first to say you don't like it: no me gusta.");
    expect(p[p.length - 1]).toEqual({ text: "no me gusta.", es: true });
    expect(p[0].es).toBe(false);
  });

  it("picks a Spanish voice (Mexican first), or none", () => {
    const v = [
      { name: "Microsoft Zira", lang: "en-US" },
      { name: "Microsoft Helena", lang: "es-ES" },
      { name: "Microsoft Sabina", lang: "es-MX" },
    ];
    expect(pickSpanishVoice(v)?.name).toBe("Microsoft Sabina");
    expect(pickSpanishVoice([{ name: "Google español", lang: "es_ES" }])?.lang).toBe("es_ES");
    expect(pickSpanishVoice([{ name: "Zira", lang: "en-US" }])).toBeNull();
  });

  it("draws Lolo the parrot", () => {
    const g = parrotGrid();
    expect(g.px.filter(Boolean).length).toBeGreaterThan(60);
    expect(parrotGrid(true).px).not.toEqual(g.px);
  });
});
