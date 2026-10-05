"use client";

import { useMemo, useState, type ReactNode } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { Grid } from "@/lib/pixel/grid";
import { propGrid } from "@/lib/pixel/objects";
import { levelById, parse, RULES, spanText, start, step, type BugLevel, type HuntEvent, type HuntState, type Move } from "@/lib/minigames/bughunt";
import type { MiniGameUIProps } from "./types";
import css from "./BugHuntGame.module.css";

const OUT = "#1b1530";
const BUG_COLORS = ["#e03131", "#f08c00", "#7048e8", "#1c7ed6", "#2f9e44", "#d6336c", "#0ca678", "#e8590c"];

/** A little beetle (or a flat one, once squashed). */
function bugGrid(color: string, squashed: boolean): Grid {
  const g = new Grid(14, 12);
  if (squashed) {
    g.rect(2, 8, 10, 2, color).rect(1, 9, 12, 1, "#5c3d2e").set(3, 7, color).set(10, 7, color).set(6, 7, "#ffe066");
  } else {
    for (const y of [5, 7, 9]) g.set(2, y, OUT).set(3, y, OUT).set(10, y, OUT).set(11, y, OUT);
    g.disc(6.5, 7, 3.6, color).rect(6, 4, 1, 7, "#1b1530").disc(6.5, 2.6, 1.6, "#343a40");
    g.set(5, 0, OUT).set(8, 0, OUT).set(4, 6, "#ffffff").set(9, 8, "#ffffff");
  }
  return g.outline(OUT);
}

/** A bug-catching net. */
function netGrid(): Grid {
  const g = new Grid(12, 12);
  g.disc(4.5, 4.5, 4, "#f8f9fa").disc(4.5, 4.5, 3, null);
  for (let y = 2; y <= 7; y++) for (let x = 2; x <= 7; x++) if ((x + y) % 2 === 0 && (x - 4.5) ** 2 + (y - 4.5) ** 2 < 9) g.set(x, y, "#ced4da");
  for (let i = 0; i < 4; i++) g.set(8 + i, 8 + i, "#8a5a2a").set(7 + i, 8 + i, "#a8743a");
  return g.outline(OUT);
}

const NET = netGrid();

const quote = (t: string) => `“${t}”`;

function feedback(level: BugLevel, ev: HuntEvent, word: string): { good: boolean; title: string; text: string } {
  const p = parse(level);
  if (ev.kind === "squash") {
    const b = p.bugs[ev.bug];
    const r = RULES[b.rule];
    return { good: true, title: `Squashed! ${quote(b.wrong)} → ${quote(ev.fix)}`, text: `${r.name}: ${r.tip}` };
  }
  if (ev.kind === "wrongfix") {
    const r = RULES[p.bugs[ev.bug].rule];
    return { good: false, title: `You found a bug, but ${quote(ev.fix)} isn't the fix. It cost a net.`, text: `Hint (${r.name}): ${r.tip}` };
  }
  return {
    good: false,
    title: `${quote(word)} was already right, so the bug got away with a net.`,
    text: "Read the whole sentence aloud. If it sounds right and follows the rules, leave it alone and hunt somewhere else.",
  };
}

export default function BugHuntGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Hunt level={level} onFinish={onFinish} /> : null;
}

