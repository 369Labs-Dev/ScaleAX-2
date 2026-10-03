import Link from 'next/link';
import { Breadcrumb, type Crumb } from './breadcrumb';
import { Parallax } from './motion/parallax';
import { LIFECYCLE_STAGES, type CardId } from '@/lib/site-data';

export interface HeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'ghost';
}

// Part 0.3 block 1 / Part C6 "Page hero". W8: restyled to the reference's
// light hero — off-white ground, heavy display H1, ink-70 lead, and the
// reference's 64px ink grid as a faint, slow-drifting texture (no photos
// yet; the grid stands in for the brief's placeholder line icon).
// CSS first-paint entrance (no JS wait) from W7.
// UX pass (2026-09-30): optional CTA row (`actions`), a compact
// Plan→Build→Run→Grow journey indicator (`stage`, for the How-we-work
// pages) and anchor quick-jump pills (`chips`, e.g. the four engagement
// models). All opt-in, so pages that pass nothing render exactly as before.
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  actions,
  stage,
  chips,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumb: Crumb[];
  actions?: HeroAction[];
  stage?: CardId;
  chips?: { label: string; href: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-sx-border bg-sx-ground">
      <Parallax speed={0.2} className="pointer-events-none absolute inset-0 -z-10">
        <div className="sx-grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_60%_90%_at_90%_10%,#000_10%,transparent_70%)]" />
      </Parallax>
      <div className="sx-container py-16 sm:py-24">
        <div className="sx-enter">
          <Breadcrumb items={breadcrumb} />
        </div>
        <div className="sx-enter sx-eyebrow mt-8" style={{ ['--sx-d' as string]: 1 }}>
          {eyebrow}
        </div>
        <h1
          className="sx-enter mt-4 max-w-[18ch] text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-[1.02] tracking-[-0.035em] text-sx-ink"
          style={{ ['--sx-d' as string]: 2 }}
        >
          {title}
        </h1>
        <p className="sx-enter sx-lead mt-6 max-w-[46ch]" style={{ ['--sx-d' as string]: 3 }}>
          {intro}
        </p>

        {stage && (
          <nav
            aria-label="Lifecycle stage"
            className="sx-enter mt-8 flex flex-wrap items-center gap-2"
            style={{ ['--sx-d' as string]: 4 }}
          >
            {LIFECYCLE_STAGES.map((s, i) => {
              const isCurrent = s.id === stage;
              return (
                <span key={s.id} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="h-px w-4 bg-sx-ink-20 sm:w-6" />}
                  <Link
                    href={s.url}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-colors duration-300 ease-sx-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
                      isCurrent
                        ? 'bg-sx-ink text-white'
                        : 'border border-sx-ink-20 bg-white text-sx-body hover:border-sx-ink hover:text-sx-ink'
                    }`}
                  >
                    {s.label}
                  </Link>
                </span>
              );
            })}
          </nav>
        )}

        {actions && actions.length > 0 && (
          <div
            className="sx-enter mt-9 flex flex-wrap items-center gap-3"
            style={{ ['--sx-d' as string]: stage ? 5 : 4 }}
          >
            {actions.map((action) => (
              <a
                key={action.href + action.label}
                href={action.href}
                className={`sx-btn ${action.variant === 'ghost' ? 'sx-btn-ghost' : 'sx-btn-primary'}`}
              >
                {action.label}
                <span className="sx-btn-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        )}

        {chips && chips.length > 0 && (
          <div
            className="sx-enter mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-sx-border pt-6"
            style={{ ['--sx-d' as string]: 5 }}
          >
            <span className="mr-1 text-[13px] font-bold uppercase tracking-[0.06em] text-sx-muted">
              Jump to
            </span>
            {chips.map((chip) => (
              <a
                key={chip.href}
                href={chip.href}
                className="rounded-full border border-sx-ink-20 bg-white px-3.5 py-1.5 text-[13px] font-bold text-sx-body transition-colors duration-300 ease-sx-out hover:border-sx-ink hover:text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
              >
                {chip.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
