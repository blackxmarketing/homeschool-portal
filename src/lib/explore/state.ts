import { getDb } from "../db";
import { courseOverview, electivesOff } from "../store";
import { gamesForGrade, levelsForKid } from "../minigames";
import { grantUnlocks, miniGameProgress, unlocksOf } from "../gameState";
export { grantUnlocks, unlocksOf };
import { K5_SUBJECTS, K5_SUBJECT_INFO, k5CourseId, type K5Subject } from "@/content/courses/k5/base";
import { buildMap, type ExploreMap } from "./map";
import { worldByKey, type WorldDef } from "./worlds";

/**
 * Where each kid stands in each K-5 world and what they've found
 * (docs/WORLDS.md). Everything a kid claims (a spark, a chest, a finished
 * side quest) is checked here against the world's map and the kid's real
 * lesson progress before any reward is given.
 */

export interface ExploreState {
  x: number | null;
  y: number | null;
  /** Sparks and quest items picked up. */
  found: string[];
  /** Chests opened. */
  opened: string[];
  questDone: boolean;
  seenIntro: boolean;
  seenOutro: boolean;
}

const EMPTY: ExploreState = { x: null, y: null, found: [], opened: [], questDone: false, seenIntro: false, seenOutro: false };

export function exploreState(kidId: number, world: string): ExploreState {
  const row = getDb().prepare("SELECT data FROM explore_state WHERE kid_id = ? AND world = ?").get(kidId, world) as { data: string } | undefined;
  if (!row) return { ...EMPTY, found: [], opened: [] };
  try {
    const d = JSON.parse(row.data) as Partial<ExploreState>;
    return {
      x: Number.isInteger(d.x) ? (d.x as number) : null,
      y: Number.isInteger(d.y) ? (d.y as number) : null,
      found: Array.isArray(d.found) ? d.found.filter((s) => typeof s === "string") : [],
      opened: Array.isArray(d.opened) ? d.opened.filter((s) => typeof s === "string") : [],
      questDone: d.questDone === true,
      seenIntro: d.seenIntro === true,
      seenOutro: d.seenOutro === true,
    };
  } catch {
    return { ...EMPTY, found: [], opened: [] };
  }
}

function saveState(kidId: number, world: string, s: ExploreState) {
  getDb()
    .prepare(
      "INSERT INTO explore_state (kid_id, world, data, updated_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(kid_id, world) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at",
    )
    .run(kidId, world, JSON.stringify(s));
}

function addCoins(kidId: number, n: number) {
  if (n > 0) getDb().prepare("UPDATE kids SET coins = coins + ? WHERE id = ?").run(n, kidId);
}

export interface ZoneView {
  subject: K5Subject;
  name: string;
  lantern: string;
  courseId: string;
  title: string;
  icon: string;
  teacher: string;
  /** Switched off by a parent (electives). */
  off: boolean;
  lessons: { id: string; title: string; status: "done" | "open" | "waiting" | "locked"; minutes: number }[];
  done: number;
  lit: boolean;
  games: { id: string; title: string; icon: string; stars: number; max: number }[];
}

export interface WorldView {
  world: WorldDef;
  zones: ZoneView[];
  map: ExploreMap;
  state: ExploreState;
  /** Lessons finished anywhere in this world. */
  lessonsDone: number;
  lanternsLit: number;
  lanternsTotal: number;
  unlocks: string[];
  /** Rewards just earned by lighting lanterns (shown once). */
  justUnlocked: string[];
}

/** Can this kid visit this world? Their own grade's world and earlier ones. */
export function canVisit(kidGrade: number, world: WorldDef): boolean {
  return kidGrade <= 5 && world.grade <= kidGrade;
}

