import { getDb } from "./db";
import { AI_LIMITS, FEATURES } from "@/content/features";
import { BLOCKS, DRILL, type Block } from "@/content/schedule";
import { QUESTS, type Quest, type QuestKind, type QuestTheme } from "@/content/quests";
import { TEACHERS, TEACHING_METHOD, type Teacher } from "@/content/teachers";
import { BREAKS, PRESETS, type AttentionAnswer, type FocusProfile } from "./focus";
import { SUBJECTS, type Subject } from "./compliance";
import { STRANDS, type Strand } from "./curriculum/skills";
import { COURSES, type Course } from "@/content/courses";
import { VARIANT_CONTENT, VARIANT_THEMES, type CastPool, type VariantContent } from "@/content/variants";
import { sanitizeCourses, withDefaultMedia } from "./courseContent";
import { isYoutubeId } from "./storyboard";

/**
 * Editable content. The files in src/content/ (and the presets in lib/focus)
 * are the defaults; a parent's edits from the Content page are saved in the
 * settings table as `content:<key>` and take priority. "Reset to defaults"
 * deletes the saved copy.
 */

export type Features = typeof FEATURES;
export type AiLimits = typeof AI_LIMITS;
export type Drill = typeof DRILL;
export type Presets = Record<AttentionAnswer, Omit<FocusProfile, "attention">>;
export type BreakIdea = (typeof BREAKS)[number];

export interface ContentMap {
  features: Features;
  aiLimits: AiLimits;
  schedule: Block[];
  drill: Drill;
  teachers: Record<Strand, Teacher>;
  teachingMethod: string;
  quests: Quest[];
  focusPresets: Presets;
  breaks: BreakIdea[];
  courses: Course[];
  /** Lesson videos a parent chose to hide (YouTube ids). */
  hiddenVideos: string[];
  /** The people, places and props that lesson and game variations draw from. */
  variants: VariantContent;
}

export type ContentKey = keyof ContentMap;

export const DEFAULTS: ContentMap = {
  features: FEATURES,
  aiLimits: AI_LIMITS,
  schedule: BLOCKS,
  drill: DRILL,
  teachers: TEACHERS,
  teachingMethod: TEACHING_METHOD,
  quests: QUESTS,
  focusPresets: PRESETS,
  breaks: BREAKS,
  courses: COURSES,
  hiddenVideos: [],
  variants: VARIANT_CONTENT,
};

export const CONTENT_KEYS = Object.keys(DEFAULTS) as ContentKey[];

const KINDS: QuestKind[] = ["brain", "create", "mission"];
const THEMES: QuestTheme[] = ["money", "business", "leadership", "character", "science", "engineering", "history", "civics", "logic"];

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const int = (v: unknown, lo: number, hi: number, dflt: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
};

/**
 * Cleans up saved content so a bad edit can never break a page: unknown
 * fields are dropped, numbers are clamped, and missing pieces fall back to
 * the defaults.
 */
