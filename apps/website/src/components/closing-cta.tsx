import { Reveal } from './motion/reveal';

// Part 0.3 block 9 / Part C6 "Closing call to action" — H2, one line and a
// button, between "Where next" and the footer. W8: the reference's closing
// band — a rounded deep-green panel inset in the page container, with a
// light pill button.
export function ClosingCta({
  headline,
  line,
  href = '/contact',
  label = 'Book a consultation',
}: {
  headline: string;
  line: string;
  /** Button target — override on pages where /contact would link to itself. */
  href?: string;
  label?: string;
}) {
  return (
    <section className="bg-sx-ground py-20 sm:py-28">
      <div className="sx-container">
        <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-sx-ink px-8 py-16 text-sx-white md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="sx-grid-lines-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_100%_at_100%_100%,#000_10%,transparent_75%)]"
          />
          <h2 className="sx-h2 max-w-[20ch] text-sx-white">{headline}</h2>
          <p className="mt-5 max-w-xl text-[17px] text-white/75 sm:text-[18px]">{line}</p>
          <a href={href} className="sx-btn sx-btn-light mt-9">
            {label}
            <span className="sx-btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
