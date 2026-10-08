import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CostCalculator } from '@/components/calculator/cost-calculator';
import { ClosingCta } from '@/components/closing-cta';

// Section 13 — exact page title for the calculator.
export const metadata: Metadata = pageMetadata({
  title: { absolute: 'GCC Cost Calculator: what your India team would cost | ScaleAX' },
  description:
    'Compare what a team costs at home with what it would cost in India, under each engagement model, including set-up cost and payback.',
  path: '/calculator',
});

// Part D2 — the full interactive Cost Calculator. W8: the reference's
// compact tool page — a plain display H1 straight into the calculator,
// then the closing band.
export default function CalculatorPage() {
  return (
    <>
      <section className="bg-sx-ground">
        <div className="sx-container pb-12 pt-16 sm:pb-16 sm:pt-24">
          <h1 className="sx-enter max-w-[24ch] text-[clamp(2.25rem,4.6vw,4rem)] font-black leading-[1.02] tracking-[-0.035em] text-sx-ink">
            Plan your centre in a minute, not a quarter.
          </h1>
          <p className="sx-enter sx-lead mt-6 max-w-[52ch]" style={{ ['--sx-d' as string]: 1 }}>
            Set the team you want in India. The calculator returns a three-year cost curve, the
            cities that fit your mix, a launch timeline and the workspace you need.
          </p>
        </div>
      </section>
      <section className="bg-sx-ground pb-8">
        <div className="sx-container">
          <CostCalculator variant="full" />
        </div>
      </section>
      <ClosingCta
        headline="Don't just compete. Excel globally."
        line="Tell us the functions you want in India and your timeline. You get a location shortlist, a cost model and a plan within two weeks."
      />
    </>
  );
}
