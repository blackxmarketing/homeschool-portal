"use client";

import { useEffect, useRef, useState } from "react";
import WidgetView from "./Widgets";
import type { PublicProbe } from "@/lib/probes";

/**
 * Interactive questions. Kids fill in, place, match, build or move things to
 * answer; the server grades it and returns which parts are right. The
 * component tracks how long the kid spent so speed can be measured.
 */

export interface ProbeResult {
  correct: boolean;
  parts: boolean[];
  solution?: unknown;
  detail?: string;
}

type Submit = (answer: unknown, ms: number) => Promise<ProbeResult>;

const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

function useTimer() {
  const start = useRef(Date.now());
  return () => Date.now() - start.current;
}

function CheckButton({ onClick, busy, disabled, done, label = "Check" }: { onClick: () => void; busy: boolean; disabled?: boolean; done: boolean; label?: string }) {
  return (
    <button className="kbtn" disabled={busy || disabled || done} onClick={onClick}>
      {done ? "✅ Got it!" : busy ? "Checking…" : label}
    </button>
  );
}

function Cloze({ p, submit, locked }: { p: Extract<PublicProbe, { type: "cloze" }>; submit: Submit; locked: boolean }) {
  const [vals, setVals] = useState<string[]>(Array(p.blanks).fill(""));
  const [res, setRes] = useState<ProbeResult | null>(null);
  const [busy, setBusy] = useState(false);
  const elapsed = useTimer();
  const done = locked || !!res?.correct;
  const fillNext = (w: string) => {
    const i = vals.findIndex((v) => !v);
    if (i >= 0) setVals(vals.map((v, k) => (k === i ? w : v)));
    setRes(null);
  };
  async function check() {
    setBusy(true);
    const r = await submit(vals, elapsed()).finally(() => setBusy(false));
    if (Array.isArray(r.solution)) setVals(r.solution as string[]);
    setRes(r);
  }
  return (
    <div className="w-box">
      <div className="cloze">
        {p.parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < p.blanks &&
              (p.bank ? (
                <button
                  className={`cloze-slot ${vals[i] ? "filled" : ""} ${res ? (res.parts[i] ? "right" : "wrong") : ""}`}
                  onClick={() => !done && (setVals(vals.map((v, k) => (k === i ? "" : v))), setRes(null))}
                >
                  {vals[i] || "____"}
                </button>
              ) : (
                <input
                  className={`cloze-input ${res ? (res.parts[i] ? "right" : "wrong") : ""}`}
                  value={vals[i]}
                  disabled={done}
                  onChange={(e) => {
                    setVals(vals.map((v, k) => (k === i ? e.target.value : v)));
                    setRes(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && vals.every((v) => v.trim()) && check()}
                  aria-label={`Blank ${i + 1}`}
                  size={Math.max(6, vals[i].length + 2)}
                />
              ))}
          </span>
        ))}
      </div>
      {p.bank && !done && (
        <div className="w-chips" style={{ marginTop: 12 }}>
          {p.bank.map((w) => (
            <button key={w} className="w-chip" disabled={vals.includes(w)} onClick={() => fillNext(w)}>
              {w}
            </button>
          ))}
        </div>
      )}
      <CheckButton onClick={check} busy={busy} disabled={vals.some((v) => !v.trim())} done={done} />
    </div>
  );
}

