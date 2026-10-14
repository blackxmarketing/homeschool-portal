import type { GameEvidence, MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";
import { seededRng, shuffle, type Rng } from "../curriculum/math";

/**
 * XP Rush: Facts. Flash cards as a race.
 *
 * One level is one fact family - the 1s, the 2s, up to the 12s - for one
 * operation, and the coins after them. The kid answers; their pet runs. A
 * right answer is a post gone by, and a quick one is a sprint. A wrong answer
 * stops them where they stand, shows the answer, and puts that card back in
 * the pile to come round again.
 *
 * The level is over when every card in the family has been answered right
 * twice, which is why a kid who knows the 2s is through in a minute and a kid
 * who does not gets the repeats on exactly the cards they missed.
 *
 * Nothing here trusts the browser. The kid's answers travel as numbers and a
 * time each, and the server rebuilds the same pile from the same seed and
 * walks it again - so the only way to a three-star run is to have answered.
 */

export const factRushInfo = {
  id: "factrush",
  title: "XP Rush: Facts",
  icon: "⚡",
  land: "math" as const,
  subject: "math" as const,
  grades: [0, 1, 2, 3, 4, 5],
  // Drill: three stars before the next family opens. Running ahead of facts
  // you do not know is the one thing this game exists to prevent.
  unlockAt: 3,
  ownIntro: true,
  blurb: "Your pet is caged at the end of the level. Answer the cards to run to them - and the faster you answer, the faster you run.",
};

// ---------------- The cards ----------------

export type Op = "+" | "-" | "x" | "/";

export interface Fact {
  a: number;
  op: Op;
  b: number;
  answer: number;
  /** What the kid reads: "7 x 3". */
  text: string;
}

/** How many times a card has to come up right before it is done with. */
export const NEED = 2;

/** A runaway level is a bug, not a lesson. */
export const MAX_ASKS = 160;

/** The biggest family, and the biggest second number in one. */
export const TOP = 12;

const SIGN: Record<Op, string> = { "+": "+", "-": "−", x: "×", "/": "÷" };

const fact = (a: number, op: Op, b: number): Fact => ({
  a,
  op,
  b,
  answer: op === "+" ? a + b : op === "-" ? a - b : op === "x" ? a * b : a / b,
  text: `${a} ${SIGN[op]} ${b}`,
});

/**
 * One family of cards.
 *
 * Adding and multiplying are the family number against 1 to 12. Taking away
 * and sharing out are those same facts turned round, so the 3s of subtraction
 * are what undoes the 3s of addition - which is the point of learning them
 * next to each other.
 */
export function familyFacts(op: Op, n: number): Fact[] {
  const out: Fact[] = [];
  for (let k = 1; k <= TOP; k++) {
    if (op === "+") out.push(fact(n, "+", k));
    else if (op === "x") out.push(fact(n, "x", k));
    else if (op === "-") out.push(fact(n + k, "-", n));
    else out.push(fact(n * k, "/", n));
  }
  return out;
}

/** The coins, named the way the levels say them. */
const COIN_NAMES: Record<number, [string, string]> = {
  1: ["penny", "pennies"],
  5: ["nickel", "nickels"],
  10: ["dime", "dimes"],
  25: ["quarter", "quarters"],
};

/** "3 dimes" is a card too: how much is it worth? */
function coinFacts(cents: number, upTo: number): Fact[] {
  const [one, many] = COIN_NAMES[cents];
  const out: Fact[] = [];
  for (let k = 1; k <= upTo; k++) {
    out.push({ a: k, op: "x", b: cents, answer: k * cents, text: k === 1 ? `1 ${one}` : `${k} ${many}` });
  }
  return out;
}

/**
 * Handfuls of coins adding up to a dollar or less. Built once, in a fixed
 * order, so the pile is the same every time this level is played.
 */
function purseFacts(): Fact[] {
  const out: Fact[] = [];
  const add = (q: number, d: number, n: number, p: number) => {
    const cents = q * 25 + d * 10 + n * 5 + p;
    if (cents < 1 || cents > 100) return;
    const bits: string[] = [];
    if (q) bits.push(q === 1 ? "1 quarter" : `${q} quarters`);
    if (d) bits.push(d === 1 ? "1 dime" : `${d} dimes`);
    if (n) bits.push(n === 1 ? "1 nickel" : `${n} nickels`);
    if (p) bits.push(p === 1 ? "1 penny" : `${p} pennies`);
    out.push({ a: cents, op: "+", b: 0, answer: cents, text: bits.join(" + ") });
  };
  add(0, 1, 1, 0);
  add(0, 2, 1, 0);
  add(1, 1, 0, 0);
  add(1, 0, 1, 0);
  add(1, 2, 0, 0);
  add(2, 0, 0, 0);
  add(2, 1, 1, 0);
  add(3, 0, 0, 0);
  add(3, 1, 0, 0);
  add(2, 2, 1, 0);
  add(1, 1, 1, 1);
  add(3, 2, 1, 0);
  return out;
}

// ---------------- The levels ----------------

export interface FactLevel extends MiniLevel {
  grade: number;
  /** The curriculum skill or lesson this drills, same words as the lessons use. */
  skill: string;
  cards: Fact[];
  /**
   * Draw this many cards from the pack instead of using all of them. A
   * dungeon holds every fact of its operation - 144 of them - and asks a
   * different two dozen each time, so it cannot be learned by rote.
   */
  sample?: number;
  /**
   * How many times a card has to come up right. Two for a drill, where the
   * point is to wear the fact in; one for a dungeon, where the point is to
   * find out what is already there.
   */
  need?: number;
  /** Drawn as a dungeon rather than a run in the sunshine. */
  dungeon?: boolean;
}

/** How many right answers a card in this level needs. */
export const needOf = (level: FactLevel) => level.need ?? NEED;

/** How many cards this level draws from its pack. */
export const drawOf = (level: FactLevel) => Math.min(level.sample ?? level.cards.length, level.cards.length);

const OP_WORD: Record<Op, string> = { "+": "Adding", "-": "Taking away", x: "Times", "/": "Sharing" };
/** The same words with the capitals a title wants. */
const DUNGEON_WORD: Record<Op, string> = { "+": "Adding", "-": "Taking Away", x: "Times", "/": "Sharing" };

const opLevel = (op: Op, n: number, grade: number, skill: string): FactLevel => ({
  id: `fr-${op === "x" ? "x" : op === "/" ? "d" : op === "+" ? "a" : "s"}${n}`,
  title: `${OP_WORD[op]} ${n}${op === "/" ? "s" : "s"}`,
  intro:
    op === "+"
      ? `Skill: adding ${n} to every number up to twelve. Answer the card and your pet runs. Get it wrong and you stop where you are - and that card comes back round.`
      : op === "-"
        ? `Skill: taking ${n} away. Every card here undoes one of the adding ${n}s, which is why they are worth learning side by side.`
        : op === "x"
          ? `Skill: the ${n} times table, by heart. The quicker you know it, the quicker your pet runs.`
          : `Skill: sharing into ${n}s - the ${n} times table backwards. If you know ${n} times four is ${n * 4}, you already know this one.`,
  grade,
  skill,
  cards: familyFacts(op, n),
});

const coinLevel = (id: string, title: string, intro: string, cards: Fact[]): FactLevel => ({
  id,
  title,
  intro,
  grade: 5,
  skill: "math-2.time-money",
  cards,
});

/**
 * The dungeon at the end of a set: every fact of that operation in one pack,
 * two dozen drawn at a time, each one wanted right once. It is not a drill -
 * it is the room where you find out which of the twelve families actually
 * stuck.
 */
const dungeon = (op: Op, grade: number, skill: string): FactLevel => ({
  id: `fr-${op === "x" ? "x" : op === "/" ? "d" : op === "+" ? "a" : "s"}dun`,
  title: `The ${DUNGEON_WORD[op]} Dungeon`,
  intro: `Every ${OP_WORD[op].toLowerCase()} fact from the ones to the twelves, all mixed together, and two dozen of them drawn at random. No warm-up and no pattern to lean on - this is the room that tells you which ones really stuck.`,
  grade,
  skill,
  cards: Array.from({ length: TOP }, (_, i) => familyFacts(op, i + 1)).flat(),
  sample: 24,
  // One right answer each: a dungeon is asking what you know, not teaching it.
  need: 1,
  dungeon: true,
});

const family = (op: Op, grade: number, skill: string) => Array.from({ length: TOP }, (_, i) => opLevel(op, i + 1, grade, skill));

/**
 * The ladder: all twelve families of one operation before the next starts,
 * and the coins at the end. Grades are what order it, not who may play it -
 * everybody starts at adding 1s, same as the other XP Rush.
 */
export const ALL_FACT_LEVELS: FactLevel[] = [
  ...family("+", 1, "math-2.facts-20"),
  dungeon("+", 1, "math-2.facts-20"),
  ...family("-", 2, "math-2.facts-20"),
  dungeon("-", 2, "math-2.facts-20"),
  ...family("x", 3, "g3.mult-facts"),
  dungeon("x", 3, "g3.mult-facts"),
  ...family("/", 4, "g3.div-facts"),
  dungeon("/", 4, "g3.div-facts"),
  coinLevel("fr-c1", "Pennies", "Skill: counting on in ones. How much is a handful of pennies worth?", coinFacts(1, TOP)),
  coinLevel("fr-c5", "Nickels", "Skill: counting on in fives. A nickel is five cents, so three of them is three fives.", coinFacts(5, TOP)),
  coinLevel("fr-c10", "Dimes", "Skill: counting on in tens. A dime is ten cents - ten of them make a dollar.", coinFacts(10, 10)),
  coinLevel("fr-c25", "Quarters", "Skill: counting on in twenty-fives. Four quarters make a dollar.", coinFacts(25, 4)),
  coinLevel("fr-cmix", "The Whole Purse", "Skill: adding coins of different kinds, up to a dollar. Start with the biggest coin and count on from there.", purseFacts()),
];

export const levelById = (id: string): FactLevel | undefined => ALL_FACT_LEVELS.find((l) => l.id === id);

// ---------------- The pile ----------------

export interface Seat {
  /** Which card, by its place in the level. */
  i: number;
  /** How many times it has come up right in a row. */
  got: number;
}

/** The pile at the start: the level's cards, mixed up, as many as it draws. */
export function openingPile(level: FactLevel, seed: number): Seat[] {
  const r: Rng = seededRng((seed >>> 0) * 31 + 7);
  return shuffle(
    r,
    level.cards.map((_, i) => i),
  )
    .slice(0, drawOf(level))
    .map((i) => ({ i, got: 0 }));
}

/**
 * What happens to the pile after one answer.
 *
 * Right, and the card has had enough: it leaves. Right but not enough yet, or
 * wrong: it goes to the back to come round again. Wrong also wipes what it had
 * banked, because a card you just missed is not a card you know.
 */
export function afterAnswer(pile: Seat[], right: boolean, need = NEED): Seat[] {
  const [head, ...rest] = pile;
  if (!head) return pile;
  const got = right ? head.got + 1 : 0;
  if (right && got >= need) return rest;
  return [...rest, { i: head.i, got }];
}

// ---------------- Playing ----------------

/** A quick answer is worth more than a slow one, and shows as a sprint. */
export const SPRINT_MS = 2500;
export const TROT_MS = 5000;

export const RIGHT = 2;
export const SPRINT_BONUS = 2;
export const TROT_BONUS = 1;
export const FINISH_BONUS = 6;

/** Three lives, and three wrong answers costs one of them. */
export const LIVES = 3;
export const STRIKES = 3;

/** A token every so many blocks. Pick one up and you grow. */
export const TOKEN_EVERY = 7;

/** Whether the block you have just reached has a token standing on it. */
export const tokenOn = (post: number) => post > 0 && post % TOKEN_EVERY === 0;

export type Hazard = "hole" | "river" | "mountain";

/**
 * What is in the way at a given block.
 *
 * The pattern is fixed rather than seeded, so a kid who plays a level twice
 * runs the same ground twice and can see themselves getting further. It is
 * scenery with a jump attached, not a second thing to fail at - the only way
 * to fall behind here is to not know the fact.
 */
export function hazardAt(block: number): Hazard | null {
  if (block % 7 === 3) return "hole";
  if (block % 11 === 5) return "river";
  if (block % 9 === 6) return "mountain";
  return null;
}

/**
 * How hard a kid wants it. Theirs to pick, every time they play.
 *
 * Easy has nothing chasing them. Medium has something, but it only closes in
 * when they get a card wrong, so taking a while to think costs nothing.
 * Hard counts dawdling against them as well.
 */
export type Pace = "easy" | "medium" | "hard";
export const PACES: Pace[] = ["easy", "medium", "hard"];

/** How far back it starts, by pace. Easy never starts at all. */
export const CHASE_FROM: Record<Pace, number> = { easy: 0, medium: 5, hard: 3 };
/** How many cards it keeps after you before it gives up. */
export const CHASE_LEN = 7;
/** How many times it comes in over a level. */
export const HUNTS = 3;

/**
 * The blocks where something starts chasing them, off the level's own seed -
 * so it is somewhere different on every level and every run, but the server
 * works out the same places from the same seed.
 */
export function huntBlocks(level: FactLevel, seed: number, pace: Pace): number[] {
  if (pace === "easy") return [];
  const total = postsOn(level);
  const r: Rng = seededRng((seed >>> 0) * 7919 + 13);
  const out = new Set<number>();
  // Never in the first couple of blocks: let them get going first.
  for (let i = 0; i < HUNTS * 3 && out.size < HUNTS; i++) {
    const at = 2 + Math.floor(r() * Math.max(1, total - 4));
    if (![...out].some((x) => Math.abs(x - at) < CHASE_LEN)) out.add(at);
  }
  return [...out].sort((a, b) => a - b);
}

export interface Answer {
  /** What they typed. */
  a: number;
  /** How long they took, in milliseconds. */
  ms: number;
}

export interface FactMove {
  seed: number;
  answers: Answer[];
  /** The pace the kid chose. It changes what can catch them, so it is scored. */
  pace?: Pace;
}

/** How fast that answer was, which is what the pet does about it. */
export const paceOf = (ms: number): "sprint" | "run" | "trot" => (ms <= SPRINT_MS ? "sprint" : ms <= TROT_MS ? "run" : "trot");

const pointsFor = (ms: number) => RIGHT + (ms <= SPRINT_MS ? SPRINT_BONUS : ms <= TROT_MS ? TROT_BONUS : 0);

/** Every post on the track: one per right answer the level needs. */
export const postsOn = (level: FactLevel) => drawOf(level) * needOf(level);

export interface Run {
  /** Blocks gone by: right answers, which is how far they have run. */
  posts: number;
  wrong: number;
  points: number;
  /** True when the pile emptied - every card answered as many times as it needed. */
  finished: boolean;
  /** Lives left. Out of lives ends the run where it stands. */
  lives: number;
  /** Wrong answers since the last life went. */
  strikes: number;
  /** Grown by a token: the next life you would lose costs you this instead. */
  big: boolean;
  /** True when the lives ran out before the cards did. */
  over: boolean;
  /** How far back the thing chasing them is, or null when nothing is. */
  chase: number | null;
  /** How many times it has had them. */
  caught: number;
  pace: Pace;
}

/**
 * Walk a kid's answers through the pile. The one place a run is judged, used
 * by the screen to draw it and by the server to score it, so they cannot
 * come to different answers.
 */
export function play(level: FactLevel, move: FactMove): Run {
  const pace = move.pace ?? "medium";
  const hunts = huntBlocks(level, move.seed, pace);
  const from = CHASE_FROM[pace];
  let pile = openingPile(level, move.seed);
  let posts = 0;
  let wrong = 0;
  let points = 0;
  let lives = LIVES;
  let strikes = 0;
  let big = false;
  let over = false;
  let chase: number | null = null;
  let chaseLeft = 0;
  let caught = 0;

  /** One life gone - unless they are big, in which case the size goes. */
  const knock = () => {
    if (big) big = false;
    else lives--;
    if (lives <= 0) over = true;
  };

  for (const ans of move.answers.slice(0, MAX_ASKS)) {
    const head = pile[0];
    if (!head || over) break;
    const right = level.cards[head.i].answer === ans.a;

    if (right) {
      posts++;
      points += pointsFor(ans.ms);
      // A token on this block: grow, and keep the next knock for free.
      if (tokenOn(posts)) big = true;
    } else {
      wrong++;
      strikes++;
      if (strikes >= STRIKES) {
        strikes = 0;
        knock();
      }
    }

    // Something starts after them at certain blocks.
    if (chase === null && hunts.includes(posts) && from > 0) {
      chase = from;
      chaseLeft = CHASE_LEN;
    }

    if (chase !== null) {
      // It closes in on a wrong answer, and on hard it closes on dawdling too.
      // On medium a kid who needs a minute to think is left alone.
      if (!right) chase--;
      else if (pace === "hard" && ans.ms > TROT_MS) chase--;
      else if (ans.ms <= SPRINT_MS) chase = Math.min(from, chase + 1);

      if (chase <= 0) {
        caught++;
        chase = null;
        chaseLeft = 0;
        knock();
      } else if (--chaseLeft <= 0) {
        // It gives up and slinks off to try again further on.
        chase = null;
      }
    }

    pile = afterAnswer(pile, right, needOf(level));
  }
  const finished = pile.length === 0 && !over;
  if (finished) points += FINISH_BONUS;
  return { posts, wrong, points, finished, lives: Math.max(0, lives), strikes, big, over, chase, caught, pace };
}

/** The best a level can be worth: every card right twice, every one a sprint. */
export const maxPoints = (level: FactLevel) => postsOn(level) * (RIGHT + SPRINT_BONUS) + FINISH_BONUS;

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  const share = points / max;
  return share >= 0.9 ? 3 : share >= 0.6 ? 2 : share > 0 ? 1 : 0;
}

