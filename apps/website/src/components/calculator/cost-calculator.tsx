'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  CITIES,
  DEFAULT_MIX,
  GROUPS,
  HQ,
  HQ_DEFAULT_CURRENCY,
  MODELS,
  SENIORITY,
  fmt,
  plan,
  suggestHomeCostUsd,
  type HqMarket,
  type ModelKey,
  type SeniorityKey,
  type FunctionKey,
} from '@/lib/gcc-planner';
import { CURRENCIES, convertCurrency, type CurrencyCode } from '@/lib/calculator-data';
import { INDUSTRIES, type IndustryId } from '@/lib/location-data';
import { trackToolEvent } from '@/lib/crm';
import { Tick } from '@/components/motion/tick';

// Part D2 / W9 — the GCC Planner (ported from the approved reference
// design's /gcc-planner) with ScaleAX's additions: reporting currency and
// sector, an editable "cost per employee at home" benchmark, the three
// ScaleAX engagement models and the 8-city set including GIFT City. The
// engine lives in src/lib/gcc-planner.ts; every displayed amount converts
// to the chosen currency. `variant="embed"` is kept for inline callers.
export function CostCalculator({ variant = 'full' }: { variant?: 'full' | 'embed' }) {
  const [hq, setHq] = useState<HqMarket>('United States');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [sector, setSector] = useState<IndustryId>('technology-saas');
  const [seats, setSeats] = useState(150);
  const [ramp, setRamp] = useState(12);
  const [mix, setMix] = useState<Record<FunctionKey, number>>(DEFAULT_MIX);
  const [seniority, setSeniority] = useState<SeniorityKey>('balanced');
  const [model, setModel] = useState<ModelKey>('bot');
  const [city, setCity] = useState<string | 'auto'>('auto');
  // "Cost per employee at home" is held in the reporting currency, prefilled
  // from the HQ market benchmark until the visitor edits it.
  const [homeCost, setHomeCost] = useState(() =>
    Math.round(suggestHomeCostUsd('United States', DEFAULT_MIX)),
  );
  const [homeCostTouched, setHomeCostTouched] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      void trackToolEvent('cost-calculator', 'calculator_started');
    }
  }, [started]);

  // The HQ market sets the reporting currency by default; both stay editable.
  function onHqChange(next: HqMarket) {
    setHq(next);
    setCurrency(HQ_DEFAULT_CURRENCY[next]);
  }

  // Re-suggest the home benchmark whenever its inputs change, unless the
  // visitor has edited the field themselves.
  useEffect(() => {
    if (homeCostTouched) return;
    setHomeCost(Math.round(convertCurrency(suggestHomeCostUsd(hq, mix), 'USD', currency)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hq, currency, mix, homeCostTouched]);

  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? '';
  const money = (usd: number) => fmt(usd, currency, symbol);

  const result = useMemo(
    () =>
      plan({
        hq,
        seats,
        ramp,
        mix,
        seniority,
        model,
        city,
        homeCostUsd: convertCurrency(homeCost, currency, 'USD'),
      }),
    [hq, seats, ramp, mix, seniority, model, city, homeCost, currency],
  );
  const mixTotal = Object.values(mix).reduce((a, b) => a + b, 0) || 1;
  const maxHome = Math.max(...result.years.map((y) => y.home), 1);
  const top = result.cities[0];

  // The "Send me the full plan" form posts the profile with the lead, so
  // the team can build the detailed model without a follow-up call.
  const planSummary = `Planner request: ${seats} seats over ${ramp} months from ${hq}, ${MODELS[model].name}, city ${result.city.name}. Indicative 3-year saving ${money(result.cum)}.`;
  const planInputs = {
    hq,
    currency,
    sector,
    seats,
    ramp,
    mix,
    seniority,
    model: MODELS[model].name,
    city: result.city.name,
    homeCost,
    summary: planSummary,
  };

  return (
    <div className={variant === 'embed' ? '' : undefined}>
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Controls */}
        <div className="sx-card p-6 sm:p-8 lg:col-span-5">
          <ControlGroup label="Headquarters market">
            <div role="group" aria-label="Headquarters market" className="flex flex-wrap gap-2">
              {(Object.keys(HQ) as HqMarket[]).map((m) => (
                <Chip key={m} selected={hq === m} onClick={() => onHqChange(m)}>
                  {m}
                </Chip>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[120px_minmax(0,1fr)]">
              <SelectField
                label="Currency"
                value={currency}
                onChange={(v) => setCurrency(v as CurrencyCode)}
                options={CURRENCIES.map((c) => ({ value: c.code, label: c.code }))}
              />
              <SelectField
                label="Sector"
                value={sector}
                onChange={(v) => setSector(v as IndustryId)}
                options={INDUSTRIES.map((i) => ({ value: i.id, label: i.label }))}
              />
            </div>
          </ControlGroup>

          <ControlGroup
            label={<label htmlFor="cc-headcount">Target headcount</label>}
            value={`${seats} people`}
          >
            <Range
              id="cc-headcount"
              min={25}
              max={2000}
              step={25}
              value={seats}
              onChange={setSeats}
              ariaLabel="Target headcount"
            />
          </ControlGroup>

          <ControlGroup
            label={<label htmlFor="cc-ramp">Ramp to full strength</label>}
            value={`${ramp} months`}
          >
            <Range
              id="cc-ramp"
              min={6}
              max={36}
              step={3}
              value={ramp}
              onChange={setRamp}
              ariaLabel="Ramp months"
            />
          </ControlGroup>

          <ControlGroup label="Function mix" hint="Shares normalise automatically.">
            <div className="space-y-3">
              {GROUPS.map(([key, label]) => (
                <div key={key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <div>
                    <p className="text-[14px] font-semibold text-sx-ink">{label}</p>
                    <Range
                      min={0}
                      max={100}
                      step={5}
                      value={mix[key]}
                      onChange={(v) => setMix((m) => ({ ...m, [key]: v }))}
                      ariaLabel={label}
                      className="mt-1.5"
                    />
                  </div>
                  <span className="sx-figure w-10 shrink-0 text-right text-[14px] font-bold text-sx-body">
                    {Math.round((mix[key] / mixTotal) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label={<label htmlFor="cc-home-cost">Cost per employee at home</label>}>
            <div className="flex h-11 items-center rounded-sx border border-sx-border bg-white px-3 focus-within:border-sx-ink">
              <span className="text-[14px] text-sx-muted">{symbol}</span>
              <input
                id="cc-home-cost"
                type="number"
                min={0}
                value={homeCost}
                onChange={(e) => {
                  setHomeCostTouched(true);
                  setHomeCost(Number(e.target.value));
                }}
                className="sx-figure h-full w-full bg-transparent px-2 text-[14px] text-sx-ink outline-none"
              />
              <span className="shrink-0 text-[12px] text-sx-muted">/ yr</span>
            </div>
            <p className="mt-2 text-[12px] text-sx-muted">
              Fully loaded: include salary, bonus, benefits, payroll taxes and overheads. Prefilled
              from the {hq} benchmark for your mix.
            </p>
          </ControlGroup>

          <ControlGroup label="Seniority profile">
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(SENIORITY) as SeniorityKey[]).map((s) => (
                <Chip
                  key={s}
                  selected={seniority === s}
                  onClick={() => setSeniority(s)}
                  className="w-full"
                >
                  {SENIORITY[s][0]}
                </Chip>
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="Engagement model">
            <div className="grid gap-2 sm:grid-cols-3">
              {(Object.keys(MODELS) as ModelKey[]).map((m) => (
                <Chip key={m} selected={model === m} onClick={() => setModel(m)} className="w-full">
                  {MODELS[m].name}
                </Chip>
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="City in India" last>
            <div role="group" aria-label="City in India" className="flex flex-wrap gap-2">
              <Chip selected={city === 'auto'} onClick={() => setCity('auto')}>
                Recommend for me
              </Chip>
              {CITIES.map((c) => (
                <Chip key={c.name} selected={city === c.name} onClick={() => setCity(c.name)}>
                  {c.name}
                </Chip>
              ))}
            </div>
          </ControlGroup>
        </div>

        {/* Results */}
        <div id="cc-result" className="grid scroll-mt-24 gap-5 lg:col-span-7 lg:gap-6">
          <ResultPanel result={result} maxHome={maxHome} money={money} />
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            <div className="sx-card p-6 sm:p-7">
              <h3 className="text-[16px] font-bold text-sx-ink">City fit for this profile</h3>
              <ul className="mt-5 grid gap-4">
                {result.cities.map((c, i) => (
                  <li key={c.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p
                        className={`font-extrabold text-sx-ink ${i === 0 ? 'text-[18px]' : 'text-[14px]'}`}
                      >
                        {c.name}
                      </p>
                      <p className="sx-figure text-[14px] font-bold text-sx-body">
                        {c.score.toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-sx-ink-06">
                      <div
                        className="h-full origin-left rounded-full bg-sx-ink transition-transform duration-500 ease-sx-out"
                        style={{ transform: `scaleX(${c.score / 5})` }}
                      />
                    </div>
                    {i === 0 && (
                      <p className="mt-2 text-[14px] leading-relaxed text-sx-body">{c.why}</p>
                    )}
                  </li>
                ))}
              </ul>
              {city !== 'auto' && city !== top.name && (
                <p className="mt-4 text-[12px] text-sx-muted">
                  You chose {city}. Costs above use it. {top.name} scores higher for this mix.
                </p>
              )}
            </div>
            <TimelineCard result={result} />
          </div>
          <PlanRequestCard inputs={planInputs} />
        </div>
      </div>

      <a
        href="#cc-result"
        className="fixed bottom-4 left-1/2 z-30 flex h-11 -translate-x-1/2 items-center rounded-sx bg-sx-ink px-6 text-[14px] font-bold text-white shadow-lg lg:hidden"
      >
        See my result
      </a>
    </div>
  );
}

type Result = ReturnType<typeof plan>;
type Money = (usd: number) => string;

// ─── Controls ──────────────────────────────────────────────────────────────

function ControlGroup({
  label,
  value,
  hint,
  last,
  children,
}: {
  label: ReactNode;
  value?: string;
  hint?: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={last ? '' : 'mb-8'}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div className="text-[14px] font-bold text-sx-ink">{label}</div>
        {value && (
          <div className="sx-figure text-[14px] font-bold text-sx-body">
            <Tick value={value} />
          </div>
        )}
      </div>
      {children}
      {hint && <p className="mt-2 text-[12px] text-sx-muted">{hint}</p>}
    </div>
  );
}

function Range({
  id,
  min,
  max,
  step,
  value,
  onChange,
  ariaLabel,
  className = '',
}: {
  id?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={ariaLabel}
      className={`sx-range w-full ${className}`}
      style={{ ['--sx-fill' as string]: ((value - min) / (max - min)) * 100 }}
    />
  );
}

function Chip({
  selected,
  onClick,
  className = '',
  children,
}: {
  selected: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-10 rounded-sx border px-3.5 py-2 text-[14px] font-medium transition-[background-color,color,border-color,scale] duration-200 ease-sx-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink ${
        selected
          ? 'border-sx-ink bg-sx-ink text-white'
          : 'border-sx-ink-20 bg-white text-sx-ink hover:border-sx-ink/60'
      } ${className}`}
    >
      {children}
    </button>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-[12px] text-sx-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-sx border border-sx-ink-20 bg-white px-3 text-[14px] text-sx-ink focus:border-sx-ink focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// ─── Results ───────────────────────────────────────────────────────────────

function ResultPanel({
  result,
  maxHome,
  money,
}: {
  result: Result;
  maxHome: number;
  money: Money;
}) {
  useEffect(() => {
    void trackToolEvent('cost-calculator', 'result_viewed');
  }, []);

  return (
    <div className="relative isolate overflow-hidden rounded-sx bg-sx-ink p-6 text-sx-white sm:p-8 lg:p-9">
      <div
        aria-hidden="true"
        className="sx-grid-lines-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_0%,#000_10%,transparent_75%)]"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/60">
            Three-year saving vs. home market
          </p>
          <p className="sx-figure mt-3 text-[clamp(2.25rem,4.6vw,4rem)] font-black leading-none tracking-tight">
            <Tick value={money(result.cum)} />
          </p>
          <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-white/80">
            <Tick value={`${Math.round(result.pct * 100)}% lower run-rate`} /> at steady state in{' '}
            {result.city.name}.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <PanelStat label="Steady-state cost / yr" value={money(result.steadyIndia)} />
          <PanelStat label="Same team at home / yr" value={money(result.steadyHome)} />
          <PanelStat label="Workspace" value={`${result.sqft.toLocaleString('en-US')} sq ft`} />
          <PanelStat label="Full strength in" value={`${result.weeks} weeks`} />
        </dl>
      </div>

      <div className="mt-10 border-t border-white/15 pt-8">
        <div className="mb-4 flex items-center gap-5 text-[12px] font-semibold text-white/60">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-white/25" /> Home market
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-white" /> India with ScaleAX
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {result.years.map((y, i) => (
            <div key={i}>
              <div className="flex h-[130px] items-end gap-1.5 sm:h-40 sm:gap-2" aria-hidden="true">
                <Bar pct={y.home / maxHome} className="bg-white/25" title={money(y.home)} />
                <Bar pct={y.india / maxHome} className="bg-white" title={money(y.india)} />
              </div>
              <p className="mt-3 text-[14px] font-bold">Year {i + 1}</p>
              <p className="sx-figure text-[12px] text-white/60">
                {money(y.india)} vs {money(y.home)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bar({ pct, className, title }: { pct: number; className: string; title: string }) {
  // Fixed-height track; the bar scales (transform only) so a new result
  // animates without reflowing the chart.
  return (
    <div className="flex h-full w-full items-end" title={title}>
      <div
        className={`h-full w-full origin-bottom rounded-t-[4px] transition-transform duration-500 ease-sx-out ${className}`}
        style={{ transform: `scaleY(${Math.max(0.04, pct)})` }}
      />
    </div>
  );
}

function PanelStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[110px]">
      <dt className="text-[12px] font-semibold leading-snug text-white/55">{label}</dt>
      <dd className="sx-figure mt-1 text-[20px] font-extrabold">
        <Tick value={value} />
      </dd>
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "Send me the full plan": a small required-fields lead form (full name,
// work email, company) that posts the visitor's planner profile to
// /api/calculator-lead — same validation as the API's own checks.
function PlanRequestCard({ inputs }: { inputs: Record<string, unknown> }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<
      string,
      string
    >;
    const fieldErrors: Record<string, string> = {};
    if (!data.fullName?.trim()) fieldErrors.fullName = 'Full name is required.';
    if (!data.workEmail?.trim()) {
      fieldErrors.workEmail = 'Work email is required.';
    } else if (!EMAIL_RE.test(data.workEmail.trim())) {
      fieldErrors.workEmail = 'Enter a valid email address.';
    }
    if (!data.company?.trim()) fieldErrors.company = 'Company is required.';
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, inputs }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      void trackToolEvent('cost-calculator', 'plan_requested');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-sx border border-sx-border p-6" role="status">
        <p className="text-[16px] font-bold text-sx-ink">Thank you — your plan is on its way.</p>
        <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-sx-body">
          We&rsquo;ll come back with a detailed model for this profile, with named sites, in about
          ten working days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-sx border border-sx-border p-6"
      aria-label="Send me the full plan"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <PlanField
          label="Full name"
          name="fullName"
          placeholder="Jane Smith"
          error={errors.fullName}
        />
        <PlanField
          label="Work email"
          name="workEmail"
          type="email"
          placeholder="jane@company.com"
          error={errors.workEmail}
        />
        <PlanField
          label="Company"
          name="company"
          placeholder="Company Inc."
          error={errors.company}
        />
      </div>
      {status === 'error' && (
        <p role="alert" className="mt-3 text-[12px] text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
      <div className="mt-5 flex flex-col gap-4 border-t border-sx-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[14px] leading-relaxed text-sx-body">
          Indicative only. Actuals depend on roles, city corridor and fit-out. A detailed model with
          named sites takes us about ten working days.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="sx-btn sx-btn-primary shrink-0 text-[14px] disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send me the full plan'}
          <span className="sx-btn-arrow" aria-hidden="true">
            &rarr;
          </span>
        </button>
      </div>
    </form>
  );
}

function PlanField({
  label,
  name,
  type = 'text',
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  const id = `cc-plan-${name}`;
  return (
    <label htmlFor={id} className="block text-[12px] text-sx-muted">
      {label}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        aria-invalid={Boolean(error)}
        className="mt-1 h-10 w-full rounded-sx border border-sx-ink-20 bg-white px-3 text-[14px] text-sx-ink placeholder:text-sx-muted/70 focus:border-sx-ink focus:outline-none aria-[invalid=true]:border-red-500"
      />
      {error && <span className="mt-1 block text-red-600">{error}</span>}
    </label>
  );
}

function TimelineCard({ result }: { result: Result }) {
  return (
    <div className="sx-card p-6 sm:p-7">
      <h3 className="text-[16px] font-bold text-sx-ink">Launch timeline, weeks</h3>
      <ul className="mt-5 grid gap-3">
        {result.timeline.map((phase) => (
          <li
            key={phase.label}
            className="grid grid-cols-[112px_minmax(0,1fr)] items-center gap-3 text-[12px]"
          >
            <span className="font-semibold leading-snug text-sx-body">{phase.label}</span>
            <div className="relative h-5 rounded-[4px] bg-sx-ink-06">
              <div
                className="absolute inset-y-0 rounded-[4px] bg-sx-ink transition-[left,width] duration-500 ease-sx-out"
                style={{
                  left: `${(phase.w[0] / result.weeks) * 100}%`,
                  width: `${Math.max(3, ((phase.w[1] - phase.w[0]) / result.weeks) * 100)}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-between text-[12px] font-semibold text-sx-muted">
        <span>Week 0</span>
        <span>Week {result.weeks}</span>
      </div>
    </div>
  );
}
