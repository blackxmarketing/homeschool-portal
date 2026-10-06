"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useTeacherVoice, useVoiceSettings } from "../voice";
import type { Grid } from "@/lib/pixel/grid";
import {
  CRITTER_NAMES,
  FIRST,
  MAX_TRIES,
  SAME,
  SECOND,
  answerFor,
  askFor,
  biggest,
  critterGrid,
  equationFor,
  hintFor,
  levelById,
  meadowSize,
  meadowSpots,
  promptFor,
  scoreRound,
  teachFor,
  type CritterKind,
  type CritterLevel,
  type CritterRound,
  type RoundMove,
} from "@/lib/minigames/critters";
import type { MiniGameUIProps } from "./types";
import css from "./CrittersGame.module.css";

/** Critter sprites are reused a lot, so they're cached. */
const cache = new Map<string, Grid>();
function sprite(k: CritterKind, frame = 0): Grid {
  const key = `${k}-${frame}`;
  let g = cache.get(key);
  if (!g) cache.set(key, (g = critterGrid(k, frame)));
  return g;
}

/** Ten-frame cells: empty, a critter that started there, a new one the kid put in, or one that hopped away. */
const EMPTY = 0;
const OLD = 1;
const NEW = 2;
const GONE = 3;
type Cell = 0 | 1 | 2 | 3;

type Phase = "do" | "answer" | "solved";

export default function CrittersGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Critters level={level} onFinish={onFinish} /> : null;
}

/** The ten frames a round starts with. */
function startCells(r: CritterRound): Cell[] {
  const size = biggest(r) > 10 ? 20 : 10;
  const cells: Cell[] = Array(size).fill(EMPTY);
  const fill = (from: number, n: number, c: Cell) => {
    for (let i = 0; i < n; i++) cells[from + i] = c;
  };
  switch (r.kind) {
    case "make10":
      fill(0, r.n, OLD);
      break;
    case "add":
    case "missingAdd":
      fill(0, r.a, OLD);
      break;
    case "sub":
      fill(0, r.a, OLD);
      break;
    case "missingSub":
      fill(0, r.total, OLD);
      break;
    case "maketen":
      fill(0, r.a, OLD);
      fill(10, r.b, NEW);
      break;
  }
  return cells;
}

const usesFrames = (r: CritterRound) => r.kind !== "count" && r.kind !== "compare";
const usesPad = (r: CritterRound) => r.kind !== "build" && r.kind !== "compare";
const count = (cells: Cell[], c: Cell) => cells.reduce<number>((s, x) => s + (x === c ? 1 : 0), 0);

