"use client";

import { useMemo, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { heroGrid, HAIRS, type Hero } from "@/lib/pixel/hero";
import type { Grid } from "@/lib/pixel/grid";
import {
  CUTS,
  MAX_TRIES,
  checkAnswer,
  cutWorks,
  decimalOf,
  levelById,
  mixed,
  parseNumber,
  pizzaGrid,
  plateGrid,
  reduce,
  scoreRound,
  shareOf,
  simplestCut,
  type AnswerTry,
  type PizzaLevel,
  type RoundMove,
  type RoundResult,
} from "@/lib/minigames/pizza";
import type { MiniGameUIProps } from "./types";
import css from "./PizzaGame.module.css";

const NAMES = ["Ava", "Ben", "Cal", "Dot", "Eli", "Fay", "Gus", "Hal", "Ivy", "Jon", "Kit", "Max"];

function friend(i: number): Hero {
  return { skin: (i * 5 + 1) % 6, hair: HAIRS[(i * 7 + 2) % HAIRS.length], hairColor: (i * 3 + 1) % 8, outfit: (i * 5 + 3) % 8, hat: "none", pet: "none" };
}

/** Pizza sprites are reused a lot, so they're cached. */
const cache = new Map<string, Grid>();
function pizza(cut: number, present: number, size = 26, ghost = true): Grid {
  const key = `${cut}-${present}-${size}-${ghost}`;
  let g = cache.get(key);
  if (!g) cache.set(key, (g = pizzaGrid(cut, present, size, ghost)));
  return g;
}
const PLATE = plateGrid(22);

const frac = (n: number, d: number) => `${n}/${d}`;

type Phase = "cut" | "deal" | "name" | "report";

export default function PizzaGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <PizzaParty level={level} onFinish={onFinish} /> : null;
}

