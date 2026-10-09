import Image from 'next/image';
import Link from 'next/link';
import {
  HERO_PROOF,
  HOME_MODELS,
  HOME_STATS,
  OFFERINGS,
  PLATFORM_PARTNERS,
  SHOW_TESTIMONIALS,
  TESTIMONIALS,
} from '@/lib/home-data';
import { HOW_WE_WORK_MENU } from '@/lib/site-data';
import { ARTICLES } from '@/lib/insights-data';
import { findImage } from '@/lib/images';
import { HeroCarousel, type HeroSlide } from '@/components/home/hero-carousel';
import { PillarsJourney } from '@/components/home/pillars-journey';
import { MiniEstimator } from '@/components/home/mini-estimator';
import { ModelsRail } from '@/components/home/models-rail';
import { Media } from '@/components/media';
import { Marquee } from '@/components/motion/marquee';
import { Reveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';

// Homepage, W9 redesign. Section order: hero, claim band, stat row, six
// pillars, embedded estimator, four models, the partner firms with their
// client logos, testimonials (placeholder, hidden for now), insights,
// closing band. What changed is the presentation: a full-viewport
// photographic hero that rotates through five slides, copy set on full-bleed
// imagery, and scroll motion driven by GSAP. Every photograph is an image
// slot (public/images, see apps/website/IMAGES.md) that shows a labelled
// placeholder until the file exists.

// The hero's five slides: the homepage headline, then the headline of each
// lifecycle stage.
const STAGE_HEADLINES: Record<string, string> = {
  Plan: 'Decide where, how and at what cost before you commit.',
  Build: 'From a registered company to a working office.',
  Run: 'Finance, HR, payroll, compliance, IT, workplace and day-to-day operations — managed under one accountable partner.',
  Grow: "Grow with us, transition to your own team, or move to a fully owned GCC when you're ready.",
};

function heroSlides(): HeroSlide[] {
  return [
    {
      id: 'hero-overview',
      label: 'Overview',
      headline: 'Your Global Capability Centre in India, operational in 30 to 90 days.',
      lead: 'One accountable partner to plan, build, run and scale your Global Capability Centre.',
      src: findImage('hero-overview'),
      alt: 'A capability centre floor in Ahmedabad',
    },
    ...HOW_WE_WORK_MENU.map((stage) => ({
      id: `hero-${stage.label.toLowerCase()}`,
      label: stage.label,
      headline: STAGE_HEADLINES[stage.label],
      link: { href: stage.url, text: `${stage.label}: ${stage.summary}` },
      src: findImage(`hero-${stage.label.toLowerCase()}`),
      alt: `${stage.label} stage of a capability centre`,
    })),
  ];
}

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides()} proof={HERO_PROOF} />
      <ClaimBand />
      <StatRow />
      <Offerings />
      <Estimator />
      <Models />
      <Specialists />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <Insights />
      <ClosingBand />
    </>
  );
}

function Arrow() {
  return (
    <span className="sx-btn-arrow" aria-hidden="true">
      &rarr;
    </span>
  );
}

/** The line arrow that trails a text link. */
function Go({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`sx-go ${className}`} />;
}

/** Two-line display headings. */
function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line}>
          {i > 0 && ' '}
          <span className="block">{line}</span>
        </span>
      ))}
    </>
  );
}

function ClaimBand() {
  return (
    <section className="bg-sx-ground pt-5 md:pt-0">
      <div
        data-expand=""
        className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-sx-ink-deep text-sx-white md:min-h-[92vh]"
      >
        <Media
          id="claim-01"
          alt="A fitted-out capability centre floor filling with people"
          width={2400}
          height={1350}
          parallax
          kind="showreel"
          labelPosition="top"
          className="!absolute inset-0 -z-10"
        />
        <div aria-hidden="true" className="sx-scrim -z-10" />
        <div className="sx-container pb-14 pt-32 md:pb-24">
          <p
            data-scrub-text=""
            className="max-w-[18ch] text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1] tracking-[-0.01em]"
          >
            Over 2,500 centres already run from India. Yours can be live in 90 days.
          </p>
          <p className="mt-7 max-w-xl text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.55] text-white/85">
            Entity, office, hiring, tax and technology delivered in parallel by one team, not a
            dozen vendors.
          </p>
        </div>
      </div>
    </section>
  );
}

