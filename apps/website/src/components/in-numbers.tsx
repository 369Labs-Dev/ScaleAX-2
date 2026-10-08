import { findImage } from '@/lib/images';
import { Cutout } from './cutout';
import { Reveal } from './motion/reveal';
import { CountUp } from './motion/count-up';

export interface NumberStat {
  figure: string;
  label: string;
  line: string;
}

const BARS = ['bg-sx-ink', 'bg-sx-blue', 'bg-sx-yellow', 'bg-sx-ink-20'];

// "In numbers" strip: heavy tabular figures between hairlines. Figures are
// server-rendered at their final value (never "0"), then roll up once on
// first view when motion is allowed. Each stat shares its four rows (bar,
// figure, label, line) with its neighbours through subgrid, so the labels
// line up across the row even when one figure wraps to a second line.
//
// With `figure`, the strip becomes a soft tinted band: one large cutout
// (public/images/cutout-<name>) stands on its bottom edge at the left and
// rises well above it into the section before, and the four figures sit in a
// two-by-two block beside it.
export function InNumbers({ stats, figure }: { stats: NumberStat[]; figure?: string }) {
  const hasFigure = Boolean(figure && findImage(`cutout-${figure}`));

  if (!hasFigure) {
    return (
      <section className="border-y border-sx-border">
        <Reveal
          stagger
          className="sx-container grid grid-cols-1 divide-y divide-sx-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="row-span-4 grid grid-rows-subgrid content-start gap-0 py-12 sm:pr-8 md:py-16"
            >
              <Stat stat={stat} index={i} />
            </div>
          ))}
        </Reveal>
      </section>
    );
  }

  return (
    <section className="relative bg-sx-tint-blue lg:mt-44">
      <div
        aria-hidden="true"
        className="sx-container pointer-events-none absolute inset-x-0 bottom-0 top-[-10rem] hidden lg:block"
      >
        <Cutout
          name={figure ?? ''}
          className="absolute bottom-0 left-5 h-full max-w-[32%] object-left-bottom md:left-10 xl:left-14"
        />
      </div>
      <div className="sx-container relative grid lg:grid-cols-12">
        <Reveal
          stagger
          className="grid grid-cols-1 gap-x-14 sm:grid-cols-2 lg:col-span-7 lg:col-start-6"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-sx-ink-12 py-10 md:py-12 ${i > 0 ? 'border-t' : ''} ${
                i === 1 ? 'sm:border-t-0' : ''
              }`}
            >
              <Stat stat={stat} index={i} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ stat, index }: { stat: NumberStat; index: number }) {
  return (
    <>
      <span aria-hidden="true" className={`mb-7 block h-1.5 w-12 ${BARS[index % BARS.length]}`} />
      <div className="text-[40px] font-black leading-[1.05] tracking-[-0.035em] text-sx-ink">
        <CountUp value={stat.figure} className="sx-figure" />
      </div>
      <div className="mt-4 text-[16px] font-bold text-sx-ink">{stat.label}</div>
      <div className="mt-1 text-[14px] text-sx-muted">{stat.line}</div>
    </>
  );
}
