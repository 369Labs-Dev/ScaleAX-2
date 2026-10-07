'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AccordionIcon } from '@/components/motion/accordion-icon';
import { GIFT_CITY, LEAD_ROUTES } from '@/lib/gift-city-data';

const { ifsc } = GIFT_CITY;

// IFSC route selector: eight licence routes as cards (the first three, the
// ones most capability centres use, are set apart). Choosing a card shows
// its rules and its own set-up journey underneath; the GIC is open first.
export function RouteSelector() {
  const [activeKey, setActiveKey] = useState(ifsc.routes[0].key);
  const [openStage, setOpenStage] = useState<number | null>(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const route = ifsc.routes.find((r) => r.key === activeKey) ?? ifsc.routes[0];

  // The detail panel sits below two rows of cards, so a click can look like
  // it did nothing. Bring the panel into view unless it is already near the top.
  const revealPanel = () => {
    const panel = panelRef.current;
    if (!panel) return;
    if (panel.getBoundingClientRect().top < window.innerHeight * 0.35) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="IFSC licence routes"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {ifsc.routes.map((r, i) => {
          const selected = r.key === route.key;
          return (
            <button
              key={r.key}
              type="button"
              role="tab"
              id={`route-tab-${r.key}`}
              aria-selected={selected}
              aria-controls="route-panel"
              onClick={() => {
                setActiveKey(r.key);
                setOpenStage(0);
                revealPanel();
              }}
              className={`flex flex-col rounded-sx border p-5 text-left transition-[background-color,border-color,color] duration-300 ease-sx-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
                selected
                  ? 'border-sx-ink bg-sx-ink text-sx-white'
                  : `border-sx-border text-sx-ink hover:border-sx-ink ${i < LEAD_ROUTES ? 'bg-sx-tint-blue' : 'bg-sx-white'}`
              }`}
            >
              <span
                className={`text-[12px] font-bold uppercase tracking-[0.1em] ${selected ? 'text-white/65' : 'text-sx-muted'}`}
              >
                {r.forWho}
              </span>
              <span className="mt-3 text-[18px] font-black leading-[1.15] tracking-[-0.015em]">
                {r.name}
              </span>
              <span
                className={`mt-3 text-[14px] leading-relaxed ${selected ? 'text-white/80' : 'text-sx-body'}`}
              >
                {r.summary}
              </span>
              <span
                className={`mt-auto pt-5 text-[13px] font-bold ${selected ? 'text-white' : 'text-sx-ink'}`}
              >
                {r.weeks}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        id="route-panel"
        role="tabpanel"
        aria-labelledby={`route-tab-${route.key}`}
        className="mt-6 scroll-mt-24 rounded-sx border border-sx-border bg-sx-white p-6 md:p-10"
      >
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <h3 className="text-[clamp(1.6rem,2.6vw,2.3rem)] font-black leading-[1.05] tracking-[-0.02em] text-sx-ink">
              {route.name}
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-sx-body">{route.summary}</p>
            {route.rule && (
              <p className="mt-5 border-l-2 border-sx-ink pl-4 text-[14px] font-bold leading-relaxed text-sx-ink">
                {route.rule}
              </p>
            )}
            <Link
              href="/contact"
              className="sx-btn sx-btn-primary mt-8 h-auto max-w-full whitespace-normal py-3 text-left"
            >
              Start a {route.name.replace(/ \(.*\)$/, '')} set-up
              <span className="sx-btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
          {route.points && (
            <dl className="border-t border-sx-ink lg:col-span-7">
              {route.points.map(([label, text]) => (
                <div
                  key={label}
                  className="grid gap-x-6 gap-y-1 border-b border-sx-border py-4 sm:grid-cols-[11rem_1fr]"
                >
                  <dt className="text-[14px] font-bold text-sx-ink">{label}</dt>
                  <dd className="text-[15px] leading-relaxed text-sx-body">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mt-10 border-t border-sx-border pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h4 className="text-[20px] font-black tracking-[-0.015em] text-sx-ink">
              {ifsc.journeyHeading}
            </h4>
            <span className="text-[14px] font-bold text-sx-ink">{route.weeks}</span>
          </div>

          {/* Timeline bar: one segment per stage, the open one filled. */}
          <ol aria-hidden="true" className="mt-5 hidden gap-1.5 md:flex">
            {route.journey.map(([stage, time], i) => (
              <li key={stage} className="min-w-0 flex-1">
                <span
                  className={`block h-1.5 rounded-full transition-colors duration-300 ${openStage === i ? 'bg-sx-ink' : 'bg-sx-ink-12'}`}
                />
                <span className="mt-2 block truncate text-[12px] font-bold text-sx-ink">
                  {stage}
                </span>
                <span className="block truncate text-[12px] text-sx-muted">{time}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-sx-ink">
            {route.journey.map(([stage, time, steps], i) => {
              const isOpen = openStage === i;
              const panelId = `route-stage-${i}`;
              return (
                <div key={stage} className="border-b border-sx-border">
                  <h5>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenStage(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
                    >
                      <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="sx-figure text-[13px] font-bold text-sx-ink-50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[18px] font-black tracking-[-0.015em] text-sx-ink">
                          {stage}
                        </span>
                        <span className="text-[14px] text-sx-muted">{time}</span>
                      </span>
                      <AccordionIcon open={isOpen} />
                    </button>
                  </h5>
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-[520ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <ul className="grid gap-x-10 gap-y-2 pb-6 sm:grid-cols-2">
                        {steps.map((step) => (
                          <li key={step} className="text-[15px] leading-relaxed text-sx-body">
                            &middot; {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-[13px] text-sx-muted">{ifsc.journeyNote}</p>
        </div>
      </div>

      <div className="mt-6 rounded-sx bg-sx-tint-yellow p-6 md:p-8">
        <h3 className="text-[20px] font-black tracking-[-0.015em] text-sx-ink">
          {ifsc.outside[0]}
        </h3>
        <p className="mt-2 max-w-[80ch] text-[15px] leading-relaxed text-sx-body">
          {ifsc.outside[1]}
        </p>
      </div>
    </div>
  );
}
