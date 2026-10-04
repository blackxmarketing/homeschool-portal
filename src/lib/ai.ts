import Anthropic from "@anthropic-ai/sdk";
import type { Question } from "./curriculum/answers";

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
      messages: [{ role: "user", content: user }],
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
