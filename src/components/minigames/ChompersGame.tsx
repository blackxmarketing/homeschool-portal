"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, SayButton } from "../voice";
import {
  CLEAR_BONUS,
  CORRECT_PER_BOARD,
  LIVES,
  maxForLevel,
  QUICK_TICK_MS,
  buildBoard,
  chomperGrid,
  coinsGrid,
  dotsGrid,
  grumbleAt,
  grumbleGrid,
  levelById,
  startState,
  step,
  teachFor,
  tick,
  type Act,
  type Board,
  type CellArt,
  type BoardMove,
  type ChomperLevel,
  type ChomperState,
} from "@/lib/minigames/chompers";
import type { MiniGameUIProps } from "./types";
import css from "./ChompersGame.module.css";

/** Built once: the same three faces and two monsters on every board. */
const CHOMPER = [chomperGrid(0), chomperGrid(1), chomperGrid(2)];
const GRUMBLE = {
  plodder: [grumbleGrid("plodder", 0), grumbleGrid("plodder", 1)],
  pacer: [grumbleGrid("pacer", 0), grumbleGrid("pacer", 1)],
};

/**
 * A cell drawn rather than written. Built as it is needed rather than up
 * front - there are hundreds of possible handfuls of coins - but memoised,
 * because the board redraws on every turn.
 */
const artCache = new Map<string, ReturnType<typeof dotsGrid>>();
function CellPicture({ art }: { art: CellArt }) {
  const key = `${art.kind}:${art.parts.join(",")}`;
  let grid = artCache.get(key);
  if (!grid) {
    grid = art.kind === "dots" ? dotsGrid(art.parts[0]) : coinsGrid(art.parts);
    artCache.set(key, grid);
  }
  // Drawn big and scaled down by the stylesheet, so the dots stay countable in
  // a square that is only sixty pixels across on a phone.
  return <PixelSprite grid={grid} scale={4} className={css.cellArt} />;
}

const KEYS: Record<string, Act> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  " ": "munch",
  Enter: "munch",
};

const newSeed = () => Math.floor(Math.random() * 2147483647);

export default function ChompersGame({ levelId, onFinish, stars }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Chompers level={level} onFinish={onFinish} earned={stars ?? 0} /> : null;
}

