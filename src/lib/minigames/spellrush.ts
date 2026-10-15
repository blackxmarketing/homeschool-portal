import { Grid, shade } from "../pixel/grid";
import { seededRng, shuffle, int, type Rng } from "../curriculum/math";
import type { GameEvidence, MiniGame } from "./index";

/**
 * XP Rush: Spelling - a word hunt through the jungle.
 *
 * The teacher says a word. Its letters are scattered on stones through the
 * clearing, and the only way to spell it is to walk over them in order -
 * first letter first, last letter last - while the things that live there
 * move about between your steps. Step on the wrong stone and it stays put
 * and costs you; let a snake reach you and the word starts again.
 *
 * It owes its shape to Spelling Jungle (Sierra / Bright Star, 1993), which
 * Jake picked out: walk the maze, pick the letters up in order, watch what
 * else is moving. Every pixel, word list and line of text here is ours.
 *
 * Nothing about a run is believed from the browser. The screen sends the
 * seed it was given and the steps that were taken; the server walks the same
 * maze with the same steps and works out what happened. `play()` below is
 * that walk, and both sides call it.
 *
 * The ladder is the spelling standards, bottom to top: letter sounds in
 * kindergarten, patterns through the junior grades, then roots, affixes and
 * the words everyone gets wrong in the middle grades. Grades K-5 start at the
 * bottom because that is where spelling starts; grades 6-8 sit a short
 * placement first so they begin where their spelling actually runs out.
 */

// ---------------- The game, in the registry's words ----------------

export const spellRushInfo = {
  id: "spellrush",
  title: "XP Rush: Spelling",
  icon: "🌿",
  land: "writing" as const,
  subject: "ela" as const,
  grades: [0, 1, 2, 3, 4, 5],
  /** Two stars to move on, the same as the facts drill. */
  unlockAt: 2,
  /** Grades 6-8 are placed by a short spelling check rather than starting at CVC words. */
  placement: true,
  ownIntro: true,
  blurb: "The teacher says a word. Its letters are out there in the jungle - walk over them in the right order, and mind what else is moving.",
};

/** Stars needed before the next level opens, and before a kid moves on. */
export const MOVE_ON_STARS = 2;

// ---------------- The ladder ----------------

export interface SpellLevel {
  id: string;
  title: string;
  /** What the teacher says before it starts. */
  intro: string;
  /** 0 is kindergarten. */
  grade: number;
  /**
   * The standard this level is practice for: Common Core English Language
   * Arts, which is what nearly every state's spelling list is built from.
   */
  standard: string;
  /** The pack this level draws its words from. */
  words: string[];
  /**
   * Whether the word is written up while they hunt for it.
   *
   * On for the youngest, where the job is finding the letters in order at
   * all; off from grade two, where the job is spelling it.
   */
  show?: boolean;
  /** How many of the things that live here are awake. */
  snakes?: number;
}

/** How many words a level asks for. */
export const WORDS_PER_LEVEL = 5;

/** Stones that are not part of the word, to make the hunt a choice. */
const DECOYS_FROM_GRADE = 2;

const level = (
  id: string,
  grade: number,
  title: string,
  standard: string,
  intro: string,
  words: string[],
  extra: { show?: boolean; snakes?: number } = {},
): SpellLevel => ({ id, grade, title, standard, intro, words, ...extra });

/**
 * Every level, bottom to top.
 *
 * Six to a grade, each one a pattern rather than a pile of words, because a
 * kid who knows the pattern can spell the words that were not on the list.
 */
