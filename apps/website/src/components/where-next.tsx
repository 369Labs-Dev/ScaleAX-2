import Link from 'next/link';
import { WHERE_NEXT_BY_PAGE, WHERE_NEXT_CARDS } from '@/lib/site-data';

const FILLS = [
  'hover:bg-sx-tint-orange',
  'hover:bg-sx-tint-blue',
  'hover:bg-sx-tint-yellow',
  'hover:bg-sx-bg-light',
];

// "Where next" band: four linked columns between hairlines. Each column
// takes a different tint on hover and its arrow steps forward.
export function WhereNext({ page }: { page: string }) {
  const cardIds = WHERE_NEXT_BY_PAGE[page] ?? WHERE_NEXT_BY_PAGE.plan;
  const cards = cardIds.map((id) => WHERE_NEXT_CARDS[id]);

  return (
    <section className="border-t border-sx-border">
      <div className="sx-container pt-16 md:pt-24">
        <div className="sx-eyebrow">Where next</div>
      </div>
      <div className="sx-container pb-16 pt-10 md:pb-24">
        <div className="grid grid-cols-1 border-l border-t border-sx-border xs:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Link
              key={card.url}
              href={card.url}
              className={`group flex min-h-[220px] flex-col border-b border-r border-sx-border p-7 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-sx-ink md:min-h-[260px] md:p-8 ${FILLS[i % FILLS.length]}`}
            >
              <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-sx-muted">
                {card.eyebrow}
              </div>
              <div className="mt-4 text-[20px] font-black leading-[1.12] tracking-[-0.02em] text-sx-ink md:text-[24px]">
                {card.title}
              </div>
              <div className="mt-auto pt-8 text-[20px] text-sx-ink">
                <span className="sx-btn-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
