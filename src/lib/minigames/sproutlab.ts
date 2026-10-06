import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Sprout Lab (K-5 science, grades 1, 2 and 5). A pixel greenhouse where
 * kids build plants, grow them over "days" and run real experiments.
 *
 * Round kinds (each round has one or more steps; every step allows up to
 * MAX_TRIES tries, and a wrong try explains why):
 *   build  - build a plant from the ground up: roots, stem, leaves, flower (1-LS1-1)
 *   job    - the plant has a need: tap the part that does that job (1-LS1-1)
 *   match  - match each seedling to the grown plant it becomes (1-LS3-1)
 *   design - set up two pots for a fair test (change ONE thing), grow them,
 *            then read the results (2-LS2-1; grade 5 tests air and light, 5-LS1-1)
 *   spot   - look at a test someone else set up: is it fair? (2-LS2-1)
 *   weigh  - weigh soil and plant before and after growing, like van Helmont's
 *            willow experiment: where did the plant's mass come from? (5-LS1-1)
 *   sort   - tag living things as producers, consumers or decomposers (5-LS2-1)
 *   chain  - trace the Sun's energy through a food web (5-PS3-1, 5-LS2-1)
 *
 * Growth comes from a simple, honest model (no randomness): beans need water
 * and light, too much water or poor sand slows them, and a bean in the dark
 * grows tall and pale with no green leaves. In grade 5 a plant gains mass
 * only with light, water and carbon dioxide; without them it uses up stored
 * food and loses a little.
 *
 * Scoring: 2 points for a round with every step right on the first try,
 * 1 point when every step was solved within MAX_TRIES, else 0. Stars from
 * the share of points. Pure, so the server can replay the kid's moves.
 */

export const sproutLabInfo = {
  id: "sproutlab",
  title: "Sprout Lab",
  icon: "🌱",
  land: "science" as const,
  subject: "sci" as const,
  grades: [1, 2, 5],
  blurb: "Run fair tests on plants: change one thing and see what helps them grow.",
};

export const MAX_TRIES = 3;

// ---------------- Seeded helpers (shuffles only) ----------------

