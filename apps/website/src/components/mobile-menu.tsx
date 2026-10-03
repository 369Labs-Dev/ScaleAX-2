'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import {
  HOW_WE_WORK_MENU,
  SOLUTIONS_MENU,
  ENGAGEMENT_MODELS_MENU,
  INSIGHTS_MENU,
  type MenuLink,
} from '@/lib/site-data';

interface AccordionGroup {
  id: string;
  label: string;
  links: MenuLink[];
}

const GROUPS: AccordionGroup[] = [
  { id: 'how-we-work', label: 'How we work', links: HOW_WE_WORK_MENU },
  { id: 'solutions', label: 'Solutions', links: SOLUTIONS_MENU },
  { id: 'engagement', label: 'Engagement models', links: ENGAGEMENT_MODELS_MENU },
  { id: 'insights', label: 'Insights', links: INSIGHTS_MENU },
];

// Part 0.2 "Mobile", restyled for W8 per the reference: a full-screen sheet
// with large ink rows ("Who we are", the What-we-offer groups as accordions,
// GCC Calculator, Careers) and the pill "Plan your centre" CTA fixed at the
// bottom.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const openButton = openButtonRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      openButton?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink lg:hidden"
      >
        <span aria-hidden="true" className="block h-[2px] w-6 rounded-full bg-sx-ink" />
        <span aria-hidden="true" className="block h-[2px] w-6 rounded-full bg-sx-ink" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="sx-drop fixed inset-0 z-50 flex flex-col bg-sx-ground lg:hidden"
        >
          <div className="sx-container flex h-[76px] shrink-0 items-center justify-between">
            <Link
              href="/"
              className="text-[22px] font-black tracking-[-0.04em] text-sx-ink"
              onClick={close}
            >
              ScaleAX
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center rounded-full text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
            >
              <X className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>

          <nav className="sx-container flex-1 overflow-y-auto pb-6 pt-2" aria-label="Mobile">
            <BigLink href="/about" onClick={close}>
              Who we are
            </BigLink>
            {GROUPS.map((group) => {
              const isExpanded = expanded === group.id;
              return (
                <div key={group.id} className="border-b border-sx-border">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-group-${group.id}`}
                    onClick={() => setExpanded(isExpanded ? null : group.id)}
                    className="flex w-full items-center justify-between py-5 text-left text-[22px] font-black tracking-[-0.02em] text-sx-ink"
                  >
                    {group.label}
                    <ChevronDown
                      className={`h-5 w-5 transition-[rotate] duration-300 ease-sx-out ${isExpanded ? 'rotate-180' : ''}`}
                      strokeWidth={1.75}
                    />
                  </button>
                  {isExpanded && (
                    <ul id={`mobile-group-${group.id}`} className="sx-drop space-y-1 pb-4">
                      {group.links.map((link) => (
                        <li key={link.url}>
                          <Link
                            href={link.url}
                            onClick={close}
                            className="block rounded-[12px] p-2 hover:bg-sx-bg-light"
                          >
                            <div className="text-[15px] font-bold text-sx-ink">{link.label}</div>
                            <div className="text-[13px] text-sx-muted">{link.summary}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <BigLink href="/gift-city" onClick={close}>
              GIFT City
            </BigLink>
            <BigLink href="/calculator" onClick={close}>
              GCC Calculator
            </BigLink>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-5 text-[15px] font-bold text-sx-ink-70">
              <Link href="/location" onClick={close} className="hover:text-sx-ink">
                Location Finder
              </Link>
              <Link href="/gift-city" onClick={close} className="hover:text-sx-ink">
                GIFT City
              </Link>
            </div>
          </nav>

          <div className="sx-container shrink-0 border-t border-sx-border py-4">
            <Link href="/contact" onClick={close} className="sx-btn sx-btn-primary w-full">
              Plan your centre
              <span className="sx-btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function BigLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block border-b border-sx-border py-5 text-[22px] font-black tracking-[-0.02em] text-sx-ink"
    >
      {children}
    </Link>
  );
}
