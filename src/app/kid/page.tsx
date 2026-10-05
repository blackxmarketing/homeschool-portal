import Link from "next/link";
import { logoutAction } from "../actions";
import MissionButton from "@/components/MissionButton";
import HomeTabs from "@/components/HomeTabs";
import { redirect } from "next/navigation";
import WorldScreen from "@/components/pixel/WorldScreen";
import { HeroSprite } from "@/components/pixel/PixelArt";
import { coinsOf, heroOf, worldProgress } from "@/lib/gameState";
import { bandFor } from "@/lib/pixel/world";
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
  kidBadges,
  missionBoard,
  placementStatus,
  questLog,
  streak,
  today,
  todaysPlan,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function KidHome({ searchParams }: { searchParams: Promise<{ more?: string }> }) {
  const { kid } = await requireKid();
  const hero = heroOf(kid.id);
  if (!hero) redirect("/kid/hero?first=1");
  const band = bandFor(kid.grade);
  const coins = coinsOf(kid.id);
  const progress = worldProgress(kid.id);
  if ((await searchParams).more) extendPlan(kid.id);

  const FEATURES = features();
  const DRILL = drillSettings();
  const cap = capStatus(kid.id);
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

  // "Start here": every next step as a big colored button.
  type Tile = { key: string; href: string | null; icon: string; eyebrow: string; title: string; sub: string; hue: number; done?: boolean; cta: string; pct?: number };
  const tiles: Tile[] = [];
  if (!kid.placement_done) {
    tiles.push({
      key: "placement",
      href: cap.reached ? null : "/kid/placement",
      icon: "🗺️",
      eyebrow: "Start here",
      title: "Placement quest",
      sub: placement.done > 0 ? `${placement.done} of ${placement.total} parts done` : "Show what you already know",
      hue: 228,
      cta: placement.done > 0 ? "Keep going" : "Start",
      pct: placement.total ? Math.round((placement.done / placement.total) * 100) : 0,
    });
  } else {
    for (const p of plan) {
      tiles.push({
        key: `${p.type}:${p.skillId}`,
        href: p.done || cap.reached ? null : `/kid/practice?skill=${p.skillId}&mode=${p.type}`,
        icon: p.done ? "✅" : p.type === "review" ? "🔁" : "⭐",
        eyebrow: p.type === "review" ? "Math review" : "New math skill",
        title: p.title,
        sub: `Grade ${p.grade} level`,
        hue: p.type === "review" ? 265 : 32,
        done: p.done,
        cta: p.done ? "Done" : p.answeredToday > 0 ? "Continue" : "Start",
      });
    }
  }
  for (const c of courses) {
    const next = c.lessons.find((l) => l.status !== "done" && l.status !== "locked");
    tiles.push({
      key: `course:${c.course.id}`,
      href: next && !cap.reached ? `/kid/learn/${c.course.id}/${next.lesson.id}` : `/kid/learn/${c.course.id}`,
      icon: c.course.icon,
      eyebrow: c.course.title,
      title: next ? next.lesson.title : "Course complete! 🏆",
      sub: next?.status === "waiting" ? "Waiting for a parent" : `${c.done} of ${c.lessons.length} lessons`,
      hue: c.course.hue,
      done: !next,
      cta: !next ? "Review" : next.status === "open" ? "Start" : "Continue",
      pct: Math.round((c.done / Math.max(1, c.lessons.length)) * 100),
    });
  }
  if (FEATURES.twoHourDay && kid.placement_done) {
    tiles.push({
      key: "drill",
      href: cap.reached ? null : "/kid/drill",
      icon: "⚡",
      eyebrow: "Fact speed",
      title: "60-second drill",
      sub: `Fluent = ${DRILL.fluentPerMinute}+ a minute`,
      hue: 330,
      cta: "Go",
    });
  }
  // Every button gets its own bright color, so neighbors never match.
  const PALETTE = [24, 212, 150, 282, 346, 190, 262, 128, 322, 8, 228, 172];
  tiles.forEach((t, i) => (t.hue = PALETTE[i % PALETTE.length]));
  const openMissions = missions.filter((m) => (todaysQuests.get(m.id) ?? "open") === "open").length;

  const tabs = [
    ...(FEATURES.missions
      ? [
          {
            id: "missions",
            label: "🌍 Missions",
            count: openMissions,
            content: (
              <>
                <p className="kmuted small">
                  Get off the screen and make it real. Tap &quot;I did it!&quot; when you&apos;re done. A parent checks it, then you get the XP.
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
              </>
            ),
          },
        ]
      : []),
    ...(FEATURES.twoHourDay && kid.placement_done
      ? [
          {
            id: "path",
            label: "🏗️ My path",
            content: (
              <>
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
                          {goal.remaining} skills to go in {goal.days} days. That&apos;s about{" "}
                          {goal.perSchoolDay >= 1 ? `${goal.perSchoolDay} skills per school day` : `${goal.perWeek} skills a week`}.
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
              </>
            ),
          },
          {
            id: "facts",
            label: "⚡ Fact speed",
            content: (
              <>
                <p className="kmuted small">Fast facts free up your brain for the hard stuff. Fluent = {DRILL.fluentPerMinute}+ correct a minute.</p>
                <div className="fluency">
                  {drills.map((d) => (
                    <div key={d.op} className={`fluency-op ${d.fluent ? "fluent" : ""}`}>
                      <div className="fluency-sign">{d.op}</div>
                      <div className="fluency-num">{d.best || "–"}</div>
                      <div className="kmuted small">{d.fluent ? "fluent ✅" : "best / min"}</div>
                    </div>
                  ))}
                </div>
              </>
            ),
          },
        ]
      : []),
    {
      id: "badges",
      label: "🏅 Badges",
      count: earned.filter((b) => b.earned).length,
      content: (
        <div className="badge-grid">
          {earned.map((b) => (
            <div key={b.id} className={`badge ${b.earned ? "earned" : ""}`} title={b.how}>
              <div className="badge-icon">{b.earned ? b.icon : "🔒"}</div>
              <div className="badge-title">{b.title}</div>
              <div className="badge-how">{b.how}</div>
            </div>
          ))}
        </div>
      ),
    },
    ...(stuck.length > 1
      ? [
          {
            id: "basics",
            label: "🧱 Warm-ups",
            count: stuck.length,
            content: (
              <div className="quest-list">
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
            ),
          },
        ]
      : []),
  ];

  return (
    <main className={`wrap home game-page band-${band}`}>
      <header className="hud">
        <Link href="/kid/hero" className="hud-hero" title="Change your hero">
          <HeroSprite hero={hero} scale={3} bounce={false} />
        </Link>
        <div className="hud-who">
          <h1 className="pixel-title">{kid.name}</h1>
          <div className="hud-level">
            Lv {lvl.level} · {lvl.rank.title}
          </div>
          <div className="xpbar" aria-label={`${kid.xp} XP, ${lvl.needed - lvl.into} to level ${lvl.level + 1}`}>
            <span style={{ width: `${lvl.pct}%` }} />
          </div>
        </div>
        <div className="hud-chips">
          <span className="chip coin" title="Coins">🪙 {coins}</span>
          <span className="chip" title="Day streak">🔥 {days}</span>
          <span className="chip" title="Minutes toward today's goal">
            ⏱️ {cap.minutes}/{kid.daily_goal_minutes}
          </span>
          <span className="chip" title="Screen minutes left today">🖥️ {Math.max(0, cap.cap - cap.minutes)} left</span>
        </div>
        <nav className="home-nav">
          <form action={logoutAction}>
            <button className="linkbtn">Log out</button>
          </form>
        </nav>
      </header>

      {cap.reached && <div className="home-banner good">🌅 Screen time&apos;s done for today! Go make something happen: open Missions below.</div>}
      {stuck.length > 0 && !cap.reached && (
        <div className="home-banner warn">
          <span>
            🧱 <strong>{stuck[0].title}</strong> isn&apos;t clicking yet. A quick warm-up makes it easier.
          </span>
          {stuck[0].backTo[0] && (
            <Link href={`/kid/practice?skill=${stuck[0].backTo[0].id}&mode=review`} className="kbtn small-btn">
              Warm up
            </Link>
          )}
        </div>
      )}

      <div className="world-layout">
        <section className="world-main" aria-label="World map">
          <WorldScreen band={band} progress={progress} hero={hero} />
        </section>

        <aside className="quest-log" aria-label="Quest log">
          <div className="quest-log-head">
            <h2 className="pixel-title small">Quest log</h2>
            {allDone && !cap.reached && (
              <Link href="/kid?more=1" className="linkbtn small">
                More training?
              </Link>
            )}
          </div>
          {FEATURES.twoHourDay && (
            <div className="daily">
              <div className="daily-label">
                Daily quests <span className="kmuted small">{dayTotal.done}/{dayTotal.minutes} min</span>
              </div>
              <DayRings blocks={blocks} />
            </div>
          )}
          {tiles.length === 0 ? (
            <p className="kmuted">Every quest is done for now. Legendary! Ask a parent what&apos;s next.</p>
          ) : (
            <div className="quest-list-game">
              {tiles.map((t) => {
                const body = (
                  <>
                    <span className="ql-icon" aria-hidden>
                      {t.icon}
                    </span>
                    <span className="ql-text">
                      <span className="ql-eyebrow">{t.eyebrow}</span>
                      <span className="ql-title">{t.title}</span>
                      {t.pct !== undefined && (
                        <span className="tile-bar" aria-hidden>
                          <span style={{ width: `${t.pct}%` }} />
                        </span>
                      )}
                    </span>
                    <span className="ql-cta">{t.done ? "✓" : "▶"}</span>
                  </>
                );
                const style = { ["--t-hue" as string]: t.hue };
                return t.href ? (
                  <Link key={t.key} href={t.href} className={`ql-item ${t.done ? "done" : ""}`} style={style}>
                    {body}
                  </Link>
                ) : (
                  <div key={t.key} className={`ql-item ${t.done ? "done" : "off"}`} style={style}>
                    {body}
                  </div>
                );
              })}
            </div>
          )}
        </aside>
      </div>

      <HomeTabs tabs={tabs} />
    </main>
  );
}
