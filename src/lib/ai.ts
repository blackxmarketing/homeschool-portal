import Anthropic from "@anthropic-ai/sdk";
import type { Question } from "./curriculum/answers";
import type { Teacher } from "@/content/teachers";
import { teachingMethod } from "./content";

/**
 * Optional Claude features. The portal works without an API key: hints fall
 * back to the hint written into each skill, and the weekly summary is skipped.
 *
 * Claude never decides whether an answer is right. Answers are always checked
 * by code; Claude only writes hints and parent summaries.
 */

const MODEL = "claude-opus-5-5";

let client: Anthropic | null | undefined;

function getClient(): Anthropic | null {
  if (client === undefined) {
    client = process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN ? new Anthropic() : null;
  }
  return client;
}

export function aiEnabled(): boolean {
  return getClient() !== null;
}

async function ask(system: string, user: string, effort: "low" | "medium", maxTokens: number): Promise<string | null> {
  return askMessages(system, [{ role: "user", content: user }], effort, maxTokens);
}

async function askMessages(
  system: string,
  messages: Anthropic.Beta.BetaMessageParam[],
  effort: "low" | "medium",
  maxTokens: number,
): Promise<string | null> {
  const c = getClient();
  if (!c) return null;
  try {
    const res = await c.beta.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      // If a request is declined, let the API retry on its recommended fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort },
      system,
      messages,
    });
    if (res.stop_reason === "refusal") return null;
    const text = res.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return text || null;
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) console.warn("Claude rate limited; using built-in text");
    else if (err instanceof Anthropic.APIError) console.warn(`Claude API error ${err.status}; using built-in text`);
    else console.warn("Claude request failed; using built-in text", err);
    return null;
  }
}

const HINT_SYSTEM = `You are a warm, patient math tutor for a homeschooled kid.
Write ONE short hint (at most two sentences, plain words a 9-11 year old understands).
Point toward the next step or the idea to use. Never state the final answer, never do the last step for them, and never write the answer number in the hint.
No greetings, no emojis, no markdown.`;

/** A tutor-style hint. Falls back to the skill's built-in hint. */
export async function tutorHint(q: Question, skillTitle: string, grade: number): Promise<string> {
  const text = await ask(
    HINT_SYSTEM,
    `Skill: ${skillTitle} (grade ${grade} level)\nQuestion: ${q.prompt}\nCorrect answer (secret, do not reveal): ${q.answer}\nWorked solution (secret): ${q.explanation}`,
    "low",
    2000,
  );
  // Belt and braces: if the hint leaks the answer, use the built-in one.
  if (!text || leaksAnswer(text, q.answer)) return q.hint;
  return text;
}

function leaksAnswer(text: string, answer: string): boolean {
  const a = answer.trim();
  if (a.length < 2 && !/^\d$/.test(a)) return false;
  const escaped = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\d./])${escaped}($|[^\\d/])`).test(text);
}

const SUMMARY_SYSTEM = `You write a short weekly progress note for a homeschooling parent about one child's math work in their learning portal.
Use only the data given. Be specific and honest: celebrate real wins, name the skill that needs attention, and suggest one or two concrete things the parent can do this week (for example a hands-on activity for a stuck skill).
Keep it under 180 words. Plain text, short paragraphs, no markdown headings.`;

export async function weeklySummary(data: unknown): Promise<string | null> {
  return ask(SUMMARY_SYSTEM, JSON.stringify(data, null, 2), "medium", 4000);
}

// ---------------- AI teachers (Phase 2) ----------------

export interface LessonContext {
  teacher: Teacher;
  skillTitle: string;
  grade: number;
  question: Question;
  /** True once the kid has answered, so the teacher may discuss the answer. */
  answered: boolean;
  kidAnswer?: string;
}

function teacherSystem(t: Teacher): string {
  return `You are ${t.name}, an AI teacher character in a homeschool learning app for kids aged 11-14. Your character is loosely inspired by ${t.inspiredBy}; you are an original character, not that person.
Your style: ${t.voice}
Stories and hooks you like: ${t.hooks.join("; ")}.

${teachingMethod()}

Rules:
- Stay on the current lesson. If the student brings up something unrelated, say one friendly sentence and steer back to the math.
- Never ask for personal information. If the student mentions being upset, hurt or unsafe, kindly tell them to talk to their parent right away.
- Plain text only: no markdown, no emojis, no lists.`;
}

function lessonFacts(ctx: LessonContext): string {
  const q = ctx.question;
  return `Current skill: ${ctx.skillTitle} (grade ${ctx.grade} level)
