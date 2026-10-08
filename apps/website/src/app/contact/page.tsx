import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ClosingCta } from '@/components/closing-cta';
import { ConsultationForm } from '@/components/home/consultation-form';
import { Reveal } from '@/components/motion/reveal';
import { WhereNext } from '@/components/where-next';
import { LOCATIONS } from '@/lib/site-data';

// Part B, PAGE B18 — Contact, form-first per the conversion brief: a compact
// hero, then the consultation form as the primary above-the-fold element
// (page variant of the Section 11 form — same fields, validation and
// /api/consultation submit). Everything secondary — direct contact details,
// offices, what happens next — sits below the form.
export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Tell ScaleAX what you want to build in India: book a consultation or reach us directly.',
  path: '/contact',
});

const NEXT_STEPS = [
  {
    step: '1',
    title: 'We reply within one working day',
    body: 'A real person reads your brief, not an automated pitch.',
  },
  {
    step: '2',
    title: 'A short call on your goals',
    body: 'Functions, team size and timeline, enough to work with.',
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
            <div className="sx-eyebrow justify-center">Contact</div>
            <h1 className="sx-h1 mt-3 text-sx-ink">Tell us what you want to build in India.</h1>
            <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.6] text-sx-body sm:text-[18px]">
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
                <div className="sx-figure text-[20px] font-black text-sx-ink">{item.step}</div>
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
          <h2 className="text-[20px] font-black tracking-[-0.02em] text-sx-ink">
            Prefer to reach us directly?
          </h2>
        </Reveal>
        <Reveal stagger className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:max-w-3xl">
          <div className="sx-card p-6">
            <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-sx-muted">
              Email
            </div>
            <a
              href="mailto:admin@scaleax.com"
              className="mt-2 inline-block text-[16px] font-bold text-sx-ink hover:underline"
            >
              admin@scaleax.com
            </a>
          </div>
          <div className="sx-card p-6">
            <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-sx-muted">
              LinkedIn
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[16px] font-bold text-sx-ink hover:underline"
            >
              Follow ScaleAX <span aria-hidden="true" className="sx-btn-arrow" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Offices by city. */}
      <section className="border-t border-sx-border">
        <div className="sx-container py-12 sm:py-16">
          <Reveal>
            <h2 className="text-[20px] font-black tracking-[-0.02em] text-sx-ink">Our locations</h2>
          </Reveal>
          <Reveal stagger className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((group) => (
              <div key={group.city} className="border-t border-sx-ink pt-5">
                <h3 className="text-[18px] font-black tracking-[-0.015em] text-sx-ink">
                  {group.city}
                </h3>
                <ul className="mt-4 space-y-5">
                  {group.offices.map((office) => (
                    <li key={office.name}>
                      <div className="text-[16px] font-bold text-sx-ink">{office.name}</div>
                      {office.address && (
                        <p className="mt-1 text-[14px] leading-relaxed text-sx-body">
                          {office.address}
                        </p>
                      )}
                      {office.map && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.map)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-[14px] font-bold text-sx-ink hover:underline"
                        >
                          View on map <span aria-hidden="true" className="sx-btn-arrow" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
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
