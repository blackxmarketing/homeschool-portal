import type { Beat, CheckQuestion, Course, Lesson, Probe, Scene, Segment, Stage, TaskKind, Term, ThinkQuestion, Video, Widget } from "@/content/courses/types";
import { isYoutubeId } from "./storyboard";
import { SUBJECTS, type Subject } from "./compliance";
import { hasScene } from "./pixel/lessonArt";

/**
 * Validation and plain-text formats for course content, so parents can edit
 * lessons in simple text boxes and a bad edit can never break a page.
 */

const STAGES: Stage[] = ["grammar", "logic", "rhetoric"];
const TASK_KINDS: TaskKind[] = ["write", "project", "lab", "speak"];

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const str = (v: unknown, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const int = (v: unknown, lo: number, hi: number, dflt: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
};
const subj = (v: unknown, dflt: Subject): Subject => ((SUBJECTS as readonly string[]).includes(str(v)) ? (str(v) as Subject) : dflt);
const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const strList = (v: unknown, max: number, len = 300) => (Array.isArray(v) ? v.map((x) => str(x, len)).filter(Boolean).slice(0, max) : []);

function sanitizeQuestion(raw: unknown): CheckQuestion | null {
  if (!isObj(raw)) return null;
  const q = str(raw.q, 500);
  const choices = strList(raw.choices, 6, 200);
  if (!q || choices.length < 2) return null;
  return { q, choices, answer: int(raw.answer, 0, choices.length - 1, 0), why: str(raw.why, 500) };
}

function sanitizeLesson(raw: unknown, courseSubject: Subject, seen: Set<string>): Lesson | null {
  if (!isObj(raw)) return null;
  const title = str(raw.title, 100);
  const read = str(raw.read, 8000);
  if (!title || !read) return null;
  let id = slug(str(raw.id, 60) || title);
  while (seen.has(id)) id = `${id}-2`;
  seen.add(id);
  const t = isObj(raw.task) ? raw.task : null;
  const prompt = t ? str(t.prompt, 2000) : "";
  const subject = raw.subject ? subj(raw.subject, courseSubject) : undefined;
  return {
    id,
    title,
    minutes: int(raw.minutes, 5, 120, 25),
    stage: STAGES.includes(raw.stage as Stage) ? (raw.stage as Stage) : "grammar",
    ...(subject ? { subject } : {}),
    read,
    keyIdeas: strList(raw.keyIdeas, 6),
    check: (Array.isArray(raw.check) ? raw.check : []).map(sanitizeQuestion).filter((q): q is CheckQuestion => !!q).slice(0, 10),
    ...(t && prompt
      ? { task: { kind: TASK_KINDS.includes(t.kind as TaskKind) ? (t.kind as TaskKind) : "write", prompt, rubric: strList(t.rubric, 8) } }
      : {}),
    ...sanitizeTeaching(raw),
    ...(Array.isArray(raw.standards) ? { standards: strList(raw.standards, 20, 40) } : {}),
  };
}

/**
 * New slides and videos from the defaults are added to a parent's saved
 * courses wherever the teacher's words are unchanged (and the parent hasn't
 * set that part's slides themselves).
 */
export function withDefaultMedia(courses: Course[], defaults: Course[]): Course[] {
  return courses.map((c) => {
    const dc = defaults.find((d) => d.id === c.id);
    if (!dc) return c;
    return {
      ...c,
      lessons: c.lessons.map((l) => {
        const dl = dc.lessons.find((d) => d.id === l.id);
        if (!dl) return l;
        const hook =
          l.hook && dl.hook && l.hook.text === dl.hook.text
            ? { ...l.hook, ...(l.hook.show === undefined && dl.hook.show ? { show: dl.hook.show } : {}), ...(!l.hook.watch && dl.hook.watch ? { watch: dl.hook.watch } : {}) }
            : l.hook;
        const teach = l.teach?.map((s, i) => {
          const ds = dl.teach?.[i];
          if (!ds) return s;
          const base =
            ds.teach !== s.teach
              ? s
              : { ...s, ...(s.show === undefined && ds.show ? { show: ds.show } : {}), ...(!s.watch && ds.watch ? { watch: ds.watch } : {}) };
          // Same per scene: a scene the parent reworded keeps their slides.
          const present = s.present?.map((sc, j) => {
            const dsc = ds.present?.[j];
            if (!dsc || dsc.say !== sc.say) return sc;
            return { ...sc, ...(sc.show === undefined && dsc.show ? { show: dsc.show } : {}), ...(!sc.watch && dsc.watch ? { watch: dsc.watch } : {}) };
          });
          return present ? { ...base, present } : base;
        });
        return { ...l, ...(hook ? { hook } : {}), ...(teach ? { teach } : {}) };
      }),
    };
  });
}

export function sanitizeCourses(raw: unknown, defaults: Course[]): Course[] {
  if (!Array.isArray(raw)) return defaults;
  const ids = new Set<string>();
  const out: Course[] = [];
  for (const c of raw) {
    if (!isObj(c)) continue;
    const title = str(c.title, 80);
    if (!title) continue;
    let id = slug(str(c.id, 40) || title);
    while (ids.has(id)) id = `${id}-2`;
    ids.add(id);
    const subject = subj(c.subject, "Other");
    const teacher = isObj(c.teacher) ? c.teacher : {};
    const seen = new Set<string>();
    out.push({
      id,
      title,
      icon: str(c.icon, 8) || "📘",
      hue: int(c.hue, 0, 360, 200),
      track: c.track === "life" ? "life" : "academic",
      subject,
      blurb: str(c.blurb, 300),
      ...(c.band === "sprout" || c.band === "strategist" ? { band: c.band } : {}),
      ...(Number.isInteger(c.grade) && (c.grade as number) >= 0 && (c.grade as number) <= 12 ? { grade: c.grade as number } : {}),
      ...(c.elective === true ? { elective: true } : {}),
      teacher: {
        name: str(teacher.name, 60) || "Your teacher",
        avatar: str(teacher.avatar, 8) || "🎓",
        inspiredBy: str(teacher.inspiredBy, 200),
        voice: str(teacher.voice, 1000) || "Warm, encouraging and clear.",
      },
      lessons: (Array.isArray(c.lessons) ? c.lessons : []).map((l) => sanitizeLesson(l, subject, seen)).filter((l): l is Lesson => !!l),
    });
  }
  return out.length ? out : defaults;
}

/**
 * Quiz questions as plain text, one block per question:
 *   Q: What is 2 + 2?
 *   - 3
 *   * 4            <- the star marks the right answer
 *   - 5
 *   Why: Two plus two is four.
 */
export function formatQuestions(qs: CheckQuestion[]): string {
  return qs
    .map((q) => [`Q: ${q.q}`, ...q.choices.map((c, i) => `${i === q.answer ? "*" : "-"} ${c}`), q.why ? `Why: ${q.why}` : ""].filter(Boolean).join("\n"))
    .join("\n\n");
}

export function parseQuestions(text: string): CheckQuestion[] {
  const out: CheckQuestion[] = [];
  for (const block of text.split(/\n\s*\n/)) {
    const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const q = lines.find((l) => /^q:/i.test(l))?.replace(/^q:\s*/i, "");
    const choiceLines = lines.filter((l) => /^[-*]\s+/.test(l));
    const why = lines.find((l) => /^why:/i.test(l))?.replace(/^why:\s*/i, "") ?? "";
    if (!q || choiceLines.length < 2) continue;
    const answer = Math.max(0, choiceLines.findIndex((l) => l.startsWith("*")));
    out.push({ q, choices: choiceLines.map((l) => l.replace(/^[-*]\s+/, "")), answer, why });
  }
  return out;
}

// ---------------- Teaching model validation ----------------

function sanitizeThink(raw: unknown): ThinkQuestion | null {
  const q = sanitizeQuestion(raw);
  if (!q || !isObj(raw)) return null;
  const hints = Array.isArray(raw.hints) ? raw.hints.map((h) => str(h, 600)) : [];
  return { ...q, hints: q.choices.map((_, i) => hints[i] ?? "") };
}

const nums = (v: unknown, n: number, lo: number, hi: number) => int(v, lo, hi, n);

export function sanitizeWidget(raw: unknown): Widget | null {
  if (!isObj(raw)) return null;
  switch (raw.type) {
    case "sort": {
      const buckets = strList(raw.buckets, 6, 80);
      const items = (Array.isArray(raw.items) ? raw.items : [])
        .filter(isObj)
        .map((it) => ({ text: str(it.text, 200), bucket: int(it.bucket, 0, Math.max(0, buckets.length - 1), 0) }))
        .filter((it) => it.text)
        .slice(0, 16);
      return buckets.length >= 2 && items.length >= 2 ? { type: "sort", prompt: str(raw.prompt, 300), buckets, items } : null;
    }
    case "sequence": {
      const steps = strList(raw.steps, 12, 300);
      return steps.length >= 2 ? { type: "sequence", prompt: str(raw.prompt, 300), steps } : null;
    }
    case "highlight": {
      const sentences = strList(raw.sentences, 12, 400);
      const correct = (Array.isArray(raw.correct) ? raw.correct : []).map(Number).filter((i) => Number.isInteger(i) && i >= 0 && i < sentences.length);
      return sentences.length >= 2 && correct.length ? { type: "highlight", prompt: str(raw.prompt, 300), sentences, correct: [...new Set(correct)] } : null;
    }
    case "flip": {
      const cards = (Array.isArray(raw.cards) ? raw.cards : []).filter(isObj).map((c) => ({ front: str(c.front, 200), back: str(c.back, 400) })).filter((c) => c.front && c.back).slice(0, 12);
      return cards.length ? { type: "flip", cards } : null;
    }
    case "timeline": {
      const events = (Array.isArray(raw.events) ? raw.events : [])
        .filter(isObj)
        .map((e) => ({ year: int(e.year, -5000, 3000, 0), label: str(e.label, 120), detail: str(e.detail, 500) }))
        .filter((e) => e.label)
        .slice(0, 16);
      return events.length ? { type: "timeline", events } : null;
    }
    case "hotspots": {
      const spots = (Array.isArray(raw.spots) ? raw.spots : []).filter(isObj).map((s) => ({ label: str(s.label, 60), icon: str(s.icon, 8) || "•", detail: str(s.detail, 500) })).filter((s) => s.label).slice(0, 8);
      return spots.length ? { type: "hotspots", title: str(raw.title, 120), center: str(raw.center, 60), spots } : null;
    }
    case "compare": {
      const side = (v: unknown) => (isObj(v) ? { title: str(v.title, 80), points: strList(v.points, 8) } : { title: "", points: [] });
      return { type: "compare", left: side(raw.left), right: side(raw.right) };
    }
    case "compound":
      return { type: "compound", principal: nums(raw.principal, 1000, 1, 1_000_000), rate: nums(raw.rate, 5, 1, 30), years: nums(raw.years, 10, 1, 60) };
    case "budget": {
      const categories = (Array.isArray(raw.categories) ? raw.categories : []).filter(isObj).map((c) => ({ label: str(c.label, 40), pct: int(c.pct, 0, 100, 0) })).filter((c) => c.label).slice(0, 5);
      return categories.length ? { type: "budget", income: nums(raw.income, 100, 1, 1_000_000), categories } : null;
    }
    case "profit": {
      const n = (v: unknown, d: number) => (Number.isFinite(Number(v)) ? Math.max(0, Math.min(100_000, Number(v))) : d);
      return { type: "profit", price: n(raw.price, 5), cost: n(raw.cost, 2), fixed: n(raw.fixed, 20), units: Math.round(n(raw.units, 20)) };
    }
    case "lever":
    case "seasons":
    case "ramp":
      return { type: raw.type };
    case "bounce": {
      const e = Number(raw.efficiency);
      return { type: "bounce", efficiency: Number.isFinite(e) ? Math.min(0.95, Math.max(0.3, e)) : 0.7 };
    }
  }
  return null;
}

/** Slides: each needs a caption and a photo, emoji or big word. An empty list means "no slides here". */
export function sanitizeShow(raw: unknown): Beat[] | null {
  if (!Array.isArray(raw)) return null;
  const beats = raw
    .map((b): Beat | null => {
      if (!isObj(b)) return null;
      const caption = str(b.caption, 140);
      const photo = str(b.photo, 200);
      const emoji = str(b.emoji, 40);
      const big = str(b.big, 60);
      // Only a scene that actually exists in the art; a typo falls back to the
      // other kinds rather than leaving a blank board.
      const art = hasScene(str(b.art, 60)) ? str(b.art, 60) : "";
      if (!caption || !(art || photo || emoji || big)) return null;
      const at = str(b.at, 120);
      const words = (Array.isArray(b.words) ? b.words : [])
        .filter(isObj)
        .map((w) => ({
          text: str(w.text, 40),
          ...(str(w.at) ? { at: str(w.at, 120) } : {}),
          ...(Number.isFinite(Number(w.x)) ? { x: int(w.x, 0, 100, 50) } : {}),
          ...(Number.isFinite(Number(w.y)) ? { y: int(w.y, 0, 100, 78) } : {}),
        }))
        .filter((w) => w.text)
        .slice(0, 5);
      return {
        ...(at ? { at } : {}),
        caption,
        ...(words.length ? { words } : {}),
        ...(art ? { art } : photo ? { photo } : emoji ? { emoji } : { big }),
      };
    })
    .filter((b): b is Beat => !!b)
    .slice(0, 8);
  return beats;
}

/** A YouTube id from an id or any YouTube link a parent pastes. */
export function youtubeId(v: string): string | null {
  const t = v.trim();
  if (isYoutubeId(t)) return t;
  const m = t.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function sanitizeVideo(raw: unknown): Video | null {
  if (!isObj(raw)) return null;
  const youtube = youtubeId(str(raw.youtube, 200));
  if (!youtube) return null;
  const start = Number(raw.start);
  const end = Number(raw.end);
  const hasStart = Number.isFinite(start) && start > 0;
  return {
    youtube,
    title: str(raw.title, 160) || "Watch this",
    channel: str(raw.channel, 80),
    ...(hasStart ? { start: Math.round(start) } : {}),
    ...(Number.isFinite(end) && end > (hasStart ? start : 0) ? { end: Math.round(end) } : {}),
  };
}

function sanitizeTerms(raw: unknown): Term[] {
  return (Array.isArray(raw) ? raw : [])
    .filter(isObj)
    .map((t) => ({ word: str(t.word, 40), meaning: str(t.meaning, 200) }))
    .filter((t) => t.word && t.meaning)
    .slice(0, 6);
}

/**
 * One scene of a presented part. Broken pieces are dropped but the scene
 * survives as long as it has a heading and something to say, so a bad edit
 * can never leave a kid staring at a blank board.
 */
export function sanitizeScene(raw: unknown): Scene | null {
  if (!isObj(raw)) return null;
  const heading = str(raw.heading, 90);
  const say = str(raw.say, 1500);
  if (!heading || !say) return null;
  const show = sanitizeShow(raw.show);
  const watch = sanitizeVideo(raw.watch);
  const visual = raw.visual ? sanitizeWidget(raw.visual) : null;
  const check = raw.check ? sanitizeProbe(raw.check) : null;
  const terms = sanitizeTerms(raw.terms);
  return {
    heading,
    say,
    ...(show ? { show: show.slice(0, 4) } : {}),
    ...(watch ? { watch } : {}),
    ...(visual ? { visual } : {}),
    ...(check ? { check } : {}),
    ...(terms.length ? { terms } : {}),
  };
}

function sanitizeSegment(raw: unknown): Segment | null {
  if (!isObj(raw)) return null;
  const title = str(raw.title, 120);
  const teach = str(raw.teach, 3000);
  const think = sanitizeThink(raw.think);
  const ap = isObj(raw.approaches) ? raw.approaches : {};
  const simpler = sanitizeThink(ap.simpler);
  if (!title || !teach || !think || !simpler) return null;
  const visual = raw.visual ? sanitizeWidget(raw.visual) : null;
  const probe = raw.probe ? sanitizeProbe(raw.probe) : null;
  const show = sanitizeShow(raw.show);
  const watch = sanitizeVideo(raw.watch);
  // No usable scenes means the field goes away entirely, and the part is read
  // out from its summary as before.
  const present = (Array.isArray(raw.present) ? raw.present : []).map(sanitizeScene).filter((s): s is Scene => !!s).slice(0, 6);
  return {
    title,
    teach,
    ...(present.length ? { present } : {}),
    ...(show ? { show } : {}),
    ...(watch ? { watch } : {}),
    ...(visual ? { visual } : {}),
    ...(probe ? { probe } : {}),
    think,
    approaches: { analogy: str(ap.analogy, 2000) || teach, example: str(ap.example, 2000) || teach, simpler },
  };
}

/** The interactive parts of a lesson; anything invalid is dropped rather than breaking the lesson. */
export function sanitizeTeaching(raw: Record<string, unknown>): Pick<Lesson, "hook" | "teach" | "activity" | "explain" | "mastery" | "objectives"> {
  const out: Pick<Lesson, "hook" | "teach" | "activity" | "explain" | "mastery" | "objectives"> = {};
  // Objectives live in this group on purpose: it is what saveLessonAction spreads
  // over a lesson it rebuilds from the form, so anything outside it is wiped on
  // the next parent save.
  const objectives = strList(raw.objectives, 4, 120);
  if (objectives.length) out.objectives = objectives;
  if (isObj(raw.hook) && str(raw.hook.text)) {
    const visual = raw.hook.visual ? sanitizeWidget(raw.hook.visual) : null;
    const show = sanitizeShow(raw.hook.show);
    const watch = sanitizeVideo(raw.hook.watch);
    out.hook = { text: str(raw.hook.text, 1000), ...(visual ? { visual } : {}), ...(show ? { show } : {}), ...(watch ? { watch } : {}) };
  }
  const teach = (Array.isArray(raw.teach) ? raw.teach : []).map(sanitizeSegment).filter((s): s is Segment => !!s).slice(0, 8);
  if (teach.length) out.teach = teach;
  const activity = raw.activity ? sanitizeWidget(raw.activity) : null;
  if (activity && (activity.type === "sort" || activity.type === "sequence" || activity.type === "highlight")) out.activity = activity;
  if (isObj(raw.explain) && str(raw.explain.prompt)) {
    out.explain = { prompt: str(raw.explain.prompt, 600), keyPoints: strList(raw.explain.keyPoints, 6) };
  }
  const mastery = (Array.isArray(raw.mastery) ? raw.mastery : []).map(sanitizeProbe).filter((x): x is Probe => !!x).slice(0, 10);
  if (mastery.length) out.mastery = mastery;
  return out;
}

// ---------------- Interactive question validation ----------------

export function sanitizeProbe(raw: unknown): Probe | null {
  if (!isObj(raw)) return null;
  const extras = {
    ...(str(raw.hint) ? { hint: str(raw.hint, 600) } : {}),
    ...(Array.isArray(raw.mistakes)
      ? {
          mistakes: raw.mistakes
            .filter(isObj)
            .map((m) => ({ match: str(m.match, 200), coach: str(m.coach, 600) }))
            .filter((m) => m.match && m.coach)
            .slice(0, 8),
        }
      : {}),
    ...(raw.seconds !== undefined ? { seconds: int(raw.seconds, 5, 600, 45) } : {}),
    ...(str(raw.tests) ? { tests: slug(str(raw.tests, 60)) } : {}),
    ...(str(raw.angle) ? { angle: slug(str(raw.angle, 60)) } : {}),
  };
  const num = (v: unknown, d: number) => (Number.isFinite(Number(v)) ? Number(v) : d);
  let core: Probe | null = null;
  switch (raw.type) {
    case "cloze": {
      const text = str(raw.text, 2000);
      const blanks = (Array.isArray(raw.blanks) ? raw.blanks : [])
        .filter(isObj)
        .map((b) => ({ answers: strList(b.answers, 12, 100) }))
        .filter((b) => b.answers.length);
      const count = (text.match(/\{\d+\}/g) ?? []).length;
      if (text && blanks.length && count === blanks.length)
        core = { type: "cloze", text, blanks, ...(Array.isArray(raw.bank) ? { bank: strList(raw.bank, 16, 100) } : {}) };
      break;
    }
    case "number":
      if (str(raw.prompt) && Number.isFinite(Number(raw.answer)))
        core = {
          type: "number",
          prompt: str(raw.prompt, 1000),
          answer: Number(raw.answer),
          ...(raw.tolerance !== undefined ? { tolerance: Math.abs(num(raw.tolerance, 0)) } : {}),
          ...(str(raw.unit) ? { unit: str(raw.unit, 20) } : {}),
        };
      break;
    case "place": {
      const items = (Array.isArray(raw.items) ? raw.items : [])
        .filter(isObj)
        .map((i) => ({ label: str(i.label, 120), value: num(i.value, NaN) }))
        .filter((i) => i.label && Number.isFinite(i.value))
        .slice(0, 6);
      const min = num(raw.min, NaN);
      const max = num(raw.max, NaN);
      if (items.length && min < max)
        core = { type: "place", prompt: str(raw.prompt, 1000), min, max, step: Math.abs(num(raw.step, 1)) || 1, tolerance: Math.abs(num(raw.tolerance, 0)), items };
      break;
    }
    case "match": {
      const pairs = (Array.isArray(raw.pairs) ? raw.pairs : [])
        .filter(isObj)
        .map((p) => ({ left: str(p.left, 200), right: str(p.right, 200) }))
        .filter((p) => p.left && p.right)
        .slice(0, 8);
      if (pairs.length >= 2) core = { type: "match", prompt: str(raw.prompt, 1000), pairs };
      break;
    }
    case "build": {
      const tiles = strList(raw.tiles, 12, 120);
      if (tiles.length >= 2)
        core = {
          type: "build",
          prompt: str(raw.prompt, 1000),
          tiles,
          ...(Array.isArray(raw.distractors) ? { distractors: strList(raw.distractors, 6, 120) } : {}),
          // Other right orders must use exactly the same tiles.
          ...(Array.isArray(raw.also)
            ? (() => {
                const key = [...tiles].sort().join("\u0001");
                const also = raw.also.map((a: unknown) => strList(a, 20, 120)).filter((a: string[]) => a.length === tiles.length && [...a].sort().join("\u0001") === key).slice(0, 6);
                return also.length ? { also } : {};
              })()
            : {}),
        };
      break;
    }
    case "target": {
      const g = isObj(raw.goal) ? raw.goal : {};
      const prompt = str(raw.prompt, 1000);
      if (g.sim === "lever") core = { type: "target", prompt, goal: { sim: "lever", load: num(g.load, 40), maxPush: num(g.maxPush, 10) } };
      else if (g.sim === "profit")
        core = { type: "target", prompt, goal: { sim: "profit", cost: num(g.cost, 1), fixed: num(g.fixed, 0), units: Math.max(1, num(g.units, 10)), minProfit: num(g.minProfit, 10) } };
      else if (g.sim === "compound")
        core = { type: "target", prompt, goal: { sim: "compound", principal: num(g.principal, 100), rate: num(g.rate, 5), target: num(g.target, 200) } };
      else if (g.sim === "seasons") core = { type: "target", prompt, goal: { sim: "seasons", season: g.season === "winter" ? "winter" : "summer" } };
      break;
    }
    case "sort":
    case "sequence":
    case "highlight":
      core = sanitizeWidget(raw) as Probe | null;
      break;
  }
  return core ? ({ ...core, ...extras } as Probe) : null;
}
