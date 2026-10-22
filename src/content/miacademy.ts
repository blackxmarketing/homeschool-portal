/**
 * Miacademy timers: the strip on the right of a kid's screen while they work
 * in Miacademy (docs/MIACADEMY.md). One 30-minute timer per subject, once a
 * day unless a parent allows another.
 */

export interface MiaSubject {
  id: string;
  name: string;
  /** Colour of the timer's disk. */
  color: string;
  icon: string;
}

/** Same four subjects for every kid. Electives get added here later. */
export const MIA_SUBJECTS: MiaSubject[] = [
  { id: "math", name: "Math", color: "#f2545b", icon: "🔢" },
  { id: "ela", name: "Language Arts", color: "#8b5cf6", icon: "📚" },
  { id: "sci", name: "Science", color: "#16a34a", icon: "🔬" },
  { id: "his", name: "History", color: "#f59e0b", icon: "🏛️" },
];

export const MIA_MINUTES = 30;

/** Time after a break ends before a parent hears the kid hasn't pressed Start. */
export const MIA_LATE_SECONDS = 60;

/** Time a kid has to answer "Are you on task?" before it counts as missed. */
export const MIA_CHECKIN_ANSWER_SECONDS = 60;

/**
 * Miacademy is open (the desktop app tells the page) but no timer is running:
 * remind the kid after this long, then again every MIA_REMIND_EVERY_SECONDS.
 * The third reminder in a row also tells a parent.
 */
export const MIA_REMIND_AFTER_SECONDS = 120;
export const MIA_REMIND_EVERY_SECONDS = 300;

/**
 * What the teacher says. {subject} and {minutes} are filled in. Check-ins come
 * every 5 minutes (5, 10 and 20 minutes in; 15 and 25 are the time-left
 * announcements): a question at 5 and 20, encouragement at 10.
 */
export const MIA_LINES = {
  start: "Let's start {subject}! You have {minutes} minutes.",
  half: "You have 15 minutes left.",
  five: "5 minutes left. Start wrapping up!",
  done: "Time's up! Great job on {subject}.",
  help: "Okay! Your timer is paused. A grown-up is coming to help.",
  helpDone: "All set! Let's keep going with {subject}.",
  breakStart: "Break time! Your {buddy} will walk with you.",
  breakWarn: "30 seconds left! Time to head back to your seat.",
  breakEarly: "Welcome back! Press Start to keep going with {subject}.",
  breakOver: "Break's over! Press Start to get back to {subject}.",
  late: "Time to press Start and get back to {subject}.",
  checkinAsk: ["Are you on task?", "Are you staying focused?", "Quick check: are you still working on {subject}?"],
  checkinCheer: ["Keep it up!", "Stay focused. You've got this!", "Nice work. Keep going!", "You're doing great. Stay with it!"],
  checkinThanks: ["Awesome! Keep going.", "Great! You've got this.", "Nice! Back to it."],
  remind: "Don't forget your timer! Pick the subject you're working on and press Start.",
};

/** Miacademy's subject names (from its course data) -> our timer subjects. */
export const MIA_SUBJECT_MAP: Record<string, string> = {
  Math: "math",
  LanguageArts: "ela",
  Science: "sci",
  GeographyAndHistory: "his",
  SocialStudies: "his",
};

/** Lines in a lesson PDF's checklist the kids always skip: re-watching, and anything optional or bonus. */
export const MIA_SKIP_ITEMS = [/\boptional\b/i, /\bbonus\b/i, /\brewatch\b/i];

/**
 * What a lesson's checklist includes. Guided notes are always done (no photo
 * check); "worksheets" are the PDF activities, checked from a photo against the
 * answer key; "practice" is Miacademy's online practice levels.
 * - Normally: the PDF activities (hands-on ones too); online practice only when the
 *   parent marked it in Miacademy (practiceIfMarked: known from the parent's calendar).
 * - Math: no online practice on regular lessons, even if marked; "Wrap Up" lessons
 *   use the online practice instead of the PDF packet.
 * - U.S. Geography: every online practice level; the packet only for the guided notes.
 * - Other History (e.g. Ancient World History): the packet instead of online practice, even if marked.
 */
export function miaLessonRules(
  subject: string,
  lessonTitle: string,
  courseTitle = "",
): { practice: boolean; worksheets: boolean; practiceIfMarked: boolean } {
  if (/geograph/i.test(courseTitle)) return { practice: true, worksheets: false, practiceIfMarked: true };
  if (subject === "math")
    return /wrap[\s-]*up/i.test(lessonTitle)
      ? { practice: true, worksheets: false, practiceIfMarked: true }
      : { practice: false, worksheets: true, practiceIfMarked: false };
  if (subject === "his") return { practice: false, worksheets: true, practiceIfMarked: false };
  return { practice: false, worksheets: true, practiceIfMarked: true };
}

