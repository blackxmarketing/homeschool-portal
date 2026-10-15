"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, TeacherVoice, useVoiceSettings } from "../voice";
import TeacherBrief from "./TeacherBrief";
import { EndChoices, Fireworks, StarPop } from "./EndOnLevel";
import type { MiniGameUIProps } from "./types";
import { heroGrid, petGrid, DEFAULT_HERO, type Hero } from "@/lib/pixel/hero";
import {
  COLS,
  HARD_TICK_MS,
  PACES,
  medalGrid,
  LIVES,
  MOVE_ON_STARS,
  ROWS,
  WORDS_PER_LEVEL,
  crittersOn,
  floorGrid,
  frogGrid,
  gateGrid,
  levelById,
  monkeyGrid,
  play,
  showsWord,
  snakeGrid,
  stoneGrid,
  treeGrid,
  waterGrid,
  wordsFor,
  type Dir,
  type Pace,
  type SpellLevel,
  type Step,
} from "@/lib/minigames/spellrush";
import css from "./SpellRushGame.module.css";

/**
 * XP Rush: Spelling - the jungle, drawn.
 *
 * The teacher says the word; the letters are out in the clearing on stones;
 * the kid walks over them in order. Everything the screen shows comes from
 * `play()` in the lib, which is the same walk the server does when it scores
 * the run - the screen never decides anything on its own.
 */

const newSeed = () => Math.floor(Math.random() * 2 ** 31);

/** The count-in, a word at a time, so the voice keeps step with the screen. */
const COUNT_WORDS: Record<number, string> = { 3: "Three.", 2: "Two.", 1: "One.", 0: "Off you go!" };

/** The teacher who runs this one: the old man from the reading lessons. */
export const SPELLING_TEACHER = { id: "ela", name: "Professor Quill" };

/** Which key means which way. */
const KEYS: Record<string, Dir> = {
  ArrowUp: "u",
  ArrowDown: "d",
  ArrowLeft: "l",
  ArrowRight: "r",
  w: "u",
  s: "d",
  a: "l",
  d: "r",
  W: "u",
  S: "d",
  A: "l",
  D: "r",
};

const TREES = [treeGrid(0), treeGrid(1)];
const WATER = [waterGrid(0), waterGrid(1)];
const FLOOR = floorGrid();
const STONE = [stoneGrid(false), stoneGrid(true)];
const CRITTER: Record<string, ReturnType<typeof snakeGrid>[]> = {
  snake: [snakeGrid(0), snakeGrid(1)],
  frog: [frogGrid(0), frogGrid(1)],
  monkey: [monkeyGrid(0), monkeyGrid(1)],
};

export default function SpellRushGame({ levelId, onFinish, stars, hero, onReplay, onQuit, onNext }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <SpellRush level={level} onFinish={onFinish} earned={stars ?? 0} hero={hero} onReplay={onReplay} onQuit={onQuit} onNext={onNext} /> : null;
}