const STAT_BARS = ['bg-sx-ink', 'bg-sx-blue', 'bg-sx-yellow', 'bg-sx-ink-20'];

function StatRow() {
  return (
    <section className="border-b border-sx-border">
      <Reveal
        stagger
        className="sx-container grid divide-y divide-sx-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
      >
        {HOME_STATS.map((stat, i) => (
          <div key={stat.label} className="py-12 md:py-16 lg:px-8 lg:first:pl-0 lg:last:pr-0">
            <span
              aria-hidden="true"
              className={`mb-7 block h-1.5 w-12 ${STAT_BARS[i % STAT_BARS.length]}`}
            />
            <span className="block text-[56px] font-bold leading-none tracking-[-0.01em] text-sx-ink md:text-[72px]">
              <CountUp value={stat.figure} className="sx-figure" />
            </span>
            <p className="mt-4 max-w-[22ch] text-[16px] font-bold leading-snug text-sx-ink-70">
              {stat.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Offerings() {
  const images = Object.fromEntries(OFFERINGS.map((o) => [o.id, findImage(`pillar-${o.id}`)]));
  return (
    <section className="sx-section">
      <div className="sx-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="sx-h2 text-sx-ink lg:col-span-7">
            Every function a centre needs, delivered by one team.
          </h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="sx-lead">
              Six pillars that take a centre from business case to a self-running unit. Pick one, or
              hand us the whole thing.
            </p>
            <Link href="/how-we-work/plan" className="sx-btn sx-btn-primary mt-7">
              Explore what we offer
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="mt-16 md:mt-20">
          <PillarsJourney images={images} />
        </div>
      </div>
    </section>
  );
}

function Estimator() {
  return (
    <section id="calculator" className="sx-section scroll-mt-20 bg-sx-bg-light">
      <div className="sx-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="sx-h2 text-sx-ink lg:col-span-7">
            <Lines lines={['What would your centre', 'cost in India?']} />
          </h2>
          <p className="sx-lead lg:col-span-4 lg:col-start-9">
            Move the sliders. The estimate uses ScaleAX benchmarks for fully loaded cost per person,
            workspace and management fees.
          </p>
        </div>
        <div className="mt-14 md:mt-16">
          <MiniEstimator />
        </div>
      </div>
    </section>
  );
}

function Models() {
  const images = Object.fromEntries(HOME_MODELS.map((m) => [m.id, findImage(`model-${m.id}`)]));
  return (
    <ModelsRail models={HOME_MODELS} images={images}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="sx-h2 text-sx-ink lg:col-span-6">
          <Lines lines={['Four ways to', 'work with us.']} />
        </h2>
        <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="sx-lead max-w-md">
            From a hands-on assisted build to a fully run centre you take over later. Each model can
            move to the next as you grow.
          </p>
          <Link href="/models" className="sx-btn sx-btn-ghost shrink-0">
            Compare the models
            <Arrow />
          </Link>
        </div>
      </div>
    </ModelsRail>
  );
}

function Specialists() {
  return (
    <section className="sx-section bg-sx-bg-light">
      <div className="sx-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="sx-h2 text-sx-ink lg:col-span-7">
            <Lines lines={['Three specialists.', 'One integrated platform.']} />
          </h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="sx-lead">
              ScaleAX is a joint venture between Awfficacy Global, DevX and Dev IT, with the Savvy
              Group as construction partner.
            </p>
            <Link href="/about" className="sx-btn sx-btn-ghost mt-7">
              Who we are
              <Arrow />
            </Link>
          </div>
        </div>

        <Reveal stagger className="mt-14 border-t border-sx-ink md:mt-20">
          {PLATFORM_PARTNERS.map((partner) => (
            <article
              key={partner.name}
              className="group grid grid-cols-1 gap-x-10 gap-y-7 border-b border-sx-border py-10 lg:grid-cols-12 lg:items-center lg:py-12"
            >
              <div className="lg:col-span-3">
                {/* The logo carries the name; the heading stays for assistive tech. */}
                <h3 className="sr-only">{partner.name}</h3>
                <div className="flex h-40 items-center justify-center rounded-sx border border-sx-border bg-sx-white px-8 transition-[translate,box-shadow] duration-500 ease-sx-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_40px_-28px_rgb(18_18_20/0.35)] md:h-44">
                  <Image
                    src={partner.logo}
                    alt=""
                    width={400}
                    height={160}
                    className="w-auto max-w-full object-contain"
                    style={{ height: partner.logoHeight * 1.9 }}
                  />
                </div>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[18px] leading-relaxed text-sx-body">{partner.description}</p>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex w-fit items-center gap-3 text-[16px] font-bold text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sx-ink"
                >
                  <span>Visit {partner.name}</span>
                  <Go className="sx-go-out" />
                </a>
              </div>
              <dl className="grid grid-cols-3 gap-5 lg:col-span-5">
                {partner.stats.map((stat) => (
                  <div key={stat.label} className="border-l border-sx-border pl-4">
                    <dt className="text-[24px] font-bold leading-none tracking-[-0.01em] text-sx-ink sm:text-[32px] md:text-[40px] lg:text-[24px] xl:text-[32px]">
                      <CountUp value={stat.figure} className="sx-figure" />
                    </dt>
                    <dd className="mt-2 text-[14px] font-bold leading-snug text-sx-muted">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
              {partner.clients.length > 0 && (
                <div className="min-w-0 lg:col-span-12">
                  <Marquee
                    label={`Enterprises served by ${partner.name}`}
                    durationSeconds={Math.max(28, partner.clients.length * 4)}
                    items={partner.clients.map((client) => ({
                      key: client.name,
                      node: (
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={200}
                          height={200}
                          className="h-14 w-auto shrink-0 object-contain"
                        />
                      ),
                    }))}
                  />
                </div>
              )}
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    // PLACEHOLDER SECTION. Quotes and roles are sample copy and the names are
    // "Client name" placeholders. Replace with real, cleared client
    // testimonials before launch (see home-data.ts,
    // TESTIMONIALS_ARE_PLACEHOLDERS).
    <section className="sx-section" data-placeholder="testimonials">
      <div className="sx-container">
        <h2 className="sx-h2 max-w-3xl text-sx-ink">
          <Lines lines={['What clients say once', 'the centre is running.']} />
        </h2>
        <div className="mt-14 grid gap-x-14 gap-y-12 md:mt-20 lg:grid-cols-12">
          <figure className="sx-note self-start p-8 md:p-12 lg:col-span-7 lg:p-14">
            <blockquote className="sx-note-hand text-[clamp(1.875rem,3.2vw,2.75rem)] leading-[1.14]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-9 border-t border-[#2a1e12]/25 pt-5">
              <span className="block text-[18px] font-bold">{lead.name}</span>
              <span className="block text-[16px] opacity-75">{lead.role}</span>
            </figcaption>
          </figure>
          <div className="grid gap-10 lg:col-span-4 lg:col-start-9 lg:pt-6">
            {rest.map((t, i) => (
              <figure
                key={t.role}
                className="sx-note sx-note-light p-7 md:p-8"
                style={{ ['--sx-note-tilt' as string]: i % 2 ? '-0.9deg' : '1.3deg' }}
              >
                <blockquote className="sx-note-hand text-[24px] leading-[1.18] md:text-[32px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[#2a1e12]/25 pt-4">
                  <span className="block text-[16px] font-bold">{t.name}</span>
                  <span className="block text-[14px] opacity-75">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-10 text-[14px] text-sx-muted">
          Sample quotes shown for layout. Named client testimonials will replace them once cleared.
        </p>
      </div>
    </section>
  );
}

function Insights() {
  // One feature plus three teasers; the rest live on /insights.
  const [first, ...others] = ARTICLES.slice(0, 4);
  return (
    <section className="sx-section border-t border-sx-border">
      <div className="sx-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="sx-h2 text-sx-ink">
            <Lines lines={['Thinking on talent,', 'workspace and scale.']} />
          </h2>
          <Link href="/insights" className="sx-btn sx-btn-ghost shrink-0">
            All insights
            <Arrow />
          </Link>
        </div>
        <div className="mt-14 grid gap-x-14 gap-y-12 md:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <InsightCard article={first} large />
          </div>
          <div className="border-t border-sx-ink lg:col-span-5">
            {others.map((article) => (
              <div key={article.slug} className="border-b border-sx-border py-7">
                <InsightCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightCard({
  article,
  large = false,
}: {
  article: (typeof ARTICLES)[number];
  large?: boolean;
}) {
  const cover = (
    <Media
      id={`insight-${article.slug}`}
      fallback={['insight-default']}
      alt=""
      width={1600}
      height={1000}
      tone="light"
      kind="insight"
      sizes={large ? '(min-width: 1024px) 56vw, 100vw' : '(min-width: 640px) 220px, 100vw'}
      className="aspect-[16/10] w-full rounded-sx [&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-sx-out group-hover:[&_img]:scale-[1.05]"
    />
  );

  if (large) {
    return (
      <Link href={`/insights/${article.slug}`} className="group block">
        <div data-zoom="" className="overflow-hidden rounded-sx">
          {cover}
        </div>
        <p className="mt-7 text-[14px] font-bold text-sx-accent-ink">
          {article.topic}, {article.readTime}
        </p>
        <h3 className="mt-3 text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-[1.08] tracking-[-0.01em] text-sx-ink">
          {article.title}
        </h3>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-sx-body">
          {article.intro}
        </p>
        <span className="mt-7 inline-flex w-fit items-center gap-3 font-bold text-sx-ink">
          Read insight
          <Go />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col gap-5 sm:flex-row sm:items-start"
    >
      <div className="w-full shrink-0 sm:w-[34%]">{cover}</div>
      <div>
        <p className="text-[14px] font-bold text-sx-accent-ink">
          {article.topic}, {article.readTime}
        </p>
        <h3 className="mt-2 text-[18px] font-bold leading-snug tracking-[-0.01em] text-sx-ink">
          {article.title}
        </h3>
        <span className="mt-4 inline-flex w-fit items-center gap-3 text-[16px] font-bold text-sx-ink">
          Read insight
          <Go className="sx-go-sm" />
        </span>
      </div>
    </Link>
  );
}

function ClosingBand() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-sx-ink-deep text-sx-white">
      <Media
        id="cta-01"
        alt="An Indian business district at dusk"
        width={2400}
        height={1350}
        parallax
        kind="cta"
        labelPosition="top"
        className="!absolute inset-0 -z-10"
      />
      <div aria-hidden="true" className="sx-scrim-soft -z-10" />
      <div className="sx-container pb-16 pt-40 md:pb-24">
        <div className="max-w-4xl">
          <h2
            data-scrub-text=""
            className="text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.01em] text-sx-white"
          >
            Tell us what you want to run from India.
          </h2>
          <p className="mt-7 max-w-xl text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.55] text-white/85">
            Tell us the functions you want in India and your timeline. You get a location shortlist,
            a cost model and a plan within two weeks.
          </p>
          <Link href="/contact" className="sx-btn sx-btn-light mt-10">
            Plan your centre
            <Go />
          </Link>
        </div>
      </div>
    </section>
  );
}
