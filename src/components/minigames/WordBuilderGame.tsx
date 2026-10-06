"use client";

import { useEffect, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useAutoRead, useTeacherVoice, useVoiceSettings } from "../voice";
import { bankFor, hintFor, isRight, levelById, needed, owlGrid, promptFor, roundPoints, type WordLevel } from "@/lib/minigames/wordbuilder";
import type { MiniGameUIProps } from "./types";
import css from "./WordBuilderGame.module.css";

const OWL = owlGrid();

export default function WordBuilderGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <WordBuilder level={level} onFinish={onFinish} /> : null;
}

type Status = "play" | "checking" | "solved";

function WordBuilder({ level, onFinish }: { level: WordLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const [ri, setRi] = useState(0);
  const round = level.rounds[ri];
  const want = needed(level, round);
  const bank = bankFor(level, ri);
  const [slots, setSlots] = useState<(number | null)[]>(() => want.map(() => null));
  const [tries, setTries] = useState<number[][]>([]);
  const [moves, setMoves] = useState<number[][][]>([]);
  const [status, setStatus] = useState<Status>("play");
  const [note, setNote] = useState("");
  const [wrong, setWrong] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const { speakOn } = useVoiceSettings();
  const kind = useTeacherVoice();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const first = level.mode === "first";
  const prompt = promptFor(level, round);
  const points = moves.reduce((s, m, i) => s + roundPoints(level, i, m), 0);
  const max = level.rounds.length * 2;
  const sayId = `wb-${level.id}-${ri}`;
  useAutoRead(sayId, done ? null : ri === 0 ? `${level.intro.replace(/^Skill:[^)]*\)\.\s*/, "")} ${prompt}` : prompt);

  const say = (id: string, text: string) => speakOn && speak(id, text, { kind });
  const hear = () => speak(`${sayId}-word`, round.meaning ? `${round.word}. ${round.meaning}` : round.word, { kind });

  function place(bi: number) {
    if (status !== "play" || slots.includes(bi)) return;
    const at = slots.indexOf(null);
    if (at < 0) return;
    const next = slots.map((s, k) => (k === at ? bi : s));
    setSlots(next);
    setWrong([]);
    if (next.every((s) => s !== null)) {
      setStatus("checking");
      timer.current = setTimeout(() => check(next as number[]), 350);
    }
  }

  function unplace(k: number) {
    if (status !== "play" || slots[k] === null) return;
    setSlots(slots.map((s, j) => (j === k ? null : s)));
    setWrong([]);
  }

  function check(attempt: number[]) {
    const all = [...tries, attempt];
    setTries(all);
    if (isRight(level, ri, attempt)) {
      chime(all.length === 1 ? "streak" : "right");
      setMoves((m) => [...m, all]);
      setStatus("solved");
      setNote(round.tip);
      say(`${sayId}-tip`, `Yes! ${round.word}. ${round.tip}`);
      return;
    }
    chime("oops");
    const tiles = attempt.map((i) => bank[i]);
    const h = hintFor(level, ri, tiles, all.length);
    const bad = want.map((t, k) => (tiles[k] === t ? -1 : k)).filter((k) => k >= 0);
    setWrong(bad);
    setNote(h.note);
    say(`${sayId}-hint`, h.note);
    // Right tiles stay; wrong ones hop back to the bank.
    timer.current = setTimeout(() => {
      setSlots(attempt.map((bi, k) => (bad.includes(k) ? null : bi)));
      setWrong([]);
      setStatus("play");
    }, 900);
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      const n = ri + 1;
      setRi(n);
      setSlots(needed(level, level.rounds[n]).map(() => null));
      setTries([]);
      setStatus("play");
      setNote("");
      setWrong([]);
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
      <div className={`mg ${css.wb}`}>
        <div className="mg-result">
          <PixelSprite grid={OWL} scale={4} className={css.cheer} />
          <h2 className="pixel-title">Words built!</h2>
          <p>
            You earned <strong>{points}</strong> of {max} word points.
          </p>
          {busy && <p className="kmuted">Hoot is counting…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: say the word slowly and listen to each sound before you tap.</p>}
            </>
          )}
          <div className="day-log">
            {level.rounds.map((r, i) => (
              <span key={i}>
                {r.emoji} {r.word} {"⭐".repeat(roundPoints(level, i, moves[i]))}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hintOn = tries.length >= 2 && status !== "solved";
  const rest = first ? round.parts.slice(1).join("") : "";

  return (
    <div className={`mg ${css.wb}`}>
      <div className="mg-hud">
        <span className="chip">
          🔤 Word {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={css.stage}>
        <PixelSprite grid={OWL} scale={3} className={`${css.owl} ${status === "solved" ? css.cheer : ""}`} />
        <button type="button" className={css.picture} onClick={hear} aria-label={`Hear the word again`}>
          <span className={css.emoji} aria-hidden>
            {round.emoji}
          </span>
          <span className={css.ear}>🔊 Hear it</span>
        </button>
        <SayButton id={sayId} text={prompt} />
      </div>

      <div className={css.slots} aria-label={first ? "The first letter goes here" : "Build the word here"}>
        {slots.map((bi, k) => (
          <button
            key={k}
            type="button"
            className={`${css.slot} ${bi !== null ? css.filled : ""} ${wrong.includes(k) ? css.wrong : ""} ${status === "solved" ? css.right : ""}`}
            onClick={() => unplace(k)}
            disabled={status !== "play" || bi === null}
            aria-label={bi !== null ? `${bank[bi]}. Tap to take it back.` : "Empty slot"}
          >
            {bi !== null ? bank[bi] : hintOn ? <span className={css.ghost}>{want[k]}</span> : ""}
          </button>
        ))}
        {first && <span className={css.rest}>{rest}</span>}
      </div>

      {status !== "solved" && (
        <div className={css.bank}>
          {bank.map((t, bi) => (
            <button key={bi} type="button" className={css.tile} onClick={() => place(bi)} disabled={status !== "play" || slots.includes(bi)} aria-label={`Tile ${t}`}>
              {t}
            </button>
          ))}
        </div>
      )}

      {note && status !== "solved" && (
        <div className="day-report bad" role="status">
          {note} <SayButton id={`${sayId}-hint`} text={note} />
        </div>
      )}

      {status === "solved" && (
        <div className="mg-controls">
          <div className="day-report good" role="status">
            <strong>{tries.length === 1 ? "Yes! First try!" : "Yes! You built it!"}</strong> {note} <SayButton id={`${sayId}-tip`} text={note} />
          </div>
          <button type="button" className="kbtn big game-btn" onClick={next}>
            {ri + 1 < level.rounds.length ? "Next word ➜" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
