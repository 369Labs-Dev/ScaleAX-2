import Link from 'next/link';
import { LIFECYCLE_STAGES, type CardId } from '@/lib/site-data';
import { Reveal } from './motion/reveal';

// Part 0.3 block 7 / Part C6 "Lifecycle strip" — four pills joined by a
// line: Plan, Build, Run, Grow. Current stage filled navy with white text
// and a small "You are here" label; others outlined and clickable.
// W7: the joining line draws in, pills rise in sequence and lift on hover.
export function LifecycleStrip({ current }: { current?: CardId }) {
  return (
    <section className="sx-container py-20 sm:py-24">
      <div className="relative">
        <Reveal
          variant="draw"
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-sx-ink sm:block"
        />
        <Reveal
          stagger
          className="relative flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          {LIFECYCLE_STAGES.map((stage) => {
            const isCurrent = stage.id === current;
            return (
              <Link
                key={stage.id}
                href={stage.url}
                aria-current={isCurrent ? 'page' : undefined}
                className={`relative z-10 flex flex-col items-center gap-1 rounded-full px-7 py-3 text-[15px] font-bold transition-[translate,box-shadow,background-color,color] duration-300 ease-sx-out hover:-translate-y-0.5 hover:shadow-sx-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink sm:mx-auto ${
                  isCurrent
                    ? 'bg-sx-ink text-white'
                    : 'border border-sx-ink bg-white text-sx-ink hover:bg-sx-ink hover:text-white'
                }`}
              >
                {stage.label}
                {isCurrent && (
                  <span className="text-[11px] font-medium text-white/80">You are here</span>
                )}
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
