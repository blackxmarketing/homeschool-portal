import type { MiniGame, MiniLevel } from "./index";
import type { Band } from "../pixel/world";

/**
 * Bug Hunt (Wordsmith Woods). A short passage hides "bugs" (writing errors).
 * The kid taps a word they think is wrong and types the fix. A correct fix
 * squashes the bug and teaches the rule behind it. Tapping a word that was
 * already right (or typing a wrong fix) costs a net, and nets are limited.
 * Stars come from bugs found and nets left.
 *
 * Passages are original retellings of public-domain fables or short, factual
 * stories about inventors and explorers. Bugs are written inline as
 * `[wrong|fix1|fix2#rule]`; a bug may cover a few words (e.g. a misplaced
 * modifier). Pure and repeatable, so the server can replay the kid's moves.
 */

// ---------------- Rules (what each bug teaches) ----------------

export const RULES = {
  cap: { name: "Capital letters", tip: "Start every sentence, and every name of a person or place, with a capital letter." },
  end: { name: "End marks", tip: "Every sentence needs an end mark: a period (.), a question mark (?) or an exclamation point (!)." },
  there: { name: "their / there / they're", tip: "There = a place (over there). Their = belongs to them (their nest). They're = they are." },
  to: { name: "to / too / two", tip: "To = toward (go to the farm). Too = also, or more than enough (too high). Two = the number 2." },
  its: { name: "its / it's", tip: "Its = belongs to it (the lion's nose → its nose). It's = it is. Test it: if \"it is\" fits, write it's." },
  comma: { name: "Commas", tip: "Put a comma after an introductory phrase (As the sun goes down,) and between items in a list (a printer, a writer, and an inventor)." },
  sva: { name: "Subject-verb agreement", tip: "A singular subject takes a singular verb (the lamp needs); a plural subject takes a plural verb (the ropes were). Skip the words in between: \"the ropes of the net\" → ropes → were." },
  runon: { name: "Run-on sentences", tip: "Two complete sentences can't be glued together with nothing (or only a comma). Use a semicolon (;), a period, or a comma plus and / but / so." },
  semicolon: { name: "Semicolons", tip: "A semicolon joins two complete sentences that belong together. Don't use one before \"and\" (use a comma), and use a colon (:) to introduce a list." },
  parallel: { name: "Parallel structure", tip: "Items in a list should share the same form: to steer, to watch, and to talk; camp, hunt, and keep; quickly, cheaply, and accurately." },
  pronoun: { name: "Pronoun agreement", tip: "A pronoun must match the noun it stands for. \"Each of the lifeboats\" is one boat at a time, so it takes its, not their." },
  modifier: { name: "Misplaced modifiers", tip: "Put a describing word or phrase right next to what it describes. \"Nearly sailed 800 miles\" means they almost set sail; \"sailed nearly 800 miles\" means they went almost that far." },
  word: { name: "Word choice", tip: "Some words sound alike but mean different things. Check the meaning: loose / lose / loosen, then / than, affect / effect, fewer / less, principle / principal, accept / except." },
} as const;

export type RuleKey = keyof typeof RULES;

// ---------------- Levels ----------------

export interface BugLevel extends MiniLevel {
  /** Nets the kid starts with (each wrong tap costs one). */
  nets: number;
  /** Misses allowed for 3 stars (sprout is more forgiving). */
  forgive: number;
  /** The passage with inline bugs: [wrong|fix1|fix2#rule]. */
  passage: string;
}

