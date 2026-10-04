import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B10 — Solutions: HR and payroll.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'HR and payroll for your GCC in India | ScaleAX' },
  description:
    'HR systems, policies, payroll and labour compliance set up from day one and run every month.',
  path: '/solutions/hr-payroll',
});

export default function HrPayrollPage() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · HR AND PAYROLL"
        title="People operations that run on time, every month."
        intro="We set up your HR system, policies and payroll before the first person joins, then run payroll, statutory filings and HR support every month."
        breadcrumb={[
          { label: 'Home', url: '/' },
          { label: 'Solutions' },
          { label: 'HR and payroll' },
        ]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="SET-UP"
        headline="Your HR foundation."
        columns={3}
        items={[
          {
            title: 'HR system',
            description:
              'Selection and set-up: employee records, leave, attendance and org structure.',
          },
          {
            title: 'Policies and handbook',
            description:
              'Leave, travel, code of conduct, POSH and performance, in one employee handbook.',
          },
          {
            title: 'Onboarding',
            description: 'Offers, background checks, documents, induction and IT access.',
          },
          {
            title: 'Payroll',
            description:
              'Salary structures, PF, ESI, professional tax and labour welfare fund registrations.',
          },
          {
            title: 'Labour compliance',
            description: 'Registers and filings under the labour codes and state laws.',
          },
          {
            title: 'Grades and bands',
            description: 'Grade structure and job families aligned to your group.',
          },
        ]}
      />

      <TileSection
        eyebrow="ONGOING SERVICES"
        columns={3}
        items={[
          {
            title: 'Monthly payroll',
            description: 'Salaries, deductions, payslips and tax on time.',
          },
          {
            title: 'Statutory filings',
            description: 'PF, ESI, professional tax, labour welfare fund and annual returns.',
          },
          { title: 'HR helpdesk', description: 'Employee questions, letters and records.' },
          { title: 'Expenses', description: 'Claims processed and paid against your policy.' },
          {
            title: 'Performance cycles',
            description: 'Admin support for reviews, ratings and increments.',
          },
          {
            title: 'Joiners and leavers',
            description: 'Onboarding, exits and full-and-final settlements.',
          },
        ]}
      />

      <InNumbers
        figure="woman-walking"
        stats={[
          { figure: '6', label: 'Set-up steps', line: 'System to grades' },
          { figure: '6', label: 'Monthly services', line: 'Payroll to exits' },
          { figure: '100%', label: 'Statutory filings on time', line: 'Target' },
          { figure: 'Day one', label: 'Payroll ready', line: 'Before the first salary is due' },
        ]}
      />

      <LifecycleStrip current="run" />
      <WhereNext page="hr-payroll" />
      <ClosingCta
        figure="man-blazer"
        headline="Get HR and payroll right from the first salary."
        line="Tell us your headcount and locations and we'll propose a set-up plan."
      />
    </>
  );
}
