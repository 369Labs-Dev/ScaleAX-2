import { Reveal } from './motion/reveal';
import { CountUp } from './motion/count-up';

export interface NumberStat {
  figure: string;
  label: string;
  line: string;
}

// Part 0.3 block 6 / Part C6 "In numbers" strip. W8: the reference's stat
// row — four columns between ink hairlines, heavy tabular figures, left
// aligned. Numbers must render final values on load; never show "0".
// W7: figures are server-rendered at their final value, then roll up once
// on first view (from 30% of the target, never 0) when motion is allowed.
export function InNumbers({ stats }: { stats: NumberStat[] }) {
  return (
    <section className="border-y border-sx-border">
      <Reveal
        stagger
        className="sx-container grid grid-cols-1 divide-y divide-sx-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="py-10 lg:px-8 lg:first:pl-0 lg:last:pr-0">
            <div className="text-[44px] font-black leading-none tracking-[-0.035em] text-sx-ink md:text-[56px]">
              <CountUp value={stat.figure} className="sx-figure" />
            </div>
            <div className="mt-3 text-[15px] font-bold text-sx-ink">{stat.label}</div>
            <div className="mt-1 text-[14px] text-sx-muted">{stat.line}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
