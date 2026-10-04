import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { ProcessSteps } from '@/components/process-steps';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B9 — Solutions: Talent.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Hiring for your GCC in India: leadership to full team | ScaleAX' },
  description:
    'Hiring plans, salary benchmarks, leadership search and volume hiring for capability centres in Ahmedabad, GIFT City and across India.',
  path: '/solutions/talent',
});

export default function TalentPage() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · TALENT"
        title="Hire the right people first, then keep hiring well."
        intro="We plan who you need and when, hire your leaders first, and then build the team. As the centre grows, we keep hiring through the model that suits each role."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'Solutions' }, { label: 'Talent' }]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="BUILD YOUR HIRING ENGINE"
        headline="Six things we set up before the first offer."
        columns={3}
        items={[
          {
            title: 'Hiring plan',
            description: 'Roles, grades, timing and budget for the first 12 months.',
          },
          {
            title: 'Role profiles',
            description:
              'Job descriptions and skills for each role, aligned to your group framework.',
          },
          {
            title: 'Salary benchmarks',
            description:
              'Pay ranges for your roles in your chosen city, compared with competitors.',
          },
          {
            title: 'Sourcing channels',
            description: 'Direct sourcing, referrals, campuses and specialist networks.',
          },
          {
            title: 'Recruitment process',
            description: 'Interview stages, assessments, approvals and applicant tracking.',
          },
          {
            title: 'Employer brand',
            description: 'Your India careers page, LinkedIn presence and hiring message.',
          },
        ]}
      />

      <TileSection
        eyebrow="HIRING MODELS"
        headline="Pick the model for each role."
        columns={3}
        items={[
          {
            title: 'Recruitment service (RPO)',
            description: 'We run all hiring for the centre, end to end.',
          },
          { title: 'Permanent hiring', description: 'Fee per hire for individual roles.' },
          {
            title: 'Contract staff',
            description:
              'People on our payroll working for you, with the option to convert after 6–12 months.',
          },
          {
            title: 'Campus hiring',
            description:
              'Graduates from engineering, finance and management campuses, with a training programme.',
          },
          {
            title: 'Leadership search',
            description: 'Retained search for site leaders and function heads.',
          },
        ]}
      />

      <ProcessSteps
        eyebrow="PEOPLE LIFECYCLE"
        steps={[
          { label: 'Attract', body: 'Employer brand, careers page and campaigns.' },
          { label: 'Source and screen', body: 'Direct search, referrals, campuses and partners.' },
          { label: 'Interview and offer', body: 'Structured interviews, assessments and offers.' },
          { label: 'Onboard', body: 'Background checks, documents, induction and IT access.' },
          { label: 'Develop and retain', body: 'Performance cycles, learning and career paths.' },
        ]}
      />

      <section className="sx-container py-4 text-[14px] text-sx-muted">
        <span className="font-bold text-sx-ink">Who delivers it: </span>
        ScaleAX Talent Solutions, led by Devika Nekkanti.
      </section>

      <InNumbers
        figure="man-phone"
        stats={[
          { figure: '6', label: 'Set-up steps', line: 'From hiring plan to employer brand' },
          { figure: '5', label: 'Hiring models', line: 'RPO to leadership search' },
          { figure: '5', label: 'Lifecycle steps', line: 'Attract to retain' },
          { figure: '1', label: 'Hiring plan', line: 'Tied to your headcount plan' },
        ]}
      />

      <LifecycleStrip current="build" />
      <WhereNext page="talent" />
      <ClosingCta
        figure="woman-seated"
        headline="Start with the right first hires."
        line="Tell us the roles you need and we'll share salary ranges and a hiring timeline."
      />
    </>
  );
}
