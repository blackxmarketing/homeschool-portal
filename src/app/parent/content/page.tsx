import ParentNav from "@/components/ParentNav";
import { requireParent } from "@/lib/auth";
import { aiEnabled } from "@/lib/ai";
import { SUBJECTS } from "@/lib/compliance";
import { getContent, isCustomized, type ContentKey } from "@/lib/content";
import { STRANDS } from "@/lib/curriculum/skills";
import { WORLDS } from "@/lib/game";
import { KIND_LABEL, THEME_LABEL, type QuestKind, type QuestTheme } from "@/content/quests";
import { LIMITS } from "@/lib/focus";
import {
  resetContentAction,
  saveFeaturesAction,
  saveFocusAction,
  saveQuestsAction,
  saveScheduleAction,
  saveTeachersAction,
} from "./actions";

export const dynamic = "force-dynamic";

const FEATURE_INFO: Record<string, { label: string; text: string }> = {
  sideQuests: { label: "Side quests", text: "Brain benders and creative challenges that pop up during practice." },
  missions: { label: "Real-world missions", text: "Off-screen missions on each kid's home page, approved by you." },
  focusSprints: { label: "Focus sprints and brain breaks", text: "Pomodoro-style timed work blocks with movement breaks." },
  aiTeachers: { label: "AI teachers", text: "Teacher characters: mini-lessons, chat about a question, \"why was I wrong?\"" },
  twoHourDay: { label: "The 2-hour day", text: "Daily block rings, grade towers, goals, fact drills, struggle detector and the learning plan." },
};

const SECTIONS = [
  { id: "features", label: "Features & limits" },
  { id: "schedule", label: "2-hour day" },
  { id: "teachers", label: "AI teachers" },
  { id: "quests", label: "Quests & missions" },
  { id: "focus", label: "Focus presets & breaks" },
];

const ATTENTION_LABEL = { yes: "ADHD / attention challenges: yes", unsure: "Not sure", no: "No" } as const;

function SectionHead({ id, title, keys, note }: { id: string; title: string; keys: ContentKey[]; note: string }) {
  const custom = keys.some((k) => isCustomized(k));
  return (
    <div className="content-head">
      <div>
        <h2>{title}</h2>
        <p className="muted small">{note}</p>
      </div>
      <div className="content-badges">
        <span className={`pill ${custom ? "learning" : ""}`}>{custom ? "Customized" : "Defaults"}</span>
        {custom && (
          <form action={resetContentAction}>
            <input type="hidden" name="section" value={id} />
            <button className="linkbtn small">Reset to defaults</button>
          </form>
        )}
      </div>
    </div>
  );
}

function Num({ name, label, value, min, max }: { name: string; label: string; value: number; min: number; max: number }) {
  return (
    <div>
      <label>{label}</label>
      <input name={name} type="number" min={min} max={max} defaultValue={value} required />
    </div>
  );
}

