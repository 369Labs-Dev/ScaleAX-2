import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { ProcessSteps } from '@/components/process-steps';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B11 — Solutions: Tax, legal and compliance.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Entity set-up, tax and compliance for your GCC in India | ScaleAX' },
  description:
    'Company incorporation, FDI, tax, transfer pricing and ongoing compliance handled by chartered accountants and legal specialists.',
  path: '/solutions/tax-legal-compliance',
});

export default function TaxLegalCompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · TAX, LEGAL AND COMPLIANCE"
        title="Your entity, tax and filings, handled by chartered accountants."
        intro="We set up your Indian entity, choose the right tax position and keep every filing on time. The work is done by chartered accountants and legal specialists in the ScaleAX group."
        breadcrumb={[
          { label: 'Home', url: '/' },
          { label: 'Solutions' },
          { label: 'Tax, legal and compliance' },
        ]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="ENTITY"
        headline="Setting up your company."
        columns={3}
        items={[
          {
            title: 'Choice of structure',
            description:
              'Private limited company, LLP, branch or GIFT City IFSC unit, compared on tax and compliance.',
          },
          {
            title: 'Foreign investment',
            description: 'FDI route, FEMA rules and reporting to the Reserve Bank of India.',
          },
          {
            title: 'Incorporation',
            description:
              'Name approval, MoA and AoA, and filings with the Ministry of Corporate Affairs.',
          },
          {
            title: 'Directors and board',
            description:
              'Board composition, resident director requirement and first board meeting.',
          },
          { title: 'Bank account', description: 'Account opening and KYC.' },
          {
            title: 'Registrations',
            description: 'PAN, TAN, GST, LUT, Shops and Establishments, professional tax.',
          },
        ]}
      />

      <TileSection
        eyebrow="TAX"
        columns={3}
        items={[
          {
            title: 'Corporate tax',
            description: 'Tax regime, advance tax, returns and tax audit.',
          },
          {
            title: 'GST',
            description: 'Registration, export-of-services treatment, returns and refunds.',
          },
          {
            title: 'Transfer pricing',
            description: 'Intercompany agreements, benchmarking, Form 3CEB and documentation.',
          },
          {
            title: 'Permanent establishment',
            description: 'Risk review for secondees and head-office staff working in India.',
          },
          {
            title: 'Tax advisory',
            description:
              'Structuring, funding, secondments and representation before tax authorities.',
          },
        ]}
      />

      <TileSection
        eyebrow="ONGOING COMPLIANCE"
        columns={3}
        items={[
          {
            title: 'Company secretarial',
            description:
              'Registers, board minutes and annual filings with the Registrar of Companies.',
          },
          {
            title: 'FEMA',
            description: 'FC-GPR, annual FLA return and intercompany loan reporting.',
          },
          {
            title: 'SEZ, STPI and IFSC',
            description:
              'Unit compliance and export reporting for special zones, including GIFT City.',
          },
          {
            title: 'Labour laws',
            description: 'Monthly and annual labour filings, POSH and contractor compliance.',
          },
          {
            title: 'Compliance calendar',
            description: 'Every due date for the year, with owners, tracked monthly.',
          },
        ]}
      />

      <ProcessSteps
        eyebrow="HOW IT RUNS"
        steps={[
          { label: 'Structure', body: 'Compare entity options and tax positions.' },
          { label: 'Set up', body: 'Incorporate, register and put controls in place.' },
          { label: 'Run', body: 'File, pay and report every month, quarter and year.' },
        ]}
      />

      <section className="sx-container py-4 text-[14px] text-sx-muted">
        <span className="font-bold text-sx-ink">Partner firms: </span>
        Talati &amp; Talati and Awfficacy Global.
      </section>

      <InNumbers
        figure="towers"
        stats={[
          { figure: '6', label: 'Entity steps', line: 'Structure to registrations' },
          { figure: '5', label: 'Tax areas', line: 'Corporate tax to advisory' },
          { figure: '5', label: 'Compliance areas', line: 'Secretarial to calendar' },
          { figure: '365', label: 'Day compliance calendar', line: 'Every due date tracked' },
        ]}
      />

      <LifecycleStrip current="build" />
      <WhereNext page="tax-legal-compliance" />
      <ClosingCta
        figure="man-phone"
        headline="Set up your entity the right way."
        line="Tell us your group structure and we'll recommend the best set-up for India."
      />
    </>
  );
}
