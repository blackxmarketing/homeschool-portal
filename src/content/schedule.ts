import type { Subject } from "@/lib/compliance";

/**
 * The 2-hour academic day: four 25-minute focus blocks plus a 20-minute math
 * booster, with breaks between. Edit freely: change minutes, rename blocks,
 * or swap in new activity ideas.
 *
 * "portal" blocks are done inside the portal and timed automatically.
 * "guided" blocks are done off-screen (books, notebooks, experiments) with a
 * timer in the portal; the kid marks them done and a parent approves, which
 * logs the minutes for Colorado records. As new subjects move into the
 * portal (Phase 3), switch their block to "portal".
 */

export interface Block {
  id: string;
  label: string;
  icon: string;
  minutes: number;
  kind: "portal" | "guided";
  /** Subject the minutes are logged under for records. */
  subject: Subject;
  hue: number;
  /** Ideas for guided blocks. One is suggested each day. */
  ideas: string[];
  /** Course ids whose finished lessons count toward this block (Phase 3). */
  courses?: string[];
}

export const BLOCKS: Block[] = [
  {
    id: "math",
    label: "Math",
    icon: "⚔️",
    minutes: 25,
    kind: "portal",
    subject: "Math",
    hue: 270,
    ideas: [],
  },
  {
    id: "reading",
    label: "Reading",
    icon: "📚",
    minutes: 25,
    kind: "guided",
    subject: "Reading",
    hue: 30,
    ideas: [
      "Read a chapter of your current book. Afterward, tell a parent the most important thing that happened and why.",
      "Read a biography chapter about an inventor, explorer or entrepreneur. Write down one decision they made that you'd copy.",
      "Read a classic short story or myth. Write 3 questions you'd ask the main character.",
      "Read a news article for kids about science or business. Summarize it in 3 sentences.",
    ],
  },
  {
    id: "science-social",
    label: "Science & History",
    icon: "🔬",
    minutes: 25,
    kind: "guided",
    subject: "Science",
    hue: 150,
    courses: ["science", "history"],
    ideas: [
      "Do a kitchen experiment: write a prediction first, then test it and record what happened.",
      "Pick an invention (the printing press, the steam engine, the light bulb). Find out who made it, what problem it solved, and how it changed the world.",
      "Study a map of the original 13 colonies or your state. Draw it and label 5 places from memory.",
      "Watch a short documentary clip on space, the human body or engineering. Write the 3 most surprising facts.",
    ],
  },
  {
    id: "language-writing",
    label: "Writing & Language",
    icon: "✍️",
    minutes: 25,
    kind: "guided",
    subject: "Writing",
    hue: 200,
    courses: ["writing"],
    ideas: [
      "Write a one-page persuasive letter: convince a parent to try your business idea. Give 3 reasons.",
      "Journal: describe a hard thing you did this week and what you learned from it.",
      "Copy a great paragraph from a book by hand, then write your own paragraph in the same style.",
      "Write a short speech (1 minute) on why honesty matters for leaders. Practice saying it out loud.",
    ],
  },
  {
    id: "math-booster",
    label: "Math Booster",
    icon: "⚡",
    minutes: 20,
    kind: "portal",
    subject: "Math",
    hue: 50,
    ideas: [],
  },
];

export const BLOCK_BY_ID = new Map(BLOCKS.map((b) => [b.id, b]));

/** Minutes of portal math that fill the math blocks (math first, then the booster). */
export const PORTAL_MATH_MINUTES = BLOCKS.filter((b) => b.kind === "portal").reduce((t, b) => t + b.minutes, 0);

/** Today's suggested idea for a guided block (changes daily, same all day). */
export function ideaFor(block: Block, day: string): string {
  if (!block.ideas.length) return "";
  const n = [...day].reduce((h, c) => h + c.charCodeAt(0), 0);
  return block.ideas[n % block.ideas.length];
}

/** Fact fluency targets for the speed drill. */
export const DRILL = {
  /** Length of one drill, in seconds. */
  seconds: 60,
  /** Correct answers per minute that count as "fluent" (fast enough for advanced work). */
  fluentPerMinute: 30,
};
