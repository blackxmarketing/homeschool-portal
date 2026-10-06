import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Word Builder (Reading & Writing, grades K-2). Each round the kid sees a
 * picture, hears the word, and builds it by tapping letter tiles into slots.
 * The bank holds the word's tiles plus a few extras. Tiles can be a letter or
 * a sound chunk (sh, ai, ar, un, ing...), so the game teaches that some
 * sounds are spelled with two letters.
 *
 *   Kindergarten: first sounds, then short-vowel CVC words (RF.K.2, RF.K.3).
 *   Grade 1: blends, digraphs sh/ch/th, silent-e long vowels (RF.1.2, RF.1.3).
 *   Grade 2: vowel teams, r-controlled vowels, prefixes and suffixes (RF.2.3).
 *
 * Moves: for every round, the list of tries; each try is the bank tile
 * indexes the kid put in the slots, in order. A word built right on the
 * first try earns 2 points, built right later 1 point. Pure and seeded, so
 * the server replays the moves to score them.
 */

export const wordBuilderInfo = {
  id: "wordbuilder",
  title: "Word Builder",
  icon: "🔤",
  land: "writing" as const,
  subject: "ela" as const,
  grades: [0, 1, 2],
  blurb: "Listen to the word, look at the picture, and build it from letter tiles.",
};

/** "first": only the first tile is missing. "build": the whole word. */
export type WordMode = "first" | "build";

export interface WordRound {
  word: string;
  emoji: string;
  /** The word's tiles in order (letters or sound chunks). */
  parts: string[];
  /** Extra tiles mixed into the bank. */
  extras: string[];
  /** What the word means (said with the word; prefixes and suffixes). */
  meaning?: string;
  /** One sentence naming the sound pattern, shown and read after the round. */
  tip: string;
}

export interface WordLevel extends MiniLevel {
  grade: number;
  mode: WordMode;
  rounds: WordRound[];
}

/** Tries a round keeps (more are ignored). */
export const MAX_TRIES = 10;

const rd = (word: string, emoji: string, parts: string, extras: string, tip: string, meaning?: string): WordRound => ({
  word,
  emoji,
  parts: parts.split(" "),
  extras: extras.split(" "),
  tip,
  meaning,
});

