"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { Grid, shade } from "@/lib/pixel/grid";
import { propGrid } from "@/lib/pixel/objects";
import { PALETTES } from "@/lib/pixel/world";
import {
  chartH,
  chartW,
  cleanLeg,
  destCell,
  FIX_COST,
  legLesson,
  levelById,
  MIN_BEARING_LEG,
  POINT_NAME,
  POINTS8,
  REEF_COST,
  replay,
  round1,
  startPos,
  toEN,
  type Leg,
  type LegResult,
  type VoyageLevel,
} from "@/lib/minigames/voyage";
import type { MiniGameUIProps } from "./types";
import styles from "./VoyageGame.module.css";

const T = 8; // pixels per chart square

/** The sea chart as pixel art: water, shallows, islands, reefs, the home port and the destination. */
function chartGrid(l: VoyageLevel): Grid {
  const pal = PALETTES[l.band];
  const W = chartW(l);
  const H = chartH(l);
  const g = new Grid(W * T, H * T);
  const at = (x: number, y: number) => (y < 0 || y >= H || x < 0 || x >= W ? "." : l.chart[y][x]);
  const isLand = (x: number, y: number) => at(x, y) === "#";
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const c = at(x, y);
      const ox = x * T;
      const oy = y * T;
      const nearLand = isLand(x - 1, y) || isLand(x + 1, y) || isLand(x, y - 1) || isLand(x, y + 1);
      const sea = c === "*" || nearLand ? pal.shallow : (x + y) % 2 ? pal.water : shade(pal.water, -0.04);
      g.rect(ox, oy, T, T, sea);
      if (c === "." && (x * 3 + y * 5) % 4 === 0) g.rect(ox + 2, oy + 3, 3, 1, shade(sea, 0.25));
      if (c === "#") {
        g.rect(ox, oy, T, T, pal.grass);
        if (!isLand(x, y - 1)) g.rect(ox, oy, T, 2, pal.sand);
        if (!isLand(x, y + 1)) g.rect(ox, oy + T - 2, T, 2, pal.sand);
        if (!isLand(x - 1, y)) g.rect(ox, oy, 2, T, pal.sand);
        if (!isLand(x + 1, y)) g.rect(ox + T - 2, oy, 2, T, pal.sand);
        if ((x * 7 + y * 3) % 3 === 0) g.disc(ox + 4, oy + 4, 1.6, pal.forest);
      }
      if (c === "*") {
        g.rect(ox + 1, oy + 4, 3, 2, "#6c6258").rect(ox + 4, oy + 2, 3, 3, "#80766a").rect(ox + 5, oy + 2, 1, 1, "#a39a8e");
        g.set(ox + 1, oy + 3, "#ffffff").set(ox + 4, oy + 6, "#ffffff").set(ox + 7, oy + 5, "#ffffff").set(ox + 3, oy + 1, "#ffffff");
      }
      if (c === "P") {
        g.rect(ox + 1, oy + 5, 6, 2, "#8a5a2a").rect(ox + 1, oy + 7, 1, 1, "#5a3a22").rect(ox + 6, oy + 7, 1, 1, "#5a3a22");
        g.rect(ox + 2, oy + 2, 4, 3, "#f1e3c6").rect(ox + 2, oy + 1, 4, 1, "#c0392b");
      }
      if (c === "D") {
        g.rect(ox, oy, T, T, pal.sand);
        g.rect(ox + 2, oy + 1, 1, 6, "#5a3a22").rect(ox + 3, oy + 1, 4, 3, "#f59f00").rect(ox + 3, oy + 2, 4, 1, "#e03131");
        g.rect(ox + 1, oy + 7, 3, 1, "#5a3a22");
      }
    }
  return g;
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const deg = (b: number) => `${String(b).padStart(3, "0")}°`;
const rad = (b: number) => (b * Math.PI) / 180;

/** The leg as the kid would say it. */
function legWords(l: VoyageLevel, r: LegResult): string {
  if (l.mode === "bearing") return `Bearing ${r.leg.label}, ${fmt(r.leg.dist)} leagues`;
  const unit = l.band === "sprout" ? "square" : "league";
  return `${POINT_NAME[r.leg.label]} ${r.leg.dist} ${unit}${r.leg.dist === 1 ? "" : "s"}`.replace(/^./, (c) => c.toUpperCase());
}

export default function VoyageGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Voyage level={level} onFinish={onFinish} /> : null;
}

