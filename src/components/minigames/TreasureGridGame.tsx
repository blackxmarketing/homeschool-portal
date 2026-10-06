"use client";

import { useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, SayButton } from "../voice";
import type { Grid } from "@/lib/pixel/grid";
import {
  BUILD_MAX,
  MAX_TRIES,
  backdropGrid,
  checkStep,
  chestGrid,
  cubesGrid,
  explorerGrid,
  flagGrid,
  gemGrid,
  levelById,
  maxPoints,
  pairText,
  scopeGrid,
  scoreRound,
  snap,
  solveStep,
  type Answer,
  type Board,
  type Dims,
  type MarkIcon,
  type Prism,
  type Pt,
  type RoundMove,
  type Step,
  type TGLevel,
  type TGRound,
} from "@/lib/minigames/treasuregrid";
import type { MiniGameUIProps } from "./types";
import css from "./TreasureGridGame.module.css";

const SPRITES: Record<Exclude<MarkIcon, "dot">, Grid> = {
  chest: chestGrid(),
  flag: flagGrid(),
  scope: scopeGrid(),
  gem: gemGrid(),
  explorer: explorerGrid(),
};
const BACKDROP = backdropGrid(48, 40);

/** A pixel sprite inside the board's SVG, centred on (cx, cy) with its feet at cy. */
function SvgSprite({ grid, cx, cy, size }: { grid: Grid; cx: number; cy: number; size: number }) {
  const runs = useMemo(() => grid.runs(), [grid]);
  const k = size / Math.max(grid.w, grid.h);
  return (
    <g transform={`translate(${cx - (grid.w * k) / 2} ${cy - grid.h * k}) scale(${k})`} shapeRendering="crispEdges" pointerEvents="none">
      {runs.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
      ))}
    </g>
  );
}

const VW = 340;
const VH = 300;
const PAD = { l: 34, r: 14, t: 24, b: 34 };

interface BoardView {
  board: Board;
  marks: { at: Pt; icon: MarkIcon; label?: string; hot?: boolean }[];
  line: Pt[];
  misses: Pt[];
  sel: Pt | null;
  explorer: boolean;
  tappable: boolean;
  onTap: (p: Pt) => void;
}