/** Junk in, zero out: every value coerced, every length capped, nothing thrown. */
export function cleanMove(raw: unknown): FactMove {
  const o = (raw ?? {}) as { seed?: unknown; answers?: unknown; pace?: unknown };
  const seed = Number.isFinite(Number(o.seed)) ? Math.abs(Math.floor(Number(o.seed))) % 2147483647 : 1;
  const list = Array.isArray(o.answers) ? o.answers.slice(0, MAX_ASKS) : [];
  const answers: Answer[] = [];
  for (const x of list) {
    const o2 = (x ?? {}) as { a?: unknown; ms?: unknown };
    const a = Number(o2.a);
    const ms = Number(o2.ms);
    answers.push({
      a: Number.isFinite(a) ? a : NaN,
      ms: Number.isFinite(ms) ? Math.min(Math.max(ms, 0), 120000) : 120000,
    });
  }
  const pace = PACES.includes(o.pace as Pace) ? (o.pace as Pace) : "medium";
  return { seed, answers, pace };
}

export function replay(level: FactLevel, raw: unknown): Run & { max: number; stars: number } {
  const move = cleanMove(raw);
  const run = play(level, move);
  const max = maxPoints(level);
  return { ...run, max, stars: starsFor(run.points, max) };
}

/** A clean run: every card right first time, every one quick. */
export function perfectMoves(level: FactLevel, seed = 1, pace: Pace = "medium"): FactMove {
  let pile = openingPile(level, seed);
  const answers: Answer[] = [];
  let guard = 0;
  while (pile.length && guard++ < MAX_ASKS) {
    answers.push({ a: level.cards[pile[0].i].answer, ms: 800 });
    pile = afterAnswer(pile, true, needOf(level));
  }
  return { seed, answers, pace };
}

