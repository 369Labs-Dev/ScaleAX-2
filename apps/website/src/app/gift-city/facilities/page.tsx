import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { GIFT_CITY } from '@/lib/gift-city-data';
import { GiftCitySubPage, FacilitiesSection } from '@/components/gift-city/sections';

// Facilities and services: provider directory by category, One Desk.
export const metadata: Metadata = pageMetadata({
  title: 'GIFT City facilities and services',
  description:
    'Services around your GIFT City office, by category, and the ScaleAX One Desk that helps your team settle in.',
  path: '/gift-city/facilities',
});

export default function GiftCityFacilitiesPage() {
  return (
    <GiftCitySubPage
      path="/gift-city/facilities"
      eyebrow={GIFT_CITY.facilities.label}
      title={GIFT_CITY.facilities.heading}
      intro={GIFT_CITY.facilities.text}
    >
      <FacilitiesSection />
    </GiftCitySubPage>
  );
}
