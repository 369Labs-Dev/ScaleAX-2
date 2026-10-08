import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { GIFT_CITY } from '@/lib/gift-city-data';
import { GiftCitySubPage, WhySection } from '@/components/gift-city/sections';

// Why GIFT City: the case for the IFSC, one point per row.
export const metadata: Metadata = pageMetadata({
  title: 'Why GIFT City',
  description:
    'Why companies choose GIFT City IFSC: one regulator, foreign-currency operations and a tax regime built for international business.',
  path: '/gift-city/why',
});

export default function GiftCityWhyPage() {
  return (
    <GiftCitySubPage
      path="/gift-city/why"
      eyebrow={GIFT_CITY.why.label}
      title={GIFT_CITY.why.heading}
      intro={GIFT_CITY.banner.text}
    >
      <WhySection />
    </GiftCitySubPage>
  );
}
