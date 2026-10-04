import Link from "next/link";
import { requireKid } from "@/lib/auth";
import { STRANDS } from "@/lib/curriculum/skills";
import { skillTable } from "@/lib/store";

export const dynamic = "force-dynamic";

const LABEL: Record<string, string> = { mastered: "Mastered", learning: "Learning", ready: "Ready", locked: "Locked" };

export default async function SkillMap() {
  const { kid } = await requireKid();
  const skills = skillTable(kid.id);
  const grades = [...new Set(skills.map((s) => s.grade))];

  return (
    <main className="wrap">
      <div className="topbar">
        <h1>{kid.avatar} My skill map</h1>
        <nav>
          <Link href="/kid">← My plan</Link>
        </nav>
      </div>
      <p className="muted">
        Master a skill to unlock the ones after it. You can practice any skill marked Ready or Learning.
      </p>
      {grades.map((g) => (
        <div className="card" key={g}>
          <h2>Grade {g}</h2>
          {STRANDS.map((strand) => {
            const list = skills.filter((s) => s.grade === g && s.strand === strand.id);
            if (!list.length) return null;
            return (
              <div key={strand.id} style={{ marginBottom: 12 }}>
                <div className="muted small" style={{ fontWeight: 700 }}>
                  {strand.label}
                </div>
                <ul className="plan">
                  {list.map((s) => (
                    <li key={s.id}>
                      <span style={{ color: s.status === "locked" ? "var(--locked)" : undefined }}>{s.title}</span>
                      {s.status === "ready" || s.status === "learning" ? (
                        <Link href={`/kid/practice?skill=${s.id}&mode=learn`} className={`pill ${s.status}`}>
                          {LABEL[s.status]} → practice
                        </Link>
                      ) : (
                        <span className={`pill ${s.status}`}>{LABEL[s.status]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </main>
  );
}
