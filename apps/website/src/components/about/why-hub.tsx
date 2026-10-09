import { FileCheck, MapPin, Route, Users } from 'lucide-react';
import { WHY_SCALEAX } from '@/lib/about-data';
import Image from 'next/image';
import { Reveal } from '@/components/motion/reveal';

const ICONS = [Route, Users, MapPin, FileCheck];
// Column centres of the four-across grid, as percentages of its width.
const BRANCH_X = [12.5, 37.5, 62.5, 87.5];

// About: "Why companies choose ScaleAX" as a hub. ScaleAX sits at the top
// and a line runs down to each reason; on small screens the lines are
// dropped and the reasons stack.
export function WhyHub() {
  return (
    <section id="why-scaleax" className="scroll-mt-24 px-3 py-10 md:px-5 md:py-14">
      <div className="relative isolate overflow-hidden rounded-sx bg-sx-ink-deep text-sx-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1.5px)] [background-size:20px_20px]"
        />
        <div className="sx-container py-16 md:py-24">
          <Reveal className="text-center">
            <div className="sx-eyebrow justify-center !text-white/60">Why ScaleAX</div>
            <h2 className="sx-h2 mt-5 text-sx-white">Why companies choose ScaleAX</h2>
          </Reveal>

          <div className="mt-12 flex justify-center md:mt-16">
            <div className="rounded-sx border border-white/25 bg-white/10 px-9 py-5 backdrop-blur-sm">
              <Image
                src="/scaleax.svg"
                alt="ScaleAX"
                width={289}
                height={56}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="hidden h-36 w-full lg:block"
          >
            {BRANCH_X.map((x) => (
              <path
                key={x}
                d={`M50 0 C50 62, ${x} 38, ${x} 100`}
                fill="none"
                stroke="rgb(255 255 255 / 0.32)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <Reveal
            stagger
            className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4"
          >
            {WHY_SCALEAX.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <article
                  key={item.title}
                  className="row-span-3 grid grid-rows-subgrid gap-0 lg:text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-sx border border-white/25 bg-white/10 lg:mx-auto">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-[20px] font-bold leading-[1.12] tracking-[-0.01em] text-sx-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-white/75">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