export default async function ContentPage({ searchParams }: { searchParams: Promise<{ saved?: string; reset?: string }> }) {
  await requireParent();
  const { saved, reset } = await searchParams;
  const features = getContent("features");
  const ai = getContent("aiLimits");
  const drill = getContent("drill");
  const blocks = getContent("schedule");
  const teachers = getContent("teachers");
  const method = getContent("teachingMethod");
  const quests = getContent("quests");
  const presets = getContent("focusPresets");
  const breaks = getContent("breaks");
  const kinds: QuestKind[] = ["brain", "create", "mission"];

  return (
    <main className="wrap">
      <ParentNav title="Content & features" />
      {saved && <div className="notice">Saved. Kids see the change on their next page load.</div>}
      {reset && <div className="notice">Back to the defaults.</div>}
      <p className="muted">
        Everything the kids see beyond the math questions: switch features on or off, shape the 2-hour day, write your
        teachers&apos; personalities, and add your own quests and missions. Each section can go back to its defaults any time.
      </p>
      <nav className="content-nav noprint">
        {SECTIONS.map((x) => (
          <a key={x.id} href={`#${x.id}`}>
            {x.label}
          </a>
        ))}
      </nav>

      {/* ---------------- Features & limits ---------------- */}
      <section className="card" id="features">
        <SectionHead id="features" title="Features & limits" keys={["features", "aiLimits", "drill"]} note="Turn whole parts of the portal on or off." />
        <form action={saveFeaturesAction} key={JSON.stringify([features, ai, drill])}>
          {Object.keys(features).map((k) => (
            <label key={k} className="check">
              <input type="checkbox" name={`f.${k}`} defaultChecked={features[k as keyof typeof features]} />
              <span>
                <strong>{FEATURE_INFO[k]?.label ?? k}</strong>
                <span className="muted small"> · {FEATURE_INFO[k]?.text}</span>
              </span>
            </label>
          ))}
          <h3>AI teacher limits</h3>
          <p className="muted small">
            {aiEnabled()
              ? "AI is on. Each kid message costs roughly a cent."
              : "AI is off (no ANTHROPIC_API_KEY on the server): teachers reply with built-in hints and solutions."}
          </p>
          <div className="row">
            <Num name="messagesPerKidPerDay" label="Messages per kid per day" value={ai.messagesPerKidPerDay} min={0} max={1000} />
            <Num name="maxMessageChars" label="Longest kid message (characters)" value={ai.maxMessageChars} min={50} max={2000} />
            <Num name="historyTurns" label="Chat turns the teacher remembers" value={ai.historyTurns} min={1} max={50} />
          </div>
          <h3>Fact speed drill</h3>
          <div className="row">
            <Num name="drillSeconds" label="Drill length (seconds)" value={drill.seconds} min={15} max={300} />
            <Num name="fluentPerMinute" label="Fluent at (correct per minute)" value={drill.fluentPerMinute} min={5} max={120} />
          </div>
          <p />
          <button className="btn">Save features & limits</button>
        </form>
      </section>

      {/* ---------------- 2-hour day ---------------- */}
      <section className="card" id="schedule">
        <SectionHead
          id="schedule"
          title="The 2-hour day"
          keys={["schedule"]}
          note="Blocks shown as rings on each kid's home page. Portal blocks fill up from math practice; guided blocks are done off-screen with a timer, then you approve them."
        />
        <form action={saveScheduleAction} key={JSON.stringify(blocks)}>
          <input type="hidden" name="count" value={blocks.length} />
          {[...blocks, null].map((b, i) => (
            <fieldset key={b?.id ?? "new"} className="edit-item">
              <legend>{b ? `${b.icon} ${b.label}` : "➕ Add a block"}</legend>
              <input type="hidden" name={`b.${i}.id`} value={b?.id ?? ""} />
              <div className="row">
                <Num name={`b.${i}.order`} label="Order" value={i + 1} min={1} max={50} />
                <div>
                  <label>Name</label>
                  <input name={`b.${i}.label`} defaultValue={b?.label ?? ""} maxLength={40} placeholder={b ? "" : "e.g. Spanish"} />
                </div>
                <div>
                  <label>Icon</label>
                  <input name={`b.${i}.icon`} defaultValue={b?.icon ?? ""} maxLength={8} placeholder="🗣️" />
                </div>
                <div>
                  <label>Minutes</label>
                  <input name={`b.${i}.minutes`} type="number" min={5} max={120} defaultValue={b?.minutes ?? 25} />
                </div>
                <div>
                  <label>Type</label>
                  <select name={`b.${i}.kind`} defaultValue={b?.kind ?? "guided"}>
                    <option value="portal">In the portal (math practice)</option>
                    <option value="guided">Guided, off-screen</option>
                  </select>
                </div>
                <div>
                  <label>Logged as</label>
                  <select name={`b.${i}.subject`} defaultValue={b?.subject ?? "Other"}>
                    {SUBJECTS.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Color (0–360)</label>
                  <input name={`b.${i}.hue`} type="number" min={0} max={360} defaultValue={b?.hue ?? 200} />
                </div>
              </div>
              <label>Daily ideas (one per line, guided blocks only)</label>
              <textarea name={`b.${i}.ideas`} rows={4} defaultValue={b?.ideas.join("\n") ?? ""} />
              {b && (
                <label className="check danger">
                  <input type="checkbox" name={`b.${i}.delete`} /> Remove this block
                </label>
              )}
            </fieldset>
          ))}
          <button className="btn">Save the 2-hour day</button>
        </form>
      </section>

      {/* ---------------- Teachers ---------------- */}
      <section className="card" id="teachers">
        <SectionHead
          id="teachers"
          title="AI teachers"
          keys={["teachers", "teachingMethod"]}
          note="One teacher per math world. The personality, stories and teaching method are given to the AI as instructions."
        />
        <form action={saveTeachersAction} key={JSON.stringify([teachers, method])}>
          <label>Teaching method (every teacher follows this)</label>
          <textarea name="teachingMethod" rows={9} defaultValue={method} />
          {STRANDS.map((st) => {
            const t = teachers[st.id];
            const p = `t.${st.id}.`;
            return (
              <fieldset key={st.id} className="edit-item">
                <legend>
                  {WORLDS[st.id].icon} {WORLDS[st.id].name}: {t.avatar} {t.name}
                </legend>
                <div className="row">
                  <div>
                    <label>Name</label>
                    <input name={`${p}name`} defaultValue={t.name} maxLength={60} />
                  </div>
                  <div>
                    <label>Avatar (emoji)</label>
                    <input name={`${p}avatar`} defaultValue={t.avatar} maxLength={8} />
                  </div>
                  <div>
                    <label>Inspired by</label>
                    <input name={`${p}inspiredBy`} defaultValue={t.inspiredBy} maxLength={200} />
                  </div>
                  <div>
                    <label>Color (0–360)</label>
                    <input name={`${p}hue`} type="number" min={0} max={360} defaultValue={t.hue} />
                  </div>
                </div>
                <label>Personality and voice</label>
                <textarea name={`${p}voice`} rows={2} defaultValue={t.voice} />
                <label>Stories and real-world hooks (one per line)</label>
                <textarea name={`${p}hooks`} rows={3} defaultValue={t.hooks.join("\n")} />
                <label>Greeting</label>
                <input name={`${p}greeting`} defaultValue={t.greeting} maxLength={300} />
              </fieldset>
            );
          })}
          <button className="btn">Save teachers</button>
        </form>
      </section>

      {/* ---------------- Quests ---------------- */}
      <section className="card" id="quests">
        <SectionHead
          id="quests"
          title="Quests & missions"
          keys={["quests"]}
          note="Brain benders and creative challenges pop up during practice. Real-world missions appear on the kid's home page; approving one gives XP and logs its minutes."
        />
        <form action={saveQuestsAction} key={JSON.stringify(quests)}>
          <input type="hidden" name="count" value={quests.length} />
          {kinds.map((kind) => (
            <div key={kind}>
              <h3>
                {KIND_LABEL[kind]}s ({quests.filter((q) => q.kind === kind).length})
              </h3>
              {quests.map((q, i) =>
                q.kind !== kind ? null : (
                  <details key={q.id} className="edit-item">
                    <summary>
                      {THEME_LABEL[q.theme]} · <strong>{q.title}</strong> · {q.xp} XP
                    </summary>
                    <QuestFields i={i} q={q} />
                  </details>
                ),
              )}
            </div>
          ))}
          <details className="edit-item" open>
            <summary>
              <strong>➕ Add a quest or mission</strong>
            </summary>
            <QuestFields i={quests.length} q={null} />
          </details>
          <button className="btn">Save quests & missions</button>
        </form>
      </section>

      {/* ---------------- Focus ---------------- */}
      <section className="card" id="focus">
        <SectionHead
          id="focus"
          title="Focus presets & brain breaks"
          keys={["focusPresets", "breaks"]}
          note="Starting values a kid gets from your answer to the attention question. Changing these doesn't change kids already set up; adjust them per kid in Settings."
        />
        <form action={saveFocusAction} key={JSON.stringify([presets, breaks])}>
          <table>
            <thead>
              <tr>
                <th>Attention answer</th>
                <th>Sprint (min)</th>
                <th>Break (min)</th>
                <th>Side quest every N</th>
                <th>Screen cap (min/day)</th>
              </tr>
            </thead>
            <tbody>
              {(["yes", "unsure", "no"] as const).map((a) => (
                <tr key={a}>
                  <td>{ATTENTION_LABEL[a]}</td>
                  {(["sprintMinutes", "breakMinutes", "sideQuestEvery", "dailyCapMinutes"] as const).map((f) => (
                    <td key={f}>
                      <input name={`p.${a}.${f}`} type="number" min={LIMITS[f][0]} max={LIMITS[f][1]} defaultValue={presets[a][f]} required />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <label>Brain breaks (one per line: icon | title | what to do)</label>
          <textarea name="breaks" rows={10} defaultValue={breaks.map((b) => `${b.icon} | ${b.title} | ${b.text}`).join("\n")} />
          <p />
          <button className="btn">Save focus presets & breaks</button>
        </form>
      </section>
    </main>
  );
}

function QuestFields({ i, q }: { i: number; q: { id: string; kind: QuestKind; theme: QuestTheme; title: string; text: string; reveal?: string; minutes?: number; subject?: string; xp: number } | null }) {
  const p = `q.${i}.`;
  return (
    <>
      <input type="hidden" name={`${p}id`} value={q?.id ?? ""} />
      <div className="row">
        <div>
          <label>Type</label>
          <select name={`${p}kind`} defaultValue={q?.kind ?? "mission"}>
            {(Object.keys(KIND_LABEL) as QuestKind[]).map((k) => (
              <option key={k} value={k}>
                {KIND_LABEL[k]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Theme</label>
          <select name={`${p}theme`} defaultValue={q?.theme ?? "business"}>
            {(Object.keys(THEME_LABEL) as QuestTheme[]).map((t) => (
              <option key={t} value={t}>
                {THEME_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Title</label>
          <input name={`${p}title`} defaultValue={q?.title ?? ""} maxLength={80} placeholder={q ? "" : "e.g. Sell at the farmers market"} />
        </div>
        <div>
          <label>XP</label>
          <input name={`${p}xp`} type="number" min={1} max={500} defaultValue={q?.xp ?? 40} />
        </div>
      </div>
      <label>What to do</label>
      <textarea name={`${p}text`} rows={3} defaultValue={q?.text ?? ""} />
      <label>Answer reveal (brain benders only)</label>
      <textarea name={`${p}reveal`} rows={2} defaultValue={q?.reveal ?? ""} />
      <div className="row">
        <div>
          <label>Minutes logged (missions only)</label>
          <input name={`${p}minutes`} type="number" min={5} max={600} defaultValue={q?.minutes ?? 30} />
        </div>
        <div>
          <label>Logged as (missions only)</label>
          <select name={`${p}subject`} defaultValue={q?.subject ?? "Other"}>
            {SUBJECTS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>
      {q && (
        <label className="check danger">
          <input type="checkbox" name={`${p}delete`} /> Delete this quest
        </label>
      )}
    </>
  );
}
