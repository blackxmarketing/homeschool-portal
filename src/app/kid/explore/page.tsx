import { redirect } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { worldForGrade } from "@/lib/explore/worlds";

export const dynamic = "force-dynamic";

/** Grades K-5 go to their grade's world (docs/WORLDS.md); older kids have Lumina. */
export default async function ExploreHome() {
  const { kid } = await requireKid();
  if (kid.grade > 5) redirect("/kid");
  redirect(`/kid/explore/${worldForGrade(kid.grade).key}`);
}