export const WORD_LEVELS: WordLevel[] = [
  // ---------------- Kindergarten ----------------
  {
    grade: 0,
    id: "k-1",
    title: "First Sounds",
    mode: "first",
    intro: "Skill: first sounds (RF.K.2, RF.K.3). Listen to the word and tap the letter it starts with.",
    rounds: [
      rd("sun", "☀️", "s u n", "m b t", "Sun starts with s. S says sss, like a snake."),
      rd("moon", "🌙", "m oon", "s p d", "Moon starts with m. M says mmm, like yummy food."),
      rd("fish", "🐟", "f ish", "v t h", "Fish starts with f. F says fff, like air from a tire."),
      rd("bus", "🚌", "b us", "d p m", "Bus starts with b. Your lips pop together for b."),
      rd("duck", "🦆", "d uck", "b g t", "Duck starts with d. Your tongue taps behind your teeth for d."),
      rd("pig", "🐷", "p ig", "b t n", "Pig starts with p. P makes a little puff of air."),
    ],
  },
  {
    grade: 0,
    id: "k-2",
    title: "Short a and i",
    mode: "build",
    intro: "Skill: short a and short i words (RF.K.2, RF.K.3). Listen for the first, middle and last sound. Build the word.",
    rounds: [
      rd("cat", "🐱", "c a t", "o b", "Cat has a short a in the middle: c, a, t."),
      rd("hat", "🎩", "h a t", "i m", "Hat rhymes with cat. Only the first sound changed."),
      rd("bat", "🦇", "b a t", "d u", "Bat is in the at family too: b, a, t."),
      rd("map", "🗺️", "m a p", "u t", "Map has a short a in the middle, like apple."),
      rd("pig", "🐷", "p i g", "a d", "Pig has a short i in the middle, like itch."),
      rd("six", "6️⃣", "s i x", "a k", "Six ends with x. X says ks at the end of a word."),
    ],
  },
  {
    grade: 0,
    id: "k-3",
    title: "Short o, u and e",
    mode: "build",
    intro: "Skill: short o, u and e words (RF.K.2, RF.K.3). Listen hard to the middle sound, the vowel.",
    rounds: [
      rd("dog", "🐶", "d o g", "b u a", "Dog has a short o in the middle, like octopus."),
      rd("fox", "🦊", "f o x", "a s v", "Fox has a short o and ends with x, which says ks."),
      rd("bug", "🐛", "b u g", "a d o", "Bug has a short u in the middle, like umbrella."),
      rd("cup", "🥤", "c u p", "o b a", "Cup has a short u in the middle: c, u, p."),
      rd("bed", "🛏️", "b e d", "i p a", "Bed has a short e in the middle, like egg."),
      rd("web", "🕸️", "w e b", "a d i", "Web has a short e in the middle: w, e, b."),
      rd("hen", "🐔", "h e n", "i m a", "Hen has a short e, just like bed and web."),
    ],
  },

  // ---------------- Grade 1 ----------------
  {
    grade: 1,
    id: "g1-1",
    title: "Blends",
    mode: "build",
    intro: "Skill: consonant blends (RF.1.2, RF.1.3). In a blend you hear both sounds, like f and r in frog.",
    rounds: [
      rd("frog", "🐸", "f r o g", "l a", "Frog starts with the blend fr. You can hear both f and r."),
      rd("crab", "🦀", "c r a b", "l o", "Crab starts with the blend cr: c and r slide together."),
      rd("drum", "🥁", "d r u m", "a b", "Drum starts with dr and has a short u in the middle."),
      rd("flag", "🚩", "f l a g", "r e", "Flag starts with the blend fl: f and l slide together."),
      rd("sled", "🛷", "s l e d", "n a t", "Sled starts with the blend sl and has a short e."),
      rd("plant", "🌱", "p l a n t", "r e d", "Plant has two blends: pl at the start and nt at the end."),
    ],
  },
  {
    grade: 1,
    id: "g1-2",
    title: "sh, ch and th",
    mode: "build",
    intro: "Skill: digraphs sh, ch and th (RF.1.3). Two letters can team up to make one new sound.",
    rounds: [
      rd("ship", "🚢", "sh i p", "ch th", "Ship starts with sh. S and h team up to say shh."),
      rd("fish", "🐟", "f i sh", "ch th", "Fish ends with sh, the quiet shh sound."),
      rd("shell", "🐚", "sh e ll", "ch l", "Shell starts with sh and ends with two l's after a short vowel."),
      rd("chick", "🐤", "ch i ck", "sh k", "Chick starts with ch and ends with ck, which says k after a short vowel."),
      rd("bath", "🛁", "b a th", "sh t", "Bath ends with th. Stick your tongue out a little to say th."),
      rd("brush", "🪥", "b r u sh", "ch s th", "Brush starts with the blend br and ends with the digraph sh."),
    ],
  },
  {
    grade: 1,
    id: "g1-3",
    title: "Magic e",
    mode: "build",
    intro: "Skill: silent e and long vowels (RF.1.3). An e at the end is silent, and it makes the vowel say its name.",
    rounds: [
      rd("cake", "🎂", "c a k e", "o i", "Cake ends with a silent e, so the a says its name: ay."),
      rd("kite", "🪁", "k i t e", "a y", "Kite ends with a silent e, so the i says its name: eye."),
      rd("bone", "🦴", "b o n e", "a u", "Bone ends with a silent e, so the o says its name: oh."),
      rd("cube", "🧊", "c u b e", "o a", "Cube ends with a silent e, so the u says its name: you."),
      rd("rose", "🌹", "r o s e", "z a", "Rose ends with a silent e. Here the s makes a z sound."),
      rd("nine", "9️⃣", "n i n e", "a m", "Nine ends with a silent e, so the i says its name."),
      rd("five", "5️⃣", "f i v e", "a o", "Five ends with a silent e. English words do not end in v, so the e comes after it."),
    ],
  },

  // ---------------- Grade 2 ----------------
  {
    grade: 2,
    id: "g2-1",
    title: "Vowel Teams",
    mode: "build",
    intro: "Skill: vowel teams ai, ee and oa (RF.2.3). When two vowels go walking, the first one does the talking.",
    rounds: [
      rd("rain", "🌧️", "r ai n", "ay ee", "Rain has the team ai in the middle. Ay is used at the end of a word, like day."),
      rd("snail", "🐌", "s n ai l", "oa ay", "Snail starts with the blend sn and uses ai for the long a in the middle."),
      rd("tree", "🌳", "t r ee", "ai oa", "Tree ends with the team ee, which says the long e sound."),
      rd("sheep", "🐑", "sh ee p", "oa ch", "Sheep has the digraph sh and the vowel team ee."),
      rd("boat", "⛵", "b oa t", "ai ee", "Boat has the team oa. The o does the talking and says its name."),
      rd("soap", "🧼", "s oa p", "ee ai", "Soap uses oa for the long o sound, just like boat."),
      rd("train", "🚂", "t r ai n", "oa ee", "Train starts with the blend tr and uses ai, like rain."),
    ],
  },
  {
    grade: 2,
    id: "g2-2",
    title: "Bossy R",
    mode: "build",
    intro: "Skill: r-controlled vowels ar, or, ir, ur (RF.2.3). When r comes after a vowel, r is the boss and changes its sound.",
    rounds: [
      rd("star", "⭐", "s t ar", "or ir", "Star ends with ar, the sound a pirate makes."),
      rd("corn", "🌽", "c or n", "ar k", "Corn has or in the middle, the same sound as the word or."),
      rd("fork", "🍴", "f or k", "ar c", "Fork has or in the middle and ends with k."),
      rd("shark", "🦈", "sh ar k", "or ch", "Shark has the digraph sh and the bossy r team ar."),
      rd("bird", "🐦", "b ir d", "ar or", "Bird has ir in the middle. Ir, ur and er can all say the same sound."),
      rd("turtle", "🐢", "t ur t le", "ar or", "Turtle uses ur for its bossy r sound and ends with le."),
    ],
  },
  {
    grade: 2,
    id: "g2-3",
    title: "Prefixes and Suffixes",
    mode: "build",
    intro: "Skill: prefixes and suffixes (RF.2.3). A prefix goes before a word and a suffix goes after it. Both change the meaning.",
    rounds: [
      rd("unlock", "🔓", "un l o ck", "re ing", "The prefix un means not or undo, so unlock means to open a lock.", "Unlock means to open a lock."),
      rd("replay", "🔁", "re p l ay", "un ed", "The prefix re means again, so replay means play again.", "Replay means to play again."),
      rd("unhappy", "🙁", "un happy", "re ful", "Unhappy is the prefix un plus happy, so it means not happy.", "Unhappy means not happy."),
      rd("sleeping", "😴", "s l ee p ing", "ed un", "The suffix ing means it is happening right now.", "The baby is sleeping right now."),
      rd("painted", "🎨", "p ai n t ed", "ing re", "The suffix ed means it already happened.", "Yesterday I painted a picture."),
      rd("helpful", "🤝", "h e l p ful", "less un", "The suffix ful means full of, so helpful means full of help.", "Helpful means full of help."),
    ],
  },
];