export const ALL_SPELL_LEVELS: SpellLevel[] = [
  // ---- Kindergarten: the sounds letters make ----
  level("sp-k1", 0, "Short A Words", "RF.K.2d", "Listen for the middle sound. Every word here has a short a in it, like the a in cat. Walk over the letters in order to spell it.", ["cat", "bat", "map", "hat", "bag", "can", "pan", "ram", "tap", "jam"], { show: true, snakes: 0 }),
  level("sp-k2", 0, "Short I Words", "RF.K.2d", "Short i, like the i in pig. Say the word in your head, then find the first letter.", ["pig", "sit", "lid", "fin", "hit", "rip", "big", "win", "dig", "tin"], { show: true, snakes: 0 }),
  level("sp-k3", 0, "Short O Words", "RF.K.2d", "Short o, like the o in dog. Three letters, three stones, in order.", ["dog", "hop", "pot", "log", "mop", "cot", "fox", "box", "top", "rod"], { show: true, snakes: 1 }),
  level("sp-k4", 0, "Short U and E Words", "RF.K.2d", "Short u and short e now - bug and bed. Listen hard for the middle sound.", ["bug", "sun", "cup", "bed", "hen", "net", "mug", "jet", "leg", "nut"], { show: true, snakes: 1 }),
  level("sp-k5", 0, "Words We See Everywhere", "RF.K.3c", "These are words you will meet on every page you ever read, so they are worth knowing by heart.", ["the", "and", "see", "you", "are", "was", "for", "can", "like", "here"], { show: true, snakes: 1 }),
  level("sp-k6", 0, "The Kindergarten Clearing", "RF.K.2d", "Everything from this grade, mixed up. No warm-up and no pattern to lean on - this is the clearing that tells you which sounds really stuck.", ["cat", "pig", "dog", "bug", "bed", "sun", "the", "map", "fox", "net", "and", "hop"], { show: true, snakes: 1 }),

  // ---- Grade 1: two letters, one sound - and the silent e ----
  level("sp-11", 1, "Sh, Ch and Th", "RF.1.3a", "Two letters that make one sound: sh, ch and th. They travel together, so pick them up one after the other.", ["ship", "shop", "chin", "chop", "that", "then", "fish", "such", "with", "bath"], { show: true, snakes: 1 }),
  level("sp-12", 1, "Blends at the Front", "RF.1.3b", "Two sounds run together at the start: st, cl, fr, gr. You can hear both if you say it slowly.", ["stop", "clap", "frog", "grab", "spin", "swim", "trip", "flat", "drum", "glad"], { show: true, snakes: 1 }),
  level("sp-13", 1, "Magic E", "RF.1.3c", "A silent e on the end reaches back and makes the vowel say its name: cap becomes cape.", ["cake", "bike", "home", "cute", "name", "ride", "note", "time", "late", "rose"], { snakes: 1 }),
  level("sp-14", 1, "Two Vowels Walking", "RF.1.3c", "When two vowels go walking, the first one often does the talking: ai, ea, oa.", ["rain", "team", "boat", "read", "coat", "wait", "seat", "road", "beak", "pail"], { snakes: 1 }),
  level("sp-15", 1, "One or More Than One", "L.1.2d", "Adding s to make more than one, and the words that take es: box becomes boxes.", ["cats", "dogs", "cups", "boxes", "foxes", "bugs", "hats", "dishes", "wishes", "pans"], { snakes: 1 }),
  level("sp-16", 1, "The First Grade Clearing", "L.1.2e", "Every pattern from this grade in one clearing: the two-letter sounds, the blends, the magic e and the vowel teams, all mixed up.", ["ship", "stop", "cake", "rain", "boxes", "chin", "frog", "home", "boat", "wishes", "that", "bike"], { snakes: 2 }),

  // ---- Grade 2: longer patterns, and the words that bend ----
  level("sp-21", 2, "Vowel Teams", "L.2.2d", "ee, oo, ow and ay. Two letters, one vowel sound - learn the team and you can spell the lot.", ["sheep", "green", "moon", "book", "snow", "play", "tree", "food", "slow", "today"], { snakes: 1 }),
  level("sp-22", 2, "R Changes Everything", "L.2.2d", "Put an r after a vowel and it changes the sound: ar, or, er, ir, ur.", ["star", "farm", "corn", "horse", "bird", "girl", "turn", "hurt", "her", "sister"], { snakes: 1 }),
  level("sp-23", 2, "Words Pushed Together", "L.2.2d", "Two whole words joined into one. Spell the first, then spell the second.", ["sunset", "bedroom", "cupcake", "raincoat", "backpack", "pancake", "sandbox", "football", "homework", "campfire"], { snakes: 2 }),
  level("sp-24", 2, "Short Ways of Saying It", "L.2.2c", "A contraction with an apostrophe where the missing letters used to be. Spell the letters; the stone with the mark is the apostrophe.", ["can't", "don't", "isn't", "it's", "we'll", "you'll", "wasn't", "didn't", "you're", "they're"], { snakes: 1 }),
  level("sp-25", 2, "Adding ed and ing", "L.2.2d", "A doubled letter before ing: hop becomes hopping. Listen for the short vowel that asks for it.", ["jumped", "hopping", "running", "played", "sitting", "wanted", "helping", "stopped", "landed", "digging"], { snakes: 2 }),
  level("sp-26", 2, "The Second Grade Clearing", "L.2.2d", "Every pattern from this grade in one clearing, drawn at random, so there is nothing to lean on but what you know.", ["sheep", "star", "sunset", "hopping", "green", "horse", "cupcake", "played", "turn", "backpack", "moon", "stopped"], { snakes: 2 }),

  // ---- Grade 3: suffixes, syllables and the y rule ----
  level("sp-31", 3, "Changing Y to I", "L.3.2f", "When a word ends in y, the y turns into an i before you add the ending: happy becomes happier.", ["happier", "cities", "babies", "tried", "carried", "funniest", "ponies", "studied", "easier", "copies"], { snakes: 2 }),
  level("sp-32", 3, "Two Syllable Words", "L.3.2f", "Say it in two beats and spell one beat at a time: bas-ket.", ["basket", "garden", "rabbit", "winter", "summer", "number", "market", "lesson", "problem", "sudden"], { snakes: 2 }),
  level("sp-33", 3, "Endings That Mean a Person", "L.3.2e", "er, or and ist on the end: someone who does the thing.", ["teacher", "farmer", "actor", "artist", "builder", "sailor", "painter", "dentist", "writer", "inventor"], { snakes: 2 }),
  level("sp-34", 3, "Soft C and Soft G", "L.3.2f", "c and g go soft in front of e, i and y: city, giant.", ["city", "circle", "giant", "magic", "page", "cent", "dance", "gentle", "ice", "change"], { snakes: 2 }),
  level("sp-35", 3, "Words That Sound Alike", "L.3.2g", "Two words, one sound, different spellings. Listen to the whole sentence the teacher says.", ["their", "there", "hear", "here", "right", "write", "know", "no", "one", "won"], { snakes: 2 }),
  level("sp-36", 3, "The Third Grade Clearing", "L.3.2f", "Every pattern from this grade at once - the y rule, the syllables, the soft sounds and the words that sound alike.", ["happier", "basket", "teacher", "city", "their", "cities", "garden", "artist", "giant", "write", "studied", "gentle"], { snakes: 3 }),

  // ---- Grade 4: prefixes, endings and the awkward ones ----
  level("sp-41", 4, "Words That Start With a Clue", "L.4.2d", "re means again, un means not, pre means before. The prefix never changes its spelling.", ["rewrite", "return", "unhappy", "unlock", "preview", "replay", "unfair", "rebuild", "unknown", "prepaid"], { snakes: 2 }),
  level("sp-42", 4, "The shun Ending", "L.4.2d", "It sounds like shun and it is almost always spelled tion.", ["action", "station", "nation", "motion", "fiction", "mention", "section", "caption", "fraction", "question"], { snakes: 2 }),
  level("sp-43", 4, "Able and Ible", "L.4.2d", "Able after a whole word, ible after a part word. Say the root on its own and you will hear which.", ["comfortable", "valuable", "possible", "terrible", "enjoyable", "sensible", "reliable", "visible", "likeable", "horrible"], { snakes: 3 }),
  level("sp-44", 4, "Double Trouble", "L.4.2d", "The ones with a doubled letter in the middle that everybody drops.", ["address", "balloon", "butter", "cabbage", "dinner", "happen", "letter", "message", "support", "traffic"], { snakes: 3 }),
  level("sp-45", 4, "Sound Alikes, Harder", "L.4.2d", "Homophones that cost marks for the rest of your life if you leave them now.", ["your", "you're", "it's", "weather", "whether", "piece", "peace", "past", "passed", "principal"], { snakes: 3 }),
  level("sp-46", 4, "The Fourth Grade Clearing", "L.4.2d", "The whole grade in one clearing: prefixes, endings, doubled letters and the homophones that catch everybody out.", ["rewrite", "action", "possible", "address", "weather", "unhappy", "station", "terrible", "balloon", "piece", "preview", "question"], { snakes: 3 }),

  // ---- Grade 5: roots, and the words that give adults trouble ----
  level("sp-51", 5, "Greek Roots", "L.5.2e", "tele is far, graph is write, photo is light. Learn the root and you can spell the family.", ["telephone", "telescope", "photograph", "paragraph", "autograph", "biology", "geography", "microscope", "thermometer", "sympathy"], { snakes: 3 }),
  level("sp-52", 5, "Latin Roots", "L.5.2e", "port is carry, dict is say, rupt is break. Same trick, different language.", ["transport", "import", "predict", "dictate", "interrupt", "erupt", "export", "verdict", "portable", "disrupt"], { snakes: 3 }),
  level("sp-53", 5, "Ence and Ance", "L.5.2e", "Two endings that sound the same and are not. These are the ones worth knowing by sight.", ["sentence", "difference", "distance", "balance", "silence", "entrance", "audience", "appearance", "evidence", "importance"], { snakes: 3 }),
  level("sp-54", 5, "Silent Letters", "L.5.2e", "A letter that is there and says nothing: the k in knee, the b in thumb.", ["knee", "knight", "thumb", "climb", "wrist", "wrong", "island", "castle", "honest", "listen"], { snakes: 3 }),
  level("sp-55", 5, "Often Misspelled", "L.5.2e", "The ones that are spelled wrong more often than right.", ["because", "friend", "really", "separate", "believe", "receive", "February", "another", "beautiful", "favorite"], { snakes: 3 }),
  level("sp-56", 5, "The Fifth Grade Clearing", "L.5.2e", "Roots, endings, silent letters and the ones adults still get wrong - all in one clearing.", ["telephone", "transport", "sentence", "knee", "because", "photograph", "predict", "balance", "island", "believe", "geography", "separate"], { snakes: 3 }),

  // ---- Grade 6: the words that turn up in every subject ----
  level("sp-61", 6, "Science Words", "L.6.2b", "The spellings you need in a science book, where getting them wrong changes the meaning.", ["experiment", "hypothesis", "temperature", "molecule", "gravity", "energy", "mixture", "organism", "pressure", "chemical"], { snakes: 3 }),
  level("sp-62", 6, "History Words", "L.6.2b", "Words from history and civics that come up in every essay you will write.", ["government", "citizen", "ancient", "republic", "civilization", "empire", "liberty", "constitution", "century", "treaty"], { snakes: 3 }),
  level("sp-63", 6, "Ible, Able and the Rest", "L.6.2b", "The endings that sound the same at the end of a long word.", ["responsible", "available", "considerable", "incredible", "memorable", "accessible", "noticeable", "flexible", "reasonable", "eligible"], { snakes: 3 }),
  level("sp-64", 6, "Words With a Quiet Letter", "L.6.2b", "Letters that have gone quiet over the centuries and still have to be written.", ["rhythm", "subtle", "doubt", "column", "solemn", "receipt", "muscle", "scissors", "yacht", "foreign"], { snakes: 4 }),
  level("sp-65", 6, "Money and Business Words", "L.6.2b", "The spellings you need the day you run anything.", ["business", "receipt", "invoice", "budget", "customer", "profit", "expense", "finance", "purchase", "interest"], { snakes: 3 }),
  level("sp-66", 6, "The Sixth Grade Clearing", "L.6.2b", "Science, history, business and the quiet letters, all mixed together in one clearing.", ["experiment", "government", "responsible", "rhythm", "business", "hypothesis", "ancient", "incredible", "receipt", "budget", "molecule", "liberty"], { snakes: 4 }),

  // ---- Grade 7: longer words, same rules ----
  level("sp-71", 7, "Four Syllables and Up", "L.7.2b", "Long words are short words with pieces added. Spell one piece at a time.", ["information", "opportunity", "responsibility", "independence", "environment", "communication", "organization", "necessary", "particular", "experience"], { snakes: 4 }),
  level("sp-72", 7, "Prefixes That Mean Against and Between", "L.7.2b", "anti, inter, trans, sub - and none of them change spelling when you add them.", ["international", "transfer", "antifreeze", "submarine", "interact", "transform", "subtract", "antique", "interval", "transition"], { snakes: 4 }),
  level("sp-73", 7, "Ous, Eous and Ious", "L.7.2b", "One ending, three spellings, and the only way through is to know them.", ["dangerous", "famous", "courageous", "curious", "obvious", "serious", "generous", "gorgeous", "various", "nervous"], { snakes: 4 }),
  level("sp-74", 7, "Double or Single", "L.7.2b", "The consonant everybody doubles when they should not, and the one everybody leaves single.", ["necessary", "occasion", "accommodate", "embarrass", "recommend", "beginning", "committee", "exaggerate", "disappear", "tomorrow"], { snakes: 4 }),
  level("sp-75", 7, "Character Words", "L.7.2b", "Words for the things worth being: the ones you want to spell right in a letter about yourself.", ["honesty", "courage", "patience", "discipline", "integrity", "humility", "perseverance", "gratitude", "diligence", "respect"], { snakes: 4 }),
  level("sp-76", 7, "The Seventh Grade Clearing", "L.7.2b", "Long words, borrowed prefixes, the three ous endings and the doubled letters, mixed into one clearing.", ["information", "international", "dangerous", "necessary", "honesty", "opportunity", "transfer", "courageous", "embarrass", "perseverance", "environment", "committee"], { snakes: 4 }),

  // ---- Grade 8: the ones that catch everyone out ----
  level("sp-81", 8, "The Hard Ones", "L.8.2c", "The words that are spelled wrong in more documents than any others.", ["definitely", "separate", "privilege", "conscience", "maintenance", "occurrence", "existence", "independent", "persistent", "relevant"], { snakes: 4 }),
  level("sp-82", 8, "Ance, Ence and Ise", "L.8.2c", "Endings that sound identical and are not, in words you will write all year.", ["persistence", "resistance", "performance", "reference", "conference", "assistance", "preference", "insistence", "clearance", "occurrence"], { snakes: 4 }),
  level("sp-83", 8, "Words From Other Languages", "L.8.2c", "Words English borrowed and never respelled.", ["restaurant", "bouquet", "silhouette", "rendezvous", "entrepreneur", "bureau", "souvenir", "questionnaire", "liaison", "colleague"], { snakes: 4 }),
  level("sp-84", 8, "Maths and Logic Words", "L.8.2c", "Spellings you need in the subjects where precision is the point.", ["equation", "variable", "parallel", "symmetry", "coefficient", "perpendicular", "hypotenuse", "quadrilateral", "proportion", "estimate"], { snakes: 4 }),
  level("sp-85", 8, "Writing and Argument Words", "L.8.2c", "The words an essay is built out of.", ["argument", "evidence", "analysis", "paragraph", "conclusion", "persuasive", "reference", "summary", "thesis", "rhetoric"], { snakes: 4 }),
  level("sp-86", 8, "The Last Clearing", "L.8.2c", "Everything the ladder has taught, in one place: the hard ones, the endings, the borrowed words and the words you will write in every essay from here on.", ["definitely", "persistence", "restaurant", "equation", "argument", "privilege", "performance", "entrepreneur", "perpendicular", "analysis", "conscience", "silhouette"], { snakes: 4 }),
];

