import type { MiniGame, MiniLevel } from "./index";
import { Grid } from "../pixel/grid";

/**
 * Sentence Smith (Reading & Writing, grades 1-3). A pixel blacksmith's forge:
 * each round the kid forges one sentence in three strikes:
 *   1. lay the word tiles in order (the bank can hold wrong forms, like
 *      "childs" or "flied", that must be left out),
 *   2. stamp capital letters on the words that need them (tiles start in
 *      lowercase),
 *   3. hammer on the end mark: period, question mark or exclamation point.
 * A wrong strike names the grammar rule in one short sentence and the kid
 * fixes it and strikes again.
 *
 *   Grade 1: simple sentences, capitals for the start, names and I, and
 *            . ? ! (L.1.1j, L.1.2a, L.1.2b).
 *   Grade 2: irregular plurals and past tense, adjectives vs. adverbs,
 *            contractions, compound sentences with and / but / so
 *            (L.2.1b, L.2.1d, L.2.1e, L.2.1f, L.2.2a, L.2.2c).
 *   Grade 3: subject-verb agreement, verb tenses, comparatives and
 *            superlatives, conjunctions, commas in addresses, quotation
 *            marks in dialogue (L.3.1d-i, L.3.2b, L.3.2c).
 *
 * Moves: for every round, the list of tries. A try is
 *   { o: bank indexes in the order placed, c: bank indexes stamped with a
 *     capital, e: the end mark }.
 * Right on the first try earns 2 points, right later 1. Pure and seeded,
 * so the server replays the moves to score them.
 */

export const sentenceSmithInfo = {
  id: "sentencesmith",
  title: "Sentence Smith",
  icon: "🔨",
  land: "writing" as const,
  subject: "ela" as const,
  grades: [1, 2, 3],
  blurb: "Forge strong sentences: capitals, punctuation and words in the right order.",
};

export type End = "." | "?" | "!";
export const ENDS: End[] = [".", "?", "!"];
export const END_NAMES: Record<End, string> = { ".": "period", "?": "question mark", "!": "exclamation point" };

export interface SmithRound {
  emoji: string;
  /** What the kid sees. */
  show: string;
  /** What is read aloud (grade 1 hears the sentence itself). */
  say: string;
  /** Accepted sentences as tiles, with the right capitals (the first is the main one). */
  answers: string[][];
  end: End;
  /** Closing quotation mark shown after the end mark (dialogue). */
  close: string;
  /** Wrong-form tiles mixed into the bank, each with the rule it breaks. */
  extras: Record<string, string>;
  /** One sentence naming the rule, shown and read when the sentence is forged. */
  rule: string;
  /** Feedback when the words are right but in the wrong order. */
  orderTip?: string;
  /** Feedback when commas or quotation marks are missing or misplaced. */
  punctTip?: string;
}

export interface SmithLevel extends MiniLevel {
  grade: number;
  rounds: SmithRound[];
  /** Wrong tries before the finished sentence is shown as a hint. */
  hintAfter: number;
}

/** Tries a round keeps (more are ignored). */
export const MAX_TRIES = 12;

// ---------------- Sentences as tiles ----------------

const PUNCT = new Set([",", "“", "”"]);
export const isPunct = (t: string) => PUNCT.has(t);

