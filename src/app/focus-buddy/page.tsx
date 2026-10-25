import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Focus Buddy" };

/** Focus Buddy's homepage, for the Chrome Web Store listing. Public: no login. */
export default function FocusBuddyHome() {
  return (
    <main className="wrap" style={{ maxWidth: 720 }}>
      <div className="card">
        <h1>Focus Buddy</h1>
        <p>
          Focus Buddy is a Chrome extension made by one family for their own children. It puts friendly 30-minute learning timers
          next to Miacademy lessons and works only with the family&apos;s own homeschool portal.
        </p>
        <h2>What it does</h2>
        <ul>
          <li>Four visual timers (Math, Language Arts, Science, History), one 30-minute block each, with a teacher&apos;s voice for time checks and focus check-ins.</li>
          <li>A step-by-step checklist that follows the lessons a parent marked in Miacademy.</li>
          <li>Help and break buttons, a quick break between classes with an animal buddy, and weekly rings that fill a buddy bank.</li>
          <li>Parent mode: on a parent&apos;s computer it reads (never changes) each child&apos;s Miacademy calendar.</li>
        </ul>
        <h2>Setting it up</h2>
        <p>
          A parent connects each computer with a one-time code from the portal&apos;s Settings page. Without that code the extension
          does nothing.
        </p>
        <p>
          <Link href="/focus-buddy/privacy">Privacy</Link>
        </p>
      </div>
    </main>
  );
}
