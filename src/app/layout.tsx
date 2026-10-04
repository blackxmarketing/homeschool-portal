import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import "./game.css";
import "./teach.css";

// Lexend was designed to reduce visual stress and improve reading speed.
const kidFont = Lexend({ subsets: ["latin"], variable: "--font-kid", display: "swap" });

export const metadata: Metadata = {
  title: "Learning Portal",
  description: "Mastery-based learning at each kid's own pace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={kidFont.variable}>
      <body>{children}</body>
    </html>
  );
}
