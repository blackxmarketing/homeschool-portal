"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, SayButton } from "../voice";
import type { Grid } from "@/lib/pixel/grid";
import {
  EMOJI,
  ENERGY_SHORT,
  LEVEL_WORDS,
  MAX_TRIES,
  MORSE,
  NAMES,
  BUZZ_KEY,
  LAMP_KEY,
  boardFor,
  checkTry,
  cleanCode,
  encode,
  endsOf,
  isLoad,
  itemWhy,
  levelById,
  partGrid,
  pathOf,
  scoreRound,
  showCode,
  simulate,
  slotsOf,
  switchLetters,
  type Board,
  type Check,
  type CircuitLevel,
  type CircuitRound,
  type Kind,
  type LoadKind,
  type RoundMove,
  type Try,
} from "@/lib/minigames/circuit";
import type { MiniGameUIProps } from "./types";
import css from "./CircuitGame.module.css";

/** Sprites are reused a lot, so they're cached. */
const cache = new Map<string, Grid>();
function sprite(k: Kind, level = 0, on = false, frame = 0): Grid {
  const key = `${k}-${level}-${on}-${frame}`;
  let g = cache.get(key);
  if (!g) cache.set(key, (g = partGrid(k, { level, on, frame })));
  return g;
}

type Tool = Kind | "hand" | "erase";

export default function CircuitGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Workshop level={level} onFinish={onFinish} /> : null;
}

/** The kid's state for a round, before it's turned into a Try. */
interface BuildState {
  placed: Record<string, Kind>;
  on: string[];
  flip: string[];
}

const startState = (r: CircuitRound): BuildState => ({
  placed: Object.fromEntries(r.start ?? []),
  on: Object.entries(r.fixed)
    .filter(([, p]) => p.on)
    .map(([s]) => s),
  flip: [],
});

const tryOf = (s: BuildState): Try => ({ parts: Object.entries(s.placed), on: [...s.on], flip: [...s.flip] });