export const BUGHUNT_LEVELS: Record<Band, BugLevel[]> = {
  sprout: [
    {
      id: "bh-s1",
      title: "The Fox and the Grapes",
      intro: "3 bugs are hiding in this fable. Tap a word that looks wrong, type the fix, and squash the bug! You have 5 nets for wrong taps.",
      nets: 5,
      forgive: 2,
      passage:
        "One hot day, a hungry fox walked past a vineyard. [he|He#cap] saw fat purple grapes hanging high on a vine. The fox jumped and jumped, but the grapes were [to|too#to] high. At last he gave up and walked [away|away.|away!#end] He told himself the grapes were probably sour. It is easy to say you never wanted something you cannot have.",
    },
    {
      id: "bh-s2",
      title: "The Ant and the Grasshopper",
      intro: "4 bugs this time. Look for capital letters, end marks, and sound-alike words like there and their.",
      nets: 5,
      forgive: 2,
      passage:
        "All summer long, the ants worked hard. They carried seeds back to [there|their#there] nest, one by one. The grasshopper only sang and played in the sun. When winter came, the fields were cold and [empty|empty.|empty!#end] The ants had plenty of food, but the grasshopper had none. The kind ants shared a little with him, and he learned a lesson [two|too#to]. [it|It#cap] is wise to get ready for hard days.",
    },
    {
      id: "bh-s3",
      title: "The First Flight",
      intro: "A true story about two inventors, with 4 bugs. Read every word carefully!",
      nets: 4,
      forgive: 2,
      passage:
        "Wilbur and Orville Wright owned a bicycle shop in Ohio. They loved to read about birds and gliders. [in|In#cap] 1903, they took [there|their#there] flying machine to a windy beach in North Carolina. On December 17, Orville flew for twelve [seconds|seconds.|seconds!#end] It was the first flight of an airplane with an engine. Wilbur was proud of his brother, and Orville was proud of him [to|too#to].",
    },
  ],
  adventurer: [
    {
      id: "bh-a1",
      title: "The Lion and the Mouse",
      intro: "5 bugs: watch for its / it's, commas, subject-verb agreement and run-on sentences. 4 nets.",
      nets: 4,
      forgive: 1,
      passage:
        "A lion was napping in the shade when a tiny mouse ran across [it's|its#its] nose. The lion trapped the mouse under one huge paw. The mouse begged for mercy and promised to help the lion one day. The lion laughed, but he let the little mouse go. [However|However,#comma] the story was not over. A week later, the lion was caught in a hunter's net. The ropes of the net [was|were#sva] thick and strong. The lion roared for [help|help;|help, and#runon] the mouse heard him from far away. The mouse chewed through the ropes, and the lion was free. [Its|It's|It is#its] amazing what a small friend can do.",
    },
    {
      id: "bh-a2",
      title: "Franklin's Kite",
      intro: "6 bugs in a true story about Benjamin Franklin. Some words look buggy but are fine, so think before you tap!",
      nets: 4,
      forgive: 1,
      passage:
        "Benjamin Franklin was a [printer|printer,#comma] a writer, and an inventor. In 1752, he set out to show that lightning is a kind of electricity. Each of his experiments [were|was#sva] planned with care. During a storm, he flew a kite with a metal key tied to [it's|its#its] string. When he moved his knuckle near the key, he felt a [spark|spark;|spark, and|spark, so#runon] the test had worked. After many more careful [tests|tests,#comma] he invented the lightning rod. [Its|It's|It is#its] still used to protect tall buildings today.",
    },
    {
      id: "bh-a3",
      title: "The Lighthouse Keeper",
      intro: "6 bugs, and a few traps: one its in this story is already right. 4 nets.",
      nets: 4,
      forgive: 1,
      passage:
        "Every night, the lighthouse keeper climbs one hundred stairs to the lamp. The lamp, with all of [it's|its#its] shining mirrors, [need|needs#sva] careful cleaning. As the sun goes [down|down,#comma] a storm rolls in from the sea. The waves crash against the [rocks|rocks;|rocks, and|rocks, while#runon] the wind howls like a wolf. The sailors on a small fishing boat [is|are#sva] tired and cold. The keeper knows that [its|it's|it is#its] his job to guide them home. He lights the great lamp, and its beam sweeps across the dark water. By morning, the boat is safe in the harbor.",
    },
  ],
  strategist: [
    {
      id: "bh-h1",
      title: "Endurance",
      intro: "6 bugs in the story of Shackleton's expedition: word choice, semicolons, parallelism, pronoun agreement and a misplaced modifier. Some bugs span two words; tap either one.",
      nets: 4,
      forgive: 1,
      passage:
        "In 1915, the ship Endurance became trapped in the ice of the Weddell Sea. For months, the crew waited and hoped the ice would [loose|loosen|lose#word] its grip. Eventually, the pressure of the ice crushed the [ship;|ship,|ship#semicolon] and the Endurance sank. The men had to camp on the ice, hunt seals for food, and [they kept|keep#parallel] their spirits up. When the ice broke apart, they rowed three lifeboats to a rocky island. Each of the lifeboats carried [their|its#pronoun] own tired crew. Then Shackleton and five men [nearly sailed|sailed nearly|sailed almost#modifier] 800 miles across a stormy ocean to find help. The voyage was more dangerous [then|than#word] anything they had faced. Remarkably, all twenty-eight men survived; not one was lost.",
    },
    {
      id: "bh-h2",
      title: "Gutenberg's Press",
      intro: "7 bugs. One is a dangling modifier: rewrite the clause so the opening phrase describes the right noun. Precision counts.",
      nets: 4,
      forgive: 1,
      passage:
        "Around 1440, in the German city of Mainz, Johannes Gutenberg began work on a faster way to make books. Gutenberg needed three [things;|things:#semicolon] metal letters that could be used again and again, an ink that would stick to metal, and a strong press. Made of lead, tin, and antimony, [Gutenberg cast the letters.|the letters were cast by Gutenberg.|the letters were cast by him.|the letters were made by Gutenberg.|the letters were made by him.|the letters were cast by Johannes Gutenberg.|the letters were formed by Gutenberg.|the letters were shaped by Gutenberg.#modifier] Every one of the letters was cast in [their|its#pronoun] own small mold. His press could print pages quickly, cheaply, and [with accuracy|accurately#parallel]. With the press, there were [less|fewer#word] mistakes than in books copied by hand. News of the press spread [quickly,|quickly;#runon] by 1500, print shops were working in more than two hundred cities. The printing press had a huge [affect|effect#word] on learning; books were no longer only for the rich.",
    },
    {
      id: "bh-h3",
      title: "The Eagle Has Landed",
      intro: "8 bugs in the story of Apollo 11, and only 5 nets. Read like an editor: every word has to earn its place.",
      nets: 5,
      forgive: 1,
      passage:
        "On July 20, 1969, the lunar module Eagle dropped toward the Moon. Neil Armstrong and Buzz Aldrin were inside; Michael Collins circled overhead in the command module. The [principle|principal#word] goal of the mission was to land safely and return home. Armstrong's job was to steer, to watch the fuel, and [talking|to talk#parallel] with Mission Control. During the descent, the computer flashed warnings. Each of the alarms had [their|its#pronoun] own code number, such as 1202. The landing went well [accept|except#word] for one problem: the autopilot was heading for a field of boulders. Armstrong flew past the rocks by hand. When the Eagle touched down, it [only had|had only#modifier] about 25 seconds of fuel to spare. The Eagle settled gently onto the gray [dust,|dust;|dust.#runon] Armstrong radioed that the Eagle had landed. Hours later, Armstrong stepped onto the [surface;|surface,|surface#semicolon] and Aldrin soon followed. The astronauts collected rocks, set up experiments, and [they planted|planted#parallel] a flag.",
    },
  ],
};

