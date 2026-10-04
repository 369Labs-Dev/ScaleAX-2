import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { AccordionSection } from '@/components/accordion-section';
import { ProcessSteps } from '@/components/process-steps';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B3 — How we work: Build.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'Set up your GCC in India: entity, office, IT and hiring | ScaleAX' },
  description:
    'Entity, office, IT, tax, finance, HR and hiring set up in parallel under one plan, so your centre opens ready to work.',
  path: '/how-we-work/build',
});

export default function BuildPage() {
  return (
    <>
      <PageHero
        eyebrow="HOW WE WORK · BUILD"
        title="From a registered company to a working office."
        intro="In the Build stage we set up everything your centre needs to open: the entity, the office, the IT, the finance and HR processes, and the first team. Eight workstreams run in parallel under one project lead, so nothing waits on a supplier you have never met."
        breadcrumb={[{ label: 'Home', url: '/' }, { label: 'How we work' }, { label: 'Build' }]}
        stage="build"
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="WHAT WE SET UP"
        headline="Eight workstreams, one project lead."
        columns={4}
        items={[
          {
            title: 'Real estate and fit-out',
            description: 'Office found, designed, built and ready for move-in.',
          },
          {
            title: 'IT and security',
            description: "Cabling, network, security and devices, set to your group's standards.",
          },
          {
            title: 'Entity and registrations',
            description:
              'Company incorporated, bank account opened and every registration in place.',
          },
          {
            title: 'Tax set-up',
            description: 'Tax regime chosen, GST and transfer pricing frameworks ready.',
          },
          {
            title: 'Finance set-up',
            description: 'Chart of accounts, ERP, approval rules and month-end calendar.',
          },
          {
            title: 'HR and payroll set-up',
            description: 'HR system, policies, payroll and statutory registrations.',
          },
          {
            title: 'Talent and employer brand',
            description: 'Hiring plan, first leaders, first team and an India careers presence.',
          },
          {
            title: 'Programme management',
            description: 'One plan, one project lead, weekly status and a clear escalation route.',
          },
        ]}
      />

      <AccordionSection
        id="workstream-detail"
        eyebrow="WORKSTREAM DETAIL"
        headline="Each workstream, expanded."
        defaultOpenIndex={0}
        items={[
          {
            title: '01 Real estate and fit-out',
            points: [
              'City and micro-market: chosen against talent, cost and commute.',
              'Start-up space: managed seats at DevX while the permanent office is built.',
              'Building selection: shortlist from Savvy Group and other developers; we are not tied to one landlord.',
              'Agreements: lease or services agreement reviewed by our legal team.',
              'Design and build: layout, fit-out, furniture and commissioning.',
              'Move-in: snag list, access cards, facilities in place.',
            ],
          },
          {
            title: '02 IT and security',
            points: [
              'Passive IT: structured cabling, server room, CCTV, access control, meeting-room AV.',
              'Network: switching, Wi-Fi, firewall, two internet links.',
              'Security: endpoint protection, identity and access management, ISO 27001 readiness.',
              'End-user: laptops, collaboration tools and accounts, linked to your group identity system.',
              'Cloud and backup: connection to your cloud tenancy, backup and disaster recovery.',
            ],
          },
          {
            title: '03 Entity and registrations',
            points: [
              'Structure: private limited company, LLP, branch or GIFT City IFSC unit.',
              'Foreign investment: FDI route, FEMA reporting and share capital.',
              'Incorporation: name approval, MoA and AoA, directors including the resident director.',
              'Bank account: opening and KYC with your chosen bank.',
              'Registrations: PAN, TAN, GST, LUT for exports, Shops and Establishments, professional tax.',
              'Company secretarial: registers, first board meeting, digital signatures.',
            ],
          },
          {
            title: '04 Tax set-up',
            points: [
              'Corporate tax: choice of tax regime and advance tax plan.',
              'GST: registration, export-of-services treatment, input credit tracking.',
              'Transfer pricing: intercompany agreement, pricing policy and benchmarking.',
              'Permanent establishment: review of risks for secondees and head-office staff.',
              'Withholding tax: framework for vendor and cross-border payments.',
            ],
          },
          {
            title: '05 Finance set-up',
            points: [
              'Chart of accounts mapped to your group reporting.',
              'ERP or accounting system set up, or connected to your group ERP.',
              'Purchase-to-pay and invoicing processes, with approval limits.',
              'Treasury: bank mandates, payment controls and cash reporting.',
              'Month-end calendar and reporting pack in your group format.',
            ],
          },
          {
            title: '06 HR and payroll set-up',
            points: [
              'HR system: employee records, leave, attendance and org structure.',
              'Policies and handbook: leave, travel, code of conduct, POSH, performance.',
              'Onboarding: offer letters, background checks, induction and IT access.',
              'Payroll: salary structures, PF, ESI, professional tax and labour welfare fund registrations.',
              'Labour compliance: registers and filings under the labour codes and state laws.',
            ],
          },
          {
            title: '07 Talent and employer brand',
            points: [
              'Hiring plan: roles, grades, timing and budget for the first 12 months.',
              'Salary benchmarks for your roles in your chosen city.',
              'Leadership hiring first: site leader, finance, HR and function heads.',
              'Recruitment process: interview stages, assessments and offer approval.',
              'Employer brand: India careers page, LinkedIn presence and hiring campaigns under your name.',
            ],
          },
          {
            title: '08 Programme management',
            points: [
              'One integrated plan across all eight workstreams.',
              'One named project lead as your single point of contact.',
              'Weekly status report and a fortnightly steering call.',
              'Risk and issue log, with escalation to a ScaleAX founder.',
              'Go-live readiness check before the first team starts.',
            ],
          },
        ]}
      />

      <TileSection
        id="workspace-route"
        eyebrow="WORKSPACE ROUTE"
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

      <ProcessSteps
        eyebrow="HOW IT RUNS"
        headline="Five phases to go-live."
        steps={[
          { label: 'Confirm', body: 'Scope, timeline and legal requirements confirmed.' },
          { label: 'Plan', body: 'Detailed plan for each workstream, with owners and dates.' },
          { label: 'Set up', body: 'Entity, systems, processes, office and hiring delivered.' },
          { label: 'Go live', body: 'First team starts in a working office with working systems.' },
          { label: 'Settle', body: 'First 60 days checked, then handed to the Run stage.' },
        ]}
      />

      <InNumbers
        figure="towers"
        stats={[
          { figure: '8', label: 'Workstreams', line: 'From real estate to programme management' },
          {
            figure: '12–16 weeks',
            label: 'To first hires in the office',
            line: 'Depends on entity and volume',
          },
          { figure: '1', label: 'Project lead', line: 'Your single point of contact' },
          { figure: '1', label: 'Contract', line: 'For every workstream' },
        ]}
      />

      <LifecycleStrip current="build" />
      <WhereNext page="build" />
      <ClosingCta
        figure="man-blazer"
        headline="Ready to set up in India?"
        line="Tell us your timeline and first roles, and we'll map out the Build stage."
      />
    </>
  );
}
