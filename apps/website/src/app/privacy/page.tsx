import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { pageMetadata } from '@/lib/seo';

// Structured shell — no full legal text exists yet, so each section carries
// a clear placeholder line rather than invented policy commitments.
export const metadata: Metadata = pageMetadata({
  title: 'Privacy policy',
  description:
    'How ScaleAX collects, uses and protects the information visitors and clients share with us.',
  path: '/privacy',
});

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: 'Who we are',
    body: 'ScaleAX Advisory Private Limited ("ScaleAX", "we", "us") operates this website. Full identifying and registration details will be added here.',
  },
  {
    heading: 'Information we collect',
    body: 'When you use the Cost Calculator, Location Finder or the consultation form, we collect the details you submit (such as your name, company, work email and what you tell us about your plans). Full detail on any analytics or cookies in use will be added here.',
  },
  {
    heading: 'How we use it',
    body: 'We use the information you give us to reply to your enquiry and, where you ask us to, to prepare estimates or recommendations. We do not sell your data.',
  },
  {
    heading: 'How we store and protect it',
    body: 'Details of our data retention periods and security practices will be added here.',
  },
  {
    heading: 'Your rights',
    body: 'Details of how to access, correct or ask us to delete your data will be added here.',
  },
  {
    heading: 'Contact',
    body: 'Questions about this policy can be sent to info@scaleax.com.',
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-[800px] px-4 py-16 sm:py-20">
      <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'Privacy policy' }]} />
      <h1 className="mt-4 text-[28px] font-bold text-sx-ink sm:text-[40px]">Privacy policy</h1>
      <p className="mt-4 text-[14px] text-sx-muted">
        This page sets out the structure of our privacy policy. The text below is a placeholder
        outline, not the final legal wording &mdash; that will be reviewed by counsel before launch.
      </p>

      <div className="mt-8 space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="text-[18px] font-bold text-sx-ink">{section.heading}</h2>
            <p className="mt-2 text-[15px] leading-[24px] text-sx-body">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
