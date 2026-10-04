import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { aiEnabled, writingFeedback } from "@/lib/ai";
import { aiLimits, courseById, features } from "@/lib/content";
import { logTutor, PortalError, saveTaskFeedback, submitCheck, submitTask, tutorMessagesToday } from "@/lib/store";

/**
 * Course lessons:
 *  { action: "check", courseId, lessonId, answers: number[] }  grade the lesson check
 *  { action: "task", courseId, lessonId, response }            turn in the lesson task
 * Written tasks get AI feedback against the rubric (when an API key is set).
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  if (!features().courses) return NextResponse.json({ error: "Courses are turned off." }, { status: 400 });
  const body = (await req.json().catch(() => ({}))) as {
    action?: string;
    courseId?: string;
    lessonId?: string;
    answers?: unknown;
    response?: string;
  };
  if (!body.courseId || !body.lessonId) return NextResponse.json({ error: "Bad request." }, { status: 400 });

  try {
    if (body.action === "check" && Array.isArray(body.answers)) {
      return NextResponse.json(submitCheck(kid.id, body.courseId, body.lessonId, body.answers.map((a) => Number(a))));
    }
    if (body.action === "task" && typeof body.response === "string") {
      const result = submitTask(kid.id, body.courseId, body.lessonId, body.response);
      let feedback = "";
      const task = result.lesson.task!;
      // Feedback uses the same daily AI allowance as teacher chats.
      if (task.kind === "write" && features().aiTeachers && aiEnabled() && tutorMessagesToday(kid.id) < aiLimits().messagesPerKidPerDay) {
        const course = courseById(body.courseId)!;
        feedback =
          (await writingFeedback({
            teacher: course.teacher,
            courseTitle: course.title,
            lessonTitle: result.lesson.title,
            prompt: task.prompt,
            rubric: task.rubric,
            work: body.response,
          })) ?? "";
        if (feedback) {
          saveTaskFeedback(kid.id, body.courseId, body.lessonId, feedback);
          const base = { questionId: null, skillId: `course:${body.courseId}`, teacherId: `course:${body.courseId}`, kind: "why" as const };
          logTutor(kid.id, { ...base, role: "kid", content: `Feedback on: ${result.lesson.title}` });
          logTutor(kid.id, { ...base, role: "teacher", content: feedback });
        }
      }
      return NextResponse.json({ status: result.status, completed: result.completed, feedback });
    }
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