/** Everything the world page needs, with lantern rewards brought up to date. */
export function worldView(kidId: number, kidGrade: number, key: string): WorldView | null {
  const world = worldByKey(key);
  if (!world || !canVisit(kidGrade, world)) return null;
  const overview = courseOverview(kidId);
  const off = new Set(electivesOff(kidId));
  const games = gamesForGrade(world.grade);
  const zones: ZoneView[] = K5_SUBJECTS.map((subject) => {
    const courseId = k5CourseId(subject, world.grade);
    const o = overview.find((c) => c.course.id === courseId);
    const info = K5_SUBJECT_INFO[subject];
    const lessons = (o?.lessons ?? []).map(({ lesson, status }) => ({ id: lesson.id, title: lesson.title, status: status as ZoneView["lessons"][number]["status"], minutes: lesson.minutes }));
    const done = lessons.filter((l) => l.status === "done").length;
    return {
      subject,
      name: world.zones[subject].name,
      lantern: world.zones[subject].lantern,
      courseId,
      title: o?.course.title ?? info.title,
      icon: info.icon,
      teacher: info.teacher.name,
      off: off.has(subject),
      lessons,
      done,
      lit: lessons.length > 0 && done === lessons.length,
      games: games
        .filter((g) => g.subject === subject)
        .map((g) => {
          const levels = levelsForKid(g, world.grade);
          const prog = miniGameProgress(kidId, g.id);
          return { id: g.id, title: g.title, icon: g.icon, stars: levels.reduce((t, l) => t + (prog[l.id]?.stars ?? 0), 0), max: levels.length * 3 };
        }),
    };
  });
  const active = zones.filter((z) => !z.off && z.lessons.length > 0);
  const lanternsLit = active.filter((z) => z.lit).length;
  const lessonsDone = zones.reduce((t, z) => t + z.done, 0);

  // Lantern rewards are earned by learning, so they're granted here whenever they're due.
  const due: string[] = [];
  if (lanternsLit >= 1) due.push(world.firstLantern);
  if (active.length > 0 && lanternsLit === active.length) due.push(world.allLanterns);
  const justUnlocked = grantUnlocks(kidId, due);

  const map = buildMap(world, Object.fromEntries(zones.map((z) => [z.subject, z.off ? 0 : z.lessons.length])));
  return {
    world,
    zones,
    map,
    state: exploreState(kidId, key),
    lessonsDone,
    lanternsLit,
    lanternsTotal: active.length,
    unlocks: [...unlocksOf(kidId)],
    justUnlocked,
  };
}

export type ExploreAction =
  | { action: "move"; x: number; y: number }
  | { action: "pick"; id: string }
  | { action: "open"; id: string }
  | { action: "quest" }
  | { action: "intro" }
  | { action: "outro" };

export type ExploreResult = { ok: true; state: ExploreState; unlocked: string[]; coins: number; message?: string } | { ok: false; error: string };

const COINS = { spark: 3, item: 5, chest: 15, quest: 25 };

/** Applies one thing the kid did in a world, after checking it's real. */
export function exploreAction(kidId: number, kidGrade: number, key: string, a: ExploreAction): ExploreResult {
  const view = worldView(kidId, kidGrade, key);
  if (!view) return { ok: false, error: "You can't visit that world yet." };
  const { world, map } = view;
  const s = view.state;
  let unlocked: string[] = [];
  let coins = 0;
  let message: string | undefined;

  switch (a.action) {
    case "move": {
      if (!Number.isInteger(a.x) || !Number.isInteger(a.y) || a.x < 0 || a.y < 0 || a.x >= map.w || a.y >= map.h) return { ok: false, error: "Bad spot." };
      s.x = a.x;
      s.y = a.y;
      break;
    }
    case "pick": {
      const o = map.objects.find((x) => (x.kind === "spark" || x.kind === "item") && x.id === a.id);
      if (!o) return { ok: false, error: "Nothing there." };
      if (s.found.includes(o.id)) break;
      s.found.push(o.id);
      if (o.kind === "spark") {
        coins += COINS.spark;
        const sparks = map.objects.filter((x) => x.kind === "spark").length;
        const have = s.found.filter((id) => id.startsWith("spark")).length;
        if (have >= sparks) {
          unlocked = grantUnlocks(kidId, [world.sparkReward]);
          message = `You found all ${sparks} sparks!`;
        }
      } else coins += COINS.item;
      break;
    }
    case "open": {
      const chest = world.chests.find((c) => c.id === a.id);
      if (!chest || !map.objects.some((o) => o.kind === "chest" && o.id === a.id)) return { ok: false, error: "No chest there." };
      if (s.opened.includes(chest.id)) break;
      if (view.lessonsDone < chest.lessons) return { ok: false, error: `This chest opens after you finish ${chest.lessons} lessons in ${world.name}.` };
      s.opened.push(chest.id);
      coins += COINS.chest;
      unlocked = grantUnlocks(kidId, [chest.reward]);
      break;
    }
    case "quest": {
      if (s.questDone) break;
      const items = map.objects.filter((o) => o.kind === "item").map((o) => o.id);
      if (!items.every((id) => s.found.includes(id))) return { ok: false, error: `Find all ${world.quest.count} ${world.quest.item.plural} first.` };
      s.questDone = true;
      coins += COINS.quest;
      unlocked = grantUnlocks(kidId, [world.quest.reward]);
      break;
    }
    case "intro":
      s.seenIntro = true;
      break;
    case "outro":
      if (view.lanternsTotal > 0 && view.lanternsLit === view.lanternsTotal) s.seenOutro = true;
      break;
    default:
      return { ok: false, error: "Unknown action." };
  }
  addCoins(kidId, coins);
  saveState(kidId, key, s);
  return { ok: true, state: s, unlocked, coins, ...(message ? { message } : {}) };
}
