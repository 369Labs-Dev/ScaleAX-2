import { Reveal } from './motion/reveal';

export interface ComparisonRow {
  label: string;
  values: string[];
}

export interface ComparisonTableProps {
  eyebrow?: string;
  headline?: string;
  columns: string[];
  rows: ComparisonRow[];
  note?: string;
  id?: string;
}

// Part B13 "Comparison table" — engagement models compared side by side.
// A plain responsive table (scrolls horizontally on small screens) rather
// than a bespoke widget, since the brief just calls for a comparison grid.
export function ComparisonTable({
  eyebrow,
  headline,
  columns,
  rows,
  note,
  id,
}: ComparisonTableProps) {
  return (
    <section id={id} className="sx-container scroll-mt-24 py-12 sm:py-16">
      {(eyebrow || headline) && (
        <Reveal className="max-w-[720px]">
          {eyebrow && <div className="sx-eyebrow">{eyebrow}</div>}
          {headline && (
            <h2 className="mt-3 text-[28px] font-black leading-[1.06] tracking-[-0.03em] text-sx-ink sm:text-[40px]">
              {headline}
            </h2>
          )}
        </Reveal>
      )}

      <Reveal className="mt-8 overflow-x-auto rounded-[16px] border border-sx-border">
        <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-sx-border bg-sx-bg-light">
              <th scope="col" className="p-4 font-bold text-sx-ink">
                &nbsp;
              </th>
              {columns.map((col) => (
                <th key={col} scope="col" className="p-4 font-bold text-sx-ink">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-sx-border transition-colors duration-200 last:border-b-0 hover:bg-sx-bg-light/70"
              >
                <th scope="row" className="p-4 font-bold text-sx-ink">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={columns[i]} className="p-4 text-sx-body">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      {note && <p className="mt-3 text-[13px] text-sx-muted">{note}</p>}
    </section>
  );
}
