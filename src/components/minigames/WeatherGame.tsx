"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useTeacherVoice, useVoiceSettings } from "../voice";
import type { Grid } from "@/lib/pixel/grid";
import {
  CLIMATES,
  CLIMATE_INFO,
  DAY_NAMES,
  ITEMS,
  ITEM_INFO,
  KIT,
  KIT_INFO,
  MAX_TRIES,
  PLACE_INFO,
  WEATHERS,
  WEATHER_INFO,
  answerFor,
  askFor,
  bestDesign,
  checkAnswer,
  columnsOf,
  dayLabel,
  itemGrid,
  kidGrid,
  levelById,
  passes,
  predictRange,
  promptFor,
  readAnswer,
  scoreRound,
  seasonWord,
  skyGrid,
  teachFor,
  type ClimateId,
  type DataSet,
  type ItemId,
  type KitId,
  type PlaceId,
  type RoundKind,
  type RoundMove,
  type Weather,
  type WeatherLevel,
  type WeatherRound,
} from "@/lib/minigames/weather";
import type { MiniGameUIProps } from "./types";
import css from "./WeatherGame.module.css";

/** Sprites are reused a lot, so they're cached. */
const cache = new Map<string, Grid>();
function cached(key: string, make: () => Grid): Grid {
  let g = cache.get(key);
  if (!g) cache.set(key, (g = make()));
  return g;
}
const sky = (w: Weather, f = 0) => cached(`sky-${w}-${f}`, () => skyGrid(w, f));
const kid = (items: string[]) => {
  const k = [...items].sort();
  return cached(`kid-${k.join(",")}`, () => kidGrid(k));
};
const icon = (i: ItemId) => cached(`item-${i}`, () => itemGrid(i));

export default function WeatherGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <Watch level={level} onFinish={onFinish} /> : null;
}

interface RoundProps<K extends RoundKind> {
  r: Extract<WeatherRound, { kind: K }>;
  solved: boolean;
  /** Parts that were wrong on the last try (days, bars, places). */
  wrong: number[];
  tries: string[];
  frame: number;
  onAnswer: (a: string) => void;
  /** Changes the question at the top (and reads it aloud for young kids). */
  onAsk: (text: string) => void;
}

/** The right answer in words, shown after the last try. */
function answerText(r: WeatherRound): string {
  switch (r.kind) {
    case "record":
      return r.days.map((d, i) => `${dayLabel(r.days.length, i)} ${WEATHER_INFO[d].emoji}`).join(", ");
    case "count":
      return r.ask === "most" || r.ask === "fewest" ? answerFor(r) : `${answerFor(r)} ${r.ask} days`;
    case "dress":
      return answerFor(r)
        .split(",")
        .map((i) => ITEM_INFO[i as ItemId].name)
        .join(", ");
    case "storm":
      return `the ${PLACE_INFO[answerFor(r) as PlaceId].name}`;
    case "kit":
      return "flashlight, batteries, water and a first-aid kit";
    case "graph":
      return r.data.labels.map((l, i) => `${l}: ${r.data.values[i]}`).join(", ");
    case "read": {
      const a = readAnswer(r.data, r.ask);
      return r.ask.kind === "max" || r.ask.kind === "min" ? r.data.labels[a] : String(a);
    }
    case "predict": {
      const { lo, hi } = predictRange(r);
      return `between ${lo} and ${hi} ${r.data.unit}`;
    }
    case "climate":
      return r.places.map((p) => `${p.name}: ${CLIMATE_INFO[p.climate].name.toLowerCase()}`).join("; ");
    case "design":
      return `the ${bestDesign(r.test)?.name.toLowerCase()}`;
  }
}

