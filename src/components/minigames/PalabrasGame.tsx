"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, pickVoice, SayButton, speechSupported, stopSpeaking, useStopOnUnmount, useVoicePrefs, useVoiceSettings } from "../voice";
import {
  MAX_TRIES,
  buildNote,
  isRight,
  levelById,
  modelAnswer,
  order,
  parrotGrid,
  pickSpanishVoice,
  scoreRound,
  speechParts,
  type BuildRound,
  type PalabrasLevel,
  type ReplyRound,
  type Round,
  type RoundMove,
  type RoundResult,
  type SpeechPart,
} from "@/lib/minigames/palabras";
import type { MiniGameUIProps } from "./types";
import css from "./PalabrasGame.module.css";

const LOLO = parrotGrid(false);
const LOLO_TALK = parrotGrid(true);

// ---------------- Two voices: English for help, Spanish for the words ----------------

let talkToken = 0;

/**
 * Reads parts aloud in order, each in its own language: Spanish parts use a
 * Spanish voice (es-MX first, then es-US / es-ES), English parts an English one.
 * Does nothing if the browser has no speech; the words are always on screen.
 */
function talk(parts: SpeechPart[], rate: number, onTalking: (on: boolean) => void) {
  if (!speechSupported() || !parts.length) return;
  stopSpeaking();
  const synth = window.speechSynthesis;
  const token = ++talkToken;
  window.setTimeout(() => {
    if (token !== talkToken) return;
    try {
      const voices = synth.getVoices();
      const es = pickSpanishVoice(voices);
      const en = pickVoice(voices, "female").voice;
      parts.forEach((p, i) => {
        const u = new SpeechSynthesisUtterance(p.text);
        const v = p.es ? es : en;
        if (v) u.voice = v;
        u.lang = v?.lang ?? (p.es ? "es-MX" : "en-US");
        u.rate = p.es ? rate * 0.85 : rate;
        if (i === 0) u.onstart = () => token === talkToken && onTalking(true);
        if (i === parts.length - 1) u.onend = u.onerror = () => token === talkToken && onTalking(false);
        synth.speak(u);
      });
    } catch {
      onTalking(false);
    }
  }, 80);
}

const es = (text: string): SpeechPart => ({ text, es: true });
const en = (text: string): SpeechPart => ({ text, es: false });

/** Big picture: emoji, or a short label like "12" or "4:30". */
function Pic({ pic, big = false }: { pic: string; big?: boolean }) {
  const isLabel = /[0-9A-Za-z]/.test(pic);
  return <span className={`${css.pic} ${isLabel ? css.label : ""} ${big ? css.big : ""}`}>{pic}</span>;
}

function instruction(r: Round): string {
  if (r.kind === "hear") return "Listen. Tap the picture that matches.";
  if (r.kind === "match") return "Tap a Spanish word, then tap its picture.";
  if (r.kind === "reply") return "Listen to the question. Build your answer in Spanish.";
  return r.join === "" ? `Build the Spanish word for ${r.en}` : `Build it in Spanish: ${r.en}`;
}

/** The Spanish to hear at the start of a round. */
function roundSpanish(r: Round): string | null {
  if (r.kind === "hear") return r.choices[0].es;
  if (r.kind === "reply") return r.question;
  return null;
}

export default function PalabrasGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Palabras level={level} onFinish={onFinish} /> : null;
}

