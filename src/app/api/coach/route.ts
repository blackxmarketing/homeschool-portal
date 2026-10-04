import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { aiEnabled, coachExplain, coachRescue } from "@/lib/ai";
import { aiLimits, features } from "@/lib/content";
import { keywordExplainCheck } from "@/lib/teaching";
import {
  answerActivity,
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

    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
