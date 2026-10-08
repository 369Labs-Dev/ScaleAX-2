import Image from 'next/image';
import { PARTNER_FIRMS, PLATFORM_PARTNERS } from '@/lib/home-data';
import { Reveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';

// The ecosystem firms behind ScaleAX, used on /about: logo, name, what the
// firm does and its headline numbers, which roll up once (final values are
// server-rendered — see CountUp).
const clientsOf = (firm: string) =>
  PLATFORM_PARTNERS.find((partner) => partner.name.split(' ')[0] === firm.split(' ')[0])?.clients ??
  [];

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
                <h3 className="text-[32px] font-black leading-none tracking-[-0.02em] text-sx-ink">
                  {firm.name}
                </h3>
                <p className="mt-4 text-[18px] leading-relaxed text-sx-body">{firm.description}</p>
              </div>
              <ul className="space-y-2 lg:col-span-4">
                {firm.stats.map((stat) => (
                  <li
                    key={stat}
                    className="border-l-0 text-[18px] font-black tracking-[-0.015em] text-sx-ink"
                  >
                    <CountUp value={stat} className="sx-figure" />
                  </li>
                ))}
              </ul>
              {clientsOf(firm.name).length > 0 && (
                <div className="lg:col-span-9 lg:col-start-4">
                  <div className="text-[12px] font-bold uppercase tracking-[0.1em] text-sx-muted">
                    Clients
                  </div>
                  <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-5">
                    {clientsOf(firm.name).map((client) => (
                      <li key={client.name}>
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={200}
                          height={200}
                          className="h-11 w-auto object-contain"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
