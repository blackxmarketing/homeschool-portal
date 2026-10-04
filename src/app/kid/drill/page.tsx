import Link from "next/link";
import { redirect } from "next/navigation";
import Drill from "@/components/Drill";
import { drillSettings } from "@/lib/content";
import { requireKid } from "@/lib/auth";
import { capStatus } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function DrillPage() {
  const { kid } = await requireKid();
  if (capStatus(kid.id).reached) redirect("/kid");
  const DRILL = drillSettings();
  return (
    <main className="wrap" style={{ maxWidth: 640 }}>
      <div className="topbar">
        <Link href="/kid" className="backlink">
          ← Base
        </Link>
      </div>
      <h1 style={{ marginBottom: 12 }}>⚡ Fact speed drill</h1>
      <Drill seconds={DRILL.seconds} fluent={DRILL.fluentPerMinute} />
    </main>
  );
}
