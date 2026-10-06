"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useTeacherVoice, useVoiceSettings } from "../voice";
import { heroGrid, HAIRS, type Hero } from "@/lib/pixel/hero";
import type { Grid } from "@/lib/pixel/grid";
import {
  BILLS,
  MAX_TRIES,
  MONEY_NAME,
  POINTS_PER_ROUND,
  awningGrid,
  checkTry,
  counterGrid,
  fewestCoins,
  fmt,
  label,
  levelById,
  moneyGrid,
  priceOf,
  promptFor,
  scoreRound,
  speakable,
  sum,
  sumLine,
  teachFor,
  type CoinLevel,
  type CoinRound,
  type Item,
  type RoundMove,
  type Try,
} from "@/lib/minigames/coinshop";
import type { MiniGameUIProps } from "./types";
import css from "./CoinShopGame.module.css";

const AWNING = awningGrid(72);
const COUNTER = counterGrid(64);
const sprites = new Map<number, Grid>();
const money = (d: number) => {
  let g = sprites.get(d);
  if (!g) sprites.set(d, (g = moneyGrid(d)));
  return g;
};

function customer(i: number): Hero {
  return { skin: (i * 5 + 2) % 6, hair: HAIRS[(i * 4 + 1) % 6], hairColor: (i * 3 + 2) % 8, outfit: (i * 5 + 1) % 8, hat: "none", pet: "none" };
}

export default function CoinShopGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <CoinShop level={level} onFinish={onFinish} /> : null;
}

type Phase = "play" | "report";

