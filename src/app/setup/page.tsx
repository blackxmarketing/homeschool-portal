import { redirect } from "next/navigation";
import { setupAction } from "../actions";
import { hasAnyParent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Setup({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (hasAnyParent()) redirect("/parent/login");
  const { error } = await searchParams;
  return (
    <main className="wrap" style={{ maxWidth: 560 }}>
      <h1>Set up your learning portal</h1>
      <p className="muted">Create the parent account first. You'll add your kids on the next screen.</p>
      {error && <div className="error">{error}</div>}
      <form action={setupAction} className="card">
        <label htmlFor="familyName">Family or school name</label>
        <input id="familyName" name="familyName" placeholder="Smith Family Academy" required />
        <label htmlFor="parentName">Your name</label>
        <input id="parentName" name="parentName" required />
        <label htmlFor="email">Email (used to log in)</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password (10+ characters)</label>
        <input id="password" name="password" type="password" minLength={10} required />
        <p />
        <button className="btn">Create account</button>
      </form>
    </main>
  );
}
