import { ABOUT_VALUES } from '@/lib/about-data';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeader, sectionBodyClass } from '@/components/section-header';

const TINTS = ['bg-sx-tint-blue', 'bg-sx-tint-yellow', 'bg-sx-tint-orange', 'bg-sx-bg-light'];

// About: the four values, all visible at once as tinted cards beside the
// section header (they used to sit in an accordion, one open at a time).
export function ValuesGrid() {
  return (
    <section id="values" className="sx-container scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
        <SectionHeader eyebrow="HOW WE WORK" headline="Four things we hold ourselves to." />
        <Reveal stagger className={`grid gap-4 sm:grid-cols-2 ${sectionBodyClass(true)}`}>
          {ABOUT_VALUES.map((value, i) => (
            <article
              key={value.title}
              className={`flex min-h-[230px] flex-col rounded-sx p-7 md:p-8 ${TINTS[i % TINTS.length]}`}
            >
              <div className="sx-figure text-[13px] font-bold text-sx-ink-50">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-auto pt-10 text-[24px] font-black leading-[1.05] tracking-[-0.02em] text-sx-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sx-body">{value.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
