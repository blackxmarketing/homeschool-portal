import Link from "next/link";
import { logoutAction } from "../actions";
import MissionButton from "@/components/MissionButton";
import { DayRings, GradeTower } from "@/components/DayRings";
import { getSkill } from "@/lib/curriculum/skills";
import { requireKid } from "@/lib/auth";
import { levelInfo } from "@/lib/game";
import { THEME_LABEL } from "@/content/quests";
import { drillSettings, features } from "@/lib/content";
import {
  capStatus,
  courseOverview,
  dayBlocks,
  drillStats,
  goalProgress,
  learningPlan,
  masteredPrereqs,
  strugglingSkills,
  extendPlan,
  getFocus,
  kidBadges,
  missionBoard,
  placementStatus,
  questLog,
  sprintsToday,
  streak,
  today,
  todaysPlan,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function KidHome({ searchParams }: { searchParams: Promise<{ more?: string }> }) {
  const { kid } = await requireKid();
  if ((await searchParams).more) extendPlan(kid.id);

  const FEATURES = features();
  const DRILL = drillSettings();
  const focus = getFocus(kid.id);
  const cap = capStatus(kid.id);
  const goalPct = Math.min(100, Math.round((cap.minutes / kid.daily_goal_minutes) * 100));
  const lvl = levelInfo(kid.xp);
  const placement = placementStatus(kid.id);
  const plan = kid.placement_done ? todaysPlan(kid.id) : [];
  const allDone = plan.length > 0 && plan.every((p) => p.done);
  const missions = missionBoard(kid.id);
  const todaysQuests = new Map(questLog(kid.id, today()).map((r) => [r.quest_id, r.status]));
  const earned = kidBadges(kid);
  const days = streak(kid.id);
  const blocks = dayBlocks(kid.id);
  const dayTotal = { done: blocks.reduce((t, b) => t + b.minutes, 0), minutes: blocks.reduce((t, b) => t + b.block.minutes, 0) };
  const plan2 = learningPlan(kid);
  const goal = goalProgress(kid);
  const drills = drillStats(kid.id);
  const courses = FEATURES.courses ? courseOverview(kid.id).filter((c) => c.course.lessons.length > 0) : [];
  const stuck = strugglingSkills(kid.id).map((id) => ({ skillId: id, title: getSkill(id)?.title ?? id, backTo: masteredPrereqs(kid.id, id) }));

  return (
    <main className="wrap">
      <div className="topbar">
        <div className="hero">
          <div className="hero-avatar">{kid.avatar}</div>
          <div>
            <div className="eyebrow">Welcome back</div>
            <h1>{kid.name}</h1>
            <div className="rank">
              {lvl.rank.icon} Level {lvl.level} · {lvl.rank.title}
            </div>
          </div>
        </div>
        <nav>
          <Link href="/kid/map" className="kbtn ghost">
            🗺️ Quest map
          </Link>
          {FEATURES.courses && (
            <Link href="/kid/learn" className="kbtn ghost">
              📚 Academy
            </Link>
          )}
          <form action={logoutAction}>
            <button className="linkbtn">Log out</button>
          </form>
        </nav>
      </div>

      <div className="xpbar-wrap">
        <div className="xpbar">
          <span style={{ width: `${lvl.pct}%` }} />
        </div>
        <div className="kmuted small">
          {kid.xp.toLocaleString()} XP · {lvl.needed - lvl.into} XP to level {lvl.level + 1}
        </div>
      </div>

      <div className="kstats">
        <div className="kstat">
          <div className="v">{days} 🔥</div>
          <div className="k">day streak</div>
        </div>
        <div className="kstat">
          <div className="v">
            {cap.minutes}/{kid.daily_goal_minutes}
          </div>
          <div className="k">minutes toward today&apos;s goal</div>
          <div className="mini-bar">
            <span style={{ width: `${goalPct}%` }} />
          </div>
        </div>
        <div className="kstat">
          <div className="v">{sprintsToday(kid.id)} ⏱️</div>
          <div className="k">focus sprints today ({focus.sprintMinutes} min each)</div>
        </div>
        <div className="kstat">
          <div className="v">{Math.max(0, cap.cap - cap.minutes)}</div>
          <div className="k">screen minutes left today</div>
        </div>
      </div>

      {FEATURES.twoHourDay && (
        <div className="kcard">
          <h2>⏰ Today&apos;s 2 hours</h2>
          <p className="kmuted small">
            Fill every ring: {dayTotal.done} of {dayTotal.minutes} minutes so far. Then the rest of the day is yours: missions,
            building, reading, playing outside.
          </p>
          <DayRings blocks={blocks} />
        </div>
      )}

      {stuck.length > 0 && (
        <div className="kcard basics">
          <div className="eyebrow">Struggle detector</div>
          <h2>🧱 Strengthen your foundation</h2>
          <p className="kmuted small">
            These skills aren&apos;t clicking yet. A quick warm-up on the skills underneath them makes them much easier.
          </p>
          {stuck.map((s) => (
            <div key={s.skillId} className="quest-item">
              <div className="quest-body">
                <div className="quest-name">{s.title}</div>
                <div className="kmuted small">Warm up first: {s.backTo.map((b) => b.title).join(", ") || "ask your teacher for a hand"}</div>
              </div>
              {s.backTo[0] && !cap.reached && (
                <Link href={`/kid/practice?skill=${s.backTo[0].id}&mode=review`} className="kbtn">
                  Warm up
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {cap.reached && (
        <div className="kcard callout">
          <h2>🌅 Screen time&apos;s done for today!</h2>
          <p>Great work. Now go make something happen in the real world. Pick a mission below.</p>
        </div>
      )}

      {!kid.placement_done ? (
        <div className="kcard">
          <h2>🗺️ Placement quest</h2>
          <p>
            Before we build your map, let&apos;s find out what you already know. Some questions will be easy and some will be
            tricky. Do your best. You can stop and come back any time.
          </p>
          {placement.done > 0 && (
            <p className="kmuted">
              Progress: {placement.done} of {placement.total} parts done.
            </p>
          )}
          {!cap.reached && (
            <Link href="/kid/placement" className="kbtn big">
              {placement.done > 0 ? "Keep going →" : "Start the quest →"}
            </Link>
          )}
        </div>
      ) : (
        <div className="kcard" id="training">
          <h2>⚔️ Today&apos;s training</h2>
          {plan.length === 0 ? (
            <p>You&apos;ve mastered everything available right now. Legendary! Ask a parent what&apos;s next.</p>
          ) : (
            <div className="quest-list">
              {plan.map((p) => (
                <div key={`${p.type}:${p.skillId}`} className={`quest-item ${p.done ? "done" : ""}`}>
                  <div className="quest-icon">{p.done ? "✅" : p.type === "review" ? "🔁" : "⭐"}</div>
                  <div className="quest-body">
                    <div className="quest-name">{p.title}</div>
                    <div className="kmuted small">
                      {p.type === "review" ? "Power review" : "New skill"} · grade {p.grade} level
                    </div>
                  </div>
                  {p.done ? (
                    <span className="tag ok">Done</span>
                  ) : cap.reached ? null : (
                    <Link href={`/kid/practice?skill=${p.skillId}&mode=${p.type}`} className="kbtn">
                      {p.answeredToday > 0 ? "Continue" : "Start"}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
          {allDone && !cap.reached && (
            <div className="callout small-callout">
              Training complete for today! 🎉 <Link href="/kid?more=1">Want more?</Link>
            </div>
          )}
        </div>
      )}

      {FEATURES.twoHourDay && kid.placement_done ? (
        <div className="grid2">
          <div className="kcard">
            <h2>🏗️ My path</h2>
            <p className="kmuted small">
              You&apos;re working in <strong>grade {plan2.knowledgeGrade > 8 ? "8+" : plan2.knowledgeGrade}</strong> math. Every solid block is a
              skill you&apos;ve mastered.
            </p>
            <GradeTower grades={plan2.grades} focus={plan2.knowledgeGrade} />
            {goal ? (
              <div className="goal">
                <div className="eyebrow">My goal</div>
                {goal.done ? (
                  <strong>🏆 Goal reached: grade {goal.grade} math is done!</strong>
                ) : (
                  <>
                    <strong>
                      Finish grade {goal.grade} by {goal.target_day}
                    </strong>
                    <div className="kmuted small">
                      {goal.remaining} skills to go in {goal.days} days. That&apos;s about {goal.perSchoolDay >= 1 ? `${goal.perSchoolDay} skills per school day` : `${goal.perWeek} skills a week`}.
                    </div>
                  </>
                )}
                <Link href="/kid/goal" className="linkbtn small">
                  Change goal
                </Link>
              </div>
            ) : (
              <Link href="/kid/goal" className="kbtn ghost" style={{ marginTop: 10 }}>
                🎯 Set a goal
              </Link>
            )}
          </div>
          <div className="kcard">
            <h2>⚡ Fact speed</h2>
            <p className="kmuted small">
              Fast facts free up your brain for the hard stuff. Fluent = {DRILL.fluentPerMinute}+ correct a minute.
            </p>
            <div className="fluency">
              {drills.map((d) => (
                <div key={d.op} className={`fluency-op ${d.fluent ? "fluent" : ""}`}>
                  <div className="fluency-sign">{d.op}</div>
                  <div className="fluency-num">{d.best || "–"}</div>
                  <div className="kmuted small">{d.fluent ? "fluent ✅" : "best / min"}</div>
                </div>
              ))}
            </div>
            {!cap.reached && (
              <Link href="/kid/drill" className="kbtn" style={{ marginTop: 12 }}>
                Start a 60-second drill
              </Link>
            )}
          </div>
        </div>
      ) : null}

      {courses.length > 0 && (
        <div className="kcard">
          <h2>📚 Academy</h2>
          <p className="kmuted small">Your next lesson in each course. Academics fill your 2-hour rings; life skills are for the afternoon.</p>
          <div className="quest-list">
            {courses.map((c) => {
              const next = c.lessons.find((l) => l.status !== "done" && l.status !== "locked");
              return (
                <div key={c.course.id} className="quest-item">
                  <div className="quest-icon">{c.course.icon}</div>
                  <div className="quest-body">
                    <div className="quest-name">{c.course.title}</div>
                    <div className="kmuted small">
                      {c.done}/{c.lessons.length} lessons · {next ? next.lesson.title : "complete! 🏆"}
                      {next?.status === "waiting" ? " · waiting for a parent" : ""}
                    </div>
                  </div>
                  {next && (
                    <Link href={`/kid/learn/${c.course.id}/${next.lesson.id}`} className="kbtn">
                      {next.status === "open" ? "Start" : "Continue"}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {FEATURES.missions && (
      <div className="kcard" id="missions">
        <h2>🌍 Real-world missions</h2>
        <p className="kmuted">
          Get off the screen and make it real. Tap &quot;I did it!&quot; when you&apos;re done. A parent checks it, then you get
          the XP.
        </p>
        <div className="mission-grid">
          {missions.map((m) => (
            <div key={m.id} className="mission">
              <div className="eyebrow">{THEME_LABEL[m.theme]}</div>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <div className="mission-foot">
                <span className="tag">+{m.xp} XP</span>
                <span className="tag">~{m.minutes} min</span>
              </div>
              <MissionButton questId={m.id} initial={todaysQuests.get(m.id) ?? "open"} />
            </div>
          ))}
        </div>
      </div>
      )}

      <div className="kcard">
        <h2>🏅 Badges</h2>
        <div className="badge-grid">
          {earned.map((b) => (
            <div key={b.id} className={`badge ${b.earned ? "earned" : ""}`} title={b.how}>
              <div className="badge-icon">{b.earned ? b.icon : "🔒"}</div>
              <div className="badge-title">{b.title}</div>
              <div className="badge-how">{b.how}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
