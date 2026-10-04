import Link from "next/link";
import { logoutAction } from "@/app/actions";

export default function ParentNav({ title }: { title: string }) {
  return (
    <div className="topbar noprint">
      <h1>{title}</h1>
      <nav>
        <Link href="/parent">Overview</Link>
        <Link href="/parent/compliance">Colorado records</Link>
        <Link href="/parent/settings">Settings</Link>
        <Link href="/parent/content">Content</Link>
        <Link href="/">Kid login</Link>
        <form action={logoutAction}>
          <button className="linkbtn">Log out</button>
        </form>
      </nav>
    </div>
  );
}
