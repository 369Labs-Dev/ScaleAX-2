import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { ComparisonTable } from '@/components/comparison-table';
import { AccordionSection } from '@/components/accordion-section';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B13 — Engagement models.
// W8: the brief's fourth model, Employer of Record (#eor, "only if
// offered"), is now included — the user approved it with the green
// redesign, whose reference homepage and "What we offer" page show EOR as
// the fourth model. See the EOR entry below for where its copy comes from.
export const metadata: Metadata = pageMetadata({
  title: {
    absolute:
      'GCC engagement models: BOT, assisted set-up, managed seats, Employer of Record | ScaleAX',
  },
  description:
    'Compare Build-Operate-Transfer, assisted set-up, managed seats and Employer of Record for your India centre, and choose how much you own, and when.',
  path: '/models',
});

interface ModelDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  youDo: string[];
  weDo: string[];
  whyItWorks: string[];
  bestFor: string;
  typicalLength: string;
}

const MODELS: ModelDetail[] = [
  {
    id: 'bot',
    name: 'Build-Operate-Transfer',
    tagline: "Our entity first. Yours when you're ready.",
    description:
      'We set up the centre on our own entity, run it, and transfer it to you at a milestone agreed in the contract. You receive a staffed, documented, working centre.',
    youDo: [
      'Set the mandate and direct the work',
      'Approve key hires and budgets',
      'Decide when to trigger the transfer',
    ],
    weDo: [
      'Entity, office, IT, hiring and all set-up',
      'HR, payroll, finance, tax and compliance while we operate',
      'Transfer of people, contracts and assets',
    ],
    whyItWorks: [
      'No entity risk for you during set-up and early running',
      'Transfer price and terms agreed on day one',
      'Every process documented and ready to transfer',
      'One contract from start to handover',
    ],
    bestFor:
      'Companies that want their own centre in the end but prefer us to carry the set-up risk.',
    typicalLength: '2–3 years before transfer',
  },
  {
    id: 'assisted',
    name: 'Assisted set-up',
    tagline: 'Your entity from day one. We do the set-up work.',
    description:
      'You own the entity from the day it is registered. We deliver the set-up as your partner and stay on for the services you choose.',
    youDo: [
      'Own the entity and appoint directors',
      'Hold leases and employment contracts',
      'Choose which services we continue',
    ],
    weDo: [
      'Incorporation and registrations',
      'Office, IT and first hires',
      'Ongoing services as agreed (payroll, finance, compliance, facilities)',
    ],
    whyItWorks: [
      'Full control and ownership from the start',
      'One partner for all set-up work',
      'Keep us only for the services you need',
    ],
    bestFor: 'Companies that want direct ownership and have leadership ready to run the centre.',
    typicalLength: 'Set-up in 12–16 weeks, then ongoing services as agreed',
  },
  {
    id: 'managed-seats',
    name: 'Managed seats',
    tagline: 'Pay per seat. Add seats as you grow.',
    description:
      'Your team works on our entity from a managed DevX office. One monthly fee per seat covers workspace, IT, HR and payroll.',
    youDo: ["Direct the team's work", 'Set goals and review performance'],
    weDo: [
      'Employment, payroll and compliance',
      'Workspace, IT and facilities',
      'Hiring for new seats',
    ],
    whyItWorks: [
      'The fastest way to start: no entity, no fit-out',
      'Predictable monthly cost',
      'Move to BOT or your own entity at any time',
    ],
    bestFor: 'Pilots, first teams of 5–50 people, or testing India before a larger commitment.',
    typicalLength: 'Monthly, with 3-month notice',
  },
  // W8 — Employer of Record. Tagline and description are drawn from the
  // approved reference design (site-hazel-gamma-44.vercel.app, "What we
  // offer" → "Four ways to work with us"); You do / We do / Why it works /
  // Best for / Typical length follow the Website Brief's own #eor section.
  // Pending ScaleAX's confirmation of the EOR commercial terms.
  {
    id: 'eor',
    name: 'Employer of Record',
    tagline: 'Hire in India. No entity required.',
    description:
      'Get to market in weeks. Your people sit on our payroll while you direct the work, with a clean path to your own entity later.',
    youDo: ['Direct the work and manage performance'],
    weDo: ['Employment contracts, payroll, statutory benefits and compliance'],
    whyItWorks: [
      'Hire in weeks',
      'No entity exposure',
      'Convert to your own entity later with continuity',
    ],
    bestFor: 'Hiring a few specialists before deciding on a centre.',
    typicalLength: 'Per employee, monthly',
  },
];

