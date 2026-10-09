'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';
import { gsap, useGSAP } from '@/lib/gsap';
import { motionEnabled } from '@/lib/motion';
import { ImageSlot } from '@/components/image-slot';
import { CountUp } from '@/components/motion/count-up';
import type { ProofTile } from '@/lib/home-data';

export interface HeroSlide {
  id: string;
  /** Short tab label. */
  label: string;
  headline: string;
  /** Resolved image URL, or null while the file is missing. */
  src: string | null;
  alt: string;
  /** Lead paragraph (first slide) ... */
  lead?: string;
  /** ... or a link into the page the headline comes from. */
  link?: { href: string; text: string };
}

const DWELL_MS = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;
const FADE_S = 1.6;
// Headlines past this length are set a size down so they hold the same block.
const LONG_HEADLINE = 75;
const TONES = ['#2a2a2f', '#33363d', '#3a3632', '#2f3338', '#35322f'];

// Full-viewport hero. Photographs dissolve into one another while each one
// slowly settles (a gentle push-in), and the headline changes word by word,
// each word coming into focus. Auto-advances (pausable, and paused while off
// screen); under reduced motion it never auto-advances and slides switch
// with a plain dissolve.
export function HeroCarousel({ slides, proof }: { slides: HeroSlide[]; proof: ProofTile[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [motionOn, setMotionOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const on = motionEnabled();
    setMotionOn(on);
    setPlaying(on);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((next: number) => setActive(next), []);

  const running = playing && inView;
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => go((active + 1) % slides.length), DWELL_MS);
    return () => clearTimeout(timer);
  }, [running, active, go, slides.length]);

  // Depth on scroll: the photograph falls back while the copy lifts away.
  useGSAP(
    () => {
      if (!motionOn) return;
      const q = gsap.utils.selector(root);
      const scrollTrigger = {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      };
      gsap.to(q('[data-hero-media]'), { yPercent: 14, scale: 1.1, ease: 'none', scrollTrigger });
      gsap.to(q('[data-hero-copy]'), { yPercent: -14, opacity: 0.2, ease: 'none', scrollTrigger });
    },
    { scope: root, dependencies: [motionOn] },
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={root}
        data-hero="dark"
        aria-roledescription="carousel"
        aria-label="ScaleAX at a glance"
        className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-sx-ink-deep text-sx-white"
      >
        <div data-hero-media="" className="absolute inset-0 -z-10">
          {slides.map((slide, i) => {
            const on = i === active;
            return (
              <motion.div
                key={slide.id}
                data-slide=""
                initial={false}
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.1 }}
                transition={{
                  // The incoming photograph dissolves in over the outgoing
                  // one, which only drops out once it is fully covered.
                  opacity: on
                    ? { duration: FADE_S, ease: 'easeInOut' }
                    : { duration: 0, delay: FADE_S },
                  scale: on
                    ? { duration: DWELL_MS / 1000 + FADE_S, ease: 'linear' }
                    : { duration: 0, delay: FADE_S },
                }}
                style={{ zIndex: on ? 2 : 1 }}
                className="absolute inset-0"
              >
                <ImageSlot
                  id={slide.id}
                  src={slide.src}
                  alt={slide.alt}
                  width={2400}
                  height={1500}
                  priority={i === 0}
                  kind="hero"
                  labelPosition="top"
                  background={TONES[i % TONES.length]}
                  className="h-full w-full"
                />
              </motion.div>
            );
          })}
        </div>
        <div aria-hidden="true" className="sx-scrim -z-10" />

        <div
          data-hero-copy=""
          className="sx-container pb-8 pt-[calc(var(--sx-header-h)+3rem)] md:pb-10"
        >
          <div className="grid items-end gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <div className="sx-enter grid">
                {slides.map((slide, i) => {
                  const Tag = i === 0 ? 'h1' : 'p';
                  const on = i === active;
                  return (
                    <Tag
                      key={slide.id}
                      data-headline=""
                      aria-hidden={on ? undefined : true}
                      className={`font-bold tracking-[-0.01em] text-sx-white [grid-area:1/1] ${
                        slide.headline.length > LONG_HEADLINE
                          ? 'max-w-[30ch] text-[clamp(1.875rem,3.2vw,2.75rem)] leading-[1.08]'
                          : 'max-w-[19ch] text-[clamp(2.25rem,4.6vw,4rem)] leading-[1]'
                      }`}
                    >
                      {slide.headline.split(' ').map((word, w) => (
                        <span key={`${word}-${w}`}>
                          <motion.span
                            className="inline-block will-change-transform"
                            initial={false}
                            animate={
                              on
                                ? { opacity: 1, y: '0em', filter: 'blur(0px)' }
                                : { opacity: 0, y: '0.28em', filter: 'blur(10px)' }
                            }
                            transition={
                              on
                                ? { duration: 1.1, ease: EASE, delay: 0.45 + w * 0.045 }
                                : { duration: 0.5, ease: 'easeIn', delay: w * 0.012 }
                            }
                          >
                            {word}
                          </motion.span>{' '}
                        </span>
                      ))}
                    </Tag>
                  );
                })}
              </div>

              <div className="sx-enter mt-7 grid" style={{ ['--sx-d' as string]: 2 }}>
                {slides.map((slide, i) => {
                  const on = i === active;
                  return (
                    <motion.div
                      key={slide.id}
                      data-sub=""
                      aria-hidden={on ? undefined : true}
                      inert={!on}
                      initial={false}
                      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                      transition={
                        on
                          ? { duration: 1, ease: EASE, delay: 0.85 }
                          : { duration: 0.4, ease: 'easeIn' }
                      }
                      className="max-w-[52ch] [grid-area:1/1]"
                    >
                      {slide.lead && (
                        <p className="text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.55] text-white/85">
                          {slide.lead}
                        </p>
                      )}
                      {slide.link && (
                        <Link
                          href={slide.link.href}
                          className="group inline-flex items-center gap-3 text-[clamp(1rem,1.3vw,1.125rem)] font-bold text-sx-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          <span className="sx-link">{slide.link.text}</span>
                          <span className="sx-btn-arrow" aria-hidden="true">
                            &rarr;
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div
                className="sx-enter mt-9 flex flex-wrap gap-3"
                style={{ ['--sx-d' as string]: 3 }}
              >
                <Link href="/contact" className="sx-btn sx-btn-light">
                  Plan your centre
                  <span className="sx-go" aria-hidden="true" />
                </Link>
                <Link href="/calculator" className="sx-btn sx-btn-outline-light">
                  Estimate your cost
                </Link>
              </div>
            </div>

            <dl
              className="sx-enter grid grid-cols-3 gap-6 border-t border-white/25 pt-5 lg:col-span-3 lg:grid-cols-1 lg:gap-0 lg:border-t-0 lg:pt-0"
              style={{ ['--sx-d' as string]: 4 }}
            >
              {proof.map((tile) => (
                <div key={tile.label} className="lg:border-t lg:border-white/25 lg:py-4">
                  <dt className="text-[24px] font-bold leading-none tracking-[-0.01em] text-sx-white md:text-[32px]">
                    <CountUp value={tile.figure} className="sx-figure" />
                  </dt>
                  <dd className="mt-2 text-[14px] font-bold text-white/70">{tile.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 flex items-end gap-4 md:mt-14">
            <ol className="grid flex-1 grid-cols-5 gap-2 md:gap-5">
              {slides.map((slide, i) => {
                const current = i === active;
                return (
                  <li
                    key={slide.id}
                    data-active={current ? '' : undefined}
                    data-playing={current && running ? '' : undefined}
                    style={{ ['--sx-dwell' as string]: `${DWELL_MS}ms` }}
                  >
                    <span className="sx-progress-track block h-[2px] overflow-hidden bg-white/25">
                      <span className="sx-progress block h-full bg-sx-white" />
                    </span>
                    <button
                      type="button"
                      aria-label={`Show slide ${i + 1} of ${slides.length}: ${slide.label}`}
                      aria-current={current ? 'true' : undefined}
                      onClick={() => go(i)}
                      className={`group flex w-full items-baseline gap-2 pb-1 pt-3 text-left text-[14px] font-bold transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-[14px] ${
                        current ? 'text-sx-white' : 'text-white/55 hover:text-sx-white'
                      }`}
                    >
                      <span className="sx-figure">{String(i + 1).padStart(2, '0')}</span>
                      <span className="hidden sm:inline">{slide.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {motionOn && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                aria-label={playing ? 'Pause slides' : 'Play slides'}
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sx text-white/70 shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.3)] transition-colors duration-200 hover:text-sx-white hover:shadow-[inset_0_0_0_1.5px_#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {playing ? (
                  <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Play className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