function Palabras({ level, onFinish }: { level: PalabrasLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const { speakOn } = useVoiceSettings();
  const [prefs] = useVoicePrefs();
  useStopOnUnmount();
  const young = level.grade <= 2;

  const [ri, setRi] = useState(0);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  // This round
  const [picks, setPicks] = useState<number[]>([]);
  const [pairs, setPairs] = useState<[number, number][]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [chosen, setChosen] = useState<number[]>([]);
  const [tries, setTries] = useState<number[][]>([]);
  const [note, setNote] = useState("");
  const [report, setReport] = useState<RoundResult | null>(null);
  // End of game
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [talking, setTalking] = useState(false);

  const round = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const key = `${level.id}:${ri}`;
  const points = moves.reduce((s, m, i) => s + scoreRound(level.rounds[i], m).points, 0);
  const max = level.rounds.length * 2;

  /** Say English help (if read-aloud is on) and Spanish words. */
  const say = (parts: SpeechPart[]) => {
    const keep = parts.filter((p) => p.es || speakOn).filter((p) => p.text.trim());
    talk(keep, prefs.rate, setTalking);
  };
  const sayEs = (text: string) => say([es(text)]);
  /** A tip mixes English and Spanish; each part gets its own voice. */
  const sayTip = (text: string) => say(speechParts(text));

  // Start of each round: K-2 hear the instruction; everyone hears the Spanish.
  const started = useRef("");
  useEffect(() => {
    if (done || started.current === key) return;
    started.current = key;
    const word = roundSpanish(round);
    const parts: SpeechPart[] = [];
    if (young) parts.push(en(instruction(round)));
    if (word) parts.push(es(word));
    if (parts.length) say(parts);
  }, [key, done]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shuffled orders (seeded, so they're the same on every replay of the level).
  const choiceOrder = useMemo(() => (round.kind === "hear" ? order(round.choices.length, key) : []), [round, key]);
  const picOrder = useMemo(() => (round.kind === "match" ? order(round.items.length, key + ":pics") : []), [round, key]);
  const tileOrder = useMemo(() => (round.kind === "build" || round.kind === "reply" ? order(round.tiles.length, key + ":tiles") : []), [round, key]);

  const matched = useMemo(() => {
    const set = new Set<number>();
    for (const [w, p] of pairs) if (w === p) set.add(w);
    return set;
  }, [pairs]);

  function finishRound(move: RoundMove) {
    const r = scoreRound(round, move);
    setMoves((m) => [...m, move]);
    setReport(r);
    setNote("");
    const praise = r.first ? "¡Excelente!" : r.solved ? "¡Muy bien!" : "";
    const spanish = round.kind === "build" || round.kind === "reply" ? modelAnswer(round) : round.kind === "hear" ? round.choices[0].es : "";
    if (young) say([...(praise ? [es(praise)] : []), ...speechParts(round.tip)]);
    else if (spanish) say([...(praise ? [es(praise)] : []), es(spanish)]);
    else if (praise) sayEs(praise);
  }

  // ---------- hear ----------
  function pick(i: number) {
    if (round.kind !== "hear" || report || picks.includes(i)) return;
    const next = [...picks, i];
    setPicks(next);
    if (i === 0) {
      chime("right");
      finishRound({ picks: next });
      return;
    }
    chime("oops");
    const c = round.choices[i];
    setNote(`That's “${c.es}” (${c.en}). Listen again and try another picture!`);
    say([en("Not that one. Listen again."), es(round.choices[0].es)]);
  }

  // ---------- match ----------
  function tapWord(i: number) {
    if (round.kind !== "match" || report || matched.has(i)) return;
    setSel(i);
    setNote("");
    sayEs(round.items[i].es);
  }

  function tapPic(i: number) {
    if (round.kind !== "match" || report || matched.has(i)) return;
    if (sel === null) {
      setNote("First tap a Spanish word, then its picture.");
      if (young) say([en("First tap a Spanish word.")]);
      return;
    }
    const next: [number, number][] = [...pairs, [sel, i]];
    setPairs(next);
    if (sel === i) {
      const allDone = matched.size + 1 === round.items.length;
      setSel(null);
      setNote("");
      chime("right");
      if (allDone) finishRound({ pairs: next });
      else sayEs(round.items[i].es);
      return;
    }
    chime("oops");
    const w = round.items[sel];
    setNote(`“${w.es}” means ${w.en}. Look for that picture!`);
    if (young) say([es(w.es), en(`means ${w.en}. Try again!`)]);
  }

  // ---------- build / reply ----------
  function addTile(i: number) {
    if ((round.kind !== "build" && round.kind !== "reply") || report || chosen.includes(i)) return;
    setChosen([...chosen, i]);
    setNote("");
    sayEs(round.tiles[i]);
  }

  function removeTile(pos: number) {
    if (report) return;
    setChosen(chosen.filter((_, k) => k !== pos));
  }

  function check(r: BuildRound | ReplyRound) {
    if (!chosen.length || report) return;
    const next = [...tries, chosen];
    setTries(next);
    if (isRight(r, chosen)) {
      chime("right");
      finishRound({ tries: next });
      return;
    }
    chime("oops");
    if (next.length >= MAX_TRIES) {
      finishRound({ tries: next });
      return;
    }
    const msg = buildNote(r, chosen);
    setNote(msg);
    if (young) sayTip(msg);
  }

  async function nextRound() {
    stopSpeaking();
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setPicks([]);
      setPairs([]);
      setSel(null);
      setChosen([]);
      setTries([]);
      setNote("");
      setReport(null);
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

  // ---------------- End of the level ----------------
  if (done) {
    return (
      <div className={`mg ${css.game}`}>
        <div className="mg-result">
          <PixelSprite grid={LOLO} scale={4} title="Lolo the parrot" />
          <h2 className="pixel-title">¡Fantástico!</h2>
          <p>
            You scored <strong>{points}</strong> of {max} points.
          </p>
          {busy && <p className="kmuted">Lolo is counting your stars…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: tap the 🔊 buttons to hear each word again before you answer. Stars come from getting it right on the first try.</p>}
            </>
          )}
          <div className={css.log}>
            {level.rounds.map((r, i) => {
              const text = r.kind === "hear" ? r.choices[0].es : r.kind === "match" ? r.items.map((x) => x.es).join(" · ") : modelAnswer(r);
              const p = moves[i] ? scoreRound(r, moves[i]).points : 0;
              return (
                <button key={i} type="button" className={css.logRow} onClick={() => sayEs(text)} aria-label={`Hear ${text}`}>
                  <span>{"⭐".repeat(p) || "·"}</span> <span>{text}</span> <span aria-hidden>🔊</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const spanishPrompt = roundSpanish(round);
  const tiled = round.kind === "build" || round.kind === "reply" ? round : null;
  const showQEn = round.kind === "reply" && (level.grade <= 3 || tries.length > 0 || !!report);

  return (
    <div className={`mg ${css.game}`}>
      <div className="mg-hud">
        <span className="chip">
          💬 Ronda {ri + 1} / {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
        <span className="chip">{level.actfl}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      {/* Lolo and the prompt */}
      <div className={css.prompt}>
        <span className={css.lolo}>
          <PixelSprite grid={talking ? LOLO_TALK : LOLO} scale={3} title="Lolo the parrot" />
        </span>
        <div className={css.bubble}>
          <p className={css.ask}>
            {instruction(round)} <SayButton id={`pal-${key}`} text={instruction(round)} />
          </p>
          {spanishPrompt && (
            <button type="button" className={css.spanish} onClick={() => sayEs(spanishPrompt)} aria-label={`Hear ${spanishPrompt}`}>
              <span aria-hidden>🔊</span> {spanishPrompt}
            </button>
          )}
          {showQEn && round.kind === "reply" && <p className="kmuted small">({round.qEn})</p>}
        </div>
      </div>

      {/* hear: tap the picture */}
      {round.kind === "hear" && (
        <div className={css.choices}>
          {choiceOrder.map((i) => {
            const c = round.choices[i];
            const wrong = picks.includes(i) && i !== 0;
            const right = report && i === 0;
            return (
              <button
                key={i}
                type="button"
                className={`${css.choice} ${wrong ? css.wrong : ""} ${right ? css.right : ""}`}
                onClick={() => pick(i)}
                disabled={!!report || wrong}
                aria-label={wrong ? `${c.en}: not this one` : `Picture ${c.en}`}
              >
                <Pic pic={c.pic} big />
                {(wrong || right) && <span className={css.caption}>{c.es}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* match: word, then picture */}
      {round.kind === "match" && (
        <div className={css.match}>
          <div className={css.col}>
            {round.items.map((w, i) => (
              <button
                key={i}
                type="button"
                className={`${css.word} ${sel === i ? css.sel : ""} ${matched.has(i) ? css.right : ""}`}
                onClick={() => tapWord(i)}
                disabled={!!report || matched.has(i)}
              >
                {matched.has(i) && <span aria-hidden>{w.pic} </span>}
                {w.es}
              </button>
            ))}
          </div>
          <div className={css.col}>
            {picOrder.map((i) => {
              const w = round.items[i];
              return (
                <button
                  key={i}
                  type="button"
                  className={`${css.picBtn} ${matched.has(i) ? css.right : ""} ${sel !== null && !matched.has(i) ? css.target : ""}`}
                  onClick={() => tapPic(i)}
                  disabled={!!report || matched.has(i)}
                  aria-label={matched.has(i) ? `${w.en}: matched` : `Picture: ${w.en}`}
                >
                  <Pic pic={w.pic} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* build / reply: tiles */}
      {tiled && (
        <div className="mg-controls">
          <div className={css.clue}>
            <Pic pic={tiled.pic} big />
          </div>
          <div className={`${css.line} ${tiled.kind === "build" && tiled.join === "" ? css.joined : ""}`} aria-label="Your Spanish">
            {chosen.length === 0 && <span className={css.placeholder}>Tap the tiles to build it…</span>}
            {chosen.map((t, pos) => (
              <button key={`${t}-${pos}`} type="button" className={`${css.tile} ${css.placed}`} onClick={() => removeTile(pos)} disabled={!!report} aria-label={`Remove ${tiled.tiles[t]}`}>
                {tiled.tiles[t]}
              </button>
            ))}
          </div>
          {!report && (
            <>
              <div className={css.bank}>
                {tileOrder.map((t) => (
                  <button key={t} type="button" className={`${css.tile} ${chosen.includes(t) ? css.used : ""}`} onClick={() => addTile(t)} disabled={chosen.includes(t)}>
                    {tiled.tiles[t]}
                  </button>
                ))}
              </div>
              <div className={css.row}>
                <button type="button" className="kbtn" onClick={() => setChosen([])} disabled={!chosen.length}>
                  Clear
                </button>
                <button type="button" className="kbtn big game-btn" onClick={() => check(tiled)} disabled={!chosen.length}>
                  Check ✓ <span className={css.tryNo}>(try {tries.length + 1} of {MAX_TRIES})</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {note && !report && (
        <div className="day-report bad" role="status">
          {note} {young && <SayButton id={`pal-note-${key}`} text={note} />}
        </div>
      )}

      {report && (
        <div className="mg-controls">
          <div className={`day-report ${report.first ? "good" : "bad"}`} role="status">
            <strong>{report.first ? "¡Excelente! First try!" : report.solved ? "¡Muy bien! You got it." : "Good try! Here's how to say it:"}</strong>
            {(round.kind === "build" || round.kind === "reply") && (
              <button type="button" className={css.answer} onClick={() => sayEs(modelAnswer(round))} aria-label={`Hear ${modelAnswer(round)}`}>
                <span aria-hidden>🔊</span> {modelAnswer(round)}
                <span className={css.answerEn}>{round.en}</span>
              </button>
            )}
            <p className={css.tip}>
              {round.tip}
              <button type="button" className="say-btn" onClick={() => sayTip(round.tip)} aria-label="Read the tip to me">
                🔊
              </button>
            </p>
          </div>
          <button type="button" className="kbtn big game-btn" onClick={nextRound}>
            {ri + 1 < level.rounds.length ? "Next ➜" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
