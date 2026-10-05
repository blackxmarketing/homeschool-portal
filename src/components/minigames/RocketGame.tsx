"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { Grid } from "@/lib/pixel/grid";
import type { Band } from "@/lib/pixel/world";
import { fly, levelById, MAX_ATTEMPTS, ROCKET_LEVELS, type Flight, type Launch, type RocketLevel } from "@/lib/minigames/rocket";
import type { MiniGameUIProps } from "./types";
import css from "./RocketGame.module.css";

const OUT = "#1b1530";

/** A small 16-bit rocket: red nose, round window, fins. */
function rocketGrid(): Grid {
  const g = new Grid(11, 22);
  g.tri(5, 1, 6, 3, "#e03131").set(5, 0, "#e03131");
  g.rect(2, 7, 7, 10, "#eef1fa").rect(7, 7, 2, 10, "#c5cce0").rect(2, 7, 1, 10, "#ffffff");
  g.disc(5, 10, 1.6, "#4dabf7").set(4, 9, "#d0ebff");
  g.rect(2, 14, 7, 1, "#e03131");
  g.rect(0, 15, 2, 4, "#c92a2a").rect(9, 15, 2, 4, "#c92a2a").rect(1, 14, 1, 1, "#c92a2a").rect(9, 14, 1, 1, "#c92a2a");
  g.rect(3, 17, 5, 2, "#868e96");
  return g.outline(OUT);
}

function flameGrid(frame: number): Grid {
  const g = new Grid(7, 9);
  const long = frame % 2 === 0;
  g.tri(3, long ? 8 : 6, 0, 3, "#ff922b");
  // Flip the triangle so the point is at the bottom.
  const f = new Grid(7, 9);
  for (let y = 0; y < 9; y++) for (let x = 0; x < 7; x++) f.set(x, y, g.get(x, 8 - y));
  f.rect(2, 0, 3, long ? 4 : 3, "#ffd43b").set(3, long ? 4 : 3, "#ffd43b").set(3, 0, "#fff3bf");
  return f;
}

function padGrid(moon: boolean): Grid {
  const g = new Grid(20, 4);
  g.rect(0, 1, 20, 3, moon ? "#868e96" : "#495057").rect(2, 0, 16, 1, moon ? "#adb5bd" : "#868e96");
  return g;
}

const bandOf = (id: string): Band => (Object.keys(ROCKET_LEVELS) as Band[]).find((b) => ROCKET_LEVELS[b].some((l) => l.id === id)) ?? "adventurer";
const fmt = (n: number, d = 1) => (Number.isInteger(n) ? String(n) : n.toFixed(d));

/** Height at time t (seconds after launch). */
function heightAt(f: Flight, burn: number, g: number, t: number): number {
  if (t <= burn) return 0.5 * f.accel * t * t;
  const c = t - burn;
  return Math.max(0, f.hBurn + f.vBurnout * c - 0.5 * g * c * c);
}

