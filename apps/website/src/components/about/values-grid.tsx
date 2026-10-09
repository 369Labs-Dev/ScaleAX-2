import { ABOUT_VALUES } from '@/lib/about-data';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeader, sectionBodyClass } from '@/components/section-header';

const TINTS = ['bg-sx-tint-blue', 'bg-sx-tint-yellow', 'bg-sx-tint-orange', 'bg-sx-bg-light'];

// About: the four values, all visible at once as tinted cards beside the
// section header (they used to sit in an accordion, one open at a time).
// Each card shares its rows with its neighbour (subgrid), so the titles and
// the text under them start level even when one title wraps.
export function ValuesGrid() {
  return (
    <section id="values" className="sx-container scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
        <SectionHeader eyebrow="How we work" headline="Four things we hold ourselves to." />
        <Reveal stagger className={`grid gap-4 sm:grid-cols-2 ${sectionBodyClass(true)}`}>
          {ABOUT_VALUES.map((value, i) => (
            <article
              key={value.title}
              className={`row-span-3 grid grid-rows-subgrid gap-0 rounded-sx p-7 md:p-8 ${TINTS[i % TINTS.length]}`}
            >
              <div className="sx-figure text-[14px] font-bold text-sx-ink-50">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="pt-10 text-[24px] font-bold leading-[1.05] tracking-[-0.01em] text-sx-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-sx-body">{value.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
