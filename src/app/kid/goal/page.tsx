import Link from "next/link";
import { setGoalAction } from "@/app/actions";
import { requireKid } from "@/lib/auth";
import { addDays } from "@/lib/engine/mastery";
import { getGoal, learningPlan, today } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function GoalPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { kid } = await requireKid();
  const { error } = await searchParams;
  const plan = learningPlan(kid);
  const goal = getGoal(kid.id);
  const current = plan.grades.find((g) => g.grade === Math.min(plan.knowledgeGrade, 8));

  return (
    <main className="wrap" style={{ maxWidth: 640 }}>
      <div className="topbar">
        <Link href="/kid" className="backlink">
          ← Base
        </Link>
      </div>
      <div className="kcard">
        <h1>🎯 Set your goal</h1>
        <p className="kmuted">
          Big goals become easy when you break them into daily steps. Pick a grade to finish and a date. The portal shows you
          how many skills a day it takes.
        </p>
        {current?.forecast.weeks ? (
          <p>
            At your current pace you&apos;ll finish grade {current.grade} in about <strong>{current.forecast.weeks} weeks</strong>.
            With an extra hour a day: about <strong>{current.forecast.weeksWithExtraHour} weeks</strong>.
          </p>
        ) : null}
        {error && <div className="error">{error}</div>}
        <form action={setGoalAction} className="row" style={{ alignItems: "end" }}>
          <div>
            <label htmlFor="grade">Finish grade</label>
            <select id="grade" name="grade" className="kinput" defaultValue={goal?.grade ?? Math.min(plan.knowledgeGrade, 8)}>
              {[3, 4, 5, 6, 7, 8].map((g) => (
                <option key={g} value={g}>
                  Grade {g} math
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="target">By</label>
            <input
              id="target"
              name="target"
              type="date"
              className="kinput"
              min={addDays(today(), 1)}
              defaultValue={goal?.target_day ?? addDays(today(), 90)}
              required
            />
          </div>
          <div>
            <button className="kbtn big">Lock it in</button>
          </div>
        </form>
      </div>
    </main>
  );
}