function CoinShop({ level, onFinish }: { level: CoinLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const { speakOn } = useVoiceSettings();
  const voice = useTeacherVoice();
  const [ri, setRi] = useState(0);
  const r = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const [phase, setPhase] = useState<Phase>("play");
  const [tries, setTries] = useState<Try[]>([]);
  const [note, setNote] = useState<{ text: string; good: boolean } | null>(null);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  // working state for the current round
  const [tray, setTray] = useState<number[]>([]);
  const [digits, setDigits] = useState("");
  const [pick, setPick] = useState<number | null>(null);
  const [chosen, setChosen] = useState<number[]>([]);
  const [counted, setCounted] = useState<number[]>([]);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const young = level.grade <= 2;
  const prompt = promptFor(level, r);
  const helping = tries.length > 0 || phase === "report";

  const say = useCallback(
    (id: string, text: string) => {
      if (speakOn && text) speak(id, speakable(text), { kind: voice });
    },
    [speakOn, voice],
  );

  // Read each round aloud when it starts.
  const started = useRef(-1);
  useEffect(() => {
    if (started.current === ri || done) return;
    started.current = ri;
    say(`coin-${ri}`, prompt);
  }, [ri, prompt, say, done]);

  const points = moves.reduce((s, m, i) => s + scoreRound(level, level.rounds[i], m).points, 0);
  const max = level.rounds.length * POINTS_PER_ROUND;
  const amount = digits ? Number(digits) : undefined;

  function currentTry(): Try {
    switch (r.kind) {
      case "pay":
      case "change":
        return { coins: [...tray] };
      case "count":
      case "add":
        return { amount };
      case "compare":
        return { pick: pick ?? undefined, amount };
      case "budget":
        return { items: [...chosen], amount };
    }
  }

  const ready = (() => {
    switch (r.kind) {
      case "pay":
      case "change":
        return tray.length > 0;
      case "count":
      case "add":
        return digits.length > 0;
      case "compare":
        return pick !== null && digits.length > 0;
      case "budget":
        return chosen.length > 0 && digits.length > 0;
    }
  })();

  function check() {
    if (phase !== "play" || !ready) return;
    const t = currentTry();
    const all = [...tries, t];
    setTries(all);
    const c = checkTry(level, r, t);
    if (c.ok || all.length >= MAX_TRIES) {
      setMoves((m) => [...m, { tries: all }]);
      setPhase("report");
      const text = c.ok ? `${all.length === 1 ? "Yes! " : "Got it! "}${c.note}` : `${c.note} Here's how it works.`;
      setNote({ text, good: c.ok });
      chime(c.ok ? (all.length === 1 ? "streak" : "right") : "oops");
      if (young) say(`coin-fb-${ri}`, c.ok ? (all.length === 1 ? "Yes! Exactly right!" : "Got it!") : "Good try! Let's see how it works.");
      return;
    }
    chime("oops");
    setNote({ text: c.note, good: false });
    if (young) say(`coin-try-${ri}-${all.length}`, c.note);
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      setRi(ri + 1);
      setPhase("play");
      setTries([]);
      setNote(null);
      setTray([]);
      setDigits("");
      setPick(null);
      setChosen([]);
      setCounted([]);
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
      <div className={`mg ${css.shopGame}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Shop closed!</h2>
          <p>
            You earned <strong>{points}</strong> of {max} shop points.
          </p>
          {busy && <p className="kmuted">Counting the cash drawer…</p>}
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
                  {level.grade <= 2 ? "Tip: count the biggest coins first, then count on: 25, 50, 60, 65…" : "Tip: to make change, start at the price and count up to what the customer paid."}
                </p>
              )}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => (
              <span key={i}>
                Customer {i + 1} {"🪙".repeat(scoreRound(level, level.rounds[i], m).points) || "·"}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const playing = phase === "play";

  return (
    <div className={`mg ${css.shopGame}`}>
      <div className="mg-hud">
        <span className="chip">
          🏪 Customer {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">🪙 {points} pts</span>
        {playing && tries.length > 0 && (
          <span className="chip">
            Try {tries.length + 1} of {MAX_TRIES}
          </span>
        )}
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={css.shop}>
        <Strip grid={AWNING} />
        <div className={css.scene}>
          <span className={css.customer}>
            <PixelSprite grid={heroGrid(customer(ri))} scale={3} />
          </span>
          <Scene r={r} counted={counted} helping={helping} playing={playing} pick={pick} chosen={chosen} onCount={(i) => setCounted((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))} onPick={setPick} onChoose={(i) => setChosen((c) => (c.includes(i) ? c.filter((x) => x !== i) : c.length >= (r.kind === "budget" ? r.need : 0) ? c : [...c, i]))} />
        </div>
        <Strip grid={COUNTER} />
      </div>

      <p className={css.ask}>
        {prompt}
        <SayButton id={`coin-say-${ri}`} text={speakable(prompt)} />
      </p>

      {playing && (r.kind === "pay" || r.kind === "change") && (
        <TrayArea level={level} r={r} tray={tray} setTray={setTray} />
      )}

      {playing && r.kind !== "pay" && r.kind !== "change" && (
        <>
          {r.kind === "budget" && (
            <p className={css.status}>
              Picked {chosen.length} of {r.need}
              {helping && chosen.length > 0 && <> · total {fmt(sum(chosen.map((i) => r.shelf[i].price)))}</>}
            </p>
          )}
          <Keypad digits={digits} setDigits={setDigits} label={r.kind === "count" ? "How much money?" : r.kind === "add" ? "Total cost" : r.kind === "compare" ? "How much more?" : "Money left"} />
        </>
      )}

      {playing && (
        <div className={css.row}>
          <button type="button" className={`kbtn big game-btn ${css.checkBtn}`} onClick={check} disabled={!ready}>
            Check ✓
          </button>
        </div>
      )}

      {note && (
        <div className={`day-report ${note.good ? "good" : "bad"}`} role="status">
          <strong>{note.text}</strong>
          {phase === "report" && !(note.good && r.kind === "budget") &&
            teachFor(level, r).map((line, i) => (
              <div key={i} className="math-line">
                {line}
              </div>
            ))}
        </div>
      )}

      {phase === "report" && (
        <button type="button" className="kbtn big game-btn" onClick={next}>
          {ri + 1 < level.rounds.length ? "Next customer ➜" : "Close the shop 🎉"}
        </button>
      )}
    </div>
  );
}

/** What's on the counter: the things for sale, the customer's coins, baskets or the shelf. */
function Scene({
  r,
  counted,
  helping,
  playing,
  pick,
  chosen,
  onCount,
  onPick,
  onChoose,
}: {
  r: CoinRound;
  counted: number[];
  helping: boolean;
  playing: boolean;
  pick: number | null;
  chosen: number[];
  onCount: (i: number) => void;
  onPick: (i: number) => void;
  onChoose: (i: number) => void;
}) {
  switch (r.kind) {
    case "pay":
    case "add":
      return (
        <div className={css.goods}>
          {r.items.map((it, i) => (
            <Tag key={i} item={it} />
          ))}
        </div>
      );
    case "change":
      return (
        <div className={css.goods}>
          {r.items.map((it, i) => (
            <Tag key={i} item={it} />
          ))}
          <span className={css.paid}>
            <span className={css.small}>Pays with</span>
            <span className={css.bills}>
              {fewestCoins(r.paid, BILLS).map((d, i) => (
                <Money key={i} d={d} scale={2} />
              ))}
            </span>
          </span>
        </div>
      );
    case "count": {
      // Counting on, in the order the kid tapped the coins.
      let run = 0;
      const steps = counted.map((i) => (run += r.coins[i]));
      return (
        <div className={css.countWrap}>
          <div className={css.pile}>
            {r.coins.map((d, i) => (
              <button key={i} type="button" className={`${css.pileCoin} ${counted.includes(i) ? css.counted : ""}`} onClick={() => onCount(i)} disabled={!playing} aria-label={`${MONEY_NAME[d].one}, ${label(d)}${counted.includes(i) ? ", counted" : ""}`}>
                <Money d={d} scale={d >= 100 ? 2 : 3} />
                {d < 100 && <span className={css.coinValue}>{label(d)}</span>}
                {counted.includes(i) && <span className={css.tick}>{counted.indexOf(i) + 1}</span>}
              </button>
            ))}
          </div>
          <p className={css.small}>{helping && steps.length > 0 ? `Counting on: ${steps.map(fmt).join(" → ")}` : "Tap each coin as you count it."}</p>
        </div>
      );
    }
    case "compare":
      return (
        <div className={css.baskets}>
          {[r.a, r.b].map((items, b) => (
            <button key={b} type="button" className={`${css.basket} ${pick === b ? css.picked : ""}`} onClick={() => onPick(b)} disabled={!playing} aria-pressed={pick === b}>
              <b>Basket {b === 0 ? "A" : "B"} 🧺</b>
              {items.map((it, i) => (
                <span key={i} className={css.line}>
                  {it.emoji} {fmt(it.price)}
                </span>
              ))}
            </button>
          ))}
        </div>
      );
    case "budget":
      return (
        <div className={css.countWrap}>
          <p className={css.small}>
            👛 Has <b>{fmt(r.budget)}</b> · tap {r.need} things
          </p>
          <div className={css.shelf}>
            {r.shelf.map((it, i) => (
              <button key={i} type="button" className={`${css.shelfItem} ${chosen.includes(i) ? css.picked : ""}`} onClick={() => onChoose(i)} disabled={!playing} aria-pressed={chosen.includes(i)} aria-label={`${it.name}, ${fmt(it.price)}`}>
                <span className={css.emoji}>{it.emoji}</span>
                <span className={css.price}>{fmt(it.price)}</span>
              </button>
            ))}
          </div>
        </div>
      );
  }
}

function Tag({ item }: { item: Item }) {
  return (
    <span className={css.tag} aria-label={`${item.name}, ${fmt(item.price)}`}>
      <span className={css.emoji}>{item.emoji}</span>
      <span className={css.price}>{fmt(item.price)}</span>
    </span>
  );
}

function Money({ d, scale }: { d: number; scale: number }) {
  return (
    <span className={css.money}>
      <PixelSprite grid={money(d)} scale={scale} />
      {d >= 100 && <span className={css.billValue}>${d / 100}</span>}
    </span>
  );
}

/** The tray on the counter and the cash drawer of coins and bills to tap. */
function TrayArea({ level, r, tray, setTray }: { level: CoinLevel; r: Extract<CoinRound, { kind: "pay" | "change" }>; tray: number[]; setTray: (t: number[]) => void }) {
  const sorted = [...tray].sort((a, b) => b - a);
  let readout: string;
  if (r.kind === "pay") {
    readout = tray.length ? sumLine(tray) : "Tray: 0¢";
  } else {
    // Counting up from the price, small coins first, like a real shopkeeper.
    const price = priceOf(r.items);
    let run = price;
    const ups = [...tray].sort((a, b) => a - b).map((c) => (run += c));
    readout = `${fmt(price)}${ups.map((u) => ` → ${fmt(u)}`).join("")}${tray.length ? ` (change ${fmt(sum(tray))})` : ""}`;
  }
  return (
    <>
      <div className={css.tray} aria-label={`Tray: ${fmt(sum(tray))}`}>
        {sorted.length === 0 && <span className={css.small}>{r.kind === "pay" ? "Tap money below to put it here." : "Put the change here."}</span>}
        {sorted.map((d, i) => (
          <button
            key={`${d}-${i}`}
            type="button"
            className={css.trayCoin}
            onClick={() => {
              const k = tray.indexOf(d);
              setTray(tray.filter((_, j) => j !== k));
            }}
            aria-label={`Take back a ${MONEY_NAME[d].one}`}
          >
            <Money d={d} scale={2} />
          </button>
        ))}
      </div>
      <p className={css.readout}>{readout}</p>
      <div className={css.drawer}>
        {level.money.map((d) => (
          <button key={d} type="button" className={css.bin} onClick={() => tray.length < 40 && setTray([...tray, d])} aria-label={`Add a ${MONEY_NAME[d].one}, ${label(d)}`}>
            <Money d={d} scale={d >= 100 ? 2 : 3} />
            <span className={css.binLabel}>{d < 100 ? `${MONEY_NAME[d].one} ${label(d)}` : "bill"}</span>
          </button>
        ))}
      </div>
      <div className={css.row}>
        <button type="button" className="kbtn" onClick={() => setTray([])} disabled={tray.length === 0}>
          Clear tray
        </button>
      </div>
    </>
  );
}

/** A cash-register number pad: digits slide in from the right ($0.00 → $0.01 → $0.15 → $1.50). */
function Keypad({ digits, setDigits, label: title }: { digits: string; setDigits: (d: string) => void; label: string }) {
  const cents = digits ? Number(digits) : 0;
  const press = (k: string) => {
    if (k === "⌫") setDigits(digits.slice(0, -1));
    // "0" alone is allowed (nothing left); otherwise no leading zeros.
    else if (digits.length < 5) setDigits(digits === "0" ? k : digits + k);
  };
  return (
    <div className={css.keypad}>
      <div className={css.display} aria-live="polite">
        <span className={css.small}>{title}</span>
        <b>${(cents / 100).toFixed(2)}</b>
        {cents > 0 && cents < 100 && <span className={css.small}>= {cents}¢</span>}
      </div>
      <div className={css.keys}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "C"].map((k) => (
          <button key={k} type="button" className={css.key} onClick={() => (k === "C" ? setDigits("") : press(k))} aria-label={k === "⌫" ? "Delete" : k === "C" ? "Clear" : k}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A repeating pixel strip (awning, counter) at a fixed pixel size, cut to the shop's width. */
function Strip({ grid }: { grid: Grid }) {
  return (
    <div className={css.strip} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <PixelSprite key={i} grid={grid} scale={3} />
      ))}
    </div>
  );
}
