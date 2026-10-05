import Link from "next/link";
import type { BlockStatus } from "@/lib/store";

/** The 2-hour day as a row of rings, one per block. */
export function DayRings({ blocks }: { blocks: BlockStatus[] }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="rings">
      {blocks.map(({ block, minutes, pct, state }) => {
        const done = state === "done" || state === "approved";
        const href = block.kind === "portal" ? "/kid" : `/kid/block/${block.id}`;
        return (
          <Link key={block.id} href={href} className={`ring ${done ? "done" : ""}`} style={{ ["--b-hue" as string]: block.hue }}>
            <svg width={76} height={76} viewBox="0 0 76 76" aria-hidden>
              <circle cx={38} cy={38} r={r} fill="none" stroke="var(--k-track)" strokeWidth={8} />
              <circle
                cx={38}
                cy={38}
                r={r}
                fill="none"
                stroke={`hsl(${block.hue} 85% 60%)`}
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - pct / 100)}
                transform="rotate(-90 38 38)"
              />
              <text x={38} y={46} textAnchor="middle" fontSize={24}>
                {done ? "✅" : block.icon}
              </text>
            </svg>
            <div className="ring-label">{block.label}</div>
            <div className="ring-sub">
              {state === "pending" ? "waiting for parent" : `${minutes}/${block.minutes} min`}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Each grade as a tower of blocks: solid for mastered skills, hollow for skills left. */
export function GradeTower({ grades, focus }: { grades: { grade: number; mastered: number; total: number }[]; focus: number }) {
  return (
    <div className="towers">
      {grades.map((g) => (
        <div key={g.grade} className={`tower ${g.grade === focus ? "current" : ""}`}>
          <div className="tower-stack">
            {Array.from({ length: g.total }, (_, i) => (
              <span key={i} className={i < g.mastered ? "full" : ""} />
            ))}
          </div>
          <div className="tower-label">Gr {g.grade}</div>
          <div className="tower-sub">{g.total - g.mastered} left</div>
        </div>
      ))}
    </div>
  );
}
