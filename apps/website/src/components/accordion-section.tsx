'use client';

import { useState } from 'react';
import { Reveal } from './motion/reveal';
import { AccordionIcon } from './motion/accordion-icon';

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

// Shared expandable-panel component, used for Part B's "Workstream detail"
// (Build, B3 — brief: "Show each workstream as an expandable panel") and
// About's "Our values" (brief: "Show as four tabs; the first is open" — the
// same accordion pattern used for the homepage's "What you get" (S4) is
// reused here rather than building a separate tabs widget, since visually
// and functionally they're the same "one open at a time" interaction; this
// is a deliberate, noted simplification of "tabs" to "accordion").
export function AccordionSection({
  eyebrow,
  headline,
  items,
  defaultOpenIndex = 0,
  id,
}: AccordionSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <section id={id} className="sx-container scroll-mt-24 py-12 sm:py-16">
      {(eyebrow || headline) && (
        <Reveal className="max-w-[720px]">
          {eyebrow && <div className="sx-eyebrow">{eyebrow}</div>}
          {headline && (
            <h2 className="mt-3 text-[28px] font-black leading-[1.06] tracking-[-0.03em] text-sx-ink sm:text-[40px]">
              {headline}
            </h2>
          )}
        </Reveal>
      )}

      <Reveal
        stagger
        className="mt-8 divide-y divide-sx-border overflow-hidden rounded-[16px] border border-sx-border bg-white"
      >
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${id ?? 'accordion'}-panel-${index}`;
          return (
            <div key={item.title}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-sx-bg-light/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sx-ink"
                >
                  <span className="text-[16px] font-bold text-sx-ink">{item.title}</span>
                  <AccordionIcon open={isOpen} />
                </button>
              </h3>
              {isOpen && (
                <div id={panelId} className="sx-drop px-5 pb-5">
                  {item.points.length === 1 ? (
                    <p className="text-[14px] text-sx-body">{item.points[0]}</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {item.points.map((point) => (
                        <li key={point} className="text-[14px] text-sx-body">
                          &middot; {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
