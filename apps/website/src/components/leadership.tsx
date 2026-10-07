'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';
import { ADVISORS, LEADERSHIP } from '@/lib/about-data';

// Part B1 "Leadership" (#leadership) / Part C7 — Leadership/Advisors tab
// toggle over a grid of cards (name, position, a small square button that
// opens a bio panel). The panel slides in from the right on desktop,
// full-screen on mobile; closes on Esc or on clicking outside. Members
// whose brief entry is bracketed ("[confirm]") show a visible "Pending
// confirmation" badge rather than being presented as confirmed — see
// about-data.ts for the sourcing note.
const TABS = [
  { key: 'leadership', label: 'Leadership', members: LEADERSHIP },
  { key: 'advisors', label: 'Advisors', members: ADVISORS },
] as const;

export function Leadership() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['key']>('leadership');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const members = TABS.find((tab) => tab.key === activeTab)!.members;
  const openMember = openIndex !== null ? members[openIndex] : null;

  function close() {
    setOpenIndex((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }
    function onClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        close();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [openIndex]);

  return (
    <section id="leadership" className="sx-container scroll-mt-24 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[720px]">
          <h2 className="text-[28px] font-black leading-[1.06] tracking-[-0.03em] text-sx-ink sm:text-[40px]">
            Our leadership
          </h2>
        </div>
        <div
          role="tablist"
          aria-label="Team group"
          className="inline-flex rounded-sx bg-sx-bg-light p-1"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setOpenIndex(null);
              }}
              className={`rounded-sx px-4 py-2 text-[14px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
                activeTab === tab.key
                  ? 'border border-sx-ink/10 bg-white text-sx-ink shadow-sm'
                  : 'text-sx-muted hover:text-sx-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((member, index) => (
          <div key={member.name} className="text-left">
            <div className="relative aspect-[5/6] overflow-hidden rounded-sx bg-sx-bg-light">
              {member.photo && (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top"
                />
              )}
              <button
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                type="button"
                aria-haspopup="dialog"
                aria-label={`Read ${member.name}'s biography`}
                onClick={() => setOpenIndex(index)}
                className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-sx bg-sx-ink text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            <div className="mt-3 text-[15px] font-bold text-sx-ink">{member.name}</div>
            <div className="text-[13px] text-sx-body">{member.position}</div>
            {!member.confirmed && (
              <div className="mt-1 inline-block rounded-[4px] bg-sx-bg-light px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-sx-muted">
                Pending confirmation
              </div>
            )}
          </div>
        ))}
      </div>

      {openMember && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 sm:bg-black/30">
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${openMember.name} biography`}
            className="flex h-full w-full flex-col overflow-y-auto bg-white p-6 sm:w-[420px] sm:p-8"
          >
            <button
              type="button"
              aria-label="Close biography"
              onClick={close}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-sx text-sx-ink hover:bg-sx-bg-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <div className="relative mt-4 aspect-[5/6] w-full max-w-[220px] overflow-hidden rounded-sx bg-sx-bg-light">
              {openMember.photo && (
                <Image
                  src={openMember.photo}
                  alt={openMember.name}
                  fill
                  sizes="220px"
                  className="object-cover object-top"
                />
              )}
            </div>
            <div className="mt-4 text-[20px] font-bold text-sx-ink">{openMember.name}</div>
            <div className="text-[14px] text-sx-body">{openMember.position}</div>
            {!openMember.confirmed && (
              <div className="mt-2 inline-block w-fit rounded-[4px] bg-sx-bg-light px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-sx-muted">
                Pending confirmation
              </div>
            )}
            <p className="mt-3 text-[14px] leading-[22px] text-sx-body">{openMember.background}</p>
            <div className="mt-4 space-y-3">
              {openMember.bio.map((paragraph) => (
                <p key={paragraph} className="text-[14px] leading-[22px] text-sx-body">
                  {paragraph}
                </p>
              ))}
            </div>
            {openMember.linkedin && (
              <a
                href={openMember.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="sx-link mt-4 w-fit text-[14px] font-bold text-sx-ink"
              >
                LinkedIn profile
              </a>
            )}
            {openMember.highlights && openMember.highlights.length > 0 && (
              <ul className="mt-4 space-y-3">
                {openMember.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="border-l-2 border-sx-ink/15 pl-3 text-[14px] leading-[22px] text-sx-body"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
