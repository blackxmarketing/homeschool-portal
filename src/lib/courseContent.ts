import type { CheckQuestion, Course, Lesson, Stage, TaskKind } from "@/content/courses/types";
import { SUBJECTS, type Subject } from "./compliance";

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
  };
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
