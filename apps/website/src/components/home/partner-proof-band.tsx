import Image from 'next/image';
import { Marquee } from '@/components/motion/marquee';

// W7/W8 — auto-scrolling strip under the hero, per the reference's logo
// marquee. Logo files were supplied by ScaleAX (public/logos/*); per the
// Website Brief, permission to display each enterprise's logo is ScaleAX's
// to confirm before launch. Pausable, reduced-motion-aware.
const CLIENT_LOGOS = [
  { name: 'Bank of America', src: '/partners/bank-of-america.png' },
  { name: 'Yes Bank', src: '/partners/yes-bank.png' },
  { name: 'Groww', src: '/partners/groww.png' },
  { name: 'Suzuki', src: '/partners/suzuki.png' },
  { name: 'ITC Limited', src: '/partners/itc-limited.png' },
  { name: 'ICICI Prudential', src: '/partners/icici.png' },
  { name: 'HDFC Bank', src: '/partners/hdfc.png' },
  { name: 'Schneider Electric', src: '/partners/schneider.png' },
  { name: 'Samsung', src: '/partners/samsung.png' },
  { name: 'PwC', src: '/partners/pwc.png' },
  { name: 'Deloitte', src: '/partners/deloitte.png' },
];

export function PartnerProofBand() {
  const items = CLIENT_LOGOS.map((logo) => ({
    key: logo.name,
    node: (
      <Image
        src={logo.src}
        alt={logo.name}
        width={200}
        height={200}
        className="h-14 w-auto shrink-0 object-contain"
      />
    ),
  }));

  return (
    <section className="border-b border-sx-border py-7">
      <div className="sx-container flex flex-col gap-5 md:flex-row md:items-center">
        <p className="shrink-0 text-[14px] font-bold text-sx-ink md:w-64">
          Enterprises served by our partners
        </p>
        <div className="min-w-0 flex-1">
          <Marquee label="Enterprise logos" items={items} durationSeconds={44} />
        </div>
      </div>
    </section>
  );
}
