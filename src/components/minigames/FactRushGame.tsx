"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, TeacherVoice } from "../voice";
import { avatarFor } from "@/content/avatars";
import { teacherFor } from "@/content/teachers";
import { GAME_COACH } from "@/lib/minigames/chompers";
import {
  type Answer,
  type FactLevel,
  type Seat,
  afterAnswer,
  blockGrid,
  cageGrid,
  cloudGrid,
  hillGrid,
  levelById,
  MAX_ASKS,
  openingPile,
  paceOf,
  pipeGrid,
  play,
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
const BRICK = blockGrid("brick");
const PRIZE = blockGrid("prize");
const PIPE = pipeGrid();
const CAGE = [cageGrid(false), cageGrid(true)];

export default function FactRushGame({ levelId, onFinish, stars, plays, hero, canAsk }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <FactRush level={level} onFinish={onFinish} earned={stars ?? 0} plays={plays ?? 0} hero={hero} canAsk={!!canAsk} /> : null;
}

const newSeed = () => Math.floor(Math.random() * 2 ** 31);

function FactRush({
  level,
  onFinish,
  hero,
  canAsk,
}: {
  level: FactLevel;
  onFinish: MiniGameUIProps["onFinish"];
  earned: number;
  plays: number;
  hero?: Hero;
  canAsk: boolean;
}) {
  const who = hero ?? DEFAULT_HERO;
  const runner = useMemo(() => [heroGrid(who, 0), heroGrid(who, 1)], [who]);
  const pet = useMemo(() => petGrid(who.pet, 0), [who.pet]);
  const coach = teacherFor(GAME_COACH);
  const coachLook = avatarFor(coach.id);

  const [seed] = useState(newSeed);
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [asking, setAsking] = useState(false);
  const [example, setExample] = useState<ReturnType<typeof workedCard> | null>(null);

  const [pile, setPile] = useState<Seat[]>(() => openingPile(level, seed));
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [typed, setTyped] = useState("");
  /** What just happened, for the hero to react to. */
  const [beat, setBeat] = useState<{ kind: "sprint" | "run" | "trot" | "trip"; show?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number; score?: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const asked = useRef<number>(Date.now());
  const sent = useRef(false);
  const live = useRef({ pile, answers });
  live.current = { pile, answers };

  const posts = postsOn(level);
  const card = pile[0] ? level.cards[pile[0].i] : null;
  const run = useMemo(() => play(level, { seed, answers }), [level, seed, answers]);
  const done = pile.length === 0 || answers.length >= MAX_ASKS;

  // The clock on a card starts the moment that card appears.
  useEffect(() => {
    asked.current = Date.now();
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
      const next = afterAnswer(cur, right);
      live.current = { pile: next, answers: [...got, { a: value, ms }] };
      setAnswers((xs) => [...xs, { a: value, ms }]);
      setPile(next);
      if (right) {
        chime(ms <= 2500 ? "streak" : "right");
        setBeat({ kind: paceOf(ms) });
      } else {
        chime("oops");
        setBeat({ kind: "trip", show: `${level.cards[head.i].text} = ${level.cards[head.i].answer}` });
      }
    },
    [level],
  );

  // The run is over: send it to be scored on the server.
  useEffect(() => {
    if (!done || !ready || sent.current) return;
    sent.current = true;
    setBusy(true);
    void (async () => {
      try {
        const r = await onFinish({ seed, answers });
        setResult({ stars: r.stars, xp: r.xp, score: r.score });
      } catch {
        setError("That run could not be saved. Check you are online.");
      } finally {
        setBusy(false);
      }
    })();
  }, [done, ready, onFinish, seed, answers]);

  // Typing works as well as tapping: a keyboard is faster, and speed is points.
  useEffect(() => {
    if (!ready || asking || done) return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key >= "0" && e.key <= "9") setTyped((t) => (t.length < 4 ? t + e.key : t));
      else if (e.key === "Backspace") setTyped((t) => t.slice(0, -1));
      else if (e.key === "Enter")
        setTyped((t) => {
          if (t.length) answer(Number(t));
          return t;
        });
      else return;
      e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, asking, done, answer]);

  // The reaction clears itself so the scene does not keep shouting.
  useEffect(() => {
    if (!beat) return;
    const t = setTimeout(() => setBeat(null), beat.kind === "trip" ? 1500 : 560);
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
          <h3 className="pixel-title">{run.finished ? "You got them out!" : "Out of cards"}</h3>
          <div className={css.rescued}>
            <PixelSprite grid={CAGE[1]} scale={2} />
            {pet && <PixelSprite grid={pet} scale={2} className={css.freed} />}
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
          </p>
          {result.xp > 0 && <p className="kmuted">+{result.xp} XP for new stars!</p>}
          {result.stars < 3 && <p className="kmuted small">A card answered inside two and a half seconds is a sprint, and a sprint is worth double.</p>}
          {error && <p className="kmuted small">{error}</p>}
        </div>
      </div>
    );
  }

  const at = posts > 0 ? Math.min(1, run.posts / posts) : 0;
  const stepping = beat && beat.kind !== "trip";

  return (
    <TeacherVoice kind={coachLook.voice}>
      <div className={`mg ${css.fr}`}>
        <div className="mg-hud">
          <span className="chip">⚡ {run.points}</span>
          <span className="chip">
            {run.posts} / {posts}
          </span>
          <span className="chip">✗ {run.wrong}</span>
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
          onReady={() => setCount(3)}
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
        <div className={css.scene} aria-label={`${run.posts} of ${posts} blocks run`}>
          <span className={css.cloudA}>
            <PixelSprite grid={CLOUD[0]} scale={1} />
          </span>
          <span className={css.cloudB}>
            <PixelSprite grid={CLOUD[1]} scale={1} />
          </span>
          <span className={css.hill}>
            <PixelSprite grid={HILL} scale={1} />
          </span>
          <span className={css.pipe}>
            <PixelSprite grid={PIPE} scale={1} />
          </span>
          {[0.3, 0.38, 0.62].map((p, i) => (
            <span key={p} className={css.block} style={{ left: `${p * 100}%` }}>
              <PixelSprite grid={i === 1 ? PRIZE : BRICK} scale={1} />
            </span>
          ))}

          <span className={css.cage}>
            <PixelSprite grid={CAGE[run.finished ? 1 : 0]} scale={1} />
            {pet && (
              <span className={`${css.caged} ${run.finished ? css.out : ""}`}>
                <PixelSprite grid={pet} scale={1} />
              </span>
            )}
          </span>

          <span
            className={`${css.runner} ${beat?.kind === "trip" ? css.trip : ""} ${stepping ? css.step : ""} ${beat?.kind === "sprint" ? css.sprint : ""}`}
            style={{ left: `calc(${at * 78}% + 6px)` }}
          >
            <PixelSprite grid={runner[stepping ? 1 : 0]} scale={1} />
          </span>

          <div className={css.ground} />

          {count !== null && (
            <div className={css.countOver} role="status" aria-live="assertive">
              <strong>{count}</strong>
            </div>
          )}
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

            <div className={css.pad}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button key={n} type="button" className={`kbtn ${css.key}`} onClick={() => setTyped((t) => (t.length < 4 ? t + n : t))}>
                  {n}
                </button>
              ))}
              <button type="button" className={`kbtn ghost ${css.key}`} onClick={() => setTyped((t) => t.slice(0, -1))} aria-label="Rub out">
                ⌫
              </button>
              <button type="button" className={`kbtn ${css.key}`} onClick={() => setTyped((t) => (t.length < 4 ? t + "0" : t))}>
                0
              </button>
              <button type="button" className={`kbtn ${css.key} ${css.go}`} onClick={() => typed.length && answer(Number(typed))} disabled={!typed.length} aria-label="Answer">
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
