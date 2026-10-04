import Link from "next/link";
import { notFound } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { features } from "@/lib/content";
import { courseOverview } from "@/lib/store";

export const dynamic = "force-dynamic";

function CourseCard({ c }: { c: ReturnType<typeof courseOverview>[number] }) {
  const total = c.lessons.length;
  const next = c.lessons.find((l) => l.status !== "done" && l.status !== "locked");
  return (
    <Link href={`/kid/learn/${c.course.id}`} className="course-card" style={{ ["--t-hue" as string]: c.course.hue }}>
      <div className="course-icon">{c.course.icon}</div>
      <div className="course-body">
        <div className="course-title">{c.course.title}</div>
        <div className="kmuted small">{c.course.blurb}</div>
        <div className="kmuted small">
          {c.course.teacher.avatar} {c.course.teacher.name}
        </div>
        <div className="mini-bar" style={{ marginTop: 8 }}>
          <span style={{ width: `${total ? (c.done / total) * 100 : 0}%` }} />
        </div>
        <div className="kmuted small">
          {c.done} of {total} lessons{next ? ` · next: ${next.lesson.title}` : c.done === total && total ? " · complete! 🏆" : ""}
        </div>
      </div>
    </Link>
  );
}

export default async function Learn() {
  const { kid } = await requireKid();
  if (!features().courses) notFound();
  const all = courseOverview(kid.id).filter((c) => c.course.lessons.length > 0);
  const academic = all.filter((c) => c.course.track === "academic");
  const life = all.filter((c) => c.course.track === "life");

  return (
    <main className="wrap">
      <div className="topbar">
        <div>
          <div className="eyebrow">{kid.avatar} {kid.name}&apos;s</div>
          <h1>📚 Academy</h1>
        </div>
        <nav>
          <Link href="/kid" className="kbtn ghost">
            ← Base
          </Link>
        </nav>
      </div>
      <div className="kcard">
        <h2>🎓 Academics</h2>
        <p className="kmuted small">These fill your 2-hour day rings. Read, check your understanding, then make something with it.</p>
        <div className="course-grid">
          {academic.map((c) => (
            <CourseCard key={c.course.id} c={c} />
          ))}
        </div>
      </div>
      <div className="kcard">
        <h2>🌅 Afternoon life skills</h2>
        <p className="kmuted small">Money, business and leadership: the skills that turn learners into builders and leaders.</p>
        <div className="course-grid">
          {life.map((c) => (
            <CourseCard key={c.course.id} c={c} />
          ))}
        </div>
      </div>
    </main>
  );
}
