import MiaHud from "@/components/miacademy/MiaHud";
import { requireKid } from "@/lib/auth";
import { getMiaSettings, miaDay } from "@/lib/store";

export const dynamic = "force-dynamic";

/**
 * The Miacademy timer strip. The desktop app shows this page in a narrow
 * window on the right of the screen while Miacademy is open
 * (docs/MIACADEMY.md). ?demo=1 runs it at demo speed in the preview.
 */
export default async function MiacademyPage({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const { kid } = await requireKid();
  const { demo } = await searchParams;
  return (
    <MiaHud
      settings={getMiaSettings(kid.id)}
      initialTimers={miaDay(kid.id)}
      serverNow={Date.now()}
      demo={demo === "1" && process.env.NODE_ENV !== "production"}
    />
  );
}
