"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, SayButton } from "../voice";
import {
  CLEAR_BONUS,
  CORRECT_PER_BOARD,
  BOARD_SECONDS,
  EASY_LIVES,
  LIVES,
  STRIKES,
  maxForLevel,
  buildBoard,
  chomperGrid,
  COINS,
  coinGrid,
  coinsGrid,
  diceGrid,
  dotsGrid,
  tallyGrid,
  grumbleGrid,
  levelById,
  startState,
  step,
  trySeed,
  hunting,
  teachFor,
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
const GRUMBLE: Record<string, ReturnType<typeof grumbleGrid>[]> = {
  plodder: [grumbleGrid("plodder", 0), grumbleGrid("plodder", 1)],
  rover: [grumbleGrid("rover", 0), grumbleGrid("rover", 1)],
  chaser: [grumbleGrid("chaser", 0), grumbleGrid("chaser", 1)],
  calm: [grumbleGrid("chaser", 0, true), grumbleGrid("chaser", 1, true)],
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
    grid =
      art.kind === "dots" ? dotsGrid(art.parts[0]) : art.kind === "tally" ? tallyGrid(art.parts[0]) : art.kind === "dice" ? diceGrid(art.parts) : coinsGrid(art.parts);
    artCache.set(key, grid);
  }
  // Drawn big and scaled down by the stylesheet, so the dots stay countable in
  // a square that is only sixty pixels across on a phone.
  return <PixelSprite grid={grid} scale={4} className={css.cellArt} />;
}

/** One of each coin, built once, for the key above a money board. */
const COIN_KEY = COINS.map((c) => ({ ...c, grid: coinGrid(c.cents, true) }));

/**
 * What each coin is worth, over the top of a money board.
 *
 * A dime is two pixels smaller than a nickel at the size these are drawn,
 * and writing the value on the coin itself would be a two-digit number
 * across fifteen pixels - unreadable. So the board says it once, up here,
 * big enough to read and close enough to check against.
 */
