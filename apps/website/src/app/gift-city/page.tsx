import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { GIFT_CITY } from '@/lib/gift-city-data';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { AccordionSection } from '@/components/accordion-section';
import { InNumbers } from '@/components/in-numbers';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';
import { Reveal } from '@/components/motion/reveal';
import { RouteSelector } from '@/components/gift-city/route-selector';
import { JobsBoard } from '@/components/gift-city/jobs-board';

const { meta, banner, why, ifsc, facilities, jobs, faq, numbers, closing } = GIFT_CITY;

// GIFT City hub (brief of 6 October 2026): IFSC set-up with a licence route
// selector, facilities and services, a jobs board, and the FAQ.
export const metadata: Metadata = pageMetadata({
  title: { absolute: meta.tabTitle },
  description: meta.searchDesc,
  path: '/gift-city',
});

const JUMP_TARGETS = ['#ifsc', '#facilities', '#jobs', '#faq'];

function SectionIntro({ label, heading, text }: { label: string; heading: string; text?: string }) {
  return (
    <Reveal className="max-w-4xl">
      <div className="sx-eyebrow">{label}</div>
      <h2 className="sx-h2 mt-5 text-sx-ink">{heading}</h2>
      {text && <p className="sx-lead mt-5 max-w-[760px]">{text}</p>}
    </Reveal>
  );
}

export default function GiftCityPage() {
  return (
    <>
      <PageHero
        eyebrow={banner.label}
        title={banner.heading}
        intro={banner.text}
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'GIFT City' }]}
        actions={[
          { label: banner.buttons[0], href: '#ifsc' },
          { label: banner.buttons[1], href: '#jobs', variant: 'ghost' },
        ]}
        chips={banner.jump.map((label, i) => ({ label, href: JUMP_TARGETS[i] }))}
      />

      <TileSection
        id="why"
        eyebrow={why.label}
        headline={why.heading}
        items={why.items.map(([title, description]) => ({ title, description }))}
      />

      {/* IFSC set-up: route selector, then what ScaleAX does. */}
      <section id="ifsc" className="sx-section scroll-mt-24 bg-sx-bg-light">
        <div className="sx-container">
          <SectionIntro label={ifsc.label} heading={ifsc.heading} text={ifsc.text} />
          <div className="mt-12 md:mt-16">
            <RouteSelector />
          </div>

          <h3 className="mt-16 text-[26px] font-black tracking-[-0.02em] text-sx-ink md:mt-20">
            {ifsc.helpHeading}
          </h3>
          <Reveal
            stagger
            className="mt-7 grid gap-x-10 border-t border-sx-ink sm:grid-cols-2 lg:grid-cols-4"
          >
            {ifsc.help.map(([title, text], i) => (
              <div key={title} className="border-b border-sx-border py-7">
                <div className="sx-figure text-[13px] font-bold text-sx-ink-50">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-3 text-[20px] font-black leading-snug tracking-[-0.015em] text-sx-ink">
                  {title}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-sx-body">{text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Facilities and services: provider directory by category, One Desk. */}
      <section id="facilities" className="sx-section scroll-mt-24">
        <div className="sx-container">
          <SectionIntro
            label={facilities.label}
            heading={facilities.heading}
            text={facilities.text}
          />
          <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {facilities.categories.map(([title, text]) => (
              <article
                key={title}
                className="flex flex-col rounded-sx border border-sx-border bg-sx-white p-7"
              >
                <h3 className="text-[21px] font-black leading-[1.12] tracking-[-0.015em] text-sx-ink">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-sx-body">{text}</p>
                {/* Provider slots stay empty until ScaleAX approves listings. */}
                <div className="mt-auto pt-6">
                  <div className="rounded-sx border border-dashed border-sx-ink-20 px-4 py-3 text-[13px] font-bold text-sx-muted">
                    Partner listing &middot; Coming soon
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
          <p className="mt-6 max-w-[80ch] text-[14px] leading-relaxed text-sx-muted">
            {facilities.partnerNote}
          </p>

          <div className="mt-12 rounded-sx bg-sx-ink-deep p-7 text-sx-white md:mt-16 md:p-12">
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h3 className="text-[clamp(1.7rem,2.8vw,2.5rem)] font-black leading-[1.04] tracking-[-0.02em] text-sx-white">
                  {facilities.deskHeading}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed text-white/80">
                  {facilities.deskText}
                </p>
                <Link href="/contact" className="sx-btn sx-btn-light mt-8">
                  Talk to us about One Desk
                  <span className="sx-btn-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
              <dl className="border-t border-white/25 lg:col-span-8">
                {facilities.desk.map(([title, text]) => (
                  <div
                    key={title}
                    className="grid gap-x-6 gap-y-1 border-b border-white/15 py-4 sm:grid-cols-[12rem_1fr]"
                  >
                    <dt className="text-[15px] font-bold">{title}</dt>
                    <dd className="text-[15px] leading-relaxed text-white/75">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-6 rounded-sx bg-sx-tint-blue p-7 md:p-9">
            <div>
              <h3 className="text-[22px] font-black tracking-[-0.015em] text-sx-ink">
                {facilities.listCta[0]}
              </h3>
              <p className="mt-2 text-[15px] text-sx-body">{facilities.listCta[1]}</p>
            </div>
            <Link href="/contact" className="sx-btn sx-btn-primary shrink-0">
              {facilities.listCta[2]}
            </Link>
          </div>
        </div>
      </section>

      {/* Jobs in GIFT City. */}
      <section id="jobs" className="sx-section scroll-mt-24 bg-sx-bg-light">
        <div className="sx-container">
          <SectionIntro label={jobs.label} heading={jobs.heading} text={jobs.text} />
          <div className="mt-12 md:mt-16">
            <JobsBoard />
          </div>
        </div>
      </section>

      <AccordionSection
        id="faq"
        eyebrow="FAQ"
        headline="Common questions about GIFT City."
        items={faq.map(([title, answer]) => ({ title, points: [answer] }))}
      />

      <InNumbers
        figure="tower"
        stats={numbers.map(([figure, label]) => ({ figure, label, line: '' }))}
      />

      <WhereNext page="gift-city" />

      <ClosingCta
        figure="man-blazer"
        headline={closing[0]}
        line={closing[1]}
        label={closing[2]}
        href="/contact"
      />
    </>
  );
}
