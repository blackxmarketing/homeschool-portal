"use client";

import { useMemo, useState } from "react";
import type { PublicWidget } from "@/lib/teaching";

/**
 * Interactive visuals for lessons. Activity widgets (sort, sequence,
 * highlight) send the kid's answer to `onCheck`, which grades it on the
 * server and returns which parts are right.
 */

export type CheckFn = (answer: number[]) => Promise<{ correct: boolean; parts: boolean[]; solution?: number[] | null; done?: boolean }>;

const money = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: n % 1 ? 2 : 0 })}`;

function Slider({ label, value, min, max, step = 1, onChange, fmt = String }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; fmt?: (n: number) => string }) {
  return (
    <label className="w-slider">
      <span>
        {label}: <strong>{fmt(value)}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

// ---------------- Activities ----------------

function Sort({ w, onCheck }: { w: Extract<PublicWidget, { type: "sort" }>; onCheck?: CheckFn }) {
  const [placed, setPlaced] = useState<Record<number, number>>({});
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<{ parts: boolean[]; correct: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const unplaced = w.items.filter((it) => placed[it.id] === undefined);

  function place(bucket: number) {
    if (picked === null) return;
    setPlaced((p) => ({ ...p, [picked]: bucket }));
    setPicked(null);
    setResult(null);
  }
  async function check() {
    if (!onCheck) return;
    setBusy(true);
    const answer = Array.from({ length: w.items.length }, (_, i) => placed[i] ?? -1);
    const r = await onCheck(answer).finally(() => setBusy(false));
    if (r.solution) setPlaced(Object.fromEntries(r.solution.map((b, i) => [i, b])));
    setResult(r.solution ? { correct: true, parts: r.solution.map(() => true) } : r);
  }

  return (
    <div className="w-box">
      <div className="w-prompt">{w.prompt}</div>
      <div className="w-hintline">Tap an item, then tap the group it belongs in.</div>
      <div className="w-chips">
        {unplaced.map((it) => (
          <button key={it.id} className={`w-chip ${picked === it.id ? "picked" : ""}`} onClick={() => setPicked(it.id)}>
            {it.text}
          </button>
        ))}
      </div>
      <div className="w-buckets">
        {w.buckets.map((b, bi) => (
          <div key={bi} className={`w-bucket ${picked !== null ? "ready" : ""}`} onClick={() => place(bi)} role="button" tabIndex={0}>
            <div className="w-bucket-title">{b}</div>
            {w.items
              .filter((it) => placed[it.id] === bi)
              .map((it) => (
                <button
                  key={it.id}
                  className={`w-chip small ${result ? (result.parts[it.id] ? "right" : "wrong") : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaced((p) => {
                      const n = { ...p };
                      delete n[it.id];
                      return n;
                    });
                    setResult(null);
                  }}
                >
                  {it.text}
                </button>
              ))}
          </div>
        ))}
      </div>
      {onCheck && (
        <button className="kbtn" disabled={busy || unplaced.length > 0 || result?.correct} onClick={check}>
          {result?.correct ? "✅ All sorted!" : "Check my sorting"}
        </button>
      )}
      {result && !result.correct && <div className="w-feedback">Red ones are in the wrong group. Tap them to move them, then check again.</div>}
    </div>
  );
}

function Sequence({ w, onCheck }: { w: Extract<PublicWidget, { type: "sequence" }>; onCheck?: CheckFn }) {
  const [order, setOrder] = useState(w.steps);
  const [result, setResult] = useState<{ parts: boolean[]; correct: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const n = [...order];
    [n[i], n[j]] = [n[j], n[i]];
    setOrder(n);
    setResult(null);
  };
  async function check() {
    if (!onCheck) return;
    setBusy(true);
    const r = await onCheck(order.map((s) => s.id)).finally(() => setBusy(false));
    if (r.solution) {
      setOrder([...w.steps].sort((a, b) => a.id - b.id));
      setResult({ correct: true, parts: w.steps.map(() => true) });
    } else setResult(r);
  }
  return (
    <div className="w-box">
      <div className="w-prompt">{w.prompt}</div>
      <div className="w-hintline">Use the arrows to put them in order.</div>
      <ol className="w-seq">
        {order.map((s, i) => (
          <li key={s.id} className={result ? (result.parts[i] ? "right" : "wrong") : ""}>
            <span className="w-seq-num">{i + 1}</span>
            <span className="w-seq-text">{s.text}</span>
            <span className="w-seq-btns">
              <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                ▲
              </button>
              <button onClick={() => move(i, 1)} disabled={i === order.length - 1} aria-label="Move down">
                ▼
              </button>
            </span>
          </li>
        ))}
      </ol>
      {onCheck && (
        <button className="kbtn" disabled={busy || result?.correct} onClick={check}>
          {result?.correct ? "✅ Perfect order!" : "Check the order"}
        </button>
      )}
      {result && !result.correct && <div className="w-feedback">Green ones are in the right spot. Move the red ones and try again.</div>}
    </div>
  );
}

