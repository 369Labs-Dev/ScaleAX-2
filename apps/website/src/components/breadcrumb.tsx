import Link from 'next/link';

export interface Crumb {
  label: string;
  url?: string;
}

// Part C6 — 14px muted text above the page eyebrow: Home › How we work › Build.
// Current page in navy.
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-[14px] text-sx-muted" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2">&rsaquo;</span>}
          {item.url ? (
            <Link href={item.url} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-sx-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