export function sanitize<K extends ContentKey>(key: K, raw: unknown): ContentMap[K] {
  const d = DEFAULTS[key];
  switch (key) {
    case "features": {
      const src = isObj(raw) ? raw : {};
      return Object.fromEntries(Object.keys(d as Features).map((k) => [k, typeof src[k] === "boolean" ? src[k] : (d as Features)[k as keyof Features]])) as ContentMap[K];
    }
    case "aiLimits": {
      const src = isObj(raw) ? raw : {};
      const a = d as AiLimits;
      return {
        messagesPerKidPerDay: int(src.messagesPerKidPerDay, 0, 1000, a.messagesPerKidPerDay),
        maxMessageChars: int(src.maxMessageChars, 50, 2000, a.maxMessageChars),
        historyTurns: int(src.historyTurns, 1, 50, a.historyTurns),
      } as ContentMap[K];
    }
    case "drill": {
      const src = isObj(raw) ? raw : {};
      return { seconds: int(src.seconds, 15, 300, DRILL.seconds), fluentPerMinute: int(src.fluentPerMinute, 5, 120, DRILL.fluentPerMinute) } as ContentMap[K];
    }
    case "schedule": {
      if (!Array.isArray(raw)) return d;
      const seen = new Set<string>();
      const blocks: Block[] = [];
      for (const b of raw) {
        if (!isObj(b)) continue;
        const id = str(b.id, 40).toLowerCase().replace(/[^a-z0-9-]+/g, "-") || `block-${blocks.length + 1}`;
        if (seen.has(id)) continue;
        seen.add(id);
        blocks.push({
          id,
          label: str(b.label, 40) || "Block",
          icon: str(b.icon, 8) || "📘",
          minutes: int(b.minutes, 5, 120, 25),
          kind: b.kind === "portal" ? "portal" : "guided",
          subject: (SUBJECTS as readonly string[]).includes(str(b.subject)) ? (str(b.subject) as Subject) : "Other",
          hue: int(b.hue, 0, 360, 200),
          ideas: Array.isArray(b.ideas) ? b.ideas.map((i) => str(i, 500)).filter(Boolean).slice(0, 30) : [],
          ...(Array.isArray(b.courses) ? { courses: b.courses.map((c) => str(c, 40)).filter(Boolean).slice(0, 10) } : {}),
        });
      }
      return (blocks.length ? blocks : d) as ContentMap[K];
    }
    case "teachers": {
      const src = isObj(raw) ? raw : {};
      const out = {} as Record<Strand, Teacher>;
      for (const s of STRANDS) {
        const t = isObj(src[s.id]) ? (src[s.id] as Record<string, unknown>) : {};
        const def = TEACHERS[s.id];
        out[s.id] = {
          id: def.id,
          name: str(t.name, 60) || def.name,
          avatar: str(t.avatar, 8) || def.avatar,
          inspiredBy: str(t.inspiredBy, 200) || def.inspiredBy,
          hue: int(t.hue, 0, 360, def.hue),
          voice: str(t.voice, 1000) || def.voice,
          hooks: Array.isArray(t.hooks) ? t.hooks.map((h) => str(h, 200)).filter(Boolean).slice(0, 12) : def.hooks,
          greeting: str(t.greeting, 300) || def.greeting,
        };
        if (!out[s.id].hooks.length) out[s.id].hooks = def.hooks;
      }
      return out as ContentMap[K];
    }
    case "teachingMethod":
      return (str(raw, 5000) || d) as ContentMap[K];
    case "quests": {
      if (!Array.isArray(raw)) return d;
      const seen = new Set<string>();
      const quests: Quest[] = [];
      for (const q of raw) {
        if (!isObj(q)) continue;
        const id = str(q.id, 60);
        if (!id || seen.has(id)) continue;
        seen.add(id);
        const kind = KINDS.includes(q.kind as QuestKind) ? (q.kind as QuestKind) : "create";
        const title = str(q.title, 80);
        const text = str(q.text, 1000);
        if (!title || !text) continue;
        quests.push({
          id,
          kind,
          theme: THEMES.includes(q.theme as QuestTheme) ? (q.theme as QuestTheme) : "logic",
          title,
          text,
          ...(kind === "brain" ? { reveal: str(q.reveal, 1000) || "Talk it through with a parent!" } : {}),
          ...(kind === "mission"
            ? {
                minutes: int(q.minutes, 5, 600, 30),
                subject: (SUBJECTS as readonly string[]).includes(str(q.subject)) ? (str(q.subject) as Subject) : "Other",
              }
            : {}),
          xp: int(q.xp, 1, 500, 20),
        });
      }
      // Every kind needs at least one quest, or pickers would have nothing to choose from.
      for (const k of KINDS) if (!quests.some((q) => q.kind === k)) quests.push(...QUESTS.filter((q) => q.kind === k && !seen.has(q.id)));
      return quests as ContentMap[K];
    }
    case "focusPresets": {
      const src = isObj(raw) ? raw : {};
      const out = {} as Presets;
      for (const a of ["yes", "unsure", "no"] as AttentionAnswer[]) {
        const p = isObj(src[a]) ? (src[a] as Record<string, unknown>) : {};
        const def = PRESETS[a];
        out[a] = {
          sprintMinutes: int(p.sprintMinutes, 5, 45, def.sprintMinutes),
          breakMinutes: int(p.breakMinutes, 1, 15, def.breakMinutes),
          sideQuestEvery: int(p.sideQuestEvery, 3, 20, def.sideQuestEvery),
          dailyCapMinutes: int(p.dailyCapMinutes, 15, 240, def.dailyCapMinutes),
        };
      }
      return out as ContentMap[K];
    }
    case "breaks": {
      if (!Array.isArray(raw)) return d;
      const list = raw
        .filter(isObj)
        .map((b) => ({ icon: str(b.icon, 8) || "🏃", title: str(b.title, 60), text: str(b.text, 300) }))
        .filter((b) => b.title && b.text);
      return (list.length ? list : d) as ContentMap[K];
    }
    case "courses":
    {
      // New default courses (e.g. a new grade band) show up even after a parent has edited the courses.
      const saved = withDefaultMedia(sanitizeCourses(raw, COURSES), COURSES);
      const have = new Set(saved.map((c) => c.id));
      return [...saved, ...COURSES.filter((c) => !have.has(c.id))] as ContentMap[K];
    }
    case "hiddenVideos":
      return (Array.isArray(raw) ? [...new Set(raw.filter((v): v is string => typeof v === "string" && isYoutubeId(v)))].slice(0, 500) : []) as ContentMap[K];
    case "variants": {
      const src = isObj(raw) ? raw : {};
      const def = d as VariantContent;
      // A generator picking from an empty pool would break a lesson, so an
      // emptied list falls back to the default one.
      const pool = (v: unknown, fallback: string[]) => {
        const list = Array.isArray(v) ? [...new Set(v.map((x) => str(x, 60)).filter(Boolean))].slice(0, 200) : [];
        return list.length ? list : fallback;
      };
      const cast = (v: unknown, fallback: CastPool): CastPool => {
        const s = isObj(v) ? v : {};
        return {
          people: pool(s.people, fallback.people),
          creatures: pool(s.creatures, fallback.creatures),
          places: pool(s.places, fallback.places),
          things: pool(s.things, fallback.things),
        };
      };
      // Theme pools only add to the base, so emptying one is allowed. A theme
      // the parent didn't touch keeps its defaults rather than being wiped.
      const extras = (v: unknown, fallback: Partial<CastPool>): Partial<CastPool> => {
        if (!isObj(v)) return fallback;
        const some = (x: unknown) => [...new Set((Array.isArray(x) ? x : []).map((i) => str(i, 60)).filter(Boolean))].slice(0, 200);
        const out: Partial<CastPool> = {};
        for (const k of ["people", "creatures", "places", "things"] as const) if (k in v) out[k] = some(v[k]);
        return out;
      };
      const byThemeSrc = isObj(src.byTheme) ? src.byTheme : {};
      return {
        base: cast(src.base, def.base),
        byTheme: Object.fromEntries(VARIANT_THEMES.map((t) => [t, extras(byThemeSrc[t], def.byTheme[t])])) as VariantContent["byTheme"],
      } as ContentMap[K];
    }
  }
  return d;
}

