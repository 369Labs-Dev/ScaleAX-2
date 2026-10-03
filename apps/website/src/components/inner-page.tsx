import type { Crumb } from './breadcrumb';
import { PageHero } from './page-hero';
import { OverviewTiles, type OverviewTile } from './overview-tiles';
import { DetailPanels, type DetailPanel } from './detail-panel';
import { InNumbers, type NumberStat } from './in-numbers';
import { LifecycleStrip } from './lifecycle-strip';
import { WhereNext } from './where-next';
import { ClosingCta } from './closing-cta';
import type { CardId } from '@/lib/site-data';

// Assembles the Part 0.3 inner-page template (blocks 1-9; header/footer are
// applied in the root layout as block 10). Every lifecycle/solution page
// composes this so the structure stays consistent per the brief.
export interface InnerPageProps {
  whereNextKey: string;
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumb: Crumb[];
  overviewTiles?: OverviewTile[];
  detailPanels?: DetailPanel[];
  numbers?: NumberStat[];
  lifecycleStage?: CardId;
  ctaHeadline: string;
  ctaLine: string;
  children?: React.ReactNode;
}

export function InnerPage({
  whereNextKey,
  eyebrow,
  title,
  intro,
  breadcrumb,
  overviewTiles,
  detailPanels,
  numbers,
  lifecycleStage,
  ctaHeadline,
  ctaLine,
  children,
}: InnerPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} breadcrumb={breadcrumb} />
      {overviewTiles && <OverviewTiles tiles={overviewTiles} />}
      {detailPanels && <DetailPanels panels={detailPanels} />}
      {children}
      {numbers && <InNumbers stats={numbers} />}
      <LifecycleStrip current={lifecycleStage} />
      <WhereNext page={whereNextKey} />
      <ClosingCta headline={ctaHeadline} line={ctaLine} />
    </>
  );
}
