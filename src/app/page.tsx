import Link from "next/link";
import { redirect } from "next/navigation";
import { currentSession } from "@/lib/auth";
import { hasAnyParent, listKids } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (!hasAnyParent()) redirect("/setup");
  const s = await currentSession();
  if (s?.role === "kid") redirect("/kid");
  const kids = listKids();

  return (
    <main className="wrap">
      <div className="topbar">
        <h1>Who's learning today?</h1>
        <nav>
          <Link href={s?.role === "parent" ? "/parent" : "/parent/login"}>Parent dashboard</Link>
        </nav>
      </div>
      {kids.length === 0 ? (
        <div className="card">
          No kids yet. A parent can add them in <Link href="/parent/settings">settings</Link>.
        </div>
      ) : (
        <div className="kidtiles">
          {kids.map((k) => (
            <Link key={k.id} href={`/login/${k.id}`} className="kidtile">
              <div className="avatar">{k.avatar}</div>
              <div className="name">{k.name}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
