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

// Engagement models compared side by side. A plain responsive table
// (scrolls horizontally on small screens), ruled rather than boxed.
export function ComparisonTable({
  eyebrow,
  headline,
  columns,
  rows,
  note,
  id,
}: ComparisonTableProps) {
  return (
    <section id={id} className="sx-container scroll-mt-24 py-16 md:py-24">
      {(eyebrow || headline) && (
        <div className="max-w-[820px]">
          {eyebrow && <div className="sx-eyebrow">{eyebrow}</div>}
          {headline && (
            <h2 className="mt-5 text-[clamp(1.875rem,3.2vw,2.75rem)] font-bold leading-[1.04] tracking-[-0.01em] text-sx-ink">
              {headline}
            </h2>
          )}
        </div>
      )}

      <div className="mt-10 overflow-x-auto" data-lenis-prevent-horizontal="">
        <table className="w-full min-w-[640px] border-collapse text-left text-[16px]">
          <thead>
            <tr className="border-y-2 border-sx-ink">
              <th scope="col" className="py-4 pr-4 font-bold text-sx-ink">
                &nbsp;
              </th>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-4 py-4 text-[14px] font-bold text-sx-ink">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-sx-border transition-colors duration-200 hover:bg-sx-tint-yellow"
              >
                <th scope="row" className="py-4 pr-4 font-bold text-sx-ink">
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
      </div>
      {note && <p className="mt-4 text-[14px] text-sx-muted">{note}</p>}
    </section>
  );
}
