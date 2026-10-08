'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { motionEnabled } from '@/lib/motion';
import { ImageSlot } from '@/components/image-slot';
import type { ModelCard } from '@/lib/home-data';

// "Four ways to work with us": four photographic panels with the copy set on
// top. On desktop the section holds still while vertical scroll drives the
// row sideways; on touch, small screens and under reduced motion it is an
// ordinary swipeable row. The hold is CSS `position: sticky` inside a taller
// wrapper (not a script-driven pin), so nothing on the page jumps when it
// starts or ends. `children` is the section's heading block.
export function ModelsRail({
  models,
  images,
  children,
}: {
  models: ModelCard[];
  images: Record<string, string | null>;
  children: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const el = track.current;
        const viewport = el?.parentElement;
        const outer = wrap.current;
        if (!el || !viewport || !outer) return;
        const distance = () => Math.max(0, el.scrollWidth - viewport.clientWidth);
        viewport.style.overflowX = 'hidden';
        // The wrapper is one screen plus the sideways travel tall; the
        // section sticks inside it for exactly that travel.
        const size = () => {
          outer.style.height = `${window.innerHeight + distance()}px`;
        };
        size();
        ScrollTrigger.addEventListener('refreshInit', size);
        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        // Each photograph drifts against the direction of travel, so the
        // panels read as windows rather than flat cards.
        el.querySelectorAll<HTMLElement>('[data-card-media]').forEach((media) => {
          gsap.fromTo(
            media,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: media.parentElement,
                containerAnimation: slide,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });
        return () => {
          ScrollTrigger.removeEventListener('refreshInit', size);
          viewport.style.overflowX = '';
          outer.style.height = '';
        };
      });
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap}>
      <section
        ref={root}
        className="flex flex-col justify-center overflow-hidden bg-sx-ground py-24 lg:sticky lg:top-0 lg:min-h-screen lg:py-16"
      >
        <div className="sx-container">{children}</div>
        <div className="mt-12 overflow-x-auto [scrollbar-width:none] lg:mt-14">
          <ol
            ref={track}
            className="flex w-max gap-5 px-5 md:px-10 xl:px-[max(56px,calc((100vw-var(--sx-content-width))/2+56px))]"
          >
            {models.map((model, i) => (
              <li key={model.id} className="w-[82vw] shrink-0 sm:w-[60vw] lg:w-[46vw] xl:w-[40vw]">
                <Link
                  href={model.url}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-sx p-7 text-sx-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink sm:aspect-[16/11] md:p-10 lg:aspect-auto lg:h-[min(58vh,560px)]"
                >
                  <div data-card-media="" className="absolute inset-y-0 -inset-x-[9%] -z-10">
                    <ImageSlot
                      id={`model-${model.id}`}
                      src={images[model.id] ?? null}
                      alt=""
                      width={1600}
                      height={1200}
                      sizes="(min-width: 1024px) 46vw, 82vw"
                      kind="model"
                      labelPosition="top"
                      className="h-full w-full [&_img]:transition-transform [&_img]:duration-[1200ms] [&_img]:ease-sx-out group-hover:[&_img]:scale-[1.05]"
                    />
                  </div>
                  <div aria-hidden="true" className="sx-scrim -z-10" />
                  <span className="sx-figure absolute left-7 top-7 text-[14px] font-bold text-white/80 md:left-10 md:top-10">
                    {String(i + 1).padStart(2, '0')} / {String(models.length).padStart(2, '0')}
                  </span>
                  <h3 className="text-[32px] font-black leading-[1.02] tracking-[-0.03em] text-sx-white md:text-[40px]">
                    {model.name}
                  </h3>
                  <p className="mt-3 flex items-center justify-between gap-6 text-[18px] text-white/85">
                    {model.tagline}
                    <span aria-hidden="true" className="sx-go sx-go-lg" />
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
