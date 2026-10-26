import ParentNav from "@/components/ParentNav";
import { addKidAction, focusAction, miaChildAction, miaPairCodeAction, miaParentCodeAction, miaParentDeviceAction, miaRemoveDeviceAction, miaSettingsAction, parentPinAction, resetPlacementAction, schoolYearAction, updateKidAction } from "@/app/actions";
import { BUDDIES, MIA_SUBJECTS } from "@/content/miacademy";
import { requireParent } from "@/lib/auth";
import { LIMITS } from "@/lib/focus";
import { focusPresets } from "@/lib/content";
import { AVATARS, electivesOff, getFamily, getFocus, getMiaSettings, hasParentPin, listKids, miaChildren, miaDevices, miaParentDevices } from "@/lib/store";

/** Kindergarten is grade 0. */
const GRADES = Array.from({ length: 13 }, (_, i) => i);

const ATTENTION_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes (diagnosed or strongly suspected)" },
  { value: "unsure", label: "Not sure / prefer not to say" },
];

function presetText(key: "yes" | "no" | "unsure") {
  const p = focusPresets()[key];
  return `${p.sprintMinutes}-min sprints, ${p.breakMinutes}-min breaks, a side quest every ${p.sideQuestEvery} questions, ${p.dailyCapMinutes} min/day screen cap`;
}

export const dynamic = "force-dynamic";

export default async function Settings({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string; welcome?: string; code?: string; codeKid?: string; pcode?: string }>;
}) {
  const s = await requireParent();
  const { error, saved, welcome, code, codeKid, pcode } = await searchParams;
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
              <select id="grade" name="grade" required defaultValue="6">
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g === 0 ? "Kindergarten" : `Grade ${g}`}
                  </option>
                ))}
              </select>
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
          <label htmlFor="attention">Does this child have ADHD or trouble keeping focus?</label>
          <select id="attention" name="attention" defaultValue="unsure">
            {ATTENTION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <p className="muted small">
            Every kid gets focus sprints, brain breaks, side quests and a daily screen cap. This answer only sets the starting
            values. Yes: {presetText("yes")}. No: {presetText("no")}. You can change them any time. Only parents see this
            answer.
          </p>
          <p className="muted small">
            The grade is what you report to the district. The portal finds each kid's real level with its placement test, so
            they can work above or below it.
          </p>
          <button className="btn">Add kid</button>
        </form>
      </div>

      <div className="card">
        <h2>Install Focus Buddy</h2>
        <p className="muted small">
          The Chrome extension with the Miacademy timers. Do this on each kid&apos;s computer and on yours, signed in here as a parent.
        </p>
        <a className="btn" href="/focus-buddy/download">
          Download Focus Buddy
        </a>
        <ol className="small" style={{ marginTop: 12 }}>
          <li>Open the downloaded zip&apos;s folder, right-click it, choose Extract All, and extract it into a folder named Focus Buddy in Documents. Keep that folder.</li>
          <li>In Chrome, go to chrome://extensions and turn on Developer mode.</li>
          <li>Click Load unpacked and pick the Focus Buddy folder.</li>
          <li>Pin Focus Buddy (puzzle-piece menu), click it, and type a connect code from below: each kid&apos;s own code on their computer, the parent code on yours.</li>
        </ol>
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
                <select name="grade" defaultValue={kid.grade} required>
                  {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g === 0 ? "Kindergarten" : `Grade ${g}`}
                  </option>
                ))}
                </select>
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
            {kid.grade <= 5 && (
              <label className="small" style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
                <input type="checkbox" name="elective_span" defaultChecked={!electivesOff(kid.id).includes("span")} />
                Spanish elective (grades K-5). When it&apos;s off, the Spanish zone in {kid.name}&apos;s world is closed.
              </label>
            )}
            <input type="hidden" name="electives" value="1" />
            <p />
            <button className="btn">Save</button>
          </form>
          <FocusForm kidId={kid.id} name={kid.name} />
          <MiaForm kidId={kid.id} name={kid.name} />
          <MiaExtension familyId={s.familyId} kidId={kid.id} name={kid.name} code={Number(codeKid) === kid.id ? code : undefined} />
          <form action={resetPlacementAction} style={{ marginTop: 12 }}>
            <input type="hidden" name="kidId" value={kid.id} />
            <button className="linkbtn small">Redo placement test</button>{" "}
            <span className="muted small">(keeps skills already mastered)</span>
          </form>
        </div>
      ))}

      <ParentMode familyId={s.familyId} code={pcode} kids={kids.map((k) => ({ id: k.id, name: k.name }))} />

      <div className="card">
        <h2>Parent PIN</h2>
        <p className="muted small">
          {hasParentPin(s.familyId) ? "A parent PIN is set. Enter a new one to change it." : "No parent PIN yet."} It restarts a
          Miacademy timer on a kid&apos;s screen after they asked for help. Keep it secret from the kids.
        </p>
        <form action={parentPinAction} className="row" style={{ alignItems: "end" }}>
          <div>
            <label htmlFor="ppin">New PIN (4-6 digits)</label>
            <input id="ppin" name="pin" type="password" inputMode="numeric" pattern="d{4,6}" maxLength={6} autoComplete="new-password" required />
          </div>
          <div>
            <label htmlFor="ppin2">Type it again</label>
            <input id="ppin2" name="pin2" type="password" inputMode="numeric" pattern="d{4,6}" maxLength={6} autoComplete="new-password" required />
          </div>
          <div>
            <button className="btn">Save PIN</button>
          </div>
        </form>
      </div>

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

