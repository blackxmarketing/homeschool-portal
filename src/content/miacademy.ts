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
}

/** Same four subjects for every kid. Electives get added here later. */
export const MIA_SUBJECTS: MiaSubject[] = [
  { id: "math", name: "Math", color: "#e8505b" },
  { id: "ela", name: "Language Arts", color: "#3b82f6" },
  { id: "sci", name: "Science", color: "#22a06b" },
  { id: "his", name: "History", color: "#f59e0b" },
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

export interface MiaSettings {
  /** Kids can pause a timer (for help or a break). */
  allowPause: boolean;
  /** Length of the one break per subject, 1-5 minutes. */
  breakMinutes: number;
  /** A parent PIN is needed to restart a timer after "I need help". */
  helpPin: boolean;
  /** The kid's animal buddy: walks across the break screen and (later) is their bank. */
  buddy: BuddyId;
}

export const BUDDIES = [
  { id: "panda", name: "Panda" },
  { id: "wolf", name: "Wolf" },
] as const;
export type BuddyId = (typeof BUDDIES)[number]["id"];

export const MIA_DEFAULT_SETTINGS: MiaSettings = { allowPause: true, breakMinutes: 5, helpPin: true, buddy: "panda" };