function Workshop({ level, onFinish }: { level: CircuitLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const [ri, setRi] = useState(0);
  const round = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const [build, setBuild] = useState<BuildState>(() => startState(round));
  const [tool, setTool] = useState<Tool>("hand");
  const [tries, setTries] = useState<Try[]>([]);
  const [note, setNote] = useState<Check | null>(null);
  const [hint, setHint] = useState("");
  const [phase, setPhase] = useState<"play" | "report">("play");
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [sort, setSort] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [flash, setFlash] = useState<"lamp" | "buzz" | null>(null);
  const [played, setPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Buzzers shake and motors spin: a little two-frame animation.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setFrame((f) => 1 - f), 220);
    return () => clearInterval(t);
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const isCode = round.kind === "send" || round.kind === "receive";
  const board: Board = useMemo(() => {
    if (isCode) return { ...round.fixed, [LAMP_KEY]: { k: "switch", on: flash === "lamp" }, [BUZZ_KEY]: { k: "switch", on: flash === "buzz" } };
    return boardFor(round, tryOf(build));
  }, [round, build, isCode, flash]);
  const sim = useMemo(() => simulate(round.cols, round.rows, board), [round, board]);
  const path = useMemo(() => new Set(pathOf(board, sim, round.cols)), [board, sim, round.cols]);
  const points = moves.reduce((s, m, i) => s + scoreRound(level.rounds[i], m).points, 0);
  const max = level.rounds.length * MAX_TRIES;

  const used = (k: Kind) => Object.values(build.placed).filter((x) => x === k).length;
  const left = (k: Kind) => (round.tray[k] ?? 0) - used(k);

  const startRound = useCallback(
    (i: number) => {
      const r = level.rounds[i];
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setRi(i);
      setBuild(startState(r));
      setTool("hand");
      setTries([]);
      setNote(null);
      setHint("");
      setPhase("play");
      setSort([]);
      setCode("");
      setFlash(null);
      setPlayed(false);
      setPlaying(false);
    },
    [level],
  );

  // ---------- building ----------

  function tapSlot(s: string) {
    if (phase !== "play") return;
    if (isCode) {
      if (round.kind === "send" && (s === LAMP_KEY || s === BUZZ_KEY)) key(s === LAMP_KEY ? "lamp" : "buzz");
      return;
    }
    setHint("");
    const fixed = round.fixed[s];
    const mine = build.placed[s];
    const here = fixed?.k ?? mine;
    const toggle = (k: Kind | undefined) => {
      if (k === "switch") {
        setBuild((b) => ({ ...b, on: b.on.includes(s) ? b.on.filter((x) => x !== s) : [...b.on, s] }));
        return true;
      }
      if (k === "battery") {
        setBuild((b) => ({ ...b, flip: b.flip.includes(s) ? b.flip.filter((x) => x !== s) : [...b.flip, s] }));
        return true;
      }
      return false;
    };
    if (tool === "hand") {
      if (toggle(here)) return;
      if (fixed) setHint(`The ${NAMES[fixed.k]} is screwed down.`);
      else if (mine) setHint(`Use 🧽 Remove to take the ${NAMES[mine]} off.`);
      else setHint("Pick a part from the tray first, then tap a gap.");
      return;
    }
    if (fixed) {
      if (!toggle(tool === fixed.k ? here : undefined)) setHint(`The ${NAMES[fixed.k]} is screwed down. Pick a dashed gap.`);
      return;
    }
    if (tool === "erase") {
      if (!mine) return;
      setBuild((b) => {
        const placed = { ...b.placed };
        delete placed[s];
        return { placed, on: b.on.filter((x) => x !== s), flip: b.flip.filter((x) => x !== s) };
      });
      return;
    }
    if (mine === tool) {
      toggle(tool);
      return;
    }
    if (left(tool) <= 0) {
      setHint(`No more ${NAMES[tool]}s in the tray. Take one off the board first.`);
      return;
    }
    setBuild((b) => ({ placed: { ...b.placed, [s]: tool }, on: b.on.filter((x) => x !== s), flip: b.flip.filter((x) => x !== s) }));
    if (left(tool) <= 1) setTool("hand");
  }

  // ---------- tests ----------

  function test(t: Try) {
    const c = checkTry(round, t);
    const all = [...tries, t];
    setTries(all);
    setNote(c);
    if (c.ok) {
      chime("right");
      endRound(all);
      return;
    }
    chime("oops");
    if (all.length >= MAX_TRIES) {
      // Show a worked answer on the board.
      if (round.kind === "build") {
        const sol = round.solution;
        setBuild({ placed: Object.fromEntries(sol.parts ?? []), on: sol.on ?? [], flip: sol.flip ?? [] });
      }
      if (round.kind === "sort") setSort((round.solution.sort ?? "").split(""));
      if (round.kind === "send") setCode(round.solution.code ?? "");
      if (round.kind === "receive") setCode(round.solution.code ?? "");
      endRound(all);
    }
  }

  function endRound(all: Try[]) {
    setMoves((m) => [...m, { tries: all }]);
    setPhase("report");
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      startRound(ri + 1);
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

  // ---------- telegraph ----------

  function key(which: "lamp" | "buzz") {
    if (phase !== "play" || playing) return;
    setFlash(which);
    if (which === "buzz") chime("oops");
    timers.current.push(setTimeout(() => setFlash(null), which === "lamp" ? 250 : 500));
    setCode((c) => c + (which === "lamp" ? "." : "-"));
  }

  function playMessage() {
    if (round.goal.t !== "receive" || playing) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPlaying(true);
    let t = 300;
    const letters = encode(round.goal.word).split("|");
    letters.forEach((l) => {
      for (const sym of l) {
        const which = sym === "." ? "lamp" : "buzz";
        const len = sym === "." ? 300 : 650;
        timers.current.push(
          setTimeout(() => {
            setFlash(which);
            if (which === "buzz") chime("oops");
          }, t),
        );
        timers.current.push(setTimeout(() => setFlash(null), t + len));
        t += len + 300;
      }
      t += 700;
    });
    timers.current.push(
      setTimeout(() => {
        setPlaying(false);
        setPlayed(true);
      }, t),
    );
  }

  // ---------- screens ----------

  if (done) {
    return (
      <div className={`mg ${css.circuit}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Workshop closed!</h2>
          <p>
            You scored <strong>{points}</strong> of {max} spark points.
          </p>
          {busy && <p className="kmuted">Checking the wiring…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: before you test, trace the path with your finger: from + through every part and back to −.</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => (
              <span key={i}>
                {level.rounds[i].title} {"⚡".repeat(scoreRound(level.rounds[i], m).points) || "·"}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const prompt = `${round.story} ${round.ask}`;
  const loads = Object.keys(board)
    .filter((s) => isLoad(board[s].k))
    .sort();
  const letters = switchLetters(board);
  const testNo = Math.min(tries.length + 1, MAX_TRIES);
  const sortItems = round.items ?? [];
  const goalWord = round.goal.t === "send" || round.goal.t === "receive" ? round.goal.word : "";

  return (
    <div className={`mg ${css.circuit}`}>
      <div className="mg-hud">
        <span className="chip">
          ⚡ Job {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points} pts</span>
        <span className="chip">{phase === "play" ? `Test ${testNo} of ${MAX_TRIES}` : round.title}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <p className={css.ask}>
        <strong>{round.title}.</strong> {round.story} <b className={css.goal}>{round.ask}</b>
        <SayButton id={`circuit-say-${level.id}-${ri}`} text={prompt} />
      </p>

      <BoardView
        round={round}
        board={board}
        levels={sim.level}
        cur={sim.cur}
        short={sim.short}
        path={path}
        frame={frame}
        letters={letters}
        open={phase === "play" && !isCode}
        tool={tool}
        onSlot={tapSlot}
      />

      <div className={css.status} aria-live="polite">
        {sim.short && <span className={`${css.stat} ${css.danger}`}>⚠️ Short circuit! The battery is getting hot.</span>}
        {loads.map((s) => {
          const k = board[s].k as LoadKind;
          const lv = sim.level[s] ?? 0;
          return (
            <span key={s} className={`${css.stat} ${lv ? css.statOn : ""}`}>
              {EMOJI[k]} {LEVEL_WORDS[k][lv]}
              {lv > 0 && <span className={css.energy}> ⚡→{ENERGY_SHORT[k]}</span>}
            </span>
          );
        })}
        {!isCode && !sim.short && Object.keys(sim.batt).length > 0 && loads.length > 0 && !loads.some((s) => sim.level[s]) && <span className={css.stat}>No complete loop yet</span>}
      </div>

      {phase === "play" && round.kind === "build" && (
        <div className="mg-controls">
          <Tray round={round} tool={tool} setTool={setTool} left={left} />
          {hint && <p className={`kmuted small ${css.hint}`}>{hint}</p>}
          {note && !note.ok && (
            <div className="day-report bad">
              {note.note} <SayButton id={`circuit-note-${ri}-${tries.length}`} text={note.note} />
            </div>
          )}
          {tries.length > 0 && !note?.ok && <p className="kmuted small">Hint: {round.tip}</p>}
          <button type="button" className="kbtn big game-btn" onClick={() => test(tryOf(build))}>
            Test it ⚡ <span className={css.tryNo}>(test {testNo} of {MAX_TRIES})</span>
          </button>
        </div>
      )}

      {phase === "play" && round.kind === "sort" && (
        <div className="mg-controls">
          <p className="kmuted small">Tap a thing to put it in the gap and watch the bulb. Then sort it.</p>
          <div className={css.sortList}>
            {sortItems.map((k, i) => {
              const inGap = round.gap ? build.placed[round.gap] === k : false;
              return (
                <div key={k} className={`${css.sortCard} ${inGap ? css.testing : ""}`}>
                  <button
                    type="button"
                    className={css.testBtn}
                    aria-pressed={inGap}
                    aria-label={`Test the ${NAMES[k]} in the gap`}
                    onClick={() => round.gap && setBuild((b) => ({ ...b, placed: { [round.gap!]: k } }))}
                  >
                    <PixelSprite grid={sprite(k)} scale={2} />
                    <span className={css.sortName}>{NAMES[k]}</span>
                    <span className={css.testTag} aria-hidden>{inGap ? "🔌" : "🔬"}</span>
                  </button>
                  <div className={css.bins}>
                    <button
                      type="button"
                      className={`${css.bin} ${sort[i] === "c" ? css.binOn : ""}`}
                      aria-pressed={sort[i] === "c"}
                      onClick={() => setSort((s) => Object.assign([...s], { [i]: "c" }))}
                    >
                      ⚡ Conductor
                    </button>
                    <button
                      type="button"
                      className={`${css.bin} ${sort[i] === "i" ? css.binOn : ""}`}
                      aria-pressed={sort[i] === "i"}
                      onClick={() => setSort((s) => Object.assign([...s], { [i]: "i" }))}
                    >
                      ⛔ Insulator
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {note && !note.ok && <div className="day-report bad">{note.note}</div>}
          <button
            type="button"
            className="kbtn big game-btn"
            disabled={sortItems.some((_, i) => !sort[i])}
            onClick={() => test({ sort: sortItems.map((_, i) => sort[i] ?? "?").join("") })}
          >
            Check my sort ✓ <span className={css.tryNo}>(try {testNo} of {MAX_TRIES})</span>
          </button>
        </div>
      )}

      {phase === "play" && round.kind === "send" && (
        <div className="mg-controls">
          <div className={css.keys}>
            <button type="button" className={`${css.key} ${css.lampKey}`} onClick={() => key("lamp")}>
              💡 Lamp key
              <span className={css.sym}>• dot</span>
            </button>
            <button type="button" className={`${css.key} ${css.buzzKey}`} onClick={() => key("buzz")}>
              🔔 Buzzer key
              <span className={css.sym}>— dash</span>
            </button>
          </div>
          <div className={css.row}>
            <button type="button" className="kbtn" onClick={() => setCode((c) => (c && !c.endsWith("|") ? c + "|" : c))}>
              Next letter ➜
            </button>
            <button type="button" className="kbtn" onClick={() => setCode((c) => c.slice(0, -1))}>
              ⌫ Undo
            </button>
          </div>
          <div className={css.tape} aria-label="Your message so far">
            {code ? showCode(cleanCode(code) + (code.endsWith("|") ? "|" : "")) : <span className="kmuted">Your message shows here</span>}
          </div>
          <CodeCard />
          {note && !note.ok && <div className="day-report bad">{note.note}</div>}
          <button type="button" className="kbtn big game-btn" disabled={!cleanCode(code)} onClick={() => test({ code })}>
            Send {goalWord} 📡 <span className={css.tryNo}>(try {testNo} of {MAX_TRIES})</span>
          </button>
        </div>
      )}

      {phase === "play" && round.kind === "receive" && (
        <div className="mg-controls">
          <button type="button" className="kbtn game-btn" onClick={playMessage} disabled={playing}>
            {playing ? "Receiving…" : played ? "▶ Play it again" : "▶ Play the message"}
          </button>
          {played && round.goal.t === "receive" && (
            <div className={css.tape} aria-label="The message">
              {showCode(encode(round.goal.word))}
            </div>
          )}
          <CodeCard onPick={played ? (l) => setCode((c) => (c.length < 8 ? c + l : c)) : undefined} />
          <div className={css.row}>
            <div className={css.tape} aria-label="Your answer">
              {code || <span className="kmuted">Tap letters on the card</span>}
            </div>
            <button type="button" className="kbtn" onClick={() => setCode((c) => c.slice(0, -1))} disabled={!code}>
              ⌫
            </button>
          </div>
          {note && !note.ok && <div className="day-report bad">{note.note}</div>}
          <button type="button" className="kbtn big game-btn" disabled={!code} onClick={() => test({ code })}>
            Check the word ✓ <span className={css.tryNo}>(try {testNo} of {MAX_TRIES})</span>
          </button>
        </div>
      )}

      {phase === "report" && note && (
        <div className="mg-controls">
          <div className={`day-report ${note.ok ? "good" : "bad"}`}>
            <strong>{note.ok ? (tries.length === 1 ? "First try! " : "Got it! ") : round.kind === "build" ? "Here's one way that works. " : "Here's the answer. "}</strong>
            {note.ok ? note.note : `${note.note} ${round.tip}`}
            {round.kind === "sort" && (
              <ul className={css.whyList}>
                {sortItems.map((k) => (
                  <li key={k}>
                    {EMOJI[k]} <b>{NAMES[k]}</b>: {itemWhy(k)}
                  </li>
                ))}
              </ul>
            )}
            <SayButton id={`circuit-report-${ri}`} text={note.ok ? note.note : round.tip} />
            <div className="small">
              Job points: {"⚡".repeat(scoreRound(round, { tries }).points) || "none this time"} ({scoreRound(round, { tries }).points}/{MAX_TRIES})
            </div>
          </div>
          <button type="button" className="kbtn big game-btn" onClick={next}>
            {ri + 1 < level.rounds.length ? "Next job ➜" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------- The board ----------------

const PAD = 0.6;

function BoardView({
  round,
  board,
  levels,
  cur,
  short,
  path,
  frame,
  letters,
  open,
  tool,
  onSlot,
}: {
  round: CircuitRound;
  board: Board;
  levels: Record<string, number>;
  cur: Record<string, number>;
  short: boolean;
  path: Set<string>;
  frame: number;
  letters: Record<string, string>;
  open: boolean;
  tool: Tool;
  onSlot: (s: string) => void;
}) {
  const W = round.cols - 1 + PAD * 2;
  const H = round.rows - 1 + PAD * 2;
  const slots = slotsOf(round.cols, round.rows);
  const placing = tool !== "hand" && tool !== "erase";
  return (
    <div className={`${css.bench} ${short ? css.shorted : ""}`}>
      <div className={css.board} style={{ aspectRatio: `${W} / ${H}` }}>
        <svg className={css.wires} viewBox={`0 0 ${W} ${H}`} aria-hidden>
          {slots.map((s) => {
            const [[x1, y1], [x2, y2]] = endsOf(s);
            const p = board[s];
            const flows = Math.abs(cur[s] ?? 0) > 0.05;
            const reverse = (cur[s] ?? 0) < 0;
            const line = { x1: x1 + PAD, y1: y1 + PAD, x2: x2 + PAD, y2: y2 + PAD };
            if (!p) return <line key={s} {...line} className={css.gap} />;
            const conductsHere = p.k !== "band" && p.k !== "stick" && p.k !== "spoon" && !(p.k === "switch" && !p.on);
            return (
              <g key={s}>
                <line {...line} className={conductsHere ? css.wire : css.wireBroken} />
                {flows && <line {...line} className={`${css.flow} ${reverse ? css.rev : ""} ${short ? css.hotFlow : ""} ${path.has(s) ? css.onPath : ""}`} />}
              </g>
            );
          })}
          {Array.from({ length: round.cols * round.rows }, (_, i) => (
            <circle key={i} cx={(i % round.cols) + PAD} cy={Math.floor(i / round.cols) + PAD} r={0.075} className={css.node} />
          ))}
        </svg>
        {slots.map((s) => {
          const [[x1, y1], [x2, y2]] = endsOf(s);
          const p = board[s];
          const fixed = !!round.fixed[s];
          const vertical = s[0] === "v";
          const left = (((x1 + x2) / 2 + PAD) / W) * 100;
          const top = (((y1 + y2) / 2 + PAD) / H) * 100;
          const lv = levels[s] ?? 0;
          const rot = (vertical ? 90 : 0) + (p?.k === "battery" && p.flip ? 180 : 0);
          const label = p
            ? `${NAMES[p.k]}${p.k === "switch" ? ` ${letters[s] ?? ""} (${p.on ? "on" : "off"})` : ""}${isLoad(p.k) ? `: ${LEVEL_WORDS[p.k][lv]}` : ""}${fixed ? ", screwed down" : ""}`
            : "empty gap";
          if (!p && !open) return null;
          return (
            <button
              key={s}
              type="button"
              className={`${css.slot} ${p ? "" : css.empty} ${fixed ? css.fixed : ""} ${p?.k === "wire" ? css.wireSlot : ""} ${!p && placing ? css.ready : ""} ${
                p?.k === "battery" && short ? css.hot : ""
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => onSlot(s)}
              disabled={!open && !p}
              aria-label={label}
              title={label}
            >
              {p && p.k !== "wire" && (
                <span
                  className={`${css.part} ${p.k === "motor" && lv ? css.spin : ""} ${p.k === "buzzer" && lv ? css.shake : ""} ${p.k === "bulb" && lv ? css.glow : ""}`}
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  <PixelSprite grid={sprite(p.k, lv, !!p.on, lv ? frame : 0)} scale={3} />
                </span>
              )}
              {!p && placing && <span className={css.plus}>+</span>}
              {p?.k === "switch" && letters[s] && Object.keys(letters).length > 1 && <span className={css.letter}>{letters[s]}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- The tray ----------------

function Tray({ round, tool, setTool, left }: { round: CircuitRound; tool: Tool; setTool: (t: Tool) => void; left: (k: Kind) => number }) {
  const kinds = Object.keys(round.tray) as Kind[];
  return (
    <div className={css.tray} role="toolbar" aria-label="Parts tray">
      <button type="button" className={`${css.tool} ${tool === "hand" ? css.toolOn : ""}`} aria-pressed={tool === "hand"} onClick={() => setTool("hand")}>
        <span className={css.toolIcon}>✋</span>
        <span className={css.toolName}>Flip / switch</span>
      </button>
      <button type="button" className={`${css.tool} ${tool === "erase" ? css.toolOn : ""}`} aria-pressed={tool === "erase"} onClick={() => setTool("erase")}>
        <span className={css.toolIcon}>🧽</span>
        <span className={css.toolName}>Remove</span>
      </button>
      {kinds.map((k) => (
        <button
          key={k}
          type="button"
          className={`${css.tool} ${tool === k ? css.toolOn : ""}`}
          aria-pressed={tool === k}
          disabled={left(k) <= 0 && tool !== k}
          onClick={() => setTool(k)}
        >
          <PixelSprite grid={sprite(k)} scale={2} />
          <span className={css.toolName}>
            {NAMES[k]} ×{left(k)}
          </span>
        </button>
      ))}
    </div>
  );
}

// ---------------- The code card ----------------

function CodeCard({ onPick }: { onPick?: (letter: string) => void }) {
  return (
    <div className={css.card} aria-label="Code card">
      <div className={css.cardHead}>📜 Code card: 💡 flash = • dot, 🔔 buzz = — dash</div>
      <div className={css.cardGrid}>
        {Object.entries(MORSE).map(([l, c]) =>
          onPick ? (
            <button key={l} type="button" className={css.cardCell} onClick={() => onPick(l)}>
              <b>{l}</b> <span>{showCode(c)}</span>
            </button>
          ) : (
            <span key={l} className={css.cardCell}>
              <b>{l}</b> <span>{showCode(c)}</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