export const levelById = (id: unknown): WordLevel | undefined => (typeof id === "string" ? WORD_LEVELS.find((l) => l.id === id) : undefined);

export const levelsForGrade = (grade: number): WordLevel[] => WORD_LEVELS.filter((l) => l.grade === grade);

// ---------------- Seeded tile bank ----------------

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The tiles the kid needs to place (the first one only in "first" mode). */
export const needed = (level: WordLevel, round: WordRound): string[] => (level.mode === "first" ? [round.parts[0]] : round.parts);

/** Number of slots to fill. */
export const slotCount = (level: WordLevel, round: WordRound) => needed(level, round).length;

/** The tile bank for a round: needed tiles + extras, shuffled the same way every time. */
export function bankFor(level: WordLevel, roundIndex: number): string[] {
  const round = level.rounds[roundIndex];
  if (!round) return [];
  const tiles = [...needed(level, round), ...round.extras];
  const r = rng(hash(`${level.id}:${roundIndex}`));
  const out = [...tiles];
  for (let pass = 0; pass < 5; pass++) {
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    // Don't hand the kid the answer already in order.
    if (out.slice(0, tiles.length - round.extras.length).join("") !== needed(level, round).join("")) break;
  }
  return out;
}

/** Is this try (bank indexes) right? */
export function isRight(level: WordLevel, roundIndex: number, attempt: number[]): boolean {
  const round = level.rounds[roundIndex];
  if (!round) return false;
  const bank = bankFor(level, roundIndex);
  const want = needed(level, round);
  if (attempt.length !== want.length) return false;
  if (new Set(attempt).size !== attempt.length) return false;
  if (attempt.some((i) => !Number.isInteger(i) || i < 0 || i >= bank.length)) return false;
  return attempt.map((i) => bank[i]).join("") === want.join("");
}