function PizzaParty({ level, onFinish }: { level: PizzaLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const [ri, setRi] = useState(0);
  const [phase, setPhase] = useState<Phase>("cut");
  const [cut, setCut] = useState(0);
  const [cutNote, setCutNote] = useState("");
  const [left, setLeft] = useState<number[]>([]);
  const [plates, setPlates] = useState<number[]>([]);
  const [held, setHeld] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerTry[]>([]);
  const [fracIn, setFracIn] = useState("");
  const [decIn, setDecIn] = useState("");
  const [answerNote, setAnswerNote] = useState("");
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [report, setReport] = useState<RoundResult | null>(null);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const round = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const { pizzas: P, friends: F } = round;
  const share = shareOf(round);
  const each = cut ? (P * cut) / F : 0;
  const slicesLeft = left.reduce((s, n) => s + n, 0);
  const fair = phase !== "cut" && slicesLeft === 0 && plates.every((n) => n === each);
  const points = moves.reduce((s, m, i) => s + scoreRound(level, level.rounds[i], m).points, 0);
  const sprout = level.band === "sprout";
  const pizzaScale = P <= 3 ? 4 : P <= 6 ? 3 : 2;

  function chooseCut(c: number) {
    const total = P * c;
    if (!cutWorks(round, c)) {
      const q = Math.floor(total / F);
      setCutNote(
        `${P} pizza${P > 1 ? "s" : ""} × ${c} slices = ${total} slices. ${total} ÷ ${F} friends = ${q} each with ${total - q * F} left over, so it isn't fair. Try another cut!`,
      );
      chime("oops");
      return;
    }
    setCut(c);
    setCutNote("");
    setLeft(Array(P).fill(c));
    setPlates(Array(F).fill(0));
    setHeld(null);
    setPhase("deal");
  }

  function pick(i: number) {
    if (left[i] > 0) setHeld(held === i ? null : i);
  }

  function tapPlate(p: number) {
    if (held !== null && left[held] > 0) {
      const l = [...left];
      l[held]--;
      setLeft(l);
      setPlates((ps) => ps.map((n, j) => (j === p ? n + 1 : n)));
      setHeld(l[held] > 0 ? held : null);
      return;
    }
    // Nothing in hand: take a slice back from this plate.
    if (plates[p] > 0) {
      const back = left.findIndex((n) => n < cut);
      if (back < 0) return;
      setLeft((l) => l.map((n, j) => (j === back ? n + 1 : n)));
      setPlates((ps) => ps.map((n, j) => (j === p ? n - 1 : n)));
    }
  }

  function dealOneEach() {
    const l = [...left];
    const ps = [...plates];
    for (let p = 0; p < F; p++) {
      const from = l.findIndex((n) => n > 0);
      if (from < 0) break;
      l[from]--;
      ps[p]++;
    }
    setLeft(l);
    setPlates(ps);
    setHeld(null);
  }

  function restartDeal() {
    setLeft(Array(P).fill(cut));
    setPlates(Array(F).fill(0));
    setHeld(null);
  }

  function changeCut() {
    setPhase("cut");
    setCut(0);
    setLeft([]);
    setPlates([]);
    setHeld(null);
  }

  function serve() {
    if (!fair) return;
    chime("right");
    setPhase("name");
    setAnswers([]);
    setFracIn("");
    setDecIn("");
    setAnswerNote("");
  }

  function finishRound(tries: AnswerTry[]) {
    const move: RoundMove = { cut, plates: [...plates], answers: tries };
    const nextMoves = [...moves, move];
    setMoves(nextMoves);
    setReport(scoreRound(level, round, move));
    setPhase("report");
  }

  function submitAnswer() {
    if (!fracIn.trim()) return;
    const t: AnswerTry = level.challenge ? { fraction: fracIn.trim(), decimal: decIn.trim() } : { fraction: fracIn.trim() };
    const tries = [...answers, t];
    setAnswers(tries);
    const c = checkAnswer(level, round, t);
    if (c.correct) {
      chime("right");
      const p = parseNumber(t.fraction);
      const v = p ? reduce(p.value) : share;
      const unsimplified = p && (p.form === "fraction" || p.form === "mixed") && !p.simplest;
      setAnswerNote(unsimplified ? `Yes! ${t.fraction} is the same amount as ${mixed(v)}.` : "Yes!");
      finishRound(tries);
      return;
    }
    chime("oops");
    if (tries.length >= MAX_TRIES) {
      setAnswerNote(`${c.note} The share was ${mixed(share)}${level.challenge ? ` ≈ ${decimalOf(share, 2)}` : ""}.`);
      finishRound(tries);
      return;
    }
    setAnswerNote(c.note);
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setPhase("cut");
      setCut(0);
      setLeft([]);
      setPlates([]);
      setReport(null);
      setAnswerNote("");
      setCutNote("");
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

  const tableLabel = `${P} pizza${P > 1 ? "s" : ""} for ${F} friends`;

  if (done) {
    const max = level.rounds.length * 3;
    return (
      <div className={`mg ${css.pizza}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Party over!</h2>
          <p>
            You scored <strong>{points}</strong> of {max} pizza points.
          </p>
          {busy && <p className="kmuted">Counting the crusts…</p>}
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
              {result.stars < 3 && (
                <p className="kmuted small">Tip: the simplest cut is the fewest slices that still share evenly. Pizzas × slices must divide by the number of friends.</p>
              )}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => {
              const r = level.rounds[i];
              return (
                <span key={i}>
                  {r.pizzas}÷{r.friends} = {mixed(shareOf(r))} {"🍕".repeat(scoreRound(level, r, m).points)}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mg ${css.pizza}`}>
      <div className="mg-hud">
        <span className="chip">
          🍕 Party {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points} pts</span>
        <span className="chip">{tableLabel}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / (level.rounds.length * 3)) * 100}%` }} />
      </div>

      <div className={css.table}>
        <div className={css.pizzas} aria-label={phase === "cut" ? `${P} whole pizzas` : `${slicesLeft} slices left to hand out`}>
          {Array.from({ length: P }, (_, i) => {
            const present = phase === "cut" ? 1 : left[i];
            const g = phase === "cut" ? pizza(1, 1) : pizza(cut, present);
            const canPick = phase === "deal" && left[i] > 0;
            return (
              <button
                key={i}
                type="button"
                className={`${css.pie} ${held === i ? css.held : ""}`}
                onClick={() => pick(i)}
                disabled={!canPick}
                aria-label={phase === "deal" ? `Pizza ${i + 1}: ${left[i]} slices left. Tap to pick up a slice.` : `Pizza ${i + 1}`}
              >
                <PixelSprite grid={g} scale={pizzaScale} />
              </button>
            );
          })}
        </div>

        <div className={css.friends}>
          {Array.from({ length: F }, (_, p) => {
            const n = plates[p] ?? 0;
            const whole = cut ? Math.floor(n / cut) : 0;
            const part = cut ? n % cut : 0;
            const target = phase === "deal" && held !== null;
            return (
              <button
                key={p}
                type="button"
                className={`${css.seat} ${target ? css.target : ""} ${phase !== "cut" && slicesLeft === 0 && n !== each ? css.uneven : ""}`}
                onClick={() => tapPlate(p)}
                disabled={phase !== "deal"}
                aria-label={`${NAMES[p]}'s plate: ${n} slices`}
              >
                <PixelSprite grid={heroGrid(friend(p))} scale={2} />
                <span className={css.name}>{NAMES[p]}</span>
                <span className={css.plate}>
                  <PixelSprite grid={PLATE} scale={4} className={css.plateImg} />
                  <span className={css.share}>
                    {Array.from({ length: Math.min(whole, 2) }, (_, k) => (
                      <PixelSprite key={k} grid={pizza(cut, cut, 16)} scale={2} />
                    ))}
                    {whole > 2 && <b>+{whole - 2}</b>}
                    {part > 0 && <PixelSprite grid={pizza(cut, part, 16)} scale={2} />}
                  </span>
                </span>
                {phase !== "cut" && <span className={css.count}>{n} slice{n === 1 ? "" : "s"}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {phase === "cut" && (
        <div className="mg-controls">
          <p className={css.ask}>
            <strong>{tableLabel}.</strong> Cut every pizza into how many equal slices?
          </p>
          <div className={css.cuts}>
            {CUTS.map((c) => (
              <button key={c} type="button" className="kbtn game-btn" onClick={() => chooseCut(c)}>
                {c}
                <span className={css.cutSub}>{c === 2 ? "halves" : c === 3 ? "thirds" : c === 4 ? "fourths" : c === 6 ? "sixths" : c === 8 ? "eighths" : "twelfths"}</span>
              </button>
            ))}
          </div>
          {cutNote && <div className="day-report bad">{cutNote}</div>}
          {!sprout && !cutNote && <p className="kmuted small">Hint: pizzas × slices has to divide evenly by {F}.</p>}
        </div>
      )}

      {phase === "deal" && (
        <div className="mg-controls">
          <p className={css.ask}>
            {held !== null ? (
              <>Now tap a plate to give the slice to a friend.</>
            ) : slicesLeft > 0 ? (
              <>
                Tap a pizza to pick up a slice, then tap a plate. <span className="kmuted">({slicesLeft} slices to hand out)</span>
              </>
            ) : fair ? (
              <>Everyone has {each} slices and nothing is left over. Fair!</>
            ) : (
              <>Not fair yet: plates have {plates.join(", ")}. With nothing in your hand, tap a plate to take a slice back.</>
            )}
          </p>
          <div className={css.row}>
            <button type="button" className="kbtn game-btn" onClick={dealOneEach} disabled={slicesLeft === 0}>
              Deal one each
            </button>
            <button type="button" className="kbtn" onClick={restartDeal}>
              Start over
            </button>
            <button type="button" className="kbtn" onClick={changeCut}>
              Change cut
            </button>
          </div>
          <button type="button" className="kbtn big game-btn" onClick={serve} disabled={!fair}>
            Serve the pizza 🍕
          </button>
        </div>
      )}

      {phase === "name" && (
        <form
          className="mg-controls"
          onSubmit={(e) => {
            e.preventDefault();
            submitAnswer();
          }}
        >
          <p className={css.ask}>
            Each friend got <strong>{each}</strong> slice{each === 1 ? "" : "s"}, and each slice is <strong>{frac(1, cut)}</strong> of a pizza. How much pizza did each friend get?
          </p>
          {(sprout || answers.length > 0) && (
            <p className="kmuted small">
              {each} slices × {frac(1, cut)} = {frac(each, cut)}
              {each > cut ? `, and ${cut} slices make a whole pizza.` : "."}
              {level.band !== "sprout" && each > cut ? " Mixed numbers like 1 2/3 work too." : ""}
            </p>
          )}
          <div className={css.inputs}>
            <label>
              {level.challenge ? "Simplest form" : "Fraction of a pizza"}
              <input value={fracIn} onChange={(e) => setFracIn(e.target.value)} placeholder="like 3/4 or 1 2/3" inputMode="text" autoComplete="off" maxLength={20} className={css.answer} />
            </label>
            {level.challenge && (
              <label>
                As a decimal
                <input value={decIn} onChange={(e) => setDecIn(e.target.value)} placeholder="like 0.75" inputMode="decimal" autoComplete="off" maxLength={20} className={css.answer} />
              </label>
            )}
          </div>
          {answerNote && <div className="day-report bad">{answerNote}</div>}
          <button type="submit" className="kbtn big game-btn" disabled={!fracIn.trim()}>
            Check ✓ <span className={css.tryNo}>(try {answers.length + 1} of {MAX_TRIES})</span>
          </button>
        </form>
      )}

      {phase === "report" && report && (
        <div className="mg-controls">
          <div className={`day-report ${report.points === 3 ? "good" : "bad"}`}>
            <strong>{answerNote}</strong>
            <div className="math-line">
              {P} pizzas ÷ {F} friends = {frac(P, F)}
              {mixed(share) !== frac(P, F) ? ` = ${mixed(share)}` : ""}
              {level.challenge ? ` ≈ ${decimalOf(share, 3)}` : ""} of a pizza each
            </div>
            <div className="math-line">
              You cut into {cut}: {each} × {frac(1, cut)} = {frac(each, cut)} = {mixed({ n: each, d: cut })}
            </div>
            <div className="kmuted small">
              {report.simplest
                ? `Simplest cut! ${cut} slices is the fewest that shares ${P} pizza${P > 1 ? "s" : ""} evenly among ${F}.`
                : (() => {
                    const s = simplestCut(round)!;
                    const e2 = (P * s) / F;
                    return `Fair share, but cutting into ${s} would work with fewer slices: ${e2} × ${frac(1, s)} = ${frac(e2, s)}. ${frac(each, cut)} and ${frac(e2, s)} are equivalent fractions: the same amount of pizza!`;
                  })()}
            </div>
            <div className="small">
              Round points: {"🍕".repeat(report.points)} ({report.points}/3: fair share{report.rightOn >= 0 && report.rightOn < level.freeTries ? ", named it" : ""}
              {report.simplest ? ", simplest cut" : ""})
            </div>
          </div>
          <button type="button" className="kbtn big game-btn" onClick={next}>
            {ri + 1 < level.rounds.length ? "Next party ➜" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
