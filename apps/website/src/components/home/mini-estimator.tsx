'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MINI_DEFAULTS,
  MINI_FUNCTIONS,
  MINI_MODELS,
  MINI_REGIONS,
  MINI_TEAM_RANGE,
  clampTeamSize,
  estimateMini,
  formatSqFt,
  formatUsdCompact,
  type MiniEstimatorState,
} from '@/lib/mini-estimator';
import { CALCULATOR_DATA_NOTICE } from '@/lib/calculator-data';
import { Tick } from '@/components/motion/tick';

// W8 — the reference's embedded estimator: HQ region toggle, team-size
// slider, primary-function chips and engagement-model toggle on the left;
// a live deep-green result card on the right. All numbers come from the
// Part D2 engine through lib/mini-estimator.ts. Values settle in with the
// W7 `Tick` (collapsed under reduced motion).
export function MiniEstimator() {
  const [state, setState] = useState<MiniEstimatorState>(MINI_DEFAULTS);
  const estimate = useMemo(() => estimateMini(state), [state]);
  const sliderId = useId();

  const set = <K extends keyof MiniEstimatorState>(key: K, value: MiniEstimatorState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const fill =
    ((state.teamSize - MINI_TEAM_RANGE.min) / (MINI_TEAM_RANGE.max - MINI_TEAM_RANGE.min)) * 100;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="sx-card p-7 lg:col-span-7 lg:p-10">
        <div className="grid gap-9">
          <Field label="Where is the team today?">
            <ToggleGroup
              label="Where is the team today?"
              options={MINI_REGIONS.map((r) => ({ id: r.id, label: r.label }))}
              value={state.region}
              onChange={(v) => set('region', v)}
              className="flex flex-wrap gap-2"
            />
          </Field>

          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <label htmlFor={sliderId} className="font-bold text-sx-ink">
                Team size
              </label>
              <p className="sx-figure text-[14px] font-bold text-sx-ink-70" aria-hidden="true">
                {state.teamSize} people
              </p>
            </div>
            <input
              id={sliderId}
              type="range"
              min={MINI_TEAM_RANGE.min}
              max={MINI_TEAM_RANGE.max}
              step={5}
              value={state.teamSize}
              aria-valuetext={`${state.teamSize} people`}
              onChange={(e) => set('teamSize', clampTeamSize(Number(e.target.value)))}
              className="sx-range"
              style={{ ['--sx-fill' as string]: fill }}
            />
            <div className="mt-2 flex justify-between text-[12px] font-bold text-sx-muted">
              <span>{MINI_TEAM_RANGE.min}</span>
              <span>{MINI_TEAM_RANGE.max}</span>
            </div>
          </div>

          <Field label="Primary function">
            <ToggleGroup
              label="Primary function"
              options={MINI_FUNCTIONS.map((f) => ({ id: f.id, label: f.label }))}
              value={state.primaryFunction}
              onChange={(v) => set('primaryFunction', v)}
              className="grid gap-2 sm:grid-cols-3"
              stretch
            />
          </Field>

          <Field label="Engagement model">
            <ToggleGroup
              label="Engagement model"
              options={MINI_MODELS}
              value={state.model}
              onChange={(v) => set('model', v)}
              className="grid gap-2 sm:grid-cols-3"
              stretch
            />
          </Field>
        </div>
      </div>

      <div
        className="relative isolate flex flex-col justify-between overflow-hidden rounded-[20px] bg-sx-ink p-7 text-sx-white lg:col-span-5 lg:p-10"
        aria-live="polite"
      >
        <div
          aria-hidden="true"
          className="sx-grid-lines-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_100%_0%,#000_10%,transparent_70%)]"
        />
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">
            Indicative annual saving
          </p>
          <p className="mt-3 text-[48px] font-black leading-none tracking-[-0.035em] md:text-[60px]">
            <Tick value={formatUsdCompact(estimate.annualSaving)} className="sx-figure" />
          </p>
          <p className="mt-3 text-[17px] text-white/80">
            <Tick
              value={`${Math.round(estimate.annualSavingPct)}%`}
              className="sx-figure font-bold"
            />{' '}
            lower than running the same team in {estimate.comparedWith}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
            <Stat label="Cost in India / yr" value={formatUsdCompact(estimate.indiaAnnualCost)} />
            <Stat
              label={`Cost in ${estimate.comparedWith.replace(/^the /, '')} / yr`}
              value={formatUsdCompact(estimate.homeAnnualCost)}
            />
            <Stat label="Workspace needed" value={formatSqFt(estimate.workspaceSqFt)} />
            <Stat label="Time to first hires" value={estimate.timeToFirstHires} />
          </dl>
        </div>
        <div className="mt-10">
          <div className="flex flex-wrap gap-3">
            <Link href="/calculator" className="sx-btn sx-btn-light">
              Open the full calculator
              <span className="sx-btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link href="/contact" className="sx-btn sx-btn-outline-light">
              Talk to us
            </Link>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-white/55">
            Indicative only, in USD, for a centre in Ahmedabad. Actuals depend on seniority mix,
            city and fit-out. {CALCULATOR_DATA_NOTICE}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 font-bold text-sx-ink" aria-hidden="true">
        {label}
      </p>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] font-bold text-white/55">{label}</dt>
      <dd className="mt-1 text-[20px] font-black tracking-[-0.02em]">
        <Tick value={value} className="sx-figure" />
      </dd>
    </div>
  );
}

function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
  stretch = false,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  stretch?: boolean;
}) {
  return (
    <div role="group" aria-label={label} className={className}>
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`min-h-11 rounded-full px-4 py-2 text-[14px] font-bold leading-tight transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
              stretch ? 'w-full' : ''
            } ${
              active
                ? 'bg-sx-ink text-sx-white'
                : 'bg-white text-sx-ink shadow-[inset_0_0_0_1.5px_var(--sx-ink-20)] hover:shadow-[inset_0_0_0_1.5px_var(--sx-ink)]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
