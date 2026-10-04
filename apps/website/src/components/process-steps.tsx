'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { motionEnabled } from '@/lib/motion';

export interface ProcessStep {
  label: string;
  when?: string;
  body: string;
}

export interface ProcessStepsProps {
  eyebrow?: string;
  headline?: string;
  steps: ProcessStep[];
  id?: string;
}

// Process steps as a timeline. On large screens one line runs through the
// middle of the band with a numbered stop for each step; the steps sit
// alternately above and below it. The line fills from the left as the band
// scrolls through the viewport and each stop switches on as the line
// reaches it. On small screens the same line runs down the left edge.
// Without motion everything is drawn complete.
export function ProcessSteps({ eyebrow, headline, steps, id }: ProcessStepsProps) {
  const list = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const el = list.current;
      if (!el || !motionEnabled()) return;
      const items = gsap.utils.toArray<HTMLElement>(el.children);
      const lines = items.map((item) => item.querySelector<HTMLElement>('[data-step-line]'));
      const count = items.length;

      const draw = (progress: number) => {
        items.forEach((item, i) => {
          const local = gsap.utils.clamp(0, 1, progress * count - i);
          const line = lines[i];
          if (line) line.style.setProperty('--sx-p', local.toFixed(4));
          item.toggleAttribute('data-on', progress * count > i - 0.02 && progress > 0);
        });
      };

      el.setAttribute('data-armed', '');
      draw(0);
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        end: 'bottom 62%',
        scrub: 0.6,
        onUpdate: (self) => draw(self.progress),
        onRefresh: (self) => draw(self.progress),
      });

      return () => {
        trigger.kill();
        el.removeAttribute('data-armed');
        items.forEach((item, i) => {
          item.removeAttribute('data-on');
          const line = lines[i];
          if (line) line.style.removeProperty('--sx-p');
        });
      };
    },
    { scope: list, dependencies: [steps.length] },
  );

  return (
    <section id={id} className="scroll-mt-24 bg-sx-bg-light py-16 md:py-24">
      <div className="sx-container">
        {(eyebrow || headline) && (
          <div className="max-w-[820px]">
            {eyebrow && <div className="sx-eyebrow">{eyebrow}</div>}
            {headline && (
              <h2 className="mt-5 text-[clamp(1.9rem,3.2vw,2.9rem)] font-black leading-[1.04] tracking-[-0.02em] text-sx-ink">
                {headline}
              </h2>
            )}
          </div>
        )}

        <ol
          ref={list}
          className="sx-steps mt-12 grid lg:mt-16 lg:[grid-template-columns:repeat(var(--sx-steps),minmax(0,1fr))] lg:grid-rows-[auto_auto_auto]"
          style={{ ['--sx-steps' as string]: steps.length }}
        >
          {steps.map((step, i) => {
            const above = i % 2 === 0;
            return (
              <li
                key={step.label}
                className="sx-step grid grid-cols-[40px_minmax(0,1fr)] gap-x-5 lg:row-span-3 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-x-0"
              >
                <div
                  className={`sx-step-card relative col-start-2 pb-10 lg:col-start-1 lg:pb-0 lg:pr-8 ${
                    above ? 'lg:row-start-1 lg:self-end lg:pb-9' : 'lg:row-start-3 lg:pt-9'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-5 hidden h-9 w-px bg-sx-ink-20 lg:block ${
                      above ? 'bottom-0' : 'top-0'
                    }`}
                  />
                  {step.when && (
                    <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-sx-muted">
                      {step.when}
                    </div>
                  )}
                  <div className="mt-1 text-[22px] font-black leading-snug tracking-[-0.015em] text-sx-ink">
                    {step.label}
                  </div>
                  <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-sx-body">
                    {step.body}
                  </p>
                </div>
                <div className="relative col-start-1 row-start-1 flex justify-center lg:row-start-2 lg:h-10 lg:items-center lg:justify-start">
                  {/* The road: a faint track with the travelled part drawn over it. */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-sx-ink-20 lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-1/2 lg:h-px lg:w-auto lg:translate-x-0"
                  />
                  <span
                    aria-hidden="true"
                    data-step-line=""
                    className="absolute bottom-0 left-1/2 top-0 -ml-px w-[2px] origin-top bg-sx-ink lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-1/2 lg:-mt-px lg:ml-0 lg:h-[2px] lg:w-auto lg:origin-left"
                  />
                  <span className="sx-step-node sx-figure relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold">
                    {i + 1}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
