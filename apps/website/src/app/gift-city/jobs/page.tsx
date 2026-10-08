import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { GIFT_CITY } from '@/lib/gift-city-data';
import { GiftCitySubPage, JobsSection } from '@/components/gift-city/sections';

// Jobs in GIFT City: the jobs board.
export const metadata: Metadata = pageMetadata({
  title: 'Jobs in GIFT City',
  description:
    'Browse open roles at GIFT City employers by function, experience and employer type.',
  path: '/gift-city/jobs',
});

export default function GiftCityJobsPage() {
  return (
    <GiftCitySubPage
      path="/gift-city/jobs"
      eyebrow={GIFT_CITY.jobs.label}
      title={GIFT_CITY.jobs.heading}
      intro={GIFT_CITY.jobs.text}
    >
      <JobsSection />
    </GiftCitySubPage>
  );
}
