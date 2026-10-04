'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { motionEnabled } from '@/lib/motion';
import { CountUp } from '@/components/motion/count-up';
import { WHY_INDIA } from '@/lib/home-data';

// Distance between two neighbouring figures, measured down the arc.
const GAP_PX = 290;

// "Why India": the photograph sits in a half-circle on the left edge of the
// page, half the screen wide and completely still; only the figures move,
// riding the arc around it one at a time as the page scrolls. The layout
// lives in globals.css (.sx-orbit*) and only applies on large screens with
// motion on; everywhere else this is a photo above a plain list.
export function IndiaOrbit({ photo }: { photo: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const q = gsap.utils.selector(track);
        const items = q<HTMLElement>('[data-orbit-item]');
        const ring = q<HTMLElement>('[data-orbit-ring]')[0];
        const last = items.length - 1;

        const place = (progress: number) => {
          const radius = ring.offsetWidth / 2;
          const step = Math.asin(Math.min(0.9, GAP_PX / radius));
          const at = progress * last;
          items.forEach((item, i) => {
            const offset = i - at;
            const angle = offset * step;
            gsap.set(item, {
              x: radius * Math.cos(angle),
              y: radius * Math.sin(angle),
              yPercent: -50,
              opacity: gsap.utils.clamp(0, 1, 1 - Math.abs(offset) * 0.74),
            });
          });
        };

        place(0);
        const trigger = ScrollTrigger.create({
          trigger: track.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          onUpdate: (self) => place(self.progress),
          onRefresh: (self) => place(self.progress),
        });

        return () => {
          trigger.kill();
          gsap.set(items, { clearProps: 'all' });
        };
      });
      return () => mm.revert();
    },
    { scope: track },
  );

  return (
    <div ref={track} className="sx-orbit mt-14 md:mt-20">
      <div className="sx-orbit-stage sx-container grid gap-10">
        <div data-orbit-photo="" className="sx-orbit-photo overflow-hidden rounded-sx">
          {photo}
        </div>
        <span data-orbit-ring="" aria-hidden="true" className="sx-orbit-ring" />
        <dl className="sx-orbit-list border-t border-sx-ink">
          {WHY_INDIA.map((stat) => (
            <div
              key={stat.title}
              data-orbit-item=""
              className="sx-orbit-item grid gap-x-10 gap-y-3 border-b border-sx-border py-9 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:py-12"
            >
              <dt className="text-[64px] font-black leading-none tracking-[-0.04em] text-sx-ink md:text-[88px]">
                <CountUp value={stat.figure} className="sx-figure" />
              </dt>
              <dd>
                <p className="text-[20px] font-bold leading-snug text-sx-ink">{stat.title}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-sx-body">{stat.body}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
