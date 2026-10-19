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

// ---------------- Where a level happens ----------------

/** What the walls of a place are made of. */
export type WallKind = "leaf" | "bamboo" | "rock" | "column" | "crystal" | "reed" | "snow" | "stack";

/** What a place keeps in it. */
export type CritterKind = "snake" | "frog" | "monkey" | "bat" | "croc" | "spider" | "beetle";
export const CRITTER_KINDS: CritterKind[] = ["snake", "frog", "monkey", "bat", "croc", "spider", "beetle"];

/**
 * A lane of things that keep moving whether you do or not.
 *
 * Two kinds. A river runs logs along a row of water: the water is no good to
 * stand in, the logs are, and they carry you while you stand on one. A
 * stampede runs something heavy along a row of open ground, and being on
 * that row when one arrives is the same as being caught.
 *
 * Nothing about a lane is random. Where everything in it is at any moment is
 * worked out from the turn number, so the server sees exactly what the kid
 * saw - and a kid who waits can always find a gap, because the gaps come
 * round like clockwork.
 */
export interface Lane {
  /** The row it runs along. */
  y: number;
  /** Which way: 1 right, -1 left. */
  dir: 1 | -1;
  kind: "log" | "runner";
  /** Tiles between one and the next. */
  gap: number;
  /** Where the pattern sits at turn zero. */
  offset: number;
}

/** Whether this lane has something on this tile, this turn. */
export function laneAt(lane: Lane, x: number, turn: number): boolean {
  const n = x - lane.dir * turn - lane.offset;
  return ((n % lane.gap) + lane.gap) % lane.gap === 0;
}

/**
 * What makes this level this level.
 *
 * Every clearing is a maze with letters in it; the challenge is the thing
 * that makes one different from the next, and no two in a row are the same.
 * The teacher names it before the count-in so a kid knows what they are
 * walking into.
 */
export type ChallengeKind =
  /** Nothing but the maze. The first couple, and nowhere else. */
  | "plain"
  /** A river across it, with logs going by. Ride one over. */
  | "river"
  /** Something heavy runs a row of it, over and over. Time it. */
  | "stampede"
  /** A channel with no way round. Shove a boulder in and walk over it. */
  | "bridge"
  /** A gate across the path and a key lying somewhere else. */
  | "gate"
  /** Ice: you keep going. */
  | "ice"
  /** Mud: it holds you, and everything else gets a free move. */
  | "mud"
  /** Creepers that carry you a tile further than you meant to go. */
  | "vines"
  /** Holes to go round. */
  | "pits"
  /** You can only see as far as the lantern reaches. */
  | "dark"
  /** Something is sitting on a letter. You will have to go past it. */
  | "guard"
  /** Tighter walls and fewer ways through. */
  | "maze"
  /** More of them in here than usual. */
  | "swarm";

/** What the teacher says it is, and what to do about it. */
export const CHALLENGE_SAY: Record<ChallengeKind, string> = {
  plain: "Nothing in your way here. Find the letters and walk them in order.",
  river: "A river runs through this one. The water is no good to stand in - wait for a log, step on, and step straight off the other side.",
  stampede: "Something big runs along one row of this clearing, over and over. Watch it go by once, then cross behind it.",
  bridge: "There is a channel through here with no way round. Shove a boulder into it and walk over the top.",
  gate: "A gate across the path, and the key is lying somewhere else. Find the key first.",
  ice: "The ground is ice. Step once and you keep going, so look where you will end up, not where you are.",
  mud: "Mud. It holds you, and everything else in here gets a free move while you pull your boots out.",
  vines: "Creepers across the floor. Step on one and it carries you a tile further than you meant to go.",
  pits: "Holes in the ground. They are not a way through, whatever they look like.",
  dark: "It is dark in here. You can only see as far as your lantern - the letters are out there all the same.",
  guard: "Something is sitting right by a letter. You will have to go past it to get that one.",
  maze: "Tight in here, and not many ways through. Pick your lane before you walk it.",
  swarm: "More of them in this one than anywhere. Keep moving.",
};

/** Ground that does something when you stand on it. */
export type SpecialTile = "mud" | "vine" | "ice" | "pit";

/**
 * One place to spell in.
 *
 * Fifty-four of them, one per level, so no two levels look the same and a
 * kid can say which one they mean. A place is its colours, what its walls
 * are made of, what lives in it and what its ground does.
 */
export interface Place {
  id: string;
  /** Written under the clearing and said by the teacher. */
  name: string;
  /** The ground, and the shade under it. */
  floor: string;
  under: string;
  /** The walls, and what they are. */
  wall: WallKind;
  wallInk: [string, string];
  water: string;
  /** What lives here. */
  critters: CritterKind[];
  /** What this level is about. */
  challenge: ChallengeKind;
  /** What its ground does, if anything. Worked out from the challenge. */
  special: SpecialTile | null;
  /** A river runs through it, with logs to ride across. */
  river?: boolean;
  /** Something heavy runs along one row of it, over and over. */
  stampede?: boolean;
  /** A channel it has to be bridged across. */
  bridge?: boolean;
  /** A gate and a key, whatever the grade. */
  gate?: boolean;
  /** Something sits by a letter. */
  guard?: boolean;
  /** Tighter walls. */
  maze?: boolean;
  /** More animals than usual. */
  swarm?: boolean;
  /** A dark place wants its writing light. */
  dark?: boolean;
}

const place = (
  id: string,
  name: string,
  floor: string,
  under: string,
  wall: WallKind,
  wallInk: [string, string],
  water: string,
  critters: CritterKind[],
  challenge: ChallengeKind = "plain",
  dark = false,
): Place => ({
  id,
  name,
  floor,
  under,
  wall,
  wallInk,
  water,
  critters,
  challenge,
  special: challenge === "ice" ? "ice" : challenge === "mud" ? "mud" : challenge === "vines" ? "vine" : challenge === "pits" ? "pit" : null,
  dark: dark || challenge === "dark",
  river: challenge === "river",
  stampede: challenge === "stampede",
  bridge: challenge === "bridge",
  gate: challenge === "gate",
  guard: challenge === "guard",
  maze: challenge === "maze",
  swarm: challenge === "swarm",
});

/**
 * Six per grade, in the order the levels are played: the ground changes as
 * the spelling does.
 */
