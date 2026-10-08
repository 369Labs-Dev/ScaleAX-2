import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B4 — How we work: Run.
export const metadata: Metadata = pageMetadata({
  title: {
    absolute: 'Run your GCC in India: HR, payroll, finance, compliance and IT | ScaleAX',
  },
  description:
    'Once your centre is open, ScaleAX runs its day-to-day operations with named owners, agreed service levels and regular reviews.',
  path: '/how-we-work/run',
});

export default function RunPage() {
  return (
    <>
      <PageHero
        eyebrow="HOW WE WORK · RUN"
        title="Your centre, run day to day by people who know it."
        intro="Once the centre is open, we run the operations behind it: people, money and premises. Every process has a named owner, agreed service levels and a monthly report. Your leaders focus on the work the centre was set up to do."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'How we work' }, { label: 'Run' }]}
        stage="run"
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="OUR PRINCIPLES"
        headline="Four rules for every service we run."
        columns={4}
        items={[
          {
            title: 'A named owner for every process',
            description: 'One person accountable for each service, known to your team by name.',
          },
          {
            title: 'Agreed service levels',
            description:
              'Turnaround times and accuracy targets written into the contract and reported monthly.',
          },
          {
            title: 'Regular reviews',
            description:
              'Weekly, monthly, quarterly and yearly reviews at the right level of seniority.',
          },
          {
            title: 'Specialists when needed',
            description:
              'Partner-firm experts for tax, legal, IT security and real estate, without extra contracts.',
          },
        ]}
      />

      <TileSection
        eyebrow="WHAT WE RUN"
        headline="Nine services in three groups."
        columns={3}
        items={[
          {
            title: 'People · Talent',
            description: 'Ongoing hiring, contract staff, campus hiring, leadership search.',
          },
          {
            title: 'People · HR and payroll',
            description:
              'Monthly payroll, statutory filings, HR helpdesk, expenses, performance cycle support, exits.',
          },
          {
            title: 'People · Employer brand',
            description: 'Careers page, LinkedIn content, hiring campaigns, onboarding experience.',
          },
          {
            title: 'Money · Finance and accounting',
            description:
              'Payables, receivables, bank reconciliations, month-end close, management reporting.',
          },
          {
            title: 'Money · Tax',
            description:
              'Advance tax, returns, GST filings and refunds, transfer pricing documentation, tax audits.',
          },
          {
            title: 'Money · Compliance',
            description:
              'Company secretarial, FEMA filings, labour filings, SEZ / STPI / IFSC compliance, compliance calendar.',
          },
          {
            title: 'Premises · Facilities',
            description: 'Office management, vendors, housekeeping, security, space changes.',
          },
          {
            title: 'Premises · IT operations and security',
            description:
              'Helpdesk, devices, network, security monitoring, backup and disaster recovery.',
          },
          {
            title: 'Premises · Programme governance',
            description: 'Service reporting, reviews, escalations and continuous improvement.',
          },
        ]}
      />

      <TileSection
        eyebrow="REVIEWS"
        headline="Four review cycles keep everyone aligned."
        columns={4}
        items={[
          {
            title: 'Weekly operations call',
            description: 'Process owners and your team: open issues, blockers, service levels.',
          },
          {
            title: 'Monthly service review',
            description: 'Service-level scorecard, trends and improvement actions.',
          },
          {
            title: 'Quarterly leadership review',
            description: 'With a ScaleAX founder: plans, headcount, costs and risks.',
          },
          {
            title: 'Annual planning',
            description: 'Budget, hiring plan and objectives for the year ahead.',
          },
        ]}
      />

      <InNumbers
        stats={[
          { figure: '9', label: 'Services', line: 'In three groups: people, money, premises' },
          { figure: '4', label: 'Review cycles', line: 'Weekly to annual' },
          { figure: 'Monthly', label: 'Service report', line: 'Against agreed service levels' },
          { figure: '1', label: 'Named owner', line: 'For every process' },
        ]}
      />

      <LifecycleStrip current="run" />
      <WhereNext page="run" />
      <ClosingCta
        headline="Hand us the running of your centre."
        line="Tell us which services you need and we'll propose service levels and a fee."
      />
    </>
  );
}
