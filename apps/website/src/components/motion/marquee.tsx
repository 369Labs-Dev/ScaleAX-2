'use client';

import { useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

// W7 — auto-scrolling band (reference: the client-logo carousel). Pure CSS
// transform loop over two copies of the items; the second copy is
// aria-hidden and inert. Pauses on hover/focus and via an explicit toggle
// (WCAG 2.2.2). Under reduced motion it becomes a static, swipeable row
// and the duplicate copy + toggle are hidden (globals.css).
export function Marquee({
  label,
  items,
  durationSeconds = 48,
}: {
  label: string;
  items: { key: string; node: ReactNode }[];
  durationSeconds?: number;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <div
        className="sx-marquee min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
        data-paused={paused ? '' : undefined}
        role="region"
        aria-label={label}
      >
        <div
          className="sx-marquee-track"
          style={{ ['--sx-marquee-duration' as string]: `${durationSeconds}s` }}
        >
          <ul className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item.key} className="shrink-0 px-6 sm:px-10">
                {item.node}
              </li>
            ))}
          </ul>
          <ul className="flex shrink-0 items-center" aria-hidden="true" data-marquee-copy="">
            {items.map((item) => (
              <li key={item.key} className="shrink-0 px-6 sm:px-10">
                {item.node}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        data-marquee-toggle=""
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? 'Resume scrolling' : 'Pause scrolling'}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sx-muted transition-colors duration-200 hover:bg-sx-bg-light hover:text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-sx-ink"
      >
        {paused ? (
          <Play className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
