import { courseOverview, recentCourseWork, supportReport } from "@/lib/store";

const STATUS = { done: "complete", open: "ready", started: "in progress", waiting: "waiting for you", locked: "locked" } as const;
const TASK_STATUS: Record<string, string> = { done: "turned in", pending: "waiting for you", approved: "approved", declined: "asked to redo" };

/** Parent view: each course's progress, then recent written work with the AI feedback it got. */
export default function CourseProgress({ kidId, name }: { kidId: number; name: string }) {
  const courses = courseOverview(kidId).filter((c) => c.course.lessons.length > 0);
  const work = recentCourseWork(kidId);
  const support = supportReport(kidId);

  return (
    <div className="card">
      <h2>Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Track</th>
            <th>Lessons done</th>
            <th>Current lesson</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => {
            const current = c.lessons.find((l) => l.status !== "done" && l.status !== "locked");
            return (
              <tr key={c.course.id}>
                <td>
                  {c.course.icon} {c.course.title}
                </td>
                <td className="small muted">{c.course.track === "life" ? "Life skills" : "Academic"}</td>
                <td>
                  {c.done} / {c.lessons.length}
                </td>
                <td className="small">{current ? `${current.lesson.title} (${STATUS[current.status]})` : c.done ? "🏆 complete" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3 style={{ margin: "16px 0 6px" }}>Where {name} needed extra help</h3>
      {support.length === 0 ? (
        <p className="muted small">Nothing yet. When {name} misses a quick think twice, says they&apos;re lost, or needs the coach to step in, it shows here.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Part</th>
              <th>What happened</th>
            </tr>
          </thead>
          <tbody>
            {support.flatMap((r) => [
              ...r.segments.map((s, i) => (
                <tr key={`${r.lesson.id}:${i}`}>
                  <td className="small">
                    {r.course.icon} {r.lesson.title}
                  </td>
                  <td className="small">{s.title}</td>
                  <td className="small">
                    {s.misses} miss{s.misses === 1 ? "" : "es"}
                    {s.lost ? ` · said "I'm lost" ${s.lost}×` : ""}
                    {s.aiRescues ? ` · coach re-explained ${s.aiRescues}×` : ""}
                    {s.done === "supported" ? " · answer shown, worth revisiting together" : s.done === "passed" ? " · got it in the end ✓" : " · still working on it"}
                  </td>
                </tr>
              )),
              ...(r.explain.tries > 1 || (r.explain.done && !r.explain.understood)
                ? [
                    <tr key={`${r.lesson.id}:explain`}>
                      <td className="small">
                        {r.course.icon} {r.lesson.title}
                      </td>
                      <td className="small">Explain it back</td>
                      <td className="small">
                        {r.explain.tries} tries · {r.explain.understood ? "explained it well in the end ✓" : "didn't fully explain it yet: ask them to teach it to you"}
                      </td>
                    </tr>,
                  ]
                : []),
            ])}
          </tbody>
        </table>
      )}

      <h3 style={{ margin: "16px 0 6px" }}>Recent work</h3>
      {work.length === 0 ? (
        <p className="muted small">Nothing turned in yet. {name}&apos;s written work and AI feedback will show up here.</p>
      ) : (
        work.map((w) => (
          <details key={w.id} className="edit-item">
            <summary>
              {w.course?.icon} <strong>{w.lesson?.title ?? w.lesson_id}</strong> · {TASK_STATUS[w.task_status] ?? w.task_status}
              {w.completed_day ? ` · finished ${w.completed_day}` : ""}
            </summary>
            {w.lesson?.task && <p className="muted small">Task: {w.lesson.task.prompt}</p>}
            <div className="quote">{w.task_response}</div>
            {w.task_feedback && (
              <>
                <p className="small" style={{ marginBottom: 2 }}>
                  <strong>{w.course?.teacher.name}&apos;s feedback:</strong>
                </p>
                <div className="quote">{w.task_feedback}</div>
              </>
            )}
            {w.lesson?.task && (
              <p className="muted small">Rubric: {w.lesson.task.rubric.join(" · ")}</p>
            )}
          </details>
        ))
      )}
    </div>
  );
}
