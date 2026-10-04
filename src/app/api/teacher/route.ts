import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { aiEnabled, teacherLesson, teacherReply, teacherWhyWrong } from "@/lib/ai";
import { AI_LIMITS, FEATURES } from "@/content/features";
import { teacherFor } from "@/content/teachers";
import { getSkill } from "@/lib/curriculum/skills";
import {
  logTutor,
  markHelped,
  PortalError,
  tutorChat,
  tutorContext,
  tutorMessagesToday,
  workedExample,
} from "@/lib/store";

/**
 * AI teacher actions:
 *  { action: "chat", questionId, message }   talk about the current question
 *  { action: "lesson", skillId }              a mini-lesson before practicing
 *  { action: "why", questionId, kidAnswer }   explain a wrong answer
 * Without an API key, teachers fall back to the hints and solutions built into each skill.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  if (!FEATURES.aiTeachers) return NextResponse.json({ error: "Teachers are turned off." }, { status: 400 });
  const body = (await req.json().catch(() => ({}))) as {
    action?: string;
    questionId?: string;
    skillId?: string;
    message?: string;
    kidAnswer?: string;
  };
  if (tutorMessagesToday(kid.id) >= AI_LIMITS.messagesPerKidPerDay) {
    return NextResponse.json(
      { error: "Your teachers need a rest! You've asked a lot of great questions today. Try a hint or ask a parent." },
      { status: 429 },
    );
  }

  try {
    if (body.action === "chat" && body.questionId && typeof body.message === "string") {
      const message = body.message.trim().slice(0, AI_LIMITS.maxMessageChars);
      if (!message) return NextResponse.json({ error: "Type a question for your teacher." }, { status: 400 });
      const ctx = tutorContext(kid.id, body.questionId);
      const teacher = teacherFor(ctx.strand);
      if (!ctx.answered) markHelped(kid.id, body.questionId);
      const base = { questionId: body.questionId, skillId: ctx.skillId, teacherId: teacher.id, kind: "chat" as const };
      logTutor(kid.id, { ...base, role: "kid", content: message });

      const history = tutorChat(kid.id, body.questionId)
        .slice(-AI_LIMITS.historyTurns * 2)
        .map((m) => ({ role: m.role === "kid" ? ("user" as const) : ("assistant" as const), content: m.content }));
      // The API needs the first message to come from the user.
      while (history.length && history[0].role !== "user") history.shift();

      const reply =
        (await teacherReply({ teacher, skillTitle: ctx.skillTitle, grade: ctx.grade, question: ctx.question, answered: ctx.answered }, history)) ??
        (ctx.answered
          ? `Here's how it works: ${ctx.question.explanation}`
          : `Good question! Here's a nudge: ${ctx.question.hint} What would you try first?`);
      logTutor(kid.id, { ...base, role: "teacher", content: reply });
      return NextResponse.json({ reply, countsTowardMastery: ctx.answered, ai: aiEnabled() });
    }

    if (body.action === "lesson" && body.skillId) {
      const skill = getSkill(body.skillId);
      if (!skill) throw new PortalError("Unknown skill.");
      const example = workedExample(kid.id, skill.id);
      const teacher = teacherFor(skill.strand);
      const q = { prompt: example.prompt, answer: example.answer, explanation: example.explanation, hint: example.hint, kind: "number" as const };
      const lesson =
        (await teacherLesson(teacher, skill.title, kid.grade, q)) ??
        `${teacher.greeting}\n\nThe key idea: ${example.hint}\n\nWatch one: ${example.prompt} ${example.explanation} So the answer is ${example.answer}.\n\nYour turn!`;
      logTutor(kid.id, { questionId: null, skillId: skill.id, teacherId: teacher.id, kind: "lesson", role: "kid", content: "Teach me" });
      logTutor(kid.id, { questionId: null, skillId: skill.id, teacherId: teacher.id, kind: "lesson", role: "teacher", content: lesson });
      return NextResponse.json({ lesson, example });
    }

    if (body.action === "why" && body.questionId) {
      const ctx = tutorContext(kid.id, body.questionId);
      if (!ctx.answered) throw new PortalError("Answer the question first.");
      const teacher = teacherFor(ctx.strand);
      const kidAnswer = String(body.kidAnswer ?? "").slice(0, 100);
      const reply =
        (await teacherWhyWrong({ teacher, skillTitle: ctx.skillTitle, grade: ctx.grade, question: ctx.question, answered: true, kidAnswer })) ??
        `Let's look at it together. ${ctx.question.explanation} Tip: ${ctx.question.hint}`;
      const base = { questionId: body.questionId, skillId: ctx.skillId, teacherId: teacher.id, kind: "why" as const };
      logTutor(kid.id, { ...base, role: "kid", content: `Why was "${kidAnswer}" wrong?` });
      logTutor(kid.id, { ...base, role: "teacher", content: reply });
      return NextResponse.json({ reply });
    }

    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
