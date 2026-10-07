import Image from 'next/image';
import { PARTNER_FIRMS } from '@/lib/home-data';
import { Reveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';

// The ecosystem firms behind ScaleAX, used on /about: logo, name, what the
// firm does and its headline numbers, which roll up once (final values are
// server-rendered — see CountUp).
export function PartnerFirms() {
  return (
    <section className="sx-section bg-sx-bg-light">
      <div className="sx-container">
        <Reveal className="max-w-4xl">
          <div className="sx-eyebrow">Our Ecosystem</div>
          <h2 className="sx-h2 mt-5 text-sx-ink">Part of a wider Platform</h2>
        </Reveal>

        <Reveal stagger className="mt-14 border-t border-sx-ink md:mt-20">
          {PARTNER_FIRMS.map((firm) => (
            <div
              key={firm.name}
              className="grid gap-x-10 gap-y-6 border-b border-sx-border py-10 lg:grid-cols-12 lg:items-start lg:py-12"
            >
              <div className="lg:col-span-3">
                <div className="flex h-14 items-center">
                  <Image
                    src={firm.logo}
                    alt={`${firm.name} logo`}
                    width={200}
                    height={60}
                    className="w-auto object-contain object-left"
                    style={{ height: firm.logoHeight }}
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <h3 className="text-[28px] font-black leading-none tracking-[-0.02em] text-sx-ink">
                  {firm.name}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed text-sx-body">{firm.description}</p>
              </div>
              <ul className="space-y-2 lg:col-span-4">
                {firm.stats.map((stat) => (
                  <li
                    key={stat}
                    className="border-l-0 text-[19px] font-black tracking-[-0.015em] text-sx-ink"
                  >
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