function NumberProbe({ p, submit, locked }: { p: Extract<PublicProbe, { type: "number" }>; submit: Submit; locked: boolean }) {
  const [v, setV] = useState("");
  const [res, setRes] = useState<ProbeResult | null>(null);
  const [busy, setBusy] = useState(false);
  const elapsed = useTimer();
  const done = locked || !!res?.correct;
  async function check() {
    setBusy(true);
    const r = await submit(v, elapsed()).finally(() => setBusy(false));
    if (r.solution !== undefined && r.solution !== null) setV(String(r.solution));
    setRes(r);
  }
  return (
    <div className="w-box">
      <div className="w-prompt">{p.prompt}</div>
      <div className="answer-row">
        {p.unit === "$" && <span className="unit">$</span>}
        <input
          className={`kinput answer-input ${res ? (res.correct ? "right" : "wrong") : ""}`}
          inputMode="decimal"
          value={v}
          disabled={done}
          onChange={(e) => {
            setV(e.target.value);
            setRes(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && v.trim() && check()}
          aria-label="Your answer"
        />
        {p.unit && p.unit !== "$" && <span className="unit">{p.unit}</span>}
        <CheckButton onClick={check} busy={busy} disabled={!v.trim()} done={done} />
      </div>
    </div>
  );
}

function Place({ p, submit, locked }: { p: Extract<PublicProbe, { type: "place" }>; submit: Submit; locked: boolean }) {
  // Markers start at the left end; the kid drags each one into place.
  const [vals, setVals] = useState<number[]>(p.items.map(() => p.min));
  const [moved, setMoved] = useState<boolean[]>(p.items.map(() => false));
  const [res, setRes] = useState<ProbeResult | null>(null);
  const [busy, setBusy] = useState(false);
  const elapsed = useTimer();
  const done = locked || !!res?.correct;
  const pct = (v: number) => ((v - p.min) / (p.max - p.min)) * 100;
  const fmt = (v: number) => (v < 0 && Math.abs(p.max - p.min) > 100 ? `${-v} BC` : String(Math.round(v * 100) / 100));
  const colors = ["var(--k-accent)", "var(--k-accent2)", "var(--k-warn)", "var(--k-pink)"];
  async function check() {
    setBusy(true);
    const r = await submit(vals, elapsed()).finally(() => setBusy(false));
    if (Array.isArray(r.solution)) setVals(r.solution as number[]);
    setRes(r);
  }
  return (
    <div className="w-box">
      <div className="w-prompt">{p.prompt}</div>
      <div className="place-line">
        <div className="place-track" />
        {p.items.map((it, i) => (
          <div key={i} className="place-marker" style={{ left: `${pct(vals[i])}%`, background: colors[i % colors.length] }} title={it}>
            {i + 1}
          </div>
        ))}
        <span className="place-end left">{fmt(p.min)}</span>
        <span className="place-end right">{fmt(p.max)}</span>
      </div>
      {p.items.map((it, i) => (
        <label key={i} className={`w-slider ${res ? (res.parts[i] ? "right" : "wrong") : ""}`}>
          <span>
            <span className="place-dot" style={{ background: colors[i % colors.length] }}>{i + 1}</span> {it}: <strong>{fmt(vals[i])}</strong>{!moved[i] && <span className="kmuted small"> (drag me)</span>}
            {res && (res.parts[i] ? " ✓" : " ✗")}
          </span>
          <input
            type="range"
            min={p.min}
            max={p.max}
            step={p.step}
            value={vals[i]}
            disabled={done}
            onChange={(e) => {
              setVals(vals.map((v, k) => (k === i ? Number(e.target.value) : v)));
              setMoved(moved.map((m, k) => (k === i ? true : m)));
              setRes(null);
            }}
          />
        </label>
      ))}
      <CheckButton onClick={check} busy={busy} done={done} />
    </div>
  );
}

function Match({ p, submit, locked }: { p: Extract<PublicProbe, { type: "match" }>; submit: Submit; locked: boolean }) {
  const [pairs, setPairs] = useState<(number | null)[]>(p.left.map(() => null));
  const [active, setActive] = useState<number | null>(null);
  const [res, setRes] = useState<ProbeResult | null>(null);
  const [busy, setBusy] = useState(false);
  const elapsed = useTimer();
  const done = locked || !!res?.correct;
  const hues = [270, 190, 40, 330, 140];
  async function check() {
    setBusy(true);
    const r = await submit(pairs, elapsed()).finally(() => setBusy(false));
    if (Array.isArray(r.solution)) setPairs(r.solution as number[]);
    setRes(r);
  }
  return (
    <div className="w-box">
      <div className="w-prompt">{p.prompt}</div>
      <div className="w-hintline">Tap an item on the left, then its match on the right.</div>
      <div className="match-grid">
        <div className="match-col">
          {p.left.map((l, i) => (
            <button
              key={i}
              className={`match-item ${active === i ? "active" : ""} ${res ? (res.parts[i] ? "right" : "wrong") : ""}`}
              style={pairs[i] !== null ? { borderColor: `hsl(${hues[i % hues.length]} 80% 60%)` } : undefined}
              disabled={done}
              onClick={() => setActive(i)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="match-col">
          {p.right.map((r) => {
            const owner = pairs.indexOf(r.id);
            return (
              <button
                key={r.id}
                className="match-item"
                style={owner >= 0 ? { borderColor: `hsl(${hues[owner % hues.length]} 80% 60%)`, background: `hsl(${hues[owner % hues.length]} 70% 50% / .15)` } : undefined}
                disabled={done || active === null}
                onClick={() => {
                  if (active === null) return;
                  setPairs(pairs.map((v, k) => (k === active ? r.id : v === r.id ? null : v)));
                  setActive(null);
                  setRes(null);
                }}
              >
                {r.text}
              </button>
            );
          })}
        </div>
      </div>
      <CheckButton onClick={check} busy={busy} disabled={pairs.some((x) => x === null)} done={done} />
    </div>
  );
}

function Build({ p, submit, locked }: { p: Extract<PublicProbe, { type: "build" }>; submit: Submit; locked: boolean }) {
  const [row, setRow] = useState<number[]>([]);
  const [res, setRes] = useState<ProbeResult | null>(null);
  const [busy, setBusy] = useState(false);
  const elapsed = useTimer();
  const done = locked || !!res?.correct;
  const text = (id: number) => p.tiles.find((t) => t.id === id)?.text ?? "";
  async function check() {
    setBusy(true);
    const r = await submit(row, elapsed()).finally(() => setBusy(false));
    if (Array.isArray(r.solution)) setRow(r.solution as number[]);
    setRes(r);
  }
  return (
    <div className="w-box">
      <div className="w-prompt">{p.prompt}</div>
      <div className="build-row">
        {row.length === 0 && <span className="kmuted small">Tap the tiles below in the right order…</span>}
        {row.map((id, i) => (
          <button
            key={`${id}-${i}`}
            className={`w-chip ${res ? (res.parts[i] ? "right" : "wrong") : "picked"}`}
            disabled={done}
            onClick={() => {
              setRow(row.filter((_, k) => k !== i));
              setRes(null);
            }}
          >
            {text(id)}
          </button>
        ))}
      </div>
      {!done && (
        <div className="w-chips">
          {p.tiles
            .filter((t) => !row.includes(t.id))
            .map((t) => (
              <button
                key={t.id}
                className="w-chip"
                onClick={() => {
                  setRow([...row, t.id]);
                  setRes(null);
                }}
              >
                {t.text}
              </button>
            ))}
        </div>
      )}
      <CheckButton onClick={check} busy={busy} disabled={row.length !== p.length} done={done} />
      {row.length !== p.length && !done && <div className="w-hintline">Use {p.length} tiles.</div>}
    </div>
  );
}

function Target({ p, submit, locked }: { p: Extract<PublicProbe, { type: "target" }>; submit: Submit; locked: boolean }) {
  const init = p.sim === "lever" ? 50 : p.sim === "profit" ? 1 : p.sim === "compound" ? 1 : 0;
  const [v, setV] = useState(init);
  const [res, setRes] = useState<ProbeResult | null>(null);
  const [busy, setBusy] = useState(false);
  const elapsed = useTimer();
  const done = locked || !!res?.correct;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  async function check() {
    setBusy(true);
    const r = await submit(v, elapsed()).finally(() => setBusy(false));
    if (typeof r.solution === "number") setV(r.solution);
    setRes(r);
  }

  let viz: React.ReactNode = null;
  let slider: React.ReactNode = null;
  if (p.sim === "lever") {
    const push = (p.load * (v - 5)) / (95 - v);
    // Load end sits down until the push is small enough to lift it.
    const tilt = Math.max(-12, Math.min(12, (p.maxPush - push) * 0.6));
    viz = (
      <svg viewBox="0 0 400 150" className="w-svg" role="img" aria-label="Lever">
        <g transform={`rotate(${tilt} ${20 + v * 3.6} 74)`}>
          <rect x={20} y={70} width={360} height={8} rx={4} fill="var(--k-accent2)" />
          <rect x={20} y={40} width={40} height={30} rx={4} fill="#f87171" />
          <text x={40} y={60} textAnchor="middle" fontSize={12} fill="#fff" fontWeight={800}>{p.load}kg</text>
        </g>
        <polygon points={`${20 + v * 3.6},78 ${8 + v * 3.6},110 ${32 + v * 3.6},110`} fill="var(--k-warn)" />
        <text x={385} y={132} textAnchor="end" fontSize={13} fill={push <= p.maxPush ? "var(--k-lime)" : "#fca5a5"} fontWeight={800}>push {push.toFixed(1)} kg</text>
        <text x={200} y={20} textAnchor="middle" fontSize={12} fill="var(--k-muted)">goal: push {p.maxPush} kg or less</text>
      </svg>
    );
    slider = <input type="range" min={8} max={90} value={v} disabled={done} onChange={(e) => (setV(Number(e.target.value)), setRes(null))} aria-label="Fulcrum position" />;
  } else if (p.sim === "profit") {
    const profit = (v - p.cost) * p.units - p.fixed;
    viz = (
      <div className="w-pl">
        <div className="w-legend">
          Price <strong>{money(v)}</strong> · {p.units} sold · cost {money(p.cost)} each · {money(p.fixed)} one-time
        </div>
        <div className={`target-readout ${profit >= p.minProfit ? "ok" : ""}`}>
          Profit: {profit < 0 ? `-${money(-profit)}` : money(profit)} <span className="kmuted small">(goal: at least {money(p.minProfit)})</span>
        </div>
      </div>
    );
    slider = <input type="range" min={0.5} max={50} step={0.25} value={v} disabled={done} onChange={(e) => (setV(Number(e.target.value)), setRes(null))} aria-label="Price" />;
  } else if (p.sim === "compound") {
    const bal = p.principal * (1 + p.rate / 100) ** v;
    viz = (
      <div>
        <div className="w-stack" style={{ height: 30 }}>
          <span style={{ width: `${Math.min(100, (bal / p.target) * 100)}%`, background: bal >= p.target ? "var(--k-lime)" : "var(--k-accent2)" }} />
        </div>
        <div className={`target-readout ${bal >= p.target ? "ok" : ""}`}>
          After {v} year{v === 1 ? "" : "s"}: {money(Math.round(bal * 100) / 100)} <span className="kmuted small">(goal: {money(p.target)} at {p.rate}%, starting with {money(p.principal)})</span>
        </div>
      </div>
    );
    slider = <input type="range" min={1} max={60} value={v} disabled={done} onChange={(e) => (setV(Number(e.target.value)), setRes(null))} aria-label="Years" />;
  } else if (p.sim === "seasons") {
    const a = ((v - 5) / 12) * 2 * Math.PI + Math.PI;
    viz = (
      <svg viewBox="0 0 400 200" className="w-svg" role="img" aria-label="Earth's orbit">
        <ellipse cx={200} cy={100} rx={140} ry={60} fill="none" stroke="var(--k-track)" strokeDasharray="4 4" />
        <circle cx={200} cy={100} r={26} fill="#fbbf24" />
        <g transform={`translate(${200 + 140 * Math.cos(a)} ${100 + 60 * Math.sin(a)}) rotate(23.5)`}>
          <circle r={16} fill="#3b82f6" />
          <line x1={0} y1={-24} x2={0} y2={24} stroke="#fff" strokeWidth={2} />
          <text y={-27} textAnchor="middle" fontSize={9} fill="var(--k-ink)">N</text>
        </g>
        <text x={200} y={190} textAnchor="middle" fontSize={13} fill="var(--k-ink)" fontWeight={800}>{months[v]}</text>
      </svg>
    );
    slider = <input type="range" min={0} max={11} value={v} disabled={done} onChange={(e) => (setV(Number(e.target.value)), setRes(null))} aria-label="Month" />;
  }

  return (
    <div className="w-box">
      <div className="w-prompt">{p.prompt}</div>
      {viz}
      <label className="w-slider">{slider}</label>
      {res && !res.correct && res.detail && <div className="w-feedback">Your setting gives {res.detail}. Keep adjusting.</div>}
      <CheckButton onClick={check} busy={busy} done={done} label="Lock it in" />
    </div>
  );
}

export default function ProbeView({ p, submit, locked = false }: { p: PublicProbe; submit: Submit; locked?: boolean }) {
  const elapsed = useTimer();
  switch (p.type) {
    case "cloze":
      return <Cloze p={p} submit={submit} locked={locked} />;
    case "number":
      return <NumberProbe p={p} submit={submit} locked={locked} />;
    case "place":
      return <Place p={p} submit={submit} locked={locked} />;
    case "match":
      return <Match p={p} submit={submit} locked={locked} />;
    case "build":
      return <Build p={p} submit={submit} locked={locked} />;
    case "target":
      return <Target p={p} submit={submit} locked={locked} />;
    default:
      // Sort, sequence and highlight reuse the activity widgets.
      return (
        <WidgetView
          w={p}
          onCheck={async (answer) => {
            const r = await submit(answer, elapsed());
            return { ...r, solution: Array.isArray(r.solution) ? (r.solution as number[]) : null };
          }}
        />
      );
  }
}

/** Keeps a list of answers for a multi-question check (the mastery check). */
export function useAnswers(n: number) {
  const [answers, setAnswers] = useState<unknown[]>(Array(n).fill(null));
  const [times, setTimes] = useState<number[]>(Array(n).fill(0));
  useEffect(() => {
    setAnswers(Array(n).fill(null));
    setTimes(Array(n).fill(0));
  }, [n]);
  return { answers, times, set: (i: number, a: unknown, ms: number) => (setAnswers((x) => x.map((v, k) => (k === i ? a : v))), setTimes((x) => x.map((v, k) => (k === i ? ms : v)))) };
}