function Report({ f, level, band }: { f: Flight; level: RocketLevel; band: Band }) {
  const g = level.g;
  const t = level.burn;
  if (!f.liftoff)
    return (
      <>
        <strong>It didn&apos;t lift off!</strong> The engine pushed up {fmt(f.thrust)} N, but gravity pulls the rocket down with {fmt(f.weight)} N. The push has to be{" "}
        <em>bigger</em> than the weight before the rocket can rise.
      </>
    );
  const head =
    f.verdict === "hit" ? (
      <strong>Bullseye! {fmt(f.peak)} m is inside {level.lo}–{level.hi} m.</strong>
    ) : f.verdict === "low" ? (
      <strong>Too low: {fmt(f.peak)} m ({fmt(level.lo - f.peak)} m short).</strong>
    ) : (
      <strong>Too high: {fmt(f.peak)} m ({fmt(f.peak - level.hi)} m over).</strong>
    );
  if (band === "sprout")
    return (
      <>
        {head}
        <div className={css.math}>
          Up push {f.thrust} N − weight {fmt(f.weight)} N = <strong>{fmt(f.net)} N extra push</strong>
        </div>
        <div className="kmuted small">
          {f.verdict === "low"
            ? "Give it more push! More extra push means the rocket speeds up faster and climbs higher."
            : f.verdict === "high"
              ? "Give it less push. Too much extra push sends it past the target."
              : "The extra push sped the rocket up while the engine burned, then it coasted up until gravity stopped it."}
        </div>
      </>
    );
  return (
    <>
      {head}
      <div className={css.math}>
        <div>
          W = m·g = {fmt(f.mass)} × {g} = {fmt(f.weight)} N
        </div>
        <div>
          F = T − W = {fmt(f.thrust)} − {fmt(f.weight)} = {fmt(f.net)} N
        </div>
        <div>
          a = F / m = {fmt(f.net)} ÷ {fmt(f.mass)} = {f.accel.toFixed(2)} m/s²
        </div>
        <div>
          Burn {t} s: v = a·t = {f.vBurnout.toFixed(1)} m/s, h = ½·a·t² = {f.hBurn.toFixed(1)} m
        </div>
        <div>
          Coast: v²/(2g) = {f.hCoast.toFixed(1)} m → <strong>peak {fmt(f.peak)} m</strong>
        </div>
      </div>
      {f.verdict !== "hit" && (
        <div className="kmuted small">
          {band === "adventurer"
            ? f.verdict === "low"
              ? level.thrust.min === level.thrust.max
                ? "Too heavy: with the same force, less mass gives more acceleration (a = F/m)."
                : level.payload.min === level.payload.max
                  ? "Need more acceleration: raise the thrust, so there's more net force on the same mass."
                  : "Need more acceleration: raise the thrust or lighten the load."
              : level.thrust.min === level.thrust.max
                ? "Too light: add mass so the same force gives less acceleration."
                : level.payload.min === level.payload.max
                  ? "Too much acceleration: lower the thrust, so there's less net force on the same mass."
                  : "Too much acceleration: lower the thrust or carry more mass."
            : "Peak height grows faster than the thrust does (the coast depends on v²), so small thrust changes matter. Solve for a, then T = m(g + a)."}
        </div>
      )}
    </>
  );
}

export default function RocketGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <RocketPlay key={level.id} level={level} onFinish={onFinish} /> : null;
}

