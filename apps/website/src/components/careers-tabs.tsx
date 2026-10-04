'use client';

import { useState } from 'react';

// Part B, PAGE B17 — Careers: two tabs (Jobs at ScaleAX; Jobs at client
// centres). No real job data exists yet, so both tabs show an honest empty
// state rather than invented listings.
export function CareersTabs() {
  const [tab, setTab] = useState<'scaleax' | 'clients'>('scaleax');

  return (
    <div>
      <div
        role="tablist"
        aria-label="Job listings"
        className="flex gap-2 border-b border-sx-border"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'scaleax'}
          onClick={() => setTab('scaleax')}
          className={`px-4 py-3 text-[15px] font-bold ${
            tab === 'scaleax'
              ? 'border-b-2 border-sx-ink text-sx-ink'
              : 'text-sx-muted hover:text-sx-ink'
          }`}
        >
          Jobs at ScaleAX
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'clients'}
          onClick={() => setTab('clients')}
          className={`px-4 py-3 text-[15px] font-bold ${
            tab === 'clients'
              ? 'border-b-2 border-sx-ink text-sx-ink'
              : 'text-sx-muted hover:text-sx-ink'
          }`}
        >
          Jobs at client centres
        </button>
      </div>

      <div
        role="tabpanel"
        className="rounded-sx border border-sx-border bg-sx-bg-light p-8 text-center text-sx-muted"
      >
        {tab === 'scaleax'
          ? 'No open roles at ScaleAX right now. Send us a note and we’ll keep you in mind.'
          : 'No client roles are open for external applicants right now.'}
      </div>
    </div>
  );
}
