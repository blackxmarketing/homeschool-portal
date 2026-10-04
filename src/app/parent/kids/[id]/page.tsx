import Link from "next/link";
import { notFound } from "next/navigation";
import ParentNav from "@/components/ParentNav";
import LearningPlan from "@/components/LearningPlan";
import SummaryButton from "@/components/SummaryButton";
import { deleteActivityAction, logActivityAction } from "@/app/actions";
import { aiEnabled } from "@/lib/ai";
import { requireParent } from "@/lib/auth";
import { SUBJECTS } from "@/lib/compliance";
import { STRANDS } from "@/lib/curriculum/skills";
import { addDays } from "@/lib/engine/mastery";
import { KIND_LABEL } from "@/content/quests";
import { activities, getKid, kidFlags, questLog, recentMastered, recentTutorMessages, skillTable, today, weekStats } from "@/lib/store";
import { allTeachers, features } from "@/lib/content";
import CourseProgress from "@/components/CourseProgress";
import LearnerProfile from "@/components/LearnerProfile";

export const dynamic = "force-dynamic";

export default async function KidDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; logged?: string }>;
}) {
  const s = await requireParent();
  const kid = getKid(Number((await params).id));
  if (!kid || kid.family_id !== s.familyId) notFound();
  const { error, logged } = await searchParams;
  const FEATURES = features();
  const TEACHER_NAME: Record<string, string> = Object.fromEntries(Object.values(allTeachers()).map((t) => [t.id, t.name]));

  const skills = skillTable(kid.id);
  const week = weekStats(kid.id);
  const flags = kidFlags(kid.id);
  const mastered = recentMastered(kid.id, addDays(today(), -30));
  const log = activities(kid.id, addDays(today(), -14));
  const quests = questLog(kid.id, addDays(today(), -30));
  const chats = recentTutorMessages(kid.id, addDays(today(), -6)).reverse();
  const strandLabel = Object.fromEntries(STRANDS.map((x) => [x.id, x.label]));

  return (
    <main className="wrap">
      <ParentNav title={`${kid.avatar} ${kid.name}`} />
      {error && <div className="error">{error}</div>}
      {logged && <div className="notice">Activity logged.</div>}

      <div className="stats" style={{ marginBottom: 18 }}>
        <div className="stat">
          <div className="v">{week.minutes}</div>
          <div className="k">math minutes, last 7 days</div>
        </div>
        <div className="stat">
          <div className="v">{week.questions}</div>
          <div className="k">questions answered</div>
        </div>
        <div className="stat">
          <div className="v">{week.questions ? Math.round((week.correct / week.questions) * 100) : 0}%</div>
          <div className="k">correct</div>
        </div>
        <div className="stat">
          <div className="v">{week.hints}</div>
          <div className="k">hints used</div>
        </div>
      </div>

      <div className="card">
        <h2>This week</h2>
        {flags.length === 0 && <p className="muted">No concerns flagged.</p>}
        {flags.map((f, i) => (
          <div className="flag" key={i}>
            ⚠️ {f.skillTitle ? `${f.skillTitle}: ` : ""}
            {f.message}
          </div>
        ))}
        <p>
          <strong>Mastered in the last 30 days:</strong>{" "}
          {mastered.length ? mastered.map((m) => m.title).join(", ") : <span className="muted">none yet</span>}
        </p>
        {aiEnabled() ? (
          <SummaryButton kidId={kid.id} />
        ) : (
          <p className="muted small">Add an ANTHROPIC_API_KEY on the server to get AI-written weekly summaries and tutor hints.</p>
        )}
      </div>

      <LearnerProfile kidId={kid.id} name={kid.name} />
      {FEATURES.twoHourDay && <LearningPlan kid={kid} />}
      {FEATURES.courses && <CourseProgress kidId={kid.id} name={kid.name} />}

      <div className="card">
        <h2>Side quests and missions (last 30 days)</h2>
        {quests.length === 0 ? (
          <p className="muted">None yet. Side quests pop up during practice, and missions are on the kid&apos;s home page.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Quest</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quests.map((q) => (
                <tr key={q.id}>
                  <td>{q.day}</td>
                  <td className="small">{KIND_LABEL[q.kind]}</td>
                  <td>
                    {q.title}
                    {q.response && <div className="quote">&ldquo;{q.response}&rdquo;</div>}
                  </td>
                  <td>
                    <span className={`pill ${q.status === "approved" || q.status === "done" ? "mastered" : q.status === "pending" ? "learning" : ""}`}>
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>Teacher conversations (last 7 days)</h2>
        <p className="muted small">
          Everything {kid.name} said to the AI teachers and what they said back.{" "}
          {aiEnabled() ? "" : "AI is off (no ANTHROPIC_API_KEY), so teachers reply with the built-in hints and solutions."}
        </p>
        {chats.length === 0 ? (
          <p className="muted">No conversations yet.</p>
        ) : (
          <div className="chatlog">
            {chats.map((m) => (
              <div key={m.id} className={`chatline ${m.role}`}>
                <span className="muted small">
                  {m.day} · {m.skillTitle} · {m.kind === "why" ? "why wrong" : m.kind} ·{" "}
                  {m.role === "kid" ? kid.name : TEACHER_NAME[m.teacher_id] ?? "Teacher"}
                </span>
                <div>{m.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card noprint">
        <h2>Log learning outside the portal</h2>
        <p className="muted small">
          Reading, writing, science, history, field trips, projects. Everything here counts toward Colorado's 172 days and 4
          hours a day. Math done in the portal is logged automatically.
        </p>
        <form action={logActivityAction}>
          <input type="hidden" name="kidId" value={kid.id} />
          <div className="row">
            <div>
              <label htmlFor="day">Date</label>
              <input id="day" name="day" type="date" defaultValue={today()} required />
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" required defaultValue="Reading">
                {SUBJECTS.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="minutes">Minutes</label>
              <input id="minutes" name="minutes" type="number" min={1} max={600} defaultValue={30} required />
            </div>
          </div>
          <label htmlFor="note">What did they do? (optional)</label>
          <input id="note" name="note" placeholder="Read 2 chapters of Hatchet and narrated them back" maxLength={300} />
          <p />
          <button className="btn">Log it</button>
        </form>
        {log.length > 0 && (
          <table style={{ marginTop: 16 }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Min</th>
                <th>Note</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {log.map((a) => (
                <tr key={a.id}>
                  <td>{a.day}</td>
                  <td>{a.subject}</td>
                  <td>{a.minutes}</td>
                  <td>{a.note}</td>
                  <td>
                    <form action={deleteActivityAction}>
                      <input type="hidden" name="kidId" value={kid.id} />
                      <input type="hidden" name="id" value={a.id} />
                      <button className="linkbtn small">delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>Math skills by standard</h2>
        <p className="muted small">
          Standard codes follow the grade-level codes used in the Colorado Academic Standards for math. “Placement” means the
          skill was shown known during the placement test; it still gets spaced reviews.
        </p>
        <table>
          <thead>
            <tr>
              <th>Grade</th>
              <th>Code</th>
              <th>Skill</th>
              <th>Area</th>
              <th>Status</th>
              <th>Next review</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((sk) => (
              <tr key={sk.id}>
                <td>{sk.grade}</td>
                <td className="small">{sk.code}</td>
                <td>{sk.title}</td>
                <td className="small muted">{strandLabel[sk.strand]}</td>
                <td>
                  <span className={`pill ${sk.status}`}>
                    {sk.status}
                    {sk.source === "placement" ? " (placement)" : ""}
                  </span>
                </td>
                <td className="small">{sk.nextReview ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/parent">← Back</Link>
    </main>
  );
}
