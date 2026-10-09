import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { ProcessSteps } from '@/components/process-steps';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B5 — How we work: Grow.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Grow or take over your GCC in India | ScaleAX' },
  description:
    'Add teams and functions, move to your own entity, or take over your centre through a planned Build-Operate-Transfer handover.',
  path: '/how-we-work/grow',
});

export default function GrowPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work · Grow"
        title="Scale up, or take it over. Your choice, on your timeline."
        intro="As the centre grows, you decide how much to own. We help you add teams and functions, move from our entity to yours, or take over the whole centre through a planned handover. We also review how the centre is performing and where it can take on more."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'How we work' }, { label: 'Grow' }]}
        stage="grow"
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="Your options"
        headline="Three ways to take the next step."
        columns={3}
        items={[
          {
            title: 'Scale up',
            description:
              'Add seats, new functions or a second site, using the same processes and contracts.',
          },
          {
            title: 'Take ownership',
            description:
              'Move your team from managed seats to your own entity, or complete a Build-Operate-Transfer handover.',
          },
          {
            title: 'Improve',
            description:
              'Maturity, cost and automation reviews that show where the centre can take on more responsibility.',
          },
        ]}
      />

      <ProcessSteps
        eyebrow="Build-Operate-Transfer"
        headline="How a handover works."
        steps={[
          {
            label: 'Terms agreed',
            when: 'At contract',
            body: 'Transfer trigger, price formula and conditions written into the contract.',
          },
          {
            label: 'Readiness review',
            when: '6 months before',
            body: 'People, contracts, assets, systems and documents checked for transfer.',
          },
          {
            label: 'Transfer structure',
            when: '4 months before',
            body: 'Share transfer or business transfer, with tax and legal approvals.',
          },
          {
            label: 'People',
            when: '2 months before',
            body: 'Employment moves to your entity with continuity of service and benefits.',
          },
          {
            label: 'Contracts and assets',
            when: 'At transfer',
            body: 'Leases, vendor contracts, licences and equipment moved to you.',
          },
          {
            label: 'After transfer',
            when: '90 days after',
            body: 'We stay on to support, and can continue selected services.',
          },
        ]}
      />

      <TileSection
        eyebrow="Maturity"
        headline="Where your centre stands, and what comes next."
        columns={4}
        items={[
          { title: '01 Delivering', description: 'Runs defined processes to agreed standards.' },
          {
            title: '02 Owning processes',
            description: 'Takes full ownership of processes and improves them.',
          },
          {
            title: '03 Owning outcomes',
            description: 'Accountable for business results, not just tasks.',
          },
          {
            title: '04 Leading globally',
            description: 'Leads work for the whole group and develops new capabilities.',
          },
        ]}
      />

      <TileSection
        eyebrow="Reviews we offer"
        columns={3}
        items={[
          {
            title: 'Maturity review',
            description:
              'Where the centre stands today against the four stages, and the steps to the next.',
          },
          {
            title: 'Cost review',
            description: 'Costs benchmarked against similar centres, with specific savings.',
          },
          {
            title: 'Automation review',
            description: 'Processes that can be automated, with the effect on roles and skills.',
          },
        ]}
      />

      <InNumbers
        stats={[
          { figure: '3', label: 'Ways to grow', line: 'Scale, own, improve' },
          { figure: '6', label: 'Handover steps', line: 'Planned from day one' },
          { figure: '4', label: 'Maturity stages', line: 'From delivering to leading' },
          { figure: '90 days', label: 'Support after transfer', line: 'Longer if you need it' },
        ]}
      />

      <LifecycleStrip current="grow" />
      <WhereNext page="grow" />
      <ClosingCta
        headline="Plan your next step."
        line="Whether you want to grow the centre or take it over, we'll map the route."
      />
    </>
  );
}
