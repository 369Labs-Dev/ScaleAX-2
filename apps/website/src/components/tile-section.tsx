import { Reveal } from './motion/reveal';

export interface TileSectionItem {
  title: string;
  description?: string;
  points?: string[];
}

export interface TileSectionProps {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  items: TileSectionItem[];
  columns?: 2 | 3 | 4;
  id?: string;
}

// Shared building block for the many Part B content tables that share the
// same shape — numbered item + one-line description or a short bullet list
// ("What we cover", "What you receive", "Set-up", "Ongoing services",
// "Focus areas", "Service lines", "Principles", etc.). Orange numbering,
// bold navy title, per Part C6 "Overview tiles" / "Detail panels" styling.
export function TileSection({
  eyebrow,
  headline,
  intro,
  items,
  columns = 3,
  id,
}: TileSectionProps) {
  const colsClass =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-3';

  return (
    <section id={id} className="sx-container scroll-mt-24 py-12 sm:py-16">
      {(eyebrow || headline) && (
        <Reveal className="max-w-[720px]">
          {eyebrow && <div className="sx-eyebrow">{eyebrow}</div>}
          {headline && (
            <h2 className="mt-3 text-[28px] font-black leading-[1.06] tracking-[-0.03em] text-sx-ink sm:text-[40px]">
              {headline}
            </h2>
          )}
          {intro && <p className="mt-3 text-[15px] text-sx-body sm:text-[16px]">{intro}</p>}
        </Reveal>
      )}

      <Reveal stagger className={`mt-8 grid grid-cols-1 gap-6 ${colsClass}`}>
        {items.map((item, i) => (
          <div
            key={item.title}
            className="sx-card-hover rounded-[16px] border border-sx-border bg-white p-6"
          >
            <div className="sx-figure text-[13px] font-bold text-sx-muted">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="mt-2 text-[16px] font-bold text-sx-ink">{item.title}</div>
            {item.description && (
              <p className="mt-1 text-[14px] text-sx-body">{item.description}</p>
            )}
            {item.points && (
              <ul className="mt-2 space-y-1">
                {item.points.map((point) => (
                  <li key={point} className="text-[14px] text-sx-body">
                    &middot; {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