/**
 * Subjects made of more than one Miacademy class share their 30-minute timer:
 * the first 15 minutes go to that day's "first" class (while it still has work
 * this week), then the "main" class. Matched by Miacademy course title.
 */
export interface MiaCoursePlan {
  /** Matches the Miacademy course title. */
  match: RegExp;
  /** Short name on the strip. */
  name: string;
  lessonsPerWeek: number;
  /** "first": the first 15 minutes on its days. "main": the rest of the time (and all of it once the first class is done). */
  slot: "first" | "main";
  /** Days it's the first class (1 = Monday ... 4 = Thursday). Not finished? It carries over to the next day, before the next class. */
  days: number[];
  /** No more lessons that week once its lessons are done (otherwise they keep going, ahead into next week). */
  stopWhenDone: boolean;
  /** No PDF packet: the checklist is Miacademy's tasks, each one as she reaches it. */
  onlineOnly: boolean;
  /** For online-only classes whose PDF is something to read (a story): the item's label, checked off with a tap. Otherwise PDFs are left off. */
  readPdf?: string;
  /** The lesson right before each unit assessment gets 4 school days and counts as a whole week's lessons. */
  bigLessonBeforeUnitTest?: boolean;
}

export const MIA_COURSE_PLANS: Record<string, MiaCoursePlan[]> = {
  ela: [
    {
      match: /^Reading Comprehension/i,
      name: "Reading Comprehension",
      lessonsPerWeek: 1,
      slot: "first",
      days: [1],
      stopWhenDone: true,
      onlineOnly: true,
      readPdf: "Read the story",
    },
    { match: /\(Edition 1\)/i, name: "Writing (Edition 1)", lessonsPerWeek: 1, slot: "first", days: [2, 3, 4], stopWhenDone: true, onlineOnly: true },
    {
      match: /^Language Arts: Level [A-Z] \(Revised/i,
      name: "Language Arts",
      lessonsPerWeek: 2,
      slot: "main",
      days: [1, 2, 3, 4],
      stopWhenDone: false,
      onlineOnly: false,
      bigLessonBeforeUnitTest: true,
    },
  ],
};

export function miaCoursePlan(subject: string, courseTitle: string): MiaCoursePlan | null {
  return MIA_COURSE_PLANS[subject]?.find((p) => p.match.test(courseTitle)) ?? null;
}

export interface MiaSettings {
  /** Kids can pause a timer (for help or a break). */
  allowPause: boolean;
  /** Length of the one break per subject, 1-5 minutes. */
  breakMinutes: number;
  /** A parent PIN is needed to restart a timer after "I need help". */
  helpPin: boolean;
  /** The kid's animal buddy: walks across the break screen and (later) is their bank. */
  buddy: BuddyId;
  /** Lessons a week per subject for the step-by-step checklist. 0 = no checklist for that subject yet. */
  lessonsPerWeek: Record<string, number>;
}

export const BUDDIES = [
  { id: "panda", name: "Panda" },
  { id: "wolf", name: "Wolf" },
] as const;
export type BuddyId = (typeof BUDDIES)[number]["id"];

export const MIA_DEFAULT_SETTINGS: MiaSettings = {
  allowPause: true,
  breakMinutes: 5,
  helpPin: true,
  buddy: "panda",
  lessonsPerWeek: { math: 0, ela: 0, sci: 0, his: 0 },
};

/**
 * The six weekly rings at the top of the timer strip, one per class. Language
 * Arts' three classes each get their own: Reading = Reading Comprehension,
 * Writing = Level E (Revised), Grammar = Edition 1 (by the class plan's name).
 */
export const MIA_RINGS: { id: string; name: string; icon: string; color: string; subject: string; className?: string }[] = [
  { id: "math", name: "Math", icon: "🔢", color: "#f2545b", subject: "math" },
  { id: "sci", name: "Science", icon: "🔬", color: "#16a34a", subject: "sci" },
  { id: "his", name: "History", icon: "🏛️", color: "#f59e0b", subject: "his" },
  { id: "reading", name: "Reading", icon: "📖", color: "#8b5cf6", subject: "ela", className: "Reading Comprehension" },
  { id: "writing", name: "Writing", icon: "✍️", color: "#0ea5e9", subject: "ela", className: "Language Arts" },
  { id: "grammar", name: "Grammar", icon: "🔤", color: "#ec4899", subject: "ela", className: "Writing (Edition 1)" },
];

/** What a full ring pays into the buddy bank, in cents: on time (Monday-Thursday), or after (extra time). */
export const MIA_PAY = { onTime: 25, extraTime: 15 };