export function levelById(id: string): BugLevel | undefined {
  return Object.values(BUGHUNT_LEVELS).flat().find((l) => l.id === id);
}

// ---------------- Parsing ----------------

export interface Token {
  text: string;
  /** Index into bugs, or -1 for a word that is already right. */
  bug: number;
}

export interface Bug {
  /** First token index and one past the last. */
  start: number;
  end: number;
  wrong: string;
  accept: string[];
  rule: RuleKey;
  /** True when the fix differs only by capital letters, so case must match. */
  caseMatters: boolean;
}

export interface Parsed {
  tokens: Token[];
  bugs: Bug[];
}

/** Tidies a typed fix: straight quotes, single spaces, no space before punctuation. */
export function normalize(s: string): string {
  return s
    .normalize("NFKC")
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .replace(/\s+([,;:.!?])/g, "$1")
    .trim();
}

const cache = new Map<string, Parsed>();

export function parse(level: BugLevel): Parsed {
  const hit = cache.get(level.id);
  if (hit) return hit;
  const tokens: Token[] = [];
  const bugs: Bug[] = [];
  const re = /\[([^\]]+)\]/g;
  let last = 0;
  const words = (s: string) => s.split(/\s+/).filter(Boolean);
  for (let m = re.exec(level.passage); m; m = re.exec(level.passage)) {
    for (const w of words(level.passage.slice(last, m.index))) tokens.push({ text: w, bug: -1 });
    const [body, rule] = m[1].split("#");
    const [wrong, ...accept] = body.split("|");
    const start = tokens.length;
    for (const w of words(wrong)) tokens.push({ text: w, bug: bugs.length });
    const lw = normalize(wrong).toLowerCase();
    bugs.push({ start, end: tokens.length, wrong, accept, rule: rule as RuleKey, caseMatters: accept.some((a) => normalize(a).toLowerCase() === lw) });
    last = m.index + m[0].length;
  }
  for (const w of words(level.passage.slice(last))) tokens.push({ text: w, bug: -1 });
  const parsed = { tokens, bugs };
  cache.set(level.id, parsed);
  return parsed;
}

/** Does this typed fix squash the bug? (Case only matters for capital-letter bugs.) */
export function accepts(bug: Bug, fix: string): boolean {
  const f = normalize(fix);
  if (!f) return false;
  return bug.accept.some((a) => (bug.caseMatters ? normalize(a) === f : normalize(a).toLowerCase() === f.toLowerCase()));
}

