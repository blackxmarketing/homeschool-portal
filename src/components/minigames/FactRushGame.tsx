"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, TeacherVoice } from "../voice";
import { avatarFor } from "@/content/avatars";
import { teacherFor } from "@/content/teachers";
import { GAME_COACH, grumbleGrid } from "@/lib/minigames/chompers";
import {
  type Answer,
  type Hazard,
  type FactLevel,
  type Seat,
  afterAnswer,
  cageGrid,
  cagedPetGrid,
  type Pace,
  PACES,
  biomeFor,
  cloudGrid,
  DUNGEON_PRICE,
  coinOn,
  coinPieceGrid,
  hazardAt,
  hillGrid,
  holeGrid,
  LIVES,
  mountainGrid,
  levelById,
  MAX_ASKS,
  needOf,
  openingPile,
  paceOf,
  play,
  propGrid,
  ridgeGrid,
  riverGrid,
  STRIKES,
  tokenGrid,
  tokenOn,
  stoneGrid,
  torchGrid,
  postsOn,
  workedCard,
} from "@/lib/minigames/factrush";
import { heroGrid, petGrid, DEFAULT_HERO, type Hero } from "@/lib/pixel/hero";
import TeacherBrief from "./TeacherBrief";
import type { MiniGameUIProps } from "./types";
import css from "./FactRushGame.module.css";

/** Built once: the scenery is the same on every level. */
const CLOUD = [cloudGrid(false), cloudGrid(true)];
const HILL = hillGrid();
const BEAST = [grumbleGrid("chaser", 0), grumbleGrid("chaser", 1)];
const CAGE = [cageGrid(false), cageGrid(true)];
const TORCH = [torchGrid(0), torchGrid(1)];
const STONE = stoneGrid();
const TOKEN = [tokenGrid(0), tokenGrid(1)];
const COIN = [coinPieceGrid(0), coinPieceGrid(1)];
const MOUNTAIN = mountainGrid();
const RIVER = riverGrid();
const HOLE = holeGrid();

/** How wide one block of the world is on screen. */
const BLOCK = 86;
/** How far from the left edge the camera keeps the runner. */
const CAMERA_AT = 0.3;

const HAZARD_ART: Record<Hazard, ReturnType<typeof holeGrid>> = { hole: HOLE, river: RIVER, mountain: MOUNTAIN };

export default function FactRushGame({ levelId, onFinish, stars, plays, hero, coins, canAsk }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <FactRush level={level} onFinish={onFinish} earned={stars ?? 0} plays={plays ?? 0} hero={hero} saved={coins ?? 0} canAsk={!!canAsk} /> : null;
}

const newSeed = () => Math.floor(Math.random() * 2 ** 31);

