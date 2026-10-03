import { Reveal } from './motion/reveal';

export interface OverviewTile {
  title: string;
  anchor: string;
}

// Part 0.3 block 2 / Part C6 "Overview tiles" — grid of numbered tiles (3 or
// 4 across). Number in orange 14px bold, title in navy 20px. Clicking a tile
// scrolls to its detail panel.
export function OverviewTiles({ tiles }: { tiles: OverviewTile[] }) {
  return (
    <section className="sx-container py-16 sm:py-[72px]">
      <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <a
            key={tile.anchor}
            href={`#${tile.anchor}`}
            className="sx-card-hover group flex flex-col rounded-[16px] border border-sx-border bg-white p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink"
          >
            <div className="flex items-center justify-between">
              <span className="sx-figure text-[14px] font-bold text-sx-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                aria-hidden="true"
                className="text-sx-ink/40 transition-[translate,color] duration-300 ease-sx-out group-hover:translate-y-0.5 group-hover:text-sx-ink"
              >
                &darr;
              </span>
            </div>
            <div className="mt-2 text-[20px] font-bold text-sx-ink">{tile.title}</div>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
