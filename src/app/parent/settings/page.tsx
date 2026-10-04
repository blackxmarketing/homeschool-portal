import ParentNav from "@/components/ParentNav";
import { addKidAction, resetPlacementAction, schoolYearAction, updateKidAction } from "@/app/actions";
import { requireParent } from "@/lib/auth";
import { AVATARS, getFamily, listKids } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Settings({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string; welcome?: string }>;
}) {
  const s = await requireParent();
  const { error, saved, welcome } = await searchParams;
  const kids = listKids(s.familyId);
  const family = getFamily(s.familyId)!;

  return (
    <main className="wrap">
      <ParentNav title="Settings" />
      {welcome && <div className="notice">Account created! Now add your kids below.</div>}
      {saved && <div className="notice">Saved.</div>}
      {error && <div className="error">{error}</div>}

      <div className="card">
        <h2>Add a kid</h2>
        <form action={addKidAction}>
          <div className="row">
            <div>
              <label htmlFor="name">First name</label>
              <input id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="grade">Grade (for records)</label>
              <input id="grade" name="grade" type="number" min={1} max={12} required />
            </div>
            <div>
              <label htmlFor="pin">4-digit PIN</label>
              <input id="pin" name="pin" inputMode="numeric" pattern="\d{4}" maxLength={4} required />
            </div>
            <div>
              <label htmlFor="dailyGoal">Daily math goal (min)</label>
              <input id="dailyGoal" name="dailyGoal" type="number" min={10} max={180} defaultValue={30} required />
            </div>
          </div>
          <label>Avatar</label>
          <div className="row" style={{ gap: 6 }}>
            {AVATARS.map((a, i) => (
              <label key={a} style={{ flex: "0 0 auto", fontSize: "1.6rem", fontWeight: 400, margin: 0 }}>
                <input type="radio" name="avatar" value={a} defaultChecked={i === kids.length % AVATARS.length} style={{ width: "auto" }} />{" "}
                {a}
              </label>
            ))}
          </div>
          <p className="muted small">
            The grade is what you report to the district. The portal finds each kid's real level with its placement test, so
            they can work above or below it.
          </p>
          <button className="btn">Add kid</button>
        </form>
      </div>

      {kids.map((kid) => (
        <div className="card" key={kid.id}>
          <h2>
            {kid.avatar} {kid.name}
          </h2>
          <form action={updateKidAction}>
            <input type="hidden" name="kidId" value={kid.id} />
            <div className="row">
              <div>
                <label>Grade</label>
                <input name="grade" type="number" min={1} max={12} defaultValue={kid.grade} required />
              </div>
              <div>
                <label>Daily math goal (min)</label>
                <input name="dailyGoal" type="number" min={10} max={180} defaultValue={kid.daily_goal_minutes} required />
              </div>
              <div>
                <label>New PIN (leave blank to keep)</label>
                <input name="pin" inputMode="numeric" pattern="\d{4}" maxLength={4} />
              </div>
            </div>
            <p />
            <button className="btn">Save</button>
          </form>
          <form action={resetPlacementAction} style={{ marginTop: 12 }}>
            <input type="hidden" name="kidId" value={kid.id} />
            <button className="linkbtn small">Redo placement test</button>{" "}
            <span className="muted small">(keeps skills already mastered)</span>
          </form>
        </div>
      ))}

      <div className="card">
        <h2>School year</h2>
        <form action={schoolYearAction} className="row" style={{ alignItems: "end" }}>
          <div>
            <label htmlFor="start">School year starts (MM-DD)</label>
            <input id="start" name="start" defaultValue={family.school_year_start} pattern="\d{2}-\d{2}" required />
          </div>
          <div>
            <button className="btn">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}