export const levelById = (id: string): SpellLevel | undefined => ALL_SPELL_LEVELS.find((l) => l.id === id);

/** The levels for one grade, in order. */
export const levelsForGrade = (grade: number): SpellLevel[] => ALL_SPELL_LEVELS.filter((l) => l.grade === Math.max(0, Math.min(8, grade)));

// ---------------- The clearing ----------------

/** The maze is this many tiles across and down. */
export const COLS = 13;
export const ROWS = 9;

export type TileKind = "floor" | "tree" | "water";

export interface Stone {
  /** Where it sits. */
  x: number;
  y: number;
  /** The letter on it. */
  ch: string;
  /**
   * Which letter of the word this is, or -1 for a stone that is not in the
   * word at all. Two stones can carry the same letter for a word like "ee".
   */
  at: number;
}

export interface Critter {
  x: number;
  y: number;
  /** Which way it is facing: 0 right, 1 down, 2 left, 3 up. */
  dir: number;
  /** What it is, for the art. */
  kind: "snake" | "frog" | "monkey";
}

export interface Spot {
  x: number;
  y: number;
}

export interface Clearing {
  word: string;
  tiles: TileKind[];
  stones: Stone[];
  critters: Critter[];
  start: Spot;
  /**
   * Boulders. Walk into one and you shove it along, if there is anywhere for
   * it to go. Nothing is ever locked behind one - they are there to be
   * pushed about, and to be parked in front of something with teeth.
   */
  rocks: Spot[];
  /** A gate across the path, and the key that opens it. Both or neither. */
  door: Spot | null;
  key: Spot | null;
}

/** From this grade up, a clearing can have boulders in it. */
const ROCKS_FROM_GRADE = 1;
/** And from this one, a gate and a key. */
const DOOR_FROM_GRADE = 3;

const at = (x: number, y: number) => y * COLS + x;
const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < COLS && y < ROWS;

/** Which way each step goes. */
export const DIRS: Record<string, { dx: number; dy: number }> = {
  r: { dx: 1, dy: 0 },
  d: { dx: 0, dy: 1 },
  l: { dx: -1, dy: 0 },
  u: { dx: 0, dy: -1 },
};
const TURN = ["r", "d", "l", "u"] as const;

