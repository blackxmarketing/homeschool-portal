"use client";

import { useMemo, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, SayButton, useAutoRead } from "../voice";
import {
  COUNT_TRIES,
  MAX_KINDS,
  countRight,
  kindsIn,
  levelById,
  moreKinds,
  scoreRound,
  spriteFor,
  SPRITE_NAMES,
  trayOrder,
  type CountRound,
  type CountTry,
  type HabitatLevel,
  type NeedsRound,
  type Pic,
  type RoundMove,
  type SortRound,
} from "@/lib/minigames/habitat";
import type { MiniGameUIProps } from "./types";
import css from "./HabitatGame.module.css";

/** A sprite (pixel art) or an emoji. */
function Picture({ pic, scale = 3, em = 2 }: { pic: Pic; scale?: number; em?: number }) {
  const g = spriteFor(pic);
  if (g) return <PixelSprite grid={g} scale={g.w < 16 ? Math.round(scale * 1.25) : scale} />;
  return (
    <span className={css.emoji} style={{ fontSize: `${em}rem` }} aria-hidden>
      {pic}
    </span>
  );
}

const Stars = ({ n }: { n: number }) => <span aria-label={`${n} of 2 points`}>{n > 0 ? "🌟".repeat(n) : "🌱"}</span>;

export default function HabitatGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <HabitatRescue level={level} onFinish={onFinish} /> : null;
}

interface Note {
  text: string;
  good: boolean;
  n: number;
}