function FactRush({
  level,
  onFinish,
  hero,
  saved,
  canAsk,
}: {
  level: FactLevel;
  onFinish: MiniGameUIProps["onFinish"];
  earned: number;
  plays: number;
  hero?: Hero;
  /** Coins carried in from the levels before this one. */
  saved: number;
  canAsk: boolean;
}) {
  const who = hero ?? DEFAULT_HERO;
  const runner = useMemo(() => [heroGrid(who, 0), heroGrid(who, 1)], [who]);
  const pet = useMemo(() => petGrid(who.pet, 0), [who.pet]);
  const coach = teacherFor(GAME_COACH);
  const coachLook = avatarFor(coach.id);

  const [seed] = useState(newSeed);
  const [ready, setReady] = useState(false);
  /**
   * Where the camera is looking. It opens on the cage at the far end so a kid
   * can see who they are running for, then sweeps back to the start line.
   */
  const [shot, setShot] = useState<"cage" | "start">("cage");
  /** Easy has nothing chasing them; hard wants them to keep moving. */
  const [pace, setPace] = useState<Pace>("medium");
  /** Where this level happens. Fixed per level, so it is always theirs. */
  const biome = useMemo(() => biomeFor(level), [level]);
  const [count, setCount] = useState<number | null>(null);
  const [asking, setAsking] = useState(false);
  const [example, setExample] = useState<ReturnType<typeof workedCard> | null>(null);

  const [pile, setPile] = useState<Seat[]>(() => openingPile(level, seed));
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [typed, setTyped] = useState("");
  /** What just happened, for the hero to react to. */
  const [beat, setBeat] = useState<{ kind: "sprint" | "run" | "trot" | "trip" | "grabbed"; show?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number; score?: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * What is typed, where a key handler can read it.
   *
   * It used to answer from inside a setState updater. React runs those twice
   * over in development, so one press of Enter answered two cards - the
   * second one with the same number against the next question, which came
   * straight back as a miss in red. Updaters have to stay pure.
   */
  const typedRef = useRef("");
  const asked = useRef<number>(Date.now());
  const sent = useRef(false);
  const live = useRef({ pile, answers });
  live.current = { pile, answers };

  const posts = postsOn(level);
  /** Which block they are standing on: how far along, in blocks. */
  const standing = (at: number) => at * posts;
  const card = pile[0] ? level.cards[pile[0].i] : null;
  const run = useMemo(() => play(level, { seed, answers, pace }, saved), [level, seed, answers, pace, saved]);
  // Out of cards, out of lives, or out of patience.
  const done = pile.length === 0 || run.over || answers.length >= MAX_ASKS;

  /**
   * The ref is what is typed; the state only draws it.
   *
   * A kid who presses Enter in the same instant as the last digit would
   * otherwise lose that digit, because the digit's setState has not committed
   * yet and the key handler would read the old value. Writing the ref first
   * means the answer is never a render behind the keys.
   */
  const type = useCallback((next: (cur: string) => string) => {
    typedRef.current = next(typedRef.current).slice(0, 4);
    setTyped(typedRef.current);
  }, []);

  // The clock on a card starts the moment that card appears.
  useEffect(() => {
    asked.current = Date.now();
    typedRef.current = "";
    setTyped("");
  }, [pile]);

  /** Three, two, one, in the coach's voice - same as the other XP Rush. */
  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      setCount(null);
      setReady(true);
      asked.current = Date.now();
      return;
    }
    const t = setTimeout(() => setCount((c) => (c === null ? null : c - 1)), 700);
    return () => clearTimeout(t);
  }, [count]);

  const answer = useCallback(
    (value: number) => {
      const { pile: cur, answers: got } = live.current;
      const head = cur[0];
      if (!head || got.length >= MAX_ASKS) return;
      const ms = Date.now() - asked.current;
      const right = level.cards[head.i].answer === value;
      const next = afterAnswer(cur, right, needOf(level));
      live.current = { pile: next, answers: [...got, { a: value, ms }] };
      setAnswers((xs) => [...xs, { a: value, ms }]);
      setPile(next);
      // What the answer was worth, and then what the monster made of it.
      const after = play(level, { seed, answers: [...got, { a: value, ms }], pace }, saved);
      if (after.justCaught) {
        chime("caught");
        setBeat({ kind: "grabbed", show: "It got you! Back to the start." });
      } else if (right) {
        chime(ms <= 2500 ? "streak" : "right");
        setBeat({ kind: paceOf(ms) });
      } else {
        chime("oops");
        setBeat({ kind: "trip", show: `${level.cards[head.i].text} = ${level.cards[head.i].answer}` });
      }
      // A step of something large, somewhere behind them.
      if (after.chase !== null && !after.justCaught) chime("growl");
    },
    [level, seed, pace, saved],
  );

  // The run is over: send it to be scored on the server.
  useEffect(() => {
    if (!done || !ready || sent.current) return;
    sent.current = true;
    setBusy(true);
    void (async () => {
      try {
        const r = await onFinish({ seed, answers, pace });
        setResult({ stars: r.stars, xp: r.xp, score: r.score });
      } catch {
        setError("That run could not be saved. Check you are online.");
      } finally {
        setBusy(false);
      }
    })();
  }, [done, ready, onFinish, seed, answers, pace]);

  // Typing works as well as tapping: a keyboard is faster, and speed is points.
  useEffect(() => {
    if (!ready || asking || done) return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key >= "0" && e.key <= "9") type((t) => t + e.key);
      else if (e.key === "Backspace") type((t) => t.slice(0, -1));
      else if (e.key === "Enter" || e.key === " ") {
        if (typedRef.current.length) answer(Number(typedRef.current));
      } else return;
      e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, asking, done, answer, type]);

  // The reaction clears itself so the scene does not keep shouting.
  useEffect(() => {
    if (!beat) return;
    const t = setTimeout(() => setBeat(null), beat.kind === "grabbed" ? 1800 : beat.kind === "trip" ? 1500 : 560);
    return () => clearTimeout(t);
  }, [beat]);

  function showExample() {
    const ex = workedCard(level);
    setExample(ex);
    speak("fr-example", ex.say, { kind: coachLook.voice });
  }

  if (result) {
    return (
      <div className={`mg ${css.fr}`}>
        <div className="mg-result">
          <h3 className="pixel-title">{run.finished ? "You got them out!" : run.over ? "Out of lives" : "Out of cards"}</h3>
          <div className={css.rescued}>
            <PixelSprite grid={cagedPetGrid(pet, true)} scale={3} className={css.freed} />
          </div>
          <div className="mg-stars" aria-label={`${result.stars} stars`}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={`star ${result.stars >= n ? "lit" : ""}`}>
                ★
              </span>
            ))}
          </div>
          <p className="kmuted">
            {run.posts} blocks run, {run.wrong} missed. {result.score ?? run.points} points.{run.over ? " Your pet is still in there - have another go." : ""}
          </p>
          {result.xp > 0 && <p className="kmuted">+{result.xp} XP for new stars!</p>}
          {result.stars < 3 && <p className="kmuted small">A card answered inside two and a half seconds is a sprint, and a sprint is worth double.</p>}
          {error && <p className="kmuted small">{error}</p>}
        </div>
      </div>
    );
  }

  const at = posts > 0 ? Math.min(1, run.posts / posts) : 0;
  const stepping = beat && beat.kind !== "trip" && beat.kind !== "grabbed";

  return (
    <TeacherVoice kind={coachLook.voice}>
      <div className={`mg ${css.fr}`}>
        <div className="mg-hud">
          <span className="chip">⚡ {run.points}</span>
          <span className="chip" aria-label={`${Math.round(run.at * posts)} of ${posts} blocks`}>
            {Math.round(run.at * posts)} / {posts}
          </span>
          <span className={`chip ${css.lives}`} aria-label={`${run.lives} lives left`}>
            {Array.from({ length: LIVES }, (_, i) => (
              <span key={i} className={i < run.lives ? css.life : css.lifeGone} aria-hidden>
                ♥
              </span>
            ))}
          </span>
          <span className="chip" aria-label={`${STRIKES - run.strikes} mistakes before a life goes`}>
            ✗ {run.strikes} / {STRIKES}
          </span>
          <span className="chip" aria-label={`${saved + run.coins} coins`}>
            🪙 {saved + run.coins}
          </span>
          {level.dungeon && (
            <span className={`chip ${run.owed > 0 ? css.owing : ""}`}>{run.owed > 0 ? `Wants ${run.owed}` : "Paid!"}</span>
          )}
          {run.big && <span className="chip">🍎 Big!</span>}
        </div>

        <TeacherBrief
          teacher={coach}
          directions={level.intro}
          rule={level.title}
          levelId={level.id}
          board={0}
          seed={seed}
          canAsk={canAsk}
          stage={ready ? "play" : "brief"}
          extra={
            <div className={css.paces} role="group" aria-label="How hard do you want it?">
              {PACES.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`chip ${css.pace} ${pace === p ? css.paceOn : ""}`}
                  onClick={() => setPace(p)}
                  aria-pressed={pace === p}
                >
                  {p === "easy" ? "🙂 Easy" : p === "medium" ? "😬 Medium" : "😱 Hard"}
                </button>
              ))}
              <span className="kmuted small">
                {pace === "easy" ? "Nothing chasing you." : pace === "medium" ? "Something chases you, but only a wrong answer lets it close in." : "Keep moving - slow answers let it close in too."}
              </span>
            </div>
          }
          onReady={() => {
            // Sweep back from the cage to the start, then count them in.
            setShot("start");
            window.setTimeout(() => setCount(3), 1200);
          }}
          onAsking={setAsking}
          onExample={showExample}
          example={
            example && (
              <div className={css.example}>
                <strong className={css.exampleCard}>
                  {example.card.text} = {example.card.answer}
                </strong>
                <p className={css.exampleSay}>{example.say}</p>
              </div>
            )
          }
        />

        {/* The level: your pet is in the cage at the far end, and every card
            you get right is another block closer to them. */}
        {/* The level, seen through a camera that keeps the runner big and a
            third of the way in. It opens looking at the cage so a kid sees who
            they are running for, then sweeps back to the start. Every family
            gets its own place to run it in. */}
        <div
          className={`${css.scene} ${biome.dark ? css.night : ""}`}
          style={{ background: `linear-gradient(180deg, ${biome.sky[0]} 0%, ${biome.sky[1]} 78%)` }}
          aria-label={`${biome.name}: ${run.posts} of ${posts} blocks`}
        >
          <div
            className={`${css.world} ${shot === "cage" ? css.sweeping : ""}`}
            style={{
              width: `${(posts + 3) * BLOCK}px`,
              left: shot === "cage" ? `calc(58% - ${posts * BLOCK}px)` : `calc(${CAMERA_AT * 100}% - ${standing(run.at) * BLOCK}px)`,
              // On a level that climbs, the camera has to climb with it -
              // and during the opening shot it is looking at the cage, which
              // is at the top.
              bottom: biome.rise ? `${-(shot === "cage" ? posts : standing(run.at)) * biome.rise}px` : undefined,
            }}
          >
            {/* The floor, which climbs on a level that climbs. Under the sea
                there is only the seabed, far below them. */}
            {Array.from({ length: posts + 3 }, (_, i) => (
              <span
                key={i}
                className={css.sod}
                style={{
                  left: `${i * BLOCK}px`,
                  bottom: `${(biome.rise ?? 0) * i}px`,
                  background: biome.ground,
                  borderTopColor: biome.swim ? "transparent" : undefined,
                  boxShadow: `inset 0 -12px 0 ${biome.under}`,
                  opacity: biome.swim ? 0.55 : 1,
                }}
              />
            ))}

            {/* The ridge along the back. */}
            {[1, 7, 13, 19, 25].map((i) => (
              <span key={i} className={css.ridge} style={{ left: `${i * BLOCK}px`, bottom: `${(biome.rise ?? 0) * i + 40}px` }}>
                <PixelSprite grid={ridgeGrid(biome.far, !!biome.rise)} scale={3} />
              </span>
            ))}

            {/* What grows, stands or glows beside the track. */}
            {Array.from({ length: posts + 2 }, (_, i) => {
              if (i % 3 !== 1) return null;
              return (
                <span key={`p${i}`} className={css.prop} style={{ left: `${i * BLOCK + 10}px`, bottom: `${(biome.rise ?? 0) * i + 44}px` }}>
                  <PixelSprite grid={propGrid(biome.prop, biome.propInk[0], biome.propInk[1])} scale={3} />
                </span>
              );
            })}

            {biome.clouds &&
              [2, 9, 17, 24].map((i) => (
                <span key={`c${i}`} className={i % 2 ? css.cloudA : css.cloudB} style={{ left: `${i * BLOCK}px` }}>
                  <PixelSprite grid={CLOUD[i % 2]} scale={3} />
                </span>
              ))}

            {/* What is in the way, and what is worth picking up. */}
            {Array.from({ length: posts + 1 }, (_, i) => {
              const h = biome.swim ? null : hazardAt(i);
              const ahead = standing(run.at) < i;
              const token = tokenOn(i) && ahead;
              const coin = coinOn(i) && ahead;
              if (!h && !token && !coin) return null;
              return (
                <span key={`h${i}`} className={css.at} style={{ left: `${i * BLOCK}px`, bottom: `${(biome.rise ?? 0) * i + 46}px` }}>
                  {h && (
                    <span className={h === "hole" ? css.hole : h === "river" ? css.river : css.mountain}>
                      <PixelSprite grid={HAZARD_ART[h]} scale={3} />
                    </span>
                  )}
                  {token && (
                    <span className={css.token}>
                      <PixelSprite grid={TOKEN[beat ? 1 : 0]} scale={3} />
                    </span>
                  )}
                  {coin && (
                    <span className={css.coin}>
                      <PixelSprite grid={COIN[beat ? 1 : 0]} scale={3} />
                    </span>
                  )}
                </span>
              );
            })}

            {/* The cage, at the last block. */}
            <span className={css.cage} style={{ left: `${posts * BLOCK}px`, bottom: `${(biome.rise ?? 0) * posts + 43}px` }}>
              <PixelSprite grid={cagedPetGrid(pet, run.finished)} scale={5} />
            </span>

            {/* Whatever is after them, however far back it still is. */}
            {run.chase !== null && (
              <span
                className={`${css.beast} ${run.chase <= 2 ? css.close : ""}`}
                style={{
                  left: `${(standing(run.at) - run.chase) * BLOCK}px`,
                  bottom: `${(biome.rise ?? 0) * Math.max(0, standing(run.at) - run.chase) + 43}px`,
                }}
              >
                <PixelSprite grid={BEAST[stepping ? 1 : 0]} scale={5} />
              </span>
            )}

            <span
              className={`${css.runner} ${biome.swim ? css.swimming : ""} ${run.big ? css.grown : ""} ${beat?.kind === "trip" ? css.trip : ""} ${
                beat?.kind === "grabbed" ? css.grabbed : ""
              } ${stepping ? css.step : ""} ${beat?.kind === "sprint" ? css.sprint : ""}`}
              style={{ left: `${standing(run.at) * BLOCK}px`, bottom: `${(biome.rise ?? 0) * standing(run.at) + 43}px` }}
            >
              <PixelSprite grid={runner[stepping ? 1 : 0]} scale={run.big ? 7 : 5} />
            </span>
          </div>

          <span className={css.where}>{biome.name}</span>

          {count !== null && (
            <div className={css.countOver} role="status" aria-live="assertive">
              <strong>{count}</strong>
            </div>
          )}
          {shot === "cage" && <span className={css.shout}>Go and get them!</span>}
          {beat?.kind === "sprint" && <span className={css.shout}>Sprint!</span>}
        </div>

        {ready && card && (
          <>
            <div className={css.cardRow}>
              <strong className={css.card}>{card.text}</strong>
              <span className={css.equals}>=</span>
              <output className={`${css.slot} ${beat?.kind === "trip" ? css.slotBad : ""}`} aria-live="polite">
                {typed || "?"}
              </output>
            </div>
            <p className={`${css.teach} ${beat?.show ? css.teachOn : ""}`}>{beat?.show ?? " "}</p>
            {run.paying ? (
              <p className={css.owed}>
                The monster has your pet and wants {DUNGEON_PRICE} coins. You are {run.owed} short - every card you get right is a coin.
              </p>
            ) : (
              <p className={css.hint}>Type the answer and press Enter or the space bar - quicker than tapping.</p>
            )}

            <div className={css.pad}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button key={n} type="button" className={`kbtn ${css.key}`} onClick={() => type((t) => t + n)}>
                  {n}
                </button>
              ))}
              <button type="button" className={`kbtn ghost ${css.key}`} onClick={() => type((t) => t.slice(0, -1))} aria-label="Rub out">
                ⌫
              </button>
              <button type="button" className={`kbtn ${css.key}`} onClick={() => type((t) => t + "0")}>
                0
              </button>
              <button type="button" className={`kbtn ${css.key} ${css.go}`} onClick={() => typedRef.current.length && answer(Number(typedRef.current))} disabled={!typed.length} aria-label="Answer">
                Go
              </button>
            </div>
          </>
        )}

        {busy && <p className="kmuted small">Saving your run…</p>}
      </div>
    </TeacherVoice>
  );
}
