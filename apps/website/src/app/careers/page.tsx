import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { CareersTabs } from '@/components/careers-tabs';
import { TileSection } from '@/components/tile-section';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B17 — Careers.
export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description: "Build India's next capability centres with ScaleAX, in Ahmedabad and GIFT City.",
  path: '/careers',
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build India's next capability centres with us."
        intro="We're building the team behind India's Global Capability Centres, in Ahmedabad and GIFT City."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'Careers' }]}
      />

      <section className="sx-container py-12 sm:py-16">
        <CareersTabs />
      </section>

      <TileSection
        eyebrow="Why work with us"
        columns={3}
        items={[
          {
            title: 'Varied work',
            description: 'Across real estate, finance and talent, not one narrow function.',
          },
          {
            title: 'Founders you work with directly',
            description: 'A flat team, without layers of management between you and the founders.',
          },
          {
            title: 'Ahmedabad and GIFT City base',
            description: "Build a career from India's newest international finance centre.",
          },
        ]}
      />

      <WhereNext page="careers" />
      <ClosingCta
        headline="Get in touch."
        line="Send us a note even if there's no open role listed yet."
        label="Contact us"
      />
    </>
  );
}
