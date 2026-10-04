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

/** One small chunk of teaching: explain, show, then a quick think. */
export interface Segment {
  title: string;
  /** 60-130 words, plain text. */
  teach: string;
  visual?: Widget;
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
  /** Interactive teaching model. Lessons without it fall back to read-then-check. */
  hook?: { text: string; visual?: Widget };
  teach?: Segment[];
  /** A hands-on activity after the teaching (sort, sequence or highlight). */
  activity?: Widget;
  /** "Explain it back": the kid explains in their own words; the coach checks for these points. */
  explain?: { prompt: string; keyPoints: string[] };
  check: CheckQuestion[];
  task?: Task;
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
  lessons: Lesson[];
}
