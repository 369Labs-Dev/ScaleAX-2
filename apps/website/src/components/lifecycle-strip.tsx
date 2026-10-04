import Link from 'next/link';
import { HOW_WE_WORK_MENU, LIFECYCLE_STAGES, type CardId } from '@/lib/site-data';

// Lifecycle strip: Plan, Build, Run, Grow as four stops on one road. The
// road is solid up to the current stage and faint after it; the current stop
// is ringed and labelled "You are here". Every stop links to its stage and
// carries the one-line summary used in the navigation.
export function LifecycleStrip({ current }: { current?: CardId }) {
  const currentIndex = LIFECYCLE_STAGES.findIndex((stage) => stage.id === current);
  return (
    <section className="sx-container py-16 md:py-24">
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
        {LIFECYCLE_STAGES.map((stage, i) => {
          const isCurrent = i === currentIndex;
          const travelled = currentIndex >= 0 && i < currentIndex;
          const summary = HOW_WE_WORK_MENU.find((item) => item.url === stage.url)?.summary;
          return (
            <li key={stage.id} className="relative">
              <Link
                href={stage.url}
                aria-current={isCurrent ? 'page' : undefined}
                className="group block pb-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sx-ink lg:pb-0"
              >
                <span aria-hidden="true" className="relative flex h-7 items-center">
                  <span
                    className={`absolute inset-x-0 h-[2px] ${
                      travelled ? 'bg-sx-ink' : 'bg-sx-ink-12'
                    }`}
                  />
                  {!travelled && (
                    <span className="absolute inset-x-0 h-[2px] origin-left scale-x-0 bg-sx-ink transition-transform duration-700 ease-sx-out group-hover:scale-x-100" />
                  )}
                  <span
                    className={`relative rounded-full transition-[background-color,box-shadow] duration-300 ${
                      isCurrent
                        ? 'h-[18px] w-[18px] bg-sx-ink shadow-[0_0_0_5px_var(--sx-ground),0_0_0_6.5px_var(--sx-ink)]'
                        : travelled
                          ? 'h-3 w-3 bg-sx-ink shadow-[0_0_0_5px_var(--sx-ground)]'
                          : 'h-3 w-3 bg-sx-ground shadow-[inset_0_0_0_2px_var(--sx-ink-20),0_0_0_5px_var(--sx-ground)] group-hover:bg-sx-ink group-hover:shadow-[inset_0_0_0_2px_var(--sx-ink),0_0_0_5px_var(--sx-ground)]'
                    }`}
                  />
                </span>
                <span className="sx-figure mt-5 flex h-7 items-center gap-3 text-[12px] font-bold uppercase tracking-[0.14em] text-sx-muted">
                  Stage {String(i + 1).padStart(2, '0')}
                  {isCurrent && (
                    <span className="rounded-sx bg-sx-ink px-2 py-1 text-[11px] tracking-[0.08em] text-sx-white">
                      You are here
                    </span>
                  )}
                </span>
                <span
                  className={`mt-3 flex items-center gap-3 text-[clamp(1.9rem,3.2vw,3rem)] font-black leading-none tracking-[-0.025em] transition-colors duration-300 ${
                    isCurrent ? 'text-sx-ink' : 'text-sx-ink-50 group-hover:text-sx-ink'
                  }`}
                >
                  {stage.label}
                  {!isCurrent && (
                    <span
                      aria-hidden="true"
                      className="sx-go opacity-0 transition-[opacity,transform] duration-300 group-hover:opacity-100"
                    />
                  )}
                </span>
                {summary && (
                  <span className="mt-3 block max-w-[26ch] pr-6 text-[15px] leading-relaxed text-sx-body">
                    {summary}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
