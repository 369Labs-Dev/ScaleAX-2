import { Reveal } from './motion/reveal';

export interface ProcessStep {
  label: string;
  when?: string;
  body: string;
}

export interface ProcessStepsProps {
  eyebrow?: string;
  headline?: string;
  steps: ProcessStep[];
  id?: string;
}

// Part 0.3 block 4 / Part C6 "Process steps" — horizontal line in navy with
// orange numbered circles (32px); step title under each circle, one line
// below. Vertical on mobile. Used for the "Process" / "How it runs" /
// "Handover, step by step" tables across Part B.
export function ProcessSteps({ eyebrow, headline, steps, id }: ProcessStepsProps) {
  return (
    <section id={id} className="sx-container scroll-mt-24 py-12 sm:py-16">
      {(eyebrow || headline) && (
        <Reveal className="max-w-[720px]">
          {eyebrow && <div className="sx-eyebrow">{eyebrow}</div>}
          {headline && (
            <h2 className="mt-3 text-[28px] font-black leading-[1.06] tracking-[-0.03em] text-sx-ink sm:text-[40px]">
              {headline}
            </h2>
          )}
        </Reveal>
      )}

      {/* W7: the connector draws in, then the steps rise in order. */}
      <div className="relative mt-10">
        <Reveal
          variant="draw"
          aria-hidden="true"
          className="absolute left-4 right-0 top-4 hidden h-px bg-sx-ink sm:block"
        />
        <Reveal as="ol" stagger className="relative flex flex-col gap-8 sm:flex-row sm:gap-4">
          {steps.map((step, i) => (
            <li key={step.label} className="group relative flex-1">
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-sx-ink text-[14px] font-bold text-white transition-[scale] duration-300 ease-sx-out group-hover:scale-110">
                {i + 1}
              </div>
              <div className="mt-3 text-[15px] font-bold text-sx-ink">{step.label}</div>
              {step.when && <div className="mt-0.5 text-[12px] text-sx-muted">{step.when}</div>}
              <p className="mt-1 text-[14px] text-sx-body">{step.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
