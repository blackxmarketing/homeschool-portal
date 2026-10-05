"use client";

import { useMemo, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { heroGrid, HAIRS, type Hero } from "@/lib/pixel/hero";
import { propGrid } from "@/lib/pixel/objects";
import { demand, forecast, playDay, WEATHER, type DayResult, type LemonadeLevel } from "@/lib/minigames/lemonade";

const usd = (n: number) => `$${n.toFixed(2)}`;

/** A random-looking customer (the same one for the same index). */
function customer(i: number): Hero {
  return { skin: (i * 7) % 6, hair: HAIRS[(i * 5) % HAIRS.length], hairColor: (i * 3) % 8, outfit: (i * 11) % 8, hat: "none", pet: "none" };
}

/** What the kid can learn from how the day went. */
function lesson(r: DayResult, level: LemonadeLevel): string {
  if (r.made === 0) return "You didn't make any cups, so you couldn't sell any. No risk, but no profit either!";
  if (r.sold < r.made) {
    const wasted = r.made - r.sold;
    return `You made ${wasted} more cups than people wanted. That's ${usd(wasted * level.cupCost)} poured away. Check the forecast and make fewer next time${r.wanted < 5 ? ", or lower the price so more people want one" : ""}.`;
  }
  if (r.wanted > r.made) return `${r.wanted - r.made} more customers wanted a cup, but you ran out! Making more cups could have earned more.`;
  return "You made exactly what people wanted. Sharp!";
}

export default function LemonadeGame({ level, onFinish }: { level: LemonadeLevel; onFinish: (moves: { made: number; price: number }[]) => Promise<{ stars: number; xp: number }> }) {
  const days = useMemo(() => forecast(level), [level]);
  const [day, setDay] = useState(0);
  const [cash, setCash] = useState(level.startCash);
  const [made, setMade] = useState(10);
  const [price, setPrice] = useState(Math.round(level.maxPrice * 40) / 100);
  const [log, setLog] = useState<DayResult[]>([]);
  const [moves, setMoves] = useState<{ made: number; price: number }[]>([]);
  const [last, setLast] = useState<DayResult | null>(null);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [busy, setBusy] = useState(false);

  const finished = day >= level.days;
  const profit = Math.round((cash - level.startCash) * 100) / 100;
  const affordable = Math.floor(cash / level.cupCost + 1e-9);
  const cups = Math.min(made, affordable);
  const weather = days[Math.min(day, days.length - 1)];

  async function open() {
    const r = playDay(level, day, cash, cups, price);
    const nextMoves = [...moves, { made: cups, price }];
    setMoves(nextMoves);
    setLog((l) => [...l, r]);
    setLast(r);
    setCash(r.cash);
    setDay((d) => d + 1);
    chime(r.profit > 0 ? "right" : "oops");
    if (day + 1 >= level.days) {
      setBusy(true);
      try {
        const res = await onFinish(nextMoves);
        setResult(res);
        if (res.stars > 0) setTimeout(() => chime("streak"), 400);
      } finally {
        setBusy(false);
      }
    }
  }

  return (
    <div className="mg lemonade">
      <div className="mg-hud">
        <span className="chip">📅 Day {Math.min(day + 1, level.days)} of {level.days}</span>
        <span className="chip coin">💵 {usd(cash)}</span>
        <span className={`chip ${profit >= level.goal ? "hot" : ""}`}>
          Profit {usd(profit)} / goal {usd(level.goal)}
        </span>
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${Math.max(0, Math.min(100, (profit / level.goal) * 100))}%` }} />
      </div>

      <div className="forecast" aria-label="Weather forecast">
        {days.map((w, i) => (
          <span key={i} className={`fc ${i === day ? "now" : ""} ${i < day ? "past" : ""}`} title={WEATHER[w].label}>
            <span className="fc-day">D{i + 1}</span>
            <span className="fc-icon">{WEATHER[w].icon}</span>
          </span>
        ))}
      </div>

      <div className="mg-scene stand-scene">
        <div className="stand">
          <PixelSprite grid={propGrid("stall")} scale={6} />
          <div className="stand-sign">Lemonade {usd(price)}</div>
        </div>
        <div className="customers" aria-label={last ? `${last.sold} customers bought lemonade` : "Waiting for customers"}>
          {last &&
            Array.from({ length: Math.min(last.sold, 14) }, (_, i) => (
              <span key={`${day}-${i}`} className="customer" style={{ animationDelay: `${i * 0.12}s` }}>
                <PixelSprite grid={heroGrid(customer(i + day * 3))} scale={2} />
              </span>
            ))}
          {last && last.sold > 14 && <span className="more">+{last.sold - 14}</span>}
        </div>
        <div className="weather-now">{WEATHER[weather].icon}</div>
      </div>

      {last && (
        <div className={`day-report ${last.profit >= 0 ? "good" : "bad"}`}>
          <strong>
            Day {last.day + 1} ({WEATHER[last.weather].icon} {WEATHER[last.weather].label}):
          </strong>{" "}
          {last.wanted} people wanted lemonade. You made {last.made} and sold {last.sold}.
          <div className="math-line">
            Revenue {last.sold} × {usd(last.price)} = {usd(last.revenue)} − cost {last.made} × {usd(level.cupCost)} = {usd(last.cost)} →{" "}
            <strong>profit {usd(last.profit)}</strong>
          </div>
          <div className="kmuted small">{lesson(last, level)}</div>
        </div>
      )}

      {!finished ? (
        <div className="mg-controls">
          <label>
            Cups to make: <strong>{cups}</strong> <span className="kmuted small">(can afford {affordable})</span>
            <input type="range" min={0} max={Math.max(1, Math.min(120, affordable))} value={cups} onChange={(e) => setMade(Number(e.target.value))} />
          </label>
          <label>
            Price per cup: <strong>{usd(price)}</strong>
            <input type="range" min={0.05} max={level.maxPrice} step={0.05} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </label>
          <div className="kmuted small">
            Making {cups} cups costs {usd(cups * level.cupCost)}. At {usd(price)}, about {demand(weather, price, level.maxPrice)} people want one on a {WEATHER[weather].label.toLowerCase()} day…
            if you&apos;ve got enough cups!
          </div>
          <button className="kbtn big game-btn" onClick={open}>
            Open the stand ☀️
          </button>
        </div>
      ) : (
        <div className="mg-result">
          <h2 className="pixel-title">{profit >= level.goal ? "Goal reached!" : "Stand closed"}</h2>
          <p>
            You finished with {usd(cash)}: a profit of <strong>{usd(profit)}</strong> (goal {usd(level.goal)}).
          </p>
          {busy && <p className="kmuted">Counting the coins…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: match your cups to the forecast, and try a few prices to find where profit per day is biggest.</p>}
            </>
          )}
          <div className="day-log">
            {log.map((r) => (
              <span key={r.day}>
                D{r.day + 1} {WEATHER[r.weather].icon} {usd(r.profit)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
