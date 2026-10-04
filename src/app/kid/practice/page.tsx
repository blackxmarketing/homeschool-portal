import Link from "next/link";
import Practice from "@/components/Practice";
import { requireKid } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PracticePage({ searchParams }: { searchParams: Promise<{ skill?: string; mode?: string }> }) {
  await requireKid();
  const { skill, mode } = await searchParams;
  return (
    <main className="wrap" style={{ maxWidth: 760 }}>
      <div className="topbar">
        <Link href="/kid">← My plan</Link>
      </div>
      <Practice key={`${mode}:${skill}`} mode={mode === "review" ? "review" : "learn"} skillId={skill} />
    </main>
  );
}
