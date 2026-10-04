import Link from "next/link";
import { redirect } from "next/navigation";
import Practice from "@/components/Practice";
import { requireKid } from "@/lib/auth";
import { getFocus } from "@/lib/store";
import { breakIdeas, features } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PlacementPage() {
  const { kid } = await requireKid();
  if (kid.placement_done) redirect("/kid");
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <div className="topbar">
        <Link href="/kid" className="backlink">
          ← Take a break
        </Link>
      </div>
      <Practice mode="placement" focus={getFocus(kid.id)} features={features()} breaks={breakIdeas()} />
    </main>
  );
}