/** Everywhere you can walk from here. */
function reachable(tiles: TileKind[], from: { x: number; y: number }): Set<number> {
  const seen = new Set<number>([at(from.x, from.y)]);
  const queue = [from];
  while (queue.length) {
    const p = queue.shift()!;
    for (const d of TURN) {
      const x = p.x + DIRS[d].dx;
      const y = p.y + DIRS[d].dy;
      if (!inside(x, y) || tiles[at(x, y)] !== "floor" || seen.has(at(x, y))) continue;
      seen.add(at(x, y));
      queue.push({ x, y });
    }
  }
  return seen;
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

/**
 * One clearing, built from a seed.
 *
 * Trees and water go down first, then everything is checked to be walkable
 * from the start - a letter you cannot reach is not a puzzle, it is a dead
 * end - and the stones and the animals go on the tiles that are left.
 *
 * Built the same way from the same seed every time, which is what lets the
 * server walk the same maze the kid walked.
 */
/** The same ground with some tiles blocked off, for asking "what if". */
function withBlocks(tiles: TileKind[], blocks: Spot[]): TileKind[] {
  const out = [...tiles];
  for (const b of blocks) out[at(b.x, b.y)] = "tree";
  return out;
}

/** Whether every letter can still be reached with these tiles blocked. */
function stillWalkable(tiles: TileKind[], start: Spot, stones: Stone[], blocks: Spot[], door: Spot | null): boolean {
  const open = reachable(withBlocks(tiles, door ? [...blocks, door] : blocks), start);
  return stones.every((s) => s.at < 0 || open.has(at(s.x, s.y)));
}

export function buildClearing(word: string, seed: number, snakes: number, grade = 0): Clearing {
  const letters = [...word.toLowerCase()];
  for (let attempt = 0; attempt < 24; attempt++) {
    const r = seededRng((seed >>> 0) * 7919 + attempt * 101 + 17);
    const tiles: TileKind[] = new Array(COLS * ROWS).fill("floor");
    // A wall all the way round, so nobody walks out of the jungle.
    for (let x = 0; x < COLS; x++) {
      tiles[at(x, 0)] = "tree";
      tiles[at(x, ROWS - 1)] = "tree";
    }
    for (let y = 0; y < ROWS; y++) {
      tiles[at(0, y)] = "tree";
      tiles[at(COLS - 1, y)] = "tree";
    }
    // Clumps of trees and pools inside it, on the odd tiles, so there is
    // always a lane between any two of them.
    for (let y = 2; y < ROWS - 1; y += 2) {
      for (let x = 2; x < COLS - 1; x += 2) {
        const roll = r();
        if (roll < 0.52) tiles[at(x, y)] = "tree";
        else if (roll < 0.62) tiles[at(x, y)] = "water";
        if (roll < 0.3 && inside(x + 1, y) && r() < 0.5) tiles[at(x + 1, y)] = "tree";
      }
    }
    const start = { x: 1, y: ROWS - 2 };
    tiles[at(start.x, start.y)] = "floor";
    const open = reachable(tiles, start);
    const free = [...open].filter((i) => i !== at(start.x, start.y));
    const need = letters.length + 3;
    if (free.length < need + snakes + 2) continue;

    // The stones: one per letter, spread out rather than in a heap.
    const spots = shuffle(r, free);
    const stones: Stone[] = [];
    const used = new Set<number>();
    const take = () => {
      while (spots.length) {
        const i = spots.shift()!;
        if (used.has(i)) continue;
        // Not right on top of another stone, where a kid cannot tell them
        // apart at a glance.
        if (stones.some((s) => Math.abs(s.x - (i % COLS)) + Math.abs(s.y - Math.floor(i / COLS)) < 2)) continue;
        used.add(i);
        return { x: i % COLS, y: Math.floor(i / COLS) };
      }
      return null;
    };
    let failed = false;
    letters.forEach((ch, n) => {
      const spot = take();
      if (!spot) failed = true;
      else stones.push({ ...spot, ch, at: n });
    });
    if (failed) continue;

    // A few stones that are not in the word at all, so walking over the
    // nearest letter is not the same as spelling it.
    const decoys = word.length >= 6 ? 3 : 2;
    for (let i = 0; i < decoys; i++) {
      const spot = take();
      if (!spot) break;
      const ch = ALPHABET[int(r, 0, 25)];
      stones.push({ ...spot, ch, at: -1 });
    }

    // What lives here. They start a good way from the start tile, so nothing
    // is on top of a kid before they have taken a step.
    const critters: Critter[] = [];
    const kinds: Critter["kind"][] = ["snake", "frog", "monkey"];
    for (let i = 0; i < snakes; i++) {
      let spot = take();
      let guard = 0;
      while (spot && Math.abs(spot.x - start.x) + Math.abs(spot.y - start.y) < 5 && guard++ < 20) spot = take();
      if (!spot) break;
      critters.push({ ...spot, dir: int(r, 0, 3), kind: kinds[i % kinds.length] });
    }

    // Boulders, on tiles nothing needs: every letter has to still be
    // reachable with the boulder sitting there, so a kid can shove them
    // about for fun or for cover and never shut themselves out.
    const rocks: Spot[] = [];
    if (grade >= ROCKS_FROM_GRADE) {
      const want = 2 + (grade >= 4 ? 1 : 0);
      for (let i = 0; i < want; i++) {
        const spot = take();
        if (!spot) break;
        if (!stillWalkable(tiles, start, stones, [...rocks, spot], null)) continue;
        rocks.push(spot);
      }
    }

    // A gate and its key. The key has to be fetchable without going through
    // the gate, and everything has to be reachable once it is open.
    let door: Spot | null = null;
    let key: Spot | null = null;
    if (grade >= DOOR_FROM_GRADE) {
      // Every tile a gate could stand on, not just the few left over: a gate
      // has to pinch the path somewhere, and most tiles do not.
      const candidates = shuffle(
        r,
        [...reachable(tiles, start)]
          .map((i) => ({ x: i % COLS, y: Math.floor(i / COLS) }))
          .filter(
            (p) =>
              !(p.x === start.x && p.y === start.y) &&
              !stones.some((st) => st.x === p.x && st.y === p.y) &&
              !rocks.some((rk) => rk.x === p.x && rk.y === p.y) &&
              !critters.some((c) => c.x === p.x && c.y === p.y),
          ),
      );
      for (const spot of candidates) {
        if (door) break;
        // A gate worth having shuts something away.
        const shut = reachable(withBlocks(tiles, [...rocks, spot]), start);
        const blocked = stones.some((st) => st.at >= 0 && !shut.has(at(st.x, st.y)));
        if (!blocked) continue;
        const keySpot = [...shut]
          .map((i) => ({ x: i % COLS, y: Math.floor(i / COLS) }))
          .find((p) => !(p.x === start.x && p.y === start.y) && !stones.some((st) => st.x === p.x && st.y === p.y) && !rocks.some((rk) => rk.x === p.x && rk.y === p.y));
        if (!keySpot) continue;
        door = spot;
        key = keySpot;
      }
    }

    return { word: word.toLowerCase(), tiles, stones, critters, start, rocks, door, key };
  }
  // Nothing but open ground: the fallback no seed should ever need, but a
  // level must always be playable.
  const tiles: TileKind[] = new Array(COLS * ROWS).fill("floor");
  for (let x = 0; x < COLS; x++) {
    tiles[at(x, 0)] = "tree";
    tiles[at(x, ROWS - 1)] = "tree";
  }
  for (let y = 0; y < ROWS; y++) {
    tiles[at(0, y)] = "tree";
    tiles[at(COLS - 1, y)] = "tree";
  }
  const stones = [...word.toLowerCase()].map((ch, n) => ({ x: 2 + n * 2, y: 2 + (n % 3) * 2, ch, at: n }));
  return { word: word.toLowerCase(), tiles, stones, critters: [], start: { x: 1, y: ROWS - 2 }, rocks: [], door: null, key: null };
}

/** The words this level asks for, in the order it asks for them. */
export function wordsFor(level: SpellLevel, seed: number): string[] {
  const r = seededRng((seed >>> 0) * 2654435761 + 13);
  return shuffle(r, level.words).slice(0, Math.min(WORDS_PER_LEVEL, level.words.length));
}

/** Whether this level writes the word up while they hunt for it. */
export const showsWord = (level: SpellLevel) => level.show === true || level.grade <= 1;

/** How many things are moving about in this level. */
export const crittersOn = (level: SpellLevel) => level.snakes ?? Math.min(4, 1 + Math.floor(level.grade / 2));

/** Whether this level scatters stones that are not in the word. */
export const decoysOn = (level: SpellLevel) => level.grade >= DECOYS_FROM_GRADE;

// ---------------- The walk ----------------

export type Dir = "u" | "d" | "l" | "r";

/**
 * How hard a kid wants it. Theirs to pick, every time they play.
 *
 * Easy has nothing in the clearing at all, which is the right setting for a
 * five-year-old working out where the letters are. Medium puts the animals
 * in but they only move when the kid moves, so thinking time is free. Hard
 * gives them their own clock: stand still and they still come.
 */
export type Pace = "easy" | "medium" | "hard";
export const PACES: Pace[] = ["easy", "medium", "hard"];

/** On hard, an animal takes another step for every one of these that passes. */
export const HARD_TICK_MS = 900;
/** However long a kid stands there, an animal never gets more than this in one go. */
export const MAX_TICKS = 4;

export interface Step {
  /** Where they went, or "w" for time passing with nobody moving. */
  d: Dir | "w";
  /** How long they took over it, for the pace they are keeping. */
  ms: number;
}

export interface SpellMove {
  seed: number;
  steps: Step[];
  /** How hard they asked for it. Easy if the browser does not say. */
  pace?: Pace;
}

/** Three bites and the level is over. */
export const LIVES = 3;
/** The most steps a run is allowed, so a hostile move list cannot spin the server. */
export const MAX_STEPS = 1200;
/** What a word is worth, before anything is taken off it. */
export const WORD_POINTS = 100;
/** What a wrong stone costs. */
export const WRONG_COST = 10;
/** A word spelled inside this many steps of the shortest possible walk is brisk. */
export const BRISK = 8;

/** A single step this slow is a kid working the word out rather than knowing it. */
export const MASTERY_STALL_MS = 9000;
/** The slowest word may be this many times the middling one, and no more. */
export const MASTERY_SPREAD = 2.5;
/** Below this, differences are how fast they walk rather than how well they know it. */
export const MASTERY_FLOOR_MS = 4000;

/** Reads better than `wrong === 0` in the line that decides a medal. */
const run0 = (n: number) => n === 0;

export interface Run {
  /** Where the boulders have got to. */
  rocks: Spot[];
  /** They are carrying the key. */
  hasKey: boolean;
  /** The gate is open. */
  doorOpen: boolean;
  /** Spelled the lot, cleanly, without stalling: worth a medal, once. */
  mastered: boolean;
  /** Which word of the level they are on. */
  word: number;
  /** The clearing as it stands. */
  clearing: Clearing;
  /** Where they are. */
  me: { x: number; y: number };
  /** Letters picked up so far, in order. */
  got: number;
  /** Stones already taken off the board this word. */
  taken: number[];
  /** Where the animals are now. */
  critters: Critter[];
  lives: number;
  /** Wrong stones stepped on, all level. */
  wrong: number;
  /** Words finished. */
  done: number;
  /** Words finished without a single wrong stone or bite. */
  clean: number;
  points: number;
  /** They have spelled every word this level asked for. */
  finished: boolean;
  /** Out of lives. */
  over: boolean;
  /** What just happened, for the screen to react to. */
  beat: "none" | "letter" | "wrong" | "bitten" | "word" | "level" | "push" | "stuck" | "key" | "locked";
  /** Steps taken on the word they are on. */
  stepsHere: number;
}

const cleanStep = (raw: unknown): Step | null => {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const d = String(o.d ?? "");
  if (!(d in DIRS) && d !== "w") return null;
  const ms = Number(o.ms);
  return { d: d as Dir | "w", ms: Number.isFinite(ms) ? Math.max(0, Math.min(120000, ms)) : 0 };
};

/** Anything the browser sends, turned into something safe to replay. */
export function cleanMove(raw: unknown): SpellMove {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const seed = Number(o.seed);
  const steps = (Array.isArray(o.steps) ? o.steps : []).slice(0, MAX_STEPS).map(cleanStep).filter((s): s is Step => s !== null);
  const pace = PACES.includes(o.pace as Pace) ? (o.pace as Pace) : "easy";
  return { seed: Number.isFinite(seed) ? Math.floor(Math.abs(seed)) % 2147483647 : 1, steps, pace };
}

/** Where a critter goes next: straight on while it can, round the corner when it cannot. */
function moveCritter(c: Critter, tiles: TileKind[], r: Rng, blocked: Spot[] = []): Critter {
  const order = [c.dir, (c.dir + 1) % 4, (c.dir + 3) % 4, (c.dir + 2) % 4];
  // A coin toss on which way it turns first, so two animals in the same
  // corner do not move as one.
  if (r() < 0.5) [order[1], order[2]] = [order[2], order[1]];
  for (const dir of order) {
    const d = DIRS[TURN[dir]];
    const x = c.x + d.dx;
    const y = c.y + d.dy;
    if (inside(x, y) && tiles[at(x, y)] === "floor" && !blocked.some((b) => b.x === x && b.y === y)) return { ...c, x, y, dir };
  }
  return c;
}

/**
 * Walk the maze.
 *
 * The one simulation: the screen runs it to draw the clearing, and the
 * server runs it again on the same seed and steps to work out the stars. If
 * the two ever disagreed, the server's answer is the one that counts.
 */
export function play(level: SpellLevel, raw: unknown): Run {
  const move = cleanMove(raw);
  const words = wordsFor(level, move.seed);
  const pace = move.pace ?? "easy";
  // Easy empties the clearing; the other two fill it the level's own way.
  const snakes = pace === "easy" ? 0 : crittersOn(level);

  let wordAt = 0;
  let clearing = buildClearing(words[0] ?? "cat", move.seed, snakes, level.grade);
  let me = { ...clearing.start };
  let rocks = clearing.rocks.map((p) => ({ ...p }));
  let hasKey = false;
  let doorOpen = false;
  let critters = clearing.critters.map((c) => ({ ...c }));
  let got = 0;
  let taken: number[] = [];
  let lives = LIVES;
  let wrong = 0;
  let doneWords = 0;
  let clean = 0;
  let points = 0;
  let over = false;
  let beat: Run["beat"] = "none";
  let stepsHere = 0;
  let wrongHere = 0;
  let bittenHere = false;
  /** How long each word took, for working out whether they were steady. */
  const wordMs: number[] = [];
  let msHere = 0;
  /** The longest a single step took: a kid sounding a word out in their head. */
  let longestStep = 0;

  /** Back to the mouth of the clearing, with the word to spell again. */
  const restartWord = () => {
    me = { ...clearing.start };
    critters = clearing.critters.map((c) => ({ ...c }));
    rocks = clearing.rocks.map((p) => ({ ...p }));
    hasKey = false;
    doorOpen = false;
    got = 0;
    taken = [];
    stepsHere = 0;
  };

  const r = seededRng((move.seed >>> 0) * 31 + 7);

  for (const step of move.steps.slice(0, MAX_STEPS)) {
    if (over || doneWords >= words.length) break;
    beat = "none";
    msHere += step.ms;
    longestStep = Math.max(longestStep, step.ms);

    // Time passing with nobody moving. On hard that is not free: the animals
    // keep coming. Anywhere else it costs nothing but the clock.
    if (step.d === "w") {
      if (pace !== "hard") continue;
      const ticks = Math.min(MAX_TICKS, Math.floor(step.ms / HARD_TICK_MS));
      for (let t = 0; t < ticks; t++) critters = critters.map((c) => moveCritter(c, clearing.tiles, r, [...rocks, ...(clearing.door && !doorOpen ? [clearing.door] : [])]));
      if (critters.some((c) => c.x === me.x && c.y === me.y)) {
        lives--;
        bittenHere = true;
        beat = "bitten";
        if (lives <= 0) {
          over = true;
          break;
        }
        restartWord();
      }
      continue;
    }

    const d = DIRS[step.d];
    const x = me.x + d.dx;
    const y = me.y + d.dy;
    // A tree or a pool is simply not a move: no step, no turn for the
    // animals, nothing lost.
    if (!inside(x, y) || clearing.tiles[at(x, y)] !== "floor") continue;

    // The gate: shut until they are carrying the key, and then it stays open.
    if (clearing.door && clearing.door.x === x && clearing.door.y === y && !doorOpen) {
      if (!hasKey) {
        beat = "locked";
        continue;
      }
      doorOpen = true;
    }

    // A boulder: shoved along if there is somewhere for it to go, and in the
    // way if there is not.
    const rock = rocks.findIndex((p) => p.x === x && p.y === y);
    if (rock >= 0) {
      const bx = x + d.dx;
      const by = y + d.dy;
      const free =
        inside(bx, by) &&
        clearing.tiles[at(bx, by)] === "floor" &&
        !rocks.some((p) => p.x === bx && p.y === by) &&
        !clearing.stones.some((st, i) => st.x === bx && st.y === by && !taken.includes(i)) &&
        !(clearing.door && clearing.door.x === bx && clearing.door.y === by && !doorOpen) &&
        !critters.some((c) => c.x === bx && c.y === by);
      if (!free) {
        beat = "stuck";
        continue;
      }
      rocks = rocks.map((p, i) => (i === rock ? { x: bx, y: by } : p));
      beat = "push";
    }

    me = { x, y };
    stepsHere++;

    // The key, if it is lying here.
    if (clearing.key && !hasKey && clearing.key.x === x && clearing.key.y === y) {
      hasKey = true;
      beat = "key";
    }

    // A stone underfoot.
    const stone = clearing.stones.findIndex((s, i) => s.x === x && s.y === y && !taken.includes(i));
    if (stone >= 0) {
      const s = clearing.stones[stone];
      if (s.at === got) {
        taken = [...taken, stone];
        got++;
        beat = "letter";
      } else {
        wrong++;
        wrongHere++;
        beat = "wrong";
      }
    }

    // Everything that lives here takes its turn after they take theirs - and
    // on hard it takes one more for every second they spent deciding.
    const turns = pace === "hard" ? 1 + Math.min(MAX_TICKS - 1, Math.floor(step.ms / HARD_TICK_MS)) : 1;
    for (let t = 0; t < turns; t++) critters = critters.map((c) => moveCritter(c, clearing.tiles, r, [...rocks, ...(clearing.door && !doorOpen ? [clearing.door] : [])]));
    if (critters.some((c) => c.x === me.x && c.y === me.y)) {
      lives--;
      bittenHere = true;
      beat = "bitten";
      if (lives <= 0) {
        over = true;
        break;
      }
      restartWord();
      continue;
    }

    // The word is spelled.
    if (got >= clearing.word.length) {
      doneWords++;
      const shortest = clearing.word.length * 2;
      points += Math.max(20, WORD_POINTS - wrongHere * WRONG_COST + (stepsHere <= shortest + BRISK ? 20 : 0));
      if (wrongHere === 0 && !bittenHere) clean++;
      wordMs.push(msHere);
      msHere = 0;
      beat = doneWords >= words.length ? "level" : "word";
      wrongHere = 0;
      bittenHere = false;
      wordAt = doneWords;
      if (doneWords < words.length) {
        clearing = buildClearing(words[wordAt], move.seed + wordAt * 977, snakes, level.grade);
        restartWord();
      }
    }
  }

  const finished = doneWords >= words.length && !over;
  /**
   * Mastered: every word spelled, nothing stepped on by mistake, nothing
   * caught them, and no word that took them far longer than the rest - which
   * is what sounding a word out letter by letter looks like from here. Any
   * pace counts: mastery is about knowing the spelling, not about outrunning
   * a frog.
   */
  const steady = (() => {
    if (wordMs.length === 0) return false;
    if (longestStep > MASTERY_STALL_MS) return false;
    const sorted = [...wordMs].sort((a, b) => a - b);
    const middle = Math.max(MASTERY_FLOOR_MS, sorted[Math.floor(sorted.length / 2)]);
    return Math.max(...wordMs) <= middle * MASTERY_SPREAD;
  })();
  const mastered = finished && run0(wrong) && clean >= words.length && steady;
  return {
    mastered,
    rocks,
    hasKey,
    doorOpen,
    word: Math.min(wordAt, words.length - 1),
    clearing,
    me,
    got,
    taken,
    critters,
    lives,
    wrong,
    done: doneWords,
    clean,
    points,
    finished,
    over,
    beat,
    stepsHere,
  };
}

/**
 * Stars.
 *
 * Three is every word spelled with nothing stepped on by mistake and nothing
 * catching them: the level is theirs. Two is every word spelled. One is
 * having got somewhere. The point is spelling the words, so finishing counts
 * for most of it.
 */
export function starsFor(run: Run, words: number): number {
  if (!run.finished) return run.done > 0 ? 1 : 0;
  if (run.clean >= words) return 3;
  return 2;
}

/** The moves a kid would make if they walked straight to every letter in turn. */
export function perfectMoves(level: SpellLevel, seed = 1, pace: Pace = "easy"): SpellMove {
  const words = wordsFor(level, seed);
  const snakes = pace === "easy" ? 0 : crittersOn(level);
  const steps: Step[] = [];
  for (let w = 0; w < words.length; w++) {
    const clearing = buildClearing(words[w], w === 0 ? seed : seed + w * 977, snakes, level.grade);
    let from = { ...clearing.start };
    const taken = new Set<number>();
    // The key first, if there is one: nothing past the gate can be had
    // without it, and the walk through the gate opens it on the way.
    if (clearing.key && clearing.door) {
      const toKey =
        routeTo(withBlocks(clearing.tiles, [clearing.door, ...clearing.rocks, ...clearing.stones]), from, clearing.key) ??
        routeTo(withBlocks(clearing.tiles, [clearing.door, ...clearing.stones]), from, clearing.key) ??
        routeTo(withBlocks(clearing.tiles, [clearing.door]), from, clearing.key);
      if (!toKey) return { seed, steps, pace };
      for (const d of toKey) steps.push({ d, ms: 420 });
      from = { ...clearing.key };
    }
    for (let n = 0; n < clearing.word.length; n++) {
      const stone = clearing.stones.find((s) => s.at === n)!;
      // Walk round the other stones rather than over them: treading on the
      // wrong letter on the way to the right one is exactly the mistake this
      // is meant to be free of.
      // Round the other stones and the boulders if it can, round the stones
      // alone if it cannot, and straight there if there is no other way -
      // treading on the wrong letter is the one thing this walk is for
      // avoiding, so the boulders are the first thing to give.
      const walled = (blocks: Spot[]) => clearing.tiles.map((t, i) => (blocks.some((b) => b.y * COLS + b.x === i) ? ("tree" as TileKind) : t));
      const others = clearing.stones.filter((o, oi) => o !== stone && !taken.has(oi));
      // The boulders stay walled off whatever happens: a walk that shoves
      // one is a walk whose next step lands somewhere else, and the whole
      // list after it is nonsense.
      const path =
        routeTo(walled([...others, ...clearing.rocks]), from, { x: stone.x, y: stone.y }) ??
        routeTo(walled(clearing.rocks), from, { x: stone.x, y: stone.y }) ??
        routeTo(clearing.tiles, from, { x: stone.x, y: stone.y });
      if (!path) return { seed, steps, pace };
      for (const d of path) steps.push({ d, ms: 420 });
      taken.add(clearing.stones.indexOf(stone));
      from = { x: stone.x, y: stone.y };
    }
  }
  return { seed, steps, pace };
}

/** The shortest walk from one tile to another, as a list of directions. */
export function routeTo(tiles: TileKind[], from: { x: number; y: number }, to: { x: number; y: number }): Dir[] | null {
  const came = new Map<number, { prev: number; d: Dir }>();
  const seen = new Set<number>([at(from.x, from.y)]);
  const queue = [from];
  while (queue.length) {
    const p = queue.shift()!;
    if (p.x === to.x && p.y === to.y) break;
    for (const d of TURN) {
      const x = p.x + DIRS[d].dx;
      const y = p.y + DIRS[d].dy;
      if (!inside(x, y) || tiles[at(x, y)] !== "floor" || seen.has(at(x, y))) continue;
      seen.add(at(x, y));
      came.set(at(x, y), { prev: at(p.x, p.y), d });
      queue.push({ x, y });
    }
  }
  if (!seen.has(at(to.x, to.y))) return null;
  const out: Dir[] = [];
  let here = at(to.x, to.y);
  const startAt = at(from.x, from.y);
  while (here !== startAt) {
    const back = came.get(here);
    if (!back) return null;
    out.unshift(back.d);
    here = back.prev;
  }
  return out;
}

// ---------------- What the mastery meter is told ----------------

/** A word spelled in a game is worth a fraction of a graded lesson answer. */
const GAME_WEIGHT = 0.25;
/** What a kid who knows a word takes to walk it. */
const EXPECTED_MS = 9000;

export function evidenceFor(levelId: string, raw: unknown): GameEvidence[] {
  const level = levelById(levelId);
  if (!level) return [];
  const run = play(level, raw);
  if (run.done === 0 && run.wrong === 0) return [];
  // One row for the level, not one per word: a kid who spelled five words is
  // one piece of evidence about this pattern, at a drill's weight.
  return [
    {
      subject: "ela",
      concept: level.standard,
      correct: run.clean > 0 && run.wrong === 0,
      firstTry: run.wrong === 0,
      rung: 0,
      angle: "fluency",
      ms: EXPECTED_MS,
      expectedMs: EXPECTED_MS,
      at: Date.now(),
      weight: GAME_WEIGHT,
    },
  ];
}

// ---------------- The art ----------------

/** A tree: the wall of the clearing, in two shades so it reads as leaves. */
export function treeGrid(frame = 0): Grid {
  const g = new Grid(12, 12);
  const leaf = "#2f7d46";
  g.rect(0, 0, 12, 12, shade(leaf, -0.55));
  g.disc(4, 4, 3.4, leaf);
  g.disc(8, 5, 3.2, shade(leaf, 0.18));
  g.disc(6, 9, 3.4, shade(leaf, -0.2));
  g.set(3 + (frame % 2), 3, shade(leaf, 0.45));
  return g;
}

/** Water: a pool they have to walk around. */
export function waterGrid(frame = 0): Grid {
  const g = new Grid(12, 12);
  const deep = "#1b6fa8";
  g.rect(0, 0, 12, 12, deep);
  g.rect(1, 3 + (frame % 2), 5, 1, shade(deep, 0.4));
  g.rect(6, 7 - (frame % 2), 4, 1, shade(deep, 0.3));
  return g;
}

/** The ground they walk on. */
export function floorGrid(): Grid {
  const g = new Grid(12, 12);
  const dirt = "#8aa65a";
  g.rect(0, 0, 12, 12, dirt);
  g.set(2, 3, shade(dirt, -0.18));
  g.set(8, 6, shade(dirt, -0.18));
  g.set(5, 9, shade(dirt, 0.2));
  return g;
}

/** A stone with a letter on it - the letter itself is written over the top. */
export function stoneGrid(taken: boolean): Grid {
  const g = new Grid(12, 12);
  const rock = taken ? "#7a8f6a" : "#d8d2c0";
  g.disc(6, 6, 5.4, shade(rock, -0.45));
  g.disc(6, 6, 4.6, rock);
  g.set(4, 4, shade(rock, 0.4));
  return g;
}

/** A snake: the thing that sends you back to the start of the word. */
export function snakeGrid(frame = 0): Grid {
  const g = new Grid(14, 12);
  const skin = "#2f8f52";
  const band = "#f2d24a";
  const wave = frame % 2 === 0 ? 0 : 1;
  for (let x = 1; x < 12; x++) {
    const y = 6 + Math.round(Math.sin((x / 11) * Math.PI * 2 + wave) * 2);
    g.rect(x, y, 1, 3, skin);
    if (x % 3 === 0) g.set(x, y + 1, band);
  }
  const headY = 6 + Math.round(Math.sin(wave) * 2);
  g.rect(0, headY - 1, 3, 4, skin);
  g.set(1, headY, "#1b1530");
  g.rect(0, headY + 3, 2, 1, "#e0453a");
  return g;
}

/** A frog: hops about, and is just as bad to walk into. */
export function frogGrid(frame = 0): Grid {
  const g = new Grid(12, 12);
  const skin = "#63c47f";
  const hop = frame % 2;
  g.disc(6, 8 - hop, 4, skin);
  g.disc(4, 5 - hop, 2, shade(skin, 0.25));
  g.disc(8, 5 - hop, 2, shade(skin, 0.25));
  g.set(4, 5 - hop, "#1b1530");
  g.set(8, 5 - hop, "#1b1530");
  g.rect(1, 10 - hop, 3, 1, shade(skin, -0.3));
  g.rect(8, 10 - hop, 3, 1, shade(skin, -0.3));
  return g;
}

/** A monkey: swings down out of the canopy and will take a word off you. */
export function monkeyGrid(frame = 0): Grid {
  const g = new Grid(12, 12);
  const fur = "#8a5a2a";
  const face = "#e0b48a";
  const swing = frame % 2;
  g.disc(6, 7 + swing, 3.6, fur);
  g.disc(6, 4 + swing, 2.8, fur);
  g.disc(6, 4 + swing, 1.8, face);
  g.set(5, 4 + swing, "#1b1530");
  g.set(7, 4 + swing, "#1b1530");
  g.disc(2, 4 + swing, 1.4, fur);
  g.disc(10, 4 + swing, 1.4, fur);
  g.rect(9, 8 + swing, 3, 1, shade(fur, -0.25));
  return g;
}

/** A parrot, sat in the trees, because a jungle needs something watching. */
export function parrotGrid(frame = 0): Grid {
  const g = new Grid(10, 12);
  const body = "#e0453a";
  const wing = "#2f8f52";
  const flap = frame % 2;
  g.disc(5, 7, 3.2, body);
  g.disc(5, 3, 2.2, body);
  g.set(4, 3, "#1b1530");
  g.rect(7, 3, 2, 2, "#f2a516");
  g.disc(3, 7 - flap, 2, wing);
  g.rect(5, 10, 1, 2, "#f2a516");
  return g;
}

/** A boulder, there to be shoved along. */
export function rockGrid(): Grid {
  const g = new Grid(12, 12);
  const stone = "#9a9a8a";
  g.disc(6, 7, 5.2, shade(stone, -0.45));
  g.disc(6, 7, 4.4, stone);
  g.disc(4, 5, 1.6, shade(stone, 0.3));
  g.rect(2, 11, 9, 1, shade(stone, -0.55));
  return g;
}

/** The key to the gate. */
export function keyGrid(frame = 0): Grid {
  const g = new Grid(12, 12);
  const gold = "#f2d24a";
  const lift = frame % 2;
  g.disc(4, 5 - lift, 2.6, shade(gold, -0.4));
  g.disc(4, 5 - lift, 1.4, null);
  g.rect(6, 4 - lift, 5, 2, gold);
  g.rect(9, 6 - lift, 1, 2, gold);
  g.rect(7, 6 - lift, 1, 2, gold);
  return g;
}

/** The gate across the path: shut, then open. */
export function doorGrid(open: boolean): Grid {
  const g = new Grid(12, 12);
  const wood = "#8a6a3c";
  const iron = "#5e6672";
  if (open) {
    g.rect(0, 0, 3, 12, shade(wood, -0.3));
    g.rect(9, 0, 3, 12, shade(wood, -0.3));
    return g;
  }
  g.rect(0, 0, 12, 12, wood);
  for (let y = 1; y < 12; y += 3) g.rect(0, y, 12, 1, shade(wood, -0.35));
  g.rect(4, 4, 4, 4, iron);
  g.set(6, 6, "#1b1530");
  return g;
}

/** The way out of the clearing, open once the word is spelled. */
export function gateGrid(open: boolean): Grid {
  const g = new Grid(12, 12);
  const vine = "#2f7d46";
  const gold = "#f2d24a";
  if (open) {
    g.rect(0, 0, 2, 12, vine);
    g.rect(10, 0, 2, 12, vine);
    g.disc(6, 6, 3, gold);
    g.disc(6, 6, 1.6, "#fff3bf");
  } else {
    for (let x = 0; x < 12; x += 3) g.rect(x, 0, 2, 12, vine);
    g.rect(0, 5, 12, 2, shade(vine, -0.35));
  }
  return g;
}

// ---------------- The medal ----------------

/** The ribbons a medal can hang from, one per grade. */
const RIBBONS = ["#2340ff", "#e0453a", "#22a35a", "#8e44ad", "#16a3b8", "#ec6aa0", "#f2a516", "#3d4a5c", "#b5651d", "#1f7a5c", "#7a2f4a", "#4a5190"];

/**
 * The medal for mastering a level - a different one for every level, so a
 * shelf of them means something.
 *
 * The grade picks the ribbon and the level's place in that grade picks what
 * is stamped on it, which makes all fifty-four of them different and makes a
 * row of them readable: same colour, same year's work.
 */
export function medalGrid(levelId: string, frame = 0): Grid {
  const i = Math.max(0, ALL_SPELL_LEVELS.findIndex((l) => l.id === levelId));
  const lvl = ALL_SPELL_LEVELS[i] ?? ALL_SPELL_LEVELS[0];
  const ribbon = RIBBONS[(lvl.grade + 0) % RIBBONS.length];
  const stamp = i % 6;

  const g = new Grid(18, 22);
  const gold = "#f2d24a";
  const deep = "#b8860b";
  const leaf = "#2f7d46";

  // The ribbon, in two tails.
  g.rect(4, 0, 3, 8, ribbon);
  g.rect(11, 0, 3, 8, ribbon);
  g.rect(4, 7, 10, 2, shade(ribbon, -0.3));

  // The disc, with a wreath of leaves round it - this one is won in a jungle.
  g.disc(9, 14, 7, deep);
  g.disc(9, 14, 5.6, gold);
  for (let n = 0; n < 8; n++) {
    const a = (n / 8) * Math.PI * 2;
    g.set(Math.round(9 + Math.cos(a) * 6.6), Math.round(14 + Math.sin(a) * 6.6), leaf);
  }

  const ink = "#8a6a10";
  if (stamp === 0) g.tri(9, 10, 17, 4, ink);
  else if (stamp === 1) {
    g.rect(6, 13, 7, 2, ink);
    g.rect(8, 11, 2, 6, ink);
  } else if (stamp === 2) g.disc(9, 14, 3, ink).disc(9, 14, 1.6, gold);
  else if (stamp === 3) {
    g.rect(6, 11, 2, 6, ink);
    g.rect(11, 11, 2, 6, ink);
    g.rect(8, 13, 3, 2, ink);
  } else if (stamp === 4) {
    g.rect(6, 11, 7, 2, ink);
    g.rect(6, 16, 7, 2, ink);
    g.rect(8, 13, 3, 3, ink);
  } else {
    g.rect(6, 11, 7, 7, ink);
    g.rect(8, 13, 3, 3, gold);
  }

  g.set(frame % 2 === 0 ? 6 : 12, frame % 2 === 0 ? 11 : 17, "#fff3bf");
  return g;
}

// ---------------- The registry entry ----------------

export const spellRush: MiniGame = {
  ...spellRushInfo,
  // One ladder for everybody: K-5 start at the bottom because that is where
  // spelling starts, and 6-8 are placed part way up it by the check first.
  levels: () => ALL_SPELL_LEVELS,
  levelsForGrade: () => ALL_SPELL_LEVELS,
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    try {
      const run = play(level, moves);
      return { stars: starsFor(run, Math.min(WORDS_PER_LEVEL, level.words.length)), best: run.points };
    } catch {
      return { stars: 0, best: 0 };
    }
  },
  medal: (levelId, frame) => medalGrid(levelId, frame),
  mastered: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return false;
    try {
      return play(level, moves).mastered;
    } catch {
      return false;
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

// ---------------- Where an older kid starts ----------------

/**
 * The rungs the placement asks about: eight levels spread up the ladder, far
 * enough apart that getting one right says something about the ones below
 * it.
 */
export const PLACEMENT_RUNGS = [2, 8, 14, 20, 26, 32, 38, 44];

/** One word to spell, as the check asks it. */
export interface SpellCheck {
  rung: number;
  title: string;
  /** The word itself. It is said out loud, so the browser has to have it. */
  word: string;
}

/**
 * The words the check asks for.
 *
 * One from each rung, picked by the seed, so two kids sitting it on the same
 * afternoon do not get the same eight words.
 *
 * The word travels to the browser because the browser has to say it out
 * loud, which means a determined kid could dig it out of the page. That is a
 * trade worth making: the only thing this decides is where they start, and
 * cheating it puts them somewhere too hard.
 */
export function placementWords(seed: number): SpellCheck[] {
  return PLACEMENT_RUNGS.map((rung, i) => {
    const level = ALL_SPELL_LEVELS[Math.min(rung, ALL_SPELL_LEVELS.length - 1)];
    const r = seededRng((seed >>> 0) * 1013 + rung * 29 + i);
    const word = shuffle(r, level.words)[0];
    return { rung, title: level.title, word };
  });
}

/**
 * Where the check puts them: the first word they could not spell.
 *
 * Everything below it opens up as well, so they can go back over anything
 * they want; the rung they tripped on is where the work is. Spelling the lot
 * opens the whole ladder.
 */
export function placeFrom(seed: number, answers: unknown): { rung: number; title: string; right: number; asked: number } {
  const said = (Array.isArray(answers) ? answers : []).map((a) => String(a ?? "").trim().toLowerCase());
  const asks = placementWords(seed);
  let right = 0;
  for (let i = 0; i < asks.length; i++) {
    if (said[i] !== asks[i].word.toLowerCase()) return { rung: asks[i].rung, title: asks[i].title, right, asked: asks.length };
    right++;
  }
  return { rung: ALL_SPELL_LEVELS.length, title: "the whole ladder", right, asked: asks.length };
}
