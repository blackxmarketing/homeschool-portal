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

export interface Lesson {
  id: string;
  title: string;
  /** Minutes logged for records when the lesson is finished. */
  minutes: number;
  stage: Stage;
  /** Overrides the course subject for records (e.g. "U.S. Constitution"). */
  subject?: Subject;
  read: string;
  /** 2-4 short takeaways shown after the reading. */
  keyIdeas: string[];
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
