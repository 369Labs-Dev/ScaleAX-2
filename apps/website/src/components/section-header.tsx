// Shared left-column header for inner-page content sections: eyebrow, h2 and
// an optional intro, sticky beside the content on desktop.
export function SectionHeader({
  eyebrow,
  headline,
  intro,
}: {
  eyebrow?: string;
  headline?: string;
  intro?: string;
}) {
  if (!eyebrow && !headline) return null;
  return (
    <div className="lg:col-span-4">
      <div className="lg:sticky lg:top-28">
        {eyebrow && <div className="sx-eyebrow">{eyebrow}</div>}
        {headline && (
          <h2 className="mt-5 text-[clamp(1.875rem,3.2vw,2.75rem)] font-black leading-[1.04] tracking-[-0.02em] text-sx-ink">
            {headline}
          </h2>
        )}
        {intro && <p className="mt-5 text-[16px] leading-relaxed text-sx-body">{intro}</p>}
      </div>
    </div>
  );
}

/** Content column that pairs with SectionHeader (full width when there is no header). */
export function sectionBodyClass(hasHeader: boolean): string {
  return hasHeader ? 'lg:col-span-8' : 'lg:col-span-12';
}