/** The text a tap would edit: the whole bug for a bug word, otherwise the word itself. */
export function spanText(p: Parsed, wordIndex: number): string {
  const t = p.tokens[wordIndex];
  if (!t) return "";
  if (t.bug < 0) return t.text;
  const b = p.bugs[t.bug];
  return p.tokens.slice(b.start, b.end).map((x) => x.text).join(" ");
}

// ---------------- Playing ----------------

export interface Move {
  wordIndex: number;
  fix: string;
}

export type HuntEvent =
  | { kind: "squash"; bug: number; fix: string }
  | { kind: "wrongfix"; bug: number; fix: string }
  | { kind: "miss"; wordIndex: number; fix: string };

export interface HuntState {
  /** Fixes for squashed bugs, by bug index. */
  fixed: Record<number, string>;
  netsLeft: number;
  misses: number;
  over: boolean;
}

export function start(level: BugLevel): HuntState {
  return { fixed: {}, netsLeft: level.nets, misses: 0, over: false };
}

/** Checks one untrusted move; returns null for moves that don't count (bad data, unchanged words, squashed bugs). */
export function cleanMove(p: Parsed, m: unknown): Move | null {
  if (!m || typeof m !== "object") return null;
  const o = m as Record<string, unknown>;
  const wordIndex = o.wordIndex;
  const fix = o.fix;
  if (typeof wordIndex !== "number" || !Number.isInteger(wordIndex) || wordIndex < 0 || wordIndex >= p.tokens.length) return null;
  if (typeof fix !== "string" || fix.length > 160) return null;
  const f = normalize(fix);
  if (!f || f === normalize(spanText(p, wordIndex))) return null;
  return { wordIndex, fix: f };
}

/** Plays one move. Moves that don't count leave the state as it was. */
export function step(level: BugLevel, state: HuntState, move: unknown): { state: HuntState; event: HuntEvent | null } {
  const p = parse(level);
  const m = cleanMove(p, move);
  if (state.over || !m) return { state, event: null };
  const t = p.tokens[m.wordIndex];
  if (t.bug >= 0 && state.fixed[t.bug] !== undefined) return { state, event: null };
  let next: HuntState;
  let event: HuntEvent;
  if (t.bug >= 0 && accepts(p.bugs[t.bug], m.fix)) {
    next = { ...state, fixed: { ...state.fixed, [t.bug]: m.fix } };
    event = { kind: "squash", bug: t.bug, fix: m.fix };
  } else {
    next = { ...state, netsLeft: state.netsLeft - 1, misses: state.misses + 1 };
    event = t.bug >= 0 ? { kind: "wrongfix", bug: t.bug, fix: m.fix } : { kind: "miss", wordIndex: m.wordIndex, fix: m.fix };
  }
  next.over = next.netsLeft <= 0 || Object.keys(next.fixed).length >= p.bugs.length;
  return { state: next, event };
}

export function starsFor(level: BugLevel, found: number, misses: number): number {
  const total = parse(level).bugs.length;
  if (found >= total) return misses <= level.forgive ? 3 : 2;
  return found * 2 >= total ? 1 : 0;
}

export interface HuntResult {
  state: HuntState;
  events: HuntEvent[];
  found: number;
  stars: number;
  /** Score kept as "best": 10 per bug plus 1 per net left. */
  best: number;
}

/** Replays a whole hunt from the kid's moves (the server uses this to check the score). */
export function replay(level: BugLevel, moves: unknown): HuntResult {
  let state = start(level);
  const events: HuntEvent[] = [];
  const list = Array.isArray(moves) ? moves.slice(0, 500) : [];
  for (const m of list) {
    if (state.over) break;
    const r = step(level, state, m);
    state = r.state;
    if (r.event) events.push(r.event);
  }
  const found = Object.keys(state.fixed).length;
  return { state, events, found, stars: starsFor(level, found, state.misses), best: found * 10 + Math.max(0, state.netsLeft) };
}

/** A perfect hunt (for tests and hints): the first accepted fix for every bug. */
export function solution(level: BugLevel): Move[] {
  return parse(level).bugs.map((b) => ({ wordIndex: b.start, fix: b.accept[0] }));
}

export const bugHuntInfo = { id: "bughunt", title: "Bug Hunt", icon: "🐛", land: "writing" as const, blurb: "Find and fix the mistakes hiding in each passage." };

export const bugHunt: MiniGame | null = {
  ...bugHuntInfo,
  levels: (band) => BUGHUNT_LEVELS[band] ?? [],
  score: (levelId, moves) => {
    const level = levelById(levelId);
    if (!level) return null;
    const r = replay(level, moves);
    return { stars: r.stars, best: r.best };
  },
};
