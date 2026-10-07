import type { Subject } from "@/lib/compliance";

/**
 * Courses beyond math (Phase 3). Each course is a list of lessons. A lesson:
 *   1. read: a short original lesson (plain paragraphs, separated by blank lines)
 *   2. check: a few multiple-choice questions, graded by code (pass = 80%)
 *   3. task: something the kid makes. "write" gets AI feedback against the
 *      rubric; "project", "lab" and "speak" happen off-screen and a parent
 *      approves them.
 * Finishing a lesson logs its minutes under its subject for records.
 *
 * Lessons follow the classical stages: grammar (facts and vocabulary), logic
 * (reasons, cause and effect, arguments) and rhetoric (explain, persuade,
 * create).
 */

export type Stage = "grammar" | "logic" | "rhetoric";

export interface CheckQuestion {
  q: string;
  choices: string[];
  /** Index into choices. */
  answer: number;
  /** Shown after answering: why the answer is right. */
  why: string;
}

export type TaskKind = "write" | "project" | "lab" | "speak";

export interface Task {
  kind: TaskKind;
  prompt: string;
  /** What good work looks like. Used for AI feedback and parent review. */
  rubric: string[];
}

// ---------------- Teaching model (interactive lessons) ----------------

/**
 * Interactive visuals and activities. "Activity" widgets (sort, sequence,
 * highlight) have right answers that are checked on the server; the others
 * are explorable visuals and simulations.
 */
export type Widget =
  /** Drag/tap each item into the right bucket. `bucket` is an index into buckets. */
  | { type: "sort"; prompt: string; buckets: string[]; items: { text: string; bucket: number }[] }
  /** Put the steps in order. `steps` are listed in the correct order; the kid sees them shuffled. */
  | { type: "sequence"; prompt: string; steps: string[] }
  /** Tap the sentence(s) that match the prompt. `correct` are indexes into sentences. */
  | { type: "highlight"; prompt: string; sentences: string[]; correct: number[] }
  /** Flip cards: vocabulary or key facts. */
  | { type: "flip"; cards: { front: string; back: string }[] }
  /** A timeline to explore; tap events for details. */
  | { type: "timeline"; events: { year: number; label: string; detail: string }[] }
  /** A diagram of named parts; tap each part to learn about it (cells, branches of government...). */
  | { type: "hotspots"; title: string; center: string; spots: { label: string; icon: string; detail: string }[] }
  /** Side-by-side comparison. */
  | { type: "compare"; left: { title: string; points: string[] }; right: { title: string; points: string[] } }
  /** Money: simple vs compound interest with sliders. */
  | { type: "compound"; principal: number; rate: number; years: number }
  /** Money: split income into categories with sliders. */
  | { type: "budget"; income: number; categories: { label: string; pct: number }[] }
  /** Business: price, cost per unit, fixed costs and units sold -> profit and break-even. */
  | { type: "profit"; price: number; cost: number; fixed: number; units: number }
  /** Science: a lever with movable weight and fulcrum. */
  | { type: "lever" }
  /** Science: Earth's orbit and tilt through the year (seasons). */
  | { type: "seasons" }
  /** Science: a ramp; height changes the speed at the bottom. */
  | { type: "ramp" }
  /** Science: a ball losing energy with each bounce. */
  | { type: "bounce"; efficiency: number };

export interface ThinkQuestion {
  q: string;
  choices: string[];
  answer: number;
  /** Why the right answer is right. */
  why: string;
  /** Coaching for each choice: why a kid might pick it and what they're missing. Use "" for the right answer. */
  hints: string[];
}

// ---------------- Interactive questions ("probes") ----------------

/** A specific wrong answer and the coaching for it. `match` is a wrong word/number the kid might enter. */
export interface Mistake {
  match: string;
  coach: string;
}

/**
 * Interactive questions that replace multiple choice: the kid fills in,
 * places, matches, builds or moves things to show what they know. Graded on
 * the server (answers never reach the browser), with partial credit.
 */