// ---------------- Teaching feedback ----------------

const DIGRAPHS = ["sh", "ch", "th", "ck", "ll"];
const TEAMS = ["ai", "ay", "ee", "ea", "oa"];
const BOSSY = ["ar", "or", "ir", "ur", "er"];
const AFFIXES = ["un", "re", "ing", "ed", "ful", "less"];
const VOWELS = ["a", "e", "i", "o", "u"];

function where(i: number, n: number): string {
  if (n === 1 || i === 0) return "the first sound";
  if (i === n - 1) return "the last sound";
  return n === 3 ? "the middle sound" : "the sound in the middle";
}

/**
 * Feedback for a wrong try: a hint about the first slot that's wrong, and on
 * later tries the spelling itself. Never throws.
 */
export function hintFor(level: WordLevel, roundIndex: number, tiles: string[], tryNumber: number): { wrongSlot: number; note: string } {
  const round = level.rounds[roundIndex];
  if (!round) return { wrongSlot: -1, note: "" };
  const want = needed(level, round);
  let i = want.findIndex((t, k) => tiles[k] !== t);
  if (i < 0) i = 0;
  if (tryNumber >= 2) {
    return {
      wrongSlot: i,
      note: level.mode === "first" ? `${cap(round.word)} starts with ${want[0]}. Find the ${want[0]} tile.` : `${cap(round.word)} is spelled ${round.parts.join(", ")}. You can do it!`,
    };
  }
  const t = want[i];
  const pos = where(i, want.length);
  let note: string;
  if (level.mode === "first") note = `Almost! Say ${round.word} slowly. Listen to the very first sound.`;
  else if (AFFIXES.includes(t)) note = `Almost! Think about the meaning. ${round.meaning ?? ""}`.trim();
  else if (BOSSY.includes(t)) note = `Almost! Listen for the bossy r sound in ${round.word}. Which vowel and r make it?`;
  else if (TEAMS.includes(t)) note = `Almost! Listen to the long vowel sound in ${round.word}. Which vowel team makes it?`;
  else if (t === "ll") note = `Almost! After a short vowel, the l sound at the end of ${round.word} is spelled with two letters.`;
  else if (t === "ck") note = `Almost! After a short vowel, the k sound at the end of ${round.word} is spelled with two letters.`;
  else if (DIGRAPHS.includes(t)) note = `Almost! Listen to ${pos} in ${round.word}. Which two letters team up to make it?`;
  else if (t === "le") note = `Almost! Listen to the end of ${round.word}. Which tile says ul?`;
  else if (t === "e" && i === want.length - 1 && want.length >= 4 && level.grade === 1) note = `Almost! The vowel in ${round.word} says its name. What silent letter goes at the end?`;
  else if (VOWELS.includes(t)) note = `Almost! Listen to the vowel in ${round.word}. Which vowel makes that sound?`;
  else note = `Almost! Say ${round.word} slowly and listen to ${pos}.`;
  return { wrongSlot: i, note };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** What the game says when a round starts. */
export function promptFor(level: WordLevel, round: WordRound): string {
  if (level.mode === "first") return `${cap(round.word)}. What letter does ${round.word} start with?`;
  if (round.meaning) return `${cap(round.word)}. ${round.meaning} Build the word ${round.word}.`;
  return `${cap(round.word)}. Build the word ${round.word}.`;
}

// ---------------- Moves and scoring ----------------

/** Cleans untrusted moves: rounds of tries of tile indexes. Never throws. */
export function cleanMoves(raw: unknown, level: WordLevel): number[][][] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, level.rounds.length).map((round) =>
    Array.isArray(round)
      ? round.slice(0, MAX_TRIES).map((attempt) => (Array.isArray(attempt) ? attempt.slice(0, 12).map((n) => (typeof n === "number" && Number.isInteger(n) && n >= 0 && n < 50 ? n : -1)) : []))
      : [],
  );
}

