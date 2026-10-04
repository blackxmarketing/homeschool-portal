import Link from "next/link";
import { parentLoginAction } from "../../actions";

export default async function ParentLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="wrap" style={{ maxWidth: 460 }}>
      <h1>Parent login</h1>
      {error && <div className="error">{error}</div>}
      <form action={parentLoginAction} className="card">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoFocus />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
        <p />
        <button className="btn">Log in</button>
      </form>
      <Link href="/">← Back</Link>
    </main>
  );
}
