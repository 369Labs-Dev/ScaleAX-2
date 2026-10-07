import { Flag, Target } from 'lucide-react';
import { Media } from '@/components/media';
import { Reveal } from '@/components/motion/reveal';

// About: purpose and vision as two large cards. The first is set on ink with
// a dotted field, the second on a photograph, each with its line at the foot.
export function PurposeCards() {
  return (
    <section className="sx-container py-12 sm:py-16">
      <Reveal stagger className="grid gap-5 lg:grid-cols-2">
        <article className="relative isolate flex min-h-[340px] flex-col overflow-hidden rounded-sx bg-sx-ink-deep p-7 text-sx-white md:min-h-[400px] md:p-9">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1.5px)] [background-size:18px_18px] [mask-image:linear-gradient(180deg,#000,transparent_85%)]"
          />
          <h2 className="flex items-center gap-3 text-[22px] text-sx-white font-black tracking-[-0.02em] md:text-[26px]">
            <Flag className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            Why we exist
          </h2>
          <div className="mt-auto border-t border-white/20 pt-6">
            <p className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-black leading-[1.08] tracking-[-0.02em]">
              Make India easier to build in.
            </p>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-white/80">
              We help global companies establish and operate their India capability without having
              to assemble and manage multiple providers.
            </p>
          </div>
        </article>

        <article className="relative isolate flex min-h-[340px] flex-col overflow-hidden rounded-sx bg-sx-ink-deep p-7 text-sx-white md:min-h-[400px] md:p-9">
          <Media
            id="india-01"
            alt=""
            width={1200}
            height={1500}
            sizes="(min-width: 1024px) 50vw, 100vw"
            kind="india"
            className="!absolute inset-0 -z-20"
          />
          <div aria-hidden="true" className="sx-scrim -z-10" />
          <h2 className="flex items-center gap-3 text-[22px] text-sx-white font-black tracking-[-0.02em] md:text-[26px]">
            <Target className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            Where we are going
          </h2>
          <div className="mt-auto border-t border-white/25 pt-6">
            <p className="max-w-[24ch] text-[clamp(1.5rem,2.4vw,2.1rem)] font-black leading-[1.08] tracking-[-0.02em]">
              To be the first call when a global company decides to build in India.
            </p>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
