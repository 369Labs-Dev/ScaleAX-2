import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { ProcessSteps } from '@/components/process-steps';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B2 — How we work: Plan.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Plan your GCC in India: strategy, location and business case | ScaleAX' },
  description:
    'Decide what your India centre will do, where it should be, how it will run and what it will cost, with a business case your board can approve.',
  path: '/how-we-work/plan',
});

export default function PlanPage() {
  return (
    <>
      <PageHero
        eyebrow="HOW WE WORK · PLAN"
        title="Decide where, how and at what cost before you commit."
        intro="The first stage turns an idea into a plan your board can approve. We work out what the centre will do, where it should be, how it will be run and what it will cost, then map every step to get there."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'How we work' }, { label: 'Plan' }]}
        stage="plan"
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="WHAT WE COVER"
        headline="Six decisions, made with evidence."
        columns={3}
        items={[
          {
            title: 'Mandate and scope',
            description: 'What the centre is for and which functions move first.',
          },
          {
            title: 'Function selection',
            description:
              'Which processes and roles to build in India, and which to leave where they are.',
          },
          {
            title: 'Location',
            description: 'City and micro-market, based on your talent needs and costs.',
          },
          {
            title: 'Operating model and organisation',
            description:
              'Reporting lines, leadership roles, grades and how head office and India work together.',
          },
          {
            title: 'Entity and tax structure',
            description: 'The right legal set-up and its tax impact.',
          },
          {
            title: 'Cost model and business case',
            description: 'Five-year costs, set-up investment and payback.',
          },
        ]}
      />

      <TileSection
        eyebrow="WHAT YOU RECEIVE"
        headline="Documents your board can act on."
        columns={3}
        items={[
          {
            title: 'A written mandate',
            description:
              'Purpose, scope and three-year ambition for the centre, agreed with your leadership.',
          },
          {
            title: 'A phased function plan',
            description: 'Roles and processes in the order they should move, with dependencies.',
          },
          {
            title: 'A location recommendation',
            description:
              'Recommended city, two alternatives and a shortlist of buildings, with the reasons.',
          },
          {
            title: 'An organisation design',
            description:
              'Org chart for years one to three, leadership role profiles and grade structure.',
          },
          {
            title: 'A structure recommendation',
            description:
              'Entity type, tax position, transfer pricing approach and any GIFT City options.',
          },
          {
            title: 'A board-ready business case',
            description: 'Five-year cost model, set-up budget, payback period and key risks.',
          },
        ]}
      />

      <ProcessSteps
        eyebrow="HOW IT RUNS"
        headline="Four weeks from kick-off to business case."
        steps={[
          {
            label: 'Kick-off',
            when: 'Week 1',
            body: 'Goals, constraints and a data request (current costs, roles, timelines).',
          },
          {
            label: 'Workshops',
            when: 'Weeks 1–2',
            body: 'Working sessions with your function heads, finance and HR.',
          },
          {
            label: 'Location visit',
            when: 'Week 3, optional',
            body: 'We host your team in Ahmedabad and GIFT City and arrange visits to other cities if needed.',
          },
          {
            label: 'Model and draft',
            when: 'Week 3',
            body: 'Cost model, organisation design and structure options.',
          },
          {
            label: 'Business case',
            when: 'Week 4',
            body: 'Presented to your leadership, with the plan for the Build stage.',
          },
        ]}
      />

      <InNumbers
        figure="tower"
        stats={[
          { figure: '6', label: 'Planning decisions', line: 'From mandate to cost model' },
          { figure: '4 weeks', label: 'To a business case', line: 'From kick-off' },
          { figure: '5 years', label: 'Cost model', line: 'Set-up, running cost and payback' },
          { figure: '1', label: 'Team', line: 'The same team plans, builds and runs' },
        ]}
      />

      <LifecycleStrip current="plan" />
      <WhereNext page="plan" />
      <ClosingCta
        figure="man-suit"
        headline="Start with a plan."
        line="Share your goals and we'll outline what the Plan stage would cover for you."
      />
    </>
  );
}