/** "Mom said, “Feed the dog.”" → tiles, end mark and closing quote. */
export function parseSentence(s: string): { tiles: string[]; end: End; close: string } {
  let body = s.trim();
  const close = body.endsWith("”") ? "”" : "";
  if (close) body = body.slice(0, -1);
  const end = body.slice(-1) as End;
  if (!ENDS.includes(end)) throw new Error(`Sentence needs an end mark: ${s}`);
  body = body.slice(0, -1);
  return { tiles: body.match(/“|”|,|[A-Za-z0-9']+/g) ?? [], end, close };
}

/** Tiles back to text, with no space before a comma or after an opening quote. */
export function joinTiles(tiles: string[]): string {
  let out = "";
  tiles.forEach((t, i) => {
    if (i > 0 && t !== "," && t !== "”" && tiles[i - 1] !== "“") out += " ";
    out += t;
  });
  return out;
}

export const capitalize = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export const canCap = (t: string) => /^[a-z]/i.test(t);
const lower = (t: string) => t.toLowerCase();

/** The finished sentence (for hints and the result log). */
export const answerText = (r: SmithRound) => joinTiles(r.answers[0]) + r.end + r.close;

interface RoundOpts {
  alts?: string[];
  extras?: Record<string, string>;
  orderTip?: string;
  punctTip?: string;
}

function mk(emoji: string, show: string, say: string, sentence: string, rule: string, o: RoundOpts = {}): SmithRound {
  const p = parseSentence(sentence);
  return {
    emoji,
    show,
    say,
    answers: [p.tiles, ...(o.alts ?? []).map((a) => parseSentence(a).tiles)],
    end: p.end,
    close: p.close,
    extras: o.extras ?? {},
    rule,
    orderTip: o.orderTip,
    punctTip: o.punctTip,
  };
}

/** Grade 1: the kid hears the sentence; the screen shows its words without capitals or end mark. */
function g1(emoji: string, sentence: string, rule: string, o: RoundOpts = {}): SmithRound {
  const p = parseSentence(sentence);
  const plain = p.tiles.map(lower).join(" ");
  const strong = p.end === "!" ? " Say it with a big, strong feeling." : "";
  return mk(emoji, `Forge: “${plain}”${strong}`, `Forge this sentence.${strong} ${sentence}`, sentence, rule, o);
}

/** Grades 2-3: the prompt tells what to say; the kid works out the right forms. */
const rd = (emoji: string, prompt: string, sentence: string, rule: string, o: RoundOpts = {}) => mk(emoji, prompt, prompt, sentence, rule, o);

export const SMITH_LEVELS: SmithLevel[] = [
  // ---------------- Grade 1 ----------------
  {
    id: "g1-1",
    grade: 1,
    title: "Words in Order",
    intro: "Skill: building a sentence with a capital and a period (L.1.1j, L.1.2b). Lay the word tiles in order, stamp a capital on the first word, then hammer on a period!",
    hintAfter: 2,
    rounds: [
      g1("🐶", "The dog can run.", "A sentence starts with a capital letter and ends with an end mark."),
      g1("🐸", "A frog sat on a log.", "The first word of a sentence always gets a capital letter."),
      g1("🐝", "The bee is on the flower.", "A telling sentence ends with a period."),
      g1("🌳", "We see a big tree.", "A sentence tells who and what they do: we see."),
      g1("🐄", "The cow eats green grass.", "A telling sentence starts with a capital and ends with a period."),
      g1("🐟", "My fish swims fast.", "Words in the right order make the sentence make sense."),
    ],
  },
  {
    id: "g1-2",
    grade: 1,
    title: "Names and I",
    intro: "Skill: capital letters for names, days and the word I (L.1.2a). Names of people and pets, days of the week, and I always get a capital!",
    hintAfter: 2,
    rounds: [
      g1("🐱", "Sam has a cat.", "Names of people start with a capital letter: Sam."),
      g1("🦆", "Mia and I feed the ducks.", "The word I is always a capital letter.", { orderTip: "Name the other person first: Mia and I." }),
      g1("🐴", "I ride a brown horse.", "When I is a word by itself, it is always a capital."),
      g1("🏊", "We swim on Monday.", "Days of the week start with a capital letter: Monday.", { alts: ["On Monday we swim."] }),
      g1("🐕", "Dad and I walk Max.", "A pet's name gets a capital letter too: Max.", { orderTip: "Name the other person first: Dad and I." }),
      g1("🌽", "Ben picks corn on Friday.", "Names and days both start with capitals: Ben, Friday.", { alts: ["On Friday Ben picks corn."] }),
    ],
  },
  {
    id: "g1-3",
    grade: 1,
    title: "Tell, Ask or Shout",
    intro: "Skill: telling, asking and exclaiming sentences (L.1.1j, L.1.2b). Listen closely: a telling sentence gets a period, an asking sentence gets a question mark, and a strong feeling gets an exclamation point!",
    hintAfter: 2,
    rounds: [
      g1("🌙", "Can you see the moon?", "An asking sentence ends with a question mark."),
      g1("🐞", "A bug is on my hat.", "A telling sentence ends with a period."),
      g1("🐝", "Watch out for the bee!", "A strong feeling or warning ends with an exclamation point."),
      g1("🐦", "Where is the red bird?", "Questions that start with where, who or what end with a question mark."),
      g1("🏆", "We won the big game!", "Exciting news ends with an exclamation point."),
      g1("🐢", "The turtle is slow.", "A telling sentence ends with a period."),
      g1("🍎", "Do you like apples?", "An asking sentence ends with a question mark."),
    ],
  },

  // ---------------- Grade 2 ----------------
  {
    id: "g2-1",
    grade: 2,
    title: "Tricky Plurals and Past",
    intro: "Skill: irregular plural nouns and irregular past-tense verbs (L.2.1b, L.2.1d). Some words don't just add -s or -ed. Leave the made-up forms in the bank!",
    hintAfter: 2,
    rounds: [
      rd("🐔", "Yesterday lots of kids gave food to the hens. Forge the sentence!", "The children fed the hens.", "Some plurals are irregular: one child, two children.", {
        extras: { childs: "Child is irregular: one child, many children.", feeded: "Feed is irregular: today we feed, yesterday we fed." },
      }),
      rd("🦶", "Tell what happened to both of your 🦶🦶 in the puddle.", "My feet got wet.", "Foot is irregular: one foot, two feet.", {
        extras: { foots: "Foot is irregular: one foot, two feet.", getted: "Get is irregular: today I get, yesterday I got." },
      }),
      rd("🐭", "Tell where the 🐭🐭🐭 went to hide yesterday.", "The mice hid in the barn.", "Mouse is irregular: one mouse, many mice.", {
        extras: { mouses: "Mouse is irregular: one mouse, many mice.", hided: "Hide is irregular: today they hide, yesterday they hid." },
      }),
      rd("🐑", "Tell what the 🐑🐑 did to the grass this morning.", "The sheep ate the grass.", "Sheep stays the same for one or many: one sheep, two sheep.", {
        extras: { sheeps: "Sheep stays the same for one or many: one sheep, two sheep.", eated: "Eat is irregular: today we eat, yesterday we ate." },
      }),
      rd("🦷", "Tell what you did this morning to keep your smile clean.", "This morning I brushed my teeth.", "Brush is regular, so add -ed for the past: brushed.", {
        alts: ["I brushed my teeth this morning."],
        extras: { tooths: "Tooth is irregular: one tooth, many teeth.", brush: "This morning already happened, so use the past tense: brushed." },
      }),
      rd("🎣", "Tell what your grandpa did at the lake yesterday. He got 🐟🐟!", "Yesterday my grandpa caught two fish.", "Catch is irregular: today I catch, yesterday I caught.", {
        alts: ["My grandpa caught two fish yesterday."],
        extras: { catched: "Catch is irregular: today I catch, yesterday I caught.", catch: "Yesterday means it already happened, so use caught." },
      }),
    ],
  },
  {
    id: "g2-2",
    grade: 2,
    title: "Describe It, Shorten It",
    intro: "Skill: adjectives and adverbs (L.2.1e) and apostrophes in contractions (L.2.2c). Adjectives describe things; adverbs tell how. An apostrophe takes the place of missing letters.",
    hintAfter: 2,
    rounds: [
      rd("🐢", "Tell what the turtle is like.", "The turtle is slow.", "An adjective like slow describes a noun: the turtle.", {
        extras: { slowly: "Slow describes the turtle, a thing, so use the adjective slow." },
      }),
      rd("🎶", "Tell how she sings. Her song is sweet!", "She sings sweetly.", "An adverb like sweetly tells how someone does something.", {
        extras: { sweet: "Sweetly tells how she sings, and many adverbs that tell how end in -ly." },
      }),
      rd("🙅", "Squeeze “can not” into one word: I can not reach the shelf.", "I can't reach the shelf.", "An apostrophe takes the place of missing letters: can not becomes can't.", {
        extras: { cant: "Can't needs an apostrophe where the letters were taken out." },
      }),
      rd("🐱", "Tell what the kitten's fur felt like.", "The kitten was soft.", "An adjective like soft describes a noun: the kitten.", {
        extras: { softly: "Soft describes the kitten, a thing, so use the adjective soft." },
      }),
      rd("🚜", "Squeeze “we are” into one word: We are going to the farm.", "We're going to the farm.", "We are becomes we're: the apostrophe stands for the missing a.", {
        extras: { were: "Were is a different word; we are becomes we're with an apostrophe." },
      }),
      rd("🦉", "Tell how the owls fly at night. Shhh!", "Owls fly quietly at night.", "An adverb like quietly tells how the owls fly.", {
        alts: ["At night owls fly quietly."],
        extras: { quiet: "Quietly tells how the owls fly, and many adverbs that tell how end in -ly." },
      }),
      rd("🐶", "Squeeze “did not” into one word: The puppy did not bark.", "The puppy didn't bark.", "Did not becomes didn't: the apostrophe stands for the missing o.", {
        extras: { didnt: "Didn't needs an apostrophe where the o was taken out." },
      }),
    ],
  },
  {
    id: "g2-3",
    grade: 2,
    title: "Join with And, But, So",
    intro: "Skill: compound sentences with and, but, so (L.2.1f) and capitals for holidays and places (L.2.2a). Join two sentences with a comma and a joining word.",
    hintAfter: 2,
    rounds: [
      rd("☀️", "Join the ideas: The sun came out. We went outside.", "The sun came out, so we went outside.", "So joins two ideas when the second one happens because of the first.", {
        extras: { but: "But shows a surprise; the sun coming out is why we went outside, so use so." },
      }),
      rd("🐱", "Join the ideas: The cat is small. It is brave.", "The cat is small, but it is brave.", "But joins two ideas that are a surprise together.", {
        extras: { so: "So shows a result; being small doesn't make the cat brave, so use but." },
      }),
      rd("🐷", "Join the ideas: We fed the pigs. We milked the cow.", "We fed the pigs, and we milked the cow.", "And joins two ideas that go together.", {
        alts: ["We milked the cow, and we fed the pigs."],
      }),
      rd("🌧️", "Join the ideas: It was raining. We grabbed our umbrellas.", "It was raining, so we grabbed our umbrellas.", "So joins a cause and what happened because of it.", {
        extras: { but: "But shows a surprise; the rain is why we grabbed umbrellas, so use so." },
      }),
      rd("🦃", "Join the ideas: It was cold on Thanksgiving. We played football outside.", "It was cold on Thanksgiving, but we played football outside.", "Holidays like Thanksgiving start with a capital letter.", {
        extras: { so: "So shows a result; cold weather doesn't make you play outside, so use but." },
      }),
      rd("🌱", "Join the ideas: Ana planted seeds. Leo watered them.", "Ana planted seeds, and Leo watered them.", "Put a comma before and when it joins two sentences."),
      rd("🏞️", "Join the ideas: We swam in Lake Erie. The water was cold.", "We swam in Lake Erie, but the water was cold.", "Names of places like Lake Erie start with capital letters.", {
        extras: { so: "So shows a result; swimming doesn't make the water cold, so use but." },
      }),
    ].map((r) => ({ ...r, punctTip: "When and, but or so joins two sentences, put a comma before it." })),
  },

  // ---------------- Grade 3 ----------------
  {
    id: "g3-1",
    grade: 3,
    title: "Agree and Tense",
    intro: "Skill: subject-verb agreement (L.3.1f) and past, present and future verb tenses (L.3.1d, L.3.1e). The verb must match who is doing it and when.",
    hintAfter: 3,
    rounds: [
      rd("🐝", "Tell what the bees do in the garden every day.", "The bees buzz in the garden.", "A plural subject takes a verb without -s: the bees buzz.", {
        extras: { buzzes: "Bees means more than one, so the verb has no -s: the bees buzz." },
      }),
      rd("🐕", "Tell what my dog does every time the mail truck comes.", "My dog barks at the mail truck.", "A singular subject takes a verb with -s: my dog barks.", {
        extras: { bark: "One dog is a singular subject, so the verb gets an -s: my dog barks." },
      }),
      rd("🫘", "Tell what we will do in the garden tomorrow.", "Tomorrow we will plant beans.", "For the future, use will with the verb: will plant.", {
        alts: ["We will plant beans tomorrow."],
        extras: { planted: "Tomorrow is in the future, so use will plant, not planted." },
      }),
      rd("⚾", "Tell how our team did in the big game last week.", "Last week our team won the game.", "Win is irregular: the past tense is won.", {
        alts: ["Our team won the game last week."],
        extras: { winned: "Win is irregular: the past tense is won, not winned.", wins: "Last week is in the past, so use the past tense: won." },
      }),
      rd("💡", "Long ago, an inventor tried out many light bulbs. Tell what Thomas Edison did.", "Thomas Edison tested many light bulbs.", "Add -ed for the past tense of a regular verb: tested.", {
        extras: { tests: "This happened long ago, so use the past tense: tested." },
      }),
      rd("🍽️", "Tell what my brother and I do after supper each night.", "My brother and I wash the dishes.", "Two subjects joined by and take a verb without -s: my brother and I wash.", {
        extras: { washes: "My brother and I are two people, so use wash without -s." },
        orderTip: "Name the other person first: my brother and I.",
      }),
      rd("✈️", "Tell what the Wright brothers did in 1903.", "The Wright brothers flew their plane in 1903.", "Fly is irregular: the past tense is flew.", {
        alts: ["In 1903 the Wright brothers flew their plane."],
        extras: { flied: "Fly is irregular: the past tense is flew, not flied.", fly: "1903 was long ago, so use the past tense: flew." },
      }),
    ],
  },
  {
    id: "g3-2",
    grade: 3,
    title: "Compare and Connect",
    intro: "Skill: comparative and superlative words (L.3.1g) and joining ideas with because, when and although (L.3.1h, L.3.1i). Use -er for two things, -est for the most, and pick the joining word that fits the meaning.",
    hintAfter: 3,
    rounds: [
      rd("🐆", "Compare how fast a cheetah and a horse can run.", "A cheetah is faster than a horse.", "Add -er to compare two things: faster.", {
        extras: { fastest: "You are comparing just two animals, so use -er: faster." },
        orderTip: "The cheetah is the speedy one, so it comes first.",
      }),
      rd("🐋", "Tell about the biggest animal on our planet, the blue whale.", "The blue whale is the largest animal on Earth.", "Add -est to compare three or more: the largest.", {
        extras: { larger: "You are comparing it with every animal, so use -est: largest." },
      }),
      rd("🧩", "Compare this hard puzzle with that easy one.", "This puzzle is more difficult than that one.", "Long describing words use more instead of -er: more difficult.", {
        extras: { difficulter: "Long words like difficult use more instead of -er: more difficult." },
      }),
      rd("☔", "Tell why we stayed inside. It was raining!", "We stayed inside because it was raining.", "Because tells the reason something happened.", {
        extras: { although: "Although shows a surprise; the rain is the reason, so use because." },
        orderTip: "Tell what happened first, then because and the reason.",
      }),
      rd("🔔", "Tell when we ran outside: the bell rang first.", "When the bell rang, we ran outside.", "When tells the time something happened.", {
        alts: ["We ran outside when the bell rang."],
        extras: { although: "Although shows a surprise; the bell tells the time we ran out, so use when." },
      }),
      rd("🥶", "It was cold, but we still played soccer. Join the ideas.", "Although it was cold, we played soccer.", "Although joins two ideas when the second is a surprise.", {
        alts: ["We played soccer although it was cold."],
        extras: { because: "Because gives a reason; cold weather isn't why we played, so use although." },
      }),
      rd("🥕", "Ben's garden is better than every other garden on our street. Tell about it.", "Ben has the best garden on our street.", "Good is irregular: good, better, best.", {
        extras: { goodest: "Good is irregular: good, better, best. There is no goodest." },
      }),
    ].map((r) => ({ ...r, punctTip: r.punctTip ?? "When a when or although part comes first, put a comma after it." })),
  },
  {
    id: "g3-3",
    grade: 3,
    title: "Commas and Quotes",
    intro: "Skill: commas in addresses (L.3.2b) and quotation marks in dialogue (L.3.2c). Commas go between the street, the city and the state. Quotation marks go around the exact words someone says.",
    hintAfter: 3,
    rounds: [
      rd("🏠", "Tell where Grandma lives: number 9 on Elm Street, in the city of Dayton, in the state of Ohio.", "Grandma lives at 9 Elm Street, Dayton, Ohio.", "In an address, commas go between the street, the city and the state.", {
        punctTip: "Put a comma after the street and after the city.",
      }),
      rd("🗣️", "Mom told me to feed the dog. Write her exact words: please feed the dog.", "Mom said, “Please feed the dog.”", "Quotation marks go around the exact words someone says.", {
        punctTip: "Put a comma after said, then an opening quotation mark before the spoken words.",
      }),
      rd("✉️", "Tell where to send the letter: number 42 on Pine Road, in Austin, Texas.", "Send the letter to 42 Pine Road, Austin, Texas.", "Street names, cities and states start with capitals, and commas go between them.", {
        punctTip: "Put a comma after the street and after the city.",
      }),
      rd("🪁", "Ben asked a question. His exact words: can we fly the kite", "Ben asked, “Can we fly the kite?”", "The question mark goes inside the closing quotation mark.", {
        punctTip: "Put a comma after asked, then an opening quotation mark before the spoken words.",
      }),
      rd("🏛️", "Tell that we visited the city of Boston in the state of Massachusetts in May.", "We visited Boston, Massachusetts, in May.", "Put a comma between the city and the state, and after the state in a sentence.", {
        punctTip: "Put a comma between the city and the state, and another after the state.",
      }),
      rd("⚾", "The coach shouted to the runner. His exact words: run to first base", "The coach shouted, “Run to first base!”", "The first word inside quotation marks starts with a capital letter.", {
        punctTip: "Put a comma after shouted, then an opening quotation mark before the spoken words.",
      }),
      rd("🌻", "Dad told us the plan. His exact words: we will plant the garden on saturday", "Dad said, “We will plant the garden on Saturday.”", "The end mark goes inside the closing quotation mark.", {
        punctTip: "Put a comma after said, then an opening quotation mark before the spoken words.",
      }),
    ],
  },
];

export const levelById = (id: unknown): SmithLevel | undefined => (typeof id === "string" ? SMITH_LEVELS.find((l) => l.id === id) : undefined);

export const levelsForGrade = (grade: number): SmithLevel[] => SMITH_LEVELS.filter((l) => l.grade === grade);

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

/** The round's tiles in lowercase plus the wrong-form extras, shuffled the same way every time. */
export function bankFor(level: SmithLevel, roundIndex: number): string[] {
  const round = level.rounds[roundIndex];
  if (!round) return [];
  const answer = round.answers[0].map(lower);
  const tiles = [...answer, ...Object.keys(round.extras)];
  const r = rng(hash(`smith:${level.id}:${roundIndex}`));
  const out = [...tiles];
  for (let pass = 0; pass < 6; pass++) {
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    // Don't hand the kid the sentence already in order.
    if (out.slice(0, answer.length).join(" ") !== answer.join(" ")) break;
  }
  return out;
}

// ---------------- Checking a try ----------------

export interface Try {
  /** Bank indexes in the order placed. */
  o: number[];
  /** Bank indexes stamped with a capital. */
  c: number[];
  /** The end mark ("" if none). */
  e: string;
}

export type Step = "words" | "caps" | "end";

export interface Check {
  ok: boolean;
  /** One sentence that names the rule (empty when right). */
  note: string;
  /** Where the first mistake is, so the screen can jump there. */
  step: Step;
}

/** The kid's sentence as tiles, with the capitals they stamped. */
export function builtTiles(bank: string[], t: Try): string[] {
  const caps = new Set(t.c);
  return t.o.filter((i) => i >= 0 && i < bank.length).map((i) => (caps.has(i) ? capitalize(bank[i]) : bank[i]));
}

const counts = (xs: string[]) => {
  const m = new Map<string, number>();
  for (const x of xs) m.set(x, (m.get(x) ?? 0) + 1);
  return m;
};

const sameBag = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  const ca = counts(a);
  const cb = counts(b);
  for (const [k, v] of ca) if (cb.get(k) !== v) return false;
  return true;
};

const DEFAULT_ORDER = "Start with who or what the sentence is about, then tell what they do.";

function endNote(end: End): string {
  if (end === "?") return "It asks something, so it ends with a question mark.";
  if (end === "!") return "It shows a strong feeling, so it ends with an exclamation point.";
  return "It tells something, so it ends with a period.";
}

/** Checks one try and, if it's wrong, names the first rule it breaks. Never throws. */
export function checkTry(level: SmithLevel, roundIndex: number, t: Try): Check {
  const round = level.rounds[roundIndex];
  if (!round) return { ok: false, note: "", step: "words" };
  const bank = bankFor(level, roundIndex);
  const built = builtTiles(bank, t);
  const end = ENDS.includes(t.e as End) ? (t.e as End) : null;
  if (end === round.end && round.answers.some((a) => a.length === built.length && a.every((w, i) => w === built[i]))) return { ok: true, note: "", step: "words" };

  const low = built.map(lower);
  if (low.length === 0) return { ok: false, note: "Tap the word tiles to lay them on the anvil.", step: "words" };

  // 1. Words: a wrong form, a missing word, or the wrong order.
  const wrongForm = low.find((w) => round.extras[w]);
  if (wrongForm) return { ok: false, note: round.extras[wrongForm], step: "words" };
  const target = round.answers.find((a) => sameBag(a.map(lower), low)) ?? round.answers[0];
  const tLow = target.map(lower);
  if (!sameBag(tLow, low)) {
    const have = counts(low);
    const missing = tLow.find((w) => {
      const n = have.get(w) ?? 0;
      if (n > 0) have.set(w, n - 1);
      return n === 0;
    });
    if (missing && isPunct(missing)) return { ok: false, note: round.punctTip ?? "A punctuation mark is missing.", step: "words" };
    if (missing) return { ok: false, note: `A word is missing: use the “${missing}” tile too.`, step: "words" };
    return { ok: false, note: round.punctTip ?? "Take out the extra tile.", step: "words" };
  }
  if (tLow.join(" ") !== low.join(" ")) {
    const noP = (xs: string[]) => xs.filter((w) => !isPunct(w)).join(" ");
    if (noP(tLow) === noP(low)) return { ok: false, note: round.punctTip ?? "Check where the commas go.", step: "words" };
    return { ok: false, note: round.orderTip ?? DEFAULT_ORDER, step: "words" };
  }

  // 2. Capitals.
  for (let i = 0; i < target.length; i++) {
    const want = target[i];
    if (want === built[i]) continue;
    if (want !== lower(want)) {
      if (i === 0) return { ok: false, note: "A sentence always starts with a capital letter.", step: "caps" };
      if (want === "I") return { ok: false, note: "The word I is always a capital letter.", step: "caps" };
      if (target[i - 1] === "“") return { ok: false, note: "The first word inside quotation marks starts with a capital letter.", step: "caps" };
      return { ok: false, note: `Names of people, places, days and holidays start with a capital letter: ${want}.`, step: "caps" };
    }
    return { ok: false, note: `“${want}” doesn't need a capital: only the first word, I and names get one.`, step: "caps" };
  }

  // 3. End mark.
  if (!end) return { ok: false, note: "Hammer on an end mark: a period, question mark or exclamation point.", step: "end" };
  return { ok: false, note: endNote(round.end), step: "end" };
}

// ---------------- Moves and scoring ----------------

/** Cleans one untrusted try. Never throws. */
export function cleanTry(raw: unknown, bankSize: number): Try {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const ints = (v: unknown) =>
    Array.isArray(v) ? v.slice(0, 40).filter((n): n is number => typeof n === "number" && Number.isInteger(n) && n >= 0 && n < bankSize) : [];
  const order = ints(o.o);
  // A tile can only be placed once.
  const uniq = new Set(order).size === order.length ? order : [];
  return { o: uniq, c: [...new Set(ints(o.c))], e: typeof o.e === "string" && ENDS.includes(o.e as End) ? o.e : "" };
}

/** Moves: per round, the list of tries. */
export function cleanMoves(level: SmithLevel, raw: unknown): Try[][] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, level.rounds.length).map((tries, ri) => {
    const size = bankFor(level, ri).length;
    return Array.isArray(tries) ? tries.slice(0, MAX_TRIES).map((t) => cleanTry(t, size)) : [];
  });
}

