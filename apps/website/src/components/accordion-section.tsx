'use client';

import { useState } from 'react';
import { AccordionIcon } from './motion/accordion-icon';
import { SectionHeader, sectionBodyClass } from './section-header';

export interface AccordionSectionItem {
  title: string;
  points: string[];
}

export interface AccordionSectionProps {
  eyebrow?: string;
  headline?: string;
  items: AccordionSectionItem[];
  defaultOpenIndex?: number | null;
  id?: string;
}

// Shared expandable panels (Build workstreams, About values, FAQs). One open
// at a time. W9: ruled rows beside a sticky section header. Panels stay in
// the page and open by easing their row from 0fr to 1fr, so the height glides
// both ways while the text fades and settles.
export function AccordionSection({
  eyebrow,
  headline,
  items,
  defaultOpenIndex = 0,
  id,
}: AccordionSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const hasHeader = Boolean(eyebrow || headline);

  return (
    <section id={id} className="sx-container scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
        <SectionHeader eyebrow={eyebrow} headline={headline} />
        <div className={`border-t border-sx-ink ${sectionBodyClass(hasHeader)}`}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${id ?? 'accordion'}-panel-${index}`;
            return (
              <div key={item.title} className="border-b border-sx-border">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
                  >
                    <span className="text-[20px] font-bold leading-snug tracking-[-0.01em] text-sx-ink md:text-[24px]">
                      {item.title}
                    </span>
                    <AccordionIcon open={isOpen} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-[520ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`max-w-[68ch] pb-7 transition-[opacity,translate] duration-[420ms] ease-sx-out motion-reduce:transition-none ${
                        isOpen ? 'opacity-100 delay-100' : '-translate-y-1.5 opacity-0'
                      }`}
                    >
                      {item.points.length === 1 ? (
                        <p className="text-[16px] leading-relaxed text-sx-body">{item.points[0]}</p>
                      ) : (
                        <ul className="space-y-2">
                          {item.points.map((point) => (
                            <li key={point} className="text-[16px] text-sx-body">
                              &middot; {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
