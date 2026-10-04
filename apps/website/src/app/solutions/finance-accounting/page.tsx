import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B12 — Solutions: Finance and accounting.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Finance and accounting for your GCC in India | ScaleAX' },
  description:
    'Accounts payable, receivables, treasury, month-end close and group reporting run by chartered accountants.',
  path: '/solutions/finance-accounting',
});

export default function FinanceAccountingPage() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · FINANCE AND ACCOUNTING"
        title="Books closed on time, in the format your head office uses."
        intro="We set up the finance function for your centre and run it every month: payables, receivables, bank, month-end close and reporting to your group standards."
        breadcrumb={[
          { label: 'Home', url: '/' },
          { label: 'Solutions' },
          { label: 'Finance and accounting' },
        ]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="FINANCE"
        headline="Six processes, from set-up to monthly running."
        columns={3}
        items={[
          {
            title: 'Purchase to pay',
            description:
              'Set-up: vendor rules, approval limits and invoice workflow. Monthly: invoices, payments, vendor reconciliations.',
          },
          {
            title: 'Order to cash',
            description:
              'Set-up: billing model and intercompany invoicing. Monthly: invoicing, collections and receivables reconciliations.',
          },
          {
            title: 'Treasury and banking',
            description:
              'Set-up: bank mandates, payment controls, cash reporting. Monthly: daily cash position, bank reconciliations.',
          },
          {
            title: 'Record to report',
            description:
              'Set-up: chart of accounts and close calendar. Monthly: month-end close, balance sheet reconciliations, financial statements.',
          },
          {
            title: 'Management reporting',
            description:
              'Set-up: reporting pack mapped to group format (Ind AS, IFRS or US GAAP). Monthly: reports, budget vs actual, variance commentary.',
          },
          {
            title: 'Controls and audit',
            description:
              'Set-up: controls framework and risk assessment. Monthly: control checks, statutory audit and group audit support.',
          },
        ]}
      />

      <section className="sx-container py-4 text-[14px] text-sx-muted">
        <span className="font-bold text-sx-ink">Who delivers it: </span>
        Awfficacy Global: finance, accounting and regulatory outsourcing for international clients
        (25+ years, 70+ clients, 15+ sectors).
      </section>

      <InNumbers
        figure="tower"
        stats={[
          { figure: '6', label: 'Finance processes', line: 'Purchase to pay to audit' },
          { figure: '3', label: 'Reporting standards', line: 'Ind AS, IFRS, US GAAP' },
          { figure: '25+ years', label: 'Experience', line: 'Awfficacy Global' },
          { figure: '70+', label: 'Clients', line: 'Across 15+ sectors' },
        ]}
      />

      <LifecycleStrip current="run" />
      <WhereNext page="finance-accounting" />
      <ClosingCta
        figure="man-blazer"
        headline="Hand us the books."
        line="Tell us your group reporting needs and we'll set out how we'd run finance for your centre."
      />
    </>
  );
}
