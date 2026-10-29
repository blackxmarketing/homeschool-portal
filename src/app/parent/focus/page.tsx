import Link from "next/link";
import ParentNav from "@/components/ParentNav";
import { requireParent } from "@/lib/auth";
import { dismissAlertAction, miaItemAction, miaParentAction, miaResetRingAction, miaSuppliesAction } from "@/app/actions";
import { MIA_SUBJECTS } from "@/content/miacademy";
import { remaining, type MiaTimerState } from "@/lib/miaTimer";
import { buddyHead } from "@/lib/pixel/buddies";
import { ringGrid } from "@/lib/pixel/miaRings";
import {
  getMiaSettings,
  listKids,
  miaChecklist,
  miaCurriculum,
  miaFamilyToday,
  miaRingLessons,
  miaRings,
  miaWaitingForParent,
  today,
  unseenAlerts,
  type MiaCurriculumClass,
  type MiaCurriculumItem,
} from "@/lib/store";

export const dynamic = "force-dynamic";

/**
 * Focus Buddy on its own tab: today (alerts, photos to approve, timers, rings,
 * checklists), and each kid's classes like Miacademy's curriculum page, with
 * what's done and how long each activity took on the timer.
 */
export default async function FocusBuddyPage({ searchParams }: { searchParams: Promise<{ error?: string; view?: string; kid?: string }> }) {
  const s = await requireParent();
  const { error, view, kid } = await searchParams;
  const kids = listKids(s.familyId);
  const classes = view === "classes";
  const shown = kids.find((k) => String(k.id) === kid) ?? kids[0];
  return (
    <main className="wrap">
      <ParentNav title="Focus Buddy" />
      {error && <div className="error">{error}</div>}
      <div className="fb-tabs">
        <Link href="/parent/focus" className={classes ? "" : "on"}>
          Today
        </Link>
        {kids.map((k) => (
          <Link key={k.id} href={`/parent/focus?view=classes&kid=${k.id}`} className={classes && shown?.id === k.id ? "on" : ""}>
            <Buddy kidId={k.id} /> {k.name}&apos;s classes
          </Link>
        ))}
      </div>
      {classes && shown ? (
        <>
          {miaRings(shown.id).length > 0 && (
            <div className="card">
              <h2>💍 {shown.name}&apos;s rings this week</h2>
              <KidRings kidId={shown.id} rings={miaRings(shown.id)} reset={false} />
            </div>
          )}
          <MiaClasses classes={miaCurriculum(shown.id)} />
        </>
      ) : (
        <>
          <MiaAlerts familyId={s.familyId} />
          <MiaApprovals familyId={s.familyId} />
          <MiaToday familyId={s.familyId} />
          <MiaWeekRings familyId={s.familyId} />
          <MiaChecklists familyId={s.familyId} />
        </>
      )}
    </main>
  );
}

/** The kid's Focus Buddy animal (panda, wolf), drawn like the face on their timer. */
function Buddy({ kidId }: { kidId: number }) {
  const g = buddyHead(getMiaSettings(kidId).buddy);
  return (
    <svg className="fb-buddy" viewBox={`0 0 ${g.w} ${g.h}`} shapeRendering="crispEdges" aria-hidden="true">
      {g.runs().map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
      ))}
    </svg>
  );
}

const ICON: Record<MiaCurriculumItem["check"], string> = { video: "💻", practice: "💻", quiz: "💻", online: "💻", self: "✏️", photo: "✏️", parent: "✏️" };
const mins = (ms: number) => (ms < 60_000 ? "<1 min" : `${Math.round(ms / 60_000)} min`);
const when = (at: number) =>
  new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: process.env.APP_TIMEZONE ?? "America/Denver" }).format(at);