export type Probe = (
  /** Fill in the blanks. Write blanks as {0}, {1}... in `text`. Each blank lists accepted answers (case-insensitive).
   *  With `bank`, kids tap words from the bank (include the right words plus 2-4 distractors); without it they type. */
  | { type: "cloze"; text: string; blanks: { answers: string[] }[]; bank?: string[] }
  /** Type a number. */
  | { type: "number"; prompt: string; answer: number; tolerance?: number; unit?: string }
  /** Drag markers onto a number line or timeline. Each item has its true value; `tolerance` is how close counts. */
  | { type: "place"; prompt: string; min: number; max: number; step: number; tolerance: number; items: { label: string; value: number }[] }
  /** Match each left item to its right partner (shown shuffled). */
  | { type: "match"; prompt: string; pairs: { left: string; right: string }[] }
  /** Build a sentence/equation/argument by tapping tiles in order. `tiles` are in the correct order; `distractors` are extra tiles that don't belong.
   *  `also`: other orders of the same tiles that are just as right (e.g. ["1", "+", "4", "=", "5"] for 4 + 1 = 5). */
  | { type: "build"; prompt: string; tiles: string[]; distractors?: string[]; also?: string[][] }
  /** Use a simulation to hit a goal (see lib/probes.ts for each goal):
   *  lever: make the push at most `maxPush` kg with a `load` kg load;
   *  profit: set the price so profit is at least `minProfit` (cost, fixed, units given);
   *  compound: find how many years until `principal` at `rate`% reaches `target`;
   *  seasons: pick the month when the Northern Hemisphere has `season`. */
  | { type: "target"; prompt: string; goal:
      | { sim: "lever"; load: number; maxPush: number }
      | { sim: "profit"; cost: number; fixed: number; units: number; minProfit: number }
      | { sim: "compound"; principal: number; rate: number; target: number }
      | { sim: "seasons"; season: "summer" | "winter" } }
  /** The activity widgets can also be probes. */
  | Extract<Widget, { type: "sort" | "sequence" | "highlight" }>
) & {
  /** General coaching when the answer is wrong. */
  hint?: string;
  /** Coaching for specific wrong answers. */
  mistakes?: Mistake[];
  /** Expected seconds for a kid who knows it (used to measure speed of knowledge). */
  seconds?: number;
  /** Which idea this question is about, so the same idea asked several ways counts as one.
   *  Short name like "hourly-rate". Without it, the question's place in the lesson is used. */
  tests?: string;
  /** The angle this question comes from, so a kid has to show an idea several ways rather
   *  than the same way over and over: "symbolic", "visual", "real-world", "estimate"...
   *  Without it, the shape of the question (number, place, build...) stands in. */
  angle?: string;
};

/**
 * One slide on the teacher's screen. Slides change as the teacher reads:
 * each appears when the teacher reaches its `at` words.
 */
export interface Beat {
  /** Words from the teacher's text (copied exactly) where this slide appears. Leave out for the first slide. */
  at?: string;
  /** A short line under the picture. */
  caption: string;
  /**
   * A real photo: a Wikipedia article title (its main freely licensed image,
   * e.g. "Francesco Redi") or a Wikimedia Commons file ("File:Lever.jpg").
   */
  photo?: string;
  /** A big emoji picture instead of a photo, e.g. "🧊➡️💧". */
  emoji?: string;
  /** A big number or word to show, e.g. "1668". */
  big?: string;
  /**
   * An animated pixel scene, drawn in the game's own art and built up as the
   * teacher talks: a name from src/lib/pixel/lessonArt.ts, e.g. "redi-jars".
   */
  art?: string;
  /**
   * Key words that land on the picture as the teacher says them, instead of a
   * paragraph of caption. `at` is the words they are said at; `x`/`y` are
   * percentages across the picture (defaults spread them along the bottom).
   */
  words?: { text: string; at?: string; x?: number; y?: number }[];
}

/** A short video to watch after the teacher explains. Shown only after the kid presses play. */
export interface Video {
  /** The YouTube video id (the part after v= in the link). */
  youtube: string;
  title: string;
  channel: string;
  /** Start and end, in seconds, to show just the useful clip. */
  start?: number;
  end?: number;
}

