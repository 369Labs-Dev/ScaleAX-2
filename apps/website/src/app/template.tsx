// W7 — route-level entrance. App Router remounts a template on every
// navigation; the `.sx-page` fade (globals.css) only runs once the document
// has seen a client-side navigation (html.sx-nav) and motion is enabled, so
// the first load paints immediately and navigation is never blocked.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="sx-page">{children}</div>;
}
