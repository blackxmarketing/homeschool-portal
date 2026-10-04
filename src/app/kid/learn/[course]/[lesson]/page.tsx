import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonFlow from "@/components/LessonFlow";
import LessonPlayer from "@/components/LessonPlayer";
import { requireKid } from "@/lib/auth";
import { features } from "@/lib/content";
import { interactiveDone, publicThink, publicWidget } from "@/lib/teaching";
import { lessonView, teachProgress } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const { kid } = await requireKid();
  if (!features().courses) notFound();
  const { course, lesson } = await params;
  const v = lessonView(kid.id, course, decodeURIComponent(lesson));
  if (!v) notFound();
  if (v.status === "locked") redirect(`/kid/learn/${course}`);

  // Answers and explanations stay on the server; the browser only gets what it needs to show.
  const player = {
    courseId: v.course.id,
    courseTitle: v.course.title,
    hue: v.course.hue,
    teacher: v.course.teacher,
    lesson: { ...v.lesson, check: v.lesson.check.map(({ q, choices }) => ({ q, choices })) },
    next: v.next ? { id: v.next.id, title: v.next.title } : null,
    initial: {
      checkPassed: v.checkPassed,
      checkBest: v.checkBest,
      taskStatus: v.taskStatus,
      taskResponse: v.taskResponse,
      taskFeedback: v.taskFeedback,
      done: v.status === "done",
    },
  };
  const L = v.lesson;
  const seed = `${kid.id}:${L.id}`;
  const state = L.teach?.length ? teachProgress(kid.id, v.course.id, L.id) : null;

  return (
    <main className="wrap" style={{ maxWidth: 860 }}>
      <div className="topbar">
        <Link href={`/kid/learn/${course}`} className="backlink">
          ← {v.course.icon} {v.course.title}
        </Link>
        <span className="kmuted small">
          Lesson {v.index + 1} of {v.course.lessons.length}
        </span>
      </div>
      <h1 style={{ marginBottom: 12 }}>{L.title}</h1>
      {L.teach?.length && state ? (
        <LessonFlow
          player={player}
          interactiveDone={v.status === "done" || interactiveDone(L, state)}
          teach={{
            hook: L.hook ? { text: L.hook.text, visual: L.hook.visual ? publicWidget(L.hook.visual, `${seed}:hook`) : undefined } : undefined,
            segments: L.teach.map((s, i) => ({
              title: s.title,
              teach: s.teach,
              visual: s.visual ? publicWidget(s.visual, `${seed}:${i}`) : undefined,
              think: publicThink(s.think),
            })),
            activity: L.activity ? publicWidget(L.activity, `${seed}:activity`) : undefined,
            explain: L.explain ? { prompt: L.explain.prompt } : undefined,
            initial: {
              segmentsDone: state.segments.map((s) => !!s.done),
              activityDone: state.activity.done,
              explainDone: state.explain.done,
            },
          }}
        />
      ) : (
        <LessonPlayer {...player} />
      )}
    </main>
  );
}
