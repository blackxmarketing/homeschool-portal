import Link from "next/link";
import ParentNav from "@/components/ParentNav";
import { requireParent } from "@/lib/auth";
import { REQUIRED_AVG_HOURS, REQUIRED_DAYS } from "@/lib/compliance";
import { gradeProgress } from "@/lib/engine/planner";
import { compliance, kidFlags, listKids, minutesOnDay, placementStatus, skillStates, today, weekStats } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ParentHome() {
  const s = await requireParent();
  const kids = listKids(s.familyId);

  return (
    <main className="wrap">
      <ParentNav title="Family overview" />
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
