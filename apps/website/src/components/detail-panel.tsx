import { Reveal } from './motion/reveal';

export interface DetailItem {
  name: string;
  description: string;
}

export interface DetailPanel {
  anchor: string;
  heading: string;
  items: DetailItem[];
}

// Part 0.3 block 3 / Part C6 "Detail panels" — two-column list. Item name
// bold navy, description regular, separated by thin #E3E8EC lines.
export function DetailPanels({ panels }: { panels: DetailPanel[] }) {
  return (
    <section className="sx-container py-16 sm:py-[72px]">
      {panels.map((panel) => (
        <div key={panel.anchor} id={panel.anchor} className="scroll-mt-24 py-8">
          <Reveal as="h2" className="sx-h2 text-sx-ink">
            {panel.heading}
          </Reveal>
          <Reveal stagger className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {panel.items.map((item) => (
              <div
                key={item.name}
                className="border-t border-sx-border py-4 first:border-t-0 sm:first:border-t sm:[&:nth-child(-n+2)]:border-t-0"
              >
                <div className="text-[16px] font-bold text-sx-ink">{item.name}</div>
                <div className="mt-1 text-[15px] text-sx-body">{item.description}</div>
              </div>
            ))}
          </Reveal>
        </div>
      ))}
    </section>
  );
}
