"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useTeacherVoice, useVoiceSettings } from "../voice";
import {
  MAX_TRIES,
  fliesOf,
  flyGrid,
  frogGrid,
  goalOf,
  hintFor,
  hopAllowed,
  hopLabel,
  levelById,
  padGrid,
  parOf,
  playRound,
  problemOf,
  promptFor,
  scoreRound,
  sentence,
  startOf,
  teachFor,
  type Act,
  type HopLevel,
  type HopRound,
  type RoundMove,
} from "@/lib/minigames/numberhop";
import type { MiniGameUIProps } from "./types";
import css from "./NumberHopGame.module.css";

const FROG = [frogGrid(0), frogGrid(1)];
const FLY = [flyGrid(0), flyGrid(1)];
const PAD = padGrid(20);

export default function NumberHopGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <NumberHop level={level} onFinish={onFinish} /> : null;
}

/** Where a number sits on the line, as a % of the width (leaves room for the frog at the ends). */
const pctOf = (r: HopRound, n: number) => 8 + (84 * (n - r.lo)) / (r.hi - r.lo);

function scaleOf(r: HopRound): { label: number; tick: number } {
  const span = r.hi - r.lo;
  if (span <= 20) return { label: 1, tick: 1 };
  if (span <= 50) return { label: 5, tick: 1 };
  if (span <= 100) return { label: 10, tick: 1 };
  if (span <= 200) return { label: 20, tick: 5 };
  return { label: 100, tick: 10 };
}

/** The little problem card: "36 + 23 = ?", "7 + ? = 12", "Count by 5s". */
function cardFor(r: HopRound): string {
  if (r.kind === "math") return `${problemOf(r)} = ?`;
  if (r.kind === "fly") {
    const d = r.target - r.start;
    return `${r.start} ${d > 0 ? "+" : "−"} ? = ${r.target}`;
  }
  return `Count by ${r.by}s`;
}

type Phase = "play" | "solved";