function Highlight({ w, onCheck }: { w: Extract<PublicWidget, { type: "highlight" }>; onCheck?: CheckFn }) {
  const [sel, setSel] = useState<number[]>([]);
  const [result, setResult] = useState<{ parts: boolean[]; correct: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  async function check() {
    if (!onCheck) return;
    setBusy(true);
    const r = await onCheck(sel).finally(() => setBusy(false));
    if (r.solution) {
      setSel(r.solution);
      setResult({ correct: true, parts: w.sentences.map(() => true) });
    } else setResult(r);
  }
  return (
    <div className="w-box">
      <div className="w-prompt">{w.prompt}</div>
      <div className="w-hintline">
        Tap {w.count === 1 ? "the sentence" : `${w.count} sentences`}.
      </div>
      <div className="w-hl">
        {w.sentences.map((s, i) => (
          <span
            key={i}
            role="button"
            tabIndex={0}
            className={`w-hl-s ${sel.includes(i) ? "on" : ""} ${result && !result.parts[i] ? "wrong" : ""}`}
            onClick={() => {
              setSel((x) => (x.includes(i) ? x.filter((v) => v !== i) : [...x, i]));
              setResult(null);
            }}
          >
            {s}{" "}
          </span>
        ))}
      </div>
      {onCheck && (
        <button className="kbtn" disabled={busy || sel.length === 0 || result?.correct} onClick={check}>
          {result?.correct ? "✅ Nailed it!" : "Check"}
        </button>
      )}
      {result && !result.correct && <div className="w-feedback">Not quite. The ones marked in red need another look.</div>}
    </div>
  );
}

// ---------------- Explorable visuals ----------------

function Flip({ cards }: { cards: { front: string; back: string }[] }) {
  const [open, setOpen] = useState<number[]>([]);
  return (
    <div className="w-flip-grid">
      {cards.map((c, i) => (
        <button key={i} className={`w-flip ${open.includes(i) ? "open" : ""}`} onClick={() => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))}>
          <span className="w-flip-inner">{open.includes(i) ? c.back : c.front}</span>
          <span className="w-flip-tag">{open.includes(i) ? "tap to flip back" : "tap to flip"}</span>
        </button>
      ))}
    </div>
  );
}

