import Link from "next/link";
import { notFound } from "next/navigation";
import ParentNav from "@/components/ParentNav";
import { requireParent } from "@/lib/auth";
import { SUBJECTS } from "@/lib/compliance";
import { courseById } from "@/lib/content";
import { formatQuestions } from "@/lib/courseContent";
import { saveLessonAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditLesson({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; lesson: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireParent();
  const { id, lesson: lessonParam } = await params;
  const course = courseById(id);
  const lesson = course?.lessons.find((l) => l.id === decodeURIComponent(lessonParam));
  if (!course || !lesson) notFound();
  const { saved, error } = await searchParams;
  // Everything sanitizeTeaching understands, so what you see in the box is what
  // gets saved back. Anything missing here is dropped on save.
  const teaching = {
    objectives: lesson.objectives,
    hook: lesson.hook,
    teach: lesson.teach,
    activity: lesson.activity,
    explain: lesson.explain,
    mastery: lesson.mastery,
  };

  return (
    <main className="wrap">
      <ParentNav title={`Edit lesson`} />
      <p>
        <Link href={`/parent/content/courses/${course.id}`}>
          ← {course.icon} {course.title}
        </Link>
      </p>
      {saved && <div className="notice">Saved. Kids see the change on their next page load.</div>}
      {error === "json" && <div className="error">The interactive teaching box has a typo (it must be valid JSON). Nothing was saved.</div>}
      <form action={saveLessonAction} className="card" key={JSON.stringify(lesson)}>
        <input type="hidden" name="courseId" value={course.id} />
        <input type="hidden" name="lessonId" value={lesson.id} />
        <div className="row">
          <div style={{ flex: "2 1 300px" }}>
            <label>Title</label>
            <input name="title" defaultValue={lesson.title} maxLength={100} required />
          </div>
          <div>
            <label>Minutes (logged when finished)</label>
            <input name="minutes" type="number" min={5} max={120} defaultValue={lesson.minutes} />
          </div>
          <div>
            <label>Classical stage</label>
            <select name="stage" defaultValue={lesson.stage}>
              <option value="grammar">Grammar: learn the facts</option>
              <option value="logic">Logic: reason it out</option>
              <option value="rhetoric">Rhetoric: make & explain</option>
            </select>
          </div>
          <div>
            <label>Logged as (if different from the course)</label>
            <select name="subject" defaultValue={lesson.subject ?? ""}>
              <option value="">Same as course ({course.subject})</option>
              {SUBJECTS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>

        <label>Lesson reading (leave a blank line between paragraphs)</label>
        <textarea name="read" rows={16} defaultValue={lesson.read} required />

        <label>Key ideas (one per line)</label>
        <textarea name="keyIdeas" rows={4} defaultValue={lesson.keyIdeas.join("\n")} />

        <label>Check questions</label>
        <p className="muted small">
          One question per block, with a blank line between blocks. Start the question with <code>Q:</code>, each choice with <code>-</code>,
          and mark the right choice with <code>*</code> instead. Add <code>Why:</code> for the explanation. Kids need 80% to pass.
        </p>
        <textarea
          name="check"
          rows={18}
          defaultValue={formatQuestions(lesson.check)}
          placeholder={"Q: What is 2 + 2?\n- 3\n* 4\n- 5\nWhy: Two plus two is four."}
          style={{ fontFamily: "ui-monospace, monospace", fontSize: ".9rem" }}
        />

        <h3>Task</h3>
        <div className="row">
          <div>
            <label>Type</label>
            <select name="taskKind" defaultValue={lesson.task?.kind ?? ""}>
              <option value="">No task</option>
              <option value="write">Write (AI feedback, counts right away)</option>
              <option value="project">Project (you approve)</option>
              <option value="lab">Lab (you approve)</option>
              <option value="speak">Speech (you approve)</option>
            </select>
          </div>
        </div>
        <label>What to do</label>
        <textarea name="taskPrompt" rows={4} defaultValue={lesson.task?.prompt ?? ""} />
        <label>What great work looks like (rubric, one per line)</label>
        <textarea name="taskRubric" rows={4} defaultValue={lesson.task?.rubric.join("\n") ?? ""} />
        <h3>Interactive teaching (advanced)</h3>
        <p className="muted small">
          {lesson.teach?.length
            ? `This lesson teaches in ${lesson.teach.length} interactive parts, each with a visual, a quick think, and backup approaches (analogy, worked example, simpler step) for when a kid is stuck.`
            : "This lesson has no interactive teaching yet, so kids read it and take the check."}{" "}
          Edit it here as JSON if you&apos;re comfortable; leave it as is otherwise. Invalid parts are dropped, never the whole lesson.
        </p>
        <details>
          <summary>Show the interactive teaching JSON</summary>
          <textarea
            name="teaching"
            rows={24}
            defaultValue={lesson.teach?.length ? JSON.stringify(teaching, null, 2) : ""}
            style={{ fontFamily: "ui-monospace, monospace", fontSize: ".85rem" }}
          />
        </details>
        <p />
        <button className="btn">Save lesson</button>
      </form>
    </main>
  );
}
