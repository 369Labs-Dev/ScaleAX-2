'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import { motionEnabled } from '@/lib/motion';

// Mounted once in the root layout. Owns everything scroll-driven that is not
// specific to one component:
//   - Lenis smooth scrolling (mouse and trackpad only, never touch)
//   - h2 headlines: words come into focus one after another
//   - [data-scrub-text]: words light up in step with the scroll position
//   - [data-zoom] frames: the photograph eases back from a close crop
//   - [data-expand] full-bleed bands: open from a rounded inset frame
//   - [data-parallax] media: drifts inside its frame while on screen
//   - [data-reveal="draw"] hairlines: draw from left to right
// All of it is skipped under prefers-reduced-motion (html.sx-motion absent),
// and nothing here hides content before JavaScript runs.
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (!motionEnabled() || !window.matchMedia('(pointer: fine)').matches) return;
    const lenis = new Lenis({ duration: 1.35, anchors: { offset: -88 } });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const main = document.querySelector('main');
      if (!main) return;
      const fold = window.innerHeight * 0.9;
      const belowFold = (el: Element) => el.getBoundingClientRect().top > fold;

      // Section headlines come into focus word by word.
      main.querySelectorAll<HTMLElement>('h2:not([data-no-split]), [data-split]').forEach((el) => {
        if (el.hasAttribute('data-scrub-text') || !belowFold(el)) return;
        SplitText.create(el, {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0,
              yPercent: 35,
              filter: 'blur(8px)',
              duration: 1.1,
              ease: 'power3.out',
              stagger: 0.04,
              scrollTrigger: { trigger: el, start: 'top 86%', once: true },
            }),
        });
      });

      // Statements set on photography light up as the visitor reads down.
      main.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
        if (!belowFold(el)) return;
        SplitText.create(el, {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.22 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: 'top 82%', end: 'top 32%', scrub: 0.6 },
              },
            ),
        });
      });

      // Framed photographs ease back from a close crop as they travel up.
      main.querySelectorAll<HTMLElement>('[data-zoom]').forEach((el) => {
        const inner = el.firstElementChild;
        if (!inner) return;
        gsap.fromTo(
          inner,
          { scale: 1.22 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 45%', scrub: 0.6 },
          },
        );
      });

      // Full-bleed bands start slightly inset and open out to the page edge.
      // Not on narrow screens: the inset would crop the copy inside the band.
      main.querySelectorAll<HTMLElement>('[data-expand]').forEach((el) => {
        if (!belowFold(el) || window.innerWidth < 768) return;
        gsap.fromTo(
          el,
          { clipPath: 'inset(10% 7% 10% 7% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 10%', scrub: 0.6 },
          },
        );
      });

      main.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const frame = el.parentElement;
        if (!frame) return;
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );
      });

      main.querySelectorAll<HTMLElement>('[data-reveal="draw"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        );
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
