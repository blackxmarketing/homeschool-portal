"use client";

import { useEffect, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useAutoRead, useTeacherVoice, useVoiceSettings } from "../voice";
import { heroGrid } from "@/lib/pixel/hero";
import {
  ENDS,
  END_NAMES,
  answerText,
  anvilGrid,
  bankFor,
  canCap,
  capitalize,
  checkTry,
  forgeGrid,
  hammerGrid,
  isPunct,
  levelById,
  roundPoints,
  type End,
  type SmithLevel,
  type Step,
  type Try,
} from "@/lib/minigames/sentencesmith";
import type { MiniGameUIProps } from "./types";
import css from "./SentenceSmithGame.module.css";

const ANVIL = anvilGrid();
const HAMMER = hammerGrid();
const FIRE = [forgeGrid(0), forgeGrid(1)];
const SMITH = heroGrid({ skin: 2, hair: "short", hairColor: 0, outfit: 7, hat: "bandana", pet: "none" });

const STEP_HELP: Record<Step, string> = {
  words: "Tap the words in order.",
  caps: "Tap each word that needs a capital letter.",
  end: "How does it end? Pick the end mark.",
};

export default function SentenceSmithGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <SentenceSmith level={level} onFinish={onFinish} /> : null;
}

function SentenceSmith({ level, onFinish }: { level: SmithLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const [ri, setRi] = useState(0);
  const round = level.rounds[ri];
  const bank = bankFor(level, ri);
  const [placed, setPlaced] = useState<number[]>([]);
  const [caps, setCaps] = useState<number[]>([]);
  const [end, setEnd] = useState<End | "">("");
  const [step, setStep] = useState<Step>("words");
  const [tries, setTries] = useState<Try[]>([]);
  const [moves, setMoves] = useState<Try[][]>([]);
  const [solved, setSolved] = useState(false);
  const [note, setNote] = useState("");
  const [striking, setStriking] = useState(false);
  const [flame, setFlame] = useState(0);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const { speakOn } = useVoiceSettings();
  const kind = useTeacherVoice();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);
  useEffect(() => {
    const t = setInterval(() => setFlame((f) => 1 - f), 450);
    return () => clearInterval(t);
  }, []);

  const young = level.grade <= 2;
  const points = moves.reduce((s, m, i) => s + roundPoints(level, i, m), 0);
  const max = level.rounds.length * 2;
  const sayId = `ss-${level.id}-${ri}`;
  const intro = level.intro.replace(/^Skill:[^)]*\)\.\s*/, "");
  useAutoRead(sayId, done ? null : ri === 0 ? `${intro} ${round.say}` : round.say);

  const say = (id: string, text: string) => speakOn && speak(id, text, { kind });

  function goStep(s: Step) {
    if (solved) return;
    setStep(s);
    if (young) say(`${sayId}-step`, STEP_HELP[s]);
  }

  function place(bi: number) {
    if (solved || placed.includes(bi)) return;
    setPlaced([...placed, bi]);
    if (step !== "words") setStep("words");
    if (level.grade === 1 && !isPunct(bank[bi])) say(`${sayId}-w`, bank[bi]);
  }

  function tapPlaced(bi: number) {
    if (solved) return;
    if (step === "caps") {
      if (!canCap(bank[bi])) return;
      setCaps(caps.includes(bi) ? caps.filter((c) => c !== bi) : [...caps, bi]);
      return;
    }
    // Words (or end) step: the tile goes back to the bank.
    setPlaced(placed.filter((p) => p !== bi));
    setCaps(caps.filter((c) => c !== bi));
    if (step !== "words") setStep("words");
  }

  function strike(mark: End | "" = end) {
    if (solved || placed.length === 0 || !mark) return;
    const t: Try = { o: [...placed], c: caps.filter((c) => placed.includes(c)), e: mark };
    const all = [...tries, t];
    setTries(all);
    setStriking(true);
    timer.current = setTimeout(() => setStriking(false), 450);
    const c = checkTry(level, ri, t);
    if (c.ok) {
      chime(all.length === 1 ? "streak" : "right");
      setMoves((m) => [...m, all]);
      setSolved(true);
      setNote(round.rule);
      say(`${sayId}-rule`, `${all.length === 1 ? "Clang! Perfect!" : "Clang! You fixed it!"} ${round.rule}`);
      return;
    }
    chime("oops");
    setNote(c.note);
    setStep(c.step);
    say(`${sayId}-hint`, c.note);
  }

  function chooseEnd(m: End) {
    setEnd(m);
    strike(m);
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setPlaced([]);
      setCaps([]);
      setEnd("");
      setStep("words");
      setTries([]);
      setSolved(false);
      setNote("");
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
      <div className={`mg ${css.smith}`}>
        <div className="mg-result">
          <PixelSprite grid={SMITH} scale={4} className={css.cheer} />
          <h2 className="pixel-title">Sentences forged!</h2>
          <p>
            You earned <strong>{points}</strong> of {max} forge points.
          </p>
          {busy && <p className="kmuted">Cooling the iron…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: before you strike, read your sentence out loud. Check the first word, the names, and the end mark.</p>}
            </>
          )}
          <div className={`day-log ${css.log}`}>
            {level.rounds.map((r, i) => (
              <span key={i}>
                {r.emoji} {answerText(r)} {"⭐".repeat(roundPoints(level, i, moves[i]))}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const wrongTries = solved ? 0 : tries.length;
  const showGhost = wrongTries >= level.hintAfter;
  const steps: Step[] = ["words", "caps", "end"];
  const stepLabel: Record<Step, string> = { words: "Words", caps: "Capitals", end: "End mark" };

  return (
    <div className={`mg ${css.smith}`}>
      <div className="mg-hud">
        <span className="chip">
          🔨 Sentence {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={css.stage}>
        <div className={css.forge} aria-hidden>
          <PixelSprite grid={FIRE[flame]} scale={3} />
          <PixelSprite grid={SMITH} scale={3} className={solved ? css.cheer : ""} />
        </div>
        <div className={css.prompt}>
          <span className={css.emoji} aria-hidden>
            {round.emoji}
          </span>
          <p>{round.show}</p>
          <SayButton id={sayId} text={round.say} />
        </div>
      </div>

      {!solved && (
        <div className={css.steps} role="tablist" aria-label="Forging steps">
          {steps.map((s, i) => (
            <button key={s} type="button" role="tab" aria-selected={step === s} className={`${css.stepBtn} ${step === s ? css.on : ""}`} onClick={() => goStep(s)}>
              {i + 1}. {stepLabel[s]}
            </button>
          ))}
        </div>
      )}

      <div className={`${css.anvil} ${step === "caps" && !solved ? css.capsMode : ""} ${solved ? css.done : ""}`}>
        <div className={css.line} aria-label="Your sentence">
          {placed.length === 0 && <span className={css.empty}>Tap word tiles to lay them here</span>}
          {placed.map((bi) => {
            const word = caps.includes(bi) ? capitalize(bank[bi]) : bank[bi];
            const stampable = step === "caps" && canCap(bank[bi]);
            return (
              <button
                key={bi}
                type="button"
                className={`${css.tile} ${css.placed} ${isPunct(bank[bi]) ? css.punct : ""} ${caps.includes(bi) ? css.capped : ""} ${stampable ? css.stampable : ""}`}
                onClick={() => tapPlaced(bi)}
                disabled={solved || (step === "caps" && !canCap(bank[bi]))}
                aria-label={step === "caps" ? `${word}. Tap to ${caps.includes(bi) ? "remove the" : "stamp a"} capital.` : `${word}. Tap to take it back.`}
              >
                {word}
              </button>
            );
          })}
          {placed.length > 0 && (
            <span className={`${css.endSlot} ${end ? css.endSet : ""}`} aria-label={end ? `Ends with a ${END_NAMES[end]}` : "No end mark yet"}>
              {end || "?"}
              {round.close}
            </span>
          )}
        </div>
        <div className={css.anvilArt} aria-hidden>
          <PixelSprite grid={ANVIL} scale={3} />
          <PixelSprite grid={HAMMER} scale={3} className={`${css.hammer} ${striking ? css.swing : ""}`} />
          {solved && (
            <span className={css.sparks}>
              <i />
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
      </div>

      {showGhost && (
        <p className={css.ghost}>
          Look: <strong>{answerText(round)}</strong>
        </p>
      )}

      {!solved && (
        <div className="mg-controls">
          <p className={css.help}>{STEP_HELP[step]}</p>
          {step === "words" && (
            <>
              <div className={css.bank}>
                {bank.map((t, bi) => (
                  <button
                    key={bi}
                    type="button"
                    className={`${css.tile} ${isPunct(t) ? css.punct : ""}`}
                    onClick={() => place(bi)}
                    disabled={placed.includes(bi)}
                    aria-label={isPunct(t) ? (t === "," ? "Comma tile" : "Quotation mark tile") : `Word tile ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button type="button" className="kbtn big game-btn" onClick={() => goStep("caps")} disabled={placed.length === 0}>
                Stamp capitals ➜
              </button>
            </>
          )}
          {step === "caps" && (
            <button type="button" className="kbtn big game-btn" onClick={() => goStep("end")} disabled={placed.length === 0}>
              Pick the end mark ➜
            </button>
          )}
          {step === "end" && (
            <div className={css.ends}>
              {ENDS.map((m) => (
                <button key={m} type="button" className={`${css.endBtn} ${end === m ? css.on : ""}`} onClick={() => chooseEnd(m)} disabled={placed.length === 0} aria-label={`End with a ${END_NAMES[m]}`}>
                  <b>{m}</b>
                  <span>{m === "." ? "tell" : m === "?" ? "ask" : "wow"}</span>
                </button>
              ))}
            </div>
          )}
          {step !== "end" && end && (
            <button type="button" className="kbtn game-btn" onClick={() => strike()} disabled={placed.length === 0}>
              🔨 Strike!
            </button>
          )}
        </div>
      )}

      {note && !solved && (
        <div className="day-report bad" role="status">
          {note} <SayButton id={`${sayId}-hint`} text={note} />
        </div>
      )}

      {solved && (
        <div className="mg-controls">
          <div className="day-report good" role="status">
            <strong>{tries.length === 1 ? "Clang! Perfect on the first strike!" : "Clang! You fixed it!"}</strong> {note} <SayButton id={`${sayId}-rule`} text={note} />
          </div>
          <button type="button" className="kbtn big game-btn" onClick={next}>
            {ri + 1 < level.rounds.length ? "Next sentence ➜" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
