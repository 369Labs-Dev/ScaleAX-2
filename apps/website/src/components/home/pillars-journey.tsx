'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { OFFERINGS } from '@/lib/home-data';
import { ImageSlot } from '@/components/image-slot';

// "Every function a centre needs" as a lifecycle. The six pillars sit on one
// vertical line in the order a centre meets them; scrolling moves the active
// step down the line, fills the rail and dissolves the photograph beside it into the next.
// Nothing is hidden behind a click: every step shows its one-liner, what it
// covers and the pages that deliver it as buttons. Under the photograph an
// index names all six stages and marks the current one, so the whole cycle
// is readable at a glance. Without JavaScript all six steps render in full.
export function PillarsJourney({ images }: { images: Record<string, string | null> }) {
  const list = useRef<HTMLOListElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = list.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const items = Array.from(el.children);

    // A step is active while it crosses the middle band of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target));
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    items.forEach((item) => io.observe(item));

    let frame = 0;
    const fill = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - rect.top) / rect.height;
      if (rail.current) {
        rail.current.style.transform = `scaleY(${Math.min(1, Math.max(0, progress)).toFixed(4)})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(fill);
    };
    fill();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="grid gap-x-16 lg:grid-cols-12">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-24 flex h-[calc(100svh-8rem)] max-h-[780px] flex-col gap-5">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-sx">
            {OFFERINGS.map((offering, i) => {
              const on = i === active;
              return (
                <motion.div
                  key={offering.id}
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.07 }}
                  transition={{
                    opacity: on
                      ? { duration: 1.1, ease: 'easeInOut' }
                      : { duration: 0, delay: 1.1 },
                    scale: on
                      ? { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
                      : { duration: 0, delay: 1.1 },
                  }}
                  style={{ zIndex: on ? 1 : 0 }}
                  className="absolute inset-0"
                >
                  <ImageSlot
                    id={`pillar-${offering.id}`}
                    src={images[offering.id] ?? null}
                    alt=""
                    width={1200}
                    height={1500}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    kind="pillar"
                    labelPosition="top"
                    className="h-full w-full"
                  />
                </motion.div>
              );
            })}
            <div aria-hidden="true" className="sx-scrim z-[2]" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-6 p-8 text-sx-white"
            >
              <motion.span
                key={OFFERINGS[active].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="text-[24px] font-black leading-[1.05] tracking-[-0.02em]"
              >
                {OFFERINGS[active].title}
              </motion.span>
              <span className="sx-figure shrink-0 text-[16px] font-bold">
                {String(active + 1).padStart(2, '0')}
                <span className="text-white/55">
                  {' '}
                  / {String(OFFERINGS.length).padStart(2, '0')}
                </span>
              </span>
            </div>
          </div>
          <nav aria-label="Centre lifecycle stages">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-sx-ink-50">
              The six stages
            </p>
            <ol className="mt-3 grid grid-cols-2 gap-x-6">
              {OFFERINGS.map((offering, i) => {
                const on = i === active;
                return (
                  <li key={offering.id}>
                    <a
                      href={`#pillar-${offering.id}`}
                      aria-current={on ? 'step' : undefined}
                      className={`flex items-baseline gap-3 border-t py-2.5 text-[14px] font-bold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
                        on
                          ? 'border-sx-ink text-sx-ink'
                          : 'border-sx-border text-sx-ink-50 hover:text-sx-ink'
                      }`}
                    >
                      <span className="sx-figure text-[12px]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {offering.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>

      <div className="relative lg:col-span-7">
        <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-sx-ink-12" />
        <span
          ref={rail}
          aria-hidden="true"
          className="absolute bottom-0 left-[6px] top-0 w-[3px] origin-top scale-y-0 bg-sx-ink"
        />
        <ol ref={list}>
          {OFFERINGS.map((offering, i) => {
            const reached = i <= active;
            const current = i === active;
            return (
              <li
                key={offering.id}
                id={`pillar-${offering.id}`}
                data-current={current ? '' : undefined}
                className="relative scroll-mt-28 flex flex-col justify-center py-10 pl-12 md:pl-16 lg:min-h-[64vh] lg:py-14"
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 h-[15px] w-[15px] -translate-y-1/2 rounded-full border-[3px] transition-[background-color,border-color,scale] duration-500 ease-sx-out ${
                    reached ? 'border-sx-ink bg-sx-ink' : 'border-sx-ink-20 bg-sx-ground'
                  } ${current ? 'scale-[1.25]' : ''}`}
                />
                <ImageSlot
                  id={`pillar-${offering.id}`}
                  src={images[offering.id] ?? null}
                  alt=""
                  width={1200}
                  height={1500}
                  sizes="100vw"
                  kind="pillar"
                  className="mb-7 aspect-[16/10] w-full rounded-sx lg:hidden"
                />
                <div
                  className={`transition-opacity duration-700 ${current ? '' : 'lg:opacity-30'}`}
                >
                  <span className="sx-figure text-[14px] font-bold uppercase tracking-[0.14em] text-sx-ink-50">
                    Stage {String(i + 1).padStart(2, '0')} of{' '}
                    {String(OFFERINGS.length).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-[clamp(1.875rem,3.2vw,2.75rem)] font-black leading-[1.02] tracking-[-0.022em] text-sx-ink">
                    {offering.title}
                  </h3>
                  <p className="mt-4 text-[clamp(1rem,1.3vw,1.125rem)] leading-snug text-sx-body">
                    {offering.line}
                  </p>
                  <div className="mt-8 rounded-sx bg-sx-bg-light p-6 md:p-7">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-sx-ink-50">
                      What it covers
                    </p>
                    <ul className="mt-3">
                      {offering.points.map((point, p) => (
                        <li
                          key={point}
                          className="flex gap-5 border-t border-sx-border py-3.5 text-[18px] font-bold leading-snug text-sx-ink first:border-t-0 md:text-[18px]"
                        >
                          <span
                            aria-hidden="true"
                            className="sx-figure mt-[0.28em] shrink-0 text-[12px] text-sx-ink-50"
                          >
                            {String(p + 1).padStart(2, '0')}
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-3">
                    {offering.links.map((link, l) => (
                      <li key={link.url}>
                        <Link
                          href={link.url}
                          className={`sx-btn sx-btn-sm ${l === 0 ? 'sx-btn-primary' : 'sx-btn-ghost'}`}
                        >
                          {link.label}
                          <span className="sx-go sx-go-sm" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
