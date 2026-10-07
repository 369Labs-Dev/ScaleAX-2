import { findImage } from '@/lib/images';
import { BOOKING_URL } from '@/lib/site-data';
import { Cutout } from './cutout';

// Closing call to action: a full-width soft-tinted band with the headline, one
// line and a button, between "Where next" and the footer. With `figure`, a
// cutout (public/images/cutout-<name>) stands on the bottom edge of the band
// at the right and rises above it into the section before.
export function ClosingCta({
  headline,
  line,
  href,
  label = 'Book a consultation',
  figure,
}: {
  headline: string;
  line: string;
  /** Button target. Defaults to the booking page for "Book a consultation", else /contact. */
  href?: string;
  label?: string;
  /** Name of a cutout in public/images, without the `cutout-` prefix. */
  figure?: string;
}) {
  const figureSrc = figure ? findImage(`cutout-${figure}`) : null;
  const booking = !href && label === 'Book a consultation';
  const target = href ?? (booking ? BOOKING_URL : '/contact');
  return (
    <section className={`relative bg-sx-tint-orange text-sx-ink ${figureSrc ? 'lg:mt-28' : ''}`}>
      {figureSrc && (
        <div
          aria-hidden="true"
          className="sx-container pointer-events-none absolute inset-x-0 bottom-0 top-[-7rem] hidden lg:block"
        >
          <Cutout
            name={figure ?? ''}
            className="absolute bottom-0 right-5 h-full max-w-[32%] md:right-10 xl:right-14"
          />
        </div>
      )}
      <div
        className={`sx-container relative grid gap-x-14 gap-y-8 py-20 md:py-28 lg:grid-cols-12 ${
          figureSrc ? '' : 'lg:items-end'
        }`}
      >
        <h2
          className={`text-[clamp(2.3rem,5vw,4.6rem)] font-black leading-[0.98] tracking-[-0.025em] text-sx-ink lg:col-span-8 ${
            figureSrc ? 'lg:text-[clamp(2.3rem,4.2vw,3.9rem)]' : ''
          }`}
        >
          {headline}
        </h2>
        <div className={figureSrc ? 'lg:col-span-6 lg:row-start-2' : 'lg:col-span-4'}>
          <p className="text-[18px] leading-relaxed text-sx-ink">{line}</p>
          <a
            href={target}
            {...(booking ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="sx-btn sx-btn-primary mt-7"
          >
            {label}
            <span className="sx-btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
