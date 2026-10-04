import Link from "next/link";
import { notFound } from "next/navigation";
import ParentNav from "@/components/ParentNav";
import { requireParent } from "@/lib/auth";
import { SUBJECTS } from "@/lib/compliance";
import { courseById } from "@/lib/content";
import { addLessonAction, saveCourseAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCourse({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireParent();
  const course = courseById((await params).id);
  if (!course) notFound();
  const { saved } = await searchParams;

  return (
    <main className="wrap">
      <ParentNav title={`${course.icon} ${course.title}`} />
      <p>
        <Link href="/parent/content#courses">← All content</Link>
      </p>
      {saved && <div className="notice">Saved. Kids see the change on their next page load.</div>}

      <form action={saveCourseAction} className="card" key={JSON.stringify(course)}>
        <input type="hidden" name="id" value={course.id} />
        <h2>Course details</h2>
        <div className="row">
          <div>
            <label>Title</label>
            <input name="title" defaultValue={course.title} maxLength={80} required />
          </div>
          <div>
            <label>Icon</label>
            <input name="icon" defaultValue={course.icon} maxLength={8} />
          </div>
          <div>
            <label>Color (0–360)</label>
            <input name="hue" type="number" min={0} max={360} defaultValue={course.hue} />
          </div>
          <div>
            <label>Track</label>
            <select name="track" defaultValue={course.track}>
              <option value="academic">Academic (fills the 2-hour day)</option>
              <option value="life">Afternoon life skills</option>
            </select>
          </div>
          <div>
            <label>Minutes logged as</label>
            <select name="subject" defaultValue={course.subject}>
              {SUBJECTS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>
        <label>Short description</label>
        <input name="blurb" defaultValue={course.blurb} maxLength={300} />
        <h3>Teacher</h3>
        <div className="row">
          <div>
            <label>Name</label>
            <input name="teacherName" defaultValue={course.teacher.name} maxLength={60} />
          </div>
          <div>
            <label>Avatar</label>
            <input name="teacherAvatar" defaultValue={course.teacher.avatar} maxLength={8} />
          </div>
          <div>
            <label>Inspired by</label>
            <input name="inspiredBy" defaultValue={course.teacher.inspiredBy} maxLength={200} />
          </div>
        </div>
        <label>Personality and voice (used for AI writing feedback)</label>
        <textarea name="voice" rows={2} defaultValue={course.teacher.voice} />

        <h3>Lessons</h3>
        <p className="muted small">Kids unlock lessons in this order. Change the numbers to reorder.</p>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Lesson</th>
              <th>Check</th>
              <th>Task</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {course.lessons.map((l, i) => (
              <tr key={l.id}>
                <td>
                  <input name={`order.${l.id}`} type="number" min={1} max={100} defaultValue={i + 1} style={{ maxWidth: 70 }} />
                </td>
                <td>
                  <Link href={`/parent/content/courses/${course.id}/${encodeURIComponent(l.id)}`}>{l.title}</Link>
                  <div className="muted small">
                    ~{l.minutes} min · {l.stage}
                  </div>
                </td>
                <td className="small">{l.check.length} questions</td>
                <td className="small">{l.task ? l.task.kind : "none"}</td>
                <td>
                  <input type="checkbox" name={`delete.${l.id}`} style={{ width: "auto" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <label className="check danger" style={{ marginTop: 14 }}>
          <input type="checkbox" name="deleteCourse" /> Delete this whole course
        </label>
        <button className="btn">Save course</button>
      </form>

      <form action={addLessonAction} className="card">
        <input type="hidden" name="courseId" value={course.id} />
        <h2>Add a lesson</h2>
        <div className="row" style={{ alignItems: "end" }}>
          <div>
            <label>Lesson title</label>
            <input name="title" maxLength={100} required placeholder="e.g. The Wright Brothers" />
          </div>
          <div>
            <button className="btn">Add and edit it</button>
          </div>
        </div>
      </form>
    </main>
  );
}
