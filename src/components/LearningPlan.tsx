import { addTestScoreAction, deleteTestScoreAction } from "@/app/actions";
import { DRILL } from "@/content/schedule";
import type { AccuracyBand } from "@/lib/engine/learningPlan";
import { drillStats, goalProgress, learningPlan, testScores, today, type Kid } from "@/lib/store";

const BAND: Record<AccuracyBand, { label: string; text: string; cls: string }> = {
  "too-easy": { label: "Too easy", text: "Over 95% right. The material isn't stretching them; they may be ready to move faster.", cls: "warn" },
  "on-target": { label: "In the learning zone", text: "70–95% right: hard enough to learn, easy enough to keep going.", cls: "ok" },
  "too-hard": { label: "Too hard or guessing", text: "Under 70% right. They may need to go back to basics, or they're rushing.", cls: "bad" },
  "not-enough-data": { label: "Not enough data yet", text: "Needs 20+ questions this week.", cls: "" },
};

/** Score-over-time sparkline for one subject's test results. */
function ScoreChart({ points }: { points: { day: string; score: number }[] }) {
  if (points.length < 2) return null;
  const W = 320;
  const H = 90;
  const lo = Math.min(...points.map((p) => p.score)) - 5;
  const hi = Math.max(...points.map((p) => p.score)) + 5;
  const x = (i: number) => 20 + (i / (points.length - 1)) * (W - 40);
  const y = (s: number) => H - 15 - ((s - lo) / (hi - lo)) * (H - 30);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W }} role="img" aria-label="Test scores over time">
      <polyline points={points.map((p, i) => `${x(i)},${y(p.score)}`).join(" ")} fill="none" stroke="var(--brand)" strokeWidth={2.5} />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(p.score)} r={4} fill="var(--brand)" />
          <text x={x(i)} y={y(p.score) - 8} fontSize={11} textAnchor="middle" fill="var(--ink)">
            {p.score}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function LearningPlan({ kid }: { kid: Kid }) {
  const plan = learningPlan(kid);
  const goal = goalProgress(kid);
  const drills = drillStats(kid.id);
  const scores = testScores(kid.id);
  const band = BAND[plan.accuracy.band];
  const subjects = [...new Set(scores.map((s) => s.subject))];
  const gap = plan.knowledgeGrade - plan.ageGrade;

  return (
    <>
      <div className="card">
        <h2>Learning plan</h2>
        <div className="stats" style={{ marginBottom: 14 }}>
          <div className="stat">
            <div className="v">{plan.ageGrade}</div>
            <div className="k">age grade (grade of record)</div>
          </div>
          <div className="stat">
            <div className="v">{plan.knowledgeGrade > 8 ? "8+" : plan.knowledgeGrade}</div>
            <div className="k">knowledge grade in math (first grade under 90% mastered)</div>
          </div>
          <div className="stat">
            <div className="v">{gap === 0 ? "On level" : gap > 0 ? `+${gap}` : gap}</div>
            <div className="k">{gap > 0 ? "grades ahead" : gap < 0 ? "grades to catch up" : ""}</div>
          </div>
          <div className="stat">
            <div className="v">{plan.masteredRecently}</div>
            <div className="k">skills mastered in the last {plan.weeksObserved} weeks ({plan.minutesRecently} min practiced)</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Grade</th>
              <th>Mastered</th>
              <th>Done</th>
              <th>Weeks to finish at current pace</th>
              <th>With +1 hour a day</th>
            </tr>
          </thead>
          <tbody>
            {plan.grades.map((g) => (
              <tr key={g.grade} style={{ fontWeight: g.grade === plan.knowledgeGrade ? 700 : undefined }}>
                <td>{g.grade}</td>
                <td>
                  {g.mastered} / {g.total}
                </td>
                <td>
                  <div className="bar" style={{ width: 90, display: "inline-block", verticalAlign: "middle" }}>
                    <span style={{ width: `${g.pct}%` }} />
                  </div>{" "}
                  <span className="small">{g.pct}%</span>
                </td>
                <td>{g.forecast.weeks === 0 ? "✓ done" : g.forecast.weeks === null ? <span className="muted">needs more practice data</span> : `~${g.forecast.weeks}`}</td>
                <td>{g.forecast.weeksWithExtraHour === 0 ? "" : g.forecast.weeksWithExtraHour === null ? "" : `~${g.forecast.weeksWithExtraHour}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted small">
          A grade counts as done at 90% of its skills mastered. Forecasts use the last few weeks of pace and assume more practice
          time means proportionally more mastery: a rough guide, not a promise.
        </p>
        {goal && (
          <p>
            <strong>{kid.name}&apos;s goal:</strong> finish grade {goal.grade} by {goal.target_day}.{" "}
            {goal.done ? "Reached! 🎉" : `${goal.remaining} skills left in ${goal.days} days (about ${goal.perSchoolDay >= 1 ? `${goal.perSchoolDay} per school day` : `${goal.perWeek} a week`}).`}
          </p>
        )}
      </div>

      <div className="card">
        <h2>Learning efficiency (last 7 days)</h2>
        <div className="row">
          <div>
            <h3 style={{ margin: "0 0 6px" }}>Accuracy</h3>
            <div className={`band ${band.cls}`}>
              {plan.accuracy.total ? Math.round((plan.accuracy.correct / plan.accuracy.total) * 100) : 0}% · {band.label}
            </div>
            <p className="muted small">{band.text}</p>
          </div>
          <div>
            <h3 style={{ margin: "0 0 6px" }}>Waste meter</h3>
            <div className="bar" style={{ height: 14 }}>
              <span style={{ width: `${plan.waste.pct}%`, background: plan.waste.pct > 30 ? "var(--bad)" : plan.waste.pct > 15 ? "var(--warn)" : "var(--good)" }} />
            </div>
            <p className="small">
              <strong>{plan.waste.pct}%</strong> of practice time wasted · {plan.waste.rushed} rushed guesses ·{" "}
              {plan.waste.skippedExplanations} of {plan.waste.wrongAnswers} wrong answers moved past without reading the explanation
              · {plan.waste.idleMinutes} idle min
            </p>
            <p className="muted small">Under 15% is good. Kids who waste less finish their academics in less time.</p>
          </div>
        </div>
        <h3 style={{ margin: "12px 0 6px" }}>Math-fact fluency (best in last 30 days)</h3>
        <div className="row">
          {drills.map((d) => (
            <div key={d.op} className="stat" style={{ flex: "0 1 140px" }}>
              <div className="v">
                {d.op} {d.best || "–"}
              </div>
              <div className="k">
                {d.fluent ? "fluent ✓" : `per minute (fluent ${DRILL.fluentPerMinute}+)`} · {d.runs} drills
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" id="tests">
        <h2>Outside test scores</h2>
        <p className="muted small">
          Record standardized test results (like NWEA MAP, 3 times a year) to check the portal against an outside measure.
          Achievement percentile = how much they know vs. kids their age. Growth percentile = how fast they&apos;re learning.
        </p>
        {subjects.map((subj) => (
          <div key={subj} style={{ marginBottom: 10 }}>
            <strong>{subj}</strong>
            <ScoreChart points={scores.filter((s) => s.subject === subj).map((s) => ({ day: s.test_day, score: s.score }))} />
          </div>
        ))}
        {scores.length > 0 && (
          <table style={{ marginBottom: 14 }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Test</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Achievement %ile</th>
                <th>Growth %ile</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => (
                <tr key={s.id}>
                  <td>{s.test_day}</td>
                  <td>{s.test}</td>
                  <td>{s.subject}</td>
                  <td>{s.score}</td>
                  <td>{s.achievement_pct ?? ""}</td>
                  <td>{s.growth_pct ?? ""}</td>
                  <td>
                    <form action={deleteTestScoreAction}>
                      <input type="hidden" name="kidId" value={kid.id} />
                      <input type="hidden" name="id" value={s.id} />
                      <button className="linkbtn small">delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form action={addTestScoreAction} className="noprint">
          <input type="hidden" name="kidId" value={kid.id} />
          <div className="row">
            <div>
              <label>Test date</label>
              <input name="testDay" type="date" defaultValue={today()} required />
            </div>
            <div>
              <label>Test</label>
              <input name="test" defaultValue="MAP Growth" maxLength={40} />
            </div>
            <div>
              <label>Subject</label>
              <select name="subject" defaultValue="Math">
                {["Math", "Reading", "Language Usage", "Science"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Score (RIT)</label>
              <input name="score" type="number" min={1} max={2000} required />
            </div>
            <div>
              <label>Achievement %ile</label>
              <input name="achievementPct" type="number" min={1} max={99} />
            </div>
            <div>
              <label>Growth %ile</label>
              <input name="growthPct" type="number" min={1} max={99} />
            </div>
          </div>
          <p />
          <button className="btn">Add score</button>
        </form>
      </div>
    </>
  );
}