export const PLACES: Place[] = [
  // Kindergarten: easy ground, nothing much in it.
  place("meadow", "Sunny Meadow", "#8aa65a", "#5f7f2d", "leaf", ["#2f7d46", "#63c47f"], "#4aa8d8", [], "plain"),
  place("glade", "Fern Glade", "#7fa85c", "#54722f", "leaf", ["#2f6b48", "#8cc06a"], "#4aa8d8", [], "guard"),
  place("palms", "Palm Beach", "#e8d2a8", "#b8a075", "leaf", ["#5b4228", "#63c47f"], "#2f9ec4", ["frog"], "plain"),
  place("pond", "Lily Pond", "#7fa870", "#53704a", "reed", ["#2f7d46", "#a8d86a"], "#2f88bb", ["frog"], "mud"),
  place("hollow", "Mossy Hollow", "#6f9a52", "#466a30", "leaf", ["#355c2a", "#7fc46a"], "#3f94c4", ["snake"], "maze"),
  place("clearing", "The First Clearing", "#8aa65a", "#5f7f2d", "leaf", ["#2f7d46", "#63c47f"], "#4aa8d8", ["snake", "frog"], "swarm"),

  // Grade 1: bamboo, vines, the first monkeys.
  place("bamboo", "Bamboo Walk", "#7aa84f", "#4e7030", "bamboo", ["#4f7a3a", "#c8e59a"], "#3f94c4", ["monkey"], "maze"),
  place("canopy", "The Canopy", "#5f8f4a", "#3c5e2c", "leaf", ["#2f6b48", "#8cc06a"], "#3f94c4", ["monkey"], "vines"),
  place("creek", "Stony Creek", "#9aa87a", "#68744f", "rock", ["#8a8f84", "#cdd4dd"], "#2f88bb", ["frog", "croc"], "river"),
  place("thicket", "Thorn Thicket", "#6a8f4a", "#44602c", "leaf", ["#5b4228", "#7fc46a"], "#3f94c4", ["snake"], "mud"),
  place("orchard", "Wild Orchard", "#8fb05c", "#5e7536", "leaf", ["#6b4a2a", "#ff9ec4"], "#4aa8d8", ["monkey", "frog"], "guard"),
  place("riverbend", "The River Bend", "#8aa65a", "#5f7f2d", "reed", ["#4f7a3a", "#a8d86a"], "#2f88bb", ["croc"], "river"),

  // Grade 2: the first caves and the first bats.
  place("cave", "Dripping Cave", "#6a6a7a", "#42424f", "rock", ["#5e6672", "#9aa0ab"], "#2f6b8a", ["bat"], "dark", true),
  place("gorge", "Red Gorge", "#c4703c", "#8a4a26", "rock", ["#a85b30", "#e0a070"], "#2f88bb", ["snake"], "bridge"),
  place("falls", "Shouting Falls", "#7fa870", "#53704a", "rock", ["#6b7a8c", "#bcd8e8"], "#2f9ec4", ["croc", "frog"], "river"),
  place("roots", "The Root Tangle", "#6f8a4a", "#475c2c", "leaf", ["#5b4228", "#63c47f"], "#3f94c4", ["spider"], "vines"),
  place("mudflats", "The Mudflats", "#8a7a52", "#5c5236", "reed", ["#7a8f4a", "#c2cf7a"], "#4a6b45", ["croc"], "mud"),
  place("hive", "The Beetle Hive", "#9a8a5a", "#685c38", "stack", ["#6b4a2a", "#e8c168"], "#3f94c4", ["beetle", "spider"], "swarm"),

  // Grade 3: ruins, and ground that moves you.
  place("ruins", "Old Ruins", "#9a9a86", "#6b6b5c", "column", ["#d8d2c0", "#a79fb5"], "#3f94c4", ["spider"], "gate"),
  place("temple", "The Lost Temple", "#8a8296", "#5e5870", "column", ["#cdd4dd", "#8d9bad"], "#2f6b8a", ["spider", "bat"], "dark", true),
  place("steps", "The Moss Steps", "#6f9a52", "#466a30", "rock", ["#6b7a8c", "#8cc06a"], "#3f94c4", ["snake", "monkey"], "maze"),
  place("crystalcave", "Crystal Cave", "#4a4a63", "#2f2f42", "crystal", ["#7fd8ff", "#bdf0ff"], "#1b6fa8", ["bat"], "guard", true),
  place("swamp", "The Green Swamp", "#5c7a4a", "#3a5230", "reed", ["#4a6b45", "#8cc06a"], "#3a6b4a", ["croc", "frog"], "bridge"),
  place("stormwood", "Stormwood", "#6a7a5c", "#47553c", "leaf", ["#4a3f36", "#8a9a78"], "#3f7a9c", ["snake", "bat"], "stampede"),

  // Grade 4: colder, higher, stranger.
  place("pines", "Pine Ridge", "#6f8a6a", "#475c44", "snow", ["#5b4228", "#2f8a52"], "#3f94c4", ["beetle"], "guard"),
  place("frost", "Frostfields", "#e4eefb", "#b9cde4", "snow", ["#6b7a8c", "#eef6ff"], "#7fb4d8", ["beetle"], "ice"),
  place("glacier", "Glacier Pass", "#d8ecff", "#9fc0dd", "snow", ["#7fb4d8", "#eef8ff"], "#4aa8d8", ["bat"], "bridge"),
  place("quarry", "The Old Quarry", "#9a9a8a", "#68685c", "rock", ["#7a8f6a", "#cdd4dd"], "#3f94c4", ["spider"], "pits"),
  place("ash", "Ash Flats", "#7a7068", "#4e4740", "rock", ["#5e5448", "#a79f8a"], "#3f7a9c", ["beetle", "snake"], "stampede"),
  place("nightjungle", "The Night Jungle", "#3a5a40", "#243a28", "leaf", ["#2f4a35", "#63c47f"], "#1b4f78", ["bat", "spider"], "dark", true),

  // Grade 5: deep country.
  place("deepcave", "The Deep Cave", "#5a5a6a", "#3a3a45", "rock", ["#5e6672", "#9aa0ab"], "#2f6b8a", ["bat", "beetle"], "pits", true),
  place("lagoon", "Blue Lagoon", "#e0d2a0", "#b09a63", "reed", ["#2f7d46", "#63c47f"], "#2f9ec4", ["croc"], "river"),
  place("mangrove", "The Mangroves", "#6a8a5a", "#445838", "reed", ["#5b4228", "#8cc06a"], "#3a6b6a", ["croc", "spider"], "mud"),
  place("obelisks", "The Obelisks", "#9a9a86", "#6b6b5c", "column", ["#cdd4dd", "#8d9bad"], "#3f94c4", ["spider", "bat"], "gate"),
  place("highvines", "The High Vines", "#5f8f4a", "#3c5e2c", "bamboo", ["#4f7a3a", "#c8e59a"], "#3f94c4", ["monkey", "snake"], "vines"),
  place("summit", "Cloud Summit", "#b4c4cd", "#7f8d96", "snow", ["#8d9bad", "#eef8ff"], "#4aa8d8", ["bat"], "ice"),

  // Grade 6: the strange and the built.
  place("mines", "The Old Mines", "#4a3c28", "#2e2516", "rock", ["#6b5636", "#c09a5a"], "#2f6b8a", ["bat", "beetle"], "dark", true),
  place("archive", "The Stone Archive", "#8a8296", "#5e5870", "column", ["#d8d2e0", "#a79fb5"], "#3f7a9c", ["spider"], "maze"),
  place("geysers", "Geyser Flats", "#8a8f84", "#5e6358", "rock", ["#6b7068", "#dff4ff"], "#4aa8d8", ["beetle"], "stampede"),
  place("coral", "The Coral Shallows", "#f0dcae", "#c4ab7a", "reed", ["#e06a8a", "#ffb0c4"], "#2f9ec4", ["croc", "frog"], "river"),
  place("hollowtree", "The Hollow Tree", "#6b4a2a", "#452f1a", "leaf", ["#5b4228", "#8cc06a"], "#3f94c4", ["spider", "beetle"], "guard", true),
  place("market", "The Jungle Market", "#9a8a5a", "#685c38", "stack", ["#6b4a2a", "#f2c21a"], "#3f94c4", ["monkey"], "swarm"),

  // Grade 7: higher and harder.
  place("cliffs", "The Chalk Cliffs", "#eef1f4", "#c2c8d0", "rock", ["#8d9bad", "#dfe6ee"], "#2f88bb", ["bat"], "bridge"),
  place("windmoor", "Wind Moor", "#7a7a52", "#525236", "reed", ["#5e5e3a", "#b4b47a"], "#3f7a9c", ["snake", "beetle"], "stampede"),
  place("icecaves", "The Ice Caves", "#cfe4f2", "#9ab6cc", "crystal", ["#7fb4d8", "#f6fbff"], "#2f88bb", ["bat"], "ice"),
  place("lavatubes", "The Lava Tubes", "#4e3430", "#2a1c18", "rock", ["#6b4a3a", "#ff8a3c"], "#8a3b2b", ["beetle"], "pits", true),
  place("sunkencity", "The Sunken City", "#7a9a8a", "#52705f", "column", ["#dfeee8", "#a0c4b0"], "#2f88bb", ["croc", "spider"], "bridge"),
  place("stormpeak", "Storm Peak", "#6a7a8c", "#45525f", "snow", ["#8d9bad", "#eef8ff"], "#3f7a9c", ["bat", "beetle"], "ice"),

  // Grade 8: the last stretch.
  place("library", "The Jungle Library", "#8a7a5a", "#5e523a", "stack", ["#6b4a2a", "#e8c168"], "#3f94c4", ["spider"], "maze"),
  place("observatory", "The Star Terrace", "#4a5168", "#333848", "column", ["#cdd4dd", "#8fb4ff"], "#2f6b8a", ["bat"], "dark", true),
  place("catacombs", "The Catacombs", "#5a5448", "#38342c", "rock", ["#e8dcc0", "#a79f8a"], "#2f6b8a", ["spider", "beetle"], "gate", true),
  place("rapids", "The White Rapids", "#9aa87a", "#68744f", "rock", ["#8a8f84", "#dff4ff"], "#2f9ec4", ["croc"], "river"),
  place("greatroots", "The Great Roots", "#5f7a3a", "#3c4e24", "bamboo", ["#5b4228", "#8cc06a"], "#3a6b4a", ["monkey", "spider"], "vines"),
  place("lastgate", "The Last Gate", "#8a8296", "#5e5870", "column", ["#f2d24a", "#d8d2c0"], "#2f6b8a", ["bat", "spider", "beetle"], "swarm", true),
];

