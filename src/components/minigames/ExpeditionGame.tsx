"use client";

import { useMemo, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { Grid } from "@/lib/pixel/grid";
import { heroGrid, petGrid, type Hero } from "@/lib/pixel/hero";
import { propGrid } from "@/lib/pixel/objects";
import {
  eventsFor,
  levelById,
  METERS,
  playDay,
  scaled,
  startState,
  type Choice,
  type DayResult,
  type Effects,
  type ExpLevel,
  type ExpState,
  type Meter,
} from "@/lib/minigames/expedition";
import type { MiniGameUIProps } from "./types";
import css from "./ExpeditionGame.module.css";

const ORDER: Meter[] = ["s", "h", "m", "t"];

const CREW: Hero[] = [
  { skin: 1, hair: "short", hairColor: 1, outfit: 1, hat: "explorer", pet: "none" },
  { skin: 3, hair: "curly", hairColor: 0, outfit: 0, hat: "beanie", pet: "none" },
  { skin: 0, hair: "spiky", hairColor: 3, outfit: 2, hat: "beanie", pet: "none" },
  { skin: 2, hair: "short", hairColor: 2, outfit: 7, hat: "cap", pet: "none" },
];

/** A wooden sled with a load of supplies. */
function sledGrid(): Grid {
  const g = new Grid(20, 10);
  g.rect(3, 2, 14, 4, "#c9a26b").rect(4, 3, 5, 2, "#e8d3a6").rect(10, 3, 6, 2, "#7aa6d6");
  g.rect(2, 6, 16, 1, "#7a4f22").rect(1, 8, 18, 1, "#5a3a22").set(0, 7, "#5a3a22").set(19, 7, "#5a3a22");
  g.rect(4, 7, 1, 1, "#7a4f22").rect(15, 7, 1, 1, "#7a4f22");
  return g.outline("#1b1530");
}

/** The whole effect of a choice as the player is told it before choosing (sprout and adventurer). */
function preview(level: ExpLevel, c: Choice): Effects {
  const fx = { ...scaled(c.fx, level.harsh) };
  if (c.later && !level.delayed) {
    const l = scaled(c.later.fx, level.harsh);
    for (const k of ORDER) if (l[k]) fx[k] = (fx[k] ?? 0) + (l[k] ?? 0);
  }
  return fx;
}

function FxChips({ fx, mode }: { fx: Effects; mode: "numbers" | "arrows" }) {
  const keys = ORDER.filter((k) => fx[k]);
  if (!keys.length) return <span className={`${css.fx}`}>no change</span>;
  return (
    <>
      {keys.map((k) => {
        const v = fx[k] ?? 0;
        const label = mode === "numbers" ? `${v > 0 ? "+" : ""}${v}` : v > 0 ? (v >= 8 ? "▲▲" : "▲") : v <= -8 ? "▼▼" : "▼";
        return (
          <span key={k} className={`${css.fx} ${v > 0 ? css.up : css.down}`} title={`${METERS[k].label} ${v > 0 ? "up" : "down"}`}>
            {METERS[k].icon} {label}
          </span>
        );
      })}
    </>
  );
}

function MeterBar({ k, value }: { k: Meter; value: number }) {
  const filled = Math.round(value / 10);
  const low = k !== "t" ? value <= 25 : value < 30;
  return (
    <div className={`${css.meter} ${low ? css.low : ""}`} role="meter" aria-label={METERS[k].label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className={css.meterHead}>
        <span>
          {METERS[k].icon} {METERS[k].label}
        </span>
        <span>{value}</span>
      </div>
      <div className={css.bar} aria-hidden>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={css.seg} style={i < filled ? { background: METERS[k].color } : undefined} />
        ))}
      </div>
    </div>
  );
}

const FAIL: Record<Meter, string> = {
  s: "The food ran out. The team had to stop and wait for rescue.",
  h: "The team got too sick and weak to go on. They had to stop and wait for rescue.",
  m: "The team lost hope and refused to go on. They had to stop and wait for rescue.",
  t: "",
};

export default function ExpeditionGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Expedition level={level} onFinish={onFinish} /> : null;
}