/**
 * What the run showed about this kid, for the hidden mastery meter. Fluency
 * is the only angle a drill can speak to - it says nothing about whether they
 * understand why - and it comes in at a fraction of a lesson answer's weight.
 */
/** A game answer is worth a fraction of a graded lesson answer. */
const GAME_WEIGHT = 0.25;

/** What a kid who knows a fact takes to say it. */
const EXPECTED_MS = SPRINT_MS;

export function evidenceFor(levelId: string, raw: unknown): GameEvidence[] {
  const level = levelById(levelId);
  if (!level) return [];
  const move = cleanMove(raw);
  let pile = openingPile(level, move.seed);
  /** One row per card that came up, not per answer: a card asked three times
      because they kept missing it is one piece of evidence, not three. */
  const seen = new Map<number, { asks: number; wrong: number; ms: number; last: boolean }>();
  for (const ans of move.answers.slice(0, MAX_ASKS)) {
    const head = pile[0];
    if (!head) break;
    const right = level.cards[head.i].answer === ans.a;
    const row = seen.get(head.i) ?? { asks: 0, wrong: 0, ms: 0, last: false };
    row.asks++;
    if (!right) row.wrong++;
    row.ms += ans.ms;
    row.last = right;
    seen.set(head.i, row);
    pile = afterAnswer(pile, right, needOf(level));
  }
  const at = Date.now();
  return [...seen.values()].map((row) => ({
    subject: "math",
    concept: level.skill,
    angle: "fluency",
    correct: row.last,
    firstTry: row.wrong === 0,
    // No help is offered in a drill: there is no ladder to climb.
    rung: 0,
    ms: Math.round(row.ms / Math.max(1, row.asks)),
    expectedMs: EXPECTED_MS,
    at,
    weight: GAME_WEIGHT,
  }));
}