export function getContent<K extends ContentKey>(key: K): ContentMap[K] {
  try {
    const row = getDb().prepare("SELECT value FROM settings WHERE key = ?").get(`content:${key}`) as { value: string } | undefined;
    return row ? sanitize(key, JSON.parse(row.value)) : DEFAULTS[key];
  } catch {
    return DEFAULTS[key];
  }
}

export function setContent<K extends ContentKey>(key: K, value: unknown): void {
  const clean = sanitize(key, value);
  getDb()
    .prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value")
    .run(`content:${key}`, JSON.stringify(clean));
}

export function resetContent(key: ContentKey): void {
  getDb().prepare("DELETE FROM settings WHERE key = ?").run(`content:${key}`);
}

export function isCustomized(key: ContentKey): boolean {
  return !!getDb().prepare("SELECT 1 FROM settings WHERE key = ?").get(`content:${key}`);
}

// Shorthand accessors used across the app.
export const features = () => getContent("features");
export const aiLimits = () => getContent("aiLimits");
export const scheduleBlocks = () => getContent("schedule");
export const blockById = (id: string) => scheduleBlocks().find((b) => b.id === id);
export const drillSettings = () => getContent("drill");
export const allTeachers = () => getContent("teachers");
export const teacherFor = (strand: Strand) => allTeachers()[strand];
export const teachingMethod = () => getContent("teachingMethod");
export const allQuests = () => getContent("quests");
export const questById = (id: string) => allQuests().find((q) => q.id === id);
export const focusPresets = () => getContent("focusPresets");
export const breakIdeas = () => getContent("breaks");
export const allCourses = () => getContent("courses");
export const courseById = (id: string) => allCourses().find((c) => c.id === id);
export const hiddenVideos = () => new Set(getContent("hiddenVideos"));
