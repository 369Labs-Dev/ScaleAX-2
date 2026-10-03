import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { pageMetadata } from '@/lib/seo';

// Structured shell — no full legal text exists yet, so each section carries
// a clear placeholder line rather than invented terms.
export const metadata: Metadata = pageMetadata({
  title: 'Terms of use',
  description: 'The terms that govern use of the ScaleAX website.',
  path: '/terms',
});

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: 'Acceptance of terms',
    body: 'By using this website you agree to these terms. Full legal wording will be added here.',
  },
  {
    heading: 'Use of this site',
    body: 'This site and its tools (the Cost Calculator and Location Finder) provide estimates only, based on ScaleAX benchmarks. Details on permitted use will be added here.',
  },
  {
    heading: 'Intellectual property',
    body: 'The content, design and tools on this site belong to ScaleAX Advisory Private Limited unless stated otherwise. Full wording will be added here.',
  },
  {
    heading: 'Limitation of liability',
    body: 'Estimates provided by the tools on this site are not binding quotes. Full limitation-of-liability wording will be added here.',
  },
  {
    heading: 'Governing law',
    body: 'These terms are governed by the laws of India. Full jurisdiction wording will be added here.',
  },
  {
    heading: 'Contact',
    body: 'Questions about these terms can be sent to info@scaleax.com.',
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-[800px] px-4 py-16 sm:py-20">
      <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'Terms' }]} />
      <h1 className="mt-4 text-[28px] font-bold text-sx-ink sm:text-[40px]">Terms of use</h1>
      <p className="mt-4 text-[14px] text-sx-muted">
        This page sets out the structure of our terms of use. The text below is a placeholder
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