/**
 * One card worked out, for the coach to talk through before the level. It
 * gives the answer away on purpose - that is what an example is - and it
 * picks a card from the middle of the family rather than the first one, so
 * it is not simply the first question they will be asked.
 */
export function workedCard(level: FactLevel): { card: Fact; say: string } {
  const card = level.cards[Math.min(level.cards.length - 1, 3)];
  const { a, op, b, answer } = card;
  const say =
    op === "+"
      ? `Take ${card.text}. Start at ${a} and count on ${b}, and you land on ${answer}. So ${card.text} is ${answer}.`
      : op === "-"
        ? `Take ${card.text}. Start at ${a} and count back ${b}, and you land on ${answer}. So ${card.text} is ${answer}.`
        : op === "x" && level.skill === "math-2.time-money"
          ? `${card.text} is ${b} cents each, counted ${a} times: that is ${answer} cents.`
          : op === "x"
            ? `Take ${card.text}. That is ${b} lots of ${a}: ${[1, 2, 3].map((k) => a * k).join(", ")}... and on to ${answer}. So ${card.text} is ${answer}.`
            : `Take ${card.text}. How many ${b}s make ${a}? ${b} times ${answer} is ${a}, so the answer is ${answer}.`;
  return { card, say };
}

// ---------------- The art ----------------