function MapBoard({ board, marks, line, misses, sel, explorer, tappable, onTap }: BoardView) {
  const ref = useRef<SVGSVGElement>(null);
  const pw = VW - PAD.l - PAD.r;
  const ph = VH - PAD.t - PAD.b;
  const X = (x: number) => PAD.l + (x / board.xMax) * pw;
  const Y = (y: number) => PAD.t + ph - (y / board.yMax) * ph;
  const xs = Array.from({ length: board.xMax / board.xStep + 1 }, (_, i) => i * board.xStep);
  const ys = Array.from({ length: board.yMax / board.yStep + 1 }, (_, i) => i * board.yStep);
  const cell = Math.min(pw / (xs.length - 1), ph / (ys.length - 1));
  const sprite = Math.max(16, Math.min(26, cell * 1.1));
  const bgRuns = useMemo(() => BACKDROP.runs(), []);

  function tap(e: React.PointerEvent<SVGSVGElement>) {
    if (!tappable || !ref.current) return;
    const m = ref.current.getScreenCTM();
    if (!m) return;
    const p = ref.current.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const q = p.matrixTransform(m.inverse());
    onTap(snap(board, ((q.x - PAD.l) / pw) * board.xMax, ((PAD.t + ph - q.y) / ph) * board.yMax));
  }

  const sorted = [...line].sort((a, b) => a.x - b.x);
  return (
    <svg
      ref={ref}
      className={`${css.board} ${tappable ? css.tappable : ""}`}
      viewBox={`0 0 ${VW} ${VH}`}
      onPointerUp={tap}
      role="img"
      aria-label={`Treasure map: a coordinate grid, x from 0 to ${board.xMax}, y from 0 to ${board.yMax}`}
    >
      <g transform={`translate(${PAD.l} ${PAD.t}) scale(${pw / BACKDROP.w} ${ph / BACKDROP.h})`} shapeRendering="crispEdges" opacity={0.75}>
        {bgRuns.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
        ))}
      </g>
      {xs.map((x) => (
        <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(board.yMax)} className={x === 0 ? css.axis : css.gridline} />
      ))}
      {ys.map((y) => (
        <line key={`y${y}`} y1={Y(y)} y2={Y(y)} x1={X(0)} x2={X(board.xMax)} className={y === 0 ? css.axis : css.gridline} />
      ))}
      {xs.map((x) => (
        <text key={`tx${x}`} x={X(x)} y={Y(0) + 14} className={css.tick} textAnchor="middle">
          {x}
        </text>
      ))}
      {ys.map((y) => (
        <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} className={css.tick} textAnchor="end">
          {y}
        </text>
      ))}
      <text x={X(board.xMax)} y={VH - 4} className={css.axisLabel} textAnchor="end">
        {board.xLabel ?? "x"} →
      </text>
      <text x={X(0)} y={12} className={css.axisLabel} textAnchor="middle">
        ↑ {board.yLabel ?? "y"}
      </text>
      {sorted.length > 1 && <polyline points={sorted.map((p) => `${X(p.x)},${Y(p.y)}`).join(" ")} className={css.trail} />}
      {misses.map((p, i) => (
        <g key={`m${i}`} className={css.miss}>
          <line x1={X(p.x) - 5} y1={Y(p.y) - 5} x2={X(p.x) + 5} y2={Y(p.y) + 5} />
          <line x1={X(p.x) - 5} y1={Y(p.y) + 5} x2={X(p.x) + 5} y2={Y(p.y) - 5} />
        </g>
      ))}
      {marks.map((m, i) =>
        m.icon === "dot" ? (
          <circle key={i} cx={X(m.at.x)} cy={Y(m.at.y)} r={5} className={m.hot ? css.dotHot : css.dot} />
        ) : (
          <g key={i}>
            {m.hot && <circle cx={X(m.at.x)} cy={Y(m.at.y)} r={sprite * 0.6} className={css.halo} />}
            <circle cx={X(m.at.x)} cy={Y(m.at.y)} r={3} className={css.dot} />
            <SvgSprite grid={SPRITES[m.icon]} cx={X(m.at.x)} cy={Y(m.at.y) - 2} size={sprite} />
          </g>
        ),
      )}
      {sel && (
        <g>
          <circle cx={X(sel.x)} cy={Y(sel.y)} r={8} className={css.sel} />
          {explorer && <SvgSprite grid={SPRITES.explorer} cx={X(sel.x)} cy={Y(sel.y) - 6} size={sprite} />}
        </g>
      )}
    </svg>
  );
}

const DIM_WORD: Record<keyof Dims, string> = { l: "Length", w: "Width", h: "Height" };

function cubeScale(g: Grid) {
  return Math.max(2, Math.min(5, Math.floor(300 / g.w), Math.floor(170 / g.h)));
}

