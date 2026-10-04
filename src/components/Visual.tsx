import type { Visual as V } from "@/lib/curriculum/answers";

/**
 * Draws a question's setup as an SVG. Every picture is built from the same
 * numbers as the question, so it always matches. Colors come from CSS
 * variables (--v-a, --v-b, --v-c, --v-ink, --v-line) set in globals.css.
 */

const C = { a: "var(--v-a)", b: "var(--v-b)", c: "var(--v-c)", ink: "var(--v-ink)", line: "var(--v-line)", soft: "var(--v-soft)" };
const text = { fill: C.ink, fontSize: 14, fontFamily: "inherit", fontWeight: 600 } as const;

function Frame({ w, h, label, children }: { w: number; h: number; label: string; children: React.ReactNode }) {
  return (
    <figure className="visual">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} style={{ maxWidth: w }}>
        {children}
      </svg>
    </figure>
  );
}

function FractionBars({ bars }: { bars: { n: number; d: number; label?: string }[] }) {
  const W = 420;
  const H = 34;
  const gap = 26;
  return (
    <Frame w={W + 20} h={bars.length * (H + gap) + 6} label="Fraction bars">
      {bars.map((b, i) => {
        const y = i * (H + gap) + 20;
        const whole = Math.max(1, Math.ceil(b.n / b.d));
        const cell = W / (b.d * whole);
        return (
          <g key={i}>
            {b.label && (
              <text x={10} y={y - 6} {...text} fontSize={12}>
                {b.label}: {b.n}/{b.d}
              </text>
            )}
            {Array.from({ length: b.d * whole }, (_, k) => (
              <rect
                key={k}
                x={10 + k * cell}
                y={y}
                width={cell}
                height={H}
                fill={k < b.n ? (i % 2 ? C.b : C.a) : C.soft}
                stroke={C.line}
                strokeWidth={k % b.d === 0 ? 2.5 : 1}
                rx={2}
              />
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

function PercentGrid({ percent, label }: { percent: number; label: string }) {
  const s = 18;
  return (
    <Frame w={10 * s + 180} h={10 * s + 4} label={`${percent} of 100 squares shaded`}>
      {Array.from({ length: 100 }, (_, k) => (
        <rect key={k} x={2 + (k % 10) * s} y={2 + Math.floor(k / 10) * s} width={s - 2} height={s - 2} rx={3} fill={k < percent ? C.a : C.soft} />
      ))}
      <text x={10 * s + 16} y={10 * s / 2} {...text} fontSize={26} fill="var(--v-a)">
        {percent}%
      </text>
      <text x={10 * s + 16} y={10 * s / 2 + 24} {...text} fontSize={12}>
        {label}
      </text>
    </Frame>
  );
}

function Tape({ parts, caption }: { parts: { label: string; units: number; color: "a" | "b" | "c" }[]; caption?: string }) {
  const maxUnits = Math.max(...parts.map((p) => p.units));
  const unit = Math.min(44, 400 / maxUnits);
  const rowH = 40;
  return (
    <Frame w={unit * maxUnits + 110} h={parts.length * (rowH + 10) + (caption ? 26 : 4)} label={caption ?? "Tape diagram"}>
      {parts.map((p, i) => (
        <g key={i}>
          <text x={0} y={i * (rowH + 10) + rowH / 2 + 5} {...text} fontSize={13}>
            {p.label}
          </text>
          {Array.from({ length: p.units }, (_, k) => (
            <rect
              key={k}
              x={100 + k * unit}
              y={i * (rowH + 10)}
              width={unit - 3}
              height={rowH}
              rx={6}
              fill={C[p.color]}
              opacity={0.9}
            />
          ))}
        </g>
      ))}
      {caption && (
        <text x={100} y={parts.length * (rowH + 10) + 14} {...text} fontSize={12}>
          {caption}
        </text>
      )}
    </Frame>
  );
}

function NumberLine({ min, max, marks }: { min: number; max: number; marks: { value: number; label?: string }[] }) {
  const W = 520;
  const x = (v: number) => 20 + ((v - min) / (max - min)) * (W - 40);
  const step = (max - min) / 10;
  return (
    <Frame w={W} h={86} label="Number line">
      <line x1={10} y1={50} x2={W - 10} y2={50} stroke={C.ink} strokeWidth={2} />
      {Array.from({ length: 11 }, (_, k) => {
        const v = min + k * step;
        return (
          <g key={k}>
            <line x1={x(v)} y1={43} x2={x(v)} y2={57} stroke={v === 0 ? C.c : C.line} strokeWidth={v === 0 ? 3 : 1.5} />
            <text x={x(v)} y={76} {...text} fontSize={11} textAnchor="middle">
              {v}
            </text>
          </g>
        );
      })}
      {marks.map((m, i) => (
        <g key={i}>
          <circle cx={x(m.value)} cy={50} r={8} fill={C.a} />
          {m.label && (
            <text x={x(m.value)} y={28} {...text} textAnchor="middle" fill="var(--v-a)">
              {m.label}
            </text>
          )}
        </g>
      ))}
    </Frame>
  );
}

function Coord({ points, line }: { points: { x: number; y: number; label: string }[]; line?: boolean }) {
  const lo = Math.min(0, ...points.map((p) => Math.min(p.x, p.y))) - 1;
  const hi = Math.max(10, ...points.map((p) => Math.max(p.x, p.y))) + 1;
  const S = 300;
  const u = S / (hi - lo);
  const px = (v: number) => (v - lo) * u;
  const py = (v: number) => S - (v - lo) * u;
  return (
    <Frame w={S} h={S} label="Coordinate plane">
      {Array.from({ length: hi - lo + 1 }, (_, k) => (
        <g key={k}>
          <line x1={px(lo + k)} y1={0} x2={px(lo + k)} y2={S} stroke={C.line} strokeWidth={0.6} />
          <line x1={0} y1={py(lo + k)} x2={S} y2={py(lo + k)} stroke={C.line} strokeWidth={0.6} />
        </g>
      ))}
      <line x1={px(0)} y1={0} x2={px(0)} y2={S} stroke={C.ink} strokeWidth={1.8} />
      <line x1={0} y1={py(0)} x2={S} y2={py(0)} stroke={C.ink} strokeWidth={1.8} />
      <text x={S - 12} y={py(0) - 6} {...text} fontSize={12}>
        x
      </text>
      <text x={px(0) + 6} y={12} {...text} fontSize={12}>
        y
      </text>
      {line && points.length === 2 && (
        <line x1={px(points[0].x)} y1={py(points[0].y)} x2={px(points[1].x)} y2={py(points[1].y)} stroke={C.b} strokeWidth={3} />
      )}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={px(p.x)} cy={py(p.y)} r={6} fill={C.a} />
          <text x={px(p.x) + 8} y={py(p.y) - 8} {...text} fontSize={12}>
            {p.label} ({p.x}, {p.y})
          </text>
        </g>
      ))}
    </Frame>
  );
}

function Shape({ shape, base, height }: { shape: "triangle" | "parallelogram" | "rectangle"; base: string; height: string }) {
  const pts =
    shape === "triangle"
      ? "40,190 320,190 210,40"
      : shape === "parallelogram"
        ? "40,190 280,190 340,40 100,40"
        : "40,190 320,190 320,40 40,40";
  const hx = shape === "triangle" ? 210 : shape === "parallelogram" ? 100 : 320;
  return (
    <Frame w={380} h={226} label={`${shape} with base ${base} and height ${height}`}>
      <polygon points={pts} fill={C.a} fillOpacity={0.25} stroke={C.a} strokeWidth={3} strokeLinejoin="round" />
      {shape !== "rectangle" && <line x1={hx} y1={40} x2={hx} y2={190} stroke={C.b} strokeWidth={2.5} strokeDasharray="6 5" />}
      {shape !== "rectangle" && <rect x={hx} y={176} width={14} height={14} fill="none" stroke={C.b} strokeWidth={2} />}
      <text x={180} y={214} {...text} textAnchor="middle">
        {shape === "rectangle" ? "length" : "base"} = {base}
      </text>
      <text x={hx + (shape === "rectangle" ? 10 : 8)} y={118} {...text} fill="var(--v-b)">
        {shape === "rectangle" ? "width" : "height"} = {height}
      </text>
    </Frame>
  );
}

function RightTriangle({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <Frame w={360} h={230} label={`Right triangle with legs ${a} and ${b}, hypotenuse ${c}`}>
      <polygon points="50,190 300,190 50,40" fill={C.a} fillOpacity={0.2} stroke={C.a} strokeWidth={3} strokeLinejoin="round" />
      <rect x={50} y={174} width={16} height={16} fill="none" stroke={C.ink} strokeWidth={2} />
      <text x={20} y={120} {...text} textAnchor="middle" fill={a === "?" ? "var(--v-c)" : undefined} fontSize={18}>
        {a}
      </text>
      <text x={175} y={216} {...text} textAnchor="middle" fill={b === "?" ? "var(--v-c)" : undefined} fontSize={18}>
        {b}
      </text>
      <text x={190} y={105} {...text} fill={c === "?" ? "var(--v-c)" : undefined} fontSize={18}>
        {c}
      </text>
    </Frame>
  );
}

function Circle({ radius }: { radius: string }) {
  return (
    <Frame w={240} h={220} label={`Circle with radius ${radius}`}>
      <circle cx={110} cy={110} r={90} fill={C.a} fillOpacity={0.2} stroke={C.a} strokeWidth={3} />
      <line x1={110} y1={110} x2={200} y2={110} stroke={C.b} strokeWidth={3} />
      <circle cx={110} cy={110} r={4} fill={C.ink} />
      <text x={155} y={100} {...text} textAnchor="middle" fill="var(--v-b)">
        r = {radius}
      </text>
    </Frame>
  );
}

function Marbles({ groups }: { groups: { color: "red" | "blue" | "green"; count: number }[] }) {
  const fill = { red: "#ef4444", blue: "#3b82f6", green: "#22c55e" };
  const all = groups.flatMap((g) => Array.from({ length: g.count }, () => g.color));
  const per = 8;
  const rows = Math.ceil(all.length / per);
  return (
    <Frame w={per * 36 + 40} h={rows * 36 + 50} label="Bag of marbles">
      <rect x={4} y={4} width={per * 36 + 30} height={rows * 36 + 40} rx={24} fill={C.soft} stroke={C.line} strokeWidth={2} />
      {all.map((c, i) => (
        <circle key={i} cx={34 + (i % per) * 36} cy={36 + Math.floor(i / per) * 36} r={14} fill={fill[c]} stroke="rgba(0,0,0,.25)" />
      ))}
    </Frame>
  );
}

function Bars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const bw = 46;
  const H = 160;
  return (
    <Frame w={values.length * (bw + 12) + 20} h={H + 46} label={`Bar chart of ${values.join(", ")}`}>
      {values.map((v, i) => {
        const h = (v / max) * H;
        return (
          <g key={i}>
            <rect x={10 + i * (bw + 12)} y={H - h + 20} width={bw} height={h} rx={6} fill={i % 2 ? C.b : C.a} />
            <text x={10 + i * (bw + 12) + bw / 2} y={H - h + 14} {...text} textAnchor="middle">
              {v}
            </text>
          </g>
        );
      })}
      <line x1={4} y1={H + 20} x2={values.length * (bw + 12) + 14} y2={H + 20} stroke={C.ink} strokeWidth={2} />
    </Frame>
  );
}

function Balance({ left, right }: { left: string; right: string }) {
  return (
    <Frame w={420} h={190} label={`Balance: ${left} equals ${right}`}>
      <polygon points="210,90 190,170 230,170" fill={C.ink} />
      <rect x={140} y={168} width={140} height={10} rx={4} fill={C.ink} />
      <rect x={20} y={84} width={380} height={8} rx={4} fill={C.ink} />
      <line x1={60} y1={92} x2={60} y2={120} stroke={C.ink} strokeWidth={2} />
      <line x1={360} y1={92} x2={360} y2={120} stroke={C.ink} strokeWidth={2} />
      <rect x={0} y={30} width={150} height={50} rx={12} fill={C.a} />
      <rect x={270} y={30} width={150} height={50} rx={12} fill={C.b} />
      <text x={75} y={62} {...text} fontSize={20} textAnchor="middle" fill="#fff">
        {left}
      </text>
      <text x={345} y={62} {...text} fontSize={20} textAnchor="middle" fill="#fff">
        {right}
      </text>
      <text x={210} y={22} {...text} fontSize={12} textAnchor="middle">
        both sides weigh the same
      </text>
    </Frame>
  );
}

function PriceTag({ price, badge }: { price: number; badge: string }) {
  return (
    <Frame w={300} h={150} label={`Price tag $${price}, ${badge}`}>
      <path d="M40 20 H230 a12 12 0 0 1 12 12 V118 a12 12 0 0 1 -12 12 H40 L8 75 Z" fill={C.a} />
      <circle cx={36} cy={75} r={7} fill="var(--card)" />
      <text x={140} y={88} {...text} fontSize={40} textAnchor="middle" fill="#fff">
        ${price}
      </text>
      <g transform="rotate(12 250 30)">
        <rect x={200} y={8} width={100} height={40} rx={20} fill={C.c} />
        <text x={250} y={34} {...text} fontSize={16} textAnchor="middle" fill="#111">
          {badge}
        </text>
      </g>
    </Frame>
  );
}

function Groups({ groups, each, icon }: { groups: number; each: number; icon: string }) {
  return (
    <Frame w={Math.min(groups, 5) * 92} h={Math.ceil(groups / 5) * 92} label={`${groups} groups of ${each}`}>
      {Array.from({ length: groups }, (_, g) => (
        <g key={g} transform={`translate(${(g % 5) * 92} ${Math.floor(g / 5) * 92})`}>
          <rect x={4} y={4} width={84} height={84} rx={14} fill={C.soft} stroke={C.line} />
          {Array.from({ length: each }, (_, k) => (
            <text key={k} x={18 + (k % 4) * 19} y={28 + Math.floor(k / 4) * 22} fontSize={16} fill="var(--v-a)">
              {icon}
            </text>
          ))}
        </g>
      ))}
    </Frame>
  );
}

function Power({ base, exp }: { base: number; exp: number }) {
  return (
    <Frame w={420} h={90} label={`${base} multiplied by itself ${exp} times`}>
      {Array.from({ length: exp }, (_, k) => (
        <g key={k}>
          <rect x={k * 80} y={20} width={56} height={56} rx={12} fill={k % 2 ? C.b : C.a} />
          <text x={k * 80 + 28} y={57} {...text} fontSize={24} textAnchor="middle" fill="#fff">
            {base}
          </text>
          {k < exp - 1 && (
            <text x={k * 80 + 68} y={55} {...text} fontSize={20} textAnchor="middle">
              ×
            </text>
          )}
        </g>
      ))}
    </Frame>
  );
}

export default function Visual({ v }: { v: V }) {
  switch (v.type) {
    case "fraction-bars":
      return <FractionBars bars={v.bars} />;
    case "percent-grid":
      return <PercentGrid percent={v.percent} label={v.label} />;
    case "tape":
      return <Tape parts={v.parts} caption={v.caption} />;
    case "number-line":
      return <NumberLine min={v.min} max={v.max} marks={v.marks} />;
    case "coord":
      return <Coord points={v.points} line={v.line} />;
    case "shape":
      return <Shape shape={v.shape} base={v.base} height={v.height} />;
    case "right-triangle":
      return <RightTriangle a={v.a} b={v.b} c={v.c} />;
    case "circle":
      return <Circle radius={v.radius} />;
    case "marbles":
      return <Marbles groups={v.groups} />;
    case "bars":
      return <Bars values={v.values} />;
    case "balance":
      return <Balance left={v.left} right={v.right} />;
    case "price-tag":
      return <PriceTag price={v.price} badge={v.badge} />;
    case "groups":
      return <Groups groups={v.groups} each={v.each} icon={v.icon} />;
    case "power":
      return <Power base={v.base} exp={v.exp} />;
  }
}
