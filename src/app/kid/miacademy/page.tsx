import PortalMiaHud from "@/components/miacademy/PortalMiaHud";
import { requireKid } from "@/lib/auth";
import { getMiaSettings, miaDay } from "@/lib/store";
import { miaBoard } from "@/lib/miaSync";

export const dynamic = "force-dynamic";

/**
 * The Miacademy timer strip (docs/MIACADEMY.md). The Chrome extension shows
 * the same screens on Miacademy pages; this page is for checking it in the
 * portal. ?demo=1 runs it at demo speed in the preview.
 */
export default async function MiacademyPage({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const { kid } = await requireKid();
  const { demo } = await searchParams;
  const board = miaBoard(kid.id);
  return (
    <PortalMiaHud
      kidName={kid.name}
      settings={getMiaSettings(kid.id)}
      initialTimers={miaDay(kid.id)}
      initialChecklists={board.checklists}
      initialRings={board.rings}
      initialBank={board.bank}
      serverNow={Date.now()}
      demo={demo === "1" && process.env.NODE_ENV !== "production"}
    />
  );
}