/** Where this level happens. Fixed per level, so it is always theirs. */
export function placeOf(level: SpellLevel): Place {
  const i = ALL_SPELL_LEVELS.findIndex((l) => l.id === level.id);
  return PLACES[(i < 0 ? 0 : i) % PLACES.length];
}

// ---------------- The clearing ----------------

/** The maze is this many tiles across and down. */
export const COLS = 13;
export const ROWS = 9;

/**
 * What a tile is.
 *
 * - floor: walk on it.
 * - wall: the edge of the clearing and the clumps inside it, drawn as
 *   whatever that place grows or is built of.
 * - water: no way through, and where some things live.
 * - pit: a hole. Same as a wall to walk into, and far more obvious why.
 * - mud: walk it, but everything else gets a free move while you pull your
 *   boots out.
 * - vine: a creeper that carries you one tile further the way you were going.
 * - ice: you keep going one more tile unless there is something to stop you.
 */
export type TileKind = "floor" | "wall" | "water" | "pit" | "mud" | "vine" | "ice" | "bridge";

/** Tiles a kid can stand on. */
export const WALKABLE: TileKind[] = ["floor", "mud", "vine", "ice", "bridge"];
export const walkable = (t: TileKind | undefined) => t !== undefined && WALKABLE.includes(t);

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
  /** What it is: it decides how it moves as well as how it looks. */
  kind: CritterKind;
  /** Counts turns, for the ones that do not move on every one. */
  tick?: number;
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
  /** Rivers to ride across and stampedes to time. */
  lanes: Lane[];
  /**
   * The channel that has to be bridged, when this place has one: the gap to
   * fill, the boulder that fills it, and the tile to stand on to shove it.
   */
  crossing: { gap: Spot; rock: Spot; from: Spot } | null;
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
      if (!inside(x, y) || !walkable(tiles[at(x, y)]) || seen.has(at(x, y))) continue;
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
  for (const b of blocks) out[at(b.x, b.y)] = "wall";
  return out;
}

/** Whether every letter can still be reached with these tiles blocked. */
function stillWalkable(
  tiles: TileKind[],
  start: Spot,
  stones: Stone[],
  blocks: Spot[],
  door: Spot | null,
  lanes: Lane[] = [],
  crossing: Clearing["crossing"] = null,
): boolean {
  const crossable = tiles.map((v, i) =>
    (v === "water" && lanes.some((l) => l.kind === "log" && l.y === Math.floor(i / COLS))) || (crossing && at(crossing.gap.x, crossing.gap.y) === i)
      ? ("floor" as TileKind)
      : v,
  );
  const open = reachable(withBlocks(crossable, door ? [...blocks, door] : blocks), start);
  return stones.every((s) => s.at < 0 || open.has(at(s.x, s.y)));
}