function Chest({ round, build }: { round: TGRound; build: Dims | null }) {
  const prisms: Prism[] = build ? [build] : round.prisms ?? [];
  const g = cubesGrid(prisms);
  if (!prisms.length) return null;
  return (
    <div className={css.chestView}>
      <PixelSprite grid={g} scale={cubeScale(g)} title={build ? `A chest ${build.l} by ${build.w} by ${build.h}` : "The chest, made of unit cubes"} />
      <div className={css.dimTags}>
        {build ? (
          <span className={css.tag}>
            V = {build.l} × {build.w} × {build.h} = <b>{build.l * build.w * build.h}</b>
          </span>
        ) : (
          prisms.map((p, i) => (
            <span key={i} className={`${css.tag} ${i === 1 ? css.tagB : ""}`}>
              {p.name ? `${p.name}: ` : ""}
              {p.l} long × {p.w} wide × {p.hideHeight ? "?" : p.h} tall
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function stepAnswerText(step: Step): string {
  const a = solveStep(step);
  if (step.kind === "plot" || step.kind === "pair") return pairText(step.at);
  if (step.kind === "num") return `${step.n}${step.unit ? ` ${step.unit}` : ""}`;
  return `${a.l} × ${a.w} × ${a.h} = ${step.volume}`;
}

const toInt = (s: string) => (/^\s*\d{1,3}\s*$/.test(s) ? Number(s) : undefined);

export default function TreasureGridGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <TreasureGrid level={level} onFinish={onFinish} /> : null;
}

function TreasureGrid({ level, onFinish }: { level: TGLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const [ri, setRi] = useState(0);
  const [si, setSi] = useState(0);
  const [tries, setTries] = useState<Answer[][]>([[]]);
  const [sel, setSel] = useState<Pt | null>(level.rounds[0].start ?? null);
  const [xIn, setXIn] = useState("");
  const [yIn, setYIn] = useState("");
  const [nIn, setNIn] = useState("");
  const [dims, setDims] = useState<Dims>({ l: 1, w: 1, h: 1 });
  const [note, setNote] = useState<{ text: string; good: boolean } | null>(null);
  const [phase, setPhase] = useState<"play" | "report">("play");
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);

  const round = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const step = round.steps[Math.min(si, round.steps.length - 1)];
  const max = maxPoints(level);
  const points = moves.reduce((t, m, i) => t + scoreRound(level.rounds[i], m).points, 0);
  const isWalk = round.kind === "walk";

  function startStep(s: Step | undefined) {
    setXIn("");
    setYIn("");
    setNIn("");
    if (s?.kind === "build") setDims({ l: s.fixed?.l ?? 1, w: s.fixed?.w ?? 1, h: s.fixed?.h ?? 1 });
  }

  // Points found so far this round (plotted or read right).
  const found: Pt[] = round.steps.slice(0, si).flatMap((s, i) => ((s.kind === "plot" || s.kind === "pair") && (tries[i]?.length ?? 0) > 0 ? [s.at] : []));
  const misses: Pt[] =
    phase === "play" && step.kind === "plot"
      ? (tries[si] ?? []).filter((a) => !checkStep(step, a).correct).map((a) => ({ x: a.x ?? 0, y: a.y ?? 0 }))
      : [];

  function submit(answer: Answer) {
    if (phase !== "play") return;
    const stepTries = [...(tries[si] ?? []), answer];
    const all = tries.map((t, i) => (i === si ? stepTries : t));
    const c = checkStep(step, answer);
    const last = stepTries.length >= MAX_TRIES;
    if (c.correct) chime("right");
    else chime("oops");
    if (!c.correct && !last) {
      setTries(all);
      setNote({ text: `${c.note} (Try ${stepTries.length + 1} of ${MAX_TRIES}.)`, good: false });
      return;
    }
    const text = c.correct ? c.note : `${c.note} The answer was ${stepAnswerText(step)}.`;
    if (si + 1 < round.steps.length) {
      setTries([...all, []]);
      setSi(si + 1);
      setNote({ text: `${text} Next step!`, good: c.correct });
      setSel(round.start ?? null);
      startStep(round.steps[si + 1]);
      return;
    }
    setTries(all);
    setMoves([...moves, { tries: all }]);
    setNote({ text, good: c.correct });
    setPhase("report");
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      const r = level.rounds[ri + 1];
      setRi(ri + 1);
      setSi(0);
      setTries([[]]);
      setSel(r.start ?? null);
      setNote(null);
      setPhase("play");
      startStep(r.steps[0]);
      return;
    }
    setDone(true);
    setBusy(true);
    try {
      const res = await onFinish(moves);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
    } finally {
      setBusy(false);
    }
  }

  function walk(dx: number, dy: number) {
    const b = round.board!;
    const p = sel ?? round.start ?? { x: 0, y: 0 };
    setSel({ x: Math.max(0, Math.min(b.xMax, p.x + dx * b.xStep)), y: Math.max(0, Math.min(b.yMax, p.y + dy * b.yStep)) });
  }

  if (done) {
    return (
      <div className={`mg ${css.tg}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Treasure found!</h2>
          <p>
            You scored <strong>{points}</strong> of {max} map points.
          </p>
          {busy && <p className="kmuted">Opening the chest…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: right on the first try earns 2 points a step. Read every ordered pair as (right, up).</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => (
              <span key={i}>
                {level.rounds[i].title} {"💎".repeat(scoreRound(level.rounds[i], m).points)}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const report = phase === "report" ? scoreRound(round, moves[ri]) : null;
  const ask = phase === "play" ? step.ask : "";
  // A one-step map round's story already says where to dig.
  const showAsk = !(round.steps.length === 1 && step.kind === "plot");
  const marks: BoardView["marks"] = [
    ...(round.marks ?? []).map((m) => ({ ...m, hot: phase === "play" && step.kind === "pair" && m.at.x === step.at.x && m.at.y === step.at.y })),
    ...found.map((at) => ({ at, icon: (round.kind === "pattern" || round.kind === "story" ? "dot" : "gem") as MarkIcon })),
    ...(phase === "report" && step.kind === "plot" ? [{ at: step.at, icon: (round.kind === "pattern" || round.kind === "story" ? "dot" : "gem") as MarkIcon }] : []),
  ];
  const linePts = round.line ? [...(round.marks ?? []).map((m) => m.at), ...found, ...(phase === "report" && step.kind === "plot" ? [step.at] : [])] : [];
  const sayText = `${round.story} ${ask}`.trim();
  const fixed = step.kind === "build" ? step.fixed ?? {} : {};
  const bmax = step.kind === "build" ? step.max : BUILD_MAX;

  return (
    <div className={`mg ${css.tg}`}>
      <div className="mg-hud">
        <span className="chip">
          🗺️ Clue {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">💎 {points} pts</span>
        <span className="chip">{round.title}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={css.story}>
        <p>
          {round.story}
          {round.rules && (
            <span className={css.rules}>
              <span>x: {Array.from({ length: round.rules.terms }, (_, i) => (i < 2 || found.length + 2 > i ? round.rules!.x.start + round.rules!.x.add * i : "?")).join(", ")}</span>
              <span>y: {Array.from({ length: round.rules.terms }, (_, i) => (i < 2 || found.length + 2 > i ? round.rules!.y.start + round.rules!.y.add * i : "?")).join(", ")}</span>
            </span>
          )}
        </p>
        <SayButton id={`tg-say-${ri}-${si}`} text={sayText} />
      </div>

      <div className={css.stage}>
        {round.board ? (
          <MapBoard
            board={round.board}
            marks={marks}
            line={linePts}
            misses={misses}
            sel={phase === "play" && step.kind === "plot" ? sel : null}
            explorer={isWalk}
            tappable={phase === "play" && step.kind === "plot"}
            onTap={(p) => setSel(p)}
          />
        ) : (
          <Chest round={round} build={step.kind === "build" && phase === "play" ? dims : null} />
        )}
      </div>

      {phase === "play" && (
        <div className="mg-controls">
          {showAsk && <p className={css.ask}>
            <strong>{ask}</strong>
            {round.steps.length > 1 && (
              <span className="kmuted small">
                {" "}
                (step {si + 1} of {round.steps.length})
              </span>
            )}
          </p>}

          {step.kind === "plot" && (
            <>
              {isWalk && (
                <div className={css.pad} aria-label="Move the explorer">
                  <button type="button" className={`kbtn ${css.arrow} ${css.up}`} onClick={() => walk(0, 1)} aria-label="Up">
                    ▲
                  </button>
                  <button type="button" className={`kbtn ${css.arrow} ${css.left}`} onClick={() => walk(-1, 0)} aria-label="Left">
                    ◀
                  </button>
                  <button type="button" className={`kbtn ${css.arrow} ${css.right}`} onClick={() => walk(1, 0)} aria-label="Right">
                    ▶
                  </button>
                  <button type="button" className={`kbtn ${css.arrow} ${css.down}`} onClick={() => walk(0, -1)} aria-label="Down">
                    ▼
                  </button>
                </div>
              )}
              {!isWalk && <p className="kmuted small">{sel ? "Tap another spot to move your marker, or dig!" : "Tap a spot where grid lines cross."}</p>}
              <button type="button" className="kbtn big game-btn" disabled={!sel} onClick={() => sel && submit({ x: sel.x, y: sel.y })}>
                ⛏️ Dig here
              </button>
            </>
          )}

          {step.kind === "pair" && (
            <form
              className={css.pairForm}
              onSubmit={(e) => {
                e.preventDefault();
                const x = toInt(xIn);
                const y = toInt(yIn);
                if (x !== undefined && y !== undefined) submit({ x, y });
              }}
            >
              <span className={css.paren}>(</span>
              <input aria-label="x" value={xIn} onChange={(e) => setXIn(e.target.value)} inputMode="numeric" autoComplete="off" maxLength={3} className={css.num} placeholder="x" />
              <span className={css.paren}>,</span>
              <input aria-label="y" value={yIn} onChange={(e) => setYIn(e.target.value)} inputMode="numeric" autoComplete="off" maxLength={3} className={css.num} placeholder="y" />
              <span className={css.paren}>)</span>
              <button type="submit" className="kbtn big game-btn" disabled={toInt(xIn) === undefined || toInt(yIn) === undefined}>
                Check ✓
              </button>
            </form>
          )}

          {step.kind === "num" && (
            <form
              className={css.pairForm}
              onSubmit={(e) => {
                e.preventDefault();
                const n = toInt(nIn);
                if (n !== undefined) submit({ n });
              }}
            >
              <input aria-label="Your answer" value={nIn} onChange={(e) => setNIn(e.target.value)} inputMode="numeric" autoComplete="off" maxLength={3} className={css.num} />
              {step.unit && <span className={css.unit}>{step.unit}</span>}
              <button type="submit" className="kbtn big game-btn" disabled={toInt(nIn) === undefined}>
                Check ✓
              </button>
            </form>
          )}

          {step.kind === "build" && (
            <>
              <div className={css.steppers}>
                {(["l", "w", "h"] as const).map((k) => {
                  const locked = fixed[k] !== undefined;
                  return (
                    <div key={k} className={css.stepper}>
                      <span className={css.stepLabel}>
                        {DIM_WORD[k]}
                        {locked ? " 🔒" : ""}
                      </span>
                      <div className={css.stepRow}>
                        <button type="button" className="kbtn" disabled={locked || dims[k] <= 1} onClick={() => setDims({ ...dims, [k]: dims[k] - 1 })} aria-label={`Less ${DIM_WORD[k]}`}>
                          −
                        </button>
                        <b className={css.stepVal}>{dims[k]}</b>
                        <button type="button" className="kbtn" disabled={locked || dims[k] >= bmax} onClick={() => setDims({ ...dims, [k]: dims[k] + 1 })} aria-label={`More ${DIM_WORD[k]}`}>
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button type="button" className="kbtn big game-btn" onClick={() => submit({ ...dims })}>
                📦 Fill the chest
              </button>
            </>
          )}

          {note && <div className={`day-report ${note.good ? "good" : "bad"}`}>{note.text}</div>}
        </div>
      )}

      {phase === "report" && report && (
        <div className="mg-controls">
          <div className={`day-report ${report.points === report.max ? "good" : "bad"}`}>
            {note && <strong>{note.text}</strong>}
            <div className="math-line">{round.teach}</div>
            <div className="small">
              Clue points: {"💎".repeat(report.points) || "none yet"} ({report.points}/{report.max}
              {report.steps.length > 1 ? `: ${report.steps.map((s) => (s.rightOn === 0 ? "first try" : s.rightOn > 0 ? `try ${s.rightOn + 1}` : "shown")).join(", ")}` : ""})
            </div>
            <SayButton id={`tg-teach-${ri}`} text={round.teach} />
          </div>
          <button type="button" className="kbtn big game-btn" onClick={next}>
            {ri + 1 < level.rounds.length ? "Next clue ➜" : "Open the treasure 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}

