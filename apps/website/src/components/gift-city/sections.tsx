import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GIFT_CITY } from '@/lib/gift-city-data';
import { GIFT_CITY_MENU } from '@/lib/site-data';
import { PageHero, type HeroAction } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { AccordionSection } from '@/components/accordion-section';
import { ClosingCta } from '@/components/closing-cta';
import { Reveal } from '@/components/motion/reveal';
import { RouteSelector } from './route-selector';
import { JobsBoard } from './jobs-board';

const { why, ifsc, facilities, faq, closing } = GIFT_CITY;

// The GIFT City hub is split into one page per part (overview, why, IFSC
// set-up, facilities, jobs, FAQ). Each part's body lives here; the pages
// under app/gift-city wrap it in GiftCitySubPage.

/** Hero, body, links to the other parts and the closing band. */
export function GiftCitySubPage({
  path,
  eyebrow,
  title,
  intro,
  actions,
  children,
}: {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  actions?: HeroAction[];
  children: React.ReactNode;
}) {
  const current = GIFT_CITY_MENU.find((link) => link.url === path);
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        image="page-gift-city"
        breadcrumb={[
          { label: 'Home', url: '/' },
          { label: 'GIFT City', url: '/gift-city' },
          { label: current?.label ?? title },
        ]}
        actions={actions}
      />
      {children}
      <GiftCityParts current={path} />
      <ClosingCta headline={closing[0]} line={closing[1]} label={closing[2]} href="/contact" />
    </>
  );
}

/** Cards linking to every part of the hub except the one being read. */
export function GiftCityParts({ current, heading }: { current: string; heading?: string }) {
  const links = GIFT_CITY_MENU.filter((link) => link.url !== current);
  return (
    <section className="sx-section">
      <div className="sx-container">
        <Reveal className="max-w-4xl">
          <div className="sx-eyebrow">GIFT City</div>
          <h2 className="sx-h2 mt-5 text-sx-ink">{heading ?? 'More on GIFT City'}</h2>
        </Reveal>
        {/* Five cards: two wide on the first row, three on the second. */}
        <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-6">
          {links.map((link, i) => (
            <Link
              key={link.url}
              href={link.url}
              className={`group flex min-h-[220px] flex-col rounded-sx border border-sx-border bg-sx-white p-7 transition-[border-color] duration-300 ease-sx-out hover:border-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              } ${i === links.length - 1 && links.length % 2 === 1 ? 'sm:col-span-2' : ''}`}
            >
              <span className="text-[22px] font-black leading-[1.12] tracking-[-0.015em] text-sx-ink">
                {link.label}
              </span>
              <span className="mt-3 text-[16px] leading-relaxed text-sx-body">{link.summary}</span>
              <span className="mt-auto flex items-center justify-between pt-8">
                <span className="text-[14px] font-bold text-sx-ink">View page</span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-sx border border-sx-ink text-sx-ink transition-[background-color,color] duration-300 ease-sx-out group-hover:bg-sx-ink group-hover:text-sx-white"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <TileSection
      columns={2}
      items={why.items.map(([title, description]) => ({ title, description }))}
    />
  );
}

/** Route selector, then what ScaleAX does. */
export function IfscSection() {
  return (
    <section className="sx-section bg-sx-bg-light">
      <div className="sx-container">
        <div>
          <RouteSelector />
        </div>

        <h3 className="mt-16 text-[24px] font-black tracking-[-0.02em] text-sx-ink md:mt-20">
          {ifsc.helpHeading}
        </h3>
        <Reveal
          stagger
          className="mt-7 grid gap-x-10 border-t border-sx-ink sm:grid-cols-2 lg:grid-cols-4"
        >
          {ifsc.help.map(([title, text], i) => (
            <div key={title} className="border-b border-sx-border py-7">
              <div className="sx-figure text-[14px] font-bold text-sx-ink-50">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-3 text-[20px] font-black leading-snug tracking-[-0.015em] text-sx-ink">
                {title}
              </div>
              <p className="mt-2 text-[16px] leading-relaxed text-sx-body">{text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Provider directory by category, then One Desk. */
export function FacilitiesSection() {
  return (
    <section className="sx-section">
      <div className="sx-container">
        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.categories.map(([title, text]) => (
            <article
              key={title}
              className="row-span-3 grid grid-rows-subgrid gap-0 rounded-sx border border-sx-border bg-sx-white p-7"
            >
              <h3 className="text-[20px] font-black leading-[1.12] tracking-[-0.015em] text-sx-ink">
                {title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-sx-body">{text}</p>
              {/* Provider slots stay empty until ScaleAX approves listings. */}
              <div className="self-end pt-6">
                <div className="rounded-sx border border-dashed border-sx-ink-20 px-4 py-3 text-[14px] font-bold text-sx-muted">
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
              <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] font-black leading-[1.04] tracking-[-0.02em] text-sx-white">
                {facilities.deskHeading}
              </h3>
              <p className="mt-4 text-[18px] leading-relaxed text-white/80">
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
                  <dt className="text-[16px] font-bold">{title}</dt>
                  <dd className="text-[16px] leading-relaxed text-white/75">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-6 rounded-sx bg-sx-tint-blue p-7 md:p-9">
          <div>
            <h3 className="text-[20px] font-black tracking-[-0.015em] text-sx-ink">
              {facilities.listCta[0]}
            </h3>
            <p className="mt-2 text-[16px] text-sx-body">{facilities.listCta[1]}</p>
          </div>
          <Link href="/contact" className="sx-btn sx-btn-primary shrink-0">
            {facilities.listCta[2]}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function JobsSection() {
  return (
    <section className="sx-section bg-sx-bg-light">
      <div className="sx-container">
        <div>
          <JobsBoard />
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return <AccordionSection items={faq.map(([title, answer]) => ({ title, points: [answer] }))} />;
}
