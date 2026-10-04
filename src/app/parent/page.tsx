import Link from "next/link";
import ParentNav from "@/components/ParentNav";
import { requireParent } from "@/lib/auth";
import { REQUIRED_AVG_HOURS, REQUIRED_DAYS } from "@/lib/compliance";
import { gradeProgress } from "@/lib/engine/planner";
import { reviewBlockAction, reviewCourseTaskAction, reviewMissionAction } from "@/app/actions";
import { levelInfo } from "@/lib/game";
import {
  compliance,
  getFocus,
  kidFlags,
  listKids,
  minutesOnDay,
  pendingBlocks,
  pendingCourseTasks,
  pendingMissions,
  placementStatus,
  skillStates,
  today,
  weekStats,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ParentHome({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const s = await requireParent();
  const kids = listKids(s.familyId);
  const pending = pendingMissions(s.familyId);
  const blocks = pendingBlocks(s.familyId);
  const courseTasks = pendingCourseTasks(s.familyId);
  const { error } = await searchParams;

  return (
    <main className="wrap">
      <ParentNav title="Family overview" />
      {error && <div className="error">{error}</div>}
      {courseTasks.length > 0 && (
        <div className="card">
          <h2>📚 Projects, labs and speeches to check ({courseTasks.length})</h2>
          <p className="muted small">
            Course tasks done off-screen. Approving finishes the lesson: +50 XP and its minutes logged for your records. &quot;Not yet&quot;
            lets them try again.
          </p>
          <table>
            <tbody>
              {courseTasks.map((t) => (
                <tr key={t.id}>
                  <td>
                    {t.avatar} {t.kidName}
                  </td>
                  <td>
                    <strong>
                      {t.course?.icon} {t.lesson?.title ?? t.lesson_id}
                    </strong>{" "}
                    <span className="muted small">{t.course?.title}</span>
                    <div className="muted small">Task: {t.lesson?.task?.prompt}</div>
                    <div className="quote">{t.task_response}</div>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <form action={reviewCourseTaskAction} style={{ display: "inline" }}>
                      <input type="hidden" name="progressId" value={t.id} />
                      <button className="btn" name="approve" value="1">
                        Approve
                      </button>{" "}
                      <button className="btn secondary" name="approve" value="0">
                        Not yet
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {blocks.length > 0 && (
        <div className="card">
          <h2>⏰ Learning blocks to check ({blocks.length})</h2>
          <p className="muted small">
            Off-screen blocks of the 2-hour day. Approving logs the minutes under the subject in your Colorado records (+25 XP).
          </p>
          <table>
            <tbody>
              {blocks.map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.avatar} {b.kidName}
                  </td>
                  <td>
                    <strong>
                      {b.block?.icon} {b.block?.label ?? b.block_id}
                    </strong>{" "}
                    <span className="muted small">
                      {b.day} · {b.minutes} min of {b.block?.subject}
                    </span>
                    {b.note && <div className="quote">{b.note}</div>}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <form action={reviewBlockAction} style={{ display: "inline" }}>
                      <input type="hidden" name="logId" value={b.id} />
                      <button className="btn" name="approve" value="1">
                        Approve
                      </button>{" "}
                      <button className="btn secondary" name="approve" value="0">
                        Not yet
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pending.length > 0 && (
        <div className="card">
          <h2>🌍 Missions to check ({pending.length})</h2>
          <p className="muted small">
            Your kids say they finished these off-screen missions. Approving one gives the XP and logs the minutes under its
            subject in your Colorado records.
          </p>
          <table>
            <tbody>
              {pending.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.avatar} {m.kidName}
                  </td>
                  <td>
                    <strong>{m.title}</strong>
                    <div className="muted small">
                      {m.day} · {m.minutes} min of {m.subject} · +{m.xp} XP
                    </div>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <form action={reviewMissionAction} style={{ display: "inline" }}>
                      <input type="hidden" name="logId" value={m.id} />
                      <button className="btn" name="approve" value="1">
                        Approve
                      </button>{" "}
                      <button className="btn secondary" name="approve" value="0">
                        Not yet
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {kids.length === 0 && (
        <div className="card">
          Add your kids in <Link href="/parent/settings">Settings</Link> to get started.
        </div>
      )}
      <div className="grid">
        {kids.map((kid) => {
          const states = skillStates(kid.id);
          const mastered = [...states.values()].filter((v) => v.status === "mastered").length;
          const grades = gradeProgress(states);
          // Highest grade where at least 80% of skills are mastered.
          const solid = grades.filter((g) => g.mastered / g.total >= 0.8).map((g) => g.grade);
          const workingAt = solid.length ? Math.max(...solid) + 1 : grades[0].grade;
          const week = weekStats(kid.id);
          const flags = kidFlags(kid.id);
          const c = compliance(kid.id, s.familyId);
          const placement = placementStatus(kid.id);
          return (
            <div className="card" key={kid.id}>
              <h2>
                {kid.avatar} {kid.name} <span className="muted small">· grade {kid.grade}</span>
              </h2>
              {!kid.placement_done ? (
                <p className="muted">
                  Placement in progress ({placement.done}/{placement.total} strands).
                </p>
              ) : (
                <p>
                  Math: working at about <strong>grade {Math.min(workingAt, 8)}</strong> level · {mastered} skills mastered
                </p>
              )}
              <p className="small">
                Today: {minutesOnDay(kid.id, today())} min · Last 7 days: {week.minutes} min, {week.questions} questions,{" "}
                {week.questions ? Math.round((week.correct / week.questions) * 100) : 0}% correct
              </p>
              <p className="small">
                Level {levelInfo(kid.xp).level} {levelInfo(kid.xp).rank.title} · {kid.xp.toLocaleString()} XP · focus:{" "}
                {getFocus(kid.id).sprintMinutes}-min sprints, {getFocus(kid.id).dailyCapMinutes} min/day cap
              </p>
              <p className="small">
                School year: {c.days}/{REQUIRED_DAYS} days · avg {c.avgHoursPerDay} h/day (goal {REQUIRED_AVG_HOURS})
              </p>
              {flags.map((f, i) => (
                <div className="flag small" key={i}>
                  ⚠️ {f.skillTitle ? `${f.skillTitle}: ` : ""}
                  {f.message}
                </div>
              ))}
              <Link href={`/parent/kids/${kid.id}`} className="btn" style={{ marginTop: 8 }}>
                Details & log activities
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
