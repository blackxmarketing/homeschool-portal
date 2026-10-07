import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { aiEnabled, coachAsk, coachExplain, coachRescue } from "@/lib/ai";
import { aiLimits, features } from "@/lib/content";
import { keywordExplainCheck } from "@/lib/teaching";
import {
  answerActivity,
  askContext,
  kidVoiceMemory,
  answerMasteryItem,
  retryMastery,
  answerProbe,
  answerReview,
  answerSimpler,
  answerThink,
  checkSegmentVisual,
  explainContext,
  imLost,
  logTutor,
  noteAiRescue,
  PortalError,
  recordExplain,
  tutorMessagesToday,
} from "@/lib/store";

/**
 * The lesson coach (teaching model):
 *  { action: "think",    courseId, lessonId, seg, choice }   quick-think answer -> coaching ladder
 *  { action: "simpler",  courseId, lessonId, seg, choice }   the smaller first-step question
 *  { action: "lost",     courseId, lessonId, seg }           "I'm lost" -> next kind of help
 *  { action: "activity", courseId, lessonId, answer }        hands-on activity
 *  { action: "explain",  courseId, lessonId, text }          explain it back in your own words
 *  { action: "ask",      courseId, lessonId, seg, text }     the kid asks the teacher a question (spoken or typed)
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  if (!features().courses) return NextResponse.json({ error: "Courses are turned off." }, { status: 400 });
  const b = (await req.json().catch(() => ({}))) as {
    action?: string;
    courseId?: string;
    lessonId?: string;
    seg?: number;
    choice?: number;
    answer?: unknown;
    text?: string;
    picks?: string[];
    ms?: unknown;
    answers?: unknown;
    testOut?: boolean;
    attempt?: number;
    index?: number;
  };
  if (!b.courseId || !b.lessonId) return NextResponse.json({ error: "Bad request." }, { status: 400 });
  const { courseId, lessonId } = b;
  const seg = Number(b.seg);
  const aiOk = () => features().aiTeachers && aiEnabled() && tutorMessagesToday(kid.id) < aiLimits().messagesPerKidPerDay;

  try {
    if (b.action === "think" || b.action === "lost") {
      const r = b.action === "think" ? answerThink(kid.id, courseId, lessonId, seg, Number(b.choice)) : imLost(kid.id, courseId, lessonId, seg);
      let rescue: { approach: string; explanation: string; tryThis: string } | null = null;
      // At the third rung, the AI coach writes a fresh explanation around this kid's mistakes.
      if (r.needsAi && r.seg && r.course && aiOk()) {
        const picks = (Array.isArray(b.picks) ? b.picks : []).map((p) => String(p).slice(0, 200)).slice(-4);
        rescue = await coachRescue({
          teacher: r.course.teacher,
          lessonTitle: r.lesson!.title,
          segmentTitle: r.seg.title,
          teachText: r.seg.teach,
          question: r.seg.think.q,
          choices: r.seg.think.choices,
          answer: r.seg.think.answer,
          wrongPicks: picks.length ? picks : ["(said they were lost)"],
          alreadyTried: [r.seg.teach, r.seg.approaches.analogy],
        });
        if (rescue) {
          noteAiRescue(kid.id, courseId, lessonId, seg);
          const base = { questionId: null, skillId: `course:${courseId}`, teacherId: `course:${courseId}`, kind: "chat" as const };
          logTutor(kid.id, { ...base, role: "kid", content: `Stuck on "${r.seg.title}" (picked: ${picks.join(" / ") || "lost"})` });
          logTutor(kid.id, { ...base, role: "teacher", content: `${rescue.explanation} ${rescue.tryThis}` });
        }
      }
      const { seg: _s, lesson: _l, course: _c, ...rest } = r as typeof r & { seg?: unknown; lesson?: unknown; course?: unknown };
      return NextResponse.json({ ...rest, rescue });
    }

    if (b.action === "probe") {
      const r = answerProbe(kid.id, courseId, lessonId, seg, b.answer, Number(b.ms) || 0);
      let rescue: { approach: string; explanation: string; tryThis: string } | null = null;
      if (r.needsAi && r.seg && r.course && aiOk()) {
        rescue = await coachRescue({
          teacher: r.course.teacher,
          lessonTitle: r.lesson!.title,
          segmentTitle: r.seg.title,
          teachText: r.seg.teach,
          // The AI sees the multiple-choice version of the same idea, which names the misconceptions.
          question: r.seg.think.q,
          choices: r.seg.think.choices,
          answer: r.seg.think.answer,
          wrongPicks: [JSON.stringify(b.answer).slice(0, 300)],
          alreadyTried: [r.seg.teach, r.seg.approaches.analogy],
        });
        if (rescue) {
          noteAiRescue(kid.id, courseId, lessonId, seg);
          const base = { questionId: null, skillId: `course:${courseId}`, teacherId: `course:${courseId}`, kind: "chat" as const };
          logTutor(kid.id, { ...base, role: "kid", content: `Stuck on "${r.seg.title}" (answered: ${JSON.stringify(b.answer).slice(0, 200)})` });
          logTutor(kid.id, { ...base, role: "teacher", content: `${rescue.explanation} ${rescue.tryThis}` });
        }
      }
      const { seg: _s, lesson: _l, course: _c, ...rest } = r as typeof r & { seg?: unknown; lesson?: unknown; course?: unknown };
      return NextResponse.json({ ...rest, rescue });
    }

    if (b.action === "mastery") {
      return NextResponse.json(answerMasteryItem(kid.id, courseId, lessonId, Number(b.index), b.answer, Number(b.ms) || 0, !!b.testOut));
    }

    if (b.action === "mastery-retry") return NextResponse.json(retryMastery(kid.id, courseId, lessonId));

    if (b.action === "review") {
      return NextResponse.json(answerReview(kid.id, courseId, lessonId, seg, b.answer, Number(b.ms) || 0, Number(b.attempt) || 1));
    }

    if (b.action === "visual" && Array.isArray(b.answer)) {
      return NextResponse.json(checkSegmentVisual(kid.id, courseId, lessonId, seg, b.answer.map((x) => Number(x))));
    }

    if (b.action === "simpler") return NextResponse.json(answerSimpler(kid.id, courseId, lessonId, seg, Number(b.choice)));

    if (b.action === "activity" && Array.isArray(b.answer)) {
      return NextResponse.json(answerActivity(kid.id, courseId, lessonId, b.answer.map((x) => Number(x))));
    }

    if (b.action === "explain" && typeof b.text === "string") {
      const text = b.text.trim().slice(0, 3000);
      if (text.length < 15) return NextResponse.json({ error: "Explain a little more, in your own words." }, { status: 400 });
      const ctx = explainContext(kid.id, courseId, lessonId);
      const ex = ctx.lesson.explain!;
      let verdict = aiOk()
        ? await coachExplain({ teacher: ctx.course.teacher, lessonTitle: ctx.lesson.title, prompt: ex.prompt, keyPoints: ex.keyPoints, text })
        : null;
      if (verdict) {
        const base = { questionId: null, skillId: `course:${courseId}`, teacherId: `course:${courseId}`, kind: "why" as const };
        logTutor(kid.id, { ...base, role: "kid", content: `Explain it back: ${text}` });
        logTutor(kid.id, { ...base, role: "teacher", content: `${verdict.feedback} ${verdict.followUp}` });
      } else {
        // Without AI: look for the key points' important words.
        const k = keywordExplainCheck(text, ex.keyPoints);
        const understood = k.missing.length <= Math.floor(ex.keyPoints.length / 3);
        verdict = {
          understood,
          covered: k.covered,
          missing: k.missing,
          feedback: understood ? "You hit the big ideas. Nice explaining!" : "Good start. A few key ideas are missing.",
          followUp: k.missing.length ? `Can you add something about: ${k.missing[0]}?` : "",
        };
      }
      const state = recordExplain(kid.id, courseId, lessonId, verdict.understood, verdict.feedback);
      return NextResponse.json({ ...verdict, done: state.done, tries: state.tries });
    }

    if (b.action === "ask" && typeof b.text === "string") {
      const question = b.text.trim().slice(0, aiLimits().maxMessageChars);
      if (question.length < 3) return NextResponse.json({ error: "Ask your question in a few words." }, { status: 400 });
      const ctx = askContext(kid.id, courseId, lessonId, seg);
      const s = ctx.segment;
      const memory = kidVoiceMemory(kid.id, courseId);
      const base = { questionId: `ask:${courseId}:${lessonId}`, skillId: `course:${courseId}`, teacherId: `course:${courseId}`, kind: "chat" as const };
      const reply = aiOk()
        ? await coachAsk({
            teacher: ctx.course.teacher,
            lessonTitle: ctx.lesson.title,
            segmentTitle: s?.title ?? ctx.lesson.title,
            teachText: s?.teach ?? ctx.lesson.read.slice(0, 1500),
            secret: s ? s.think.choices[s.think.answer] : "",
            question,
            memory,
          })
        : null;
      // Off-topic questions are marked in the transcript so a parent sees them on the
      // kid's page, instead of the flag being computed and thrown away.
      const flag = reply && !reply.onTopic ? "[off topic] " : "";
      logTutor(kid.id, { ...base, role: "kid", content: `${flag}Asked in "${ctx.lesson.title}": ${question}` });
      if (reply) {
        logTutor(kid.id, { ...base, role: "teacher", content: reply.answer });
        return NextResponse.json({ answer: reply.answer, ai: true, onTopic: reply.onTopic });
      }
      // Without AI the teacher offers another way in from the lesson itself, and the question is saved for a parent.
      const fallback = s
        ? `Great question. Here's another way to think about it: ${s.approaches.analogy} I saved your question so a parent can talk it through with you too.`
        : "Great question. I saved it so a parent can talk it through with you.";
      return NextResponse.json({ answer: fallback, ai: false });
    }

    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
