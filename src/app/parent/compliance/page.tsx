import ParentNav from "@/components/ParentNav";
import { requireParent } from "@/lib/auth";
import { REQUIRED_AVG_HOURS, REQUIRED_DAYS, REQUIRED_SUBJECTS } from "@/lib/compliance";
import { compliance, getFamily, listKids, today } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Compliance() {
  const s = await requireParent();
  const family = getFamily(s.familyId)!;
  const kids = listKids(s.familyId);

  return (
    <main className="wrap">
      <ParentNav title="Colorado home-study records" />
      <p className="muted noprint">
        Use your browser's Print → Save as PDF to keep a copy. Colorado home study asks for 172 days of instruction a year,
        averaging 4 hours a day, covering the required subjects. Testing or an evaluation is due in grades 3, 5, 7, 9 and 11.
        This page is a record-keeping aid, not legal advice. Check C.R.S. 22-33-104.5 and your district's homeschool page
        each year.
      </p>
      <p>
        <strong>{family.name}</strong> · report generated {today()}
      </p>
      {kids.map((kid) => {
        const c = compliance(kid.id, s.familyId);
        const testingYear = [3, 5, 7, 9, 11].includes(kid.grade);
        return (
          <div className="card" key={kid.id}>
            <h2>
              {kid.name} · grade {kid.grade}
            </h2>
            <p className="muted small">School year since {c.start}</p>
            <div className="stats" style={{ marginBottom: 14 }}>
              <div className="stat">
                <div className="v">
                  {c.days}/{REQUIRED_DAYS}
                </div>
                <div className="k">instruction days</div>
              </div>
              <div className="stat">
                <div className="v">{c.totalHours}</div>
                <div className="k">total hours</div>
              </div>
              <div className="stat">
                <div className="v">{c.avgHoursPerDay}</div>
                <div className="k">avg hours/day (goal {REQUIRED_AVG_HOURS})</div>
              </div>
            </div>
            {c.avgHoursPerDay > 0 && c.avgHoursPerDay < REQUIRED_AVG_HOURS && (
              <div className="flag">
                Average is under {REQUIRED_AVG_HOURS} hours. Make sure reading, projects, science and other learning are being
                logged.
              </div>
            )}
            {testingYear && (
              <div className="flag">
                Grade {kid.grade} is a testing year: a nationally standardized test (above the 13th percentile) or a qualified
                evaluation is required.
              </div>
            )}
            <table>
              <thead>
                <tr>
                  <th>Required subject</th>
                  <th>Hours this year</th>
                </tr>
              </thead>
              <tbody>
                {REQUIRED_SUBJECTS.map((sub) => (
                  <tr key={sub}>
                    <td>{sub}</td>
                    <td>{c.hoursBySubject[sub] ?? <span style={{ color: "var(--bad)" }}>none logged</span>}</td>
                  </tr>
                ))}
                <tr>
                  <td>Other (art, PE, music, projects)</td>
                  <td>{c.hoursBySubject["Other"] ?? 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </main>
  );
}