const INK = "#1b1530";


// ---------------- Where a level happens ----------------

export type PropKind = "round" | "blossom" | "pine" | "cactus" | "palm" | "reed" | "column" | "crystal" | "lantern" | "torch";

/**
 * The ground a level is run over.
 *
 * Every family gets its own place, so the 3s do not look like the 4s and a
 * kid can tell at a glance which level they are on. They are built from a few
 * shapes and a palette rather than drawn one by one, which is what makes a
 * dozen of them affordable.
 */
export interface Biome {
  id: string;
  /** Said out loud by the coach and written under the level. */
  name: string;
  /** Top and bottom of the sky. */
  sky: [string, string];
  /** The turf, and the earth under it. */
  ground: string;
  under: string;
  /** The ridge along the back. */
  far: string;
  prop: PropKind;
  propInk: [string, string];
  /** Clouds belong in the open air and nowhere else. */
  clouds: boolean;
  /** A dark place wants its writing light. */
  dark?: boolean;
  /**
   * The ground climbs this many pixels a block. A mountain level really is
   * uphill: by the last card they are high above where they started.
   */
  rise?: number;
  /** No ground at all - they swim it, and things drift upwards past them. */
  swim?: boolean;
}

export const BIOMES: Biome[] = [
  { id: "meadow", name: "Meadow", sky: ["#8fd0ff", "#c8e9ff"], ground: "#3f9d5a", under: "#2c6c3f", far: "#63c47f", prop: "round", propInk: ["#6b4a2a", "#3f9d5a"], clouds: true },
  { id: "orchard", name: "Blossom Orchard", sky: ["#ffd7ea", "#ffeaf4"], ground: "#5aa864", under: "#3d7446", far: "#8fd39a", prop: "blossom", propInk: ["#6b4a2a", "#ff9ec4"], clouds: true },
  { id: "canyon", name: "Red Canyon", sky: ["#ffcf8f", "#ffe6c2"], ground: "#c4703c", under: "#8a4a26", far: "#a85b30", prop: "cactus", propInk: ["#3f9d5a", "#63c47f"], clouds: false },
  // The ground climbs all the way: by the last card they are far above the
  // start, with the cage on the summit.
  { id: "summit", name: "The Long Climb", sky: ["#9ec9ef", "#dff0ff"], ground: "#6b7a8c", under: "#4a5565", far: "#8d9bad", prop: "pine", propInk: ["#5b4228", "#2f6b48"], clouds: true, rise: 7 },
  { id: "frost", name: "Frostfields", sky: ["#cfe6ff", "#eef6ff"], ground: "#e4eefb", under: "#b9cde4", far: "#c9dcf0", prop: "pine", propInk: ["#6b7a8c", "#eef6ff"], clouds: true },
  // No floor: they swim it, and the weed and the bubbles drift up past them.
  { id: "seabed", name: "Under the Sea", sky: ["#1b6fa8", "#4aa8d8"], ground: "#d8c48a", under: "#b09a63", far: "#2f88bb", prop: "reed", propInk: ["#2f7d46", "#63c47f"], clouds: false, swim: true },
  { id: "jungle", name: "Green Jungle", sky: ["#7fd8b0", "#bdf0d8"], ground: "#2f7d46", under: "#1f5730", far: "#45a060", prop: "palm", propInk: ["#5b4228", "#63c47f"], clouds: false },
  { id: "marsh", name: "Quiet Marsh", sky: ["#b9cfa4", "#dcebcd"], ground: "#4a6b45", under: "#334a30", far: "#6b8a5e", prop: "reed", propInk: ["#7a8f4a", "#c2cf7a"], clouds: false },
  { id: "ruins", name: "Old Ruins", sky: ["#cfc8e4", "#e8e3f4"], ground: "#8a8296", under: "#625b70", far: "#a79fb5", prop: "column", propInk: ["#d8d2e0", "#a79fb5"], clouds: true },
  { id: "cavern", name: "Crystal Cavern", sky: ["#241c45", "#3a2f5c"], ground: "#4a4a63", under: "#2f2f42", far: "#3a3350", prop: "crystal", propInk: ["#7fd8ff", "#bdf0ff"], clouds: false, dark: true },
  { id: "emberpeak", name: "Ember Peak", sky: ["#4a1f2b", "#8a3b2b"], ground: "#3a2f34", under: "#241c21", far: "#5c3a33", prop: "crystal", propInk: ["#ff8a3c", "#ffd08a"], clouds: false, dark: true, rise: 5 },
  { id: "starfield", name: "Starfield", sky: ["#171a3f", "#2f3a7a"], ground: "#3a3f6b", under: "#262a4a", far: "#4a5190", prop: "lantern", propInk: ["#6b6f9c", "#ffe08a"], clouds: false, dark: true, swim: true },
];

