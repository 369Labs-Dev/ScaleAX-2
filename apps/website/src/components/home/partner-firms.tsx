import Image from 'next/image';
import { PARTNER_FIRMS } from '@/lib/home-data';
import { Reveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';

// Part A, Section 9 — "The firms behind ScaleAX", used on /about. Tiles in
// a 3-across grid per Part C4 Section 9. The brief's client-logo grid and
// leadership row need real logos/headshots and permissions we don't have
// yet, so — per the no-fabricated-content rule — this section covers only
// the partner-firm tiles the brief gives confirmed copy and numbers for.
// W8: the reference's light tinted band with white hairline cards; tiles
// rise in sequence and their numbers roll up once (final values are
// server-rendered — see CountUp).
export function PartnerFirms() {
  return (
    <section className="sx-section bg-sx-bg-light">
      <div className="sx-container">
        <Reveal className="max-w-3xl">
          <div className="sx-eyebrow">Our partner firms</div>
          <h2 className="sx-h2 mt-3 text-sx-ink">Built by firms that already do this work.</h2>
          <p className="sx-lead mt-5 max-w-[720px]">
            ScaleAX is a joint venture between Awfficacy Global and DevX, with Savvy Group as its
            construction partner. Between them, they own buildings, run offices, and handle finance
            and compliance for companies in India and abroad.
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PARTNER_FIRMS.map((firm) => (
            <div key={firm.name} className="sx-card sx-card-hover flex flex-col p-8">
              <div className="mb-5 flex h-14 items-center">
                <Image
                  src={firm.logo}
                  alt={`${firm.name} logo`}
                  width={200}
                  height={60}
                  className="w-auto object-contain object-left"
                  style={{ height: firm.logoHeight }}
                />
              </div>
              <div className="sx-eyebrow">{firm.role}</div>
              <h3 className="mt-3 text-[24px] font-black tracking-[-0.02em] text-sx-ink">
                {firm.name}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-sx-body">
                {firm.description}
              </p>
              <ul className="mt-8 space-y-2 border-t border-sx-border pt-6">
                {firm.stats.map((stat) => (
                  <li key={stat} className="text-[15px] font-bold text-sx-ink">
                    <CountUp value={stat} className="sx-figure" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
