import Link from "next/link";
import Practice from "@/components/Practice";
import { requireKid } from "@/lib/auth";
import { getFocus } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function PracticePage({ searchParams }: { searchParams: Promise<{ skill?: string; mode?: string }> }) {
  const { kid } = await requireKid();
  const { skill, mode } = await searchParams;
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <div className="topbar">
        <Link href="/kid" className="backlink">
          ← Base
        </Link>
      </div>
      <Practice key={`${mode}:${skill}`} mode={mode === "review" ? "review" : "learn"} skillId={skill} focus={getFocus(kid.id)} />
    </main>
  );
}