/** A word the teacher puts on the board and leaves up. */
export interface Term {
  word: string;
  meaning: string;
}

/**
 * One beat of the teacher's presentation: about half a minute of talking, with
 * its own slides, and usually something for the kid to do straight after.
 *
 * A part's scenes are the *presented* version of its `teach` summary. Where a
 * part has scenes the teacher gives a proper talk; where it doesn't, the
 * summary is read out in short lines as before.
 */
export interface Scene {
  /** The heading on the board while this scene plays. */
  heading: string;
  /** 40-140 words, plain text, said as one continuous block. */
  say: string;
  /** Slides for this scene. Without `at` cues they are spread evenly through the words. */
  show?: Beat[];
  /** A short video, played after the narration. */
  watch?: Video;
  /** A model to play with straight after this scene. */
  visual?: Widget;
  /** A quick check before moving on. It does NOT replace the part's main probe. */
  check?: Probe;
  /** Words to put on the board and leave up. */
  terms?: Term[];
}

/** One small chunk of teaching: explain, show, then a quick think. */
export interface Segment {
  title: string;
  /** 60-130 words, plain text. The summary of this part: what the coach is given
   *  as context, what "read it all" shows, and the script when there are no scenes. */
  teach: string;
  /** The presented version of this part, scene by scene. */
  present?: Scene[];
  /** Slides that go along with the teacher's words. */
  show?: Beat[];
  /** A short video for this part. */
  watch?: Video;
  visual?: Widget;
  /** The interactive check for this part. When present it replaces the multiple-choice think. */
  probe?: Probe;
  /** Multiple-choice check: the fallback when there's no probe, and its hints still power the coaching ladder. */
  think: ThinkQuestion;
  /** Different ways in, used when a kid is struggling. */
  approaches: {
    /** An everyday analogy that explains the same idea. */
    analogy: string;
    /** A fully worked, concrete example. */
    example: string;
    /** A smaller first step: a simpler question that builds toward the main one. */
    simpler: ThinkQuestion;
  };
}

export interface Lesson {
  id: string;
  title: string;
  /** Minutes logged for records when the lesson is finished. */
  minutes: number;
  stage: Stage;
  /** Overrides the course subject for records (e.g. "U.S. Constitution"). */
  subject?: Subject;
  /** The whole lesson as one reading (always available as "read it all"). */
  read: string;
  /** 2-4 short takeaways shown after the reading. */
  keyIdeas: string[];
  /** 2-4 "you'll be able to..." goals in kid words, said at the start and ticked at the end.
   *  Without them the key ideas stand in, so every lesson can state its goals. */
  objectives?: string[];
  /** Interactive teaching model. Lessons without it fall back to read-then-check. */
  hook?: { text: string; visual?: Widget; show?: Beat[]; watch?: Video };
  teach?: Segment[];
  /** A hands-on activity after the teaching (sort, sequence or highlight). */
  activity?: Widget;
  /** "Explain it back": the kid explains in their own words; the coach checks for these points. */
  explain?: { prompt: string; keyPoints: string[] };
  /** "Show what you know": interactive probes that replace the multiple-choice check (pass = 80% score). */
  mastery?: Probe[];
  check: CheckQuestion[];
  task?: Task;
  /** Standards this lesson teaches (K-5): codes from src/content/standards/, e.g. "K.CC.A.1", "RF.1.2", "2-LS4-1". */
  standards?: string[];
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  hue: number;
  /** "academic" courses fill the 2-hour day; "life" courses are afternoon life skills. */
  track: "academic" | "life";
  subject: Subject;
  blurb: string;
  teacher: { name: string; avatar: string; inspiredBy: string; voice: string };
  /** Which grades it's written for: "sprout" 4-5, "adventurer" 6-8 (the default), "strategist" 9-12. */
  band?: "sprout" | "adventurer" | "strategist";
  /** K-5 courses: the grade it's written for (0 = kindergarten). These live in the grade's explore world. */
  grade?: number;
  /** An elective (Spanish...): parents can switch it off per kid. */
  elective?: boolean;
  lessons: Lesson[];
}
