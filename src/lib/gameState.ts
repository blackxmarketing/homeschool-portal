import { getDb } from "./db";
import { cleanHero, DEFAULT_HERO, type Hero } from "./pixel/hero";
import { isUnlockId, onlyOwned } from "./pixel/cosmetics";
import { LANDS, type LandId } from "./pixel/world";
import { awardXp, courseOverview, skillTable, teachProgress } from "./store";
import { STRANDS } from "./curriculum/skills";
import { WORLDS } from "./game";

/**
 * The game layer over learning (see docs/GAME.md): heroes, coins, how lit
 * each land is, and the quests in each land. Quests are real lessons.
 */

export function heroOf(kidId: number): Hero | null {
  const row = getDb().prepare("SELECT hero FROM kids WHERE id = ?").get(kidId) as { hero: string | null } | undefined;
  if (!row?.hero) return null;
  try {
    return cleanHero(JSON.parse(row.hero));
  } catch {
    return null;
  }
}

/** Hero styles a kid has unlocked (docs/WORLDS.md), e.g. "pet:duckling". */
export function unlocksOf(kidId: number): Set<string> {
  const row = getDb().prepare("SELECT unlocks FROM kids WHERE id = ?").get(kidId) as { unlocks: string | null } | undefined;
  try {
    const v = JSON.parse(row?.unlocks ?? "[]");
    return new Set(Array.isArray(v) ? v.filter((x) => typeof x === "string" && isUnlockId(x)) : []);
  } catch {
    return new Set();
  }
}

/** Adds unlocks; returns the ones that are new. */
export function grantUnlocks(kidId: number, ids: string[]): string[] {
  const have = unlocksOf(kidId);
  const fresh = ids.filter((id) => isUnlockId(id) && !have.has(id));
  if (!fresh.length) return [];
  getDb().prepare("UPDATE kids SET unlocks = ? WHERE id = ?").run(JSON.stringify([...have, ...fresh]), kidId);
  return fresh;
}

/** Saves the hero; anything not unlocked yet is swapped back for what they had. */
export function saveHero(kidId: number, hero: unknown): Hero {
  const clean = onlyOwned(cleanHero(hero), unlocksOf(kidId), heroOf(kidId) ?? DEFAULT_HERO);
  getDb().prepare("UPDATE kids SET hero = ? WHERE id = ?").run(JSON.stringify(clean), kidId);
  return clean;
}

export function coinsOf(kidId: number): number {
  return (getDb().prepare("SELECT coins FROM kids WHERE id = ?").get(kidId) as { coins: number } | undefined)?.coins ?? 0;
}

export type QuestStatus = "done" | "open" | "waiting" | "locked";

export interface Quest {
  id: string;
  title: string;
  status: QuestStatus;
  href: string | null;
  /** What to do, in order, with what's done. */
  objectives: { label: string; done: boolean }[];
  /** For the map label, e.g. "Lesson 3" or "Number Forge". */
  kind: string;
  icon: string;
}

function courseQuests(kidId: number, courseIds: string[]): Quest[] {
  const out: Quest[] = [];
  for (const c of courseOverview(kidId).filter((o) => courseIds.includes(o.course.id))) {
    c.lessons.forEach(({ lesson, status }, i) => {
      const parts = lesson.teach ?? [];
      let partsDone = parts.map(() => status === "done");
      if (status !== "done" && status !== "locked" && parts.length) {
        const st = teachProgress(kidId, c.course.id, lesson.id);
        partsDone = st.segments.map((s) => !!s.done);
      }
      const done = status === "done";
      out.push({
        id: `${c.course.id}:${lesson.id}`,
        title: lesson.title,
        status: status === "done" ? "done" : status === "locked" ? "locked" : status === "waiting" ? "waiting" : "open",
        href: status === "locked" ? null : `/kid/learn/${c.course.id}/${lesson.id}`,
        objectives: [
          ...parts.map((p, k) => ({ label: `Learn: ${p.title}`, done: partsDone[k] ?? false })),
          ...(lesson.mastery?.length ? [{ label: "Boss challenge: show what you know", done }] : []),
          ...(lesson.task ? [{ label: "Field mission: " + (lesson.task.kind === "write" ? "write it" : "do it for real"), done }] : []),
        ],
        kind: `${c.course.icon} ${c.course.title} · Lesson ${i + 1}`,
        icon: c.course.icon,
      });
    });
  }
  return out;
}

