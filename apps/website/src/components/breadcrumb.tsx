import Link from 'next/link';

export interface Crumb {
  label: string;
  url?: string;
}

// Small trail above the page eyebrow: Home › How we work › Build.
export function Breadcrumb({ items, tone = 'ink' }: { items: Crumb[]; tone?: 'ink' | 'light' }) {
  const light = tone === 'light';
  return (
    <nav
      className={`text-[14px] ${light ? 'text-white/70' : 'text-sx-muted'}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2">&rsaquo;</span>}
          {item.url ? (
            <Link href={item.url} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className={light ? 'text-white' : 'text-sx-ink'}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
