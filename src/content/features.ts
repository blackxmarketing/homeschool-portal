/**
 * Feature switches. Turn a whole phase on or off by changing true/false here,
 * then push to GitHub (the server picks it up automatically).
 */
export const FEATURES = {
  /** Phase 1: side quests that pop up during practice. */
  sideQuests: true,
  /** Phase 1: off-screen missions on the kid's home page. */
  missions: true,
  /** Phase 1: Pomodoro sprints and brain breaks. */
  focusSprints: true,
  /** Phase 2: AI teacher characters (chat, mini-lessons, "why was I wrong?"). Needs ANTHROPIC_API_KEY for the AI parts. */
  aiTeachers: true,
  /** Phase 2b: the 2-hour day (block rings, grade towers, goals, fact drills, struggle detector). */
  twoHourDay: true,
  /** Phase 3: courses beyond math (science, history, writing, money, business, leadership). */
  courses: true,
  /** Teachers read lessons out loud (the browser's built-in voice). */
  readAloud: true,
  /** Kids can talk back with the microphone. Speech-to-text is done by the browser maker (Google, Microsoft or Apple); the portal saves only the text. */
  kidMic: true,
  /** Picture slides (real photos from Wikimedia Commons, with credits) that change as the teacher talks. */
  lessonSlides: true,
  /** Short lesson videos (YouTube, loaded only when a kid presses play). */
  lessonVideos: true,
};

/** Limits on AI use, to keep costs predictable. */
export const AI_LIMITS = {
  /** Messages a kid can send to teachers per day (lessons and "why" count too). */
  messagesPerKidPerDay: 80,
  /** Longest message a kid can send. */
  maxMessageChars: 500,
  /** Turns of a chat kept as context for the teacher. */
  historyTurns: 12,
};