/** Which try was right (0-based), or -1. */
export function solvedOn(level: SmithLevel, roundIndex: number, tries: Try[] | undefined): number {
  if (!tries) return -1;
  return tries.findIndex((t) => checkTry(level, roundIndex, t).ok);
}

/** 2 points for the first try, 1 for getting it right later. */
export function roundPoints(level: SmithLevel, roundIndex: number, tries: Try[] | undefined): number {
  const k = solvedOn(level, roundIndex, tries);
  return k === 0 ? 2 : k > 0 ? 1 : 0;
}

export function starsFor(points: number, max: number): number {
  if (max <= 0 || points <= 0) return 0;
  return points >= Math.ceil(max * 0.85) ? 3 : points >= max * 0.5 ? 2 : points >= max * 0.25 ? 1 : 0;
}

/** Replays a whole game (the server uses this to check the score). */
export function replay(level: SmithLevel, raw: unknown): { points: number[]; total: number; max: number; stars: number } {
  const moves = cleanMoves(level, raw);
  const points = level.rounds.map((_, i) => roundPoints(level, i, moves[i]));
  const total = points.reduce((s, p) => s + p, 0);
  const max = level.rounds.length * 2;
  return { points, total, max, stars: starsFor(total, max) };
}

/** The right try for a round (a solver for tests and the worked example). */
export function solveRound(level: SmithLevel, roundIndex: number): Try {
  const round = level.rounds[roundIndex];
  const bank = bankFor(level, roundIndex);
  const used = new Set<number>();
  const o: number[] = [];
  const c: number[] = [];
  for (const w of round.answers[0]) {
    const i = bank.findIndex((b, k) => !used.has(k) && b === lower(w));
    used.add(i);
    o.push(i);
    if (w !== lower(w)) c.push(i);
  }
  return { o, c, e: round.end };
}