export function buildClearing(word: string, seed: number, snakes: number, grade = 0, place: Place = PLACES[0]): Clearing {
  const letters = [...word.toLowerCase()];
  for (let attempt = 0; attempt < 24; attempt++) {
    const r = seededRng((seed >>> 0) * 7919 + attempt * 101 + 17);
    const tiles: TileKind[] = new Array(COLS * ROWS).fill("floor");
    // A wall all the way round, so nobody walks out of the jungle.
    for (let x = 0; x < COLS; x++) {
      tiles[at(x, 0)] = "wall";
      tiles[at(x, ROWS - 1)] = "wall";
    }
    for (let y = 0; y < ROWS; y++) {
      tiles[at(0, y)] = "wall";
      tiles[at(COLS - 1, y)] = "wall";
    }
    // Clumps of trees and pools inside it, on the odd tiles, so there is
    // always a lane between any two of them.
    for (let y = 2; y < ROWS - 1; y += 2) {
      for (let x = 2; x < COLS - 1; x += 2) {
        const roll = r();
        if (roll < 0.52) tiles[at(x, y)] = "wall";
        else if (roll < 0.62) tiles[at(x, y)] = "water";
        if (roll < 0.3 && inside(x + 1, y) && r() < 0.5) tiles[at(x + 1, y)] = "wall";
      }
    }
    const start = { x: 1, y: ROWS - 2 };
    tiles[at(start.x, start.y)] = "floor";

    /**
     * A river across the middle, and a row something runs along.
     *
     * Both go right across the clearing, because half a river is a puddle.
     * The river's water is only crossable on a log, so the walkability
     * checks below count those rows as open ground: the logs come round
     * every few turns and a kid who waits can always get over.
     */
    const lanes: Lane[] = [];
    let crossing: Clearing["crossing"] = null;
    const rows = [2, 3, 4, 5, 6].filter((y) => y !== start.y);
    const laneRows = shuffle(r, rows);
    if (place.river && laneRows.length) {
      const y = laneRows.shift()!;
      for (let x = 1; x < COLS - 1; x++) tiles[at(x, y)] = "water";
      lanes.push({ y, dir: r() < 0.5 ? 1 : -1, kind: "log", gap: 3, offset: int(r, 0, 2) });
    }
    if (place.stampede && laneRows.length) {
      const y = laneRows.shift()!;
      for (let x = 1; x < COLS - 1; x++) tiles[at(x, y)] = "floor";
      lanes.push({ y, dir: r() < 0.5 ? 1 : -1, kind: "runner", gap: 5, offset: int(r, 0, 4) });
    }
    /**
     * A channel with no way round it.
     *
     * One column of water from top to bottom, which splits the clearing in
     * two - and one boulder sitting beside it with room to stand behind.
     * Shove the boulder in and it fills the gap. It is only kept if the
     * shove really does open the far side, checked below.
     */
    if (place.bridge) {
      const cx = int(r, 5, COLS - 5);
      const cut: number[] = [];
      for (let y = 1; y < ROWS - 1; y++) {
        if (tiles[at(cx, y)] === "wall") continue;
        tiles[at(cx, y)] = "water";
        cut.push(y);
      }
      const rows2 = shuffle(r, cut);
      for (const y of rows2) {
        const rock = { x: cx - 1, y };
        const from = { x: cx - 2, y };
        const over = { x: cx + 1, y };
        if (!inside(from.x, from.y) || !inside(over.x, over.y)) continue;
        if (tiles[at(rock.x, rock.y)] !== "floor" || tiles[at(from.x, from.y)] !== "floor" || tiles[at(over.x, over.y)] !== "floor") continue;
        // Standing behind the boulder has to be possible from the start.
        const near = reachable(withBlocks(tiles, [rock]), start);
        if (!near.has(at(from.x, from.y))) continue;
        crossing = { gap: { x: cx, y }, rock, from };
        break;
      }
      if (!crossing) {
        // No good place for it: put the column back rather than cut the
        // clearing in half with no way over.
        for (const y of cut) tiles[at(cx, y)] = "floor";
      }
    }

    /** A river is crossable on a log, so it is open ground to these checks. */
    const asOpen = (t: TileKind[]) =>
      t.map((v, i) =>
        (v === "water" && lanes.some((l) => l.kind === "log" && l.y === Math.floor(i / COLS))) || (crossing && at(crossing.gap.x, crossing.gap.y) === i)
          ? "floor"
          : v,
      );
    const open = reachable(asOpen(tiles), start);
    const free = [...open].filter(
      (i) =>
        i !== at(start.x, start.y) &&
        !lanes.some((l) => l.y === Math.floor(i / COLS)) &&
        tiles[i] !== "water" &&
        !(crossing && (i === at(crossing.rock.x, crossing.rock.y) || i === at(crossing.from.x, crossing.from.y))),
    );
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

    // Ground that does something, where the place has any: a handful of
    // tiles, and never one that a letter cannot be reached without.
    if (place.special) {
      const want = place.special === "pit" ? 3 : 5;
      // Checked against all of them at once, not one at a time: two patches
      // of ice can each look harmless and together be the only lane to a
      // letter, and a walk that has to cross ice is a walk that slides.
      const laid: Spot[] = [];
      for (let i = 0; i < want; i++) {
        const spot = take();
        if (!spot) break;
        const was = tiles[at(spot.x, spot.y)];
        tiles[at(spot.x, spot.y)] = place.special;
        // A hole is a wall as far as walking goes, and the slippery ones
        // carry a kid along, so neither may be the only way to a letter.
        // The boulders are not down yet; they do their own check after this.
        if (stillWalkable(withBlocks(tiles, [...laid, spot]), start, stones, [], null, lanes, crossing)) laid.push(spot);
        else tiles[at(spot.x, spot.y)] = was;
      }
    }

    // What lives here. They start a good way from the start tile, so nothing
    // is on top of a kid before they have taken a step - except the one that
    // is deliberately sitting by a letter, which is the whole idea of a
    // guarded clearing.
    const critters: Critter[] = [];
    const kinds: CritterKind[] = place.critters.length ? place.critters : ["snake", "frog", "monkey"];
    // An empty clearing stays empty: easy means easy, swarm or no swarm.
    const howMany = snakes > 0 ? snakes + (place.swarm ? 2 : 0) : 0;
    if (place.guard && snakes > 0) {
      const watched = stones.find((st) => st.at === stones.filter((o) => o.at >= 0).length - 1) ?? stones[0];
      const near = TURN.map((k) => ({ x: watched.x + DIRS[k].dx, y: watched.y + DIRS[k].dy })).find(
        (p) => inside(p.x, p.y) && tiles[at(p.x, p.y)] === "floor" && !stones.some((st) => st.x === p.x && st.y === p.y),
      );
      if (near) critters.push({ ...near, dir: int(r, 0, 3), kind: kinds[0] });
    }
    for (let i = critters.length; i < howMany; i++) {
      let spot = take();
      let guard = 0;
      while (spot && Math.abs(spot.x - start.x) + Math.abs(spot.y - start.y) < 5 && guard++ < 20) spot = take();
      if (!spot) break;
      const kind = kinds[i % kinds.length];
      // A crocodile belongs in the water; everything else on the ground.
      if (kind === "croc") {
        const pool = [...tiles.keys()].filter((n) => tiles[n] === "water" && Math.abs((n % COLS) - start.x) + Math.abs(Math.floor(n / COLS) - start.y) >= 4);
        if (!pool.length) continue;
        const n = pool[int(r, 0, pool.length - 1)];
        critters.push({ x: n % COLS, y: Math.floor(n / COLS), dir: int(r, 0, 3), kind });
        continue;
      }
      critters.push({ ...spot, dir: int(r, 0, 3), kind });
    }

    // Boulders, on tiles nothing needs: every letter has to still be
    // reachable with the boulder sitting there, so a kid can shove them
    // about for fun or for cover and never shut themselves out.
    const rocks: Spot[] = [];
    if (crossing) rocks.push({ ...crossing.rock });
    if (grade >= ROCKS_FROM_GRADE) {
      const want = 2 + (grade >= 4 ? 1 : 0);
      for (let i = 0; i < want; i++) {
        const spot = take();
        if (!spot) break;
        if (!stillWalkable(tiles, start, stones, [...rocks, spot], null, lanes, crossing)) continue;
        rocks.push(spot);
      }
    }

    // A gate and its key. The key has to be fetchable without going through
    // the gate, and everything has to be reachable once it is open.
    let door: Spot | null = null;
    let key: Spot | null = null;
    if (grade >= DOOR_FROM_GRADE || place.gate) {
      // Every tile a gate could stand on, not just the few left over: a gate
      // has to pinch the path somewhere, and most tiles do not.
      const candidates = shuffle(
        r,
        [...reachable(tiles, start)]
          .map((i) => ({ x: i % COLS, y: Math.floor(i / COLS) }))
          .filter(
            (p) =>
              !(p.x === start.x && p.y === start.y) &&
              !lanes.some((l) => l.y === p.y) &&
              tiles[at(p.x, p.y)] !== "water" &&
              !stones.some((st) => st.x === p.x && st.y === p.y) &&
              !rocks.some((rk) => rk.x === p.x && rk.y === p.y) &&
              !critters.some((c) => c.x === p.x && c.y === p.y),
          ),
      );
      for (const spot of candidates) {
        if (door) break;
        // A gate worth having shuts something away.
        const shut = reachable(withBlocks(asOpen(tiles), [...rocks, spot]), start);
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

    return { word: word.toLowerCase(), tiles, stones, critters, start, rocks, door, key, lanes, crossing };
  }
  // Nothing but open ground: the fallback no seed should ever need, but a
  // level must always be playable.
  const tiles: TileKind[] = new Array(COLS * ROWS).fill("floor");
  for (let x = 0; x < COLS; x++) {
    tiles[at(x, 0)] = "wall";
    tiles[at(x, ROWS - 1)] = "wall";
  }
  for (let y = 0; y < ROWS; y++) {
    tiles[at(0, y)] = "wall";
    tiles[at(COLS - 1, y)] = "wall";
  }
  const stones = [...word.toLowerCase()].map((ch, n) => ({ x: 2 + n * 2, y: 2 + (n % 3) * 2, ch, at: n }));
  return { word: word.toLowerCase(), tiles, stones, critters: [], start: { x: 1, y: ROWS - 2 }, rocks: [], door: null, key: null, lanes: [], crossing: null };
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
  /** The ground as it stands, with anything bridged already bridged. */
  tiles: TileKind[];
  /**
   * How many turns have passed.
   *
   * Everything that moves on its own - the logs on the river, whatever is
   * stampeding - is drawn from this number, so the screen and the server
   * always see the same water.
   */
  turn: number;
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
  beat:
    | "none"
    | "letter"
    | "wrong"
    | "bitten"
    | "word"
    | "level"
    | "push"
    | "stuck"
    | "key"
    | "locked"
    | "slide"
    | "carried"
    | "ride"
    | "splash"
    | "run-down"
    | "bridge";
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

/** The eight ways out of a tile, for the things that do not keep to the paths. */
const DIAGS = [
  { dx: 1, dy: 1 },
  { dx: -1, dy: 1 },
  { dx: -1, dy: -1 },
  { dx: 1, dy: -1 },
];

/**
 * Where a creature goes next.
 *
 * Each kind moves its own way, and every one of them is worked out from the
 * ground and the seed alone - nothing here is random in a way the server
 * cannot repeat.
 *
 * - snake and monkey keep going until something stops them, then turn.
 * - frog hops two tiles when the ground allows it.
 * - beetle takes every other turn off.
 * - bat flies: walls and holes are nothing to it, water still is.
 * - spider goes corner to corner rather than along the paths.
 * - croc stays in the water, and takes anyone who walks along the bank.
 */
function moveCritter(c: Critter, tiles: TileKind[], r: Rng, blocked: Spot[] = []): Critter {
  const tick = (c.tick ?? 0) + 1;
  const free = (x: number, y: number) => {
    if (!inside(x, y) || blocked.some((b) => b.x === x && b.y === y)) return false;
    const t = tiles[at(x, y)];
    if (c.kind === "croc") return t === "water";
    if (c.kind === "bat") return t !== "water";
    return walkable(t);
  };

  // The slow one: half the time it simply sits there.
  if (c.kind === "beetle" && tick % 2 === 0) return { ...c, tick };

  const steps = c.kind === "frog" ? 2 : 1;
  const ways = c.kind === "spider" ? DIAGS.map((d, i) => ({ d, dir: i })) : TURN.map((k, i) => ({ d: DIRS[k], dir: i }));
  const order = [c.dir % ways.length, (c.dir + 1) % ways.length, (c.dir + 3) % ways.length, (c.dir + 2) % ways.length];
  // A coin toss on which way it turns first, so two of them in the same
  // corner do not move as one.
  if (r() < 0.5) [order[1], order[2]] = [order[2], order[1]];

  for (const dir of order) {
    const way = ways[dir];
    let x = c.x;
    let y = c.y;
    let went = 0;
    for (let n = 0; n < steps; n++) {
      if (!free(x + way.d.dx, y + way.d.dy)) break;
      x += way.d.dx;
      y += way.d.dy;
      went++;
    }
    if (went > 0) return { ...c, x, y, dir, tick };
  }
  return { ...c, tick };
}

/** Whether this creature has them: on the tile, or - for a croc - on the bank beside it. */
const hasThem = (c: Critter, me: Spot) =>
  c.kind === "croc" ? Math.abs(c.x - me.x) + Math.abs(c.y - me.y) <= 1 : c.x === me.x && c.y === me.y;

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
  const place = placeOf(level);

  let wordAt = 0;
  let clearing = buildClearing(words[0] ?? "cat", move.seed, snakes, level.grade, place);
  let me = { ...clearing.start };
  let rocks = clearing.rocks.map((p) => ({ ...p }));
  /** The ground as it stands: boulders shoved into gaps change it. */
  let filled: TileKind[] = [...clearing.tiles];
  let hasKey = false;
  let doorOpen = false;
  /** Turns gone by. The river and the stampede are drawn from it. */
  let turn = 0;
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
    turn = 0;
    me = { ...clearing.start };
    critters = clearing.critters.map((c) => ({ ...c }));
    rocks = clearing.rocks.map((p) => ({ ...p }));
    filled = [...clearing.tiles];
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

    /** Is there a log on this tile this turn? */
    const logOn = (x: number, y: number, t: number) => clearing.lanes.some((l) => l.kind === "log" && l.y === y && laneAt(l, x, t));
    /** Is something running through this tile this turn? */
    const runnerOn = (x: number, y: number, t: number) => clearing.lanes.some((l) => l.kind === "runner" && l.y === y && laneAt(l, x, t));
    /** In the water, and nothing under them. */
    const inTheDrink = (p: Spot, t: number) => filled[at(p.x, p.y)] === "water" && !logOn(p.x, p.y, t);

    // Time passing with nobody moving. The river and the stampede move
    // whatever the setting - that is the whole point of them, and it is how
    // a kid waits for a gap. Only the roaming animals get time for free,
    // and only below hard.
    if (step.d === "w") {
      turn++;
      // Riding: the log takes them with it, and off the end is a swim.
      if (filled[at(me.x, me.y)] === "water") {
        const lane = clearing.lanes.find((l) => l.kind === "log" && l.y === me.y)!;
        me = { x: me.x + lane.dir, y: me.y };
        beat = "ride";
      }
      if (!inside(me.x, me.y) || inTheDrink(me, turn) || runnerOn(me.x, me.y, turn)) {
        lives--;
        bittenHere = true;
        beat = inside(me.x, me.y) && runnerOn(me.x, me.y, turn) ? "run-down" : "splash";
        if (lives <= 0) {
          over = true;
          break;
        }
        restartWord();
        continue;
      }
      if (pace !== "hard") continue;
      const ticks = Math.min(MAX_TICKS, Math.floor(step.ms / HARD_TICK_MS));
      for (let t = 0; t < ticks; t++) critters = critters.map((c) => moveCritter(c, clearing.tiles, r, [...rocks, ...(clearing.door && !doorOpen ? [clearing.door] : [])]));
      if (critters.some((c) => hasThem(c, me))) {
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
    // A wall or a hole is simply not a move: no step, no turn for the
    // animals, nothing lost. The river is a move only if there is a log
    // under it when they land.
    if (!inside(x, y)) continue;
    const ahead = filled[at(x, y)];
    const riverStep = ahead === "water" && clearing.lanes.some((l) => l.kind === "log" && l.y === y);
    if (!walkable(ahead) && !riverStep) continue;
    if (riverStep && !logOn(x, y, turn + 1)) {
      beat = "splash";
      continue;
    }
    turn++;

    // The gate: shut until they are carrying the key, and then it stays open.
    if (clearing.door && clearing.door.x === x && clearing.door.y === y && !doorOpen) {
      if (!hasKey) {
        beat = "locked";
        continue;
      }
      doorOpen = true;
    }

    // A boulder: shoved along if there is somewhere for it to go, and in the
    // way if there is not. Shove one into a hole or a channel and it fills
    // it - that is the bridge, and the boulder is spent making it.
    const rock = rocks.findIndex((p) => p.x === x && p.y === y);
    if (rock >= 0) {
      const bx = x + d.dx;
      const by = y + d.dy;
      const fills =
        inside(bx, by) &&
        (filled[at(bx, by)] === "pit" || (filled[at(bx, by)] === "water" && !clearing.lanes.some((l) => l.y === by))) &&
        !rocks.some((p) => p.x === bx && p.y === by);
      if (fills) {
        filled = [...filled];
        filled[at(bx, by)] = "bridge";
        rocks = rocks.filter((_, i) => i !== rock);
        beat = "bridge";
        me = { x, y };
        stepsHere++;
        turn++;
        continue;
      }
      const free =
        inside(bx, by) &&
        walkable(filled[at(bx, by)]) &&
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

    // Vines and ice carry them one tile further the way they were going -
    // unless there is a letter there, which they are always allowed to stop
    // on, or anything else in the way.
    const ground = filled[at(me.x, me.y)];
    if (ground === "vine" || ground === "ice") {
      const sx = me.x + d.dx;
      const sy = me.y + d.dy;
      const stoneThere = clearing.stones.some((st, i) => st.x === sx && st.y === sy && !taken.includes(i));
      const clear =
        inside(sx, sy) &&
        walkable(filled[at(sx, sy)]) &&
        !stoneThere &&
        !rocks.some((p) => p.x === sx && p.y === sy) &&
        !(clearing.door && clearing.door.x === sx && clearing.door.y === sy && !doorOpen);
      if (clear) {
        me = { x: sx, y: sy };
        beat = ground === "ice" ? "slide" : "carried";
      }
    }

    // The key, if it is lying where they have ended up - which is not
    // always the tile they stepped onto, because the ground can carry them.
    if (clearing.key && !hasKey && clearing.key.x === me.x && clearing.key.y === me.y) {
      hasKey = true;
      beat = "key";
    }

    // A stone underfoot - underfoot where they are standing now, after any
    // slide, not where they first put their foot down.
    const stone = clearing.stones.findIndex((s, i) => s.x === me.x && s.y === me.y && !taken.includes(i));
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

    if (inTheDrink(me, turn) || runnerOn(me.x, me.y, turn)) {
      lives--;
      bittenHere = true;
      beat = runnerOn(me.x, me.y, turn) ? "run-down" : "splash";
      if (lives <= 0) {
        over = true;
        break;
      }
      restartWord();
      continue;
    }

    // Everything that lives here takes its turn after they take theirs - and
    // on hard it takes one more for every second they spent deciding. Mud
    // gives them a free one whatever the setting: it takes a while to pull
    // your boots out of it.
    const stuckInMud = filled[at(me.x, me.y)] === "mud";
    const turns = (pace === "hard" ? 1 + Math.min(MAX_TICKS - 1, Math.floor(step.ms / HARD_TICK_MS)) : 1) + (stuckInMud ? 1 : 0);
    for (let t = 0; t < turns; t++) critters = critters.map((c) => moveCritter(c, clearing.tiles, r, [...rocks, ...(clearing.door && !doorOpen ? [clearing.door] : [])]));
    if (critters.some((c) => hasThem(c, me))) {
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
        clearing = buildClearing(words[wordAt], move.seed + wordAt * 977, snakes, level.grade, place);
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
    turn,
    tiles: filled,
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

/**
 * The moves a kid would make if they walked straight to every letter in turn.
 *
 * This is the walk the tests use to prove a level can be finished at all, so
 * it has to obey every rule a kid obeys: round the boulders rather than
 * shoving them, off the ice rather than sliding on it, waiting at the bank
 * until a log is there, and shoving the one boulder that bridges a channel.
 *
 * Rather than mirror all of that - which is a second copy of the rules, and
 * a second copy drifts - it plays the game as it goes. After every step it
 * asks `play()` where that left it and carries on from the answer. Nothing
 * here can disagree with the game, because the game is what it is reading.
 */
export function perfectMoves(level: SpellLevel, seed = 1, pace: Pace = "easy"): SpellMove {
  const words = wordsFor(level, seed);
  const steps: Step[] = [];
  /** Where the game says they are after everything so far. */
  let now = play(level, { seed, steps, pace });

  const push = (d: Dir | "w") => {
    steps.push({ d, ms: 420 });
    now = play(level, { seed, steps, pace });
  };

  for (let w = 0; w < words.length; w++) {
    const clearing = now.clearing;
    const logLane = (y: number) => clearing.lanes.find((l) => l.kind === "log" && l.y === y);
    const runLane = (y: number) => clearing.lanes.find((l) => l.kind === "runner" && l.y === y);
    const slippery: Spot[] = clearing.tiles
      .map((t, i) => (t === "ice" || t === "vine" ? { x: i % COLS, y: Math.floor(i / COLS) } : null))
      .filter((p): p is Spot => p !== null);

    /**
     * The ground as a route may use it: water, boulders and a gate they
     * cannot open yet are all walls.
     */
    const routeMap = (extra: Spot[]) =>
      now.tiles.map((t, i) =>
        t === "water" ||
        now.rocks.some((p) => p.y * COLS + p.x === i) ||
        (clearing.door && !now.doorOpen && !now.hasKey && clearing.door.y * COLS + clearing.door.x === i) ||
        extra.some((p) => p.y * COLS + p.x === i)
          ? ("wall" as TileKind)
          : t,
      );

    /** True while a crossing is being set up, so one cannot start another. */
    let crossingNow = false;

    /** Walk to a tile, checking with the game after every step. */
    const goTo = (target: Spot, dodgeStones = true): boolean => {
      // Picking up the last letter of a word ends it and opens the next
      // clearing, which is a win, not a failure to arrive somewhere.
      const wordAtStart = now.done;
      /** Tiles this walk has given up on, and where they stood a step ago. */
      const banned: Spot[] = [];
      let wasBefore = "";
      for (let guard = 0; guard < 200; guard++) {
        if (now.done !== wordAtStart) return true;
        if (now.me.x === target.x && now.me.y === target.y) return true;
        // On a log: off it, onto dry land, before the river takes them.
        if (now.tiles[now.me.y * COLS + now.me.x] === "water") {
          const off = (["u", "d", "l", "r"] as Dir[])
            .map((k) => ({ k, p: { x: now.me.x + DIRS[k].dx, y: now.me.y + DIRS[k].dy } }))
            .find(({ p }) => inside(p.x, p.y) && walkable(now.tiles[p.y * COLS + p.x]) && now.tiles[p.y * COLS + p.x] !== "water");
          if (!off) return false;
          push(off.k);
          continue;
        }
        const others = dodgeStones
          ? clearing.stones.filter((st, i) => !now.taken.includes(i) && !(st.x === target.x && st.y === target.y))
          : [];
        const path =
          routeTo(routeMap([...others, ...slippery, ...banned]), now.me, target) ??
          routeTo(routeMap([...slippery, ...banned]), now.me, target) ??
          routeTo(routeMap(banned), now.me, target) ??
          routeTo(routeMap([]), now.me, target);
        if (!path || !path.length) {
          // Nothing on this side reaches it. The way round may be over the
          // river and back, so cross and look again.
          const lane = crossingNow ? undefined : clearing.lanes.find((l) => l.kind === "log");
          if (lane && crossLane(lane, target)) continue;
          return false;
        }
        const d = path[0];
        const next = { x: now.me.x + DIRS[d].dx, y: now.me.y + DIRS[d].dy };
        // Wait at the edge of a stampede for a gap big enough to get in and
        // out of again.
        const run = runLane(next.y);
        let waited = 0;
        while (run && (laneAt(run, next.x, now.turn + 1) || laneAt(run, next.x, now.turn + 2)) && waited < 10) {
          push("w");
          waited++;
        }
        const before = `${now.me.x},${now.me.y}`;
        const wrongBefore = now.wrong;
        push(d);
        // Stepping on the wrong letter costs; do not do it twice in the same
        // place looking for the right one.
        if (now.wrong > wrongBefore) banned.push(next);
        const after = `${now.me.x},${now.me.y}`;
        if (after === before) return false;
        // Ice and creepers can hand them straight back where they came
        // from. Stop using that tile and work out another way.
        if (after === wasBefore) banned.push(next);
        wasBefore = before;
      }
      return false;
    };

    /** Over a river: pick a column with dry banks, wait for a log, two steps. */
    const crossLane = (lane: Lane, towards: Spot): boolean => {
      const wordAtStart = now.done;
      const near = now.me.y < lane.y ? -1 : 1;
      const nearY = lane.y + near;
      const farY = lane.y - near;
      const columns: number[] = [];
      for (let x = 1; x < COLS - 1; x++) {
        if (!walkable(now.tiles[nearY * COLS + x]) || !walkable(now.tiles[farY * COLS + x])) continue;
        if (now.tiles[nearY * COLS + x] === "water" || now.tiles[farY * COLS + x] === "water") continue;
        if (now.rocks.some((p) => p.x === x && (p.y === nearY || p.y === farY))) continue;
        columns.push(x);
      }
      columns.sort((a, b) => Math.abs(a - towards.x) - Math.abs(b - towards.x));
      for (const x of columns.slice(0, 8)) {
        if (now.done !== wordAtStart) return true;
        if (!(now.me.x === x && now.me.y === nearY)) {
          crossingNow = true;
          const got = goTo({ x, y: nearY }, false);
          crossingNow = false;
          // Walking to the bank can finish the word, and then there is no
          // river left to cross: this clearing is done with.
          if (now.done !== wordAtStart) return true;
          if (!got) continue;
        }
        let waited = 0;
        while (!laneAt(lane, x, now.turn + 1) && waited < 8) {
          push("w");
          waited++;
        }
        if (!laneAt(lane, x, now.turn + 1)) continue;
        const onto: Dir = near === -1 ? "d" : "u";
        push(onto);
        if (now.done !== wordAtStart) return true;
        if (now.me.y !== lane.y) continue;
        push(onto);
        if (now.done !== wordAtStart) return true;
        if (now.me.y === farY) return true;
      }
      return false;
    };

    /** Cross, if the thing they want is on the other bank. */
    const crossTo = (target: Spot): boolean => {
      const lane = clearing.lanes.find((l) => l.kind === "log" && ((now.me.y < l.y && target.y > l.y) || (now.me.y > l.y && target.y < l.y)));
      return lane ? crossLane(lane, target) : true;
    };

    const reach = (target: Spot, dodgeStones = true) => crossTo(target) && goTo(target, dodgeStones);

    // The channel first, where there is one.
    if (clearing.crossing && now.rocks.some((p) => p.x === clearing.crossing!.rock.x && p.y === clearing.crossing!.rock.y)) {
      const c = clearing.crossing;
      const bridgeWord = now.done;
      if (!reach(c.from, false) && now.done === bridgeWord) return { seed, steps, pace };
      push("r");
      if (now.tiles[c.gap.y * COLS + c.gap.x] !== "bridge") return { seed, steps, pace };
    }

    // Then the key, if there is one.
    if (clearing.key && clearing.door && !now.hasKey) {
      const keyWord = now.done;
      if (!reach(clearing.key, false) && now.done === keyWord) return { seed, steps, pace };
    }

    // Then the letters, in order.
    const wordNow = now.done;
    // Always go for the letter the game says is next. Falling in the river
    // or being caught puts the word back to the beginning, and a walk that
    // kept counting from where it was would then be spelling from the
    // middle.
    for (let tries = 0; tries < clearing.word.length * 4 && now.done === wordNow; tries++) {
      const stone = clearing.stones.find((st) => st.at === now.got);
      if (!stone) return { seed, steps, pace };
      const wordBefore = now.done;
      // Arriving is not the only way to succeed: the last letter of a word
      // ends the clearing, and then there is nowhere left to walk to.
      if (!reach({ x: stone.x, y: stone.y }) && now.done === wordBefore) {
        return { seed, steps, pace };
      }
    }
    if (now.done === wordNow && !now.finished) return { seed, steps, pace };
    if (now.finished) break;
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
      if (!inside(x, y) || !walkable(tiles[at(x, y)]) || seen.has(at(x, y))) continue;
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

/**
 * The wall of a clearing, in whatever that place is made of.
 *
 * Leaves in the jungle, bamboo on the terraces, pillars in the temple, ice
 * on the summit - the same job done in the local material, which is what
 * makes two levels with the same maze look like two different places.
 */
export function wallGrid(kind: WallKind, a: string, b: string, frame = 0): Grid {
  const g = new Grid(12, 12);
  const back = shade(a, -0.5);
  g.rect(0, 0, 12, 12, back);
  switch (kind) {
    case "leaf":
      g.disc(4, 4, 3.4, a);
      g.disc(8, 5, 3.2, b);
      g.disc(6, 9, 3.4, shade(b, -0.2));
      g.set(3 + (frame % 2), 3, shade(b, 0.45));
      break;
    case "bamboo":
      for (const x of [1, 5, 9]) {
        g.rect(x, 0, 3, 12, a);
        for (const y of [2, 6, 10]) g.rect(x, y, 3, 1, b);
      }
      break;
    case "rock":
      g.disc(4, 7, 4, a);
      g.disc(9, 5, 3.6, shade(a, 0.18));
      g.rect(0, 10, 12, 2, shade(a, -0.3));
      g.set(3, 5, b);
      break;
    case "column":
      g.rect(3, 0, 6, 12, a);
      g.rect(2, 0, 8, 2, b);
      g.rect(2, 10, 8, 2, b);
      g.rect(5, 2, 1, 8, shade(a, -0.35));
      break;
    case "crystal":
      g.tri(4, 2, 11, 3, a);
      g.tri(9, 0, 11, 2, b);
      break;
    case "reed":
      for (const x of [2, 5, 8, 11]) {
        g.rect(x, 2 + ((x + frame) % 2), 1, 10, a);
        g.rect(x - 1, 1 + ((x + frame) % 2), 3, 2, b);
      }
      break;
    case "snow":
      g.rect(0, 0, 12, 12, a);
      g.disc(4, 8, 3.6, b);
      g.disc(8, 6, 3, shade(b, -0.12));
      g.set(6, 3, shade(b, 0.4));
      break;
    case "stack":
      g.rect(1, 1, 10, 4, a);
      g.rect(1, 6, 10, 4, b);
      g.rect(1, 1, 10, 1, shade(a, 0.3));
      g.rect(1, 6, 10, 1, shade(b, 0.3));
      break;
  }
  return g;
}

/** The old name, kept for the jungle: a wall of leaves. */
export function treeGrid(frame = 0): Grid {
  return wallGrid("leaf", "#2f7d46", "#63c47f", frame);
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

/** Mud: walkable, and slow enough that everything else gets a move. */
export function mudGrid(): Grid {
  const g = new Grid(12, 12);
  const mud = "#6b5a3c";
  g.rect(0, 0, 12, 12, mud);
  g.disc(4, 5, 2, shade(mud, -0.3));
  g.disc(8, 9, 1.6, shade(mud, -0.3));
  g.set(9, 3, shade(mud, 0.25));
  return g;
}

/** A creeper across the path: step on it and it carries you on a tile. */
export function vineGrid(frame = 0): Grid {
  const g = new Grid(12, 12);
  const green = "#2f8f52";
  g.rect(0, 0, 12, 12, "#6f8f4a");
  for (let x = 0; x < 12; x++) g.set(x, 5 + ((x + frame) % 3 === 0 ? 1 : 0), green);
  for (let x = 1; x < 12; x += 4) g.set(x, 7, shade(green, 0.3));
  return g;
}

/** Ice: you keep going. */
export function iceGrid(): Grid {
  const g = new Grid(12, 12);
  const ice = "#cfe8ff";
  g.rect(0, 0, 12, 12, ice);
  g.rect(1, 2, 5, 1, "#ffffff");
  g.rect(6, 7, 4, 1, "#ffffff");
  g.rect(0, 11, 12, 1, shade(ice, -0.25));
  return g;
}

/** A boulder shoved into a gap: the bridge it makes. */
export function bridgeGrid(): Grid {
  const g = new Grid(12, 12);
  const stone = "#9a9a8a";
  g.rect(0, 0, 12, 12, "#1b6fa8");
  g.rect(0, 2, 12, 8, shade(stone, -0.3));
  g.rect(0, 3, 12, 6, stone);
  g.rect(0, 5, 12, 1, shade(stone, 0.25));
  return g;
}

/** A log on the river: the only thing worth standing on out there. */
export function logGrid(): Grid {
  const g = new Grid(14, 8);
  const bark = "#6b4a2a";
  g.rect(0, 2, 14, 4, bark);
  g.rect(0, 2, 14, 1, shade(bark, 0.3));
  g.rect(0, 5, 14, 1, shade(bark, -0.35));
  g.disc(1, 4, 1.6, shade(bark, 0.15));
  g.disc(12, 4, 1.6, shade(bark, 0.15));
  return g;
}

/** Whatever it is that runs the stampede row. Big, and not looking. */
export function runnerGrid(frame = 0): Grid {
  const g = new Grid(16, 12);
  const hide = "#6b4a3a";
  const horn = "#e8dcc0";
  const step = frame % 2;
  g.disc(8, 6, 4.4, hide);
  g.rect(3, 4, 6, 5, hide);
  g.disc(3, 5, 2.4, shade(hide, 0.12));
  g.set(2, 4, "#1b1530");
  g.rect(0, 3, 3, 1, horn);
  g.rect(0, 6, 2, 1, "#2f2024");
  g.rect(5, 10 - step, 2, 2, shade(hide, -0.35));
  g.rect(10, 10 + step - 1, 2, 2, shade(hide, -0.35));
  g.rect(13, 5, 3, 1, shade(hide, -0.2));
  return g;
}

/** A hole in the ground. Not a way through, and it looks it. */
export function pitGrid(): Grid {
  const g = new Grid(12, 12);
  g.rect(0, 0, 12, 12, "#6f8f4a");
  g.disc(6, 6, 5, "#241c21");
  g.disc(6, 5, 4, "#120d12");
  g.rect(2, 10, 8, 1, "#3a2f34");
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

/** A bat: walls are nothing to it, and it keeps odd hours. */
export function batGrid(frame = 0): Grid {
  const g = new Grid(14, 10);
  const fur = "#4a3f5c";
  const web = "#6b5c80";
  const flap = frame % 2;
  g.disc(7, 5, 2.2, fur);
  g.set(6, 4, "#ffe08a");
  g.set(8, 4, "#ffe08a");
  g.tri(3, 2 + flap, 6 + flap, 3, web);
  g.tri(11, 2 + flap, 6 + flap, 3, web);
  g.rect(6, 2, 1, 2, fur);
  g.rect(8, 2, 1, 2, fur);
  return g;
}

/** A crocodile: it stays in the water and takes anyone on the bank. */
export function crocGrid(frame = 0): Grid {
  const g = new Grid(14, 10);
  const hide = "#3a6b3a";
  const belly = "#7fa85c";
  const jaw = frame % 2;
  g.rect(2, 5, 11, 3, hide);
  g.rect(2, 7, 11, 1, shade(hide, -0.35));
  g.rect(0, 4 + jaw, 5, 2, hide);
  g.rect(0, 6, 5, 1, belly);
  g.set(4, 3, "#f2d24a");
  g.set(6, 3, "#f2d24a");
  for (let x = 4; x < 12; x += 2) g.set(x, 4, shade(hide, 0.3));
  return g;
}

/** A spider: corner to corner, never along the path. */
export function spiderGrid(frame = 0): Grid {
  const g = new Grid(12, 12);
  const body = "#3a2f34";
  const leg = "#5c4a50";
  const step = frame % 2;
  g.disc(6, 7, 3, body);
  g.disc(6, 4, 1.8, body);
  g.set(5, 4, "#e0453a");
  g.set(7, 4, "#e0453a");
  for (const y of [5, 7, 9]) {
    g.rect(1, y - step, 4, 1, leg);
    g.rect(7, y + step, 4, 1, leg);
  }
  return g;
}

/** A beetle: slow, and it only moves every other turn. */
export function beetleGrid(frame = 0): Grid {
  const g = new Grid(12, 10);
  const shell = "#8a4a2a";
  const back = "#c07a3c";
  const step = frame % 2;
  g.disc(6, 5, 4, shell);
  g.disc(6, 5, 3, back);
  g.rect(6, 1, 1, 8, shade(shell, -0.4));
  g.rect(1, 3 + step, 3, 1, shell);
  g.rect(8, 3 - step, 3, 1, shell);
  g.rect(1, 7 - step, 3, 1, shell);
  g.rect(8, 7 + step, 3, 1, shell);
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
