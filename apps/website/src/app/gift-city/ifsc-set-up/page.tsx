import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { GIFT_CITY } from '@/lib/gift-city-data';
import { GiftCitySubPage, IfscSection } from '@/components/gift-city/sections';

// IFSC set-up: the licence route selector and what ScaleAX does.
export const metadata: Metadata = pageMetadata({
  title: 'IFSC set-up in GIFT City',
  description:
    'Compare the IFSC licence routes in GIFT City, see who qualifies and follow the set-up journey for each, from first meeting to go-live.',
  path: '/gift-city/ifsc-set-up',
});

export default function GiftCityIfscPage() {
  return (
    <GiftCitySubPage
      path="/gift-city/ifsc-set-up"
      eyebrow={GIFT_CITY.ifsc.label}
      title={GIFT_CITY.ifsc.heading}
      intro={GIFT_CITY.ifsc.text}
    >
      <IfscSection />
    </GiftCitySubPage>
  );
}
