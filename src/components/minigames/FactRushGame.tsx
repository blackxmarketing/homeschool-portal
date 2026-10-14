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
  fireballOn,
  fireballGrid,
  dragonGrid,
  hazardAt,
  hillGrid,
  holeGrid,
  CHASE_FROM,
  DRAGON_HITS,
  CREEP_PER_SEC,
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
import { unlockName } from "@/lib/pixel/cosmetics";
import DragonFight from "./DragonFight";
import TeacherBrief from "./TeacherBrief";
import type { MiniGameUIProps } from "./types";
import css from "./FactRushGame.module.css";

/** Built once: the scenery is the same on every level. */
const CLOUD = [cloudGrid(false), cloudGrid(true)];
const HILL = hillGrid();
const BEAST = [grumbleGrid("chaser", 0), grumbleGrid("chaser", 1)];
/** The dragon over the cage at the end of a dungeon, bigger than the cage. */
const DRAGON = [dragonGrid(0), dragonGrid(1)];
const CAGE = [cageGrid(false), cageGrid(true)];
const TORCH = [torchGrid(0), torchGrid(1)];
const STONE = stoneGrid();
const TOKEN = [tokenGrid(0), tokenGrid(1)];
const COIN = [fireballGrid(0), fireballGrid(1)];
const MOUNTAIN = mountainGrid();
const RIVER = riverGrid();
const HOLE = holeGrid();

/** How wide one block of the world is on screen. */
const BLOCK = 86;
/** How far from the left edge the camera keeps the runner. */
const CAMERA_AT = 0.3;
/**
 * How much screen one block of the gap is worth when drawing the hunter.
 *
 * Far less than a block is wide. A block is 86 pixels and only about 110 of
 * ground sits behind the runner, so at a block a block it was off the side of
 * the screen at any honest distance. At eighteen it is right behind them at a
 * gap of one or two, at the edge by five, and gone by nine.
 *
 * It is a straight multiple of the gap and nothing else, which is the point:
 * the hunter moves at its own speed. A kid who answers quickly pulls away and
 * leaves it behind, rather than having it keep pace just off the screen
 * because the drawing was squeezing the whole gap into the visible strip.
 */