function Critters({ level, onFinish }: { level: CritterLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const { speakOn } = useVoiceSettings();
  const voice = useTeacherVoice();
  const [ri, setRi] = useState(0);
  const r = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const [phase, setPhase] = useState<Phase>("do");
  const [tries, setTries] = useState<number[]>([]);
  const [note, setNote] = useState<{ text: string; good: boolean } | null>(null);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [tapped, setTapped] = useState<number[]>([]); // count + compare: critters touched, in order
  const [cells, setCells] = useState<Cell[]>(() => startCells(r));
  const [page, setPage] = useState(0);
  const [wiggle, setWiggle] = useState<number | null>(null);
  const [frame, setFrame] = useState(0);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const say = useCallback(
    (id: string, text: string) => {
      if (speakOn && text) speak(id, text, { kind: voice });
    },
    [speakOn, voice],
  );

  // The critters wander: a little two-step walk.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setFrame((f) => 1 - f), 450);
    return () => clearInterval(t);
  }, []);

  // Read each round aloud when it starts.
  const started = useRef(-1);
  useEffect(() => {
    if (started.current === ri || done) return;
    started.current = ri;
    say(`critters-${ri}`, promptFor(r));
  }, [ri, r, say, done]);

  const points = moves.reduce((s, m, i) => s + scoreRound(level.rounds[i], m).points, 0);
  const max = level.rounds.length * 2;

  // ---- Meadow critters (count and compare) ----
  const meadowN = r.kind === "count" ? r.n : r.kind === "compare" ? r.a + r.b : 0;
  const spots = useMemo(() => meadowSpots(meadowN, ri + 7 * level.grade + level.id.length), [meadowN, ri, level.grade, level.id]);
  const grid = meadowSize(meadowN);
  const kindAt = (i: number): CritterKind => (r.kind === "compare" && i >= r.a ? r.other : r.critter);

  function tapCritter(i: number) {
    if (phase !== "do" && !(r.kind === "count" && phase === "answer")) return;
    if (tapped.includes(i)) {
      setWiggle(i);
      setTimeout(() => setWiggle(null), 350);
      if (r.kind === "count") say("critters-tap", "Already counted!");
      return;
    }
    const next = [...tapped, i];
    setTapped(next);
    if (r.kind === "count") {
      if (level.countAloud) say("critters-tap", String(next.length));
      if (next.length === r.n) toAnswer();
    } else if (r.kind === "compare" && next.length === r.a + r.b) toAnswer();
  }

  function toAnswer() {
    setPhase("answer");
    setNote(null);
    say(`critters-ask-${ri}`, askFor(r));
  }

  // ---- Ten frames ----
  const news = count(cells, NEW);
  const olds = count(cells, OLD);
  const gone = count(cells, GONE);

  function tapCell(i: number) {
    if (phase !== "do") return;
    const c = cells[i];
    const next = [...cells];
    switch (r.kind) {
      case "build": {
        if (c === EMPTY) next[next.indexOf(EMPTY)] = OLD;
        else next[next.lastIndexOf(OLD)] = EMPTY;
        break;
      }
      case "make10":
      case "add":
      case "missingAdd": {
        if (c === EMPTY) {
          const at = next.indexOf(EMPTY);
          if (at < 0) return;
          next[at] = NEW;
        } else if (c === NEW) next[next.lastIndexOf(NEW)] = EMPTY;
        else return nudge(i);
        break;
      }
      case "sub":
      case "missingSub": {
        if (c === OLD) next[i] = GONE;
        else if (c === GONE) next[i] = OLD;
        else return;
        break;
      }
      case "maketen": {
        // Tap a critter in the second frame: it hops up into the first frame.
        if (i < 10 || c !== NEW) return nudge(i);
        const to = next.indexOf(EMPTY);
        if (to < 0 || to >= 10) return;
        const from = next.lastIndexOf(NEW);
        next[from] = EMPTY;
        next[to] = NEW;
        break;
      }
      default:
        return;
    }
    setCells(next);
    setNote(null);
    // Some rounds move on by themselves once the frame is right.
    if (r.kind === "make10" && !next.includes(EMPTY)) toAnswer();
    if (r.kind === "maketen" && !next.slice(0, 10).includes(EMPTY)) toAnswer();
  }

  function nudge(i: number) {
    setWiggle(1000 + i);
    setTimeout(() => setWiggle(null), 350);
  }

  /** "I'm done" for the hands-on part. Building is the answer; the others get checked kindly (not scored). */
  function doneDoing() {
    if (r.kind === "build") {
      const n = count(cells, OLD);
      if (n === 0) return say(`critters-fix-${ri}`, "Tap the boxes to put critters in.");
      return answer(n);
    }
    let ok = false;
    let msg = "";
    const nm = (k: CritterKind) => CRITTER_NAMES[k].many;
    if (r.kind === "add") {
      ok = news === r.b;
      msg = `Count the ${nm(r.other)} you put in. We need ${r.b}.`;
    } else if (r.kind === "missingAdd") {
      ok = olds + news === r.total;
      msg = `Count all the critters. We need ${r.total} in all.`;
    } else if (r.kind === "sub") {
      ok = gone === r.b;
      msg = `Count the empty boxes. ${r.b} should hop away.`;
    } else if (r.kind === "missingSub") {
      ok = olds === r.left;
      msg = `Count the ${nm(r.critter)} still in the frames. We want ${r.left} left.`;
    }
    if (ok) {
      chime("right");
      toAnswer();
    } else {
      chime("oops");
      setNote({ text: `Not yet! ${msg}`, good: false });
      say(`critters-fix-${ri}`, `Not yet! ${msg}`);
    }
  }

  // ---- Answering ----
  function answer(n: number) {
    if (phase === "solved") return;
    const t = [...tries, n];
    setTries(t);
    const right = answerFor(r);
    if (n === right) {
      chime(t.length === 1 ? "streak" : "right");
      const text = teachFor(r);
      setNote({ text, good: true });
      say(`critters-teach-${ri}`, text);
      finishRound(t);
      return;
    }
    chime("oops");
    if (t.length >= MAX_TRIES) {
      const text = `Good try! ${teachFor(r).replace(/^Yes!?,? ?/, "")}`;
      setNote({ text, good: false });
      say(`critters-teach-${ri}`, text);
      finishRound(t);
      return;
    }
    const text = hintFor(r, n);
    setNote({ text, good: false });
    say(`critters-hint-${ri}`, text);
    // Counting again from the start helps after a wrong count.
    if (r.kind === "count") {
      setTapped([]);
      setPhase("do");
    }
  }

  function finishRound(t: number[]) {
    setMoves((m) => [...m, { tries: t }]);
    setPhase("solved");
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      const nr = level.rounds[ri + 1];
      setRi(ri + 1);
      setPhase("do");
      setTries([]);
      setNote(null);
      setTapped([]);
      setCells(startCells(nr));
      setPage(0);
      return;
    }
    setDone(true);
    setBusy(true);
    try {
      const res = await onFinish(moves);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
      say("critters-end", res.stars === 3 ? "Three stars! You are a super counter!" : "Great job! Play again to earn more stars.");
    } finally {
      setBusy(false);
    }
  }

  function restart() {
    setTapped([]);
    setCells(startCells(r));
    setNote(null);
    setPhase("do");
  }

  if (done) {
    return (
      <div className={`mg ${css.critters}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Meadow done!</h2>
          <p className={css.big}>
            {"🐞".repeat(Math.max(1, Math.round((points / max) * 5)))} {points} of {max} points
          </p>
          {busy && <p className="kmuted">Counting the critters…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: count slowly and touch each critter just one time. Stars come from first tries.</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => (
              <span key={i}>
                {equationFor(level.rounds[i])} {scoreRound(level.rounds[i], m).points === 2 ? "⭐" : scoreRound(level.rounds[i], m).points === 1 ? "👍" : "🌱"}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const prompt = promptFor(r);
  const ask = askFor(r);
  const padMax = biggest(r) > 10 ? 20 : 10;

  return (
    <div className={`mg ${css.critters}`}>
      <div className="mg-hud">
        <span className="chip">
          🐞 {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={css.prompt}>
        <SayButton id={`critters-say-${ri}`} text={phase === "answer" && ask ? ask : prompt} />
        <p>{phase === "answer" && ask ? ask : prompt}</p>
      </div>

      {/* The meadow: count and compare */}
      {(r.kind === "count" || (r.kind === "compare" && phase === "do")) && (
        <div
          className={css.meadow}
          style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)`, gridTemplateRows: `repeat(${grid.rows}, 62px)` }}
          aria-label={r.kind === "count" ? `A meadow of ${CRITTER_NAMES[r.critter].many}` : "A meadow of critters"}
        >
          {spots.map((s, i) => {
            const k = kindAt(i);
            const n = tapped.indexOf(i);
            const isTapped = n >= 0;
            if (r.kind === "compare" && isTapped) return null;
            return (
              <button
                key={i}
                type="button"
                className={`${css.critter} ${isTapped ? css.counted : ""} ${wiggle === i ? css.wiggle : ""}`}
                style={{ gridColumn: s.col + 1, gridRow: s.row + 1, translate: `${s.dx * 40}% ${s.dy * 40}%`, animationDelay: `${(i % 5) * 0.3}s` }}
                onClick={() => tapCritter(i)}
                aria-label={isTapped ? `Counted` : `A ${CRITTER_NAMES[k].one}. Tap to ${r.kind === "count" ? "count it" : "line it up"}.`}
              >
                <PixelSprite grid={sprite(k, isTapped ? 0 : (frame + i) % 2)} scale={3} />
                {isTapped && <span className={css.badge}>{level.countAloud ? n + 1 : "✓"}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Compare: the two lines */}
      {r.kind === "compare" && (
        <div className={css.lines}>
          {([
            [r.critter, FIRST, (i: number) => i < r.a],
            [r.other, SECOND, (i: number) => i >= r.a],
          ] as const).map(([k, val, mine]) => {
            const lined = tapped.filter(mine);
            const otherLen = tapped.filter((i) => !mine(i)).length;
            const all = phase !== "do";
            return (
              <button
                key={val}
                type="button"
                className={`${css.line} ${phase === "answer" ? css.pick : ""}`}
                onClick={() => phase === "answer" && answer(val)}
                disabled={phase !== "answer"}
                aria-label={`The line of ${CRITTER_NAMES[k].many}${all ? `: ${lined.length}` : ""}. ${phase === "answer" ? "Tap if this line has more." : ""}`}
              >
                {Array.from({ length: 10 }, (_, s) => (
                  <span key={s} className={`${css.slot} ${s < lined.length && s >= otherLen && all ? css.extra : ""}`}>
                    {s < lined.length && <PixelSprite grid={sprite(k)} scale={2} />}
                  </span>
                ))}
              </button>
            );
          })}
          {phase === "answer" && (
            <button type="button" className={`kbtn game-btn ${css.same}`} onClick={() => answer(SAME)}>
              Same! 🤝
            </button>
          )}
        </div>
      )}

      {/* Ten frames */}
      {usesFrames(r) && (
        <div className={css.frames}>
          {Array.from({ length: cells.length / 10 }, (_, f) => (
            <div key={f} className={css.frame} role="group" aria-label={`Ten frame ${f + 1}`}>
              {cells.slice(f * 10, f * 10 + 10).map((c, j) => {
                const i = f * 10 + j;
                const k = c === NEW && r.kind !== "build" && "other" in r ? r.other : r.critter;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`${css.cell} ${c === GONE ? css.gone : ""} ${wiggle === 1000 + i ? css.wiggle : ""}`}
                    onClick={() => tapCell(i)}
                    disabled={phase !== "do"}
                    aria-label={c === EMPTY ? "Empty box" : c === GONE ? "Hopped away" : CRITTER_NAMES[k].one}
                  >
                    {(c === OLD || c === NEW) && <PixelSprite grid={sprite(k, c === NEW ? frame : 0)} scale={3} />}
                    {c === GONE && <span className={css.puff}>💨</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {phase === "solved" && <p className={css.equation}>{equationFor(r)}</p>}

      {/* Hands-on buttons */}
      {phase === "do" && (
        <div className={css.row}>
          {(r.kind === "build" || r.kind === "add" || r.kind === "sub" || r.kind === "missingAdd" || r.kind === "missingSub") && (
            <button type="button" className={`kbtn big game-btn ${css.go}`} onClick={doneDoing}>
              Done ✓
            </button>
          )}
          {(tapped.length > 0 || cells.some((c, i) => c !== startCells(r)[i])) && (
            <button type="button" className={`kbtn ${css.again}`} onClick={restart}>
              ↺ Start over
            </button>
          )}
        </div>
      )}

      {/* Number tiles */}
      {phase === "answer" && usesPad(r) && (
        <div className={css.pad}>
          {padMax > 10 && (
            <div className={css.pages}>
              {[0, 1].map((p) => (
                <button key={p} type="button" className={`${css.pageBtn} ${page === p ? css.pageOn : ""}`} aria-pressed={page === p} onClick={() => setPage(p)}>
                  {p ? "11 – 20" : "1 – 10"}
                </button>
              ))}
            </div>
          )}
          <div className={css.tiles}>
            {Array.from({ length: 10 }, (_, j) => page * 10 + j + 1).map((n) => (
              <button key={n} type="button" className={`kbtn game-btn ${css.tile} ${tries.includes(n) ? css.tried : ""}`} onClick={() => answer(n)} disabled={tries.includes(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {note && (
        <div className={`day-report ${note.good ? "good" : "bad"} ${css.note}`}>
          <SayButton id={`critters-note-${ri}`} text={note.text} />
          {note.text}
        </div>
      )}

      {phase === "solved" && (
        <button type="button" className="kbtn big game-btn" onClick={next}>
          {ri + 1 < level.rounds.length ? "Next ➜" : "Finish 🎉"}
        </button>
      )}
    </div>
  );
}
