import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B6 — Solutions: Consulting.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'GCC consulting: strategy, location and business case | ScaleAX' },
  description:
    'Independent advice on whether, where and how to build a capability centre in India, and how to improve one you already run.',
  path: '/solutions/consulting',
});

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · CONSULTING"
        title="Advice before you commit, and after you open."
        intro="Our consulting team helps you decide whether, where and how to build a centre in India, and how to get more from one you already run. The advice comes from people who have run finance, operations and teams, and who will build the centre if you go ahead."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'Solutions' }, { label: 'Consulting' }]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="WHAT WE OFFER"
        headline="Three types of work."
        columns={3}
        items={[
          {
            title: 'New centre plan',
            description:
              'Mandate, functions, location, organisation, structure and business case (the Plan stage).',
          },
          {
            title: 'Location advisory',
            description:
              'City and micro-market comparison, site visits and a written recommendation.',
          },
          {
            title: 'Centre review',
            description:
              'For an existing centre: maturity, cost and automation reviews with a plan of action.',
          },
        ]}
      />

      <TileSection
        eyebrow="FOCUS AREAS"
        columns={3}
        items={[
          {
            title: 'Mandate and scope',
            description: 'What the centre is for, and how its success will be measured.',
          },
          { title: 'Function selection', description: 'What to build in India, in what order.' },
          { title: 'Location', description: 'City, micro-market and building shortlist.' },
          {
            title: 'Organisation',
            description: 'Structure, leadership roles, grades and governance with head office.',
          },
          {
            title: 'Structure and tax',
            description: 'Entity type, tax, transfer pricing and GIFT City options.',
          },
          { title: 'Business case', description: 'Five-year cost model and payback.' },
        ]}
      />

      <section className="sx-container py-4 text-[14px] text-sx-muted">
        <span className="font-bold text-sx-ink">Who delivers it: </span>
        ScaleAX founders with Awfficacy advisory specialists.
      </section>

      <InNumbers
        figure="towers"
        stats={[
          { figure: '3', label: 'Service lines', line: 'New centre, location, review' },
          { figure: '6', label: 'Focus areas', line: 'From mandate to business case' },
          { figure: '4 weeks', label: 'Typical plan', line: 'Kick-off to business case' },
          { figure: '1', label: 'Team', line: 'From advice to execution' },
        ]}
      />

      <LifecycleStrip current="plan" />
      <WhereNext page="consulting" />
      <ClosingCta
        figure="woman-seated"
        headline="Get an outside view before you commit."
        line="Tell us what you are considering; we'll suggest where to start."
      />
    </>
  );
}
