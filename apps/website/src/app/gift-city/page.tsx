import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { ProcessSteps } from '@/components/process-steps';
import { AccordionSection } from '@/components/accordion-section';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B14 — GIFT City.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Set up a Global In-House Centre in GIFT City IFSC | ScaleAX' },
  description:
    'How GIFT City IFSC works for capability centres, who qualifies as a Global In-House Centre, and how ScaleAX sets one up.',
  path: '/gift-city',
});

export default function GiftCityPage() {
  return (
    <>
      <PageHero
        eyebrow="GIFT CITY"
        title="Set up in India's international financial services centre."
        intro="GIFT City in Gandhinagar is home to India's International Financial Services Centre (IFSC). It has its own regulator and its own rules, including a framework for Global In-House Centres that serve their own financial services group. ScaleAX is based there and sets up units for clients."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'GIFT City' }]}
        actions={[
          { label: 'Check your eligibility', href: '/contact' },
          { label: 'How set-up runs', href: '#setup', variant: 'ghost' },
        ]}
        chips={[
          { label: 'What the IFSC is', href: '#ifsc' },
          { label: 'The GIC framework', href: '#gic' },
          { label: 'Set-up steps', href: '#setup' },
          { label: 'FAQ', href: '#faq' },
        ]}
      />

      <TileSection
        id="ifsc"
        eyebrow="WHAT GIFT CITY IFSC IS"
        columns={4}
        items={[
          {
            title: 'One regulator',
            description:
              'The International Financial Services Centres Authority (IFSCA) regulates banking, capital markets, insurance and other financial services in the IFSC.',
          },
          {
            title: 'Foreign-currency operations',
            description: 'Units operate in freely convertible foreign currency.',
          },
          {
            title: 'Separate tax regime',
            description:
              'A distinct regime for eligible units, confirmed with our tax team for your structure.',
          },
          {
            title: 'A planned business district',
            description:
              'Offices, housing and infrastructure built for international business, a short drive from Ahmedabad airport.',
          },
        ]}
      />

      <section id="gic" className="sx-container scroll-mt-24 py-12 sm:py-16">
        <div className="max-w-[720px]">
          <div className="sx-eyebrow">GIC FRAMEWORK</div>
          <h2 className="mt-3 text-[28px] font-black leading-[1.06] tracking-[-0.03em] text-sx-ink sm:text-[40px]">
            Who can set up a GIC in GIFT City.
          </h2>
        </div>
        <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="sx-card-hover rounded-[16px] border border-sx-border bg-white p-6">
            <dt className="text-[16px] font-bold text-sx-ink">What a GIC is</dt>
            <dd className="mt-2 text-[14px] leading-[1.55] text-sx-body">
              A unit in the IFSC that provides support services only to entities in its own
              financial services group, under the IFSCA (Global In-House Centres) Regulations, 2025.
            </dd>
          </div>
          <div className="sx-card-hover rounded-[16px] border border-sx-border bg-white p-6">
            <dt className="text-[16px] font-bold text-sx-ink">Who it suits</dt>
            <dd className="mt-2 text-[14px] leading-[1.55] text-sx-body">
              Banks, insurers, asset managers, brokers and other financial groups, subject to
              eligibility under the 2025 regulations.
            </dd>
          </div>
          <div className="sx-card-hover rounded-[16px] border border-sx-border bg-white p-6">
            <dt className="text-[16px] font-bold text-sx-ink">What else is possible</dt>
            <dd className="mt-2 text-[14px] leading-[1.55] text-sx-body">
              Other companies can set up in GIFT City outside the IFSC. We can walk through the
              options for your structure.
            </dd>
          </div>
        </dl>
      </section>

      <ProcessSteps
        id="setup"
        eyebrow="HOW WE SET UP A GIFT CITY UNIT"
        steps={[
          {
            label: 'Eligibility check',
            body: 'We confirm whether your group qualifies and which structure fits.',
          },
          { label: 'Application', body: 'Application to IFSCA and the relevant approvals.' },
          {
            label: 'Entity and bank',
            body: 'Company or branch set-up and a bank account with an IFSC banking unit.',
          },
          { label: 'Space', body: 'Office in GIFT City, managed or custom-built.' },
          { label: 'People', body: 'Hiring, payroll and HR set up.' },
          { label: 'Go live and run', body: 'Operations, compliance and reporting to IFSCA.' },
        ]}
      />

      <AccordionSection
        id="faq"
        eyebrow="FAQ"
        defaultOpenIndex={null}
        items={[
          {
            title: 'How long does approval take?',
            points: [
              'Typical timelines depend on your structure; we confirm this once we know your group.',
            ],
          },
          {
            title: 'Can non-financial companies use GIFT City?',
            points: ['We confirm the current options for your sector when we scope your set-up.'],
          },
          {
            title: 'Do we need to hire in GIFT City itself?',
            points: [
              'Staff work from the GIFT City office; many live in Ahmedabad or Gandhinagar, a short commute away.',
            ],
          },
        ]}
      />

      <InNumbers
        stats={[
          {
            figure: '2025',
            label: 'GIC Regulations',
            line: 'IFSCA framework for in-house centres',
          },
          { figure: '1', label: 'Regulator', line: 'IFSCA' },
          { figure: '2', label: 'Locations', line: 'Ahmedabad and GIFT City together' },
          { figure: 'Based here', label: 'ScaleAX office', line: 'In GIFT City' },
        ]}
      />

      <LifecycleStrip />
      <WhereNext page="gift-city" />
      <ClosingCta
        headline="Find out if GIFT City suits your group."
        line="We'll check eligibility and outline the set-up."
      />
    </>
  );
}