/** Points for one round: 2 if built right on the first try, 1 if right later, else 0. */
export function roundPoints(level: WordLevel, roundIndex: number, tries: number[][] | undefined): number {
  if (!tries || !tries.length) return 0;
  if (isRight(level, roundIndex, tries[0])) return 2;
  return tries.some((t) => isRight(level, roundIndex, t)) ? 1 : 0;
}

export function starsFor(points: number, max: number): number {
  if (max <= 0) return 0;
  return points >= Math.ceil(max * 0.9) ? 3 : points >= max * 0.6 ? 2 : points >= max * 0.3 ? 1 : 0;
}

export function replay(level: WordLevel, raw: unknown): { points: number[]; total: number; max: number; stars: number } {
  const moves = cleanMoves(raw, level);
  const points = level.rounds.map((_, i) => roundPoints(level, i, moves[i]));
  const total = points.reduce((s, p) => s + p, 0);
  const max = level.rounds.length * 2;
  return { points, total, max, stars: starsFor(total, max) };
}

/** A perfect game: the right tiles on the first try, every round. */
export function perfectMoves(level: WordLevel): number[][][] {
  return level.rounds.map((round, ri) => {
    const bank = bankFor(level, ri);
    const used = new Set<number>();
    const attempt = needed(level, round).map((t) => {
      const i = bank.findIndex((b, k) => b === t && !used.has(k));
      used.add(i);
      return i;
    });
    return [attempt];
  });
}

// ---------------- Pixel art ----------------

/** Hoot, the word-builder owl who cheers the kid on. */
export function owlGrid(): Grid {
  const g = new Grid(18, 18);
  const BODY = "#8a5a2b";
  const BELLY = "#e9c99a";
  const WING = "#6e4520";
  // ear tufts
  g.tri(4, 1, 4, 1, BODY).tri(13, 1, 4, 1, BODY);
  // body
  g.disc(8.5, 9.5, 6.6, BODY);
  g.disc(8.5, 12, 4.2, BELLY);
  // wings
  g.rect(2, 9, 2, 6, WING).rect(15, 9, 2, 6, WING);
  // eyes
  g.disc(6, 7, 2.2, "#ffffff").disc(11, 7, 2.2, "#ffffff");
  g.rect(6, 7, 1, 1, "#1b1530").rect(11, 7, 1, 1, "#1b1530");
  // beak
  g.rect(8, 9, 2, 1, "#f59e0b").rect(8, 10, 2, 1, "#d97706");
  // belly feathers
  g.set(7, 12, "#cfa775").set(10, 12, "#cfa775").set(8, 14, "#cfa775").set(9, 14, "#cfa775");
  // feet
  g.rect(6, 16, 2, 1, "#f59e0b").rect(10, 16, 2, 1, "#f59e0b");
  return g.outline("#1b1530");
}

// ---------------- The game ----------------

const asMini = (l: WordLevel): MiniLevel => ({ id: l.id, title: l.title, intro: l.intro });

export const wordBuilder: MiniGame = {
  ...wordBuilderInfo,
  levels: () => [],
  levelsForGrade: (grade) => levelsForGrade(grade).map(asMini),
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const r = replay(level, moves);
      return { stars: r.stars, best: r.total };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
};
