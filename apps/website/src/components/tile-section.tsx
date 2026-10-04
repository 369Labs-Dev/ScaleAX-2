import { Reveal } from './motion/reveal';
import { SectionHeader, sectionBodyClass } from './section-header';

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

// Shared block for the many content lists of the same shape: numbered item
// plus a one-line description or a short bullet list. W9: an open, ruled
// list beside a sticky section header instead of a grid of boxed cards.
export function TileSection({
  eyebrow,
  headline,
  intro,
  items,
  columns = 3,
  id,
}: TileSectionProps) {
  const hasHeader = Boolean(eyebrow || headline);
  const colsClass = hasHeader
    ? 'sm:grid-cols-2'
    : columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section id={id} className="sx-container scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
        <SectionHeader eyebrow={eyebrow} headline={headline} intro={intro} />
        <Reveal
          stagger
          className={`grid grid-cols-1 gap-x-10 border-t border-sx-ink ${colsClass} ${sectionBodyClass(hasHeader)}`}
        >
          {items.map((item, i) => (
            <div key={item.title} className="group relative border-b border-sx-border py-7">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-sx-ink transition-transform duration-700 ease-sx-out group-hover:scale-x-100"
              />
              <div className="sx-figure text-[13px] font-bold text-sx-ink-50 transition-colors duration-300 group-hover:text-sx-ink">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-3 text-[20px] font-black leading-snug tracking-[-0.015em] text-sx-ink">
                {item.title}
              </div>
              {item.description && (
                <p className="mt-2 text-[15px] leading-relaxed text-sx-body">{item.description}</p>
              )}
              {item.points && (
                <ul className="mt-3 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="text-[15px] text-sx-body">
                      &middot; {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
