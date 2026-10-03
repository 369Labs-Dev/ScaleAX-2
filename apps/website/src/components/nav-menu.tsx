'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// A keyboard- and pointer-accessible dropdown/mega-menu trigger, shared by
// the desktop "How we work", "Solutions", "Engagement models" and
// "Insights" menus (Part 0.2, Part C6). Opens on hover or click, closes on
// Escape (returning focus to the trigger), outside click, or blur past the
// panel. Arrow keys move focus between the panel's links (roving focus).
export function NavMenu({
  label,
  panelClassName,
  children,
}: {
  label: string;
  panelClassName?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  function close(focusTrigger = false) {
    cancelClose();
    setOpen(false);
    if (focusTrigger) buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    function onDocClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  function focusableLinks() {
    return Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? []);
  }

  function onButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusableLinks()[0]?.focus());
    } else if (event.key === 'Escape' && open) {
      close(true);
    }
  }

  function onPanelKeyDown(event: React.KeyboardEvent) {
    const links = focusableLinks();
    const current = links.indexOf(document.activeElement as HTMLElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      links[(current + 1) % links.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      links[(current - 1 + links.length) % links.length]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      links[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      links[links.length - 1]?.focus();
    } else if (event.key === 'Tab') {
      // Tabbing out of the panel closes it naturally; nothing to intercept.
      close();
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={id}
        onClick={() => {
          // Hover already opens the panel for pointer users, so a click
          // (which fires after the hover-enter) should not immediately
          // toggle it shut again — it only needs to guarantee it's open,
          // e.g. for touch devices that don't fire hover at all.
          cancelClose();
          setOpen(true);
        }}
        onKeyDown={onButtonKeyDown}
        className={`flex items-center gap-1 rounded py-2 transition-colors duration-200 hover:text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
          open ? 'text-sx-ink' : ''
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-[rotate] duration-300 ease-sx-out ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </button>
      {open && (
        <div
          id={id}
          ref={panelRef}
          role="menu"
          aria-label={label}
          onKeyDown={onPanelKeyDown}
          className={`sx-pop ${
            panelClassName ??
            "absolute left-1/2 top-full z-50 mt-2 w-[300px] -translate-x-1/2 rounded-[16px] border border-sx-border bg-white p-3 shadow-sx-lift before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
