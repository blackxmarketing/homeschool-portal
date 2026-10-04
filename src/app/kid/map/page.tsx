import Link from "next/link";
import { requireKid } from "@/lib/auth";
import { STRANDS } from "@/lib/curriculum/skills";
import { WORLDS } from "@/lib/game";
import { skillTable } from "@/lib/store";

export const dynamic = "force-dynamic";

const ICON: Record<string, string> = { mastered: "⭐", learning: "⚡", ready: "▶", locked: "🔒" };
const LABEL: Record<string, string> = { mastered: "Mastered", learning: "In training", ready: "Ready", locked: "Locked" };

function Ring({ pct, hue }: { pct: number; hue: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg width={76} height={76} viewBox="0 0 76 76" aria-hidden>
      <circle cx={38} cy={38} r={r} fill="none" stroke="var(--k-track)" strokeWidth={8} />
      <circle
        cx={38}
        cy={38}
        r={r}
        fill="none"
        stroke={`hsl(${hue} 85% 60%)`}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform="rotate(-90 38 38)"
      />
      <text x={38} y={44} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--k-ink)">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

export default async function QuestMap() {
  const { kid } = await requireKid();
  const skills = skillTable(kid.id);

  return (
    <main className="wrap">
      <div className="topbar">
        <div>
          <div className="eyebrow">{kid.avatar} {kid.name}&apos;s</div>
          <h1>Quest map</h1>
        </div>
        <nav>
          <Link href="/kid" className="kbtn ghost">
            ← Base
          </Link>
        </nav>
      </div>
      <p className="kmuted">
        Seven worlds. Master a skill to unlock the next one on the path. Conquer a whole world to earn the World Conqueror badge.
      </p>

      <div className="world-grid">
        {STRANDS.map((strand) => {
          const w = WORLDS[strand.id];
          const list = skills.filter((s) => s.strand === strand.id).sort((a, b) => a.grade - b.grade);
          const done = list.filter((s) => s.status === "mastered").length;
          return (
            <section key={strand.id} className="world" style={{ ["--hue" as string]: w.hue }}>
              <div className="world-head">
                <div>
                  <div className="world-icon">{w.icon}</div>
                  <h2>{w.name}</h2>
                  <div className="kmuted small">{w.blurb}</div>
                  <div className="kmuted small">
                    {done} of {list.length} skills mastered
                  </div>
                </div>
                <Ring pct={list.length ? done / list.length : 0} hue={w.hue} />
              </div>
              <ol className="path">
                {list.map((s) => {
                  const playable = s.status === "ready" || s.status === "learning";
                  const inner = (
                    <>
                      <span className={`node ${s.status}`}>{ICON[s.status]}</span>
                      <span className="node-text">
                        <span className="node-title">{s.title}</span>
                        <span className="kmuted small">
                          Grade {s.grade} · {LABEL[s.status]}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={s.id}>
                      {playable ? (
                        <Link href={`/kid/practice?skill=${s.id}&mode=learn`} className="path-step playable">
                          {inner}
                        </Link>
                      ) : (
                        <div className={`path-step ${s.status}`}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </main>
  );
}