function Expedition({ level, onFinish }: { level: ExpLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const events = useMemo(() => eventsFor(level), [level]);
  const sled = useMemo(() => sledGrid(), []);
  const [state, setState] = useState<ExpState>(() => startState(level));
  const [day, setDay] = useState(0);
  const [moves, setMoves] = useState<number[]>([]);
  const [log, setLog] = useState<DayResult[]>([]);
  const [report, setReport] = useState<DayResult | null>(null);
  const [over, setOver] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mode = level.band === "sprout" ? "numbers" : level.band === "adventurer" ? "arrows" : "hidden";
  const failed = log.length ? log[log.length - 1].failed : null;
  const m = state.meters;
  const event = events[Math.min(day, events.length - 1)];

  async function finish(all: number[]) {
    setBusy(true);
    setError(null);
    try {
      const res = await onFinish(all);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save the game.");
    } finally {
      setBusy(false);
    }
  }

  function choose(i: number) {
    if (report || over) return;
    const r = playDay(level, state, day, i);
    const nextMoves = [...moves, i];
    setMoves(nextMoves);
    setState(r.state);
    setLog((l) => [...l, r.result]);
    setReport(r.result);
    const lowNow = (["s", "h", "m"] as Meter[]).some((k) => r.state.meters[k] <= 25);
    const net = ORDER.reduce((sum, k) => sum + r.result.after[k] - r.result.before[k], 0);
    chime(r.result.failed || lowNow ? "oops" : net >= 0 ? "right" : "oops");
    if (r.result.failed || day + 1 >= level.days) {
      setOver(true);
      void finish(nextMoves);
    }
  }

  function nextDay() {
    setReport(null);
    setDay((d) => d + 1);
  }

  const low = Math.min(m.s, m.h, m.m, m.t);
  const showResult = over && !report;

  return (
    <div className={`mg expedition ${level.band === "strategist" ? css.dark : ""}`}>
      <div className="mg-hud">
        <span className="chip">
          📅 Day {Math.min(day + 1, level.days)} of {level.days}
        </span>
        <span className="chip">
          ⭐⭐⭐ every meter {level.three}+
        </span>
      </div>

      <div className={css.meters}>
        {ORDER.map((k) => (
          <MeterBar key={k} k={k} value={m[k]} />
        ))}
      </div>

      <div className={css.trail} aria-label="The journey, day by day">
        {events.map((e, i) => {
          const done = i < log.length;
          const lost = done && log[i].failed;
          return (
            <span key={i} className={`${css.trailDay} ${i === day && !over ? css.now : ""} ${done ? css.done : ""} ${lost ? css.lost : ""}`} title={done ? e.title : `Day ${i + 1}`}>
              {done ? (lost ? "🆘" : e.icon) : i === level.days - 1 ? "🏁" : "·"}
            </span>
          );
        })}
      </div>

      <div className={css.scene} aria-hidden>
        <div className={css.mountains} />
        {(event.id === "blizzard" || event.id === "cold") && !showResult && <div className={css.snow} />}
        <div className={css.team}>
          {CREW.map((h, i) => (
            <span key={i} className={css.walker}>
              <PixelSprite grid={heroGrid(h)} scale={3} />
            </span>
          ))}
          <span className={css.walker}>
            <PixelSprite grid={sled} scale={3} />
          </span>
          {petGrid("dog") && (
            <span className={css.walker}>
              <PixelSprite grid={petGrid("dog")!} scale={3} />
            </span>
          )}
        </div>
        <div className={css.tent}>
          <PixelSprite grid={propGrid("tent")} scale={3} />
        </div>
        <div className={css.eventIcon}>{showResult ? (failed ? "🆘" : "🏁") : event.icon}</div>
      </div>

      {!over && !report && (
        <div className={css.card}>
          <div className={css.cardTitle}>
            <span>{event.icon}</span>
            <span>
              Day {day + 1}: {event.title}
            </span>
          </div>
          <div>{event.text}</div>
          <div className="kmuted small">
            {mode === "numbers" && "Each choice shows exactly what it changes. Every choice helps something and costs something."}
            {mode === "arrows" && "Arrows show which way each meter moves (▲▲ or ▼▼ means a lot). You'll find out how much."}
            {mode === "hidden" && "No numbers out here. Think it through: some choices come back days later."}
          </div>
          <div className={css.choices}>
            {event.choices.map((c, i) => (
              <button key={i} type="button" className={css.choice} onClick={() => choose(i)}>
                <span>{c.label}</span>
                {(mode !== "hidden" || c.gamble) && (
                  <span className={css.fxRow}>
                    {mode !== "hidden" && <FxChips fx={preview(level, c)} mode={mode} />}
                    {c.gamble && <span className={`${css.fx} ${css.unsure}`}>❓ result uncertain</span>}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {report && (
        <div className={`day-report ${report.failed ? "bad" : ORDER.reduce((s, k) => s + report.after[k] - report.before[k], 0) >= 0 ? "good" : "bad"}`}>
          <strong>
            Day {report.day + 1}: {report.event.title}
          </strong>
          <div className={css.lines}>
            {report.lines.map((l, i) => (
              <div key={i} className={`${css.line} ${l.kind === "later" ? css.later : ""}`}>
                <span>
                  {l.kind === "choice" ? "You chose: " : l.kind === "later" ? "↩ " : ""}
                  {l.text}
                </span>
                <span className={css.fxRow}>
                  <FxChips fx={l.fx} mode="numbers" />
                </span>
              </div>
            ))}
          </div>
          <p>{report.event.choices[report.choice].why}</p>
          <div className={css.lesson}>
            <strong>Leaders weigh: </strong>
            {report.event.lesson}
          </div>
          {report.event.story && (
            <div className={css.story} style={{ marginTop: 8 }}>
              <strong>True story: </strong>
              {report.event.story}
            </div>
          )}
          {report.failed && <p style={{ fontWeight: 800 }}>{FAIL[report.failed]}</p>}
          <div style={{ marginTop: 10 }}>
            {over ? (
              <button type="button" className="kbtn big game-btn" onClick={() => setReport(null)}>
                {report.failed ? "See what happened" : "Reach safety 🏁"}
              </button>
            ) : (
              <button type="button" className="kbtn big game-btn" onClick={nextDay}>
                Next day ▶
              </button>
            )}
          </div>
        </div>
      )}

      {showResult && (
        <div className="mg-result">
          <h2 className="pixel-title">{failed ? "Waiting for rescue" : "Everyone made it!"}</h2>
          <p>
            {failed
              ? FAIL[failed]
              : `After ${level.days} days on the ice, your whole team reached safety. Your weakest meter ended at ${low} (3 stars needs ${level.three}, 2 stars needs ${level.two}).`}
          </p>
          {busy && <p className="kmuted">Writing up the expedition log…</p>}
          {error && <p className="kmuted">{error}</p>}
          {result && (
            <>
              <div className="mg-stars" aria-label={`${result.stars} of 3 stars`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`star ${result.stars >= n ? "lit pop" : ""}`} style={{ animationDelay: `${n * 0.15}s` }}>
                    ★
                  </span>
                ))}
              </div>
              {result.xp > 0 && <p className="kmuted">+{result.xp} XP for new stars!</p>}
              {result.stars < 3 && (
                <p className="kmuted small">
                  Tip: watch your weakest meter, not just the biggest one. {level.band === "strategist" ? "Some choices come back days later, so think ahead." : "A team is only as strong as its weakest part."}
                </p>
              )}
            </>
          )}
          <div className={css.weigh}>
            <strong>What good leaders weigh</strong>
            <ul>
              <li>Share the hardship: the leader eats, hauls and sleeps like the team.</li>
              <li>Keep spirits up: hope is a supply, just like food.</li>
              <li>Decide with what you know, then commit, and stay ready to adjust.</li>
              <li>Care for the weakest: the team watches how you treat them.</li>
            </ul>
            <p className="kmuted small">
              The real Endurance crew spent almost two years stranded in Antarctica (1914 to 1916). Thanks to steady leadership, all 28 men came home.
            </p>
          </div>
          <div className={css.journal}>
            <strong>Expedition journal</strong>
            <ul>
              {log.map((r) => (
                <li key={r.day}>
                  Day {r.day + 1} {r.event.icon} {r.event.title}: {r.event.choices[r.choice].label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
