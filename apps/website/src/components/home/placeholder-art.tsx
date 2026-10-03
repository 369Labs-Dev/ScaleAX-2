// W8 — branded placeholder graphics for the media slots the reference fills
// with photography/video (hero image, showreel band, India map, insight
// covers). ScaleAX has no cleared photography yet, so these are drawn from
// the token palette only — ink, white and ink tints — as CSS/SVG. They are
// decorative (aria-hidden) unless they carry information, and each has a
// fixed aspect ratio so swapping in real images later causes no layout
// shift. Replace with real photography when it exists.

const WORKSTREAMS = [
  { label: 'Entity and registrations', pct: 92 },
  { label: 'Office and fit-out', pct: 74 },
  { label: 'Hiring', pct: 61 },
  { label: 'Tax and compliance', pct: 83 },
  { label: 'Technology', pct: 68 },
];

/** Hero media: a centre's workstreams running in parallel, on an ink panel. */
export function HeroArt() {
  return (
    <div
      aria-hidden="true"
      data-placeholder-art="hero"
      className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-sx-ink"
    >
      <div className="sx-grid-lines-light absolute inset-0 -z-10" />
      <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-white/10" />
      <div className="absolute -right-10 -top-10 -z-10 h-52 w-52 rounded-full border border-white/10" />

      <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.14em] text-white/55 sm:inset-x-8 sm:top-8">
        <span>Your centre</span>
        <span>Ahmedabad &middot; GIFT City</span>
      </div>

      <div className="absolute inset-x-6 bottom-6 rounded-[16px] bg-sx-white p-5 text-sx-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:inset-x-8 sm:bottom-8 sm:p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-[15px] font-black tracking-[-0.02em]">Delivered in parallel</span>
          <span className="text-[12px] font-bold text-sx-muted">One team</span>
        </div>
        <ul className="mt-4 space-y-3">
          {WORKSTREAMS.map((w) => (
            <li key={w.label}>
              <div className="flex justify-between text-[12px] font-bold">
                <span>{w.label}</span>
              </div>
              <div className="mt-1.5 h-[3px] rounded-full bg-sx-ink-12">
                <div
                  className="h-full origin-left rounded-full bg-sx-ink"
                  style={{ width: `${w.pct}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute left-6 top-1/3 rounded-full bg-sx-white/10 px-4 py-2 text-[13px] font-bold text-sx-white ring-1 ring-white/20 sm:left-8">
        Live in 30 to 90 days
      </div>
    </div>
  );
}

// Approximate relative positions inside a notional India bounding box.
const CITIES: { name: string; x: number; y: number; home?: boolean }[] = [
  { name: 'Delhi NCR', x: 40, y: 22 },
  { name: 'Ahmedabad', x: 21, y: 44, home: true },
  { name: 'GIFT City', x: 25, y: 40, home: true },
  { name: 'Mumbai', x: 22, y: 59 },
  { name: 'Pune', x: 27, y: 63 },
  { name: 'Hyderabad', x: 42, y: 64 },
  { name: 'Bengaluru', x: 38, y: 79 },
  { name: 'Chennai', x: 48, y: 78 },
  { name: 'Kolkata', x: 68, y: 45 },
];

/** "Why India" media slot: an illustrative city constellation (not a map). */
export function IndiaArt() {
  return (
    <figure
      data-placeholder-art="india"
      className="relative isolate h-full min-h-[360px] w-full overflow-hidden rounded-[20px] bg-sx-ink text-sx-white"
    >
      <div aria-hidden="true" className="sx-grid-lines-light absolute inset-0 -z-10" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Illustration of the main Indian GCC cities, with Ahmedabad and GIFT City highlighted"
      >
        {CITIES.filter((c) => !c.home).map((c) => (
          <line
            key={c.name}
            x1={23}
            y1={42}
            x2={c.x}
            y2={c.y}
            stroke="rgb(255 255 255 / 0.14)"
            strokeWidth={0.25}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {CITIES.map((c) => (
        <span
          key={c.name}
          aria-hidden="true"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          <span className="relative flex items-center gap-2">
            <span
              className={`block rounded-full ${
                c.home
                  ? 'h-3 w-3 bg-sx-white shadow-[0_0_0_6px_rgb(255_255_255/0.14),0_0_0_14px_rgb(255_255_255/0.06)]'
                  : 'h-2 w-2 bg-white/55'
              }`}
            />
            <span
              className={`whitespace-nowrap text-[11px] font-bold ${
                c.home ? 'text-sx-white' : 'text-white/55'
              }`}
            >
              {c.name}
            </span>
          </span>
        </span>
      ))}
      <figcaption className="absolute inset-x-6 bottom-6 text-[12px] font-bold uppercase tracking-[0.14em] text-white/55">
        Where we set up first: Ahmedabad and GIFT City
      </figcaption>
    </figure>
  );
}

/** Insight cover art — three token-only compositions, picked by index. */
export function InsightArt({ variant }: { variant: number }) {
  const v = variant % 3;
  return (
    <div
      aria-hidden="true"
      data-placeholder-art="insight"
      className="relative isolate aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-sx-bg-light"
    >
      <div className="sx-grid-lines absolute inset-0 -z-10" />
      <div className="absolute inset-0 transition-transform duration-700 ease-sx-out group-hover:scale-[1.04]">
        {v === 0 && (
          // Cost: descending bars.
          <div className="absolute inset-x-[14%] bottom-[18%] top-[22%] flex items-end gap-[6%]">
            {[100, 78, 58, 36, 22].map((h, i) => (
              <div
                key={h}
                className={`flex-1 rounded-t-[10px] ${i === 0 ? 'bg-sx-ink-20' : 'bg-sx-ink'}`}
                style={{ height: `${h}%`, opacity: i === 0 ? 1 : 1 - i * 0.12 }}
              />
            ))}
          </div>
        )}
        {v === 1 && (
          // Finance centre: a block of towers.
          <div className="absolute inset-x-[18%] bottom-0 top-[18%] flex items-end gap-[4%]">
            {[55, 80, 100, 70, 45].map((h, i) => (
              <div
                key={i}
                className="sx-grid-lines-light flex-1 rounded-t-[8px] bg-sx-ink"
                style={{ height: `${h}%`, opacity: 0.55 + (h / 100) * 0.45 }}
              />
            ))}
          </div>
        )}
        {v === 2 && (
          // Handover: two circles and a transfer arc.
          <svg viewBox="0 0 160 100" className="absolute inset-0 h-full w-full">
            <circle cx="48" cy="54" r="22" fill="var(--sx-ink)" />
            <circle cx="112" cy="54" r="22" fill="none" stroke="var(--sx-ink)" strokeWidth="2.5" />
            <path
              d="M58 30 Q80 8 102 30"
              fill="none"
              stroke="var(--sx-ink)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path d="M98 24 L103 31 L95 32" fill="none" stroke="var(--sx-ink)" strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );
}

/** Claim band backdrop: stands in for the reference's showreel video. */
export function ClaimBandArt() {
  return (
    <div aria-hidden="true" data-placeholder-art="showreel" className="absolute inset-0 -z-10">
      <div className="sx-grid-lines-light absolute inset-0" />
      <div className="absolute inset-y-0 right-0 w-2/3 [background:repeating-linear-gradient(90deg,transparent_0_119px,rgb(255_255_255/0.05)_119px_120px)] [mask-image:linear-gradient(90deg,transparent,#000)]" />
      <div className="absolute -right-40 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute -right-10 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-sx-ink via-sx-ink/40 to-transparent" />
    </div>
  );
}