const GAP_PX = 18;

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
  /** Fireballs thrown at the dragon, and whether it went down. */
  const [thrown, setThrown] = useState(0);
  const [dragonDown, setDragonDown] = useState(false);
  /** True while they are back on the cards because they ran out of fire. */
  const [reloading, setReloading] = useState(false);
  /** The dragon is still up and they have nothing left to throw at it. */
  const [outOfFire, setOutOfFire] = useState(false);
  /** They chose to stop and go and collect more fire somewhere else. */
  const [gaveUp, setGaveUp] = useState(false);
  /** The coach explains the fight before it starts, over the top of it. */
  const [fightOn, setFightOn] = useState(false);
  const [fightCount, setFightCount] = useState<number | null>(null);
  /**
   * Lives left in the fight.
   *
   * The dragon's fire costs one, but unlike everywhere else in the level it
   * does not send them back to the start - they pick themselves up and carry
   * on. Only running out of all three ends it, and then the pet stays caged.
   *
   * It is counted here rather than in the replay because the fight is the one
   * thing the browser runs. Nothing is earned by it: running out only ever
   * ends the run without the dragon beaten.
   */
  const [burns, setBurns] = useState(0);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [typed, setTyped] = useState("");
  /** What just happened, for the hero to react to. */
  const [beat, setBeat] = useState<{ kind: "sprint" | "run" | "trot" | "trip" | "grabbed" | "died"; show?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number; score?: number; level?: number; rank?: string; unlocked?: string[] } | null>(null);
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
  /** Ticks while something is walking towards them, so the screen can show it. */
  const [now, setNow] = useState(() => Date.now());
  /** The last step it was heard to take, so the growls are evenly spaced. */
  const lastGrowl = useRef(0);
  const asked = useRef<number>(Date.now());
  const sent = useRef(false);
  /** The answers so far, where a key handler or a timer can read them. */
  const live = useRef(answers);
  live.current = answers;

  const posts = postsOn(level);
  /** Which block they are standing on: how far along, in blocks. */
  const standing = (at: number) => at * posts;
  /**
   * How far short of the cage the running stops.
   *
   * In a dungeon the dragon is stood in front of the cage, and the finish
   * line used to be the cage itself - so a kid ran straight through the
   * dragon and only then found the fight starting. They pull up in front of
   * it now.
   */
  const SHORT = level.dungeon ? 210 : 0;
  const runnerX = (at: number) => standing(at) * BLOCK - SHORT * at;
  const run = useMemo(() => play(level, { seed, answers, pace, thrown, beat: dragonDown }, saved), [level, seed, answers, pace, saved, thrown, dragonDown]);
  const fightLives = Math.max(0, run.lives - burns);
  const fightLost = run.atDragon && !dragonDown && burns > 0 && fightLives <= 0;
  const card = run.head === null ? null : level.cards[run.head];
  /**
   * Where it has got to this instant.
   *
   * The run only knows where it was when the last card was answered. On hard
   * it has been walking ever since, so the screen works the rest out from the
   * clock - the same sum the server will do from the time on that answer.
   */
  const gap =
    run.chase === null ? null : pace === "hard" ? run.chase - (CREEP_PER_SEC * Math.max(0, now - asked.current)) / 1000 : run.chase;
  // Out of cards, out of lives, burned to nothing by the dragon, or out of
  // patience.
  const done = run.inPile === 0 || run.over || fightLost || gaveUp || answers.length >= MAX_ASKS;

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
  }, [run.head, answers.length]);

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
      const got = live.current;
      const showing = play(level, { seed, answers: got, pace }, saved).head;
      if (showing === null || got.length >= MAX_ASKS) return;
      const ms = Date.now() - asked.current;
      const right = level.cards[showing].answer === value;
      live.current = [...got, { a: value, ms }];
      setAnswers((xs) => [...xs, { a: value, ms }]);
      // What the answer was worth, and then what the monster made of it.
      const after = play(level, { seed, answers: live.current, pace }, saved);
      if (after.justDied) {
        // Three wrong cards, or the hunter had them: either way a life is
        // gone and they go back to the start of the level.
        chime(after.justCaught ? "caught" : "died");
        setBeat({
          kind: "died",
          show: after.justCaught ? "It got you! Back to the start." : "Three wrong - back to the start.",
        });
      } else if (after.justCaught) {
        // Caught, but food had made them big: the size went, not a life.
        chime("caught");
        setBeat({ kind: "grabbed", show: "It got you - but you were big. Keep going!" });
      } else if (right) {
        chime(ms <= 2500 ? "streak" : "right");
        setBeat({ kind: paceOf(ms) });
      } else {
        chime("oops");
        setBeat({ kind: "trip", show: `${level.cards[showing].text} = ${level.cards[showing].answer}` });
      }
      // A step of something large, somewhere behind them: when it arrives,
      // and whenever it has gained ground. On hard the ticker growls as well,
      // because there it is walking the whole time rather than only on cards.
      const was = play(level, { seed, answers: got, pace }, saved).chase;
      const arrived = was === null && after.chase !== null;
      const closed = was !== null && after.chase !== null && after.chase < was;
      if (!after.justCaught && (arrived || closed)) chime("growl");
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
        const r = await onFinish({ seed, answers, pace, thrown, beat: dragonDown });
        setResult({ stars: r.stars, xp: r.xp, score: r.score, level: r.level, rank: r.rank, unlocked: r.unlocked });
      } catch {
        setError("That run could not be saved. Check you are online.");
      } finally {
        setBusy(false);
      }
    })();
  }, [done, ready, onFinish, seed, answers, pace, thrown, dragonDown]);

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

  /**
   * On hard it never stops, so neither does this: it walks on while the kid
   * thinks, growls as it steps, and if it reaches them mid-think that is
   * recorded as time passing with nothing answered - which the server replays
   * exactly the same way.
   */
  useEffect(() => {
    if (pace !== "hard" || !ready || asking || done || count !== null) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (run.inPile === 0) return;
      const since = t - asked.current;
      const where = run.chase === null ? null : run.chase - (CREEP_PER_SEC * since) / 1000;
      if (where === null) return;
      // A step every so often, so a kid hears it coming without being deafened.
      if (t - lastGrowl.current > 1100) {
        lastGrowl.current = t;
        chime("growl");
      }
      if (where <= 0) {
        // It got them while they were thinking. Time passed; no card was
        // answered; the run works out the rest.
        const ms = since;
        live.current = [...live.current, { a: null, ms }];
        setAnswers((xs) => [...xs, { a: null, ms }]);
        asked.current = Date.now();
        chime("caught");
        setBeat({ kind: "grabbed", show: "It got you! Back to the start." });
      }
    }, 220);
    return () => clearInterval(id);
  }, [pace, ready, asking, done, count, run.chase]);

  /** Three, two, one into the fight, same as into the level. */
  useEffect(() => {
    if (fightCount === null) return;
    if (fightCount === 0) {
      setFightCount(null);
      setFightOn(true);
      return;
    }
    const t = setTimeout(() => setFightCount((c) => (c === null ? null : c - 1)), 700);
    return () => clearTimeout(t);
  }, [fightCount]);

  // Enough fire to go back at it.
  useEffect(() => {
    if (reloading && saved + run.fireballs - thrown > 0) {
      setReloading(false);
      setOutOfFire(false);
    }
  }, [reloading, saved, run.fireballs, thrown]);

  // The reaction clears itself so the scene does not keep shouting.
  useEffect(() => {
    if (!beat) return;
    const t = setTimeout(() => setBeat(null), beat.kind === "died" ? 2000 : beat.kind === "grabbed" ? 1800 : beat.kind === "trip" ? 1500 : 560);
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
          <h3 className="pixel-title">
            {run.finished ? "You got them out!" : run.over ? "Out of lives" : fightLost ? "The dragon won" : gaveUp ? "Out of fireballs" : "Out of cards"}
          </h3>
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
            {run.posts} blocks run, {run.wrong} missed. {result.score ?? run.points} points.
            {run.over || fightLost ? " Your pet is still in there - have another go." : ""}
            {gaveUp ? " Beat a level you have not three-starred yet, or come back and answer more cards here." : ""}
          </p>
          {result.xp > 0 ? (
            <p className="kmuted">+{result.xp} XP for new stars!</p>
          ) : (
            <p className="kmuted small">No XP this time - you already had these stars. New stars on a level you have not beaten yet are what pay.</p>
          )}
          {result.level && (
            <p className={css.levelUp}>
              Level {result.level} - you are {/^[AEIOU]/.test(result.rank ?? "") ? "an" : "a"} {result.rank}!
              {result.unlocked?.length ? ` You unlocked ${result.unlocked.map(unlockName).join(" and ")} - go and put it on.` : ""}
            </p>
          )}
          {result.stars < 3 && <p className="kmuted small">A card answered inside two and a half seconds is a sprint, and a sprint is worth double.</p>}
          {error && <p className="kmuted small">{error}</p>}
        </div>
      </div>
    );
  }

  const at = posts > 0 ? Math.min(1, run.posts / posts) : 0;
  const stepping = beat && beat.kind !== "trip" && beat.kind !== "grabbed" && beat.kind !== "died";

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
          <span className="chip" aria-label={`${saved + run.fireballs - thrown} fireballs`}>
            🔥 {Math.max(0, saved + run.fireballs - thrown)}
          </span>
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
        {/* Once they are at the dragon the run is over and the pit takes the
            screen, so a kid is not looking at two scenes at once. */}
        {!(level.dungeon && run.atDragon) && (
        <>
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
              left: shot === "cage" ? `calc(66% - ${posts * BLOCK}px)` : `calc(${CAMERA_AT * 100}% - ${runnerX(run.at)}px)`,
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
              const coin = fireballOn(i) && ahead;
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

            {/* The cage, at the last block - and in a dungeon, the one who
                has the pet, standing over it with a price. */}
            <span className={css.cage} style={{ left: `${posts * BLOCK}px`, bottom: `${(biome.rise ?? 0) * posts + 43}px` }}>
              <PixelSprite grid={cagedPetGrid(pet, run.finished)} scale={5} />
            </span>
            {level.dungeon && !run.finished && (
              <span className={css.keeper} style={{ left: `${posts * BLOCK - 126}px`, bottom: `${(biome.rise ?? 0) * posts + 43}px` }}>
                <span className={css.price}>🔥 {DRAGON_HITS[pace]}</span>
                <PixelSprite grid={DRAGON[Math.floor(now / 620) % 2]} scale={4} />
              </span>
            )}

            <span
              className={`${css.runner} ${biome.swim ? css.swimming : ""} ${run.big ? css.grown : ""} ${beat?.kind === "trip" ? css.trip : ""} ${
                beat?.kind === "grabbed" ? css.grabbed : ""
              } ${beat?.kind === "died" ? css.died : ""} ${stepping ? css.step : ""} ${beat?.kind === "sprint" ? css.sprint : ""}`}
              style={{ left: `${runnerX(run.at)}px`, bottom: `${(biome.rise ?? 0) * standing(run.at) + 43}px` }}
            >
              <PixelSprite grid={runner[stepping ? 1 : 0]} scale={run.big ? 7 : 5} />
            </span>
          </div>

          {/* Whatever is after them.

              It is drawn against the camera rather than against the ground,
              because the gap is measured in blocks and a block is wider than
              the ground you can see behind the runner - so at any honest
              distance it sat off the left of the screen and a kid never saw
              the thing that was catching them. Here it comes in from the edge
              and closes on them as the gap closes, which is the same
              information in a place they can see it. */}
          {gap !== null && (
            <span
              className={`${css.beast} ${gap <= 2 ? css.close : ""}`}
              style={{ left: `calc(${CAMERA_AT * 100}% - ${Math.max(0, gap) * GAP_PX}px)` }}
            >
              <PixelSprite grid={BEAST[Math.floor(now / 260) % 2]} scale={5} />
            </span>
          )}

          <span className={css.where}>{biome.name}</span>

          {count !== null && (
            <div className={css.countOver} role="status" aria-live="assertive">
              <strong>{count}</strong>
            </div>
          )}
          {shot === "cage" && <span className={css.shout}>Go and get them!</span>}
          {beat?.kind === "sprint" && <span className={css.shout}>Sprint!</span>}
        </div>
        </>
        )}

        {ready && level.dungeon && run.atDragon && !dragonDown && !reloading && (
          <div className={css.fightWrap}>
            <DragonFight
              pace={pace}
              ammo={Math.max(0, saved + run.fireballs - thrown)}
              lives={fightLives}
              paused={!fightOn}
              hero={runner[0]}
              pet={pet}
              onThrow={() => setThrown((t) => t + 1)}
              onHurt={() => setBurns((b) => b + 1)}
              onOutOfFire={() => setOutOfFire(true)}
              onWon={(t) => {
                setThrown(t);
                setDragonDown(true);
              }}
            />
            {outOfFire && (
              <div className={css.fightBrief}>
                <div className={css.outOfFire}>
                  <strong className={css.outTitle}>Out of fireballs!</strong>
                  <p className={css.outSay}>
                    The dragon is still standing and you have nothing left to throw. Every card you get right is another fireball - so you can
                    make more here, or go back and stock up on the levels you have already beaten.
                  </p>
                  <div className={css.outButtons}>
                    <button
                      type="button"
                      className="kbtn small-btn"
                      onClick={() => {
                        setOutOfFire(false);
                        setReloading(true);
                      }}
                    >
                      Answer more cards here
                    </button>
                    <button type="button" className="kbtn ghost small-btn" onClick={() => setGaveUp(true)}>
                      Go back and collect more
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!fightOn && !outOfFire && (
              <div className={css.fightBrief}>
                {fightCount === null ? (
                  <TeacherBrief
                    teacher={coach}
                    directions={`The dragon has your pet and will not hand them over. Every card you got right is a fireball: you have ${Math.max(0, saved + run.fireballs - thrown)}. Space throws one. Arrows walk you about, Up jumps, Down ducks - it breathes fire back. ${DRAGON_HITS[pace]} hits and it is done.`}
                    rule={level.title}
                    levelId={level.id}
                    board={0}
                    seed={seed}
                    canAsk={canAsk}
                    stage="brief"
                    onReady={() => {
                      speak("fight-count", "Three. Two. One. Go!", { kind: coachLook.voice });
                      setFightCount(3);
                    }}
                    onAsking={setAsking}
                    onExample={showExample}
                  />
                ) : (
                  <div className={css.fightCount} role="status" aria-live="assertive">
                    <strong>{fightCount}</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {ready && card && (!level.dungeon || !run.atDragon || reloading) && (
          <>
            <div className={css.cardRow}>
              <strong className={css.card}>{card.text}</strong>
              <span className={css.equals}>=</span>
              <output className={`${css.slot} ${beat?.kind === "trip" ? css.slotBad : ""}`} aria-live="polite">
                {typed || "?"}
              </output>
            </div>
            <p className={`${css.teach} ${beat?.show ? css.teachOn : ""}`}>{beat?.show ?? " "}</p>
            {reloading ? (
              <p className={css.owed}>Out of fire! Every card you get right is another fireball for the dragon.</p>
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
