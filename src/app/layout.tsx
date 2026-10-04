import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learning Portal",
  description: "Mastery-based learning at each kid's own pace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