function Hunt({ level, onFinish }: { level: BugLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const p = useMemo(() => parse(level), [level]);
  const [hunt, setHunt] = useState<HuntState>(() => start(level));
  const [moves, setMoves] = useState<Move[]>([]);
  const [missed, setMissed] = useState<number[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [report, setReport] = useState<{ good: boolean; title: string; text: string } | null>(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const total = p.bugs.length;
  const found = Object.keys(hunt.fixed).length;
  const ended = done || hunt.over;

  function pick(i: number) {
    if (ended) return;
    const t = p.tokens[i];
    if (t.bug >= 0 && hunt.fixed[t.bug] !== undefined) return;
    setSel(i);
    setDraft(spanText(p, i));
  }

  async function finish(finalMoves: Move[]) {
    setDone(true);
    setSel(null);
    setBusy(true);
    setError("");
    try {
      const res = await onFinish(finalMoves);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save the game.");
    } finally {
      setBusy(false);
    }
  }

  function submit() {
    if (sel === null) return;
    const move = { wordIndex: sel, fix: draft };
    const r = step(level, hunt, move);
    if (!r.event) {
      setSel(null);
      return;
    }
    const nextMoves = [...moves, { wordIndex: sel, fix: r.event.fix }];
    setMoves(nextMoves);
    setHunt(r.state);
    setReport(feedback(level, r.event, spanText(p, sel)));
    if (r.event.kind === "miss") setMissed((m) => [...m, sel]);
    chime(r.event.kind === "squash" ? "right" : "oops");
    setSel(null);
    if (r.state.over) void finish(nextMoves);
  }

  // The passage, with squashed bugs replaced by the kid's fix.
  const pieces: ReactNode[] = [];
  for (let i = 0; i < p.tokens.length; i++) {
    const t = p.tokens[i];
    if (t.bug >= 0 && hunt.fixed[t.bug] !== undefined) {
      const b = p.bugs[t.bug];
      pieces.push(
        <span key={i} className={css.fixed} title={`Was: ${b.wrong}`}>
          {hunt.fixed[t.bug]}
        </span>,
        " ",
      );
      i = b.end - 1;
      continue;
    }
    const revealBug = ended && t.bug >= 0;
    const cls = [css.word, sel !== null && (i === sel || (t.bug >= 0 && p.tokens[sel].bug === t.bug)) ? css.sel : "", missed.includes(i) ? css.missed : "", revealBug ? css.escaped : ""].join(" ");
    pieces.push(
      <button key={i} type="button" className={cls} onClick={() => pick(i)} disabled={ended}>
        {t.text}
      </button>,
      " ",
    );
  }

  return (
    <div className={`mg ${css.hunt}`}>
      <div className="mg-hud">
        <span className={`chip ${css.chip} ${found === total ? "hot" : ""}`}>
          🐛 Bugs {found} / {total}
        </span>
        <span className={`chip ${css.chip}`} aria-label={`${hunt.netsLeft} nets left`}>
          {Array.from({ length: level.nets }, (_, i) => (
            <span key={i} className={i < hunt.netsLeft ? "" : css.netGone}>
              <PixelSprite grid={NET} scale={2} />
            </span>
          ))}
        </span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(found / total) * 100}%` }} />
      </div>

      <div className={`mg-scene ${css.woods}`} aria-hidden>
        <span className={css.tree1}>
          <PixelSprite grid={propGrid("pine")} scale={5} />
        </span>
        <span className={css.tree2}>
          <PixelSprite grid={propGrid("tree")} scale={5} />
        </span>
        <div className={css.bugRow}>
          {p.bugs.map((_, b) => {
            const squashed = hunt.fixed[b] !== undefined;
            return (
              <span key={b} className={squashed ? css.squashed : css.crawl} style={{ animationDelay: `${b * 0.23}s` }}>
                <PixelSprite grid={bugGrid(BUG_COLORS[b % BUG_COLORS.length], squashed)} scale={3} />
              </span>
            );
          })}
        </div>
      </div>

      <div className={css.passage} aria-label="The passage. Tap a word that has a mistake.">
        {pieces}
      </div>

      {sel !== null && !ended && (
        <form
          className={css.editor}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label className={css.editLabel}>
            Fix {quote(spanText(p, sel))}:
            <input className={css.input} value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus autoCapitalize="off" autoCorrect="off" spellCheck={false} maxLength={120} />
          </label>
          <div className={css.editBtns}>
            <button type="submit" className="kbtn game-btn">
              Squash it! 🔨
            </button>
            <button type="button" className="kbtn ghost" onClick={() => setSel(null)}>
              Cancel
            </button>
          </div>
          <p className="kmuted small">Type the word the way it should be (add or change punctuation, capitals or spelling).</p>
        </form>
      )}

      {report && (
        <div className={`day-report ${report.good ? "good" : "bad"}`} aria-live="polite">
          <strong>{report.title}</strong>
          <div className="kmuted small">{report.text}</div>
        </div>
      )}

      {!ended ? (
        <div className="mg-controls">
          <p className="kmuted small">Tap a word you think is wrong. Wrong taps cost a net; when the nets run out, the hunt is over.</p>
          <button className="kbtn ghost" onClick={() => finish(moves)}>
            I&apos;m done hunting
          </button>
        </div>
      ) : (
        <div className="mg-result">
          <h2 className="pixel-title">{found === total ? "All bugs squashed!" : hunt.netsLeft <= 0 ? "Out of nets!" : "Hunt over"}</h2>
          <p>
            You squashed <strong>{found}</strong> of {total} bugs with {hunt.netsLeft} {hunt.netsLeft === 1 ? "net" : "nets"} left.
          </p>
          {busy && <p className="kmuted">Counting the bugs…</p>}
          {error && <p className="kmuted">{error}</p>}
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
                <p className="kmuted small">
                  Tip: 3 stars means every bug squashed with {level.forgive === 0 ? "no" : `at most ${level.forgive}`} wrong {level.forgive === 1 ? "tap" : "taps"}. Read each sentence slowly before you tap.
                </p>
              )}
            </>
          )}
          <ul className={css.review}>
            {p.bugs.map((b, i) => (
              <li key={i} className={hunt.fixed[i] !== undefined ? css.got : css.gotAway}>
                <span>
                  {hunt.fixed[i] !== undefined ? "✅" : "🐛"} <s>{b.wrong}</s> → <strong>{b.accept[0]}</strong>
                </span>
                <span className="kmuted small">
                  {RULES[b.rule].name}: {RULES[b.rule].tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