const DUNGEON_BIOME: Biome = {
  id: "dungeon",
  name: "The Dungeon",
  sky: ["#211c33", "#2a2340"],
  ground: "#3a3350",
  under: "#241c45",
  far: "#4a4a63",
  prop: "torch",
  propInk: ["#6b5636", "#f2a516"],
  clouds: false,
  dark: true,
};

/** Which place this level is run in. Fixed per level, so it is always theirs. */
export function biomeFor(level: FactLevel): Biome {
  if (level.dungeon) return DUNGEON_BIOME;
  // The family number off the id ("fr-a7" -> 7), or the coin levels in order.
  const n = Number(level.id.replace(/^fr-[asxdc]/, "")) || 0;
  if (n >= 1) return BIOMES[(n - 1) % BIOMES.length];
  const coins = ["fr-c1", "fr-c5", "fr-c10", "fr-c25", "fr-cmix"].indexOf(level.id);
  return BIOMES[(coins >= 0 ? coins + 5 : 0) % BIOMES.length];
}

/** The ridge along the back of a level, in that place's colour. */
export function ridgeGrid(colour: string, peaked: boolean): Grid {
  const g = new Grid(30, 14);
  if (peaked) {
    g.tri(9, 1, 13, 9, colour);
    g.tri(21, 3, 13, 8, colour);
  } else {
    g.tri(15, 2, 13, 15, colour);
  }
  g.rect(0, 12, 30, 2, colour);
  return g;
}

