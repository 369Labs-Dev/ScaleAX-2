import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { GIFT_CITY } from '@/lib/gift-city-data';
import { PageHero } from '@/components/page-hero';
import { InNumbers } from '@/components/in-numbers';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';
import { GiftCityParts } from '@/components/gift-city/sections';

const { meta, banner, numbers, closing } = GIFT_CITY;

// GIFT City overview (brief of 6 October 2026). The hub is split into one
// page per part: why GIFT City, IFSC set-up, facilities, jobs and the FAQ
// each live under /gift-city/<part>; this page introduces and links to them.
export const metadata: Metadata = pageMetadata({
  title: { absolute: meta.tabTitle },
  description: meta.searchDesc,
  path: '/gift-city',
});

export default function GiftCityPage() {
  return (
    <>
      <PageHero
        eyebrow={banner.label}
        title={banner.heading}
        intro={banner.text}
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'GIFT City' }]}
        actions={[
          { label: banner.buttons[0], href: '/gift-city/ifsc-set-up' },
          { label: banner.buttons[1], href: '/gift-city/jobs', variant: 'ghost' },
        ]}
      />

      <GiftCityParts
        current="/gift-city"
        heading="Everything you need for GIFT City, in one place."
      />

      <InNumbers stats={numbers.map(([figure, label]) => ({ figure, label, line: '' }))} />

      <WhereNext page="gift-city" />

      <ClosingCta headline={closing[0]} line={closing[1]} label={closing[2]} href="/contact" />
    </>
  );
}
