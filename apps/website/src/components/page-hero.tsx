import Link from 'next/link';
import { Breadcrumb, type Crumb } from './breadcrumb';
import { Media } from './media';
import { slugify } from '@/lib/images';
import { LIFECYCLE_STAGES, type CardId } from '@/lib/site-data';

export interface HeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'ghost';
}

// Inner-page hero. W9: a full-bleed photograph with the copy set on top, the
// same language as the homepage hero. The image slot is named after the page
// (last breadcrumb label, e.g. page-plan.jpg) and falls back to
// page-default.jpg, so one photograph can cover every page until each has
// its own. Optional CTA row (`actions`), Plan/Build/Run/Grow indicator
// (`stage`) and anchor quick-jumps (`chips`).
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
  const slug = slugify(breadcrumb[breadcrumb.length - 1]?.label ?? 'default');
  return (
    <section
      data-hero="dark"
      className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-sx-ink-deep text-sx-white"
    >
      <Media
        id={`page-${slug}`}
        fallback={['page-default']}
        alt=""
        width={2400}
        height={1350}
        priority
        parallax
        kind="page-hero"
        labelPosition="top"
        className="!absolute inset-0 -z-10"
      />
      <div aria-hidden="true" className="sx-scrim -z-10" />

      <div className="sx-container pb-12 pt-[calc(var(--sx-header-h)+4rem)] md:pb-16">
        <div className="sx-enter">
          <Breadcrumb items={breadcrumb} tone="light" />
        </div>
        <div
          className="sx-enter sx-eyebrow mt-8 !text-white/80"
          style={{ ['--sx-d' as string]: 1 }}
        >
          {eyebrow}
        </div>
        <h1
          className="sx-enter mt-5 max-w-[19ch] text-[clamp(2.5rem,5.6vw,5.2rem)] font-black leading-[0.98] tracking-[-0.022em] text-sx-white"
          style={{ ['--sx-d' as string]: 2 }}
        >
          {title}
        </h1>
        <p
          className="sx-enter mt-7 max-w-[58ch] text-[clamp(1.05rem,1.3vw,1.22rem)] leading-[1.55] text-white/85"
          style={{ ['--sx-d' as string]: 3 }}
        >
          {intro}
        </p>

        {actions && actions.length > 0 && (
          <div
            className="sx-enter mt-9 flex flex-wrap items-center gap-3"
            style={{ ['--sx-d' as string]: 4 }}
          >
            {actions.map((action) => (
              <a
                key={action.href + action.label}
                href={action.href}
                className={`sx-btn ${action.variant === 'ghost' ? 'sx-btn-outline-light' : 'sx-btn-light'}`}
              >
                {action.label}
                <span className="sx-btn-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        )}

        {stage && (
          <nav
            aria-label="Lifecycle stage"
            className="sx-enter mt-12 grid grid-cols-4 gap-2 md:gap-5"
            style={{ ['--sx-d' as string]: 5 }}
          >
            {LIFECYCLE_STAGES.map((s, i) => {
              const isCurrent = s.id === stage;
              return (
                <Link
                  key={s.id}
                  href={s.url}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`group border-t-2 pt-3 text-[14px] font-bold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                    isCurrent
                      ? 'border-white text-white'
                      : 'border-white/25 text-white/60 hover:border-white hover:text-white'
                  }`}
                >
                  <span className="sx-figure mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </Link>
              );
            })}
          </nav>
        )}

        {chips && chips.length > 0 && (
          <div
            className="sx-enter mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/25 pt-5"
            style={{ ['--sx-d' as string]: 5 }}
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-white/60">
              Jump to
            </span>
            {chips.map((chip) => (
              <a
                key={chip.href}
                href={chip.href}
                className="group text-[15px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="sx-link">{chip.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
