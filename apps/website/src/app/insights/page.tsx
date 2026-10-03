import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';
import { InsightsExplorer } from '@/components/insights/insights-explorer';

// Part B, PAGE B15 — Insights.
export const metadata: Metadata = pageMetadata({
  title: 'Insights',
  description: 'Analysis and practical guidance on setting up and running a GCC in India.',
  path: '/insights',
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="INSIGHTS"
        title="Notes from the work."
        intro="Analysis and practical guidance on setting up and running a GCC in India."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'Insights' }]}
      />

      <InsightsExplorer />

      <WhereNext page="insights" />
      <ClosingCta
        headline="Talk to us about your centre."
        line="Start with a short call about what you're planning."
      />
    </>
  );
}