function Chompers({ level, onFinish, earned }: { level: ChomperLevel; onFinish: MiniGameUIProps["onFinish"]; earned: number }) {
  /** Quick mode is the reward for having shown you know this one. */
  const mayGoQuick = earned >= 3;
  const [quick, setQuick] = useState(false);
  const [bi, setBi] = useState(0);
  const [seed, setSeed] = useState(newSeed);
  /** Quick mode only: when this board started, and when each move happened. */
  const started = useRef(0);
  const times = useRef<number[]>([]);
  /** Where the clock had got to when the last life was lost. */
  const base = useRef(0);
  const [st, setSt] = useState<ChomperState>(() => startState());
  const [done, setDone] = useState<BoardMove[]>([]);
  /** Points from the boards already finished. */
  const [banked, setBanked] = useState<number[]>([]);
  /** How many of those were cleared outright. */
  const [clears, setClears] = useState(0);
  const [acts, setActs] = useState<Act[]>([]);
  /**
   * The board state as the game knows it, not as React has got round to
   * drawing it. Turns arrive faster than renders when a key repeats, and a
   * turn worked out from a stale state would put a different move in the log
   * than the one the kid saw - and the server replays the log.
   */
  const live = useRef(st);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [face, setFace] = useState(0);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number; score?: number } | null>(null);
  const sent = useRef(false);
  const card = useRef<HTMLDivElement>(null);

  const board: Board = useMemo(() => buildBoard(level.boards[bi], bi, seed), [level, bi, seed]);
  const bankedTotal = banked.reduce((t, n) => t + n, 0);

  /** Plays one turn, and moves on when the board is finished with. */
  const act = useCallback(
    (a: Act) => {
      let cur = live.current;
      if (cur.over || cur.cleared) return;
      let at = 0;
      if (quick) {
        at = Math.round(performance.now() - started.current);
        cur = catchUp(at);
        if (cur.over || cur.cleared) return;
      }
      const lives0 = cur.lives;
      const next = step(board, cur, a, !quick);
      if (next === cur) return;
      if (quick) {
        if (next.lives < lives0) base.current = at;
        times.current = [...times.current, at];
      }
      live.current = next;
      setSt(next);
      setActs((xs) => [...xs, a]);
      const what = next.last;
      if (what?.kind === "right") {
        setFace(1);
        setNote(null);
        chime("right");
      } else if (what?.kind === "wrong") {
        setFace(2);
        setNote(teachFor(board.rule, board.cells[what.cell!]));
        chime("oops");
      } else if (what?.kind === "caught") {
        setFace(2);
        setNote("A Grumble got you! Back to the middle.");
        chime("oops");
      }
      if (next.cleared) chime("streak");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [board, quick],
  );

  /**
   * Bring the board up to the top when a level starts. On a phone the page
   * header, the level buttons and the intro take most of the screen, which
   * would leave a kid scrolling between the board and the pad on every turn.
   * Only scrolls when the game really does run off the bottom.
   */
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    if (box.bottom <= window.innerHeight) return;
    el.scrollIntoView({ block: "start", behavior: "auto" });
  }, []);

  /**
   * Quick mode: walk the Grumbles forward to where the clock says they are.
   * Exactly the loop the server runs when it re-scores the game, including
   * how a lost life restarts the clock - at the tick it happened on, not at
   * the moment this browser happened to notice.
   */
  const catchUp = useCallback(
    (to: number) => {
      let cur = live.current;
      while (!cur.over && !cur.cleared) {
        const next = base.current + (cur.phase + 1) * QUICK_TICK_MS;
        if (next > to) break;
        const lives0 = cur.lives;
        const after = tick(board, cur);
        if (after.lives < lives0) {
          base.current = next;
          chime("oops");
        }
        cur = after;
      }
      if (cur !== live.current) {
        live.current = cur;
        setSt(cur);
        if (cur.last?.kind === "caught") {
          setFace(2);
          setNote("A Grumble got you! Back to the middle.");
        }
      }
      return cur;
    },
    [board],
  );

  /**
   * Switching speed restarts this board's clock. Only offered before the
   * first move of a board: half a board played at one speed and half at the
   * other would not replay, because the server is told one speed per board.
   */
  function goQuick(on: boolean) {
    if (acts.length) return;
    times.current = [];
    base.current = 0;
    started.current = performance.now();
    setQuick(on);
  }

  /**
   * A kid who switches tab should not come back dead. The clock is pushed
   * forward by however long the page was hidden, so the time that went by
   * never happened as far as this board is concerned - and because every
   * move is timed against the same origin, the server sees the same game.
   */
  useEffect(() => {
    if (!quick) return;
    let hiddenAt = 0;
    const onVis = () => {
      if (document.hidden) hiddenAt = performance.now();
      else if (hiddenAt) {
        started.current += performance.now() - hiddenAt;
        hiddenAt = 0;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [quick]);

  // Quick mode: the Grumbles keep walking whether or not the kid does.
  useEffect(() => {
    if (!quick || over) return;
    const id = setInterval(() => catchUp(Math.round(performance.now() - started.current)), 120);
    return () => clearInterval(id);
  }, [quick, over, catchUp, bi]);

  // The face goes back to normal a moment after a bite.
  useEffect(() => {
    if (face === 0) return;
    const t = setTimeout(() => setFace(0), face === 1 ? 180 : 700);
    return () => clearTimeout(t);
  }, [face, st.turn]);

  // Arrow keys and WASD; space or enter to munch.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const a = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (!a) return;
      e.preventDefault();
      act(a);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [act]);

  // Board over: bank it, then either set up the next one or send the lot off.
  useEffect(() => {
    if (!st.cleared && !st.over) return;
    const move: BoardMove = quick ? { seed, acts, times: times.current, endMs: Math.round(performance.now() - started.current) } : { seed, acts };
    const all = [...done, move];
    const pts = [...banked, st.points];
    const cleared = clears + (st.cleared ? 1 : 0);
    const last = bi + 1 >= level.boards.length;
    if (st.over || last) {
      setDone(all);
      setBanked(pts);
      setClears(cleared);
      setOver(true);
      return;
    }
    const t = setTimeout(() => {
      setDone(all);
      setBanked(pts);
      setClears(cleared);
      setBi(bi + 1);
      setSeed(newSeed());
      setActs([]);
      setNote(null);
      times.current = [];
      base.current = 0;
      started.current = performance.now();
      const fresh = startState(st.lives);
      live.current = fresh;
      setSt(fresh);
    }, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.cleared, st.over]);

  // Send the whole level to the server to be scored.
  useEffect(() => {
    if (!over || sent.current) return;
    sent.current = true;
    setBusy(true);
    onFinish(done)
      .then((r) => {
        setResult(r);
        if (r.stars > 0) setTimeout(() => chime("streak"), 400);
      })
      .catch(() => setError("Couldn't save that game - check your connection."))
      .finally(() => setBusy(false));
  }, [over, done, onFinish]);

  const left = board.cells.filter((c, i) => c.ok && !st.eaten[i]).length;
  const total = bankedTotal + st.points;
  const max = maxForLevel(level);

  if (over) {
    const cleared = clears;
    // Every board is banked by the time this screen shows, the last one
    // included - so the running total must not add it on a second time. Once
    // the server has replayed the game, show its number instead of ours.
    const scored = result?.score ?? bankedTotal;
    return (
      <div className={`mg ${css.ch}`} ref={card}>
        <div className="mg-result">
          <h2 className="pixel-title">{st.lives > 0 ? "Board cleared!" : "Out of lives"}</h2>
          <p className={css.big}>
            👾 {scored} of {max} points
          </p>
          <p className="kmuted">
            {cleared} of {level.boards.length} boards cleared.
          </p>
          {busy && <p className="kmuted">Counting what you ate…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: clear every right answer on a board for a {CLEAR_BONUS}-point bonus. Walk into the edge to wait while a Grumble goes past.</p>}
              {result.stars >= 3 && <p className="kmuted small">⚡ Quick mode is open on this level now: the Grumbles keep moving whether you do or not.</p>}
            </>
          )}
          {error && <p className="kmuted small">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`mg ${css.ch}`} ref={card}>
      <div className="mg-hud">
        <span className="chip">
          Board {bi + 1} of {level.boards.length}
        </span>
        <span className="chip">👾 {total}</span>
        <span className={`chip ${css.lives}`} aria-label={`${st.lives} lives left`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <span key={i} className={i < st.lives ? css.life : css.lifeGone} aria-hidden>
              <PixelSprite grid={CHOMPER[0]} scale={1} />
            </span>
          ))}
        </span>
      </div>

      <div className={css.rule}>
        <h2 className="pixel-title small">{board.label}</h2>
        <SayButton id={`chomp-${level.id}-${bi}`} text={`Eat every square that fits: ${board.label}`} />
        {mayGoQuick && (
          <button
            type="button"
            className={`chip ${css.speed} ${quick ? css.speedOn : ""}`}
            onClick={() => goQuick(!quick)}
            disabled={acts.length > 0}
            aria-pressed={quick}
            title={acts.length > 0 ? "Finish this board first" : "The Grumbles keep moving whether you do or not"}
          >
            {quick ? "⚡ Quick" : "🐢 Steady"}
          </button>
        )}
        <span className="kmuted small">{left} left</span>
      </div>

      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${((CORRECT_PER_BOARD - left) / CORRECT_PER_BOARD) * 100}%` }} />
      </div>

      <div className={css.boardWrap}>
        <div className={css.board} role="grid" aria-label={board.label}>
          {board.cells.map((c, i) => (
            <div
              key={i}
              role="gridcell"
              className={`${css.cell} ${st.eaten[i] ? css.gone : ""} ${st.last?.cell === i && st.last.kind === "wrong" ? css.badCell : ""}`}
              aria-label={st.eaten[i] ? "eaten" : c.text}
            >
              {!st.eaten[i] && (c.art ? <CellPicture art={c.art} /> : <span>{c.text}</span>)}
            </div>
          ))}
        </div>

        <div className={css.actors} aria-hidden>
          {board.grumbles.map((g, i) => {
            const p = grumbleAt(g, st.phase);
            return (
              <div key={i} className={css.actor} style={{ gridColumn: p.x + 1, gridRow: p.y + 1 }}>
                <PixelSprite grid={GRUMBLE[g.kind][st.phase % 2]} scale={1} className={css.sprite} />
              </div>
            );
          })}
          <div className={css.actor} style={{ gridColumn: st.x + 1, gridRow: st.y + 1 }}>
            <PixelSprite grid={CHOMPER[face]} scale={1} className={css.sprite} />
          </div>
        </div>
      </div>

      <p className={`${css.note} ${st.last?.kind === "wrong" || st.last?.kind === "caught" ? css.noteBad : ""}`} aria-live="polite">
        {note ?? (st.cleared ? "Board cleared! Next one coming up…" : "Arrow keys to move, space to munch.")}
      </p>

      <div className="mg-controls">
        <div className={css.pad} aria-label="Move the Chomper">
          <button type="button" className={`kbtn ${css.arrow} ${css.up}`} onClick={() => act("up")} aria-label="Up">
            ▲
          </button>
          <button type="button" className={`kbtn ${css.arrow} ${css.leftB}`} onClick={() => act("left")} aria-label="Left">
            ◀
          </button>
          <button type="button" className={`kbtn ${css.arrow} ${css.rightB}`} onClick={() => act("right")} aria-label="Right">
            ▶
          </button>
          <button type="button" className={`kbtn ${css.arrow} ${css.down}`} onClick={() => act("down")} aria-label="Down">
            ▼
          </button>
        </div>
        <button type="button" className={`kbtn big game-btn ${css.munch}`} onClick={() => act("munch")}>
          Munch!
        </button>
      </div>
    </div>
  );
}