function SpellRush({
  level,
  onFinish,
  earned,
  hero,
  onReplay,
  onQuit,
  onNext,
}: {
  level: SpellLevel;
  onFinish: MiniGameUIProps["onFinish"];
  /** Stars already on this level, which is a way on in its own right. */
  earned: number;
  hero?: Hero;
  onReplay?: () => void;
  onQuit?: () => void;
  onNext?: () => void;
}) {
  const [seed] = useState(newSeed);
  const [steps, setSteps] = useState<Step[]>([]);
  const live = useRef<Step[]>([]);
  const moved = useRef(Date.now());
  const sent = useRef(false);

  const [ready, setReady] = useState(false);
  const [picking, setPicking] = useState(false);
  const [pace, setPace] = useState<Pace>("easy");
  const [count, setCount] = useState<number | null>(null);
  const [frame, setFrame] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    stars: number;
    xp: number;
    score?: number;
    level?: number;
    rank?: string;
    unlocked?: string[];
    mastered?: boolean;
    justMastered?: boolean;
  } | null>(null);

  const { speakOn } = useVoiceSettings();
  const who = hero ?? DEFAULT_HERO;
  const me = useMemo(() => [heroGrid(who, 0), heroGrid(who, 1)], [who]);
  const pet = useMemo(() => petGrid(who.pet, 0), [who.pet]);

  const words = useMemo(() => wordsFor(level, seed), [level, seed]);
  const run = useMemo(() => play(level, { seed, steps, pace }), [level, seed, steps, pace]);
  const done = run.finished || run.over;
  const word = run.clearing.word;
  /** What they have spelled so far, and what is still blank. */
  const spelled = [...word].map((ch, i) => (i < run.got ? ch : null));

  // The jungle breathes: two frames, everywhere, on one clock.
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => f + 1), 420);
    return () => clearInterval(t);
  }, []);

  /** The count-in, said a number at a time. */
  useEffect(() => {
    if (count === null) return;
    if (speakOn) speak(`sp-count-${count}`, COUNT_WORDS[count] ?? String(count), { kind: "male" });
    if (count === 0) {
      setCount(null);
      setReady(true);
      moved.current = Date.now();
      return;
    }
    const t = setTimeout(() => setCount((c) => (c === null ? null : c - 1)), 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  /** Every new word is said out loud - that is the whole test. */
  useEffect(() => {
    if (!ready || done) return;
    const t = setTimeout(() => {
      if (speakOn) speak(`sp-word-${run.done}`, `Spell: ${word}. ${word}.`, { kind: "male" });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, run.done, done]);

  /** A sound for each thing that can happen on a step. */
  useEffect(() => {
    if (run.beat === "letter") chime("right");
    else if (run.beat === "wrong") chime("oops");
    else if (run.beat === "bitten") chime("died");
    else if (run.beat === "word") chime("streak");
    else if (run.beat === "level") chime("streak");
  }, [run.beat, run.done, run.wrong, run.lives]);

  /**
   * On hard the animals have their own clock, and a clock the browser keeps
   * is a clock the server cannot check - so what gets sent is the time that
   * passed, as a step of its own. The replay moves them on by the same
   * amount, which is how both sides end up in the same place.
   */
  useEffect(() => {
    if (pace !== "hard" || !ready || done) return;
    const id = setInterval(() => {
      const now = Date.now();
      const ms = now - moved.current;
      if (ms < HARD_TICK_MS) return;
      moved.current = now;
      live.current = [...live.current, { d: "w", ms }];
      setSteps(live.current);
    }, 300);
    return () => clearInterval(id);
  }, [pace, ready, done]);

  const walk = useCallback(
    (d: Dir) => {
      if (!ready || done || live.current.length >= 1200) return;
      const now = Date.now();
      const step = { d, ms: Math.min(60000, now - moved.current) };
      moved.current = now;
      live.current = [...live.current, step];
      setSteps(live.current);
    },
    [ready, done],
  );

  // The keyboard: arrows or WASD, the way every other game on here works.
  useEffect(() => {
    if (!ready || done) return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const d = KEYS[e.key];
      if (!d) return;
      e.preventDefault();
      walk(d);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, done, walk]);

  // The run is over: send it to be scored on the server.
  useEffect(() => {
    if (!done || !ready || sent.current) return;
    sent.current = true;
    setBusy(true);
    void (async () => {
      try {
        const r = await onFinish({ seed, steps: live.current, pace });
        setResult({
          stars: r.stars,
          xp: r.xp,
          score: r.score,
          level: r.level,
          rank: r.rank,
          unlocked: r.unlocked,
          mastered: r.mastered,
          justMastered: r.justMastered,
        });
        if (r.justMastered) {
          chime("medal");
          [260, 580, 900, 1240].forEach((ms) => setTimeout(() => chime("pop"), ms));
        }
      } catch {
        setError("That run could not be saved. Check you are online.");
      } finally {
        setBusy(false);
      }
    })();
  }, [done, ready, onFinish, seed, pace]);

  const tiles = run.clearing.tiles;
  const stones = run.clearing.stones;
  const spot = (x: number, y: number) => ({ left: `${(x / COLS) * 100}%`, top: `${(y / ROWS) * 100}%` });

  return (
    <TeacherVoice kind="male">
      <div className={`mg ${css.sr}`}>
        <div className="mg-hud">
          <span className="chip">🌿 {run.points}</span>
          <span className="chip" aria-label={`word ${Math.min(words.length, run.done + 1)} of ${words.length}`}>
            {Math.min(words.length, run.done + 1)} / {words.length}
          </span>
          <span className={`chip ${css.lives}`} aria-label={`${run.lives} lives left`}>
            {Array.from({ length: LIVES }, (_, i) => (
              <span key={i} className={i < run.lives ? css.life : css.lifeGone} aria-hidden>
                ♥
              </span>
            ))}
          </span>
          <span className="chip">✗ {run.wrong}</span>
        </div>

        <TeacherBrief
          teacher={SPELLING_TEACHER}
          directions={level.intro}
          rule={level.title}
          levelId={level.id}
          board={0}
          seed={seed}
          canAsk={false}
          stage={ready ? "play" : "brief"}
          onReady={() => setPicking(true)}
          onAsking={() => {}}
        />

        {/* The word, as far as they have got with it. The letters they have
            picked up are written in; the rest are blanks, because this is a
            spelling test and not a copying exercise. The youngest grades see
            the whole word: there, the job is the order of the letters. */}
        <div className={css.wordBar}>
          {showsWord(level) || done ? (
            <span className={css.wordShown} aria-label={`the word is ${word}`}>
              {[...word].map((ch, i) => (
                <span key={i} className={i < run.got ? css.gotLetter : css.toGo}>
                  {ch}
                </span>
              ))}
            </span>
          ) : (
            <span className={css.wordShown} aria-label={`${run.got} of ${word.length} letters`}>
              {spelled.map((ch, i) => (
                <span key={i} className={ch ? css.gotLetter : css.blank}>
                  {ch ?? "_"}
                </span>
              ))}
            </span>
          )}
          {ready && !done && (
            <button type="button" className="kbtn ghost small-btn" onClick={() => speak(`sp-again-${run.done}`, `${word}. ${word}.`, { kind: "male" })}>
              🔊 Say it again
            </button>
          )}
        </div>

        {/* The clearing. Tiles underneath, everything that moves over the
            top of them, placed by where they are rather than drawn into the
            grid, so a step slides instead of jumping. */}
        <div className={css.clearing} aria-label={`A jungle clearing: spell ${showsWord(level) ? word : "the word you heard"}`}>
          <div className={css.ground}>
            {tiles.map((t, i) => (
              <span key={i} className={css.tile}>
                <PixelSprite grid={t === "tree" ? TREES[frame % 2] : t === "water" ? WATER[frame % 2] : FLOOR} scale={3} />
              </span>
            ))}
          </div>

          {stones.map((s, i) =>
            run.taken.includes(i) ? null : (
              <span key={`s${i}`} className={css.stone} style={spot(s.x, s.y)}>
                <PixelSprite grid={STONE[0]} scale={3} />
                <span className={css.letter}>{s.ch}</span>
              </span>
            ),
          )}

          {/* The way out, which opens as the last letter goes in. */}
          <span className={css.gate} style={spot(COLS - 1, 1)}>
            <PixelSprite grid={gateGrid(run.got >= word.length)} scale={3} />
          </span>

          {run.critters.map((c, i) => (
            <span key={`c${i}`} className={`${css.critter} ${c.dir === 2 ? css.facingLeft : ""}`} style={spot(c.x, c.y)}>
              <PixelSprite grid={CRITTER[c.kind][frame % 2]} scale={3} />
            </span>
          ))}

          <span className={`${css.me} ${run.beat === "bitten" ? css.bitten : ""}`} style={spot(run.me.x, run.me.y)}>
            <PixelSprite grid={me[frame % 2]} scale={3} />
            {pet && run.finished && <PixelSprite grid={pet} scale={2} className={css.atHeel} />}
          </span>

          {picking && (
            <div className={css.pickWrap}>
              <div className={css.pickCard}>
                <strong className={css.pickTitle}>How hard do you want it?</strong>
                <div className={css.pickRow}>
                  {PACES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`kbtn small-btn ${css.pick}`}
                      onClick={() => {
                        setPace(p);
                        setPicking(false);
                        setCount(3);
                      }}
                    >
                      <span className={css.pickName}>{p === "easy" ? "🙂 Easy" : p === "medium" ? "😬 Medium" : "😱 Hard"}</span>
                      <span className={css.pickSay}>
                        {p === "easy"
                          ? "An empty clearing. Take as long as you like."
                          : p === "medium"
                            ? "They are in here with you, but they only move when you move."
                            : "They have a clock of their own. Standing still will not save you."}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {count !== null && (
            <div className={css.countOver} role="status" aria-live="assertive">
              <strong>{count}</strong>
            </div>
          )}
          {run.beat === "wrong" && <span className={css.shout}>Not that one!</span>}
          {run.beat === "bitten" && <span className={css.shout}>Caught! Start the word again.</span>}

          {result && !run.finished && (
            <div className={css.endOver}>
              <div className={css.overCard}>
                <strong className={css.overTitle}>Game over</strong>
                <p className={css.overSay}>
                  They caught you three times. {run.done} of {words.length} words spelled.
                </p>
                <div className={css.overButtons}>
                  {onReplay && (
                    <button type="button" className="kbtn small-btn" onClick={onReplay} autoFocus>
                      ↺ Try this level again
                    </button>
                  )}
                  {onQuit && (
                    <button type="button" className="kbtn ghost small-btn" onClick={onQuit}>
                      ← Practise an earlier level
                    </button>
                  )}
                </div>
                {error && <p className="kmuted small">{error}</p>}
              </div>
            </div>
          )}
          {result?.justMastered && (
            <span className={css.medalDrop} aria-hidden>
              <PixelSprite grid={medalGrid(level.id, frame)} scale={2} />
            </span>
          )}
          {result && run.finished && (
            <div className={css.endOver}>
              {(result.justMastered || result.stars >= 3) && <Fireworks big={!!result.justMastered} />}
              <StarPop stars={result.stars} from={result.justMastered ? 2000 : 600} />
              <EndChoices
                from={(result.justMastered ? 2000 : 600) + result.stars * 650 + 200}
                canNext={result.stars >= MOVE_ON_STARS || earned >= MOVE_ON_STARS}
                onNext={onNext}
                onReplay={onReplay}
              />
              {error && <p className="kmuted small">{error}</p>}
            </div>
          )}
        </div>

        {/* A thumb pad, because half of this is played on a phone. */}
        {ready && !done && (
          <div className={css.pad} aria-hidden={false}>
            <button type="button" className={`kbtn ${css.padKey} ${css.up}`} onClick={() => walk("u")} aria-label="Walk up">
              ▲
            </button>
            <button type="button" className={`kbtn ${css.padKey} ${css.left}`} onClick={() => walk("l")} aria-label="Walk left">
              ◀
            </button>
            <button type="button" className={`kbtn ${css.padKey} ${css.right}`} onClick={() => walk("r")} aria-label="Walk right">
              ▶
            </button>
            <button type="button" className={`kbtn ${css.padKey} ${css.down}`} onClick={() => walk("d")} aria-label="Walk down">
              ▼
            </button>
            <span className={css.padSay}>Arrow keys or WASD</span>
          </div>
        )}

        {busy && <p className="kmuted small">Saving your run…</p>}
        {!ready && count === null && (
          <p className="kmuted small">
            {crittersOn(level) > 0
              ? "Something lives in this clearing. Walk into one and the word starts again."
              : "Nothing in this clearing will bother you. Take your time."}
          </p>
        )}
      </div>
    </TeacherVoice>
  );
}