/** One of the things that grows, stands or glows beside the track. */
export function propGrid(kind: PropKind, a: string, b: string): Grid {
  const g = new Grid(16, 22);
  const trunk = (w: number, h: number) => g.rect(8 - Math.floor(w / 2), 22 - h, w, h, a);
  switch (kind) {
    case "round":
      trunk(3, 9);
      g.disc(8, 8, 6, b).disc(6, 6, 3, b);
      break;
    case "blossom":
      trunk(3, 9);
      g.disc(8, 8, 6, b).disc(5, 5, 2.5, "#fff0f6").disc(11, 7, 2, "#fff0f6");
      break;
    case "pine":
      trunk(3, 5);
      g.tri(8, 1, 8, 4, b).tri(8, 5, 12, 6, b).tri(8, 9, 17, 7, b);
      break;
    case "cactus":
      g.rect(7, 6, 3, 16, a === "#3f9d5a" ? a : "#3f9d5a");
      g.rect(3, 10, 2, 6, a).rect(3, 10, 4, 2, a);
      g.rect(11, 13, 2, 5, a).rect(9, 13, 4, 2, a);
      break;
    case "palm":
      trunk(2, 13);
      g.rect(2, 7, 5, 2, b).rect(9, 7, 5, 2, b).rect(4, 4, 3, 2, b).rect(9, 4, 3, 2, b);
      break;
    case "reed":
      for (const x of [4, 8, 12]) g.rect(x, 10, 1, 12, a);
      for (const x of [4, 8, 12]) g.rect(x - 1, 7, 3, 4, b);
      break;
    case "column":
      g.rect(5, 2, 6, 20, b);
      g.rect(4, 1, 8, 2, a).rect(4, 20, 8, 2, a);
      g.rect(7, 4, 1, 16, a);
      break;
    case "crystal":
      g.tri(6, 6, 22, 3, a);
      g.tri(11, 2, 22, 4, b);
      break;
    case "lantern":
      g.rect(7, 0, 2, 7, a);
      g.rect(4, 7, 8, 8, a);
      g.rect(5, 8, 6, 6, b);
      break;
    case "torch":
      g.rect(7, 8, 2, 14, a);
      g.rect(5, 11, 6, 2, a);
      g.rect(6, 3, 4, 6, b);
      g.rect(7, 1, 2, 4, "#ffe08a");
      break;
  }
  return g;
}

/**
 * The thing that chases them: all teeth and eyes, and plainly not a Grumble
 * from the other game - this one runs.
 */
export function beastGrid(frame = 0): Grid {
  const g = new Grid(18, 14);
  const body = "#7a2f4a";
  const dark = "#511f33";
  g.rect(2, 4, 14, 7, body);
  g.rect(2, 9, 14, 2, dark);
  g.disc(13, 5, 4, body);
  // Eyes, and a mouth with something in it.
  g.rect(12, 3, 2, 2, "#fffdf5").rect(15, 3, 2, 2, "#fffdf5");
  g.set(13, 4, INK).set(16, 4, INK);
  for (let x = 11; x < 17; x += 2) g.rect(x, 7, 1, 2, "#fffdf5");
  // Legs, which swap over as it runs.
  const a = frame % 2 === 0 ? 0 : 2;
  g.rect(4, 11, 2, 3 - (a ? 1 : 0), dark);
  g.rect(11, 11, 2, 3 - (a ? 0 : 1), dark);
  // A tail behind it.
  g.rect(0, 5, 3, 2, dark);
  return g;
}

/** A token to run into: a spinning coin-ish star that makes you big. */
export function tokenGrid(frame = 0): Grid {
  const g = new Grid(10, 10);
  const w = frame % 2 === 0 ? 4 : 2;
  g.disc(4.5, 4.5, 4.6, "#b8860b");
  g.disc(4.5, 4.5, 3.4, "#f2d24a");
  g.rect(5 - Math.ceil(w / 2), 2, w, 6, "#fff3bf");
  return g;
}

/** A mountain to climb, sat on the ground and taller than the runner. */
export function mountainGrid(): Grid {
  const g = new Grid(34, 26);
  g.tri(17, 0, 25, 17, "#7a6f94");
  g.tri(17, 0, 9, 7, "#fffdf5");
  g.rect(0, 24, 34, 2, "#5c5478");
  return g;
}

/** A river to cross: banks, water and a couple of ripples. */
export function riverGrid(): Grid {
  const g = new Grid(26, 12);
  g.rect(0, 2, 26, 10, "#2f7fd4");
  g.rect(0, 2, 26, 2, "#59a7f2");
  g.rect(3, 6, 6, 1, "#8ec8ff");
  g.rect(14, 8, 7, 1, "#8ec8ff");
  return g;
}

/** A hole to jump: a gap in the ground with a dark bottom to it. */
export function holeGrid(): Grid {
  const g = new Grid(22, 12);
  g.rect(0, 0, 22, 12, "#1b1530");
  g.rect(2, 0, 18, 3, "#241c45");
  return g;
}

/**
 * The cage with the pet actually inside it.
 *
 * The pet used to be a second sprite laid over the cage by the stylesheet,
 * which put it wherever the box happened to end up - and the box was not the
 * size of the cage. Drawing it into the same grid means it is in there by
 * construction: there is no layout left to get wrong.
 */
