import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { LocationFinder } from '@/components/location/location-finder';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Section 13 — exact page title for the Location Finder.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'GCC Location Finder: compare Indian cities for your centre | ScaleAX' },
  description:
    'Compare 10 cities on 25+ factors covering talent, cost, access and day-to-day operations. Weight them to your own priorities.',
  path: '/location',
});

// Part D1 — the full interactive Location Finder.
export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="LOCATION FINDER"
        title="Which Indian city suits your centre?"
        intro="Compare 10 cities on 25+ factors covering talent, cost, access and day-to-day operations. Weight them to your own priorities."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'Location Finder' }]}
      />
      <div className="sx-container flex justify-center gap-4 pt-8">
        <a href="#lf-centre-heading" className="sx-btn sx-btn-primary !h-11 text-[14px]">
          Start the comparison
        </a>
        <Link href="/contact" className="sx-btn sx-btn-ghost !h-11 text-[14px]">
          Talk to us
        </Link>
      </div>

      <LocationFinder />

      <WhereNext page="location" />
      <ClosingCta
        headline="Talk to us about your city choice."
        line="We'll walk through the trade-offs for your profile."
      />
    </>
  );
}