Current question: ${q.prompt}
Correct answer${ctx.answered ? "" : " (SECRET: never say it, never do the final step for them)"}: ${q.answer}
Worked solution${ctx.answered ? "" : " (SECRET)"}: ${q.explanation}
${ctx.answered ? `The student already answered${ctx.kidAnswer ? ` "${ctx.kidAnswer}"` : ""}, so you may discuss the answer openly.` : "The student has not answered yet. Guide them; do not give the answer."}`;
}

/**
 * One chat turn with a teacher about the current question. `history` is the
 * conversation so far (oldest first), ending with the kid's new message.
 * Returns null when AI is off or the request failed.
 */
export async function teacherReply(ctx: LessonContext, history: { role: "user" | "assistant"; content: string }[]): Promise<string | null> {
  const messages: Anthropic.Beta.BetaMessageParam[] = history.map((m, i) =>
    i === 0 && m.role === "user" ? { role: "user", content: `${lessonFacts(ctx)}\n\nStudent: ${m.content}` } : m,
  );
  if (messages[0]?.role !== "user") messages.unshift({ role: "user", content: lessonFacts(ctx) });
  const text = await askMessages(teacherSystem(ctx.teacher), messages, "low", 2000);
  if (!text) return null;
  if (!ctx.answered && leaksAnswer(text, ctx.question.answer)) {
    // Never let the answer slip out before the kid tries.
    return "I almost gave it away there! Let's back up. What's the very first step you'd take here?";
  }
  return text;
}

/** A short mini-lesson that introduces a skill with a hook, the key idea and a worked example. */
export async function teacherLesson(teacher: Teacher, skillTitle: string, grade: number, example: Question): Promise<string | null> {
  return ask(
    teacherSystem(teacher),
    `Teach a 60-second mini-lesson on "${skillTitle}" (grade ${grade} level) before the student practices.
Structure, as 3 short paragraphs:
1. A one- or two-sentence real-world hook from your character's world.
2. The key idea in plain words.
3. Walk through this example step by step: ${example.prompt} (answer ${example.answer}; solution: ${example.explanation}). End by asking the student to try one on their own.
Under 130 words total.`,
    "low",
    3000,
  );
}

/** After a wrong answer: explain the likely mistake, kindly and specifically. */
export async function teacherWhyWrong(ctx: LessonContext): Promise<string | null> {
  return ask(
    teacherSystem(ctx.teacher),
    `${lessonFacts({ ...ctx, answered: true })}
The student's answer was wrong. In 2-4 sentences: guess the specific mistake they most likely made (be concrete about their answer), show the step that fixes it, and end with one quick tip to remember next time. Be encouraging.`,
    "low",
    2000,
  );
}

// ---------------- Writing feedback (Phase 3) ----------------

/**
 * Feedback on a kid's written work against the lesson's rubric: what's
 * working, what to improve for each rubric point, and one next step. It never
 * rewrites the work for them.
 */
export async function writingFeedback(input: {
  teacher: { name: string; inspiredBy: string; voice: string };
  courseTitle: string;
  lessonTitle: string;
  prompt: string;
  rubric: string[];
  work: string;
}): Promise<string | null> {
  const system = `You are ${input.teacher.name}, a teacher character in a homeschool learning app for kids aged 11-14${
    input.teacher.inspiredBy ? `, loosely inspired by ${input.teacher.inspiredBy} (an original character, not that person)` : ""
  }.
Your style: ${input.teacher.voice}
You give feedback on student writing the way a great writing coach does: specific, honest and encouraging. Quote short phrases from their work to show exactly what you mean.
Never rewrite their work for them; show one small example at most. Never grade with letters or numbers.
Plain text only, no markdown symbols. Use exactly these labeled parts on separate lines:
Glow: one or two sentences on what is genuinely working.
Then one line per rubric point, starting with a check mark if it is met or an arrow if it needs work, followed by one specific sentence.
Next step: the single most useful revision to make.
Keep it under 170 words.`;
  return ask(
    system,
    `Course: ${input.courseTitle}
Lesson: ${input.lessonTitle}
Assignment: ${input.prompt}
Rubric:
${input.rubric.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Student's work:
"""
${input.work}
"""`,
    "low",
    3000,
  );
}
