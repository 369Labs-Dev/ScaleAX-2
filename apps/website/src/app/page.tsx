import Image from 'next/image';
import Link from 'next/link';
import {
  HERO_PROOF,
  HOME_MODELS,
  HOME_STATS,
  PLATFORM_PARTNERS,
  TESTIMONIALS,
  WHY_INDIA,
} from '@/lib/home-data';
import { ARTICLES } from '@/lib/insights-data';
import { PartnerProofBand } from '@/components/home/partner-proof-band';
import { OfferingsAccordion } from '@/components/home/offerings-accordion';
import { MiniEstimator } from '@/components/home/mini-estimator';
import { ClaimBandArt, HeroArt, IndiaArt, InsightArt } from '@/components/home/placeholder-art';
import { Reveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';
import { Parallax } from '@/components/motion/parallax';

// Homepage — W8 green redesign. Section order and copy follow the approved
// reference homepage (https://site-hazel-gamma-44.vercel.app/): hero with
// proof tiles → partner strip → claim band → stat row → six pillars →
// embedded estimator → four models → why India → three specialists →
// testimonials (placeholder) → insights → closing band. Footer is global.
export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerProofBand />
      <ClaimBand />
      <StatRow />
      <Offerings />
      <Estimator />
      <Models />
      <WhyIndia />
      <Specialists />
      <Testimonials />
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

/** Two-line display headings (reference `<span class="block">` pairs). */
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

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="sx-container grid items-center gap-10 py-12 md:grid-cols-12 md:py-16 lg:min-h-[min(calc(100dvh-76px),860px)] lg:py-0">
        <div className="relative z-10 md:col-span-7 lg:col-span-6">
          <h1 className="sx-enter sx-h1 max-w-[15ch] text-sx-ink">
            Build your Global Capability Centre in India. Without the guesswork.
          </h1>
          <p className="sx-enter sx-lead mt-7 max-w-[46ch]" style={{ ['--sx-d' as string]: 1 }}>
            One accountable partner for strategy, workspace, talent, compliance and technology. We
            set up, run and scale centres for global companies.
          </p>
          <div className="sx-enter mt-9 flex flex-wrap gap-3" style={{ ['--sx-d' as string]: 2 }}>
            <Link href="/contact" className="sx-btn sx-btn-primary">
              Plan your centre
              <Arrow />
            </Link>
            <Link href="/calculator" className="sx-btn sx-btn-ghost">
              Estimate your cost
            </Link>
          </div>
          <dl
            className="sx-enter mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-sx-border pt-6"
            style={{ ['--sx-d' as string]: 3 }}
          >
            {HERO_PROOF.map((tile) => (
              <div key={tile.label}>
                <dt className="text-[24px] font-black tracking-[-0.03em] text-sx-ink">
                  <CountUp value={tile.figure} className="sx-figure" />
                </dt>
                <dd className="mt-1 text-[12px] font-bold text-sx-muted">{tile.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          className="sx-enter relative md:col-span-5 lg:col-span-6"
          style={{ ['--sx-d' as string]: 2 }}
        >
          <div className="ml-auto w-full max-w-[520px] lg:max-w-[560px]">
            <HeroArt />
          </div>
        </div>
      </div>
    </section>
  );
}

function ClaimBand() {
  return (
    <section className="relative isolate mx-5 mt-10 flex min-h-[420px] items-end overflow-hidden rounded-[28px] bg-sx-ink text-sx-white md:mx-0 md:mt-0 md:h-[88vh] md:max-h-[860px] md:rounded-none">
      <Parallax speed={0.12} className="pointer-events-none absolute inset-0 -z-10">
        <ClaimBandArt />
      </Parallax>
      <Reveal className="sx-container pb-12 pt-24 md:pb-16">
        <p className="max-w-2xl text-[30px] font-black leading-[1.08] tracking-[-0.03em] md:text-[48px]">
          1,500 centres already run from India. Yours can be live in 90 days.
        </p>
        <p className="mt-4 max-w-xl text-[17px] text-white/75">
          Entity, office, hiring, tax and technology delivered in parallel by one team, not a dozen
          vendors.
        </p>
      </Reveal>
    </section>
  );
}

function StatRow() {
  return (
    <section className="mt-10 border-y border-sx-border md:mt-0">
      <Reveal
        stagger
        className="sx-container grid divide-y divide-sx-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
      >
        {HOME_STATS.map((stat) => (
          <div key={stat.label} className="py-10 lg:px-8 lg:first:pl-0 lg:last:pr-0">
            <span className="block text-[48px] font-black leading-none tracking-[-0.035em] text-sx-ink md:text-[60px]">
              <CountUp value={stat.figure} className="sx-figure" />
            </span>
            <p className="mt-3 text-[15px] font-bold text-sx-ink-70">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Offerings() {
  return (
    <section className="pt-24 md:pt-32">
      <div className="sx-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <h2 className="sx-h2 text-sx-ink">
              Every function a centre needs, delivered by one team.
            </h2>
            <p className="sx-lead mt-5 max-w-md">
              Six pillars that take a centre from business case to a self-running unit. Pick one, or
              hand us the whole thing.
            </p>
            <Link href="/how-we-work/plan" className="sx-btn sx-btn-primary mt-8">
              Explore what we offer
              <Arrow />
            </Link>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-8">
          <OfferingsAccordion />
        </Reveal>
      </div>
    </section>
  );
}

function Estimator() {
  return (
    <section id="calculator" className="mt-24 scroll-mt-20 bg-sx-bg-light py-24 md:mt-32 md:py-32">
      <div className="sx-container">
        <Reveal className="max-w-3xl">
          <h2 className="sx-h2 text-sx-ink">
            <Lines lines={['What would your centre', 'cost in India?']} />
          </h2>
          <p className="sx-lead mt-6">
            Move the sliders. The estimate uses ScaleAX benchmarks for fully loaded cost per person,
            workspace and management fees.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <MiniEstimator />
        </Reveal>
      </div>
    </section>
  );
}

function Models() {
  return (
    <section className="bg-sx-ink py-24 text-sx-white md:py-32">
      <div className="sx-container grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="sx-h2 text-sx-white">
            <Lines lines={['Four ways to', 'work with us.']} />
          </h2>
          <p className="mt-6 max-w-md text-[18px] leading-relaxed text-white/70">
            From a hands-on assisted build to a fully run centre you take over later. Each model can
            move to the next as you grow.
          </p>
          <Link href="/models" className="sx-btn sx-btn-light mt-8">
            Compare the models
            <Arrow />
          </Link>
        </Reveal>
        <Reveal
          as="ol"
          stagger
          className="grid gap-px overflow-hidden rounded-[20px] border border-white/15 bg-white/15 sm:grid-cols-2 lg:col-span-7"
        >
          {HOME_MODELS.map((model, i) => (
            <li key={model.id} className="bg-sx-ink">
              <Link
                href={model.url}
                className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-sx-ink-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
              >
                <span className="sx-figure text-[14px] font-bold text-white/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[24px] font-black tracking-[-0.025em] text-sx-white">
                  {model.name}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{model.tagline}</p>
                <span className="mt-6 text-white/60 group-hover:text-sx-white">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function WhyIndia() {
  return (
    <section className="py-24 md:py-32">
      <div className="sx-container">
        <Reveal as="h2" className="sx-h2 max-w-3xl text-sx-ink">
          Why India is the default answer.
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal variant="zoom" className="lg:col-span-5">
            <IndiaArt />
          </Reveal>
          <Reveal
            stagger
            className="grid gap-px overflow-hidden rounded-[20px] border border-sx-border bg-sx-ink-12 sm:grid-cols-2 lg:col-span-7"
          >
            {WHY_INDIA.map((stat) => (
              <div key={stat.title} className="bg-white p-8">
                <p className="text-[48px] font-black leading-none tracking-[-0.035em] text-sx-ink">
                  <CountUp value={stat.figure} className="sx-figure" />
                </p>
                <p className="mt-4 font-bold text-sx-ink">{stat.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-sx-body">{stat.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section className="bg-sx-bg-light py-24 md:py-32">
      <div className="sx-container">
        <Reveal>
          <h2 className="sx-h2 max-w-3xl text-sx-ink">
            <Lines lines={['Three specialists.', 'One integrated platform.']} />
          </h2>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="sx-lead max-w-2xl">
              ScaleAX is a joint venture between Awfficacy Global and DevX, with the Savvy Group as
              construction partner.
            </p>
            <Link href="/about" className="sx-btn sx-btn-ghost shrink-0">
              Who we are
              <Arrow />
            </Link>
          </div>
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {PLATFORM_PARTNERS.map((partner) => (
            <article key={partner.name} className="sx-card sx-card-hover flex flex-col p-8">
              <div className="flex h-14 items-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={200}
                  height={60}
                  className="w-auto object-contain object-left"
                  style={{ height: partner.logoHeight }}
                />
              </div>
              <h3 className="mt-4 text-[26px] font-black tracking-[-0.035em] text-sx-ink">
                {partner.name}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-sx-body">{partner.description}</p>
              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-sx-border pt-6">
                {partner.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[20px] font-black tracking-[-0.03em] text-sx-ink">
                      <CountUp value={stat.figure} className="sx-figure" />
                    </dt>
                    <dd className="mt-1 text-[11px] font-bold uppercase leading-snug tracking-[0.08em] text-sx-muted">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex w-fit items-center gap-2 text-[14px] font-bold text-sx-ink"
              >
                <span className="sx-link">Visit {partner.name}</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
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
    // PLACEHOLDER SECTION — quotes/roles are the reference design's sample
    // copy and the names are its "Client name" placeholders. Replace with
    // real, cleared client testimonials before launch (see home-data.ts,
    // TESTIMONIALS_ARE_PLACEHOLDERS).
    <section className="py-24 md:py-32" data-placeholder="testimonials">
      <div className="sx-container">
        <Reveal as="h2" className="sx-h2 max-w-3xl text-sx-ink">
          <Lines lines={['What clients say once', 'the centre is running.']} />
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-5 lg:grid-cols-12">
          <figure className="flex flex-col justify-between rounded-[20px] bg-sx-ink p-8 text-sx-white lg:col-span-7 lg:p-12">
            <blockquote className="text-[24px] font-bold leading-snug tracking-[-0.02em] md:text-[32px]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-[14px] font-black"
              >
                C
              </span>
              <span>
                <span className="block font-bold">{lead.name}</span>
                <span className="block text-[14px] text-white/60">{lead.role}</span>
              </span>
            </figcaption>
          </figure>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((t) => (
              <figure key={t.role} className="sx-card flex flex-col justify-between p-8">
                <blockquote className="text-[18px] font-bold leading-snug text-sx-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-sx-border pt-5">
                  <span className="block font-bold text-sx-ink">{t.name}</span>
                  <span className="block text-[14px] text-sx-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
        <p className="mt-6 text-[13px] text-sx-muted">
          Sample quotes shown for layout. Named client testimonials will replace them once cleared.
        </p>
      </div>
    </section>
  );
}

function Insights() {
  // The library has grown past three articles; the homepage shows one
  // feature plus three teasers — the rest live on /insights.
  const [first, ...others] = ARTICLES.slice(0, 4);
  return (
    <section className="pb-24 md:pb-32">
      <div className="sx-container">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="sx-h2 text-sx-ink">
            <Lines lines={['Thinking on talent,', 'workspace and scale.']} />
          </h2>
          <Link href="/insights" className="sx-btn sx-btn-ghost shrink-0">
            All insights
            <Arrow />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <InsightCard article={first} index={0} large />
          </Reveal>
          <Reveal
            stagger
            className="flex flex-col justify-between divide-y divide-sx-border md:col-span-5"
          >
            {others.map((article, i) => (
              <div key={article.slug} className="py-7 first:pt-0 last:pb-0">
                <InsightCard article={article} index={i + 1} />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InsightCard({
  article,
  index,
  large = false,
}: {
  article: (typeof ARTICLES)[number];
  index: number;
  large?: boolean;
}) {
  if (large) {
    return (
      <Link href={`/insights/${article.slug}`} className="group block">
        <InsightArt variant={index} />
        <div className="mt-5">
          <p className="text-[12px] font-bold text-sx-muted">
            {article.topic}, {article.readTime}
          </p>
          <h3 className="mt-3 text-[26px] font-black leading-tight tracking-[-0.025em] text-sx-ink">
            {article.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-sx-body">{article.intro}</p>
          <span className="mt-5 inline-flex w-fit items-center gap-2 font-bold text-sx-ink">
            <span className="sx-link">Read insight</span>
            <Arrow />
          </span>
        </div>
      </Link>
    );
  }

  // Secondary teasers: horizontal rows so the pair distributes evenly
  // against the feature card and the column's top/bottom edges align.
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col gap-5 sm:flex-row sm:items-start"
    >
      <div className="w-full shrink-0 sm:w-[38%]">
        <InsightArt variant={index} />
      </div>
      <div>
        <p className="text-[12px] font-bold text-sx-muted">
          {article.topic}, {article.readTime}
        </p>
        <h3 className="mt-2 text-[19px] font-black leading-snug tracking-[-0.025em] text-sx-ink">
          {article.title}
        </h3>
        <span className="mt-4 inline-flex w-fit items-center gap-2 text-[15px] font-bold text-sx-ink">
          <span className="sx-link">Read insight</span>
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

function ClosingBand() {
  return (
    <section className="sx-container pb-24 md:pb-32">
      <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-sx-ink px-8 py-20 text-sx-white md:px-16 md:py-28">
        <ClaimBandArt />
        <div className="relative max-w-3xl">
          <h2 className="sx-h2 text-sx-white">
            <Lines lines={["Don't just compete.", 'Excel globally.']} />
          </h2>
          <p className="mt-6 max-w-xl text-[18px] text-white/75">
            Tell us the functions you want in India and your timeline. You get a location shortlist,
            a cost model and a plan within two weeks.
          </p>
          <Link href="/contact" className="sx-btn sx-btn-light mt-10">
            Plan your centre
            <Arrow />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
