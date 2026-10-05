"use client";

import { useState } from "react";

/**
 * The extras on the kid's home page (path, fact speed, missions, badges) as
 * small tabs, so the home page fits on one screen. Nothing is open at first.
 */
export default function HomeTabs({ tabs }: { tabs: { id: string; label: string; count?: number; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const current = tabs.find((t) => t.id === open);
  return (
    <div className="home-tabs">
      <div className="home-tab-row" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={open === t.id}
            className={`home-tab ${open === t.id ? "on" : ""}`}
            onClick={() => setOpen(open === t.id ? null : t.id)}
          >
            {t.label}
            {t.count ? <span className="home-tab-count">{t.count}</span> : null}
          </button>
        ))}
      </div>
      {current && (
        <div className="kcard home-tab-panel pop" role="tabpanel">
          {current.content}
        </div>
      )}
    </div>
  );
}
