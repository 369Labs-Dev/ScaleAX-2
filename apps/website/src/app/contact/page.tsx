import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ClosingCta } from '@/components/closing-cta';
import { ConsultationForm } from '@/components/home/consultation-form';
import { Reveal } from '@/components/motion/reveal';
import { WhereNext } from '@/components/where-next';

// Part B, PAGE B18 — Contact, form-first per the conversion brief: a compact
// hero, then the consultation form as the primary above-the-fold element
// (page variant of the Section 11 form — same fields, validation and
// /api/consultation submit). Everything secondary — direct contact details,
// offices, what happens next — sits below the form.
export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Tell ScaleAX what you want to build in India — book a consultation or reach us directly.',
  path: '/contact',
});

const OFFICES = [
  {
    name: 'Ahmedabad',
    address: 'DevX, Ahmedabad, Gujarat, India',
    mapQuery: 'DevX Ahmedabad Gujarat India',
  },
  {
    name: 'GIFT City',
    address: 'GIFT City, Gandhinagar, Gujarat, India',
    mapQuery: 'GIFT City, Gandhinagar, Gujarat, India',
  },
];

const NEXT_STEPS = [
  {
    step: '1',
    title: 'We reply within one working day',
    body: 'A real person reads your brief — no automated pitch.',
  },
  {
    step: '2',
    title: 'A short call on your goals',
    body: 'Functions, team size and timeline — enough to work with.',
  },
  {
    step: '3',
    title: 'Your plan within two weeks',
    body: 'A location recommendation, a cost model and a set-up plan.',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Compact hero + the form, together above the fold. */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="sx-grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_10%,transparent_75%)]"
        />
        <div className="sx-container pb-14 pt-10 sm:pb-20 sm:pt-14">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <div className="sx-eyebrow">Contact</div>
            <h1 className="sx-h1 mt-3 text-sx-ink">Tell us what you want to build in India.</h1>
            <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.6] text-sx-body sm:text-[17px]">
              Share the functions, team size and timeline, and we&rsquo;ll come back with a plan,
              not a pitch.
            </p>
          </Reveal>

          <div id="form" className="mx-auto mt-8 max-w-[760px] scroll-mt-24 sm:mt-10">
            <ConsultationForm variant="page" />
          </div>
        </div>
      </section>

      {/* Secondary: what happens next. */}
      <section className="border-y border-sx-border bg-sx-bg-light">
        <div className="sx-container py-12 sm:py-16">
          <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {NEXT_STEPS.map((item) => (
              <div key={item.step} className="sx-card p-6">
                <div className="sx-figure text-[22px] font-black text-sx-ink">{item.step}</div>
                <div className="mt-2 text-[16px] font-bold text-sx-ink">{item.title}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-sx-body">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Secondary: direct contact details and offices. */}
      <section className="sx-container py-12 sm:py-16">
        <Reveal>
          <h2 className="text-[22px] font-black tracking-[-0.02em] text-sx-ink">
            Prefer to reach us directly?
          </h2>
        </Reveal>
        <Reveal stagger className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sx-card p-6">
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-sx-muted">
              Email
            </div>
            <a
              href="mailto:info@scaleax.com"
              className="mt-2 inline-block text-[15px] font-bold text-sx-ink hover:underline"
            >
              info@scaleax.com
            </a>
          </div>
          {OFFICES.map((office) => (
            <div key={office.name} className="sx-card p-6">
              <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-sx-muted">
                {office.name}
              </div>
              <p className="mt-2 text-[14px] text-sx-body">{office.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(office.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[14px] font-bold text-sx-ink hover:underline"
              >
                View on map &rarr;
              </a>
            </div>
          ))}
          <div className="sx-card p-6">
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-sx-muted">
              LinkedIn
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[15px] font-bold text-sx-ink hover:underline"
            >
              Follow ScaleAX &rarr;
            </a>
          </div>
        </Reveal>
      </section>

      <WhereNext page="contact" />
      {/* Closing band as on other pages; the button scrolls back to the form
          on this page instead of linking /contact to itself. */}
      <ClosingCta
        headline="Talk to us about your centre."
        line="Start with a short call about what you're planning."
        href="#form"
      />
    </>
  );
}