function mathQuests(kidId: number): Quest[] {
  const skills = skillTable(kidId);
  return STRANDS.map(({ id: strand }) => {
    const list = skills.filter((s) => s.strand === strand);
    const mastered = list.filter((s) => s.status === "mastered").length;
    const next = list.find((s) => s.status === "learning") ?? list.find((s) => s.status === "ready");
    const w = WORLDS[strand];
    const status: QuestStatus = mastered === list.length ? "done" : next ? "open" : "locked";
    return {
      id: `math:${strand}`,
      title: w.name,
      status,
      href: next ? `/kid/practice?skill=${next.id}&mode=new` : null,
      objectives: [
        { label: `Master ${list.length} skills (${mastered} done)`, done: mastered === list.length },
        ...(next ? [{ label: `Next: ${next.title}`, done: false }] : []),
      ],
      kind: `${w.icon} Math world`,
      icon: w.icon,
    };
  });
}

/** Every quest in a land. */
export function landQuests(kidId: number, land: LandId): Quest[] {
  const L = LANDS.find((l) => l.id === land);
  if (!L || land === "village") return [];
  return land === "math" ? mathQuests(kidId) : courseQuests(kidId, L.courses);
}

/** How restored each land is, 0 to 1 (mastered lessons or skills). */
export function worldProgress(kidId: number): Record<LandId, number> {
  const out = { village: 1 } as Record<LandId, number>;
  const overview = courseOverview(kidId);
  for (const L of LANDS) {
    if (L.id === "village") continue;
    if (L.id === "math") {
      const skills = skillTable(kidId);
      out.math = skills.length ? skills.filter((s) => s.status === "mastered").length / skills.length : 0;
      continue;
    }
    const lessons = overview.filter((o) => L.courses.includes(o.course.id)).flatMap((o) => o.lessons);
    out[L.id] = lessons.length ? lessons.filter((l) => l.status === "done").length / lessons.length : 0;
  }
  return out;
}

/** The next quest in each land, for the quest log. */
export function mainQuests(kidId: number): (Quest & { land: LandId; landName: string; hue: number })[] {
  return LANDS.filter((L) => L.id !== "village").flatMap((L) => {
    const q = landQuests(kidId, L.id).find((x) => x.status === "open" || x.status === "waiting");
    return q ? [{ ...q, land: L.id, landName: L.name, hue: L.hue }] : [];
  });
}

// ---------------- Story mini-games ----------------

/** XP per newly earned star (replaying for the same stars earns nothing new). */
const XP_PER_STAR = 10;

export function miniGameProgress(kidId: number, game: string): Record<string, { stars: number; best: number | null; plays: number }> {
  const rows = getDb().prepare("SELECT level, stars, best, plays FROM minigame_progress WHERE kid_id = ? AND game = ?").all(kidId, game) as {
    level: string;
    stars: number;
    best: number | null;
    plays: number;
  }[];
  return Object.fromEntries(rows.map((r) => [r.level, { stars: r.stars, best: r.best, plays: r.plays }]));
}

/** Saves a finished game (already scored on the server). Returns the XP awarded for new stars. */
export function recordMiniGame(kidId: number, game: string, level: string, stars: number, best: number): { stars: number; best: number; xp: number; newBest: boolean } {
  const db = getDb();
  const prev = db.prepare("SELECT stars, best FROM minigame_progress WHERE kid_id = ? AND game = ? AND level = ?").get(kidId, game, level) as
    | { stars: number; best: number | null }
    | undefined;
  const newStars = Math.max(0, stars - (prev?.stars ?? 0));
  const newBest = prev?.best === null || prev?.best === undefined || best > prev.best;
  db.prepare(
    `INSERT INTO minigame_progress (kid_id, game, level, stars, best, plays) VALUES (?, ?, ?, ?, ?, 1)
     ON CONFLICT (kid_id, game, level) DO UPDATE SET stars = MAX(stars, excluded.stars), best = MAX(COALESCE(best, excluded.best), excluded.best), plays = plays + 1, updated_at = datetime('now')`,
  ).run(kidId, game, level, stars, best);
  const xp = newStars * XP_PER_STAR;
  if (xp) awardXp(kidId, xp);
  return { stars: Math.max(stars, prev?.stars ?? 0), best: newBest ? best : (prev?.best ?? best), xp, newBest };
}