function FocusForm({ kidId, name }: { kidId: number; name: string }) {
  const f = getFocus(kidId);
  const num = (field: keyof typeof LIMITS, label: string, value: number) => (
    <div>
      <label>{label}</label>
      <input name={field} type="number" min={LIMITS[field][0]} max={LIMITS[field][1]} defaultValue={value} required />
    </div>
  );
  return (
    <form action={focusAction} className="focus-box">
      <input type="hidden" name="kidId" value={kidId} />
      <h3>Focus and learning toolkit</h3>
      <label>Does {name} have ADHD or trouble keeping focus?</label>
      <select name="attention" defaultValue={f.attention}>
        {ATTENTION_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="row">
        {num("sprintMinutes", "Sprint length (min)", f.sprintMinutes)}
        {num("breakMinutes", "Break length (min)", f.breakMinutes)}
        {num("sideQuestEvery", "Side quest every N questions", f.sideQuestEvery)}
        {num("dailyCapMinutes", "Daily screen cap (min)", f.dailyCapMinutes)}
      </div>
      <p className="muted small">
        Sprints are timed work blocks (the Pomodoro method) followed by a movement break. Side quests mix in puzzles and creative
        challenges to keep things fresh. After the screen cap, the portal stops giving questions and points to off-screen
        missions.
      </p>
      <div className="row" style={{ alignItems: "center" }}>
        <button className="btn" style={{ flex: "0 0 auto" }}>
          Save focus settings
        </button>
        <button className="btn secondary" name="preset" value="1" style={{ flex: "0 0 auto" }}>
          Reset to recommended for this answer
        </button>
      </div>
    </form>
  );
}

function MiaForm({ kidId, name }: { kidId: number; name: string }) {
  const m = getMiaSettings(kidId);
  return (
    <form action={miaSettingsAction} className="focus-box">
      <input type="hidden" name="kidId" value={kidId} />
      <h3>Miacademy timers</h3>
      <p className="muted small">
        Four 30-minute timers (Math, Language Arts, Science, History) on the right of {name}&apos;s screen while Miacademy is open.
        Each runs once a day; you can allow another from the family overview.
      </p>
      <label className="small" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" name="allowPause" defaultChecked={m.allowPause} style={{ width: "auto" }} />
        {name} can pause a timer (asks &quot;I need help&quot; or &quot;I need a break&quot;)
      </label>
      <label className="small" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" name="helpPin" defaultChecked={m.helpPin} style={{ width: "auto" }} />
        Parent PIN needed to restart a timer after &quot;I need help&quot;
      </label>
      <div className="row">
        <div>
          <label>Break length (one break per subject)</label>
          <select name="breakMinutes" defaultValue={m.breakMinutes}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} min
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>{name}&apos;s animal buddy</label>
          <select name="buddy" defaultValue={m.buddy}>
            {BUDDIES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label style={{ marginTop: 10 }}>Step-by-step checklist: lessons a week</label>
      <div className="row">
        {MIA_SUBJECTS.map((s) => (
          <div key={s.id}>
            <label className="small">{s.name}</label>
            <select name={`lessons_${s.id}`} defaultValue={m.lessonsPerWeek[s.id] ?? 0}>
              <option value={0}>Off</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <p className="muted small">
        Language Arts follows its own plan once it&apos;s on (any number): Reading Comprehension 1 lesson a week (Mondays, first 15
        minutes), Edition 1 1 lesson a week (Tuesday-Thursday, first 15 minutes), and Level E (Revised) 2 lessons a week the rest
        of the time; the lesson before each unit assessment gets 4 days. Plain Level G (no edition): 2 lessons a week, and a unit
        project or portfolio gets 4 days. Each kid only gets the classes they take.
      </p>
      <p className="muted small">
        The checklist follows {name}&apos;s Miacademy lessons: the activities on each lesson&apos;s PDF, minus online practice and
        optional or bonus ones. Worksheets are checked from a photo against the answer key; anything needing supplies pauses the
        timer and waits for you to approve it.
      </p>
      <button className="btn" style={{ flex: "0 0 auto" }}>
        Save Miacademy settings
      </button>
    </form>
  );
}

function MiaExtension({ familyId, kidId, name, code }: { familyId: number; kidId: number; name: string; code?: string }) {
  const devices = miaDevices(familyId).filter((d) => d.kid_id === kidId);
  const when = (at: number) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: process.env.APP_TIMEZONE ?? "America/Denver" }).format(at);
  return (
    <div className="focus-box" id={`ext-${kidId}`}>
      <h3>Chrome extension on {name}&apos;s computer</h3>
      <p className="muted small">
        The extension puts the timers on the right of every Miacademy page. Install it in Chrome on {name}&apos;s computer, click its
        icon, and type a connect code from here.
      </p>
      {code && (
        <div className="notice">
          Connect code for {name}: <strong style={{ fontSize: "1.4rem", letterSpacing: "0.15em" }}>{code}</strong>
          <div className="muted small">Works once, for the next 15 minutes.</div>
        </div>
      )}
      {devices.length > 0 && (
        <table>
          <tbody>
            {devices.map((d, i) => (
              <tr key={d.id}>
                <td>Computer {i + 1}</td>
                <td className="muted small">
                  connected {when(d.created_at)} · last used {when(d.last_seen)}
                </td>
                <td>
                  <form action={miaRemoveDeviceAction}>
                    <input type="hidden" name="deviceId" value={d.id} />
                    <button className="linkbtn small">Disconnect</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <form action={miaPairCodeAction}>
        <input type="hidden" name="kidId" value={kidId} />
        <button className="btn secondary">Make a connect code</button>
      </form>
    </div>
  );
}

function ParentMode({ familyId, code, kids }: { familyId: number; code?: string; kids: { id: number; name: string }[] }) {
  const devices = miaParentDevices(familyId);
  const children = miaChildren(familyId);
  const when = (at: number) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: process.env.APP_TIMEZONE ?? "America/Denver" }).format(at);
  return (
    <div className="card" id="focus-buddy-parent">
      <h2>Focus Buddy on a parent&apos;s computer</h2>
      <p className="muted small">
        With Focus Buddy installed on your computer too, opening your Miacademy parent page lets it read (never change) each child&apos;s
        calendar for this week and the next five, and every course page (each lesson you checked, with its PDF and answer key). The kids&apos; checklists then come straight from the tasks you marked in Miacademy, the whole class ahead of time,
        with every lesson&apos;s videos, practice levels, quiz and PDF known ahead. Open each child&apos;s page about once a week.
      </p>
      {code && (
        <div className="notice">
          Parent connect code: <strong style={{ fontSize: "1.4rem", letterSpacing: "0.15em" }}>{code}</strong>
          <div className="muted small">Type it into Focus Buddy on your computer. Works once, for the next 15 minutes.</div>
        </div>
      )}
      {devices.length > 0 && (
        <table>
          <tbody>
            {devices.map((d, i) => (
              <tr key={d.id}>
                <td>Parent computer {i + 1}</td>
                <td className="muted small">
                  connected {when(d.created_at)} · last used {when(d.last_seen)}
                </td>
                <td>
                  <form action={miaParentDeviceAction}>
                    <input type="hidden" name="deviceId" value={d.id} />
                    <button className="linkbtn small">Disconnect</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <form action={miaParentCodeAction}>
        <button className="btn secondary">Make a parent connect code</button>
      </form>
      {children.length > 0 && (
        <>
          <h3 style={{ marginTop: 16 }}>Miacademy students</h3>
          <table>
            <tbody>
              {children.map((c) => (
                <tr key={c.child}>
                  <td>{c.name}</td>
                  <td className="muted small">calendar read {when(c.seen_at)}</td>
                  <td>
                    <form action={miaChildAction} className="row" style={{ alignItems: "center", gap: 6 }}>
                      <input type="hidden" name="child" value={c.child} />
                      <select name="kidId" defaultValue={c.kid_id ?? ""}>
                        <option value="">Not matched</option>
                        {kids.map((k) => (
                          <option key={k.id} value={k.id}>
                            {k.name}
                          </option>
                        ))}
                      </select>
                      <button className="linkbtn small">Save</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