function HabitatRescue({ level, onFinish }: { level: HabitatLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const [ri, setRi] = useState(0);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [picks, setPicks] = useState<string[]>([]);
  const [drops, setDrops] = useState<[string, string][]>([]);
  const [tries, setTries] = useState<CountTry[]>([]);
  const [held, setHeld] = useState<string | null>(null);
  const [counts, setCounts] = useState<[number, number]>([0, 0]);
  const [note, setNote] = useState<Note | null>(null);
  const [roundOver, setRoundOver] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);

  const round = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const tray = useMemo(() => trayOrder(level, ri), [level, ri]);
  const points = moves.reduce((s, m, i) => s + scoreRound(level.rounds[i], m).points, 0);
  const max = level.rounds.length * 2;
  const thisRound = roundOver ? scoreRound(round, moves[ri]) : null;

  // Everything is read aloud: the round's prompt, then each piece of feedback.
  useAutoRead(note ? `hab-note-${note.n}` : `hab-${level.id}-${ri}`, done ? null : note ? note.text : round.prompt);

  const say = (text: string, good: boolean) => setNote((n) => ({ text, good, n: (n?.n ?? 0) + 1 }));

  function endRound(move: RoundMove, lastText: string, good: boolean) {
    setMoves((m) => [...m, move]);
    setRoundOver(true);
    setHeld(null);
    say(`${lastText} ${round.done}`, good);
  }

  // ---------- needs ----------
  function give(r: NeedsRound, id: string) {
    if (roundOver || picks.includes(id)) return;
    const next = [...picks, id];
    setPicks(next);
    const need = r.needs.find((n) => n.id === id);
    if (need) {
      chime("right");
      const given = r.needs.filter((n) => next.includes(n.id)).length;
      if (given === r.needs.length) endRound({ picks: next }, `Yes! ${need.why}`, true);
      else say(`Yes! ${need.why}`, true);
      return;
    }
    const extra = r.extras.find((x) => x.id === id);
    chime("oops");
    say(`Not that one. ${extra?.why ?? ""} Try again!`, false);
  }

  // ---------- sort ----------
  function drop(r: SortRound, pid: string, bid: string) {
    if (roundOver) return;
    const piece = r.pieces.find((x) => x.id === pid);
    const bin = r.bins.find((b) => b.id === bid);
    if (!piece || !bin) return;
    const next: [string, string][] = [...drops, [pid, bid]];
    setDrops(next);
    if (piece.bin === bid) {
      chime("right");
      setHeld(null);
      const placed = new Set(next.filter(([x, b]) => r.pieces.find((q) => q.id === x)?.bin === b).map(([x]) => x));
      if (placed.size === r.pieces.length) endRound({ drops: next }, `Yes! ${piece.why}`, true);
      else say(`Yes! ${piece.why}`, true);
      return;
    }
    chime("oops");
    say(`Not the ${bin.label.toLowerCase()}. ${piece.why} Try again!`, false);
  }

  // ---------- count ----------
  function check(r: CountRound, more: number) {
    if (roundOver) return;
    const t: CountTry = { a: counts[0], b: counts[1], more };
    const next = [...tries, t];
    setTries(next);
    const [A, B] = r.places;
    if (countRight(r, t)) {
      chime("right");
      endRound({ tries: next }, "Yes!", true);
      return;
    }
    chime("oops");
    if (next.length >= COUNT_TRIES) {
      setCounts([kindsIn(A), kindsIn(B)]);
      endRound({ tries: next }, `Let's count together. The ${A.label.toLowerCase()} has ${kindsIn(A)} kinds and the ${B.label.toLowerCase()} has ${kindsIn(B)} kinds.`, false);
      return;
    }
    say(countHint(r, t), false);
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setPicks([]);
      setDrops([]);
      setTries([]);
      setCounts([0, 0]);
      setHeld(null);
      setNote(null);
      setRoundOver(false);
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

  if (done) {
    return (
      <div className={`mg ${css.hab}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Rescue done!</h2>
          <p>
            You earned <strong>{points}</strong> of {max} rescue points.
          </p>
          {busy && <p className="kmuted">Checking on the animals…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: listen to the why after each try. Getting it right the first time earns the most stars.</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => (
              <span key={i}>
                {i + 1}. <Stars n={scoreRound(level.rounds[i], m).points} />
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mg ${css.hab}`}>
      <div className="mg-hud">
        <span className="chip">
          🦔 Rescue {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">🌟 {points}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <p className={css.ask}>
        {round.prompt}
        <SayButton id={`hab-say-${level.id}-${ri}`} text={round.prompt} />
      </p>

      {round.kind === "needs" && <NeedsScene r={round} tray={tray} picks={picks} over={roundOver} onGive={(id) => give(round, id)} />}
      {round.kind === "sort" && (
        <SortScene r={round} tray={tray} drops={drops} held={held} over={roundOver} onHold={setHeld} onDrop={(pid, bid) => drop(round, pid, bid)} />
      )}
      {round.kind === "count" && (
        <CountScene r={round} counts={counts} over={roundOver} tries={tries.length} onCount={setCounts} onCheck={(more) => check(round, more)} />
      )}

      {note && (
        <div className={`day-report ${note.good ? "good" : "bad"} ${css.note}`} role="status">
          <span>{note.text}</span>
          <SayButton id={`hab-note-say-${note.n}`} text={note.text} />
        </div>
      )}

      {roundOver && thisRound && (
        <div className={css.next}>
          <span className={css.pts}>
            <Stars n={thisRound.points} /> {thisRound.points === 2 ? "First try!" : thisRound.points === 1 ? "Nice fix!" : "You did it!"}
          </span>
          <button type="button" className="kbtn big game-btn" onClick={next}>
            {ri + 1 < level.rounds.length ? "Next ➜" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}

const clamp = (n: number) => Math.max(0, Math.min(MAX_KINDS, n));

function countHint(r: CountRound, t: CountTry): string {
  const [A, B] = r.places;
  const hintFor = (p: typeof A, n: number) => {
    if (n === p.things.length && p.things.length !== kindsIn(p))
      return `You counted every living thing in the ${p.label.toLowerCase()}. Count each KIND only once: two of the same animal are 1 kind.`;
    return n < kindsIn(p) ? `Look again at the ${p.label.toLowerCase()}. There are more kinds than ${n}.` : `Look again at the ${p.label.toLowerCase()}. There are fewer kinds than ${n}. Don't count the same kind twice!`;
  };
  if (t.a !== kindsIn(A)) return hintFor(A, t.a);
  if (t.b !== kindsIn(B)) return hintFor(B, t.b);
  return `Your counts are right! Which is more: ${t.a} or ${t.b}? Tap that habitat.`;
}

// ---------------- Scenes ----------------

function NeedsScene({ r, tray, picks, over, onGive }: { r: NeedsRound; tray: { id: string; pic: Pic; label: string }[]; picks: string[]; over: boolean; onGive: (id: string) => void }) {
  const given = r.needs.filter((n) => picks.includes(n.id));
  const happy = given.length === r.needs.length;
  return (
    <>
      <div className={`${css.scene} ${happy ? css.happy : ""}`}>
        <div className={css.patient}>
          <PixelSprite grid={spriteFor(r.who)!} scale={6} title={r.name} />
          <span className={css.name}>{r.name}</span>
        </div>
        <div className={css.given} aria-label={`Given: ${given.map((g) => g.label).join(", ") || "nothing yet"}`}>
          {r.needs.map((n) => (
            <span key={n.id} className={`${css.slot} ${picks.includes(n.id) ? css.filled : ""}`}>
              {picks.includes(n.id) ? <Picture pic={n.pic} scale={2} em={1.4} /> : "?"}
            </span>
          ))}
        </div>
        {happy && <span className={css.hearts} aria-hidden>💚</span>}
      </div>
      <div className={css.tray}>
        {tray.map((it) => {
          const used = picks.includes(it.id);
          const right = used && r.needs.some((n) => n.id === it.id);
          return (
            <button
              key={it.id}
              type="button"
              className={`${css.item} ${right ? css.right : used ? css.wrong : ""}`}
              disabled={used || over}
              onClick={() => onGive(it.id)}
              aria-label={`${it.label}${right ? ", given" : used ? ", not needed" : ""}`}
            >
              <Picture pic={it.pic} scale={3} em={2} />
              <span className={css.label}>{it.label}</span>
              {right && <span className={css.badge}>✓</span>}
              {used && !right && <span className={css.badge}>✗</span>}
            </button>
          );
        })}
      </div>
    </>
  );
}

function SortScene({
  r,
  tray,
  drops,
  held,
  over,
  onHold,
  onDrop,
}: {
  r: SortRound;
  tray: { id: string; pic: Pic; label: string }[];
  drops: [string, string][];
  held: string | null;
  over: boolean;
  onHold: (id: string | null) => void;
  onDrop: (pid: string, bid: string) => void;
}) {
  const placed = new Map<string, string>();
  for (const [pid, bid] of drops) if (r.pieces.find((x) => x.id === pid)?.bin === bid) placed.set(pid, bid);
  const tried = new Set(drops.map(([p, b]) => `${p}|${b}`));
  const left = tray.filter((x) => !placed.has(x.id));
  const heldPiece = r.pieces.find((x) => x.id === held);
  return (
    <>
      <div className={css.bins} style={{ gridTemplateColumns: `repeat(${r.bins.length <= 3 ? r.bins.length : 3}, minmax(0, 1fr))` }}>
        {r.bins.map((b) => {
          const inBin = r.pieces.filter((x) => placed.get(x.id) === b.id);
          const nope = held !== null && tried.has(`${held}|${b.id}`);
          return (
            <button
              key={b.id}
              type="button"
              className={`${css.bin} ${held && !nope ? css.target : ""} ${nope ? css.nope : ""}`}
              disabled={over || !held || nope}
              onClick={() => held && onDrop(held, b.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const pid = e.dataTransfer.getData("text/plain");
                if (pid) onDrop(pid, b.id);
              }}
              aria-label={`${b.label}${heldPiece ? `: put the ${heldPiece.label} here` : ""}. Holds ${inBin.map((x) => x.label).join(", ") || "nothing yet"}.`}
            >
              <span className={css.binHead}>
                <Picture pic={b.pic} scale={3} em={1.6} />
                <span className={css.binLabel}>{b.label}</span>
              </span>
              <span className={css.binItems}>
                {inBin.map((x) => (
                  <Picture key={x.id} pic={x.pic} scale={2} em={1.2} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
      {left.length > 0 && (
        <>
          <p className={css.hint}>{held ? "Now tap where it goes." : "Tap one to pick it up."}</p>
          <div className={css.tray}>
            {left.map((x) => (
              <button
                key={x.id}
                type="button"
                draggable={!over}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", x.id);
                  onHold(x.id);
                }}
                className={`${css.item} ${held === x.id ? css.held : ""}`}
                disabled={over}
                onClick={() => onHold(held === x.id ? null : x.id)}
                aria-pressed={held === x.id}
                aria-label={`${x.label}${held === x.id ? ", picked up" : ""}`}
              >
                <Picture pic={x.pic} scale={3} em={2} />
                <span className={css.label}>{x.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function CountScene({
  r,
  counts,
  over,
  tries,
  onCount,
  onCheck,
}: {
  r: CountRound;
  counts: [number, number];
  over: boolean;
  tries: number;
  onCount: (f: (c: [number, number]) => [number, number]) => void;
  onCheck: (more: number) => void;
}) {
  const ready = counts[0] > 0 && counts[1] > 0;
  const winner = over ? moreKinds(r) : -1;
  return (
    <>
      <div className={css.places}>
        {r.places.map((pl, i) => {
          const bump = (d: number) => onCount((c) => (i === 0 ? [clamp(c[0] + d), c[1]] : [c[0], clamp(c[1] + d)]));
          return (
            <div key={pl.label} className={`${css.place} ${css[`pl${i}`]} ${winner === i ? css.win : ""}`}>
              <div className={css.placeHead}>
                <span aria-hidden>{pl.pic}</span> {pl.label}
              </div>
              <div className={css.things} role="img" aria-label={`${pl.label}: ${pl.things.map((t) => SPRITE_NAMES[t] ?? t).join(", ")}`}>
                {pl.things.map((t, k) => (
                  <PixelSprite key={k} grid={spriteFor(t)!} scale={2} />
                ))}
              </div>
              <div className={css.kinds}>
                Kinds: <b>{counts[i]}</b>
              </div>
              <div className={css.step}>
                <button type="button" className="kbtn" disabled={over || counts[i] <= 0} onClick={() => bump(-1)} aria-label={`One fewer kind in the ${pl.label}`}>
                  −
                </button>
                <button type="button" className="kbtn" disabled={over || counts[i] >= MAX_KINDS} onClick={() => bump(1)} aria-label={`One more kind in the ${pl.label}`}>
                  +
                </button>
              </div>
              <button type="button" className={`kbtn game-btn ${css.more}`} disabled={over || !ready} onClick={() => onCheck(i)}>
                ⭐ More kinds
              </button>
            </div>
          );
        })}
      </div>
      {!over && <p className={css.hint}>{ready ? `Count, then tap the habitat with more kinds. (Try ${tries + 1} of ${COUNT_TRIES})` : "Use + and − to count the kinds in each habitat."}</p>}
    </>
  );
}