/** Each class like Miacademy's curriculum page: units, lessons, and every activity with its time. */
function MiaClasses({ classes }: { classes: MiaCurriculumClass[] }) {
  if (!classes.length)
    return (
      <div className="card">
        <p className="muted">No classes yet. Open this kid&apos;s Miacademy parent page on a computer with Focus Buddy in parent mode.</p>
      </div>
    );
  return (
    <>
      <p className="muted small">
        Time is the subject timer&apos;s working time (no pauses or breaks) since the activity before it. Activities Miacademy
        finished on its own, or that a parent marked, have no time.
      </p>
      {classes.map((c) => {
        const subject = MIA_SUBJECTS.find((x) => x.id === c.subject);
        // The lesson they're on: the first one not finished.
        const current = c.units.flatMap((u) => u.lessons).find((l) => !l.doneDay)?.id;
        return (
          <div className="card fb-class" key={`${c.subject}-${c.course}`} style={{ ["--c" as string]: subject?.color }}>
            <h2>
              {subject?.icon} {c.course}
            </h2>
            <div className="fb-bar">
              <i style={{ width: `${(c.lessonsDone / Math.max(1, c.lessonsTotal)) * 100}%` }} />
            </div>
            <p className="muted small">
              {c.lessonsDone} of {c.lessonsTotal} lessons done
            </p>
            {c.units.map((u, ui) => {
              const unitDone = u.lessons.every((l) => l.doneDay);
              return (
                <details key={ui} className="fb-unit" open={u.lessons.some((l) => l.id === current)}>
                  <summary>
                    <span>
                      {unitDone ? "✅" : "📘"} {u.title || "Lessons"}
                    </span>
                    <span className="muted small">
                      {u.lessons.filter((l) => l.doneDay).length}/{u.lessons.length}
                    </span>
                  </summary>
                  {u.lessons.map((l) => {
                    const doneItems = l.items.filter((i) => i.done).length;
                    return (
                      <details key={l.id} className={`fb-lesson ${l.id === current ? "current" : ""}`} open={l.id === current}>
                        <summary>
                          <span>
                            {l.doneDay ? "✅" : doneItems ? "🟡" : "⚪"} {l.title}
                            {l.id === current && <span className="fb-now">working on it</span>}
                          </span>
                          <span className="muted small">
                            {l.doneDay ? `done ${l.doneDay}` : l.items.length ? `${doneItems} of ${l.items.length}` : ""}
                            {l.workMs > 0 && ` · ⏱️ ${mins(l.workMs)}`}
                          </span>
                        </summary>
                        {l.items.length ? (
                          <table className="fb-items">
                            <tbody>
                              {l.items.map((i, ii) => (
                                <tr key={ii} className={i.done ? "done" : ""}>
                                  <td>{i.done ? (i.skipped ? "⏭️" : "✅") : i.waitingForParent ? "⏳" : i.later ? "📦" : "⬜"}</td>
                                  <td>
                                    {ICON[i.check]} {i.title}
                                    {i.skipped && <span className="muted small"> (skipped)</span>}
                                    {i.waitingForParent && <span className="muted small"> (waiting for you)</span>}
                                    {i.later && <span className="muted small"> (saved for later)</span>}
                                  </td>
                                  <td className="muted small">{i.at ? when(i.at) : ""}</td>
                                  <td className="small fb-time">{i.workMs !== null ? mins(i.workMs) : i.done ? "—" : ""}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="muted small">Its checklist shows up once the lesson is opened.</p>
                        )}
                      </details>
                    );
                  })}
                </details>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function MiaAlerts({ familyId }: { familyId: number }) {
  const alerts = unseenAlerts(familyId);
  if (!alerts.length) return null;
  const time = (at: number) => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: process.env.APP_TIMEZONE ?? "America/Denver" }).format(at);
  return (
    <div className="card">
      <h2>🔔 Alerts ({alerts.length})</h2>
      <table>
        <tbody>
          {alerts.map((a) => (
            <tr key={a.id}>
              <td className="muted small" style={{ whiteSpace: "nowrap" }}>
                {time(a.at)}
              </td>
              <td>
                <Buddy kidId={a.kid_id} /> {a.message}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                <form action={dismissAlertAction}>
                  <input type="hidden" name="alertId" value={a.id} />
                  <button className="linkbtn small">Got it</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {alerts.length > 1 && (
        <form action={dismissAlertAction}>
          <button className="linkbtn small">Clear all</button>
        </form>
      )}
    </div>
  );
}

function miaStatus(t: MiaTimerState | null, now: number): string {
  if (!t) return "Not started";
  if (t.finishedAt) return "✓ Done";
  const left = `${Math.ceil(remaining(t, now) / 60000)} min left`;
  switch (t.pause?.type) {
    case "help":
      return `✋ Needs help (${left})`;
    case "supplies":
      return `🧰 Paused to gather supplies (${left})`;
    case "break":
      return "☕ On a break";
    case "ready":
      return `Break over, waiting to restart (${left})`;
    case "choosing":
      return `Paused (${left})`;
    default:
      return `▶ Running (${left})`;
  }
}

function MiaToday({ familyId }: { familyId: number }) {
  const rows = miaFamilyToday(familyId);
  if (!rows.length) return null;
  const now = Date.now();
  return (
    <div className="card">
      <h2>⏱️ Miacademy timers today</h2>
      <table>
        <tbody>
          {rows.flatMap(({ kid, timers }) =>
            MIA_SUBJECTS.map((sub, i) => {
              const t = timers[sub.id];
              return (
                <tr key={`${kid.id}-${sub.id}`}>
                  <td>{i === 0 && (
                  <>
                    <Buddy kidId={kid.id} /> {kid.name}
                  </>
                )}</td>
                  <td style={{ color: sub.color, fontWeight: 700 }}>{sub.name}</td>
                  <td className="small">
                    {miaStatus(t, now)}
                    {t && (t.breaks > 0 || t.helps > 0 || t.missedCheckins > 0) && (
                      <div className="muted small">
                        {[t.breaks ? "took a break" : "", t.helps ? `asked for help ${t.helps}×` : "", t.missedCheckins ? `missed ${t.missedCheckins} check-in${t.missedCheckins > 1 ? "s" : ""}` : ""]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {t?.pause?.type === "supplies" && (
                      <form action={miaSuppliesAction} style={{ display: "inline" }}>
                        <input type="hidden" name="kidId" value={kid.id} />
                        <input type="hidden" name="subject" value={sub.id} />
                        <button className="btn small" name="op" value="ready">
                          Supplies ready
                        </button>{" "}
                        <button className="linkbtn small" name="op" value="skip">
                          Skip activity
                        </button>
                      </form>
                    )}
                    {t?.pause?.type === "help" && (
                      <form action={miaParentAction} style={{ display: "inline" }}>
                        <input type="hidden" name="kidId" value={kid.id} />
                        <input type="hidden" name="subject" value={sub.id} />
                        <button className="btn small" name="op" value="restart">
                          Restart timer
                        </button>
                      </form>
                    )}{" "}
                    {t?.finishedAt && (
                      <form action={miaParentAction} style={{ display: "inline" }}>
                        <input type="hidden" name="kidId" value={kid.id} />
                        <input type="hidden" name="subject" value={sub.id} />
                        <button className="linkbtn small" name="op" value="reset">
                          Allow again today
                        </button>
                      </form>
                    )}
                    {!t?.finishedAt && (
                      <form action={miaParentAction} style={{ display: "inline" }}>
                        <input type="hidden" name="kidId" value={kid.id} />
                        <input type="hidden" name="subject" value={sub.id} />
                        <button className="linkbtn small" name="op" value="done">
                          Mark done
                        </button>
                      </form>
                    )}{" "}
                    {t && !t.finishedAt && (
                      <form action={miaParentAction} style={{ display: "inline" }}>
                        <input type="hidden" name="kidId" value={kid.id} />
                        <input type="hidden" name="subject" value={sub.id} />
                        <button className="linkbtn small" name="op" value="reset">
                          Stop and reset
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}

/** Each kid's next checklist activities, so a parent can check off work done away from the timer. */
function MiaChecklists({ familyId }: { familyId: number }) {
  const rows = miaFamilyToday(familyId).flatMap(({ kid }) =>
    MIA_SUBJECTS.flatMap((sub) =>
      (miaChecklist(kid.id, sub.id)?.parts ?? [])
        .filter((p) => p.upcoming.length || p.later.length)
        .map((p) => ({ kid, sub, part: p })),
    ),
  );
  if (!rows.length) return null;
  return (
    <div className="card">
      <h2>📝 Checklists</h2>
      <p className="muted small">
        The next activities on each checklist, and hands-on activities saved for later. Mark one done if it was finished away from
        the timer.
      </p>
      <table>
        <tbody>
          {rows.map(({ kid, sub, part }) => (
            <tr key={`${kid.id}-${sub.id}-${part.name ?? ""}`}>
              <td>
                <Buddy kidId={kid.id} /> {kid.name}
              </td>
              <td style={{ color: sub.color, fontWeight: 700 }}>
                {part.name ?? sub.name}
                {part.lessonTitle && <div className="muted small">{part.lessonTitle}</div>}
              </td>
              <td>
                {[...part.upcoming, ...part.later].map((u) => (
                  <form key={`${u.lessonId}-${u.item.id}`} action={miaItemAction} style={{ marginBottom: 4 }}>
                    <input type="hidden" name="kidId" value={kid.id} />
                    <input type="hidden" name="lessonId" value={u.lessonId} />
                    <input type="hidden" name="itemId" value={u.item.id} />
                    <span className="small">
                      {u.state.later ? "⏭️ Saved for later: " : ""}
                      {u.item.title}
                      {u.state.later && u.lessonTitle !== part.lessonTitle ? ` (${u.lessonTitle})` : ""}
                    </span>{" "}
                    <button className="linkbtn small" name="op" value="approve">
                      Mark done
                    </button>
                  </form>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** This week's rings for each kid, with a reset for one that filled by mistake. */
function MiaWeekRings({ familyId }: { familyId: number }) {
  const rows = miaFamilyToday(familyId)
    .map(({ kid }) => ({ kid, rings: miaRings(kid.id) }))
    .filter((r) => r.rings.length);
  if (!rows.length) return null;
  return (
    <div className="card">
      <h2>💍 This week&apos;s rings</h2>
      <p className="muted small">
        The same rings your kids see. A ring fills as the week&apos;s lessons for that class get done, and pays into the buddy bank.
        If one filled by mistake, Reset takes its money back out and stops counting its lessons this week.
      </p>
      {rows.map(({ kid, rings }) => (
        <div key={kid.id} className="fb-kid-rings">
          <div className="fb-kid-name">
            <Buddy kidId={kid.id} /> {kid.name}
          </div>
          <KidRings kidId={kid.id} rings={rings} />
        </div>
      ))}
    </div>
  );
}

/** One kid's rings, as pixel rings like on the kid's timer strip. */
function KidRings({ kidId, rings, reset = true }: { kidId: number; rings: ReturnType<typeof miaRings>; reset?: boolean }) {
  return (
    <div className="fb-rings">
      {rings.map((r) => {
        const counted = miaRingLessons(kidId, r.id);
        return (
          <div key={r.id} className={`fb-ring ${r.full ? "full" : ""}`}>
            <div className="fb-ring-art">
              <svg viewBox="0 0 22 22" shapeRendering="crispEdges" aria-hidden="true">
                {ringGrid(r.color, r.progress)
                  .runs()
                  .map((run, i) => (
                    <rect key={i} x={run.x} y={run.y} width={run.w} height={1} fill={run.c} />
                  ))}
              </svg>
              <span className="fb-ring-icon">{r.full ? "✓" : r.icon}</span>
              {r.ahead > 0 && <span className="fb-ring-ahead">+{r.ahead}</span>}
            </div>
            <div className="fb-ring-name" style={{ color: r.color }}>
              {r.name}
            </div>
            <div className="small">{r.full ? "Full" : `${Math.round(r.progress * 100)}%`}</div>
            {counted.length > 0 && (
              <details className="small">
                <summary>
                  {counted.length} lesson{counted.length === 1 ? "" : "s"}
                </summary>
                <ul>
                  {counted.map((l, j) => (
                    <li key={j}>
                      {l.title} ({l.doneDay})
                    </li>
                  ))}
                </ul>
              </details>
            )}
            {reset && r.full && (
              <form action={miaResetRingAction}>
                <input type="hidden" name="kidId" value={kidId} />
                <input type="hidden" name="ring" value={r.id} />
                <button className="linkbtn small">Reset</button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MiaApprovals({ familyId }: { familyId: number }) {
  const waiting = miaWaitingForParent(familyId);
  if (!waiting.length) return null;
  return (
    <div className="card">
      <h2>🧰 Hands-on activities to approve ({waiting.length})</h2>
      <table>
        <tbody>
          {waiting.map(({ kid, lesson, item, state }) => (
            <tr key={`${lesson.id}-${item.id}`}>
              <td>
                <Buddy kidId={kid.id} /> {kid.name}
              </td>
              <td>
                <strong>{item.title}</strong> <span className="muted small">{lesson.title}</span>
                {state.photo && (
                  <div>
                    <a href={`/api/mia/photo/${state.photo}`} target="_blank" rel="noopener">
                      <img src={`/api/mia/photo/${state.photo}`} alt={`${kid.name}'s photo`} style={{ maxWidth: 220, maxHeight: 160, borderRadius: 8, marginTop: 6 }} />
                    </a>
                  </div>
                )}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                <form action={miaItemAction}>
                  <input type="hidden" name="kidId" value={kid.id} />
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <input type="hidden" name="itemId" value={item.id} />
                  <button className="btn small" name="op" value="approve">
                    Approve
                  </button>{" "}
                  <button className="linkbtn small" name="op" value="skip">
                    Skip
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
