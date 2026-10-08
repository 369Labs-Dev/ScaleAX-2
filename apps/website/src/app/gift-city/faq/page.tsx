import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { GiftCitySubPage, FaqSection } from '@/components/gift-city/sections';

// GIFT City FAQ.
export const metadata: Metadata = pageMetadata({
  title: 'GIFT City FAQ',
  description:
    'Common questions about setting up in GIFT City IFSC: timelines, licences, tax, people and what ScaleAX handles.',
  path: '/gift-city/faq',
});

export default function GiftCityFaqPage() {
  return (
    <GiftCitySubPage
      path="/gift-city/faq"
      eyebrow="FAQ"
      title="Common questions about GIFT City."
      intro="Short answers on timelines, licences and what it takes to run a team from GIFT City."
    >
      <FaqSection />
    </GiftCitySubPage>
  );
}
