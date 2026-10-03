import Link from 'next/link';
import { WHERE_NEXT_BY_PAGE, WHERE_NEXT_CARDS } from '@/lib/site-data';
import { getIcon } from './icon-map';
import { Reveal } from './motion/reveal';

// Part 0.3 block 8 / Part C6 "Where next band" — solid full-width band,
// 360px tall on desktop, four equal clickable columns (2x2 on mobile, 1
// column <480px). W8: deep forest-green ground with the reference's
// hairline-divided card grid; W7 stagger + hover lift retained.
export function WhereNext({ page }: { page: string }) {
  const cardIds = WHERE_NEXT_BY_PAGE[page] ?? WHERE_NEXT_BY_PAGE.plan;
  const cards = cardIds.map((id) => WHERE_NEXT_CARDS[id]);

  return (
    <section className="relative isolate overflow-hidden bg-sx-ink py-20 text-sx-white sm:min-h-[360px] sm:py-28">
      <div
        aria-hidden="true"
        className="sx-grid-lines-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_90%_at_100%_0%,#000_10%,transparent_70%)]"
      />
      <div className="sx-container">
        <Reveal className="sx-eyebrow !text-white/55">Where next</Reveal>
        <Reveal
          stagger
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-white/15 bg-white/15 xs:grid-cols-2 sm:grid-cols-4"
        >
          {cards.map((card) => {
            const Icon = getIcon(card.icon);
            return (
              <Link
                key={card.url}
                href={card.url}
                className="group flex flex-col gap-3 bg-sx-ink p-7 transition-[background-color] duration-300 hover:bg-sx-ink-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
              >
                <Icon
                  className="h-7 w-7 text-sx-white transition-[translate] duration-300 ease-sx-out group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/55">
                  {card.eyebrow}
                </div>
                <div className="text-[20px] font-black leading-snug tracking-[-0.02em] text-sx-white sm:text-[22px]">
                  {card.title}
                </div>
                <div className="mt-auto flex items-center gap-1 pt-2 text-white/70 group-hover:text-sx-white">
                  <span className="h-px w-6 origin-left scale-x-0 bg-current transition-transform duration-300 ease-sx-out group-hover:scale-x-100" />
                  <span className="sx-btn-arrow">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