function CoinKey() {
  return (
    <div className={css.coinKey}>
      <span className="kmuted small">Worth:</span>
      {COIN_KEY.map((c) => (
        <span key={c.cents} className={css.coinKeyItem}>
          <PixelSprite grid={c.grid} scale={3} />
          <span>{c.cents}¢</span>
        </span>
      ))}
    </div>
  );
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

export default function ChompersGame({ levelId, onFinish, stars, plays }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Chompers level={level} onFinish={onFinish} earned={stars ?? 0} plays={plays ?? 0} /> : null;
}

/** What to say when something catches you. Only mention the square if one really went back. */
function caughtLine(strikes: number, gaveBack: boolean, walkedInto: boolean): string {
  if (strikes === 0) return "Got you - that's three. The board starts again.";
  const how = walkedInto ? "You walked into one!" : "Got you!";
  return gaveBack ? `${how} That square goes back on the board.` : `${how} Back to the middle.`;
}

function Chompers({ level, onFinish, earned, plays }: { level: ChomperLevel; onFinish: MiniGameUIProps["onFinish"]; earned: number; plays: number }) {
  /** Quick mode is the reward for having shown you know this one. */
  const mayGoQuick = earned >= 3;
  const [quick, setQuick] = useState(false);
  /**
   * The clock stops cutting them off once they have had two goes at a level
   * without getting it. A kid stuck on a skill needs more time with it, not
   * less - the countdown is there to push fluency, not to lock a door.
   */
  const untimed = plays >= 2 && earned < 3;
  /** The same third-go rule gives more lives, not just more time. */
  const lives = untimed ? EASY_LIVES : LIVES;
  const [bi, setBi] = useState(0);
  const [seed, setSeed] = useState(newSeed);
  const [st, setSt] = useState<ChomperState>(() => startState(buildBoard(level.boards[0], 0, seed), lives));
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
  /** Seconds left on this board, or null when the clock is only counting up. */
  const [clock, setClock] = useState(untimed ? 0 : BOARD_SECONDS);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number; score?: number } | null>(null);
  const sent = useRef(false);
  const card = useRef<HTMLDivElement>(null);

  /**
   * Which try this is at the board. Every try is a fresh set of numbers: a
   * kid who has just lost one should be solving it again, not remembering
   * where the right squares were.
   */
  const [tryNo, setTryNo] = useState(0);
  const board: Board = useMemo(() => buildBoard(level.boards[bi], bi, trySeed(seed, tryNo)), [level, bi, seed, tryNo]);
  const bankedTotal = banked.reduce((t, n) => t + n, 0);

  /** Plays one turn, and moves on when the board is finished with. */
  const act = useCallback(
    (a: Act) => {
      const cur = live.current;
      if (cur.over || cur.cleared) return;
      const next = step(board, cur, a, quick);
      if (next === cur) return;
      if (next.lives < cur.lives && !next.over) {
        // A try gone: new numbers, and the Grumbles that come with them.
        const fresh = buildBoard(level.boards[bi], bi, trySeed(seed, tryNo + 1));
        const reset = { ...next, foes: fresh.grumbles.map((g) => ({ ...g })) };
        setTryNo(tryNo + 1);
        live.current = reset;
        setSt(reset);
      } else {
        live.current = next;
        setSt(next);
      }
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
        setNote(caughtLine(next.strikes, next.last?.cell != null, true));
        chime("caught");
      }
      if (next.cleared) chime("streak");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [board, quick, tryNo, seed, bi, level],
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
   * Only offered before the first move of a board: half a board played at one
   * speed and half at the other would not replay, because the server is told
   * one speed per board.
   */
  function goQuick(on: boolean) {
    if (acts.length) return;
    setQuick(on);
  }

  /**
   * The board's clock. It counts down and stops the board at zero, unless
   * this is a third go at a level the kid has not got yet - then it counts
   * up instead and never stops them.
   */
  useEffect(() => {
    if (over || st.over || st.cleared) return;
    const id = setInterval(() => {
      setClock((c) => {
        if (untimed) return c + 1;
        if (c > 1) return c - 1;
        // Out of time: bank the board exactly as it stands.
        const cur = live.current;
        if (!cur.over && !cur.cleared) {
          const stopped = { ...cur, over: true as const };
          live.current = stopped;
          setSt(stopped);
          setNote("Time! Let's see how you did.");
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [over, st.over, st.cleared, untimed, bi]);

  // A fresh board gets a fresh clock.
  useEffect(() => {
    setClock(untimed ? 0 : BOARD_SECONDS);
  }, [bi, untimed]);

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
    const move: BoardMove = { seed, acts, ...(untimed && { easy: true }), ...(quick && { quick: true }) };
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
      const nextSeed = newSeed();
      setBi(bi + 1);
      setSeed(nextSeed);
      setTryNo(0);
      setActs([]);
      setNote(null);
      const fresh = startState(buildBoard(level.boards[bi + 1], bi + 1, nextSeed), lives);
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
        <span className={`chip ${css.clock} ${!untimed && clock <= 15 ? css.clockLow : ""}`} aria-label={untimed ? `${clock} seconds so far` : `${clock} seconds left`}>
          {untimed ? "⏱" : "⏳"} {Math.floor(clock / 60)}:{String(clock % 60).padStart(2, "0")}
        </span>
        <span className={`chip ${css.lives}`} aria-label={`${st.lives} tries left`}>
          {Array.from({ length: lives }, (_, i) => (
            <span key={i} className={i < st.lives ? css.life : css.lifeGone} aria-hidden>
              <PixelSprite grid={CHOMPER[0]} scale={1} />
            </span>
          ))}
        </span>
        <span className={`chip ${css.strikes}`} aria-label={`${STRIKES - st.strikes} mistakes left on this try`}>
          {Array.from({ length: STRIKES }, (_, i) => (
            <span key={i} className={i < st.strikes ? css.strikeOn : css.strikeOff} aria-hidden>
              ✗
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

      {board.cells.some((c) => c.art?.kind === "coins") && <CoinKey />}

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
          {st.foes.map((g, i) => {
            // A hunter off the scent is drawn calm, so the rhythm of it
            // coming after you and then losing interest is something a kid
            // can see rather than something that just happens to them.
            const keen = g.kind !== "chaser" || hunting(st.phase);
            return (
              <div key={i} className={`${css.actor} ${g.kind === "chaser" && keen ? css.keen : ""}`} style={{ gridColumn: g.x + 1, gridRow: g.y + 1 }}>
                <PixelSprite grid={GRUMBLE[keen ? g.kind : "calm"][st.phase % 2]} scale={1} className={css.sprite} />
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

