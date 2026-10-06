"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useTeacherVoice, useVoiceSettings } from "../voice";
import {
  MAX_TRIES,
  PETALS,
  factorPairs,
  flowerGrid,
  gridOf,
  levelById,
  miniArrayGrid,
  needsSplit,
  playRound,
  promptFor,
  targetOf,
  teachFor,
  tensSplit,
  wrongPlantNote,
  type GardenLevel,
  type GardenRound,
  type RoundMove,
} from "@/lib/minigames/arraygarden";
import type { MiniGameUIProps } from "./types";
import css from "./ArrayGardenGame.module.css";

const FLOWERS = PETALS.map((p) => flowerGrid(p));
const EMPTY: RoundMove = { plants: [], answers: [] };

export default function ArrayGardenGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <ArrayGarden level={level} onFinish={onFinish} /> : null;
}

type Phase = "plant" | "split" | "ask" | "report";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function ArrayGarden({ level, onFinish }: { level: GardenLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const { speakOn } = useVoiceSettings();
  const voice = useTeacherVoice();
  const [ri, setRi] = useState(0);
  const r = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const [move, setMove] = useState<RoundMove>(EMPTY);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [split, setSplit] = useState(1);
  const [entry, setEntry] = useState("");
  const [note, setNote] = useState<{ text: string; good: boolean } | null>(null);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const g2 = level.grade === 2;
  const grid = gridOf(level, r);
  const play = useMemo(() => playRound(level, r, move), [level, r, move]);
  const phase: Phase = !play.buildDone ? "plant" : needsSplit(r) && !play.splitDone ? "split" : !play.done ? "ask" : "report";
  const prompt = promptFor(level, r);
  const ask = phase === "ask" ? play.asks[play.askAt] : undefined;
  const max = level.rounds.length * 3;
  const points = moves.reduce((s, m, i) => s + playRound(level, level.rounds[i], m).points, 0) + (play.done ? play.points : 0);

  const say = useCallback(
    (id: string, text: string) => {
      if (speakOn && text) speak(id, text, { kind: voice });
    },
    [speakOn, voice],
  );

  // Read each round aloud when it starts.
  const started = useRef(-1);
  useEffect(() => {
    if (started.current === ri || done) return;
    started.current = ri;
    say(`garden-${ri}`, prompt);
  }, [ri, prompt, say, done]);

  /** Feedback: shown, and read aloud for grade 2 (and for the round's lesson). */
  function tell(text: string, good: boolean, read = g2) {
    setNote({ text, good });
    if (read) say(`garden-note-${ri}-${Date.now()}`, text);
  }

  function update(next: RoundMove, msg: string, good: boolean) {
    setMove(next);
    const p = playRound(level, r, next);
    if (p.done) {
      chime(p.points === 3 ? "streak" : "right");
      tell(`${msg ? msg + " " : ""}${teachFor(level, r, next.split)}`, good, true);
      return;
    }
    if (msg) tell(msg, good);
  }

  // ---------- Planting ----------

  function plant() {
    if (phase !== "plant" || rows < 1 || cols < 1) return;
    const next: RoundMove = { ...move, plants: [...move.plants, [rows, cols]] };
    const p = playRound(level, r, next);
    if (r.kind === "factors") {
      if (rows * cols === r.n) {
        const fresh = p.found.length > play.found.length;
        chime(fresh ? "right" : "oops");
        const total = factorPairs(r.n).length;
        const msg = fresh
          ? p.buildDone
            ? `${rows} × ${cols} = ${r.n}. You found all ${total} rectangle${total > 1 ? "s" : ""}!`
            : `Yes! ${rows} × ${cols} = ${r.n}. ${rows} and ${cols} are a factor pair.`
          : `You already have that one. ${rows} × ${cols} and ${cols} × ${rows} are the same factor pair, turned around.`;
        return update(next, msg, fresh);
      }
      chime("oops");
      return update(next, wrongPlantNote(level, r, rows, cols), false);
    }
    if (p.buildDone && p.lastPlant === next.plants.length - 1 && p.wrongPlants === play.wrongPlants) {
      chime("right");
      const t = targetOf(r)!;
      return update(next, g2 ? `Yes! ${t.rows} rows of ${t.cols}.` : `Yes! ${t.rows} rows of ${t.cols}.`, true);
    }
    chime("oops");
    if (p.buildDone) {
      // Third miss: the garden plants it for them.
      const t = targetOf(r)!;
      setRows(t.rows);
      setCols(t.cols);
      return update(next, `${wrongPlantNote(level, r, rows, cols)} Here it is: ${t.rows} rows of ${t.cols}.`, false);
    }
    update(next, `${wrongPlantNote(level, r, rows, cols)} Try again!`, false);
  }

  function showMe() {
    update({ ...move, shown: true }, "Here are all the rectangles.", false);
  }

  // Drag (or tap) on the garden: in planting, the corner of the array; in splitting, where to cut.
  const dragging = useRef(false);
  function pointAt(e: React.PointerEvent<HTMLDivElement>) {
    const b = e.currentTarget.getBoundingClientRect();
    const x = clamp(Math.floor(((e.clientX - b.left) / b.width) * grid.w), 0, grid.w - 1);
    const y = clamp(Math.floor(((e.clientY - b.top) / b.height) * grid.h), 0, grid.h - 1);
    if (phase === "plant") {
      setRows(y + 1);
      setCols(x + 1);
      if (note && !note.good) setNote(null);
    } else if (phase === "split" && cols > 1) setSplit(clamp(x + 1, 1, cols - 1));
  }
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "plant" && phase !== "split") return;
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pointAt(e);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => dragging.current && pointAt(e);
  const onUp = () => (dragging.current = false);

  // ---------- Splitting ----------

  function confirmSplit() {
    if (phase !== "split") return;
    const { rows: R, cols: c } = r as { rows: number; cols: number };
    if (split < 1 || split >= c) return;
    chime("right");
    const msg =
      r.kind === "model" && split === tensSplit(c)
        ? `${c} = ${split} + ${c - split}: tens and ones!`
        : `${R} × ${c} = ${R} × ${split} + ${R} × ${c - split}.`;
    update({ ...move, split }, msg, true);
  }

  // ---------- Questions ----------

  function answer(v: number) {
    if (!ask) return;
    const next: RoundMove = { ...move, answers: [...move.answers, v] };
    const p = playRound(level, r, next);
    setEntry("");
    if (v === ask.answer) {
      chime("right");
      return update(next, ask.prime ? `Yes, ${(r as { n: number }).n} is ${v ? "prime" : "composite"}!` : `Yes! ${ask.q.replace("?", String(ask.answer))}`, true);
    }
    chime("oops");
    const shown = p.askAt > play.askAt || p.done;
    const right = ask.prime ? (ask.answer ? "prime" : "composite") : String(ask.answer);
    update(next, shown ? `${ask.hint} The answer is ${right}.` : `Not quite. ${ask.hint}`, false);
  }

  function key(k: string) {
    if (k === "⌫") return setEntry((e) => e.slice(0, -1));
    if (k === "✓") return entry && answer(Number(entry));
    setEntry((e) => (e.length >= 4 ? e : (e + k).replace(/^0+(?=\d)/, "")));
  }

  // ---------- Rounds ----------

  async function next() {
    const all = [...moves, move];
    setMoves(all);
    setNote(null);
    setEntry("");
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setMove(EMPTY);
      setRows(0);
      setCols(0);
      setSplit(1);
      return;
    }
    setDone(true);
    setBusy(true);
    try {
      const res = await onFinish(all);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
    } finally {
      setBusy(false);
    }
  }

  // Splitting starts in a handy place.
  useEffect(() => {
    if (phase !== "split") return;
    const c = (r as { cols: number }).cols;
    setSplit(r.kind === "model" ? Math.max(1, Math.round(c / 2)) : Math.max(1, Math.floor(c / 2)));
  }, [phase, r]);

  if (done) {
    return (
      <div className={`mg ${css.garden}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Garden grown!</h2>
          <p>
            You scored <strong>{points}</strong> of {max} flower points.
          </p>
          {busy && <p className="kmuted">Counting the flowers…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: stars come from planting it right and answering on the first try. Count one row, then skip count the rows.</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => (
              <span key={i}>
                {label(level.rounds[i], m)} {"🌷".repeat(playRound(level, level.rounds[i], m).points)}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const target = targetOf(r);
  // What the garden shows: the kid's array (or the right one once it's planted).
  const shownRows = phase === "plant" || r.kind === "factors" ? rows : target?.rows ?? rows;
  const shownCols = phase === "plant" || r.kind === "factors" ? cols : target?.cols ?? cols;
  const bed = r.kind === "fill" || r.kind === "fence" ? { rows: r.rows, cols: r.cols } : null;
  const fenced = (r.kind === "fence" || r.kind === "side") && phase !== "plant";
  const splitAt = phase === "split" ? split : move.split;
  const showSplit = r.kind === "split" && splitAt !== undefined && phase !== "plant";
  const rowWord = g2 ? "In each row" : "Columns";

  return (
    <div className={`mg ${css.garden}`}>
      <div className="mg-hud">
        <span className="chip">
          🌷 Garden {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points} pts</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <p className={css.ask}>
        {prompt}
        <SayButton id={`garden-say-${ri}`} text={prompt} />
      </p>

      {r.kind === "turn" && (
        <div className={css.ref}>
          <PixelSprite grid={miniArrayGrid(r.rows, r.cols)} scale={3} title={`${r.rows} rows of ${r.cols}`} />
          <span>
            {r.rows} rows of {r.cols} ➜ turn it
          </span>
        </div>
      )}

      {r.kind === "model" ? (
        <AreaModel rows={r.rows} cols={r.cols} split={splitAt ?? tensSplit(r.cols)} active={phase === "split"} onSplit={setSplit} />
      ) : (
        <div className={css.gardenWrap} style={{ maxWidth: Math.min(grid.w * 56, 560) }}>
          <div
            className={`${css.grid} ${phase === "plant" || phase === "split" ? css.live : ""}`}
            style={{ gridTemplateColumns: `repeat(${grid.w}, 1fr)` }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            role="application"
            aria-label={`Garden, ${grid.h} rows by ${grid.w} columns. Planted: ${shownRows} rows of ${shownCols}.`}
          >
            {Array.from({ length: grid.w * grid.h }, (_, i) => {
              const x = i % grid.w;
              const y = Math.floor(i / grid.w);
              const on = y < shownRows && x < shownCols;
              const inBed = bed && y < bed.rows && x < bed.cols;
              const petal = showSplit ? (x < splitAt! ? 0 : 2) : y % 2 === 0 ? 0 : 1;
              return (
                <div key={i} className={`${css.cell} ${(x + y) % 2 ? css.alt : ""} ${inBed ? css.bed : ""}`}>
                  {on && <PixelSprite grid={FLOWERS[petal]} scale={1} className={css.flower} />}
                </div>
              );
            })}
            {bed && phase === "plant" && <div className={css.bedLine} style={box(grid, bed.rows, bed.cols)} />}
            {fenced && target && (
              <div className={css.fence} style={box(grid, target.rows, target.cols)}>
                <span className={css.topLab}>{target.cols}</span>
                <span className={css.sideLab}>{target.rows}</span>
              </div>
            )}
            {showSplit && <div className={css.cut} style={{ left: `${(splitAt! / grid.w) * 100}%`, height: `${(shownRows / grid.h) * 100}%` }} />}
          </div>
          {phase === "plant" && (
            <div className={css.now}>
              {rows > 0 && cols > 0 ? (
                <>
                  {rows} row{rows === 1 ? "" : "s"} · {cols} in each row
                </>
              ) : (
                <>Drag or tap on the garden to plant</>
              )}
            </div>
          )}
        </div>
      )}

      {phase === "plant" && (
        <div className="mg-controls">
          <div className={css.steppers}>
            <Stepper label="Rows" value={rows} min={0} max={grid.h} onChange={setRows} />
            <Stepper label={rowWord} value={cols} min={0} max={grid.w} onChange={setCols} />
          </div>
          {r.kind === "factors" && (
            <div className={css.found} aria-label="Rectangles found">
              {play.found.length === 0 ? (
                <span className="kmuted small">Rectangles found: none yet</span>
              ) : (
                play.found.map(([a, b]) => (
                  <span key={`${a}x${b}`} className={css.pair}>
                    {a} × {b}
                  </span>
                ))
              )}
              <span className="kmuted small">
                {play.found.length} of {factorPairs(r.n).length}
              </span>
            </div>
          )}
          {note && (
            <div className={`day-report ${note.good ? "good" : "bad"}`}>
              {note.text} <SayButton id={`garden-note-say-${ri}`} text={note.text} />
            </div>
          )}
          <div className={css.row}>
            <button type="button" className="kbtn big game-btn" onClick={plant} disabled={rows < 1 || cols < 1}>
              Plant! 🌱
            </button>
            {r.kind === "factors" && move.plants.length >= 4 && (
              <button type="button" className="kbtn" onClick={showMe}>
                Show me the rest
              </button>
            )}
          </div>
          {r.kind !== "factors" && play.wrongPlants > 0 && (
            <p className="kmuted small">
              Try {play.wrongPlants + 1} of {MAX_TRIES}
            </p>
          )}
        </div>
      )}

      {phase === "split" && (
        <div className="mg-controls">
          {note && <div className={`day-report ${note.good ? "good" : "bad"}`}>{note.text}</div>}
          <p className={css.small}>
            {r.kind === "model" ? "Tap the garden or use − and + to choose where to split." : "Tap a column to choose where to split the garden."} {(r as { cols: number }).cols} = <b>{split}</b> + <b>{(r as { cols: number }).cols - split}</b>
          </p>
          <div className={css.steppers}>
            <Stepper label="Split after" value={split} min={1} max={(r as { cols: number }).cols - 1} onChange={setSplit} />
          </div>
          <button type="button" className="kbtn big game-btn" onClick={confirmSplit}>
            Split here ✂️
          </button>
        </div>
      )}

      {phase === "ask" && ask && (
        <div className="mg-controls">
          {r.kind === "factors" && (
            <div className={css.found}>
              {factorPairs(r.n).map(([a, b]) => (
                <span key={`${a}x${b}`} className={`${css.pair} ${play.found.some((f) => f[0] === a) ? "" : css.missed}`}>
                  {a} × {b}
                </span>
              ))}
            </div>
          )}
          {note && (
            <div className={`day-report ${note.good ? "good" : "bad"}`}>
              {note.text} <SayButton id={`garden-note-say-${ri}-${play.askAt}`} text={note.text} />
            </div>
          )}
          <p className={css.q}>
            {ask.prime ? ask.q : ask.q.replace("?", entry ? entry : "?")}
            <SayButton id={`garden-q-${ri}-${play.askAt}`} text={ask.q.replace("?", "what")} />
          </p>
          {ask.prime ? (
            <div className={css.row}>
              <button type="button" className="kbtn big game-btn" onClick={() => answer(1)}>
                Prime
                <span className={css.sub}>only 1 rectangle</span>
              </button>
              <button type="button" className="kbtn big game-btn" onClick={() => answer(0)}>
                Composite
                <span className={css.sub}>more than 1</span>
              </button>
            </div>
          ) : (
            <div className={css.pad}>
              {["1", "2", "3", "4", "5", "⌫", "6", "7", "8", "9", "0", "✓"].map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`kbtn ${k === "✓" ? "game-btn" : ""}`}
                  onClick={() => key(k)}
                  disabled={k === "✓" && !entry}
                  aria-label={k === "⌫" ? "Delete" : k === "✓" ? "Check" : k}
                >
                  {k}
                </button>
              ))}
            </div>
          )}
          {play.askMisses > 0 && (
            <p className="kmuted small">
              Try {play.askMisses + 1} of {MAX_TRIES}
            </p>
          )}
        </div>
      )}

      {phase === "report" && (
        <div className="mg-controls">
          <div className={`day-report ${play.points === 3 ? "good" : "bad"}`}>
            {note && <div className="math-line">{note.text}</div>}
            {note && <SayButton id={`garden-teach-${ri}`} text={note.text} />}
            <div className="small">
              Round points: {"🌷".repeat(play.points) || "none yet"} ({play.points}/3)
            </div>
          </div>
          <button type="button" className="kbtn big game-btn" onClick={next}>
            {ri + 1 < level.rounds.length ? "Next garden ➜" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}

/** A box over the garden covering rows x cols from the top-left corner. */
function box(grid: { w: number; h: number }, rows: number, cols: number): React.CSSProperties {
  return { width: `${(cols / grid.w) * 100}%`, height: `${(rows / grid.h) * 100}%` };
}

function label(r: GardenRound, m: RoundMove): string {
  switch (r.kind) {
    case "factors":
      return `${r.n}`;
    case "share":
      return `${r.total}÷${r.rows}`;
    case "side":
      return `${r.area}÷${r.rows}`;
    case "turn":
      return `${r.cols}×${r.rows}`;
    case "model":
    case "split":
      return `${r.rows}×${r.cols}${m.split ? ` (${m.split}+${r.cols - m.split})` : ""}`;
    default:
      return `${r.rows}×${r.cols}`;
  }
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className={css.stepper}>
      <span className={css.stepLabel}>{label}</span>
      <button type="button" className="kbtn" onClick={() => onChange(clamp(value - 1, min, max))} disabled={value <= min} aria-label={`${label}: one fewer`}>
        −
      </button>
      <b className={css.stepVal}>{value}</b>
      <button type="button" className="kbtn" onClick={() => onChange(clamp(value + 1, min, max))} disabled={value >= max} aria-label={`${label}: one more`}>
        +
      </button>
    </div>
  );
}

/** A big garden drawn as an area model: tens strips and ones, with a split line. */
function AreaModel({ rows, cols, split, active, onSplit }: { rows: number; cols: number; split: number; active: boolean; onSplit: (s: number) => void }) {
  const dragging = useRef(false);
  function at(e: React.PointerEvent<HTMLDivElement>) {
    const b = e.currentTarget.getBoundingClientRect();
    onSplit(clamp(Math.round(((e.clientX - b.left) / b.width) * cols), 1, cols - 1));
  }
  const a = split;
  const b = cols - split;
  return (
    <div className={css.model}>
      <div className={css.modelTop}>
        <span style={{ width: `${(a / cols) * 100}%` }}>{a}</span>
        <span style={{ width: `${(b / cols) * 100}%` }}>{b}</span>
      </div>
      <div className={css.modelRow}>
        <span className={css.modelSide}>{rows}</span>
        <div
          className={`${css.modelBox} ${active ? css.live : ""}`}
          onPointerDown={(e) => {
            if (!active) return;
            dragging.current = true;
            e.currentTarget.setPointerCapture?.(e.pointerId);
            at(e);
          }}
          onPointerMove={(e) => active && dragging.current && at(e)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          role="application"
          aria-label={`Area model ${rows} by ${cols}, split into ${a} and ${b}`}
        >
          <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none" className={css.modelSvg} aria-hidden>
            <rect x={0} y={0} width={a} height={rows} fill="#8ce99a" />
            <rect x={a} y={0} width={b} height={rows} fill="#ffd8a8" />
            {Array.from({ length: cols - 1 }, (_, i) => (
              <line key={`c${i}`} x1={i + 1} x2={i + 1} y1={0} y2={rows} stroke={(i + 1) % 10 === 0 ? "#2b8a3e" : "rgba(27,21,48,.18)"} strokeWidth={(i + 1) % 10 === 0 ? 2 : 1} vectorEffect="non-scaling-stroke" />
            ))}
            {Array.from({ length: rows - 1 }, (_, i) => (
              <line key={`r${i}`} x1={0} x2={cols} y1={i + 1} y2={i + 1} stroke="rgba(27,21,48,.18)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            ))}
            <line x1={a} x2={a} y1={0} y2={rows} stroke="#e03131" strokeWidth={4} vectorEffect="non-scaling-stroke" />
          </svg>
          <span className={css.modelArea} style={{ left: 0, width: `${(a / cols) * 100}%` }}>
            {rows} × {a}
          </span>
          <span className={css.modelArea} style={{ left: `${(a / cols) * 100}%`, width: `${(b / cols) * 100}%` }}>
            {b >= 3 ? `${rows} × ${b}` : ""}
          </span>
        </div>
      </div>
      <p className="kmuted small">Dark green lines mark every ten. One small square = 1 flower.</p>
    </div>
  );
}
