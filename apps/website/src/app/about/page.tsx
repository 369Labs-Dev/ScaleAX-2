import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { AccordionSection } from '@/components/accordion-section';
import { PartnerFirms } from '@/components/home/partner-firms';
import { Leadership } from '@/components/leadership';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';
import { ABOUT_VALUES, WHY_SCALEAX } from '@/lib/about-data';

// Part B, PAGE B1 — About ScaleAX.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'About ScaleAX | GCC set-up partner in Ahmedabad and GIFT City' },
  description:
    'ScaleAX brings together firms that build offices, run workspaces, manage IT and keep the books, so global companies can open and run an India centre under one contract.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT SCALEAX"
        title="Built by people who have run offices, books and teams for a living."
        intro="ScaleAX Advisory was set up in Ahmedabad and GIFT City by a group of founders. Their firms already build offices, run workspaces, manage IT, and keep the books and filings for companies in India and abroad. ScaleAX brings them together under one contract, so a global company can open, run and eventually own its India centre without managing a dozen suppliers."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'About' }]}
      />

      {/* Purpose and vision */}
      <section className="sx-container py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <div className="sx-eyebrow">Why we exist</div>
            <p className="mt-2 text-[18px] font-bold text-sx-ink">
              To make it simple for global companies to build and run teams in India.
            </p>
          </div>
          <div>
            <div className="sx-eyebrow">Where we are going</div>
            <p className="mt-2 text-[18px] font-bold text-sx-ink">
              To be the first call a mid-sized global company makes when it decides to open in
              India.
            </p>
          </div>
        </div>
      </section>

      {/* Our values — shown as an accordion, first item open (see
          accordion-section.tsx for the tabs-vs-accordion note). */}
      <AccordionSection
        id="values"
        eyebrow="HOW WE WORK"
        headline="Four things we hold ourselves to."
        items={ABOUT_VALUES.map((value) => ({ title: value.title, points: [value.body] }))}
      />

      {/* Why companies choose ScaleAX */}
      <TileSection
        id="why-scaleax"
        eyebrow="WHY SCALEAX"
        headline="What you get that others can't easily offer."
        items={WHY_SCALEAX.map((item) => ({ title: item.title, description: item.description }))}
      />

      {/* The firms behind ScaleAX — same tiles as the homepage (Section 9).
          The brief also asks for a "Visit website" link on each tile; no
          confirmed firm URLs exist in the brief, so that link is omitted
          rather than invented (see PartnerFirms). */}
      <PartnerFirms />

      <Leadership />

      <InNumbers
        stats={[
          { figure: '7', label: 'Founders', line: 'Each running a firm in the ScaleAX group' },
          { figure: '5', label: 'Partner firms', line: 'Building, workspace, IT, finance, tax' },
          { figure: '2', label: 'Home cities', line: 'Ahmedabad and GIFT City' },
          { figure: '1', label: 'Contract', line: 'For your whole centre' },
        ]}
      />

      {/* No stage highlighted on this page, per the brief. */}
      <LifecycleStrip />

      <WhereNext page="about" />

      <ClosingCta
        headline="Meet the team behind your India centre."
        line="Tell us what you are planning and we'll set up a call with the founder closest to your needs."
      />
    </>
  );
}
