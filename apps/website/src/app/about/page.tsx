import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { PurposeCards } from '@/components/about/purpose-cards';
import { ValuesGrid } from '@/components/about/values-grid';
import { WhyHub } from '@/components/about/why-hub';
import { PartnerFirms } from '@/components/home/partner-firms';
import { Leadership } from '@/components/leadership';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B1 — About ScaleAX.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'About ScaleAX | GCC set-up partner in India' },
  description:
    'ScaleAX brings together firms that build offices, run workspaces, manage IT and keep the books, so global companies can open and run an India centre under one contract.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT SCALEAX"
        title="Built by operators. Designed for global companies entering India."
        intro="ScaleAX brings together strategy, workspace, talent, technology, finance and compliance under one accountable partner — helping global companies build, operate and scale their GCCs in India."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'About' }]}
      />

      <PurposeCards />

      <ValuesGrid />

      <WhyHub />

      {/* The ecosystem firms behind ScaleAX. */}
      <PartnerFirms />

      <Leadership />

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