function Watch({ level, onFinish }: { level: WeatherLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const { speakOn } = useVoiceSettings();
  const voice = useTeacherVoice();
  const young = level.grade <= 2;
  const [ri, setRi] = useState(0);
  const r = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const [tries, setTries] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState<number[]>([]);
  const [note, setNote] = useState<{ text: string; good: boolean } | null>(null);
  const [ask, setAsk] = useState<string | null>(null);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [frame, setFrame] = useState(0);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const say = useCallback(
    (id: string, text: string) => {
      if (speakOn && text) speak(id, text, { kind: voice });
    },
    [speakOn, voice],
  );

  // Rain falls, snow drifts and the wind blows.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setFrame((f) => 1 - f), 650);
    return () => clearInterval(t);
  }, []);

  // Read each round aloud when it starts (kindergarten).
  const started = useRef(-1);
  useEffect(() => {
    if (started.current === ri || done) return;
    started.current = ri;
    if (young) say(`weather-${ri}`, promptFor(r));
  }, [ri, r, say, done, young]);

  const onAsk = useCallback(
    (text: string) => {
      setAsk(text);
      if (young) say(`weather-ask-${ri}`, text);
    },
    [young, say, ri],
  );

  const points = moves.reduce((s, m, i) => s + scoreRound(level.rounds[i], m).points, 0);
  const max = level.rounds.length * 2;

  function answer(a: string) {
    if (solved) return;
    const t = [...tries, a];
    setTries(t);
    const c = checkAnswer(r, a);
    if (c.correct) {
      chime(t.length === 1 ? "streak" : "right");
      const text = teachFor(r);
      setNote({ text, good: true });
      setWrong([]);
      if (young) say(`weather-teach-${ri}`, text);
      finishRound(t);
      return;
    }
    chime("oops");
    setWrong(c.wrong ?? []);
    if (t.length >= MAX_TRIES) {
      const text = `Good try! ${c.note} The answer: ${answerText(r)}.`;
      setNote({ text, good: false });
      if (young) say(`weather-teach-${ri}`, `Good try! ${c.note}`);
      finishRound(t);
      return;
    }
    setNote({ text: c.note, good: false });
    if (young) say(`weather-hint-${ri}`, c.note);
  }

  function finishRound(t: string[]) {
    setMoves((m) => [...m, { tries: t }]);
    setSolved(true);
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setTries([]);
      setSolved(false);
      setWrong([]);
      setNote(null);
      setAsk(null);
      return;
    }
    setDone(true);
    setBusy(true);
    try {
      const res = await onFinish(moves);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
      if (young) say("weather-end", res.stars === 3 ? "Three stars! You are a super weather watcher!" : "Great job! Play again to earn more stars.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`mg ${css.weather}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Station report!</h2>
          <p className={css.big}>
            {"🌦️".repeat(Math.max(1, Math.round((points / max) * 5)))} {points} of {max} points
          </p>
          {busy && <p className="kmuted">Checking the weather log…</p>}
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
                  {young ? "Tip: look closely at the sky before you tap. Stars come from first tries." : "Tip: read the scale carefully and use the data before you choose. Stars come from first tries."}
                </p>
              )}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => {
              const p = scoreRound(level.rounds[i], m).points;
              return (
                <span key={i}>
                  {i + 1}. {p === 2 ? "⭐" : p === 1 ? "👍" : "🌱"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const prompt = ask ?? promptFor(r);
  const props = { solved, wrong, tries, frame, onAnswer: answer, onAsk };

  return (
    <div className={`mg ${css.weather}`}>
      <div className="mg-hud">
        <span className="chip">
          🌦️ {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={`${css.prompt} ${young ? css.young : ""}`}>
        <SayButton id={`weather-say-${ri}-${ask ? "a" : "p"}`} text={prompt} />
        <p>{prompt}</p>
      </div>

      {r.kind === "record" && <RecordRound key={ri} r={r} {...props} />}
      {r.kind === "count" && <CountRound key={ri} r={r} {...props} />}
      {r.kind === "dress" && <DressRound key={ri} r={r} {...props} />}
      {r.kind === "storm" && <StormRound key={ri} r={r} {...props} />}
      {r.kind === "kit" && <KitRound key={ri} r={r} {...props} />}
      {r.kind === "graph" && <GraphRound key={ri} r={r} {...props} />}
      {r.kind === "read" && <ReadRound key={ri} r={r} {...props} />}
      {r.kind === "predict" && <PredictRound key={ri} r={r} {...props} />}
      {r.kind === "climate" && <ClimateRound key={ri} r={r} {...props} />}
      {r.kind === "design" && <DesignRound key={ri} r={r} {...props} />}

      {note && (
        <div className={`day-report ${note.good ? "good" : "bad"} ${css.note}`} role="status">
          <SayButton id={`weather-note-${ri}-${tries.length}`} text={note.text} />
          <span>{note.text}</span>
        </div>
      )}

      {solved && (
        <button type="button" className="kbtn big game-btn" onClick={next}>
          {ri + 1 < level.rounds.length ? "Next ➜" : "Finish 🎉"}
        </button>
      )}
    </div>
  );
}

// ---------------- Kindergarten rounds ----------------

function RecordRound({ r, solved, wrong, frame, onAnswer }: RoundProps<"record">) {
  const n = r.days.length;
  const [chart, setChart] = useState<(Weather | null)[]>(() => Array(n).fill(null));
  const [sel, setSel] = useState(0);
  const full = chart.every(Boolean);

  function put(w: Weather) {
    if (solved) return;
    const c = [...chart];
    c[sel] = w;
    setChart(c);
    const empty = c.findIndex((x, i) => !x && i > sel);
    const any = c.findIndex((x) => !x);
    if (empty >= 0) setSel(empty);
    else if (any >= 0) setSel(any);
  }

  return (
    <>
      <div className={css.skyBox}>
        <PixelSprite grid={sky(r.days[sel], frame)} scale={6} className={css.skyImg} title={`The sky on ${DAY_NAMES[dayLabel(n, sel)] ?? dayLabel(n, sel)}`} />
        <span className={css.skyTag}>{DAY_NAMES[dayLabel(n, sel)] ?? dayLabel(n, sel)}</span>
      </div>
      <div className={css.chart} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }} role="group" aria-label="Weather chart">
        {r.days.map((d, i) => (
          <button
            key={i}
            type="button"
            className={`${css.slot} ${sel === i ? css.on : ""} ${wrong.includes(i) && !solved ? css.bad : ""}`}
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            aria-label={`${DAY_NAMES[dayLabel(n, i)] ?? dayLabel(n, i)}: ${chart[i] ?? "empty"}`}
          >
            <span className={css.slotDay}>{dayLabel(n, i)}</span>
            <PixelSprite grid={sky(d, 0)} scale={1} className={css.thumb} />
            <span className={css.slotSym}>{chart[i] ? WEATHER_INFO[chart[i]!].emoji : "❔"}</span>
          </button>
        ))}
      </div>
      <div className={css.symbols}>
        {WEATHERS.map((w) => (
          <button key={w} type="button" className={`kbtn game-btn ${css.sym}`} onClick={() => put(w)} disabled={solved} aria-label={WEATHER_INFO[w].name}>
            <span aria-hidden>{WEATHER_INFO[w].emoji}</span>
            <small>{WEATHER_INFO[w].name}</small>
          </button>
        ))}
      </div>
      {!solved && (
        <button type="button" className="kbtn big game-btn" disabled={!full} onClick={() => onAnswer(chart.join(","))}>
          Check my chart ✓
        </button>
      )}
    </>
  );
}

function CountRound({ r, solved, tries, onAnswer, onAsk }: RoundProps<"count">) {
  const n = r.days.length;
  const cols = columnsOf(r.days);
  const [sorted, setSorted] = useState<boolean[]>(() => Array(n).fill(false));
  const all = sorted.every(Boolean);
  const asked = useRef(false);
  useEffect(() => {
    if (all && !asked.current) {
      asked.current = true;
      onAsk(askFor(r));
    }
  }, [all, onAsk, r]);
  const pickRow = all && !solved && (r.ask === "most" || r.ask === "fewest");

  return (
    <>
      {!all && (
        <div className={css.days} role="group" aria-label="Days to sort">
          {r.days.map((d, i) => (
            <button
              key={i}
              type="button"
              className={`${css.day} ${sorted[i] ? css.gone : ""}`}
              onClick={() => setSorted((s) => s.map((x, j) => (j === i ? true : x)))}
              disabled={sorted[i]}
              aria-label={`${dayLabel(n, i)}: ${d}. Tap to sort.`}
            >
              <small>{dayLabel(n, i)}</small>
              <span aria-hidden>{sorted[i] ? "" : WEATHER_INFO[d].emoji}</span>
            </button>
          ))}
        </div>
      )}
      <div className={css.rows}>
        {cols.map((w) => {
          const got = r.days.filter((d, i) => d === w && sorted[i]).length;
          return (
            <button
              key={w}
              type="button"
              className={`${css.row} ${pickRow ? css.pick : ""} ${tries.includes(w) && !solved ? css.tried : ""}`}
              onClick={() => pickRow && onAnswer(w)}
              disabled={!pickRow || tries.includes(w)}
              aria-label={`The ${w} row${pickRow ? ". Tap to choose it." : ""}`}
            >
              <span className={css.rowHead}>
                <span aria-hidden>{WEATHER_INFO[w].emoji}</span>
                <small>{w}</small>
              </span>
              <span className={css.rowCells}>
                {Array.from({ length: got }, (_, k) => (
                  <span key={k} className={css.cell} aria-hidden>
                    {WEATHER_INFO[w].emoji}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
      {all && !solved && r.ask !== "most" && r.ask !== "fewest" && (
        <div className={css.tiles}>
          {Array.from({ length: 10 }, (_, k) => k + 1).map((k) => (
            <button key={k} type="button" className={`kbtn game-btn ${css.tile}`} onClick={() => onAnswer(String(k))} disabled={tries.includes(String(k))}>
              {k}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function DressRound({ r, solved, frame, onAnswer }: RoundProps<"dress">) {
  const [on, setOn] = useState<ItemId[]>([]);
  const toggle = (i: ItemId) => !solved && setOn((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  return (
    <>
      <div className={css.scene}>
        <div className={css.sceneSky}>
          <span className={css.skyTag}>{r.forecast ? "Tomorrow" : "Today"}</span>
          <PixelSprite grid={sky(r.weather, frame)} scale={4} className={css.skyImg} title={`A ${r.weather} sky`} />
          {r.forecast && <span className={css.forecast}>{WEATHER_INFO[r.weather].emoji}</span>}
        </div>
        <PixelSprite grid={kid(on)} scale={3} className={css.kid} title={on.length ? `Wearing: ${on.map((i) => ITEM_INFO[i].name).join(", ")}` : "Ready to get dressed"} />
      </div>
      <div className={css.wardrobe}>
        {ITEMS.map((i) => (
          <button
            key={i}
            type="button"
            className={`${css.item} ${on.includes(i) ? css.worn : ""}`}
            onClick={() => toggle(i)}
            aria-pressed={on.includes(i)}
            disabled={solved}
          >
            <PixelSprite grid={icon(i)} scale={3} />
            <small>{ITEM_INFO[i].name}</small>
          </button>
        ))}
      </div>
      {!solved && (
        <button type="button" className="kbtn big game-btn" disabled={!on.length} onClick={() => onAnswer(on.join(","))}>
          Go outside! 🚪
        </button>
      )}
    </>
  );
}

function StormRound({ r, solved, tries, frame, onAnswer }: RoundProps<"storm">) {
  return (
    <>
      <div className={css.storm}>
        <PixelSprite grid={sky("rainy", frame)} scale={4} className={css.skyImg} title="A dark, rainy storm sky" />
        <span className={`${css.bolt} ${frame ? css.flash : ""}`} aria-hidden>
          ⚡
        </span>
        <span className={css.boom} aria-hidden>
          BOOM!
        </span>
      </div>
      <div className={css.places}>
        {r.places.map((p) => (
          <button
            key={p}
            type="button"
            className={`kbtn game-btn ${css.place} ${tries.includes(p) && !PLACE_INFO[p].safe ? css.tried : ""}`}
            onClick={() => onAnswer(p)}
            disabled={solved || tries.includes(p)}
          >
            <span aria-hidden>{PLACE_INFO[p].emoji}</span>
            <small>{PLACE_INFO[p].name}</small>
          </button>
        ))}
      </div>
    </>
  );
}

function KitRound({ solved, onAnswer }: RoundProps<"kit">) {
  const [packed, setPacked] = useState<KitId[]>([]);
  const toggle = (k: KitId) => !solved && setPacked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  return (
    <>
      <div className={css.bag} aria-label={`Storm kit: ${packed.map((k) => KIT_INFO[k].name).join(", ") || "empty"}`}>
        <span className={css.bagIcon} aria-hidden>
          🎒
        </span>
        <span className={css.bagItems}>{packed.length ? packed.map((k) => <span key={k}>{KIT_INFO[k].emoji}</span>) : <small>Storm kit is empty</small>}</span>
      </div>
      <div className={css.kit}>
        {KIT.map((k) => (
          <button key={k} type="button" className={`${css.item} ${packed.includes(k) ? css.worn : ""}`} onClick={() => toggle(k)} aria-pressed={packed.includes(k)} disabled={solved}>
            <span className={css.kitEmoji} aria-hidden>
              {KIT_INFO[k].emoji}
            </span>
            <small>{KIT_INFO[k].name}</small>
          </button>
        ))}
      </div>
      {!solved && (
        <button type="button" className="kbtn big game-btn" disabled={!packed.length} onClick={() => onAnswer(packed.join(","))}>
          Pack it! 🎒
        </button>
      )}
    </>
  );
}

// ---------------- Grade 3: data ----------------

const SEASON_COLORS: Record<string, string> = { Win: "#4dabf7", Spr: "#51cf66", Sum: "#fab005", Fall: "#e8590c" };

function DataTable({ data, pick, tried }: { data: DataSet; pick?: (i: number) => void; tried?: string[] }) {
  return (
    <div className={css.tableWrap}>
      <table className={css.table}>
        <caption>
          {data.title} ({data.unit})
        </caption>
        <tbody>
          <tr>
            {data.labels.slice(0, data.values.length).map((l, i) => (
              <th key={i} scope="col">
                {pick ? (
                  <button type="button" className={css.cellBtn} onClick={() => pick(i)} disabled={tried?.includes(String(i))}>
                    {l}
                  </button>
                ) : (
                  l
                )}
              </th>
            ))}
          </tr>
          <tr>
            {data.values.map((v, i) => (
              <td key={i}>{v}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

interface GraphProps {
  data: DataSet;
  labels: string[];
  values: (number | null)[];
  /** Bars the kid can set. */
  editable?: number[];
  sel?: number;
  onSel?: (i: number) => void;
  onSet?: (i: number, v: number) => void;
  /** Tap a bar to answer. */
  pick?: (i: number) => void;
  tried?: string[];
  wrong?: number[];
  seasons?: boolean;
  showValues?: number[];
}

function BarGraph({ data, labels, values, editable = [], sel, onSel, onSet, pick, tried, wrong = [], seasons, showValues = [] }: GraphProps) {
  const { max, step } = data;
  const steps = max / step;
  const labelEvery = step * Math.ceil(steps / 5);
  const lines = Array.from({ length: steps + 1 }, (_, k) => k * step);

  function setFrom(e: React.PointerEvent<HTMLElement>, i: number) {
    if (!editable.includes(i) || !onSet) return;
    const box = (e.currentTarget.querySelector(`.${css.plotCol}`) as HTMLElement | null)?.getBoundingClientRect();
    if (!box) return;
    const f = 1 - (e.clientY - box.top) / box.height;
    const v = Math.max(0, Math.min(max, Math.round((f * max) / step) * step));
    onSel?.(i);
    onSet(i, v);
  }

  return (
    <div className={css.graph} aria-label={`Bar graph: ${data.title}`}>
      <div className={css.yAxis} aria-hidden>
        {lines
          .filter((v) => v % labelEvery === 0)
          .map((v) => (
            <span key={v} style={{ bottom: `${(v / max) * 100}%` }}>
              {v}
            </span>
          ))}
      </div>
      <div className={css.plot}>
        <div className={css.gridLines} aria-hidden>
          {lines.map((v) => (
            <span key={v} className={v % labelEvery === 0 ? css.major : ""} style={{ bottom: `${(v / max) * 100}%` }} />
          ))}
        </div>
        <div className={css.cols}>
          {labels.map((l, i) => {
            const v = values[i];
            const canEdit = editable.includes(i);
            const canPick = !!pick && !tried?.includes(String(i));
            const [top, sub] = l.split(" ");
            const color = seasons ? SEASON_COLORS[top] : undefined;
            return (
              <button
                key={i}
                type="button"
                className={`${css.col} ${sel === i && canEdit ? css.colSel : ""} ${wrong.includes(i) ? css.bad : ""} ${canPick ? css.pick : ""}`}
                onPointerDown={(e) => setFrom(e, i)}
                onClick={() => {
                  if (canEdit) onSel?.(i);
                  else if (canPick) pick!(i);
                }}
                disabled={!canEdit && !canPick}
                aria-label={`${l}: ${v === null ? "not set" : `${v} ${data.unit}`}`}
              >
                <span className={css.plotCol}>
                  {v === null ? (
                    <span className={css.unknown}>?</span>
                  ) : (
                    <span className={`${css.bar} ${canEdit ? css.barEdit : ""}`} style={{ height: `${(v / max) * 100}%`, background: color }}>
                      {(showValues.includes(i) || (canEdit && sel === i)) && <span className={css.barVal}>{v}</span>}
                    </span>
                  )}
                </span>
                <span className={css.xLabel}>
                  {top}
                  {sub && <small>{sub}</small>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stepper({ label, value, data, onSet }: { label: string; value: number | null; data: DataSet; onSet: (v: number) => void }) {
  const v = value ?? 0;
  return (
    <div className={css.stepper}>
      <button type="button" className={`kbtn game-btn ${css.stepBtn}`} onClick={() => onSet(Math.max(0, v - data.step))} aria-label={`Lower by ${data.step}`}>
        ▼
      </button>
      <span className={css.stepVal}>
        {label}: <b>{value === null ? "?" : value}</b> {data.unit}
      </span>
      <button type="button" className={`kbtn game-btn ${css.stepBtn}`} onClick={() => onSet(Math.min(data.max, v + data.step))} aria-label={`Raise by ${data.step}`}>
        ▲
      </button>
    </div>
  );
}

const longLabel = (l: string) => DAY_NAMES[l] ?? (/^(Win|Spr|Sum|Fall) \d$/.test(l) ? seasonWord(l) : l);

function GraphRound({ r, solved, wrong, onAnswer }: RoundProps<"graph">) {
  const n = r.data.values.length;
  const [vals, setVals] = useState<number[]>(() => Array(n).fill(0));
  const [sel, setSel] = useState(0);
  const set = (i: number, v: number) => !solved && setVals((a) => a.map((x, j) => (j === i ? v : x)));
  return (
    <>
      <DataTable data={r.data} />
      <BarGraph
        data={r.data}
        labels={r.data.labels}
        values={vals}
        editable={solved ? [] : vals.map((_, i) => i)}
        sel={sel}
        onSel={setSel}
        onSet={set}
        wrong={solved ? [] : wrong}
        showValues={solved ? vals.map((_, i) => i) : []}
      />
      {!solved && (
        <>
          <Stepper label={longLabel(r.data.labels[sel])} value={vals[sel]} data={r.data} onSet={(v) => set(sel, v)} />
          <button type="button" className="kbtn big game-btn" onClick={() => onAnswer(vals.join(","))}>
            Check my graph ✓
          </button>
        </>
      )}
    </>
  );
}

function NumberAnswer({ unit, disabled, onAnswer }: { unit: string; disabled: boolean; onAnswer: (a: string) => void }) {
  const [v, setV] = useState("");
  return (
    <form
      className={css.numForm}
      onSubmit={(e) => {
        e.preventDefault();
        if (v.trim()) onAnswer(v.trim());
      }}
    >
      <input
        className={css.numIn}
        value={v}
        onChange={(e) => setV(e.target.value.replace(/[^\d-]/g, "").slice(0, 5))}
        inputMode="numeric"
        autoComplete="off"
        aria-label="Your answer"
        placeholder="?"
        disabled={disabled}
      />
      <span className={css.unit}>{unit}</span>
      <button type="submit" className="kbtn game-btn" disabled={disabled || !v.trim()}>
        Check ✓
      </button>
    </form>
  );
}

function ReadRound({ r, solved, tries, onAnswer }: RoundProps<"read">) {
  const pickMode = r.ask.kind === "max" || r.ask.kind === "min";
  const pick = pickMode && !solved ? (i: number) => onAnswer(String(i)) : undefined;
  return (
    <>
      {r.show === "table" ? (
        <DataTable data={r.data} pick={pick} tried={tries} />
      ) : (
        <BarGraph data={r.data} labels={r.data.labels.slice(0, r.data.values.length)} values={r.data.values} pick={pick} tried={tries} seasons={/^(Win|Spr|Sum|Fall) \d$/.test(r.data.labels[0])} />
      )}
      {pickMode && !solved && <p className="kmuted small">Tap {r.show === "table" ? "a name in the table" : "a bar"} to answer.</p>}
      {!pickMode && <NumberAnswer unit={r.data.unit === "°F" ? "degrees" : r.data.unit} disabled={solved} onAnswer={onAnswer} />}
    </>
  );
}

function PredictRound({ r, solved, onAnswer }: RoundProps<"predict">) {
  const last = r.data.values.length;
  const [pred, setPred] = useState<number | null>(null);
  const values = [...r.data.values, pred];
  return (
    <>
      <p className={css.dataTitle}>
        {r.data.title} ({r.data.unit})
      </p>
      <BarGraph
        data={r.data}
        labels={r.data.labels}
        values={values}
        editable={solved ? [] : [last]}
        sel={last}
        onSet={(_, v) => !solved && setPred(v)}
        seasons
        showValues={pred === null ? [] : [last]}
      />
      <div className={css.legend} aria-hidden>
        {Object.entries(SEASON_COLORS).map(([s, c]) => (
          <span key={s}>
            <i style={{ background: c }} /> {s === "Win" ? "Winter" : s === "Spr" ? "Spring" : s === "Sum" ? "Summer" : "Fall"}
          </span>
        ))}
      </div>
      {!solved && (
        <>
          <Stepper label={`Predict ${r.next}`} value={pred} data={r.data} onSet={setPred} />
          <button type="button" className="kbtn big game-btn" disabled={pred === null} onClick={() => onAnswer(String(pred))}>
            Make my prediction 🔮
          </button>
        </>
      )}
    </>
  );
}

function ClimateRound({ r, solved, wrong, onAnswer }: RoundProps<"climate">) {
  const [match, setMatch] = useState<(ClimateId | null)[]>(() => r.places.map(() => null));
  const [sel, setSel] = useState(0);
  function put(c: ClimateId) {
    if (solved) return;
    const m = [...match];
    m[sel] = c;
    setMatch(m);
    const nextEmpty = m.findIndex((x) => !x);
    if (nextEmpty >= 0) setSel(nextEmpty);
  }
  const letter = (i: number) => String.fromCharCode(65 + i);
  return (
    <>
      <div className={css.placeList}>
        {r.places.map((p, i) => {
          const m = match[i];
          const named = !r.useData || solved;
          return (
            <button
              key={i}
              type="button"
              className={`${css.placeCard} ${sel === i && !solved ? css.on : ""} ${wrong.includes(i) && !solved ? css.bad : ""}`}
              onClick={() => setSel(i)}
              aria-pressed={sel === i}
              disabled={solved}
            >
              <span className={css.placeName}>
                {named ? (
                  <>
                    <span aria-hidden>{p.emoji}</span> {p.name}
                  </>
                ) : (
                  <>Place {letter(i)}</>
                )}
              </span>
              {r.useData ? (
                <span className={css.placeData}>
                  🌡️ warmest month {p.warm}°F · coldest month {p.cold}°F · 🌧️ {p.rain} in. a year
                </span>
              ) : (
                <span className={css.placeData}>{p.clue}</span>
              )}
              <span className={css.match}>{m ? `${CLIMATE_INFO[m].emoji} ${CLIMATE_INFO[m].name}` : "Tap, then pick a climate"}</span>
            </button>
          );
        })}
      </div>
      {!solved && (
        <>
          <div className={css.climates}>
            {CLIMATES.map((c) => (
              <button key={c} type="button" className={css.climate} onClick={() => put(c)}>
                <span>
                  {CLIMATE_INFO[c].emoji} {CLIMATE_INFO[c].name}
                </span>
                <small>{CLIMATE_INFO[c].text}</small>
              </button>
            ))}
          </div>
          <button type="button" className="kbtn big game-btn" disabled={match.some((m) => !m)} onClick={() => onAnswer(match.join(","))}>
            Check my matches ✓
          </button>
        </>
      )}
    </>
  );
}

const FAIL_ICON = { flood: "🌊", lightning: "🔥", wind: "💥" } as const;
const TRIAL_UNIT = { flood: " ft", lightning: "", wind: "" } as const;

function DesignRound({ r, solved, tries, onAnswer, onAsk }: RoundProps<"design">) {
  const t = r.test;
  const [tested, setTested] = useState<string[]>([]);
  const ready = tested.length >= 2;
  const asked = useRef(false);
  function test(id: string) {
    if (tested.includes(id)) return;
    const next = [...tested, id];
    setTested(next);
    const d = t.designs.find((x) => x.id === id)!;
    chime(passes(d, t).every(Boolean) ? "right" : "oops");
    if (next.length >= 2 && !asked.current) {
      asked.current = true;
      onAsk(askFor(r));
    }
  }
  return (
    <>
      <div className={css.trials}>
        <b>{t.trialName}:</b>
        {t.trials.map((tr) => (
          <span key={tr.label} className={css.trial}>
            {tr.label}
            {t.hazard === "flood" ? ` ${tr.value}${TRIAL_UNIT.flood}` : ""}
          </span>
        ))}
      </div>
      <div className={css.designs}>
        {t.designs.map((d) => {
          const res = passes(d, t);
          const shown = tested.includes(d.id) || solved;
          const triedIt = tries.includes(d.id);
          return (
            <div key={d.id} className={`${css.design} ${triedIt && !solved ? css.tried : ""}`}>
              <div className={css.designHead}>
                <span className={css.designEmoji} aria-hidden>
                  {d.emoji}
                </span>
                <span className={css.designName}>
                  {d.name}
                  <small>Cost: {d.costLabel}</small>
                </span>
              </div>
              <div className={css.results} aria-label={shown ? `Results: ${res.filter(Boolean).length} of ${res.length} tests passed` : "Not tested yet"}>
                {res.map((ok, k) => (
                  <span key={k} className={`${css.result} ${shown ? (ok ? css.pass : css.fail) : ""}`} title={t.trials[k].label}>
                    {shown ? (ok ? "✅" : FAIL_ICON[t.hazard]) : "·"}
                  </span>
                ))}
              </div>
              {!solved && (
                <div className={css.designBtns}>
                  {!tested.includes(d.id) ? (
                    <button type="button" className="kbtn" onClick={() => test(d.id)}>
                      Test 🔬
                    </button>
                  ) : (
                    <button type="button" className="kbtn game-btn" onClick={() => onAnswer(d.id)} disabled={!ready || triedIt}>
                      Choose ✓
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!solved && !ready && <p className="kmuted small">Test at least two designs. Then choose the best one.</p>}
    </>
  );
}
