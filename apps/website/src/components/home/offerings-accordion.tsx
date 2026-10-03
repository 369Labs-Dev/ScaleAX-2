'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OFFERINGS } from '@/lib/home-data';
import { AccordionIcon } from '@/components/motion/accordion-icon';

// W8 — "Every function a centre needs" pillar list. Visually the
// reference's numbered rows (number, title, one-liner, hairline dividers,
// hover indent); each row is a disclosure that opens onto the pages on our
// site that deliver that pillar. One open at a time, none open by default.
export function OfferingsAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ol className="border-t border-sx-border">
      {OFFERINGS.map((offering, i) => {
        const isOpen = open === offering.id;
        const panelId = `offering-${offering.id}`;
        return (
          <li key={offering.id} className="border-b border-sx-border">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : offering.id)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-7 text-left transition-[padding] duration-300 ease-sx-out hover:pl-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink md:grid-cols-12 md:gap-6"
              >
                <span className="sx-figure text-[14px] font-bold text-sx-muted md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="col-start-1 text-[24px] font-black leading-tight tracking-[-0.025em] text-sx-ink md:col-span-4 md:col-start-auto lg:text-[27px]">
                  {offering.title}
                </span>
                <span className="col-start-1 text-[16px] font-normal text-sx-body md:col-span-6 md:col-start-auto">
                  {offering.line}
                </span>
                <span className="col-start-2 row-span-3 row-start-1 justify-self-end md:col-span-1 md:col-start-auto md:row-span-1 md:row-start-auto">
                  <AccordionIcon open={isOpen} />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} className="sx-drop pb-7 md:grid md:grid-cols-12 md:gap-6">
                <ul className="flex flex-wrap gap-2 md:col-span-11 md:col-start-2">
                  {offering.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="group inline-flex items-center gap-2 rounded-full bg-sx-bg-light px-4 py-2 text-[14px] font-bold text-sx-ink transition-colors duration-200 hover:bg-sx-ink hover:text-sx-white"
                      >
                        {link.label}
                        <span className="sx-btn-arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
