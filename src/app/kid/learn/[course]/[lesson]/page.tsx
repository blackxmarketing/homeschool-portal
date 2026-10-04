import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonPlayer from "@/components/LessonPlayer";
import { requireKid } from "@/lib/auth";
import { features } from "@/lib/content";
import { lessonView } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const { kid } = await requireKid();
  if (!features().courses) notFound();
  const { course, lesson } = await params;
  const v = lessonView(kid.id, course, lesson);
  if (!v) notFound();
  if (v.status === "locked") redirect(`/kid/learn/${course}`);

  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <div className="topbar">
        <Link href={`/kid/learn/${course}`} className="backlink">
          ← {v.course.icon} {v.course.title}
        </Link>
        <span className="kmuted small">
          Lesson {v.index + 1} of {v.course.lessons.length}
        </span>
      </div>
      <h1 style={{ marginBottom: 12 }}>{v.lesson.title}</h1>
      <LessonPlayer
        courseId={v.course.id}
        courseTitle={v.course.title}
        hue={v.course.hue}
        teacher={v.course.teacher}
        // Answers and explanations stay on the server until the check is graded.
        lesson={{ ...v.lesson, check: v.lesson.check.map(({ q, choices }) => ({ q, choices })) }}
        next={v.next ? { id: v.next.id, title: v.next.title } : null}
        initial={{
          checkPassed: v.checkPassed,
          checkBest: v.checkBest,
          taskStatus: v.taskStatus,
          taskResponse: v.taskResponse,
          taskFeedback: v.taskFeedback,
          done: v.status === "done",
        }}
      />
    </main>
  );
}
