import Link from "next/link";
import { notFound } from "next/navigation";
import BlockTimer from "@/components/BlockTimer";
import { requireKid } from "@/lib/auth";
import { dayBlocks } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function BlockPage({ params }: { params: Promise<{ id: string }> }) {
  const { kid } = await requireKid();
  const { id } = await params;
  const status = dayBlocks(kid.id).find((b) => b.block.id === id);
  if (!status || status.block.kind !== "guided") notFound();
  const { block, idea, state } = status;

  return (
    <main className="wrap" style={{ maxWidth: 720 }}>
      <div className="topbar">
        <Link href="/kid" className="backlink">
          ← Base
        </Link>
      </div>
      <div className="kcard" style={{ ["--t-hue" as string]: block.hue }}>
        <div className="eyebrow">2-hour day · {block.minutes}-minute block</div>
        <h1>
          {block.icon} {block.label}
        </h1>
        <div className="teacher-note">
          <div className="eyebrow">Today&apos;s idea</div>
          <p className="big-text">{idea}</p>
        </div>
        <details style={{ marginTop: 12 }}>
          <summary className="kmuted">Other ideas</summary>
          <ul>
            {block.ideas
              .filter((i) => i !== idea)
              .map((i) => (
                <li key={i} className="kmuted">
                  {i}
                </li>
              ))}
          </ul>
        </details>
      </div>
      <BlockTimer blockId={block.id} label={block.label} minutes={block.minutes} initial={state} />
    </main>
  );
}