function NumberHop({ level, onFinish }: { level: HopLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const { speakOn } = useVoiceSettings();
  const voice = useTeacherVoice();
  const [ri, setRi] = useState(0);
  const r = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const [acts, setActs] = useState<Act[]>([]);
  const [phase, setPhase] = useState<Phase>("play");
  const [note, setNote] = useState<{ text: string; good: boolean } | null>(null);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [jump, setJump] = useState(2);
  const [leap, setLeap] = useState(0); // counts hops, restarts the leap animation
  const [leaping, setLeaping] = useState(false);
  const [buzz, setBuzz] = useState(0);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const say = useCallback(
    (id: string, text: string) => {
      if (speakOn && text) speak(id, text, { kind: voice });
    },
    [speakOn, voice],
  );

  // The fly buzzes.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setBuzz((b) => 1 - b), 220);
    return () => clearInterval(t);
  }, []);

  // Read each round aloud when it starts.
  const started = useRef(-1);
  useEffect(() => {
    if (started.current === ri || done) return;
    started.current = ri;
    say(`hop-${ri}`, promptFor(level, r));
  }, [ri, r, level, say, done]);

  const play = useMemo(() => playRound(level, r, acts), [level, r, acts]);
  const par = useMemo(() => parOf(level, r), [level, r]);
  const flies = useMemo(() => fliesOf(r), [r]);
  const start = startOf(r);
  const goal = goalOf(r);
  const revealed = r.kind !== "math" || play.misses >= MAX_TRIES || phase === "solved";

  const points = moves.reduce((s, m, i) => s + scoreRound(level, level.rounds[i], m).points, 0);
  const max = level.rounds.length * 3;

  function finishRound(all: Act[]) {
    const res = scoreRound(level, r, { acts: all });
    setMoves((m) => [...m, { acts: all }]);
    setPhase("solved");
    chime(res.points === 3 ? "streak" : "right");
    const text = `${res.points === 3 ? "Yum! " : "Got it! "}${teachFor(level, r, res.hops)}`;
    setNote({ text, good: true });
    say(`hop-teach-${ri}`, text);
  }

  function hop(d: number) {
    if (phase !== "play") return;
    const next = [...acts, d];
    const p = playRound(level, r, next);
    if (p.hops.length === play.hops.length) return; // off the line or not allowed
    setActs(next);
    setLeap((n) => n + 1);
    setLeaping(true);
    setTimeout(() => setLeaping(false), 320);
    if (note && !note.good) setNote(null);
    if (p.solved) return finishRound(next);
    if (r.kind === "skip" && p.eaten.length > play.eaten.length) chime("right");
    if (level.sayHops) say("hop-n", String(p.pos));
  }

  function catchFly() {
    if (phase !== "play" || r.kind !== "math") return;
    const next: Act[] = [...acts, "catch"];
    const p = playRound(level, r, next);
    setActs(next);
    if (p.solved) return finishRound(next);
    chime("oops");
    const text = hintFor(level, r, p.pos, p.misses);
    setNote({ text, good: false });
    say(`hop-hint-${ri}-${p.misses}`, text);
  }

  async function nextRound() {
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setActs([]);
      setPhase("play");
      setNote(null);
      return;
    }
    setDone(true);
    setBusy(true);
    try {
      const res = await onFinish(moves);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
      say("hop-end", res.stars === 3 ? "Three stars! You are a super hopper!" : "Great hopping! Play again to earn more stars.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`mg ${css.hop}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Pond cleared!</h2>
          <p className={css.big}>
            🪰 {points} of {max} points
          </p>
          {busy && <p className="kmuted">Counting the flies…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: use big hops for the tens and small hops for the ones. Fewer hops earn more stars.</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => {
              const rr = level.rounds[i];
              const res = scoreRound(level, rr, m);
              return (
                <span key={i}>
                  {rr.kind === "skip" ? `By ${rr.by}s to ${rr.end}` : rr.kind === "math" ? `${problemOf(rr)} = ${goalOf(rr)}` : `${rr.start} → ${rr.target}`} · {res.hops.length} hops{" "}
                  {res.points === 3 ? "⭐" : res.points === 2 ? "👍" : "🌱"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const prompt = promptFor(level, r);
  const { label, tick } = scaleOf(r);
  const labels: number[] = [];
  for (let n = Math.ceil(r.lo / label) * label; n <= r.hi; n += label) labels.push(n);
  const ticks: number[] = [];
  for (let n = Math.ceil(r.lo / tick) * tick; n <= r.hi; n += tick) ticks.push(n);
  const smallPads = r.hi - r.lo <= 20;
  // Hop arcs (the last 12), drawn from the replayed path.
  const path: number[] = [start];
  for (const d of play.hops) path.push(path[path.length - 1] + d);
  const arcs = path.slice(1).map((to, i) => ({ from: path[i], to })).slice(-12);
  const back = r.hops.filter((d) => d < 0).sort((a, b) => a - b);
  const fwd = r.hops.filter((d) => d > 0).sort((a, b) => a - b);
  const fits = (d: number) => play.pos + d >= r.lo && play.pos + d <= r.hi && hopAllowed(level, r, d);

  return (
    <div className={`mg ${css.hop}`}>
      <div className="mg-hud">
        <span className="chip">
          🐸 {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={css.prompt}>
        <SayButton id={`hop-say-${ri}`} text={prompt} />
        <p>{prompt}</p>
      </div>

      <div className={css.card} aria-label="The problem">
        {phase === "solved" && r.kind !== "skip" ? (r.kind === "math" ? `${problemOf(r)} = ${goal}` : `${r.start} ${goal > r.start ? "+" : "−"} ${Math.abs(goal - r.start)} = ${goal}`) : cardFor(r)}
      </div>

      {/* The pond and its number line */}
      <div className={css.pond} role="img" aria-label={`Number line from ${r.lo} to ${r.hi}. Frog is on ${play.pos}.${revealed && r.kind !== "skip" ? ` The fly is on ${goal}.` : ""}`}>
        <svg className={css.arcs} viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
          {arcs.map((a, i) => {
            const x1 = pctOf(r, a.from);
            const x2 = pctOf(r, a.to);
            const h = Math.min(30, 6 + Math.abs(x2 - x1) * 0.9);
            return <path key={`${i}-${a.from}-${a.to}`} d={`M ${x1} 38 Q ${(x1 + x2) / 2} ${38 - 2 * h} ${x2} 38`} className={a.to > a.from ? css.arcF : css.arcB} vectorEffect="non-scaling-stroke" />;
          })}
        </svg>

        {smallPads
          ? ticks.map((n) => (
              <span key={n} className={css.miniPad} style={{ left: `${pctOf(r, n)}%` }} />
            ))
          : labels.map((n) => (
              <span key={n} className={css.pad} style={{ left: `${pctOf(r, n)}%` }}>
                <PixelSprite grid={PAD} scale={1.5} />
              </span>
            ))}

        {/* Flies */}
        {r.kind === "skip"
          ? flies
              .filter((f) => !play.eaten.includes(f))
              .map((f) => (
                <span key={f} className={css.fly} style={{ left: `${pctOf(r, f)}%` }}>
                  <PixelSprite grid={FLY[buzz]} scale={2} />
                </span>
              ))
          : revealed &&
            phase !== "solved" && (
              <span className={`${css.fly} ${css.bigFly}`} style={{ left: `${pctOf(r, goal)}%` }}>
                <PixelSprite grid={FLY[buzz]} scale={3} />
              </span>
            )}

        {/* The frog */}
        <span className={css.frog} style={{ left: `${pctOf(r, play.pos)}%` }}>
          <span key={leap} className={leap ? css.leap : ""}>
            <span className={css.num}>{play.pos}</span>
            <PixelSprite grid={FROG[leaping ? 1 : 0]} scale={3} />
          </span>
        </span>

        <svg className={css.line} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
          <line x1="2" x2="98" y1="2" y2="2" vectorEffect="non-scaling-stroke" />
          {ticks.map((n) => (
            <line key={n} x1={pctOf(r, n)} x2={pctOf(r, n)} y1="2" y2={n % label === 0 ? 9 : 5} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className={css.labels} aria-hidden>
          {labels.map((n) => (
            <span key={n} className={`${n === start ? css.here : ""} ${smallPads && n % 5 !== 0 ? css.thin : ""} ${smallPads && n % 2 === 1 && n % 5 !== 0 ? css.odd : ""}`} style={{ left: `${pctOf(r, n)}%` }}>
              {n}
            </span>
          ))}
        </div>
      </div>

      <p className={css.sentence}>
        <span>{sentence(start, play.hops)}</span>
        <span className={`${css.count} ${play.hops.length > par ? css.over : ""}`}>
          {play.hops.length} {play.hops.length === 1 ? "hop" : "hops"} · fewest {par}
        </span>
      </p>

      {phase === "play" && (
        <div className={css.controls}>
          <div className={css.hopRow}>
            {back.map((d) => (
              <button key={d} type="button" className={`kbtn ${css.hopBtn} ${css.backBtn}`} onClick={() => hop(d)} disabled={!fits(d)} aria-label={`Hop back ${-d}`}>
                {hopLabel(d)}
              </button>
            ))}
            {fwd.map((d) => (
              <button key={d} type="button" className={`kbtn game-btn ${css.hopBtn}`} onClick={() => hop(d)} disabled={!fits(d)} aria-label={`Hop forward ${d}`}>
                {hopLabel(d)}
              </button>
            ))}
          </div>

          {level.jump > 0 && (
            <div className={css.jumpRow} role="group" aria-label="Set a jump">
              <button type="button" className={`kbtn ${css.step}`} onClick={() => setJump((j) => Math.max(1, j - 1))} aria-label="Smaller jump">
                −
              </button>
              <span className={css.jumpSize} aria-live="polite">
                Jump {jump}
              </span>
              <button type="button" className={`kbtn ${css.step}`} onClick={() => setJump((j) => Math.min(level.jump, j + 1))} aria-label="Bigger jump">
                +
              </button>
              <button type="button" className={`kbtn ${css.hopBtn} ${css.backBtn}`} onClick={() => hop(-jump)} disabled={!fits(-jump)} aria-label={`Jump back ${jump}`}>
                ⬅ {jump}
              </button>
              <button type="button" className={`kbtn game-btn ${css.hopBtn}`} onClick={() => hop(jump)} disabled={!fits(jump)} aria-label={`Jump forward ${jump}`}>
                {jump} ➡
              </button>
            </div>
          )}

          {r.kind === "math" && (
            <button type="button" className={`kbtn big game-btn ${css.catch}`} onClick={catchFly}>
              👅 Catch on {play.pos}!
            </button>
          )}
        </div>
      )}

      {note && (
        <div className={`day-report ${note.good ? "good" : "bad"} ${css.note}`}>
          <SayButton id={`hop-note-${ri}-${play.misses}`} text={note.text} />
          <span>{note.text}</span>
        </div>
      )}

      {phase === "solved" && (
        <button type="button" className="kbtn big game-btn" onClick={nextRound}>
          {ri + 1 < level.rounds.length ? "Next ➜" : "Finish 🎉"}
        </button>
      )}
    </div>
  );
}