function Timeline({ events }: { events: { year: number; label: string; detail: string }[] }) {
  const sorted = useMemo(() => [...events].sort((a, b) => a.year - b.year), [events]);
  const [i, setI] = useState(0);
  const lo = sorted[0]?.year ?? 0;
  const hi = sorted[sorted.length - 1]?.year ?? 1;
  const pos = (y: number) => (hi === lo ? 50 : 4 + ((y - lo) / (hi - lo)) * 92);
  const fmtYear = (y: number) => (y < 0 ? `${-y} BC` : String(y));
  return (
    <div className="w-box">
      <div className="w-tl">
        <div className="w-tl-line" />
        {sorted.map((e, k) => (
          <button key={k} className={`w-tl-dot ${k === i ? "on" : ""}`} style={{ left: `${pos(e.year)}%` }} onClick={() => setI(k)} aria-label={e.label}>
            <span className="w-tl-year">{fmtYear(e.year)}</span>
          </button>
        ))}
      </div>
      {sorted[i] && (
        <div className="w-tl-card">
          <strong>
            {fmtYear(sorted[i].year)}: {sorted[i].label}
          </strong>
          <div>{sorted[i].detail}</div>
          <div className="btnrow" style={{ marginTop: 8 }}>
            <button className="kbtn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>
              ← Earlier
            </button>
            <button className="kbtn ghost" disabled={i === sorted.length - 1} onClick={() => setI(i + 1)}>
              Later →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Hotspots({ w }: { w: Extract<PublicWidget, { type: "hotspots" }> }) {
  const [i, setI] = useState<number | null>(null);
  const n = w.spots.length;
  return (
    <div className="w-box">
      <div className="w-prompt">{w.title}</div>
      <div className="w-hot">
        <div className="w-hot-center">{w.center}</div>
        {w.spots.map((s, k) => {
          const a = (k / n) * 2 * Math.PI - Math.PI / 2;
          return (
            <button
              key={k}
              className={`w-hot-spot ${i === k ? "on" : ""}`}
              style={{ left: `${50 + 38 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%` }}
              onClick={() => setI(k)}
            >
              <span className="w-hot-icon">{s.icon}</span>
              <span className="w-hot-label">{s.label}</span>
            </button>
          );
        })}
      </div>
      <div className="w-tl-card">{i === null ? "Tap each part to explore it." : <><strong>{w.spots[i].icon} {w.spots[i].label}:</strong> {w.spots[i].detail}</>}</div>
    </div>
  );
}

function Compare({ w }: { w: Extract<PublicWidget, { type: "compare" }> }) {
  return (
    <div className="w-compare">
      {[w.left, w.right].map((side, k) => (
        <div key={k} className={`w-compare-col ${k ? "b" : "a"}`}>
          <div className="w-compare-title">{side.title}</div>
          <ul>
            {side.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Compound({ w }: { w: Extract<PublicWidget, { type: "compound" }> }) {
  const [p, setP] = useState(w.principal);
  const [r, setR] = useState(w.rate);
  const [y, setY] = useState(w.years);
  const rows = Array.from({ length: y + 1 }, (_, t) => ({ t, simple: p * (1 + (r / 100) * t), compound: p * (1 + r / 100) ** t }));
  const max = rows[rows.length - 1].compound;
  return (
    <div className="w-box">
      <div className="w-sliders">
        <Slider label="Start with" value={p} min={10} max={Math.max(5000, w.principal)} step={10} onChange={setP} fmt={money} />
        <Slider label="Interest rate" value={r} min={1} max={Math.max(15, w.rate)} onChange={setR} fmt={(n) => `${n}%`} />
        <Slider label="Years" value={y} min={1} max={Math.max(40, w.years)} onChange={setY} />
      </div>
      <div className="w-bars">
        {rows.filter((_, i) => rows.length <= 21 || i % Math.ceil(rows.length / 20) === 0 || i === rows.length - 1).map((row) => (
          <div key={row.t} className="w-bar-col" title={`Year ${row.t}`}>
            <span className="w-bar compound" style={{ height: `${(row.compound / max) * 100}%` }} />
            <span className="w-bar simple" style={{ height: `${(row.simple / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="w-legend">
        <span className="dot compound" /> Compound: <strong>{money(Math.round(rows[y].compound * 100) / 100)}</strong>
        <span className="dot simple" /> Simple: <strong>{money(Math.round(rows[y].simple * 100) / 100)}</strong>
      </div>
      <div className="w-hintline">Rule of 72: doubles in about {Math.round((72 / r) * 10) / 10} years at {r}%.</div>
    </div>
  );
}

function Budget({ w }: { w: Extract<PublicWidget, { type: "budget" }> }) {
  const [income, setIncome] = useState(w.income);
  const [pcts, setPcts] = useState(w.categories.map((c) => c.pct));
  const total = pcts.reduce((a, b) => a + b, 0);
  const colors = ["var(--k-accent)", "var(--k-accent2)", "var(--k-lime)", "var(--k-warn)", "var(--k-pink)"];
  return (
    <div className="w-box">
      <Slider label="Money coming in" value={income} min={10} max={1000} step={10} onChange={setIncome} fmt={money} />
      <div className="w-stack">
        {w.categories.map((c, i) => (
          <span key={c.label} style={{ width: `${(pcts[i] / Math.max(total, 100)) * 100}%`, background: colors[i % colors.length] }} title={c.label} />
        ))}
      </div>
      {w.categories.map((c, i) => (
        <Slider
          key={c.label}
          label={`${c.label} (${money(Math.round(income * pcts[i]) / 100)})`}
          value={pcts[i]}
          min={0}
          max={100}
          onChange={(v) => setPcts((p) => p.map((x, k) => (k === i ? v : x)))}
          fmt={(n) => `${n}%`}
        />
      ))}
      <div className={`w-feedback ${total === 100 ? "ok" : ""}`}>
        {total === 100 ? "Every dollar has a job. That's a balanced budget!" : total > 100 ? `That's ${total}%: you're planning to spend more than you have.` : `${100 - total}% isn't assigned yet. Give every dollar a job.`}
      </div>
    </div>
  );
}

function Profit({ w }: { w: Extract<PublicWidget, { type: "profit" }> }) {
  const [price, setPrice] = useState(w.price);
  const [cost, setCost] = useState(w.cost);
  const [fixed, setFixed] = useState(w.fixed);
  const [units, setUnits] = useState(w.units);
  const revenue = price * units;
  const costs = fixed + cost * units;
  const profit = revenue - costs;
  const perUnit = price - cost;
  const breakEven = perUnit > 0 ? Math.ceil(fixed / perUnit) : null;
  const top = Math.max(revenue, costs, 1);
  return (
    <div className="w-box">
      <div className="w-sliders">
        <Slider label="Price each" value={price} min={0.5} max={50} step={0.5} onChange={setPrice} fmt={money} />
        <Slider label="Cost to make each" value={cost} min={0} max={40} step={0.25} onChange={setCost} fmt={money} />
        <Slider label="One-time costs" value={fixed} min={0} max={500} step={5} onChange={setFixed} fmt={money} />
        <Slider label="Units sold" value={units} min={0} max={200} onChange={setUnits} />
      </div>
      <div className="w-pl">
        <div className="w-pl-row">
          <span>Revenue</span>
          <span className="w-pl-bar"><span style={{ width: `${(revenue / top) * 100}%`, background: "var(--k-lime)" }} /></span>
          <strong>{money(revenue)}</strong>
        </div>
        <div className="w-pl-row">
          <span>Costs</span>
          <span className="w-pl-bar"><span style={{ width: `${(costs / top) * 100}%`, background: "#f87171" }} /></span>
          <strong>{money(costs)}</strong>
        </div>
      </div>
      <div className={`w-feedback ${profit >= 0 ? "ok" : ""}`}>
        {profit >= 0 ? `Profit: ${money(profit)} 🎉` : `Loss: ${money(-profit)}`} ·{" "}
        {breakEven === null ? "Each sale loses money: raise the price or cut the cost." : `Break even at ${breakEven} sales (${money(perUnit)} profit per sale after costs).`}
      </div>
    </div>
  );
}

function Lever() {
  const [load, setLoad] = useState(20);
  const [fulcrum, setFulcrum] = useState(30);
  // Beam from 0 to 100; load sits at 5, the push at 95.
  const loadArm = Math.max(1, fulcrum - 5);
  const effortArm = Math.max(1, 95 - fulcrum);
  const effort = Math.round(((load * loadArm) / effortArm) * 10) / 10;
  const advantage = Math.round((effortArm / loadArm) * 10) / 10;
  return (
    <div className="w-box">
      <svg viewBox="0 0 400 150" className="w-svg" role="img" aria-label="Lever">
        <rect x={20} y={70} width={360} height={8} rx={4} fill="var(--k-accent2)" />
        <polygon points={`${20 + fulcrum * 3.6},78 ${8 + fulcrum * 3.6},110 ${32 + fulcrum * 3.6},110`} fill="var(--k-warn)" />
        <rect x={20} y={40} width={36} height={30} rx={4} fill="#f87171" />
        <text x={38} y={60} textAnchor="middle" fontSize={12} fill="#fff" fontWeight={800}>{load}kg</text>
        <text x={362} y={58} textAnchor="middle" fontSize={22}>👇</text>
        <text x={362} y={130} textAnchor="middle" fontSize={12} fill="var(--k-ink)" fontWeight={700}>push {effort}kg</text>
        <text x={20 + fulcrum * 3.6} y={130} textAnchor="middle" fontSize={11} fill="var(--k-muted)">fulcrum</text>
      </svg>
      <div className="w-sliders">
        <Slider label="Load" value={load} min={5} max={100} step={5} onChange={setLoad} fmt={(n) => `${n} kg`} />
        <Slider label="Fulcrum position" value={fulcrum} min={8} max={90} onChange={setFulcrum} />
      </div>
      <div className="w-feedback ok">
        Mechanical advantage: {advantage}× · {advantage >= 1 ? "You push less than the load, but move your end farther." : "You push more than the load, but the load moves farther and faster."}
      </div>
    </div>
  );
}

function Seasons() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [m, setM] = useState(5);
  // Angle around the sun; June solstice on the left so the north pole tilts toward the sun.
  const a = ((m - 5) / 12) * 2 * Math.PI + Math.PI;
  const ex = 200 + 140 * Math.cos(a);
  const ey = 100 + 60 * Math.sin(a);
  const tiltToward = Math.cos(((m - 5) / 12) * 2 * Math.PI); // 1 in June, -1 in December
  const north = tiltToward > 0.5 ? "Summer" : tiltToward < -0.5 ? "Winter" : m < 6 ? "Spring" : "Fall";
  const south = { Summer: "Winter", Winter: "Summer", Spring: "Fall", Fall: "Spring" }[north];
  return (
    <div className="w-box">
      <svg viewBox="0 0 400 200" className="w-svg" role="img" aria-label="Earth orbiting the sun">
        <ellipse cx={200} cy={100} rx={140} ry={60} fill="none" stroke="var(--k-track)" strokeDasharray="4 4" />
        <circle cx={200} cy={100} r={26} fill="#fbbf24" />
        <text x={200} y={105} textAnchor="middle" fontSize={12} fontWeight={800} fill="#78350f">Sun</text>
        <g transform={`translate(${ex} ${ey}) rotate(23.5)`}>
          <circle r={16} fill="#3b82f6" />
          <line x1={0} y1={-24} x2={0} y2={24} stroke="#fff" strokeWidth={2} />
          <text y={-27} textAnchor="middle" fontSize={9} fill="var(--k-ink)">N</text>
        </g>
      </svg>
      <Slider label="Month" value={m} min={0} max={11} onChange={setM} fmt={(n) => months[n]} />
      <div className="w-feedback ok">
        {months[m]}: Northern Hemisphere has <strong>{north}</strong>, Southern has <strong>{south}</strong>. The tilt never changes direction; as Earth orbits, each half takes turns leaning toward the sun.
      </div>
    </div>
  );
}

function Ramp() {
  const [h, setH] = useState(1);
  const speed = Math.round(Math.sqrt(2 * 9.8 * h) * 10) / 10;
  return (
    <div className="w-box">
      <svg viewBox="0 0 400 170" className="w-svg" role="img" aria-label="Ramp">
        <polygon points={`30,150 ${30 + 220},150 30,${150 - h * 45}`} fill="var(--k-accent)" opacity={0.6} />
        <circle cx={40} cy={150 - h * 45 - 10} r={10} fill="var(--k-warn)" />
        <line x1={260} y1={140} x2={260 + speed * 12} y2={140} stroke="var(--k-lime)" strokeWidth={6} strokeLinecap="round" />
        <text x={262} y={128} fontSize={12} fill="var(--k-ink)" fontWeight={700}>{speed} m/s</text>
      </svg>
      <Slider label="Ramp height" value={h} min={0.2} max={2.8} step={0.2} onChange={setH} fmt={(n) => `${n.toFixed(1)} m`} />
      <div className="w-feedback ok">Higher start = more stored (potential) energy = faster at the bottom. Four times the height only doubles the speed.</div>
    </div>
  );
}

function Bounce({ efficiency }: { efficiency: number }) {
  const [drop, setDrop] = useState(2);
  const [eff, setEff] = useState(Math.round(efficiency * 100));
  const bounces = Array.from({ length: 6 }, (_, i) => drop * (eff / 100) ** (i + 1));
  return (
    <div className="w-box">
      <div className="w-bars">
        <div className="w-bar-col" title="Drop height">
          <span className="w-bar compound" style={{ height: "100%" }} />
        </div>
        {bounces.map((b, i) => (
          <div key={i} className="w-bar-col" title={`Bounce ${i + 1}`}>
            <span className="w-bar simple" style={{ height: `${(b / drop) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="w-sliders">
        <Slider label="Drop height" value={drop} min={0.5} max={3} step={0.5} onChange={setDrop} fmt={(n) => `${n} m`} />
        <Slider label="Energy kept each bounce" value={eff} min={30} max={95} step={5} onChange={setEff} fmt={(n) => `${n}%`} />
      </div>
      <div className="w-feedback ok">
        First bounce: {bounces[0].toFixed(2)} m. The missing energy isn&apos;t destroyed: it turns into heat and sound.
      </div>
    </div>
  );
}

export default function WidgetView({ w, onCheck }: { w: PublicWidget; onCheck?: CheckFn }) {
  switch (w.type) {
    case "sort":
      return <Sort w={w} onCheck={onCheck} />;
    case "sequence":
      return <Sequence w={w} onCheck={onCheck} />;
    case "highlight":
      return <Highlight w={w} onCheck={onCheck} />;
    case "flip":
      return <Flip cards={w.cards} />;
    case "timeline":
      return <Timeline events={w.events} />;
    case "hotspots":
      return <Hotspots w={w} />;
    case "compare":
      return <Compare w={w} />;
    case "compound":
      return <Compound w={w} />;
    case "budget":
      return <Budget w={w} />;
    case "profit":
      return <Profit w={w} />;
    case "lever":
      return <Lever />;
    case "seasons":
      return <Seasons />;
    case "ramp":
      return <Ramp />;
    case "bounce":
      return <Bounce efficiency={w.efficiency} />;
  }
}