export default function ModelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagement models"
        title="Choose how much you own, and when."
        intro="Every centre starts differently. Pick the model that fits your stage and appetite for risk, and move to another as the centre grows."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'Engagement models' }]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Compare the models', href: '#compare', variant: 'ghost' },
        ]}
        chips={MODELS.map((model) => ({ label: model.name, href: `#${model.id}` }))}
      />

      <section className="sx-container py-12 sm:py-16">
        <div className="space-y-10">
          {MODELS.map((model, index) => (
            <div
              key={model.id}
              id={model.id}
              className="scroll-mt-24 overflow-hidden rounded-sx border border-sx-border bg-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Main column: what the model is and how the work splits. */}
                <div className="p-6 sm:p-8 lg:col-span-8">
                  <div className="flex items-baseline gap-4">
                    <div className="sx-figure text-[14px] font-bold text-sx-muted">
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {String(MODELS.length).padStart(2, '0')}
                    </div>
                    <div className="sx-eyebrow">{model.tagline}</div>
                  </div>
                  <h2 className="mt-3 text-[24px] font-bold tracking-[-0.01em] text-sx-ink sm:text-[32px]">
                    {model.name}
                  </h2>
                  <p className="mt-3 max-w-[640px] text-[16px] leading-[1.6] text-sx-body">
                    {model.description}
                  </p>

                  <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-sx bg-sx-bg-light p-5">
                      <div className="text-[14px] font-bold text-sx-ink">You do</div>
                      <ul className="mt-3 space-y-2">
                        {model.youDo.map((item) => (
                          <li
                            key={item}
                            className="border-l-2 border-sx-ink-20 pl-3 text-[14px] leading-[1.5] text-sx-body"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-sx bg-sx-bg-light p-5">
                      <div className="text-[14px] font-bold text-sx-ink">We do</div>
                      <ul className="mt-3 space-y-2">
                        {model.weDo.map((item) => (
                          <li
                            key={item}
                            className="border-l-2 border-sx-ink-20 pl-3 text-[14px] leading-[1.5] text-sx-body"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="text-[14px] font-bold text-sx-ink">Why it works</div>
                    <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                      {model.whyItWorks.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-[14px] leading-[1.5] text-sx-body"
                        >
                          <span aria-hidden="true" className="mt-px font-bold text-sx-ink">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Facts sidebar: the decision-making facts plus the CTA. */}
                <div className="flex flex-col justify-between gap-8 border-t border-sx-border bg-sx-bg-light p-6 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0">
                  <dl className="space-y-6">
                    <div>
                      <dt className="text-[14px] font-bold text-sx-muted">Best for</dt>
                      <dd className="mt-2 text-[16px] leading-[1.55] font-normal text-sx-ink">
                        {model.bestFor}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[14px] font-bold text-sx-muted">Typical length</dt>
                      <dd className="mt-2 text-[16px] leading-[1.55] font-normal text-sx-ink">
                        {model.typicalLength}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href="/contact"
                    className="sx-btn sx-btn-primary w-full sm:w-auto lg:w-full"
                  >
                    Talk to us about this model
                    <span className="sx-btn-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ComparisonTable
        id="compare"
        eyebrow="Compare"
        headline="How the four models compare."
        columns={['BOT', 'Assisted set-up', 'Managed seats', 'Employer of Record']}
        rows={[
          {
            label: 'Who owns the entity',
            values: ['ScaleAX, then you', 'You', 'ScaleAX', 'ScaleAX'],
          },
          {
            label: 'Who employs the team',
            values: ['ScaleAX, then you', 'You', 'ScaleAX', 'ScaleAX'],
          },
          {
            label: 'Time to first hires',
            values: ['12–16 weeks', '12–16 weeks', '4–6 weeks', 'A few weeks'],
          },
          { label: 'Upfront investment', values: ['Low', 'Higher', 'Lowest', 'None'] },
          {
            label: 'Your control',
            values: ['High, rising to full', 'Full', 'Over the work', 'Over the work'],
          },
          {
            label: 'Path to ownership',
            values: [
              'Transfer at agreed milestone',
              'Owned from day one',
              'Move to BOT or own entity',
              'Convert to your own entity later',
            ],
          },
        ]}
        note="Figures are typical ranges and are confirmed with you for your specific centre. Employer of Record figures follow the brief's #eor section and the reference design, pending ScaleAX's confirmation."
      />

      <AccordionSection
        eyebrow="FAQ"
        headline="Short FAQ"
        defaultOpenIndex={null}
        items={[
          {
            title: 'Can we switch models later?',
            points: [
              'Yes. Many clients start with managed seats and move to BOT or their own entity once the team grows.',
            ],
          },
          {
            title: 'How is the BOT transfer priced?',
            points: ['By a formula written into the contract before we start.'],
          },
          {
            title: 'Who owns the IP?',
            points: [
              'You do, under every model. Employment and service contracts assign it to you.',
            ],
          },
        ]}
      />

      <WhereNext page="models" />
      <ClosingCta
        headline="Not sure which model fits?"
        line="We'll walk you through the trade-offs for your size, timeline and budget."
      />
    </>
  );
}