function RocketPlay({ level, onFinish }: { level: RocketLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const band = bandOf(level.id);
  const moon = level.world === "moon";
  const rocket = useMemo(() => rocketGrid(), []);
  const flames = useMemo(() => [flameGrid(0), flameGrid(1)], []);
  const pad = useMemo(() => padGrid(moon), [moon]);

  const thrustFixed = level.thrust.min === level.thrust.max;
  const payloadFixed = level.payload.min === level.payload.max;
  const [thrust, setThrust] = useState(thrustFixed ? level.thrust.min : band === "strategist" ? 0 : Math.round(level.thrust.max / 2 / level.thrust.step) * level.thrust.step);
  const [thrustText, setThrustText] = useState("");
  const [payload, setPayload] = useState(payloadFixed ? level.payload.min : Math.round((level.payload.min + level.payload.max) / 2));
  const [moves, setMoves] = useState<Launch[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [anim, setAnim] = useState<{ h: number; flame: boolean; frame: number } | null>(null);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const last = flights[flights.length - 1];
  const flying = anim !== null;
  const won = flights.some((f) => f.hit);
  const over = won || flights.length >= MAX_ATTEMPTS;
  const top = Math.max(level.hi * 1.5, 10);
  const mass = level.dryMass + payload;
  const weight = mass * level.g;
  const strategistValid = band !== "strategist" || (thrustText.trim() !== "" && Number.isFinite(Number(thrustText)));
  const pct = (h: number) => Math.min(100, (h / top) * 100);

  function launch() {
    if (flying || over) return;
    const T = band === "strategist" ? Math.max(level.thrust.min, Math.min(level.thrust.max, Math.round(Number(thrustText) || 0))) : thrust;
    const f = fly(level, T, payload);
    const nextMoves = [...moves, { thrust: T, payload }];
    setMoves(nextMoves);
    // Animate the real trajectory, squeezed into about 2.4 seconds.
    const D = f.liftoff ? 2400 : 900;
    const start = performance.now();
    const step = (now: number) => {
      const s = Math.min(1, (now - start) / D);
      const t = s * f.tPeak;
      setAnim({ h: f.liftoff ? heightAt(f, level.burn, level.g, t) : 0, flame: f.liftoff ? t < level.burn : s < 0.8, frame: Math.floor(now / 90) });
      if (s < 1) raf.current = requestAnimationFrame(step);
      else land(f, nextMoves);
    };
    raf.current = requestAnimationFrame(step);
  }

  async function land(f: Flight, nextMoves: Launch[]) {
    setAnim(null);
    const all = [...flights, f];
    setFlights(all);
    chime(f.hit ? "right" : "oops");
    if (f.hit || all.length >= MAX_ATTEMPTS) {
      setBusy(true);
      setError("");
      try {
        const res = await onFinish(nextMoves);
        setResult(res);
        if (res.stars > 0) setTimeout(() => chime("streak"), 400);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Couldn't save the game.");
      } finally {
        setBusy(false);
      }
    }
  }

  const shownH = anim ? anim.h : last ? (last.liftoff ? last.peak : 0) : 0;
  const offTop = shownH > top;

  return (
    <div className={`mg ${css.rocket}`}>
      <div className="mg-hud">
        <span className="chip">🎯 {level.lo}–{level.hi} m</span>
        <span className="chip">
          🚀 Launch {Math.min(flights.length + (over ? 0 : 1), MAX_ATTEMPTS)} of {MAX_ATTEMPTS}
        </span>
        <span className="chip">{moon ? "🌙" : "🌍"} g = {level.g} m/s²</span>
        {band !== "sprout" && <span className="chip">⏱ burn {level.burn} s</span>}
      </div>

      <div className={`mg-scene ${css.scene} ${moon ? css.moon : ""}`} aria-label={last ? `Last launch reached ${fmt(last.peak)} metres` : "Rocket on the launch pad"}>
        <div className={css.ground} />
        <div className={css.pad}>
          <PixelSprite grid={pad} scale={3} />
        </div>
        <div className={css.sky}>
          <div className={css.band} style={{ bottom: `${pct(level.lo)}%`, height: `${pct(level.hi) - pct(level.lo)}%` }}>
            <span>
              {level.lo}–{level.hi} m
            </span>
          </div>
          {[0.25, 0.5, 0.75, 1].map((k) => (
            <span key={k} className={css.tick} style={{ bottom: `${k * 100}%` }}>
              {Math.round(top * k)} m
            </span>
          ))}
          {flights.map((f, i) => (
            <span key={i} className={`${css.mark} ${f.hit ? css.markHit : ""}`} style={{ bottom: `${pct(f.peak)}%` }} title={`Launch ${i + 1}: ${fmt(f.peak)} m`}>
              {i + 1}
            </span>
          ))}
          <div className={css.ship} style={{ bottom: `${offTop ? 100 : pct(shownH)}%` }}>
            <PixelSprite grid={rocket} scale={3} title="Rocket" />
            {anim?.flame && (
              <span className={css.flame}>
                <PixelSprite grid={flames[anim.frame % 2]} scale={3} />
              </span>
            )}
          </div>
        </div>
        <span className={css.alt}>
          {offTop ? "↑ " : ""}
          {fmt(Math.round(shownH * 10) / 10)} m
        </span>
      </div>

      {last && !flying && (
        <div className={`day-report ${last.hit ? "good" : "bad"}`}>
          <Report f={last} level={level} band={band} />
        </div>
      )}

      {!over ? (
        <div className="mg-controls">
          <div className="kmuted small">
            Cargo: {level.cargo}. {band === "sprout" ? `The rocket's weight pulls down with ${fmt(weight)} N.` : `Total mass m = ${level.dryMass} + ${payload} = ${mass} kg.`}
          </div>
          {band === "strategist" ? (
            <>
              <label>
                Engine thrust T (newtons)
                <input
                  className={css.num}
                  type="number"
                  inputMode="decimal"
                  min={level.thrust.min}
                  max={level.thrust.max}
                  step={1}
                  value={thrustText}
                  placeholder="Compute it first"
                  onChange={(e) => setThrustText(e.target.value)}
                  disabled={flying}
                />
              </label>
              <details className={css.eq}>
                <summary>The equations</summary>
                <div className={css.math}>
                  <div>W = m·g, F = T − W, a = F/m</div>
                  <div>Burn (t s): v = a·t, h₁ = ½·a·t²</div>
                  <div>Coast: h₂ = v² / (2g)</div>
                  <div>Peak h = ½·a·t²·(1 + a/g)</div>
                  <div>So a² + g·a − 2gh/t² = 0 → a = (−g + √(g² + 8gh/t²)) / 2</div>
                  <div>Then T = m·(g + a). Thrust is rounded to the nearest newton.</div>
                </div>
              </details>
            </>
          ) : (
            <>
              {thrustFixed ? (
                <div>
                  Engine thrust: <strong>{level.thrust.min} N</strong> <span className="kmuted small">(fixed)</span>
                </div>
              ) : (
                <label>
                  Engine push (thrust): <strong>{thrust} N</strong>
                  <input type="range" min={level.thrust.min} max={level.thrust.max} step={level.thrust.step} value={thrust} disabled={flying} onChange={(e) => setThrust(Number(e.target.value))} />
                </label>
              )}
              {band === "sprout" && (
                <div className={css.nudge}>
                  <button type="button" className="kbtn ghost" disabled={flying || thrust <= level.thrust.min} onClick={() => setThrust((v) => Math.max(level.thrust.min, v - level.thrust.step))}>
                    − Less push
                  </button>
                  <button type="button" className="kbtn ghost" disabled={flying || thrust >= level.thrust.max} onClick={() => setThrust((v) => Math.min(level.thrust.max, v + level.thrust.step))}>
                    More push +
                  </button>
                </div>
              )}
              {!payloadFixed && (
                <label>
                  Payload mass: <strong>{payload} kg</strong>
                  {level.payload.min > 0 && <span className="kmuted small"> (at least {level.payload.min} kg)</span>}
                  <input type="range" min={level.payload.min} max={level.payload.max} step={level.payload.step} value={payload} disabled={flying} onChange={(e) => setPayload(Number(e.target.value))} />
                </label>
              )}
              {band === "adventurer" && (
                <div className="kmuted small">
                  Weight W = m·g = {fmt(weight)} N · Net force F = T − W = {fmt(thrust - weight)} N{thrust > weight ? ` · a = F/m = ${((thrust - weight) / mass).toFixed(2)} m/s²` : " (no lift-off!)"}
                </div>
              )}
            </>
          )}
          <button className="kbtn big game-btn" onClick={launch} disabled={flying || !strategistValid}>
            {flying ? "Flying…" : "Launch 🚀"}
          </button>
        </div>
      ) : (
        <div className="mg-result">
          <h2 className="pixel-title">{won ? "Mission complete!" : "Out of launches"}</h2>
          <p>{won ? `${level.cargo[0].toUpperCase()}${level.cargo.slice(1)} reached ${fmt(last!.peak)} m on launch ${flights.length}.` : `None of your ${MAX_ATTEMPTS} launches landed in ${level.lo}–${level.hi} m. Look at the reports and try again!`}</p>
          {busy && <p className="kmuted">Checking the flight data…</p>}
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
                  {band === "sprout"
                    ? "Tip: if it went too low, add push; too high, take some away. Halfway between a too-low and a too-high launch is a good next guess."
                    : band === "adventurer"
                      ? "Tip: use a = F/m. Heavier rockets need more force for the same acceleration."
                      : "Tip: solve the quadratic for a, then T = m(g + a), before the first launch for 3 stars."}
                </p>
              )}
            </>
          )}
          <div className="day-log">
            {flights.map((f, i) => (
              <span key={i}>
                #{i + 1} {fmt(f.thrust)} N{payloadFixed ? "" : ` · ${f.payload} kg`} → {fmt(f.peak)} m {f.hit ? "✅" : ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
