import { learnerProfiles, type SubjectProfile } from "@/lib/store";

const STATUS = {
  new: { label: "Getting started", cls: "" },
  ahead: { label: "Ahead 🚀", cls: "ok" },
  "on-track": { label: "On track", cls: "ok" },
  watch: { label: "Early warning ⚠️", cls: "warn" },
  behind: { label: "Falling behind", cls: "bad" },
} as const;

/** The arrow shows the real direction; green when that direction is good, red when it is not. */
const arrow = (n: number, goodWhenUp: boolean) => {
  if (Math.abs(n) < 0.05) return <span className="trend">→</span>;
  const good = n > 0 === goodWhenUp;
  return <span className={`trend ${good ? "up-good" : "up-bad"}`}>{n > 0 ? "↗" : "↘"}</span>;
};

function SubjectCard({ s, name }: { s: SubjectProfile; name: string }) {
  const p = s.profile;
  const st = STATUS[p.status];
  const helpName = { hint: "targeted hints", analogy: "analogies", example: "worked examples" } as const;
  return (
    <div className={`profile-card ${st.cls}`}>
      <div className="profile-head">
        <strong>
          {s.icon} {s.title}
        </strong>
        <span className={`band ${st.cls}`}>{st.label}</span>
      </div>
      {p.status === "new" ? (
        <p className="muted small">{p.reasons[0]}</p>
      ) : (
        <>
          <div className="profile-stats">
            <div>
              <div className="v">
                {Math.round(p.accuracy * 100)}% {arrow(p.accuracyTrend, true)}
              </div>
              <div className="k">right first try</div>
            </div>
            <div>
              <div className="v">
                {p.speed ? `${p.speed.toFixed(1)}×` : "–"} {arrow(p.speedTrend, false)}
              </div>
              <div className="k">time vs expected (lower = faster)</div>
            </div>
            <div>
              <div className="v">
                {Math.round(p.helpRate * 100)}% {arrow(p.helpTrend, false)}
              </div>
              <div className="k">needed help</div>
            </div>
            <div>
              <div className="v">{Math.round(p.mastery * 100)}%</div>
              <div className="k">estimated mastery</div>
            </div>
          </div>
          <ul className="small profile-reasons">
            {p.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          {s.weakest.length > 0 && p.status !== "ahead" && (
            <p className="small">
              <strong>Weakest ideas:</strong> {s.weakest.map((w) => `${w.title} (${Math.round(w.p * 100)}%)`).join(" · ")}
            </p>
          )}
          {s.helps.best && (
            <p className="small">
              <strong>What works for {name}:</strong> when stuck, {helpName[s.helps.best]} turn it around most often ({s.helps.counts.hint} hint,{" "}
              {s.helps.counts.analogy} analogy, {s.helps.counts.example} example rescues).
            </p>
          )}
          {s.key !== "math" && s.adaptation.mode !== "standard" && (
            <div className="profile-adapt small">
              <strong>How the coach is adapting:</strong> {s.adaptation.why.slice(0, s.adaptation.mode === "challenge" ? 1 : 3).join(" · ")}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * The learner model per subject: accuracy, speed of knowledge, help-seeking,
 * trends and early warnings, plus what the coach is changing in response.
 */
export default function LearnerProfile({ kidId, name }: { kidId: number; name: string }) {
  const subjects = learnerProfiles(kidId);
  return (
    <div className="card">
      <h2>Learning profile</h2>
      <p className="muted small">
        Built from every answer {name} gives: right or wrong on the first try, how fast compared with the expected time, and whether
        help was needed. Early warnings appear when accuracy slides, help requests climb or answers slow down, before scores drop.
        The coach adapts automatically.
      </p>
      <div className="profile-grid">
        {subjects.map((s) => (
          <SubjectCard key={s.key} s={s} name={name} />
        ))}
      </div>
    </div>
  );
}
