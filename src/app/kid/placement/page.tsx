import Link from "next/link";
import { redirect } from "next/navigation";
import Practice from "@/components/Practice";
import { requireKid } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PlacementPage() {
  const { kid } = await requireKid();
  if (kid.placement_done) redirect("/kid");
  return (
    <main className="wrap" style={{ maxWidth: 760 }}>
      <div className="topbar">
        <Link href="/kid">← Take a break</Link>
      </div>
      <Practice mode="placement" />
    </main>
  );
}
