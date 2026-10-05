import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { heroOf } from "@/lib/gameState";
import { LANDS } from "@/lib/pixel/world";
import { requireKid } from "@/lib/auth";
import { features } from "@/lib/content";
import { courseOverview } from "@/lib/store";

export const dynamic = "force-dynamic";

const ICON = { done: "⭐", open: "▶", started: "⚡", waiting: "⏳", locked: "🔒" } as const;
const LABEL = { done: "Complete", open: "Ready", started: "In progress", waiting: "Waiting for a parent", locked: "Locked" } as const;
const STAGE = { grammar: "Learn the facts", logic: "Reason it out", rhetoric: "Make & explain" } as const;

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { kid } = await requireKid();
  if (!features().courses) notFound();
  const { course: courseId } = await params;
  // In the game world, a course is a land.
  const land = LANDS.find((l) => l.courses.includes(courseId));
  if (land && heroOf(kid.id)) redirect(`/kid/land/${land.id}`);
  const c = courseOverview(kid.id).find((x) => x.course.id === courseId);
  if (!c) notFound();

  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <div className="topbar">
        <Link href="/kid/learn" className="backlink">
          ← Academy
        </Link>
      </div>
      <div className="kcard" style={{ ["--t-hue" as string]: c.course.hue, ["--hue" as string]: c.course.hue }}>
        <div className="eyebrow">{c.course.track === "life" ? "Afternoon life skills" : "Academics"}</div>
        <h1>
          {c.course.icon} {c.course.title}
        </h1>
        <p className="kmuted">{c.course.blurb}</p>
        <div className="teacher-badge">
          <div className="teacher-avatar" title={c.course.teacher.inspiredBy ? `Inspired by ${c.course.teacher.inspiredBy}` : undefined}>
            {c.course.teacher.avatar}
          </div>
          <div>
            <div className="teacher-name">{c.course.teacher.name}</div>
            {c.course.teacher.inspiredBy && <div className="teacher-line">Inspired by {c.course.teacher.inspiredBy}</div>}
          </div>
        </div>
        <ol className="path" style={{ marginTop: 16 }}>
          {c.lessons.map(({ lesson, status }, i) => {
            const inner = (
              <>
                <span className={`node ${status === "done" ? "mastered" : status === "locked" ? "locked" : "ready"}`}>{ICON[status]}</span>
                <span className="node-text">
                  <span className="node-title">
                    {i + 1}. {lesson.title}
                  </span>
                  <span className="kmuted small">
                    {STAGE[lesson.stage]} · ~{lesson.minutes} min · {LABEL[status]}
                  </span>
                </span>
              </>
            );
            return (
              <li key={lesson.id}>
                {status === "locked" ? (
                  <div className="path-step locked">{inner}</div>
                ) : (
                  <Link href={`/kid/learn/${c.course.id}/${lesson.id}`} className="path-step playable">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