export function cagedPetGrid(pet: Grid | null, open: boolean): Grid {
  const g = cageGrid(open);
  if (!pet) return g;
  // Centred on the floor of the cage, which is 20 across and 20 down.
  const x = Math.round((g.w - pet.w) / 2);
  const y = g.h - 3 - pet.h;
  return open ? g.draw(pet, x, y - 7) : g.draw(pet, x, y);
}

/** A torch on a dungeon wall: a bracket and a flame that flickers by frame. */
export function torchGrid(frame = 0): Grid {
  const g = new Grid(9, 14);
  g.rect(3, 6, 3, 8, "#6b5636");
  g.rect(2, 9, 5, 2, "#8b6b46");
  const tall = frame % 2 === 0;
  g.rect(3, tall ? 1 : 2, 3, tall ? 5 : 4, "#f2a516");
  g.rect(4, tall ? 0 : 1, 1, 3, "#ffe08a");
  g.rect(3, 5, 3, 1, "#e0453a");
  return g;
}

/** A block of dungeon wall, so the background reads as stone and not sky. */
export function stoneGrid(): Grid {
  const g = new Grid(16, 8);
  g.rect(0, 0, 16, 8, "#4a4a63");
  g.rect(1, 1, 6, 2, "#5b5b78");
  g.rect(9, 1, 6, 2, "#5b5b78");
  g.rect(1, 5, 3, 2, "#5b5b78");
  g.rect(6, 5, 8, 2, "#5b5b78");
  return g;
}

/**
 * A cloud. Flat-bottomed and lumpy on top, drawn in the keyline style the
 * rest of the game uses rather than shaded.
 */
export function cloudGrid(wide = false): Grid {
  const w = wide ? 22 : 16;
  const g = new Grid(w, 9);
  g.rect(2, 4, w - 4, 4, "#ffffff");
  g.rect(4, 2, 5, 3, "#ffffff");
  g.rect(wide ? 12 : 9, 1, 6, 4, "#ffffff");
  g.rect(1, 6, w - 2, 2, "#ffffff");
  g.rect(2, 7, w - 4, 1, "#dfe7f7");
  return g;
}

/** A rounded hill for the back of the scene. */
export function hillGrid(): Grid {
  const g = new Grid(26, 12);
  g.tri(13, 0, 11, 13, "#3f9d5a");
  g.rect(0, 10, 26, 2, "#3f9d5a");
  g.rect(10, 4, 6, 2, "#4fb36a");
  return g;
}

/**
 * The cage at the end of the level, with the pet inside it. It stays shut
 * until the last card is answered, which is the whole reason for running.
 */
export function cageGrid(open: boolean): Grid {
  const g = new Grid(20, 20);
  g.rect(0, 1, 20, 2, INK);
  g.rect(0, 17, 20, 3, INK);
  g.rect(0, 1, 2, 19, INK);
  g.rect(18, 1, 2, 19, INK);
  if (!open) for (let x = 4; x < 18; x += 4) g.rect(x, 3, 2, 14, INK);
  else {
    // Bars sprung: two bent stubs and daylight between them.
    g.rect(4, 3, 2, 3, INK);
    g.rect(14, 14, 2, 3, INK);
  }
  return g;
}

/** A chequered flag on a post, which is what the end of the track looks like. */
export function flagGrid(): Grid {
  const g = new Grid(12, 16);
  g.rect(1, 2, 2, 14, INK);
  for (let y = 0; y < 6; y++)
    for (let x = 0; x < 8; x++) {
      g.rect(3 + x, 2 + y, 1, 1, (x + y) % 2 === 0 ? "#fffdf5" : INK);
    }
  return g;
}

/** A post by the side of the track, so the running has something to go past. */
export function postGrid(): Grid {
  const g = new Grid(6, 12);
  g.rect(2, 2, 2, 10, "#8b6b46");
  g.rect(0, 0, 6, 3, "#e0453a");
  g.rect(1, 1, 4, 1, "#fffdf5");
  return g;
}

/** A tuft of grass, repeated along the ground so the run reads as movement. */
export function tuftGrid(n: number): Grid {
  const g = new Grid(8, 6);
  const green = n % 2 === 0 ? "#3f9d5a" : "#2f7d46";
  g.rect(1, 4, 6, 2, green);
  g.rect(2, 2, 1, 2, green).rect(4, 1, 1, 3, green).rect(6, 3, 1, 1, green);
  return g;
}

// ---------------- Registered ----------------

export const factRush: MiniGame = {
  ...factRushInfo,
  // One ladder for everybody. Drill starts at the bottom whatever grade you
  // are in - the same rule the other XP Rush follows.
  levels: () => ALL_FACT_LEVELS,
  levelsForGrade: () => ALL_FACT_LEVELS,
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
  evidence: (levelId, moves) => {
    try {
      return evidenceFor(levelId, moves);
    } catch {
      return [];
    }
  },
};