export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffled<T>(arr: readonly T[], seed: number): T[] {
  const out = [...arr];
  const r = rng(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ---------------- Plant parts (grade 1) ----------------

export type Part = "roots" | "stem" | "leaves" | "flower";
/** Bottom-up: the order a plant is built in. */
export const PARTS: Part[] = ["roots", "stem", "leaves", "flower"];

export const PART_INFO: Record<Part, { name: string; emoji: string; job: string; does: string; where: string }> = {
  roots: { name: "roots", emoji: "🫚", job: "soak up water from the soil and hold the plant in the ground", does: "soak up water from the soil and hold the plant in the ground", where: "under the soil" },
  stem: { name: "stem", emoji: "🌿", job: "hold the plant up and carry water from the roots to the leaves", does: "holds the plant up and carries water from the roots to the leaves", where: "just above the soil" },
  leaves: { name: "leaves", emoji: "🍃", job: "use sunlight to make food for the plant", does: "use sunlight to make food for the plant", where: "on the stem, up in the light" },
  flower: { name: "flower", emoji: "🌼", job: "make seeds that grow into new plants", does: "makes seeds that grow into new plants", where: "at the top" },
};

export type Job = "drink" | "hold" | "carry" | "standup" | "food" | "seeds";
export const JOBS: Record<Job, { part: Part; ask: string }> = {
  drink: { part: "roots", ask: "The plant is thirsty. Tap the part that soaks up water from the soil." },
  hold: { part: "roots", ask: "The wind is blowing hard! Tap the part that holds the plant in the ground." },
  carry: { part: "stem", ask: "Water has to get from the roots up to the leaves. Tap the part that carries it." },
  standup: { part: "stem", ask: "Tap the part that holds the plant up tall." },
  food: { part: "leaves", ask: "The plant is hungry. Tap the part that uses sunlight to make food." },
  seeds: { part: "flower", ask: "The plant wants to make new baby plants. Tap the part that makes seeds." },
};

export type BuildPlant = "sunflower" | "bean" | "tulip";
export const FLOWER_COLORS: Record<BuildPlant, { petal: string; middle: string; name: string }> = {
  sunflower: { petal: "#fcc419", middle: "#7a4a1d", name: "sunflower" },
  bean: { petal: "#f3f0ff", middle: "#b197fc", name: "bean plant" },
  tulip: { petal: "#ff6b6b", middle: "#c92a2a", name: "tulip" },
};

// ---------------- Seedlings and grown plants (grade 1) ----------------

export type Kind = "sunflower" | "pine" | "corn" | "cactus";
export const KINDS: Kind[] = ["sunflower", "pine", "corn", "cactus"];
export const KIND_INFO: Record<Kind, { name: string; emoji: string; clue: string }> = {
  sunflower: { name: "sunflower", emoji: "🌻", clue: "wide, flat green leaves" },
  pine: { name: "pine tree", emoji: "🌲", clue: "thin, pointy needles" },
  corn: { name: "corn plant", emoji: "🌽", clue: "long, skinny leaves like blades of grass" },
  cactus: { name: "cactus", emoji: "🌵", clue: "a fat, round green body with tiny spines" },
};

// ---------------- Fair tests (grades 2 and 5) ----------------

export type VarSet = "g2" | "g5";
export interface VarValue {
  id: string;
  label: string;
  emoji: string;
}
export interface TestVar {
  id: string;
  name: string;
  values: VarValue[];
}

export const VARS: Record<VarSet, TestVar[]> = {
  g2: [
    { id: "light", name: "light", values: [{ id: "sun", label: "Sunny window", emoji: "☀️" }, { id: "dark", label: "Dark closet", emoji: "🌑" }] },
    {
      id: "water",
      name: "water",
      values: [
        { id: "none", label: "No water", emoji: "🚫" },
        { id: "some", label: "Some water", emoji: "💧" },
        { id: "lots", label: "Too much water", emoji: "🌊" },
      ],
    },
    { id: "soil", name: "soil", values: [{ id: "potting", label: "Potting soil", emoji: "🟫" }, { id: "sand", label: "Sand", emoji: "🟨" }] },
  ],
  g5: [
    { id: "light", name: "light", values: [{ id: "sun", label: "Sunlight", emoji: "☀️" }, { id: "dark", label: "Dark", emoji: "🌑" }] },
    { id: "water", name: "water", values: [{ id: "some", label: "Watered", emoji: "💧" }, { id: "none", label: "No water", emoji: "🚫" }] },
    { id: "air", name: "air", values: [{ id: "normal", label: "Normal air", emoji: "🌬️" }, { id: "noco2", label: "Air with no CO₂", emoji: "🫙" }] },
  ],
};

/** The values of a pot, in VARS order. */
export type Setup = string[];

/** A pot with everything a plant needs. */
export const GOOD: Record<VarSet, Setup> = { g2: ["sun", "some", "potting"], g5: ["sun", "some", "normal"] };
export const DAYS: Record<VarSet, number> = { g2: 14, g5: 10 };

const varIndex = (set: VarSet, id: string) => VARS[set].findIndex((v) => v.id === id);
const valueOf = (set: VarSet, s: Setup, id: string) => s[varIndex(set, id)];
export const valueInfo = (set: VarSet, varId: string, val: string) => VARS[set][varIndex(set, varId)]?.values.find((v) => v.id === val);

/**
 * The honest growth model.
 * g2: green leaves after `day` days, plus stem height (a bean in the dark grows tall and pale).
 * g5: grams of mass gained (negative = lost).
 */
export interface Growth {
  /** g2: green leaves. g5: grams gained. */
  value: number;
  /** Stem height in pixels for the drawing. */
  stem: number;
  look: "green" | "pale" | "dry" | "seed";
}

export function grow(set: VarSet, s: Setup, day: number): Growth {
  const d = Math.max(0, Math.min(30, Math.floor(day)));
  const light = valueOf(set, s, "light");
  const water = valueOf(set, s, "water");
  if (set === "g2") {
    const soil = valueOf(set, s, "soil");
    if (water === "none") return { value: 0, stem: 0, look: "seed" };
    if (light === "dark") return { value: 0, stem: Math.min(18, Math.floor(d * 1.3)), look: "pale" };
    const rate = 0.5 * (water === "lots" ? 0.4 : 1) * (soil === "sand" ? 0.5 : 1);
    const leaves = d < 3 ? 0 : 2 + Math.floor((d - 3) * rate * 1.3);
    return { value: leaves, stem: Math.min(18, Math.floor(d * rate * 1.6)), look: "green" };
  }
  const air = valueOf(set, s, "air");
  if (water === "none") return { value: -Math.min(4, Math.ceil(d / 2)), stem: 3, look: "dry" };
  if (light === "dark") return { value: -Math.min(2, Math.ceil(d / 4)), stem: Math.min(16, 3 + d), look: "pale" };
  if (air === "noco2") return { value: -Math.min(2, Math.ceil(d / 4)), stem: 3, look: "green" };
  return { value: d * 6, stem: Math.min(18, 3 + Math.floor(d * 1.5)), look: "green" };
}

/** One sentence on why a pot grew the way it did. */
export function whyGrowth(set: VarSet, s: Setup): string {
  const light = valueOf(set, s, "light");
  const water = valueOf(set, s, "water");
  if (set === "g2") {
    const soil = valueOf(set, s, "soil");
    if (water === "none") return "With no water, the bean seed never sprouted.";
    if (light === "dark") return "In the dark, the bean grew tall and pale but made no green leaves: it needs light.";
    if (water === "lots" && soil === "sand") return "Soggy soil hurt the roots, and sand has few nutrients, so it grew very slowly.";
    if (water === "lots") return "Too much water made the soil soggy, and soggy roots can't get air, so it grew slowly.";
    if (soil === "sand") return "Sand holds little water and few nutrients, so it grew more slowly.";
    return "With light, the right amount of water and good soil, it grew well.";
  }
  const air = valueOf(set, s, "air");
  if (water === "none") return "With no water, the plant wilted and dried out, so it lost mass.";
  if (light === "dark") return "In the dark there's no light energy to make food, so it used up stored food and lost mass.";
  if (air === "noco2") return "With no carbon dioxide, it couldn't make food (sugar), so it lost a little mass.";
  return "With light, water and carbon dioxide, it made food and gained mass.";
}

export const encodeDesign = (a: Setup, b: Setup) => `${a.join(",")}|${b.join(",")}`;

export function parseDesign(set: VarSet, raw: string): [Setup, Setup] | null {
  const parts = raw.split("|");
  if (parts.length !== 2) return null;
  const vars = VARS[set];
  const pots = parts.map((p) => p.split(","));
  for (const pot of pots) {
    if (pot.length !== vars.length) return null;
    if (!pot.every((val, i) => vars[i].values.some((v) => v.id === val))) return null;
  }
  return [pots[0], pots[1]];
}

// ---------------- Food webs (grade 5) ----------------

export type Role = "sun" | "P" | "C" | "D";
export const ROLE_NAMES: Record<Exclude<Role, "sun">, string> = { P: "Producer", C: "Consumer", D: "Decomposer" };
/** Why a living thing has its role, as [singular, plural] verb phrases. */
export const ROLE_WHY: Record<Exclude<Role, "sun">, [string, string]> = {
  P: ["makes its own food from sunlight, so it's a producer", "make their own food from sunlight, so they're producers"],
  C: ["gets energy by eating other living things, so it's a consumer", "get energy by eating other living things, so they're consumers"],
  D: [
    "breaks down dead plants and animals and puts nutrients back in the soil or water, so it's a decomposer",
    "break down dead plants and animals and put nutrients back in the soil or water, so they're decomposers",
  ],
};

export const ORGS: Record<string, { name: string; emoji: string; role: Role; plural?: boolean }> = {
  sun: { name: "Sun", emoji: "☀️", role: "sun" },
  grass: { name: "grass", emoji: "🌾", role: "P" },
  oak: { name: "oak tree", emoji: "🌳", role: "P" },
  rabbit: { name: "rabbit", emoji: "🐇", role: "C" },
  mouse: { name: "mouse", emoji: "🐁", role: "C" },
  deer: { name: "deer", emoji: "🦌", role: "C" },
  fox: { name: "fox", emoji: "🦊", role: "C" },
  owl: { name: "owl", emoji: "🦉", role: "C" },
  mushroom: { name: "mushrooms", emoji: "🍄", role: "D", plural: true },
  bacteria: { name: "bacteria", emoji: "🦠", role: "D", plural: true },
  algae: { name: "algae", emoji: "🟢", role: "P", plural: true },
  pondweed: { name: "pondweed", emoji: "🌱", role: "P" },
  tadpole: { name: "tadpole", emoji: "🐸", role: "C" },
  snail: { name: "snail", emoji: "🐌", role: "C" },
  fish: { name: "fish", emoji: "🐟", role: "C" },
  heron: { name: "heron", emoji: "🪿", role: "C" },
};

export type WebId = "meadow" | "pond";
/** Energy flows from -> to (the "to" eats the "from"). Decomposers break down every living thing in the web. */
export const WEBS: Record<WebId, { name: string; orgs: string[]; eats: [string, string][] }> = {
  meadow: {
    name: "Meadow",
    orgs: ["sun", "grass", "oak", "rabbit", "mouse", "deer", "fox", "owl", "mushroom", "bacteria"],
    eats: [
      ["sun", "grass"],
      ["sun", "oak"],
      ["grass", "rabbit"],
      ["grass", "deer"],
      ["grass", "mouse"],
      ["oak", "mouse"],
      ["oak", "deer"],
      ["rabbit", "fox"],
      ["mouse", "fox"],
      ["mouse", "owl"],
      ["rabbit", "owl"],
    ],
  },
  pond: {
    name: "Pond",
    orgs: ["sun", "algae", "pondweed", "tadpole", "snail", "fish", "heron", "bacteria"],
    eats: [
      ["sun", "algae"],
      ["sun", "pondweed"],
      ["algae", "tadpole"],
      ["algae", "snail"],
      ["pondweed", "snail"],
      ["tadpole", "fish"],
      ["snail", "fish"],
      ["fish", "heron"],
      ["tadpole", "heron"],
    ],
  },
};

export function flows(web: WebId, from: string, to: string): boolean {
  const w = WEBS[web];
  if (!w.orgs.includes(from) || !w.orgs.includes(to)) return false;
  if (ORGS[to]?.role === "D") return from !== "sun" && ORGS[from]?.role !== "D";
  return w.eats.some(([a, b]) => a === from && b === to);
}

// ---------------- Rounds and levels ----------------

export type WeighStep = "gain" | "loss" | "air";

export type SproutRound =
  | { kind: "build"; plant: BuildPlant; help: boolean }
  | { kind: "job"; job: Job; plant: BuildPlant }
  | { kind: "match"; kinds: Kind[] }
  | { kind: "design"; set: VarSet; test: string; compare?: [string, string]; a: Setup; b: Setup; question: string }
  | { kind: "spot"; set: VarSet; test: string; a: Setup; b: Setup; question: string }
  | {
      kind: "weigh";
      story: string;
      unit: string;
      plant: string;
      plantBefore: number;
      plantAfter: number;
      soilBefore: number;
      soilAfter: number;
      soilNote?: string;
      steps: WeighStep[];
      /** Accepted answers for the "air" step (when the soil loss is rounded). */
      airAccept?: number[];
    }
  | { kind: "sort"; web: WebId; ids: string[] }
  | { kind: "chain"; web: WebId; target: string; decomposer: boolean };

export interface SproutLevel extends MiniLevel {
  grade: number;
  rounds: SproutRound[];
  /** Show the extra coaching hints (the first level in each grade). */
  hints: boolean;
}

const G2 = GOOD.g2;
const G5 = GOOD.g5;

const design2 = (test: string, b: Setup, opts: { a?: Setup; compare?: [string, string]; question?: string } = {}): SproutRound => ({
  kind: "design",
  set: "g2",
  test,
  compare: opts.compare,
  a: opts.a ?? [...G2],
  b,
  question:
    opts.question ??
    (test === "light" ? "Does light help bean plants grow?" : test === "soil" ? "Do beans grow better in potting soil or in sand?" : "Do bean plants need water?"),
});

const spot2 = (test: string, a: Setup, b: Setup, question: string): SproutRound => ({ kind: "spot", set: "g2", test, a, b, question });

const design5 = (test: string, b: Setup, question: string, a: Setup = [...G5]): SproutRound => ({ kind: "design", set: "g5", test, a, b, question });

const BEAN: SproutRound = {
  kind: "weigh",
  story: "A bean seed was planted in a pot of soil. It got only water for 6 weeks.",
  unit: "g",
  plant: "bean plant",
  plantBefore: 1,
  plantAfter: 81,
  soilBefore: 2000,
  soilAfter: 1999,
  steps: ["gain", "loss", "air"],
};
const WILLOW: SproutRound = {
  kind: "weigh",
  story: "Long ago, Jan van Helmont planted a 5-pound willow tree in 200 pounds of dry soil. For 5 years he gave it only rainwater.",
  unit: "lb",
  plant: "willow tree",
  plantBefore: 5,
  plantAfter: 169,
  soilBefore: 200,
  soilAfter: 200,
  soilNote: "lost only about 2 ounces (much less than 1 pound)",
  steps: ["gain", "air"],
  airAccept: [163, 164],
};
const TOMATO: SproutRound = {
  kind: "weigh",
  story: "A tomato seedling grew in a big pot all summer. It got water, air and sunlight.",
  unit: "g",
  plant: "tomato plant",
  plantBefore: 2,
  plantAfter: 1502,
  soilBefore: 5000,
  soilAfter: 4996,
  steps: ["gain", "loss", "air"],
};

const lvl = (grade: number, id: string, title: string, intro: string, rounds: SproutRound[], hints = false): SproutLevel => ({ grade, id, title, intro, rounds, hints });

export const SPROUT_LEVELS: Record<number, SproutLevel[]> = {
  1: [
    lvl(
      1,
      "g1-1",
      "Build a Plant",
      "Skill: plant parts and their jobs (1-LS1-1). Build a plant from the ground up: roots, stem, leaves and a flower. Each part has a job!",
      [
        { kind: "build", plant: "sunflower", help: true },
        { kind: "job", job: "drink", plant: "sunflower" },
        { kind: "job", job: "food", plant: "sunflower" },
        { kind: "build", plant: "bean", help: true },
        { kind: "job", job: "seeds", plant: "bean" },
        { kind: "job", job: "standup", plant: "bean" },
      ],
      true,
    ),
    lvl(
      1,
      "g1-2",
      "Plant Jobs",
      "Skills: plant parts and their jobs (1-LS1-1), and baby plants look like their parents (1-LS3-1). Find the part that does each job.",
      [
        { kind: "build", plant: "tulip", help: false },
        { kind: "job", job: "hold", plant: "tulip" },
        { kind: "job", job: "carry", plant: "tulip" },
        { kind: "match", kinds: ["sunflower", "pine"] },
        { kind: "job", job: "food", plant: "bean" },
        { kind: "match", kinds: ["cactus", "corn"] },
      ],
    ),
    lvl(
      1,
      "g1-3",
      "Baby Plants",
      "Skill: young plants are like their parents, but not exactly the same (1-LS3-1). Look closely at the leaves and match each baby plant to its grown-up plant.",
      [
        { kind: "match", kinds: ["corn", "sunflower", "pine"] },
        { kind: "build", plant: "sunflower", help: false },
        { kind: "match", kinds: ["cactus", "pine", "sunflower", "corn"] },
        { kind: "job", job: "seeds", plant: "tulip" },
        { kind: "match", kinds: ["pine", "corn", "cactus", "sunflower"] },
        { kind: "job", job: "carry", plant: "bean" },
      ],
    ),
  ],
  2: [
    lvl(
      2,
      "g2-1",
      "Fair Test: Light",
      "Skill: plan a fair test to see what plants need (2-LS2-1). Change only ONE thing between the two pots and keep everything else the same.",
      [
        design2("light", [...G2]),
        spot2("light", [...G2], ["dark", "some", "potting"], "Ben wants to know if beans need light."),
        design2("water", [...G2], { compare: ["none", "some"] }),
        spot2("light", [...G2], ["dark", "none", "potting"], "Ava wants to know if beans need light."),
        design2("light", ["dark", "some", "sand"]),
      ],
      true,
    ),
    lvl(
      2,
      "g2-2",
      "Water Wise",
      "Skill: fair tests about water and soil (2-LS2-1). Plants need water, but can they get too much? Change one thing and compare.",
      [
        design2("water", ["sun", "lots", "sand"], { compare: ["none", "some"] }),
        spot2("water", [...G2], ["dark", "lots", "potting"], "Cal wants to know if too much water hurts beans."),
        design2("water", [...G2], { compare: ["some", "lots"], question: "Is more water always better for beans?" }),
        spot2("soil", [...G2], ["sun", "some", "sand"], "Dot wants to know if beans grow better in potting soil or sand."),
        design2("soil", ["dark", "some", "potting"]),
        spot2("water", [...G2], ["sun", "none", "sand"], "Eli wants to know if beans need water."),
      ],
    ),
    lvl(
      2,
      "g2-3",
      "Plant Scientist",
      "Skill: plan and check fair tests on your own (2-LS2-1). Fix the pots so only one thing is different, then read your results.",
      [
        design2("light", ["sun", "lots", "sand"], { a: ["dark", "some", "potting"] }),
        spot2("light", ["sun", "some", "sand"], ["dark", "some", "potting"], "Fay wants to know if beans need light."),
        design2("soil", ["sun", "none", "sand"], { a: ["dark", "some", "potting"] }),
        spot2("water", ["sun", "some", "sand"], ["sun", "lots", "sand"], "Gus wants to know if too much water hurts beans."),
        design2("water", ["dark", "lots", "potting"], { a: ["sun", "some", "sand"], compare: ["some", "lots"], question: "Is more water always better for beans?" }),
        spot2("soil", ["sun", "lots", "potting"], ["sun", "some", "sand"], "Hal wants to know if beans grow better in potting soil or sand."),
      ],
    ),
  ],
  5: [
    lvl(
      5,
      "g5-1",
      "The Willow Mystery",
      "Skill: plants get the materials they grow from mostly from air and water, not soil (5-LS1-1). Weigh the soil and the plant before and after, and follow the mass.",
      [
        BEAN,
        design5("air", [...G5], "Does a plant need carbon dioxide from the air to gain mass?"),
        WILLOW,
        design5("water", ["dark", "some", "normal"], "Does a plant need water to gain mass?"),
        TOMATO,
      ],
      true,
    ),
    lvl(
      5,
      "g5-2",
      "Energy From the Sun",
      "Skills: energy in food came from the Sun (5-PS3-1), and matter moves among plants, animals and decomposers (5-LS2-1). Trace the energy, step by step.",
      [
        { kind: "sort", web: "meadow", ids: ["grass", "rabbit", "fox", "mushroom"] },
        { kind: "chain", web: "meadow", target: "rabbit", decomposer: false },
        design5("light", ["sun", "none", "noco2"], "Does a plant need light energy to make food and gain mass?", ["dark", "some", "normal"]),
        { kind: "chain", web: "meadow", target: "fox", decomposer: false },
        { kind: "chain", web: "meadow", target: "fox", decomposer: true },
        { kind: "chain", web: "meadow", target: "owl", decomposer: false },
      ],
    ),
    lvl(
      5,
      "g5-3",
      "Food Web Lab",
      "Skills: food webs and decomposers (5-LS2-1), Sun energy in food (5-PS3-1) and where plant mass comes from (5-LS1-1). A pond and a meadow, with less help.",
      [
        { kind: "sort", web: "pond", ids: ["algae", "snail", "fish", "heron", "bacteria", "pondweed"] },
        { kind: "chain", web: "pond", target: "heron", decomposer: false },
        { kind: "chain", web: "pond", target: "fish", decomposer: true },
        { kind: "sort", web: "meadow", ids: ["oak", "deer", "owl", "bacteria", "mouse", "grass"] },
        design5("air", ["dark", "some", "normal"], "Does a plant need carbon dioxide from the air to gain mass?", ["sun", "none", "noco2"]),
        { kind: "chain", web: "meadow", target: "owl", decomposer: true },
      ],
    ),
  ],
};

export const ALL_SPROUT_LEVELS: SproutLevel[] = Object.values(SPROUT_LEVELS).flat();
export const levelById = (id: string) => ALL_SPROUT_LEVELS.find((l) => l.id === id);

// ---------------- Steps: prompts, answers and checks ----------------

export function stepCount(r: SproutRound): number {
  switch (r.kind) {
    case "build":
      return PARTS.length;
    case "match":
      return r.kinds.length;
    case "design":
      return 2;
    case "weigh":
      return r.steps.length;
    default:
      return 1;
  }
}

/** The values the two pots must have for the tested thing (when the question names them). */
function canonicalDesign(r: Extract<SproutRound, { kind: "design" }>): [Setup, Setup] {
  const i = varIndex(r.set, r.test);
  const vals = r.compare ?? (r.test === "water" && r.set === "g2" ? ["some", "none"] : [GOOD[r.set][i], VARS[r.set][i].values.find((v) => v.id !== GOOD[r.set][i])!.id]);
  const a = [...GOOD[r.set]];
  const b = [...GOOD[r.set]];
  a[i] = vals[0];
  b[i] = vals[1];
  return [a, b];
}

/** The design the kid ended up growing: their correct one, or the model one after 3 misses. */
export function designUsed(r: Extract<SproutRound, { kind: "design" }>, step0: string[]): [Setup, Setup] {
  const ok = step0.slice(0, MAX_TRIES).find((t) => checkStep(r, 0, t, []).ok);
  return (ok && parseDesign(r.set, ok)) || canonicalDesign(r);
}

export function resultAnswer(set: VarSet, [a, b]: [Setup, Setup]): "A" | "B" | "same" {
  const ga = grow(set, a, DAYS[set]).value;
  const gb = grow(set, b, DAYS[set]).value;
  return ga > gb ? "A" : gb > ga ? "B" : "same";
}

/** Things that differ between two pots, besides the tested one. */
export function extraDifferences(set: VarSet, test: string, a: Setup, b: Setup): string[] {
  return VARS[set].filter((v, i) => v.id !== test && a[i] !== b[i]).map((v) => v.id);
}

export const encodeSort = (tags: Record<string, string>) =>
  Object.entries(tags)
    .map(([k, v]) => `${k}=${v}`)
    .join(",");

export function parseSort(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of raw.split(",")) {
    const [k, v] = p.split("=");
    if (k && v && Object.prototype.hasOwnProperty.call(ORGS, k)) out[k] = v;
  }
  return out;
}

/** A shortest valid energy path for a chain round (for the "show me" answer and tests). */
export function modelChain(r: Extract<SproutRound, { kind: "chain" }>): string[] {
  const w = WEBS[r.web];
  const prev = new Map<string, string>();
  const queue = ["sun"];
  const seen = new Set(queue);
  while (queue.length) {
    const cur = queue.shift()!;
    if (cur === r.target) break;
    for (const n of w.orgs)
      if (!seen.has(n) && ORGS[n].role !== "D" && flows(r.web, cur, n)) {
        seen.add(n);
        prev.set(n, cur);
        queue.push(n);
      }
  }
  const path = [r.target];
  while (path[0] !== "sun" && prev.has(path[0])) path.unshift(prev.get(path[0])!);
  if (r.decomposer) path.push(w.orgs.find((o) => ORGS[o].role === "D")!);
  return path;
}

/** The right answer to a step, as the string the UI sends. */
export function answerFor(r: SproutRound, step: number, prev: string[][] = []): string {
  switch (r.kind) {
    case "build":
      return PARTS[step] ?? "";
    case "job":
      return JOBS[r.job].part;
    case "match":
      return r.kinds[step] ?? "";
    case "design":
      if (step === 0) return encodeDesign(...canonicalDesign(r));
      return resultAnswer(r.set, designUsed(r, prev[0] ?? []));
    case "spot": {
      const extra = extraDifferences(r.set, r.test, r.a, r.b);
      return extra[0] ?? "fair";
    }
    case "weigh": {
      const s = r.steps[step];
      const gain = r.plantAfter - r.plantBefore;
      const loss = r.soilBefore - r.soilAfter;
      return String(s === "gain" ? gain : s === "loss" ? loss : r.airAccept?.[r.airAccept.length - 1] ?? gain - loss);
    }
    case "sort":
      return encodeSort(Object.fromEntries(r.ids.map((id) => [id, ORGS[id].role])));
    case "chain":
      return modelChain(r).join(">");
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const the = (id: string) => `the ${ORGS[id]?.name ?? id}`;
const verb = (id: string, one: string, many: string) => (ORGS[id]?.plural ? many : one);

/** Checks one try. `prev` holds the tries of earlier steps in this round. Never throws. */
export function checkStep(r: SproutRound, step: number, ans: string, prev: string[][]): { ok: boolean; note: string } {
  const a = typeof ans === "string" ? ans : "";
  switch (r.kind) {
    case "build": {
      const want = PARTS[step];
      if (a === want) return { ok: true, note: `Yes! The ${PART_INFO[want].name} ${PART_INFO[want].does}.` };
      const got = PART_INFO[a as Part];
      if (!got) return { ok: false, note: "Tap a plant part." };
      return { ok: false, note: `That's the ${got.name}. It goes ${got.where}. Try another part!` };
    }
    case "job": {
      const want = JOBS[r.job].part;
      if (a === want) return { ok: true, note: `Yes! The ${PART_INFO[want].name} ${PART_INFO[want].does}.` };
      const got = PART_INFO[a as Part];
      if (!got) return { ok: false, note: "Tap a part of the plant." };
      return { ok: false, note: `That's the ${got.name}. Its job is to ${got.job}. Try again!` };
    }
    case "match": {
      const want = r.kinds[step];
      if (!want) return { ok: false, note: "" };
      if (a === want) return { ok: true, note: `Yes! A baby ${KIND_INFO[want].name} has ${KIND_INFO[want].clue}, like its parent, but it is much smaller.` };
      const got = KIND_INFO[a as Kind];
      if (!got) return { ok: false, note: "Tap a grown-up plant." };
      return { ok: false, note: `The ${got.name} has ${got.clue}. This baby plant has ${KIND_INFO[want].clue}. Look again!` };
    }
    case "design": {
      if (step === 1) {
        const used = designUsed(r, prev[0] ?? []);
        const want = resultAnswer(r.set, used);
        if (a === want) return { ok: true, note: "" };
        if (a !== "A" && a !== "B" && a !== "same") return { ok: false, note: "Tap a pot." };
        const unit = r.set === "g2" ? "green leaves" : "grams gained";
        const va = grow(r.set, used[0], DAYS[r.set]).value;
        const vb = grow(r.set, used[1], DAYS[r.set]).value;
        return { ok: false, note: `Look at the numbers: Pot A has ${va} ${unit} and Pot B has ${vb}. Which is more?` };
      }
      const d = parseDesign(r.set, a);
      if (!d) return { ok: false, note: "Set up both pots first." };
      const [pa, pb] = d;
      const i = varIndex(r.set, r.test);
      const tv = VARS[r.set][i];
      if (pa[i] === pb[i]) return { ok: false, note: `Both pots have the same ${tv.name}, so we can't see what ${tv.name} does. Make the ${tv.name} different.` };
      if (r.compare) {
        const vals = [pa[i], pb[i]].sort().join();
        if (vals !== [...r.compare].sort().join()) {
          const [x, y] = r.compare.map((v) => valueInfo(r.set, r.test, v)?.label.toLowerCase());
          return { ok: false, note: `This question compares ${x} with ${y}. Set one pot to each.` };
        }
      }
      const extra = extraDifferences(r.set, r.test, pa, pb);
      if (extra.length) {
        const names = extra.map((id) => VARS[r.set][varIndex(r.set, id)].name).join(" and the ");
        return { ok: false, note: `Not fair yet! The pots also have different ${names}. Change only the ${tv.name}; keep everything else the same.` };
      }
      return { ok: true, note: `Fair test! Only the ${tv.name} is different.` };
    }
    case "spot": {
      const want = answerFor(r, 0);
      const tv = VARS[r.set][varIndex(r.set, r.test)];
      if (a === want) {
        if (want === "fair") return { ok: true, note: `Yes, it's fair! Only the ${tv.name} is different, so any difference in growth comes from the ${tv.name}.` };
        const xv = VARS[r.set][varIndex(r.set, want)];
        return { ok: true, note: `Yes! The ${xv.name} is different too, so we can't tell if the ${tv.name} or the ${xv.name} made the difference. Not fair!` };
      }
      if (a === "fair") {
        const xv = VARS[r.set][varIndex(r.set, want)];
        return { ok: false, note: `Look again: is the ${xv.name} the same in both pots? Only the ${tv.name} should be different.` };
      }
      if (a === r.test) return { ok: false, note: `The ${tv.name} SHOULD be different: that's what we're testing. Look for something else that's different.` };
      if (varIndex(r.set, a) >= 0) return { ok: false, note: `The ${a} is the same in both pots, so that part is fair. Look again!` };
      return { ok: false, note: "Tap the thing that makes the test unfair, or tap Fair." };
    }
    case "weigh": {
      const s = r.steps[step];
      if (!s) return { ok: false, note: "" };
      const n = /^\d{1,6}$/.test(a.trim()) ? Number(a.trim()) : NaN;
      if (!Number.isFinite(n)) return { ok: false, note: "Type a whole number." };
      const gain = r.plantAfter - r.plantBefore;
      const loss = r.soilBefore - r.soilAfter;
      const u = r.unit === "lb" ? "pounds" : "grams";
      if (s === "gain") {
        if (n === gain) return { ok: true, note: `Yes! ${r.plantAfter} − ${r.plantBefore} = ${gain} ${u} gained.` };
        if (n === r.plantAfter) return { ok: false, note: `That's what it weighs now. Subtract what it weighed at the start: ${r.plantAfter} − ${r.plantBefore}.` };
        return { ok: false, note: `Gained = after − before. Try ${r.plantAfter} − ${r.plantBefore}.` };
      }
      if (s === "loss") {
        if (n === loss) return { ok: true, note: `Yes! The soil lost only ${loss} ${u}.` };
        return { ok: false, note: `Lost = before − after. Try ${r.soilBefore} − ${r.soilAfter}.` };
      }
      const accept = r.airAccept ?? [gain - loss];
      if (accept.includes(n)) return { ok: true, note: `Yes! About ${accept[accept.length - 1]} ${u} came from somewhere other than the soil.` };
      return {
        ok: false,
        note: r.soilNote
          ? `The soil lost less than 1 pound, so almost all of the ${gain} pounds came from somewhere else.`
          : `The plant gained ${gain} ${u}, but only ${loss} came from the soil. ${gain} − ${loss} = ?`,
      };
    }
    case "sort": {
      const tags = parseSort(a);
      const missing = r.ids.filter((id) => !tags[id]);
      if (missing.length) return { ok: false, note: `Tag every living thing. ${cap(the(missing[0]))} still ${verb(missing[0], "needs", "need")} a tag.` };
      const wrong = r.ids.find((id) => tags[id] !== ORGS[id].role);
      if (!wrong) return { ok: true, note: "" };
      return { ok: false, note: `Look at ${the(wrong)} again: think about how ${verb(wrong, "it gets its", "they get their")} energy.` };
    }
    case "chain": {
      const path = a.split(">").filter(Boolean);
      const w = WEBS[r.web];
      if (!path.length || path[0] !== "sun") return { ok: false, note: "Start with the Sun: all the energy in this food web comes from sunlight." };
      if (path.some((p) => !w.orgs.includes(p)) || path.length > 8) return { ok: false, note: "Use the living things in this food web." };
      if (new Set(path).size !== path.length) return { ok: false, note: "Each living thing should be in your path only once." };
      for (let i = 0; i + 1 < path.length; i++) {
        const [x, y] = [path[i], path[i + 1]];
        if (flows(r.web, x, y)) continue;
        if (x === "sun") return { ok: false, note: `Only producers like plants and algae catch the Sun's energy. ${cap(the(y))} can't use sunlight to make food.` };
        if (ORGS[x].role === "D") return { ok: false, note: `Decomposers come last: they break down dead things. Nothing in this web eats ${the(x)}.` };
        if (flows(r.web, y, x)) return { ok: false, note: `${cap(the(x))} ${verb(x, "eats", "eat")} ${the(y)}, so energy flows from ${the(y)} to ${the(x)}, not the other way.` };
        return { ok: false, note: `${cap(the(y))} ${verb(y, "doesn't", "don't")} eat ${the(x)}. Energy moves only when one living thing eats another.` };
      }
      const last = path[path.length - 1];
      const endsD = ORGS[last].role === "D";
      if (r.decomposer && !endsD) return { ok: false, note: "Don't stop yet! When living things die, decomposers break them down. Add a decomposer at the end." };
      if (!r.decomposer && endsD) return { ok: false, note: `This time, stop at ${the(r.target)}. Take the decomposer off the end.` };
      const end = r.decomposer ? path[path.length - 2] : last;
      if (end !== r.target) return { ok: false, note: `Keep going until the energy reaches ${the(r.target)}.` };
      return { ok: true, note: "" };
    }
  }
}

/** What to say when a step starts. */
export function promptFor(level: SproutLevel, r: SproutRound, step: number): string {
  switch (r.kind) {
    case "build": {
      const plant = FLOWER_COLORS[r.plant].name;
      if (r.help)
        return [
          `Let's build a ${plant} from the ground up! Which part goes under the soil and drinks water?`,
          "Which part grows up out of the soil and holds the plant up?",
          "Which part catches sunlight to make food?",
          "Which part goes on top and makes seeds?",
        ][step] ?? "";
      return [`Build a ${plant}! Which part goes first, under the soil?`, "Which part comes next, going up?", "Which part comes next?", "Which part goes on top?"][step] ?? "";
    }
    case "job":
      return JOBS[r.job].ask;
    case "match": {
      const k = r.kinds[step];
      if (!k) return "";
      return level.hints || level.id === "g1-2"
        ? `This baby plant has ${KIND_INFO[k].clue}. Tap the grown-up plant it will grow into.`
        : "Look closely at this baby plant's leaves. Which grown-up plant will it become?";
    }
    case "design": {
      const tv = VARS[r.set][varIndex(r.set, r.test)];
      if (step === 0)
        return `${r.question} Set up the two pots. ${level.hints ? `Change only the ${tv.name}, and keep everything else the same.` : "Make it a fair test."} Then start the test.`;
      return r.set === "g2" ? `Day ${DAYS.g2}! Which pot grew more green leaves? Tap it.` : `Day ${DAYS.g5}! Which plant gained more mass? Tap it.`;
    }
    case "spot":
      return `${r.question} Is this test fair? Tap the thing that makes it unfair, or tap Fair.`;
    case "weigh": {
      const s = r.steps[step];
      const u = r.unit === "lb" ? "pounds" : "grams";
      const intro = step === 0 ? `${r.story} ` : "";
      if (s === "gain") return `${intro}How many ${u} did the ${r.plant} gain?`;
      if (s === "loss") return `${intro}How many ${u} did the soil lose?`;
      return `${intro}${r.soilNote ? `The soil ${r.soilNote}. ` : ""}So about how many ${u} of the plant's new mass came from air and water, not soil?`;
    }
    case "sort":
      return "Tag each living thing: is it a producer, a consumer or a decomposer? Tap to change a tag, then check.";
    case "chain":
      return r.decomposer
        ? `Follow the energy from the Sun to ${the(r.target)}, and then to a decomposer. Tap them in order.`
        : `Follow the energy from the Sun to ${the(r.target)}. Tap each living thing in order.`;
  }
}

/** What the round teaches, shown when it ends. */
export function teachFor(r: SproutRound, prev: string[][] = []): string {
  switch (r.kind) {
    case "build":
      return "Roots drink water, the stem holds the plant up, leaves make food from sunlight, and the flower makes seeds.";
    case "job": {
      const p = JOBS[r.job].part;
      return `The ${PART_INFO[p].name} ${PART_INFO[p].does}.`;
    }
    case "match":
      return "Baby plants look like their parents, but not exactly: they are smaller, and the same kind of plant can still look a little different.";
    case "design": {
      const used = designUsed(r, prev[0] ?? []);
      const tv = VARS[r.set][varIndex(r.set, r.test)];
      const unit = r.set === "g2" ? "green leaves" : "grams";
      const va = grow(r.set, used[0], DAYS[r.set]).value;
      const vb = grow(r.set, used[1], DAYS[r.set]).value;
      const fmt = (v: number) => (r.set === "g5" && v > 0 ? `+${v}` : String(v));
      const nums = `Pot A: ${fmt(va)} ${unit}. Pot B: ${fmt(vb)} ${unit}.`;
      if (va === vb) return `${nums} Both pots grew the same. ${whyGrowth(r.set, used[0])} Give both pots what plants need, so the ${tv.name} is the only thing that can make a difference.`;
      const worse = va < vb ? used[0] : used[1];
      return `${nums} The only difference was the ${tv.name}, so the ${tv.name} caused it. ${whyGrowth(r.set, worse)}`;
    }
    case "spot": {
      const extra = extraDifferences(r.set, r.test, r.a, r.b);
      return extra.length ? "In a fair test, you change only one thing. Then you know what made the difference." : "A fair test changes just one thing and keeps the rest the same.";
    }
    case "weigh":
      return r.unit === "lb"
        ? "Van Helmont thought the mass came from the water. Today we know a plant builds its body mostly from carbon dioxide in the air, plus water. Soil gives only a pinch of minerals."
        : `The soil hardly changed, but the plant gained ${r.plantAfter - r.plantBefore} grams. Plants build their bodies from carbon dioxide in the air and water, using light energy. Soil adds only a few minerals.`;
    case "sort":
      return (["P", "C", "D"] as const)
        .map((role) => r.ids.find((id) => ORGS[id].role === role))
        .filter((id): id is string => !!id)
        .map((id) => `${cap(the(id))} ${ROLE_WHY[ORGS[id].role as "P" | "C" | "D"][ORGS[id].plural ? 1 : 0]}.`)
        .join(" ");
    case "chain":
      return r.decomposer
        ? "The Sun's energy went into the plant's food, then to each animal that ate, and decomposers break down what's left. They return the matter to the soil so new plants can grow."
        : "Every bite of food carries energy that first came from the Sun. Plants catch it; animals get it by eating plants or other animals.";
  }
}

// ---------------- Moves and scoring ----------------

export interface RoundMove {
  /** tries[step] = the answers the kid tried for that step, in order. */
  tries: string[][];
}

export interface RoundResult {
  points: number;
  firstTry: boolean;
  solved: boolean;
}

/** Cleans untrusted moves from the browser. Never throws. */
export function cleanMoves(raw: unknown): RoundMove[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 12).map((m) => {
    const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
    const steps = Array.isArray(o.tries) ? o.tries.slice(0, 8) : [];
    return {
      tries: steps.map((s) => (Array.isArray(s) ? s.slice(0, MAX_TRIES).map((t) => (typeof t === "string" ? t.slice(0, 160) : "")) : [])),
    };
  });
}

export function scoreRound(r: SproutRound, move: RoundMove | undefined): RoundResult {
  const n = stepCount(r);
  if (!move) return { points: 0, firstTry: false, solved: false };
  let solved = true;
  let firstTry = true;
  for (let s = 0; s < n; s++) {
    const tries = (move.tries[s] ?? []).slice(0, MAX_TRIES);
    const at = tries.findIndex((t) => checkStep(r, s, t, move.tries.slice(0, s)).ok);
    if (at < 0) solved = false;
    if (at !== 0) firstTry = false;
  }
  return { points: solved ? (firstTry ? 2 : 1) : 0, firstTry: solved && firstTry, solved };
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

export function replay(level: SproutLevel, raw: unknown): { rounds: RoundResult[]; points: number; max: number; stars: number } {
  const moves = cleanMoves(raw);
  const rounds = level.rounds.map((r, i) => scoreRound(r, moves[i]));
  const points = rounds.reduce((s, r) => s + r.points, 0);
  const max = level.rounds.length * 2;
  return { rounds, points, max, stars: starsFor(points, max) };
}

/** A perfect game (for tests). */
export function perfectMoves(level: SproutLevel): RoundMove[] {
  return level.rounds.map((r) => {
    const tries: string[][] = [];
    for (let s = 0; s < stepCount(r); s++) tries.push([answerFor(r, s, tries)]);
    return { tries };
  });
}

// ---------------- Pixel art ----------------

const OUT = "#1b1530";
const STEM = "#2f9e44";
const LEAF = "#51cf66";
const LEAF_DARK = "#2b8a3e";
const PALE = "#e9e3a1";
const ROOT = "#c9a26b";

/** One plant part, 20 pixels wide, with the stem centered (x 9-10) so parts stack into a plant. */
export function partGrid(part: Part, plant: BuildPlant = "sunflower"): Grid {
  switch (part) {
    case "roots": {
      const g = new Grid(20, 10);
      g.rect(9, 0, 2, 7, ROOT);
      for (let i = 0; i < 5; i++) {
        g.set(8 - i, 2 + i, ROOT).set(11 + i, 2 + i, ROOT);
        g.set(7 - Math.floor(i / 2), 5 + i, ROOT).set(12 + Math.floor(i / 2), 5 + i, ROOT);
      }
      g.set(9, 8, ROOT).set(10, 9, ROOT);
      return g.outline(OUT);
    }
    case "stem": {
      const g = new Grid(20, 9);
      g.rect(9, 0, 2, 9, STEM);
      return g.outline(OUT);
    }
    case "leaves": {
      const g = new Grid(20, 11);
      g.rect(9, 0, 2, 11, STEM);
      g.disc(5, 5, 3.2, LEAF).disc(7.5, 5, 1.6, LEAF);
      g.disc(14, 4, 3.2, LEAF).disc(11.5, 4, 1.6, LEAF);
      for (let x = 3; x <= 8; x++) g.set(x, 5, LEAF_DARK);
      for (let x = 11; x <= 16; x++) g.set(x, 4, LEAF_DARK);
      return g.outline(OUT);
    }
    case "flower": {
      const c = FLOWER_COLORS[plant];
      const g = new Grid(20, 14);
      g.rect(9, 11, 2, 3, STEM);
      if (plant === "tulip") {
        g.disc(10, 6, 4, c.petal).tri(7, 1, 5, 1, c.petal).tri(10, 0, 5, 1, c.petal).tri(13, 1, 5, 1, c.petal);
        g.rect(10, 3, 1, 6, c.middle);
      } else {
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * Math.PI * 2;
          g.disc(10 + Math.cos(a) * 3.6, 6 + Math.sin(a) * 3.6, 2, c.petal);
        }
        g.disc(10, 6, 2.4, c.middle);
      }
      return g.outline(OUT);
    }
  }
}

/** A baby plant (16x16). */
export function seedlingGrid(k: Kind): Grid {
  const g = new Grid(16, 16);
  switch (k) {
    case "sunflower":
      g.rect(7, 8, 2, 8, STEM);
      g.disc(4, 8, 2.6, LEAF).disc(11, 8, 2.6, LEAF).disc(7.5, 4.5, 2, LEAF_DARK);
      break;
    case "pine":
      g.rect(7, 8, 2, 8, "#8a5a2b");
      // a tuft of thin needles fanning out from the top of the stem
      for (let i = 1; i <= 5; i++) {
        g.set(7 - i, 8 - i, "#1e6b30").set(8 + i, 8 - i, "#1e6b30");
        g.set(7 - i, 8 - Math.ceil(i / 2), "#1e6b30").set(8 + i, 8 - Math.ceil(i / 2), "#1e6b30");
        if (i <= 4) g.set(7 - Math.floor(i / 2), 7 - i, "#1e6b30").set(8 + Math.floor(i / 2), 7 - i, "#1e6b30");
      }
      break;
    case "corn":
      g.rect(7, 10, 2, 6, STEM);
      for (let i = 0; i < 9; i++) {
        g.set(7 - Math.floor(i / 2), 10 - i, "#74c365").set(6 - Math.floor(i / 2), 10 - i, "#74c365");
        g.set(8 + Math.floor(i / 1.6), 11 - i, "#74c365");
      }
      break;
    case "cactus":
      g.disc(8, 11, 4.4, "#37b24d").rect(4, 13, 9, 3, "#37b24d");
      for (const [x, y] of [[6, 8], [10, 8], [5, 11], [8, 10], [11, 12], [7, 13]] as const) g.set(x, y, "#ffffff");
      break;
  }
  return g.outline(OUT);
}

/** A grown plant (24x30). */
export function grownGrid(k: Kind): Grid {
  const g = new Grid(24, 30);
  switch (k) {
    case "sunflower":
      g.rect(11, 8, 2, 22, STEM);
      g.disc(6.5, 18, 3.5, LEAF).disc(17, 14, 3.5, LEAF).disc(6.5, 25, 3, LEAF);
      for (let a = 0; a < 12; a++) g.disc(12 + Math.cos((a / 12) * 6.283) * 4.5, 6 + Math.sin((a / 12) * 6.283) * 4.5, 1.8, "#fcc419");
      g.disc(12, 6, 3.2, "#7a4a1d");
      break;
    case "pine":
      g.rect(10, 24, 4, 6, "#8a5a2b");
      g.tri(12, 1, 9, 5, "#2b8a3e").tri(12, 6, 15, 8, "#237a37").tri(12, 11, 23, 11, "#1e6b30");
      break;
    case "corn":
      g.rect(11, 4, 2, 26, STEM);
      for (let i = 0; i < 9; i++) {
        g.set(10 - i, 14 + Math.floor(i / 2), "#74c365").set(10 - i, 13 + Math.floor(i / 2), "#74c365");
        g.set(13 + i, 20 + Math.floor(i / 2), "#74c365").set(13 + i, 19 + Math.floor(i / 2), "#74c365");
        if (i < 7) g.set(13 + i, 8 + Math.floor(i / 2), "#74c365");
      }
      g.rect(13, 12, 3, 6, "#ffd43b").rect(13, 11, 3, 1, "#74c365");
      for (const x of [10, 12, 14]) g.rect(x, 0, 1, 4, "#c9a26b");
      break;
    case "cactus":
      g.rect(9, 7, 6, 23, "#37b24d").disc(11.5, 7, 3, "#37b24d");
      g.rect(3, 9, 3, 9, "#37b24d").rect(3, 16, 6, 3, "#37b24d").disc(4, 9, 1.5, "#37b24d");
      g.rect(18, 5, 3, 10, "#37b24d").rect(15, 12, 5, 3, "#37b24d").disc(19, 5, 1.5, "#37b24d");
      for (let y = 9; y < 29; y += 3) g.set(10 + (y % 2), y, "#ffffff").set(13 - (y % 2), y + 1, "#ffffff");
      g.disc(11.5, 4, 1.5, "#f783ac");
      break;
  }
  return g.outline(OUT);
}

/** A pot in the lab with a bean growing in it (20x30). */
export function potGrid(set: VarSet, s: Setup, day: number): Grid {
  const gr = grow(set, s, day);
  const water = valueOf(set, s, "water");
  const soil = set === "g2" ? valueOf(set, s, "soil") : "potting";
  const g = new Grid(20, 30);
  // pot
  for (let y = 21; y < 30; y++) {
    const inset = Math.floor((y - 21) / 3);
    g.rect(2 + inset, y, 16 - inset * 2, 1, "#d9773b");
  }
  g.rect(1, 20, 18, 2, "#e8915a");
  const soilColor = soil === "sand" ? "#f2d27a" : water === "lots" ? "#3b2a1e" : water === "none" ? "#b08d6a" : "#6b4423";
  g.rect(2, 19, 16, 1, soilColor);
  if (water === "lots") g.set(5, 19, "#74c0fc").set(13, 19, "#74c0fc");
  // plant
  const top = 19 - gr.stem;
  if (gr.look === "seed" || gr.stem === 0) {
    g.disc(10, 18, 1.4, "#c8a27a");
  } else {
    const stemCol = gr.look === "pale" ? PALE : gr.look === "dry" ? "#a68a5b" : STEM;
    g.rect(9, top, 2, gr.stem, stemCol);
    if (gr.look === "pale") g.set(8, top, PALE).set(11, top, PALE);
    else if (gr.look === "dry") g.set(7, top + 1, "#a68a5b").set(12, top + 1, "#a68a5b").set(6, top + 2, "#a68a5b").set(13, top + 2, "#a68a5b");
    else {
      const leaves = set === "g2" ? gr.value : Math.max(2, Math.round((gr.value + 6) / 8));
      const shown = Math.min(6, leaves);
      for (let i = 0; i < shown; i++) {
        const y = 18 - Math.floor(((i + 1) * (gr.stem - 1)) / (shown + 1));
        const left = i % 2 === 0;
        g.disc(left ? 6.5 : 13.5, y, 1.7, i % 3 === 2 ? LEAF_DARK : LEAF);
      }
    }
  }
  return g.outline(OUT);
}

export const sproutLab: MiniGame = {
  ...sproutLabInfo,
  levels: () => [],
  levelsForGrade: (grade) => (SPROUT_LEVELS[grade] ?? []).map(({ id, title, intro }) => ({ id, title, intro })),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      return { stars: r.stars, best: r.points };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
