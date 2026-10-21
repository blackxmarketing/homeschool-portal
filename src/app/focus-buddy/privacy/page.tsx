import type { Metadata } from "next";

export const metadata: Metadata = { title: "Focus Buddy privacy" };

/** The privacy page the Chrome Web Store listing links to. Public: no login. */
export default function FocusBuddyPrivacy() {
  return (
    <main className="wrap" style={{ maxWidth: 720 }}>
      <div className="card">
        <h1>Focus Buddy privacy</h1>
        <p>
          Focus Buddy is a Chrome extension made by one family for their own children. It shows learning timers next to
          Miacademy and works only with the family&apos;s own homeschool portal.
        </p>
        <h2>What it uses</h2>
        <ul>
          <li>
            <strong>Which timer is running, and when:</strong> start, pause, help, break and finish times for each subject, sent to
            the family&apos;s portal so parents can see them.
          </li>
          <li>
            <strong>A connection token:</strong> made when a parent connects the extension with a code. It is stored in Chrome on
            the child&apos;s computer and identifies which child the timers belong to.
          </li>
          <li>
            <strong>Spoken reminders:</strong> short fixed sentences (like &quot;5 minutes left&quot;) are turned into speech by the
            portal or by Chrome.
          </li>
        </ul>
        <h2>What it does not do</h2>
        <ul>
          <li>It does not collect names, passwords, browsing history, or anything typed into Miacademy.</li>
          <li>It does not sell or share data, show ads, or send anything to anyone other than the family&apos;s own portal.</li>
          <li>It only runs on Miacademy pages.</li>
        </ul>
        <h2>Removing data</h2>
        <p>
          Parents can disconnect a computer from the portal&apos;s Settings page at any time; removing the extension deletes the
          token from Chrome.
        </p>
      </div>
    </main>
  );
}
