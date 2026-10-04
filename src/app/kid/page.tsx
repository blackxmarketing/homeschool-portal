import Link from "next/link";
import { logoutAction } from "../actions";
import { requireKid } from "@/lib/auth";
import { gradeProgress } from "@/lib/engine/planner";
import { extendPlan, minutesOnDay, placementStatus, skillStates, streak, today, todaysPlan } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function KidHome({ searchParams }: { searchParams: Promise<{ more?: string }> }) {
  const { kid } = await requireKid();
  if ((await searchParams).more) extendPlan(kid.id);

  const minutes = minutesOnDay(kid.id, today());
  const goalPct = Math.min(100, Math.round((minutes / kid.daily_goal_minutes) * 100));
  const placement = placementStatus(kid.id);
  const plan = kid.placement_done ? todaysPlan(kid.id) : [];
  const allDone = plan.length > 0 && plan.every((p) => p.done);
  const grades = gradeProgress(skillStates(kid.id)).filter((g) => g.mastered > 0 || g.grade <= kid.grade + 1);

  return (
    <main className="wrap">
      <div className="topbar">
        <h1>
          {kid.avatar} Hi, {kid.name}!
        </h1>
        <nav>
          <Link href="/kid/map">My skill map</Link>
          <form action={logoutAction}>
            <button className="linkbtn">Log out</button>
          </form>
        </nav>
      </div>

      <div className="stats" style={{ marginBottom: 18 }}>
        <div className="stat">
          <div className="v">{kid.xp.toLocaleString()}</div>
          <div className="k">XP</div>
        </div>
        <div className="stat">
          <div className="v">{streak(kid.id)} 🔥</div>
          <div className="k">day streak</div>
        </div>
        <div className="stat">
          <div className="v">
            {minutes}/{kid.daily_goal_minutes}
          </div>
          <div className="k">math minutes today</div>
          <div className="bar" style={{ marginTop: 6 }}>
            <span style={{ width: `${goalPct}%` }} />
          </div>
        </div>
      </div>

      {!kid.placement_done ? (
        <div className="card">
          <h2>🗺️ Placement quest</h2>
          <p>
            Before we build your plan, let's find out what you already know. Some questions will be easy and some will be
            tricky. Just do your best! You can stop and come back any time.
          </p>
          {placement.done > 0 && (
            <p className="muted">
              Progress: {placement.done} of {placement.total} parts done.
            </p>
          )}
          <Link href="/kid/placement" className="btn big">
            {placement.done > 0 ? "Keep going" : "Start the quest"}
          </Link>
        </div>
      ) : (
        <div className="card">
          <h2>Today's math plan</h2>
          {plan.length === 0 ? (
            <p>You've mastered everything available right now. Amazing! Ask a parent what's next.</p>
          ) : (
            <ul className="plan">
              {plan.map((p) => (
                <li key={`${p.type}:${p.skillId}`}>
                  <div>
                    <div className={p.done ? "done" : ""}>
                      {p.type === "review" ? "🔁 Review: " : "⭐ Learn: "}
                      {p.title}
                    </div>
                    <div className="muted small">Grade {p.grade} level</div>
                  </div>
                  {p.done ? (
                    <span className="pill mastered">Done</span>
                  ) : (
                    <Link href={`/kid/practice?skill=${p.skillId}&mode=${p.type}`} className="btn">
                      {p.answeredToday > 0 ? "Continue" : "Start"}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
          {allDone && (
            <div className="notice" style={{ marginTop: 12 }}>
              Plan complete for today! 🎉{" "}
              <Link href="/kid?more=1">Want to keep going?</Link>
            </div>
          )}
        </div>
      )}

      {kid.placement_done ? (
        <div className="card">
          <h2>How far you've come</h2>
          {grades.map((g) => (
            <div key={g.grade} style={{ marginBottom: 10 }}>
              <div className="small">
                Grade {g.grade}: {g.mastered} of {g.total} skills
              </div>
              <div className="bar">
                <span style={{ width: `${(g.mastered / g.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
