import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/page-hero';
import { TileSection } from '@/components/tile-section';
import { InNumbers } from '@/components/in-numbers';
import { LifecycleStrip } from '@/components/lifecycle-strip';
import { WhereNext } from '@/components/where-next';
import { ClosingCta } from '@/components/closing-cta';

// Part B, PAGE B8 — Solutions: IT and security.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'IT infrastructure and security for your GCC in India | ScaleAX' },
  description:
    'Network, devices, security and support set up to your group’s standards, then run day to day.',
  path: '/solutions/it-security',
});

export default function ItSecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS · IT AND SECURITY"
        title="IT that meets your group's standards from the first day."
        intro="We set up the network, devices and security your centre needs, connected to your group's systems and policies, and then run IT support and security monitoring once you are live."
        breadcrumb={[
          { label: 'Home', url: '/' },
          { label: 'Solutions' },
          { label: 'IT and security' },
        ]}
        actions={[
          { label: 'Book a consultation', href: '/contact' },
          { label: 'Estimate your costs', href: '/calculator', variant: 'ghost' },
        ]}
      />

      <TileSection
        eyebrow="SET-UP"
        headline="Five areas ready before move-in."
        columns={3}
        items={[
          {
            title: 'Passive infrastructure',
            description:
              'Structured cabling, server room, CCTV, access control and meeting-room AV.',
          },
          {
            title: 'Network',
            description: 'Switching, Wi-Fi, firewall and two independent internet links.',
          },
          {
            title: 'Security',
            description:
              'Endpoint protection, identity and access management, and ISO 27001 readiness.',
          },
          {
            title: 'End-user computing',
            description: 'Laptops, peripherals, collaboration tools and account set-up.',
          },
          {
            title: 'Cloud and continuity',
            description:
              'Connection to your cloud and identity systems, backup and disaster recovery.',
          },
        ]}
      />

      <TileSection
        eyebrow="ONGOING SERVICES"
        columns={3}
        items={[
          {
            title: 'IT helpdesk',
            description: 'Support for users, devices and accounts, with agreed response times.',
          },
          {
            title: 'Network operations',
            description: 'Monitoring and management of the office network and internet links.',
          },
          {
            title: 'Security monitoring',
            description: 'Monitoring, incident response, patching and vulnerability management.',
          },
          {
            title: 'Compliance support',
            description: 'Evidence and controls for ISO 27001 and SOC 2 audits.',
          },
          {
            title: 'Backup and recovery',
            description: 'Regular backup checks and disaster recovery tests.',
          },
          {
            title: 'Licences and assets',
            description: 'Software licences and hardware tracked and renewed.',
          },
        ]}
      />

      <InNumbers
        stats={[
          { figure: '5', label: 'Set-up areas', line: 'Cabling to cloud' },
          { figure: '6', label: 'Ongoing services', line: 'Helpdesk to licences' },
          { figure: 'ISO 27001', label: 'Security standard', line: 'Aligned controls' },
          { figure: 'Day one', label: 'IT ready', line: 'Before the first team arrives' },
        ]}
      />

      <LifecycleStrip current="build" />
      <WhereNext page="it-security" />
      <ClosingCta
        headline="Get your IT right from the start."
        line="Share your group IT standards and we'll show how we'd meet them."
      />
    </>
  );
}
