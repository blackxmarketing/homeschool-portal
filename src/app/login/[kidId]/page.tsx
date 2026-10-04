import Link from "next/link";
import { notFound } from "next/navigation";
import { kidLoginAction } from "../../actions";
import { getKid } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function KidLogin({
  params,
  searchParams,
}: {
  params: Promise<{ kidId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const kid = getKid(Number((await params).kidId));
  if (!kid) notFound();
  const { error } = await searchParams;
  return (
    <div className="kidworld">
    <main className="wrap" style={{ maxWidth: 420, textAlign: "center" }}>
      <div style={{ fontSize: "4rem" }}>{kid.avatar}</div>
      <h1>Hi, {kid.name}!</h1>
      {error && <div className="error">{error}</div>}
      <form action={kidLoginAction} className="card">
        <input type="hidden" name="kidId" value={kid.id} />
        <label htmlFor="pin">Type your 4-digit PIN</label>
        <input
          id="pin"
          name="pin"
          className="pin"
          style={{ margin: "0 auto" }}
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          autoComplete="off"
          autoFocus
          required
        />
        <p />
        <button className="kbtn big">Let&apos;s go! 🚀</button>
      </form>
      <Link href="/">← Not you?</Link>
    </main>
    </div>
  );
}
