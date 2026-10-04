import type { Strand } from "./curriculum/skills";

/**
 * Game layer: levels from XP, ranks, themed worlds for each math strand,
 * and badges. All pure functions so they're easy to test.
 */

/** XP needed to reach `level` (level 1 starts at 0). Each level takes 50 XP more than the last. */
export function xpForLevel(level: number): number {
  return 25 * (level - 1) * (level + 2);
}

export function levelInfo(xp: number) {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  const floor = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return { level, rank: rankFor(level), into: xp - floor, needed: next - floor, pct: Math.round(((xp - floor) / (next - floor)) * 100) };
}

export const RANKS = [
  { from: 1, title: "Apprentice", icon: "🔰" },
  { from: 3, title: "Explorer", icon: "🧭" },
  { from: 6, title: "Builder", icon: "🛠️" },
  { from: 10, title: "Strategist", icon: "♟️" },
  { from: 15, title: "Innovator", icon: "💡" },
  { from: 21, title: "Captain", icon: "⚓" },
  { from: 28, title: "Founder", icon: "🚀" },
  { from: 36, title: "Visionary", icon: "🔭" },
  { from: 45, title: "Leader", icon: "👑" },
  { from: 60, title: "Legend", icon: "🏆" },
];

export function rankFor(level: number) {
  return [...RANKS].reverse().find((r) => level >= r.from)!;
}

/** Each math strand is a world on the quest map. */
export const WORLDS: Record<Strand, { name: string; icon: string; blurb: string; hue: number }> = {
  "whole-numbers": { name: "Number Forge", icon: "⚒️", blurb: "Forge speed and power with whole numbers.", hue: 18 },
  fractions: { name: "Fraction Falls", icon: "🌊", blurb: "Split, share and combine parts of a whole.", hue: 195 },
  decimals: { name: "Decimal Docks", icon: "⚓", blurb: "Precision trading at the harbor.", hue: 210 },
  ratios: { name: "Ratio Market", icon: "🏪", blurb: "Prices, deals, rates and percents. Where business happens.", hue: 140 },
  algebra: { name: "Algebra Arena", icon: "⚔️", blurb: "Crack the unknown. Balance every equation.", hue: 270 },
  geometry: { name: "Geometry Peaks", icon: "🏔️", blurb: "Measure, build and design in space.", hue: 30 },
  data: { name: "Data Lab", icon: "📊", blurb: "Find patterns and predict what comes next.", hue: 330 },
};

export interface BadgeStats {
  mastered: number;
  streak: number;
  reviewsPassed: number;
  questsDone: number;
  missionsApproved: number;
  sprintsDone: number;
  level: number;
  worldsComplete: number;
}

export interface Badge {
  id: string;
  icon: string;
  title: string;
  how: string;
  earned: boolean;
}

const BADGES: { id: string; icon: string; title: string; how: string; test: (s: BadgeStats) => boolean }[] = [
  { id: "first-mastery", icon: "⭐", title: "First Mastery", how: "Master your first skill", test: (s) => s.mastered >= 1 },
  { id: "ten-skills", icon: "🌟", title: "Skill Collector", how: "Master 10 skills", test: (s) => s.mastered >= 10 },
  { id: "thirty-skills", icon: "💫", title: "Skill Hoarder", how: "Master 30 skills", test: (s) => s.mastered >= 30 },
  { id: "streak-3", icon: "🔥", title: "On Fire", how: "3-day streak", test: (s) => s.streak >= 3 },
  { id: "streak-10", icon: "☄️", title: "Unstoppable", how: "10-day streak", test: (s) => s.streak >= 10 },
  { id: "review-5", icon: "🔁", title: "Locked In", how: "Pass 5 reviews", test: (s) => s.reviewsPassed >= 5 },
  { id: "quest-5", icon: "🗝️", title: "Side Questor", how: "Finish 5 side quests", test: (s) => s.questsDone >= 5 },
  { id: "mission-3", icon: "🌍", title: "Real-World Hero", how: "Get 3 missions approved", test: (s) => s.missionsApproved >= 3 },
  { id: "mission-10", icon: "🏅", title: "Field Commander", how: "Get 10 missions approved", test: (s) => s.missionsApproved >= 10 },
  { id: "sprint-10", icon: "⏱️", title: "Sprinter", how: "Finish 10 focus sprints", test: (s) => s.sprintsDone >= 10 },
  { id: "level-10", icon: "♟️", title: "Strategist", how: "Reach level 10", test: (s) => s.level >= 10 },
  { id: "world-1", icon: "🗺️", title: "World Conqueror", how: "Master every skill in one world", test: (s) => s.worldsComplete >= 1 },
];

export function badges(stats: BadgeStats): Badge[] {
  return BADGES.map(({ test, ...b }) => ({ ...b, earned: test(stats) }));
}

/** Short cheers for correct answers. Varied so they don't get stale. */
export const CHEERS = ["Nailed it!", "Boom!", "Sharp thinking!", "Exactly right!", "Crushed it!", "Clean solve!", "That's how it's done!", "Smart move!"];
export const ENCOURAGE = [
  "Mistakes are how your brain grows. Read the steps below.",
  "Close! Study the solution, then try the next one.",
  "Every expert missed this once. Look at how it works.",
];