/** A perfect game. */
export const perfectMoves = (level: SmithLevel): Try[][] => level.rounds.map((_, i) => [solveRound(level, i)]);

// ---------------- Pixel art ----------------

const INK = "#1b1530";

/** The anvil, 26x14. */
export function anvilGrid(): Grid {
  const g = new Grid(26, 14);
  const top = "#9aa3b5";
  const side = "#6b7385";
  const dark = "#4a5163";
  g.rect(6, 1, 18, 2, "#c4cbd9").rect(6, 3, 18, 2, top);
  // horn
  g.rect(2, 2, 4, 2, top).rect(0, 2, 2, 1, top).rect(3, 4, 3, 1, side);
  g.rect(9, 5, 12, 2, side).rect(11, 7, 8, 3, dark).rect(8, 10, 14, 3, side).rect(8, 12, 14, 1, dark);
  return g.outline(INK);
}

/** The smith's hammer, 10x14 (handle down). */
export function hammerGrid(): Grid {
  const g = new Grid(10, 14);
  g.rect(1, 1, 8, 4, "#9aa3b5").rect(1, 1, 8, 1, "#c4cbd9").rect(1, 4, 8, 1, "#6b7385");
  g.rect(4, 5, 2, 8, "#a8641f").rect(4, 5, 1, 8, "#d68a3a");
  return g.outline(INK);
}

/** The forge fire in its stone hearth, 16x16. `frame` 0/1 flickers. */
export function forgeGrid(frame = 0): Grid {
  const g = new Grid(16, 16);
  g.rect(1, 10, 14, 5, "#7d6b5d").rect(1, 10, 14, 1, "#9c8a7a");
  for (let x = 2; x < 14; x += 4) g.rect(x, 12, 2, 1, "#5e4f44");
  const f = frame ? 1 : 0;
  g.tri(5 + f, 2, 10, 3, "#e8590c").tri(10 - f, 3, 10, 3, "#e8590c");
  g.tri(5 + f, 5, 10, 2, "#ffa94d").tri(10 - f, 6, 10, 2, "#ffa94d");
  g.tri(8, 6 - f, 10, 2, "#ffe066");
  return g.outline(INK);
}

// ---------------- The game ----------------

const asMini = (l: SmithLevel): MiniLevel => ({ id: l.id, title: l.title, intro: l.intro });

export const sentenceSmith: MiniGame = {
  ...sentenceSmithInfo,
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
