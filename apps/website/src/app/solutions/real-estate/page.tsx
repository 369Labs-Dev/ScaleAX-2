import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B7 — Solutions: Real estate and workspace.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Office space for your GCC in Ahmedabad and GIFT City | ScaleAX' },
  description:
    'Managed seats to start, a custom-built office to grow, and facilities management once you move in, through ScaleAX partner firms DevX and Savvy Group.',
  path: '/solutions/real-estate',
});

export default function RealEstatePage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions · Real estate and workspace"
        title="Start in a managed office. Grow into your own."
        intro="Your first team can start in a managed DevX office within weeks while we plan your permanent space. When you are ready, Savvy Group builds an office to your standards, and we run it once you move in."
        breadcrumb={[
          { label: 'Home', url: '/' },
          { label: 'Solutions' },
          { label: 'Real estate and workspace' },
        ]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="Options"
        headline="Four ways to house your team."
        columns={4}
        items={[
          {
            title: 'Managed seats',
            description:
              'Ready-to-use seats in a DevX centre, paid monthly, with IT and facilities included.',
          },
          {
            title: 'Managed private floor',
            description: 'A dedicated floor or wing in a managed centre, branded for you.',
          },
          {
            title: 'Custom-built office',
            description: 'An office designed and built to your specification by Savvy Group.',
          },
          {
            title: 'Advisory only',
            description:
              'Help finding and negotiating space with any developer; we are not tied to one landlord.',
          },
        ]}
      />

      <TileSection
        eyebrow="Set-up services"
        columns={3}
        items={[
          {
            title: 'City and micro-market',
            description: 'Recommendation based on talent, commute, peers and cost.',
          },
          {
            title: 'Space planning',
            description: 'Size and phasing of space against the hiring plan.',
          },
          {
            title: 'Building shortlist',
            description: 'Buildings from Savvy Group and other developers, with site visits.',
          },
          {
            title: 'Agreements',
            description: 'Lease or services agreement review and negotiation.',
          },
          {
            title: 'Design and fit-out',
            description: 'Layout, interiors, furniture, meeting rooms and commissioning.',
          },
          {
            title: 'Move-in',
            description: 'Snagging, access control, signage and facilities ready on day one.',
          },
        ]}
      />

      <TileSection
        eyebrow="Ongoing services"
        columns={4}
        items={[
          {
            title: 'Facilities management',
            description: 'Housekeeping, security, maintenance and front desk.',
          },
          {
            title: 'Vendor management',
            description: 'All facility vendors managed under one contract.',
          },
          {
            title: 'Space changes',
            description: 'Adding seats, reconfiguring floors and planning expansion.',
          },
          {
            title: 'Lease administration',
            description: 'Renewals, rent reviews and compliance with lease terms.',
          },
        ]}
      />

      <TileSection
        id="workspace-route"
        eyebrow="Workspace route"
        headline="How your office comes together, step by step."
        columns={3}
        items={[
          { title: '1. City', description: 'Chosen with the Location Finder and site visits.' },
          {
            title: '2. Micro-market',
            description: 'The right area in the city for talent, peers and commute.',
          },
          {
            title: '3. Managed seats',
            description:
              'Your first team works from a DevX centre while the long-term office is prepared.',
          },
          {
            title: '4. Space plan',
            description: 'Size and timing of the permanent office based on the hiring plan.',
          },
          {
            title: '5. Building',
            description: 'Shortlist from Savvy Group and other developers; site visits.',
          },
          {
            title: '6. Agreements',
            description: 'Lease or services agreement, and how the fit-out is funded.',
          },
          {
            title: '7. Design',
            description: 'Layout and interiors agreed with your team and brand guidelines.',
          },
          {
            title: '8. Procure and build',
            description: 'Fit-out delivered by Savvy Group with our project management.',
          },
          {
            title: '9. Facilities',
            description: 'Day-to-day facilities management once you move in.',
          },
        ]}
      />

      <section className="sx-container py-4 text-[14px] text-sx-muted">
        <span className="font-bold text-sx-ink">Partner firms: </span>
        DevX: managed workspace (3M+ sq. ft. managed, 25k+ professionals, 350+ companies). Savvy
        Group: construction and development (60M+ sq. ft. under development, 30+ years, 5,000+
        customers).
      </section>

      <InNumbers
        stats={[
          { figure: '4', label: 'Workspace options', line: 'Managed seats to custom build' },
          { figure: '3M+', label: 'Sq. ft. managed', line: 'By DevX' },
          { figure: '60M+', label: 'Sq. ft. under development', line: 'By Savvy Group' },
          { figure: '2', label: 'Locations', line: 'Ahmedabad and GIFT City' },
        ]}
      />

      <LifecycleStrip current="build" />
      <WhereNext page="real-estate" />
      <ClosingCta
        headline="Find the right space for your team."
        line="Tell us your headcount plan and preferred city; we'll send options."
      />
    </>
  );
}
