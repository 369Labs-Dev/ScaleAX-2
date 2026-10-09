'use client';

import { useState } from 'react';
import { Banknote, Building2, Landmark, Percent } from 'lucide-react';
import { GIFT_CITY } from '@/lib/gift-city-data';

const { why } = GIFT_CITY;

const ICONS = [Landmark, Banknote, Percent, Building2];
const TINTS = ['bg-sx-tint-blue', 'bg-sx-tint-yellow', 'bg-sx-tint-orange', 'bg-sx-bg-light'];

// Why GIFT City: the four points as panels, one open at a time. On wide
// screens they sit in a row and the open one widens to show its text beside
// the title (hover, focus or click); below that they stack as an accordion.
// All four texts stay in the page, so nothing is hidden from search or
// screen readers.
export function WhyExplorer() {
  const [active, setActive] = useState(0);

  return (
    <section className="sx-section">
      <div className="sx-container">
        <div className="flex flex-col gap-3 xl:h-[360px] xl:flex-row">
          {why.items.map(([title, description], i) => {
            const open = i === active;
            const Icon = ICONS[i % ICONS.length];
            const panelId = `why-panel-${i}`;
            return (
              <div
                key={title}
                onMouseEnter={() => setActive(i)}
                className={`min-w-0 overflow-hidden rounded-sx transition-[flex-grow,background-color,color] duration-500 ease-sx-out motion-reduce:transition-none xl:flex xl:basis-0 xl:gap-7 xl:p-7 ${
                  open
                    ? 'bg-sx-navy text-sx-white xl:grow-[3]'
                    : `${TINTS[i % TINTS.length]} text-sx-ink xl:grow`
                }`}
              >
                <h3 className="xl:w-[136px] xl:shrink-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="flex w-full items-center gap-4 p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current xl:h-full xl:flex-col xl:items-start xl:gap-0 xl:p-0"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sx border transition-colors duration-500 ${
                        open
                          ? 'border-white/30 bg-white/10 text-sx-white'
                          : 'border-sx-ink-12 bg-sx-white text-sx-ink'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="xl:mt-auto">
                      <span
                        className={`sx-figure block text-[14px] font-bold ${open ? 'text-white/70' : 'text-sx-muted'}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`mt-1 block text-[20px] font-bold leading-[1.15] tracking-[-0.01em] transition-colors duration-500 ${open ? 'text-sx-white' : 'text-sx-ink'}`}
                      >
                        {title}
                      </span>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  inert={!open}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-sx-out motion-reduce:transition-none xl:block xl:w-[280px] xl:shrink-0 xl:self-end 2xl:w-[320px] ${
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`px-6 pb-6 text-[16px] leading-relaxed xl:p-0 xl:text-[18px] ${
                        open ? 'text-white/85' : 'text-sx-body'
                      }`}
                    >
                      {description}
                    </p>
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
