/** Kid pages get the bright game theme (see .kidworld in globals.css). */
export default function KidLayout({ children }: { children: React.ReactNode }) {
  return <div className="kidworld">{children}</div>;
}