function Voyage({ level, onFinish }: { level: VoyageLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const W = chartW(level);
  const H = chartH(level);
  const isBearing = level.mode === "bearing";
  const unit = level.band === "sprout" ? "squares" : "leagues";
  const chart = useMemo(() => chartGrid(level), [level]);
  const ship = useMemo(() => propGrid("ship"), []);
  const shipWest = useMemo(() => propGrid("ship").flipX(), []);

  const [moves, setMoves] = useState<Leg[]>([]);
  const [point, setPoint] = useState<string>("E");
  const [bearing, setBearing] = useState(45);
  const [dist, setDist] = useState(isBearing ? 5 : 3);
  const [shipAt, setShipAt] = useState(() => startPos(level));
  const [facingWest, setFacingWest] = useState(false);
  const [bump, setBump] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sent = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const game = useMemo(() => replay(level, moves), [level, moves]);
  const last = game.legs[game.legs.length - 1];
  const pos = last ? last.to : startPos(level);
  const supplies = last ? Math.max(0, last.suppliesAfter) : level.supplies;
  const finished = game.arrived || game.lost;
  const dest = destCell(level);

  const planned = isBearing ? { h: bearing, d: dist } : { h: point, d: dist };
  const plan = cleanLeg(level, planned);
  const planEnd = plan
    ? isBearing
      ? { x: pos.x + Math.sin(rad(plan.bearing)) * plan.dist, y: pos.y - Math.cos(rad(plan.bearing)) * plan.dist }
      : (() => {
          const s = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SW: [-1, 1], W: [-1, 0], NW: [-1, -1] }[plan.label] ?? [0, 0];
          return { x: pos.x + s[0] * plan.dist, y: pos.y + s[1] * plan.dist };
        })()
    : null;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!finished || sent.current) return;
    sent.current = true;
    setBusy(true);
    onFinish(moves)
      .then((res) => {
        setResult(res);
        if (res.stars > 0) setTimeout(() => chime("streak"), 400);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Couldn't save the voyage."))
      .finally(() => setBusy(false));
  }, [finished, moves, onFinish]);

  function sail() {
    if (!plan || finished) return;
    const next = [...moves, planned];
    const r = replay(level, next);
    const leg = r.legs[r.legs.length - 1];
    if (!leg) return;
    setMoves(next);
    setFacingWest(leg.sailedTo.x < leg.from.x - 0.01 || (leg.sailedTo.x === leg.from.x && facingWest));
    // Sail first, then let the current carry the ship.
    setShipAt(leg.sailedTo);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShipAt(leg.to), 750);
    if (leg.hit === "reef" || leg.hit === "land") {
      setBump(true);
      setTimeout(() => setBump(false), 600);
    }
    chime(leg.arrived ? "right" : leg.hit ? "oops" : "right");
  }

  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const star3 = `${fmt(level.stars3)}+`;
  const enPos = toEN(level, pos);
  const enDest = { e: dest.x + 0.5, n: H - dest.y - 0.5 };

  return (
    <div className={`mg ${styles.voyage} ${styles[level.band]}`}>
      <div className="mg-hud">
        <span className="chip">🧭 Leg {Math.min(game.legs.length + (finished ? 0 : 1), 99)}</span>
        <span className={`chip ${supplies <= 3 ? "hot" : ""}`}>🍞 {fmt(round1(supplies))} days of supplies</span>
        <span className="chip">⭐⭐⭐ = {star3} days left</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${Math.max(0, Math.min(100, (supplies / level.supplies) * 100))}%` }} />
      </div>


      <div className={styles.chartWrap}>
        <div className={`${styles.chart} ${bump ? styles.bump : ""}`} style={{ aspectRatio: `${W} / ${H}` }}>
          <PixelSprite grid={chart} scale={1} className={styles.chartImg} title={`Sea chart from ${level.from} to ${level.to}`} />
          <svg className={styles.overlay} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
            {Array.from({ length: W - 1 }, (_, i) => (
              <line key={`v${i}`} x1={i + 1} y1={0} x2={i + 1} y2={H} className={styles.gridline} />
            ))}
            {Array.from({ length: H - 1 }, (_, i) => (
              <line key={`h${i}`} x1={0} y1={i + 1} x2={W} y2={i + 1} className={styles.gridline} />
            ))}
            {game.legs.map((r, i) => (
              <g key={i}>
                <line x1={r.from.x} y1={r.from.y} x2={r.sailedTo.x} y2={r.sailedTo.y} className={styles.track} />
                {(r.to.x !== r.sailedTo.x || r.to.y !== r.sailedTo.y) && <line x1={r.sailedTo.x} y1={r.sailedTo.y} x2={r.to.x} y2={r.to.y} className={styles.drift} />}
                {r.hit && <circle cx={r.sailedTo.x} cy={r.sailedTo.y} r={0.18} className={styles.hitMark} />}
              </g>
            ))}
            {!finished && planEnd && <line x1={pos.x} y1={pos.y} x2={planEnd.x} y2={planEnd.y} className={styles.plan} />}
            {isBearing &&
              Array.from({ length: W + 1 }, (_, i) =>
                i % 2 === 0 ? (
                  <text key={`te${i}`} x={i + 0.08} y={H - 0.12} className={styles.tick}>
                    {i}
                  </text>
                ) : null,
              )}
            {isBearing &&
              Array.from({ length: H + 1 }, (_, i) =>
                i % 2 === 0 && i > 0 ? (
                  <text key={`tn${i}`} x={0.08} y={H - i + 0.36} className={styles.tick}>
                    {i}
                  </text>
                ) : null,
              )}
          </svg>
          <span className={styles.ship} style={{ left: pct(shipAt.x, W), top: pct(shipAt.y, H), width: pct(1.3, W) }}>
            <PixelSprite grid={facingWest ? shipWest : ship} scale={1} title="Your ship" />
          </span>
          <span className={styles.north} aria-label="North is up">
            N<br />▲
          </span>
          {(level.current.east !== 0 || level.current.north !== 0) && (
            <span className={styles.current}>
              Current{" "}
              <span style={{ display: "inline-block", transform: `rotate(${Math.atan2(level.current.east, level.current.north)}rad)` }}>↑</span>
            </span>
          )}
        </div>
        <div className={styles.legend}>
          <span>🏠 {level.from}</span>
          <span>🚩 {level.to}</span>
          <span>
            <i className={styles.reefKey} /> reef
          </span>
          {!finished && <span className={styles.planKey}>- - planned leg</span>}
        </div>
      </div>

      <details className={styles.history} open={game.legs.length === 0}>
        <summary>📜 From history: {level.title}</summary>
        <p>{level.history}</p>
      </details>

      {last && (
        <div className={`day-report ${last.arrived ? "good" : last.hit ? "bad" : "good"}`}>
          <strong>
            Leg {game.legs.length}: {legWords(level, last)}.
          </strong>{" "}
          {last.hit && !last.hitInDrift ? `You stopped after ${fmt(last.sailed)} ${last.sailed === 1 ? unit.slice(0, -1) : unit}. ` : ""}
          <div className="math-line">
            Supplies: {fmt(round1(last.sailed))} sailing + {FIX_COST} for the fix{last.hit === "reef" ? ` + ${REEF_COST} repairs` : ""} = {fmt(round1(last.cost))} days used,{" "}
            {fmt(round1(Math.max(0, last.suppliesAfter)))} left
          </div>
          {isBearing && (
            <div className="math-line">
              ΔE = d·sin θ = {fmt(last.sailed)}·sin {deg(last.leg.bearing)} = {(last.sailed * Math.sin(rad(last.leg.bearing))).toFixed(2)}; ΔN = d·cos θ ={" "}
              {(last.sailed * Math.cos(rad(last.leg.bearing))).toFixed(2)}
              {!last.arrived && <>; then the current sets you ({fmt(level.current.east)} E, {fmt(level.current.north)} N)</>} → now at (E {toEN(level, last.to).e}, N{" "}
              {toEN(level, last.to).n})
            </div>
          )}
          <div className="kmuted small">{legLesson(level, last)}</div>
        </div>
      )}

      {!finished ? (
        <div className={`mg-controls ${styles.controls}`}>
          {level.mode === "cardinal" && (
            <div className={styles.rose4} role="group" aria-label="Pick a direction">
              {(["N", "W", "E", "S"] as const).map((p) => (
                <button key={p} type="button" className={`${styles.pt} ${styles[`p${p}`]} ${point === p ? styles.on : ""}`} onClick={() => setPoint(p)} aria-pressed={point === p}>
                  {p}
                  <small>{POINT_NAME[p]}</small>
                </button>
              ))}
              <span className={styles.roseMid}>🧭</span>
            </div>
          )}
          {level.mode === "compass8" && (
            <div className={styles.rose8} role="group" aria-label="Pick a compass point">
              {POINTS8.map((p) => (
                <button key={p} type="button" className={`${styles.pt} ${styles[`p${p}`]} ${point === p ? styles.on : ""}`} onClick={() => setPoint(p)} aria-pressed={point === p}>
                  {p}
                </button>
              ))}
              <span className={styles.roseMid}>🧭</span>
            </div>
          )}
          {isBearing && (
            <label>
              Bearing θ: <strong>{deg(Math.round(bearing) % 360)}</strong>
              <div className={styles.numRow}>
                <input type="range" min={0} max={359} step={1} value={bearing} onChange={(e) => setBearing(Number(e.target.value))} />
                <input type="number" inputMode="numeric" min={0} max={359} step={1} value={bearing} onChange={(e) => setBearing(Math.max(0, Math.min(359, Number(e.target.value) || 0)))} aria-label="Bearing in degrees" />
              </div>
            </label>
          )}
          {isBearing ? (
            <label>
              Distance d: <strong>{fmt(dist)} leagues</strong>
              <div className={styles.numRow}>
                <input type="range" min={MIN_BEARING_LEG} max={level.maxLeg} step={0.1} value={dist} onChange={(e) => setDist(round1(Number(e.target.value)))} />
                <input
                  type="number"
                  inputMode="decimal"
                  min={MIN_BEARING_LEG}
                  max={level.maxLeg}
                  step={0.1}
                  value={dist}
                  onChange={(e) => setDist(Math.max(MIN_BEARING_LEG, Math.min(level.maxLeg, round1(Number(e.target.value) || MIN_BEARING_LEG))))}
                  aria-label="Distance in leagues"
                />
              </div>
            </label>
          ) : (
            <div className={styles.stepper}>
              <span>
                Sail <strong>{POINT_NAME[point]}</strong> for
              </span>
              <button type="button" className="kbtn ghost" onClick={() => setDist((d) => Math.max(1, d - 1))} aria-label="One square fewer">
                −
              </button>
              <strong className={styles.distNum}>{dist}</strong>
              <button type="button" className="kbtn ghost" onClick={() => setDist((d) => Math.min(level.maxLeg, d + 1))} aria-label="One square more">
                +
              </button>
              <span>{unit}</span>
            </div>
          )}
          {isBearing && (
            <div className={styles.notebook}>
              <strong>Navigator&apos;s notebook</strong>
              <div className="math-line">
                Ship (E {enPos.e}, N {enPos.n}) → {level.to} (E {enDest.e}, N {enDest.n})
              </div>
              <div className="math-line">
                This leg: ΔE = {fmt(dist)}·sin {deg(bearing)} = {(dist * Math.sin(rad(bearing))).toFixed(2)}, ΔN = {fmt(dist)}·cos {deg(bearing)} = {(dist * Math.cos(rad(bearing))).toFixed(2)}
              </div>
              <div className="math-line">
                Then the current: + ({fmt(level.current.east)} E, {fmt(level.current.north)} N). Needed: θ = atan2(ΔE, ΔN), d = √(ΔE² + ΔN²)
              </div>
            </div>
          )}
          {!isBearing && (
            <div className="kmuted small">
              This leg uses {level.mode === "compass8" && point.length === 2 ? `${dist} × 1.4 = ${fmt(round1(dist * Math.SQRT2))}` : dist} days of sailing + {FIX_COST} day to take a fix.
            </div>
          )}
          <button type="button" className="kbtn big game-btn" onClick={sail} disabled={!plan}>
            Set sail ⛵
          </button>
        </div>
      ) : (
        <div className="mg-result">
          <h2 className="pixel-title">{game.arrived ? "Land ho!" : "Out of supplies"}</h2>
          <p>
            {game.arrived ? (
              <>
                You reached {level.to} in {game.legs.length} legs with <strong>{fmt(game.suppliesLeft)} days</strong> of supplies left.
              </>
            ) : (
              <>Your crew ran out of food and water before reaching {level.to}, so the ship had to turn for home.</>
            )}
          </p>
          {busy && <p className="kmuted">Checking the ship&apos;s log…</p>}
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
                  Tip: 3 stars needs {star3} days left ({fmt(level.stars2)}+ for 2).{" "}
                  {isBearing ? "Aim each leg at where you want to end up minus the current, and use as few legs as you safely can." : "Count the squares before each leg, and plan routes with fewer turns."}
                </p>
              )}
            </>
          )}
          <div className="day-log">
            {game.legs.map((r, i) => (
              <span key={i}>
                {r.leg.label} {fmt(r.leg.dist)}
                {r.hit === "reef" ? " 💥" : r.hit ? " ⚓" : ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
