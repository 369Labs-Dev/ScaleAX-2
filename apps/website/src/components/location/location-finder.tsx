'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  CITIES,
  FACTORS,
  HEADCOUNT_RANGE,
  HQ_REGIONS,
  INDUSTRIES,
  MAX_ROLES_SELECTABLE,
  PLACEHOLDER_DATA_NOTICE,
  ROLES,
  type FactorId,
  type GiftCityNeed,
  type HqRegionId,
  type IndustryId,
  type LocationFinderInput,
  type RoleId,
} from '@/lib/location-data';
import {
  applyIndustryPreset,
  areWeightsValid,
  buildShortlist,
  scoreCities,
  weightsTotal,
} from '@/lib/location-engine';
import { trackToolEvent } from '@/lib/crm';
import { Tick } from '@/components/motion/tick';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Part D1 — the full Location Finder: "Your centre" inputs, "Your
// priorities" weight sliders, the live "Result" shortlist, "Why this
// city", "The other cities", and the "Get the report" email gate.
export function LocationFinder() {
  const [industry, setIndustry] = useState<IndustryId>('technology-saas');
  const [headcount, setHeadcount] = useState(200);
  const [hqRegion, setHqRegion] = useState<HqRegionId>('us');
  const [roles, setRoles] = useState<RoleId[]>(['software-engineering']);
  const [giftCityNeed, setGiftCityNeed] = useState<GiftCityNeed>('not-sure');
  const [weights, setWeights] = useState<Record<FactorId, number>>(
    applyIndustryPreset(
      FACTORS.reduce(
        (acc, f) => ({ ...acc, [f.id]: f.defaultWeight }),
        {} as Record<FactorId, number>,
      ),
      'technology-saas',
    ),
  );
  const [weightsTouched, setWeightsTouched] = useState(false);
  const [started, setStarted] = useState(false);

  // Presets change the default weights per industry; once the visitor has
  // touched a slider themselves, stop overriding their choices.
  useEffect(() => {
    if (weightsTouched) return;
    setWeights(
      applyIndustryPreset(
        FACTORS.reduce(
          (acc, f) => ({ ...acc, [f.id]: f.defaultWeight }),
          {} as Record<FactorId, number>,
        ),
        industry,
      ),
    );
  }, [industry, weightsTouched]);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      void trackToolEvent('location-finder', 'tool_started');
    }
  }, [started]);

  function toggleRole(role: RoleId) {
    setRoles((current) => {
      if (current.includes(role)) return current.filter((r) => r !== role);
      if (current.length >= MAX_ROLES_SELECTABLE) return current;
      return [...current, role];
    });
  }

  function setWeight(factor: FactorId, value: number) {
    setWeightsTouched(true);
    setWeights((current) => ({ ...current, [factor]: value }));
  }

  const total = weightsTotal(weights);
  const valid = areWeightsValid(weights);

  const input: LocationFinderInput = useMemo(
    () => ({
      industry,
      targetHeadcountYear3: headcount,
      hqRegion,
      roles,
      giftCityNeed,
      weights,
    }),
    [industry, headcount, hqRegion, roles, giftCityNeed, weights],
  );

  const results = useMemo(() => (valid ? scoreCities(input, CITIES) : []), [input, valid]);
  const shortlist = useMemo(() => buildShortlist(results), [results]);

  useEffect(() => {
    if (valid && results.length > 0) {
      void trackToolEvent('location-finder', 'result_viewed', { top: results[0]?.city.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results.length > 0 && results[0]?.city.id, valid]);

  return (
    <div>
      <section aria-labelledby="lf-centre-heading" className="sx-container py-12 sm:py-16">
        <h2 id="lf-centre-heading" className="text-[24px] font-bold text-sx-ink sm:text-[32px]">
          Tell us about your centre.
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-[14px] font-bold text-sx-ink">Industry</span>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as IndustryId)}
              className="mt-1 h-11 w-full rounded-[12px] border border-sx-border bg-white px-3 text-[15px] text-sx-body"
            >
              {INDUSTRIES.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[14px] font-bold text-sx-ink">Headquarters</span>
            <select
              value={hqRegion}
              onChange={(e) => setHqRegion(e.target.value as HqRegionId)}
              className="mt-1 h-11 w-full rounded-[12px] border border-sx-border bg-white px-3 text-[15px] text-sx-body"
            >
              {HQ_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          <div className="sm:col-span-2">
            <label htmlFor="lf-headcount" className="text-[14px] font-bold text-sx-ink">
              Target headcount (year 3): <span className="sx-figure font-bold">{headcount}</span>
            </label>
            <input
              id="lf-headcount"
              type="range"
              min={HEADCOUNT_RANGE.min}
              max={HEADCOUNT_RANGE.max}
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value))}
              className="sx-range mt-2"
              style={{
                ['--sx-fill' as string]:
                  ((headcount - HEADCOUNT_RANGE.min) /
                    (HEADCOUNT_RANGE.max - HEADCOUNT_RANGE.min)) *
                  100,
              }}
            />
          </div>

          <fieldset className="sm:col-span-2">
            <legend className="text-[14px] font-bold text-sx-ink">
              Roles to hire (choose up to {MAX_ROLES_SELECTABLE})
            </legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ROLES.map((role) => {
                const checked = roles.includes(role.id);
                const disabled = !checked && roles.length >= MAX_ROLES_SELECTABLE;
                return (
                  <label
                    key={role.id}
                    className={`flex items-center gap-2 text-[14px] ${disabled ? 'text-sx-muted' : 'text-sx-body'}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleRole(role.id)}
                      className="accent-sx-ink"
                    />
                    {role.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="sm:col-span-2">
            <legend className="text-[14px] font-bold text-sx-ink">Needs GIFT City IFSC?</legend>
            <div className="mt-2 flex gap-4">
              {(['yes', 'no', 'not-sure'] as GiftCityNeed[]).map((option) => (
                <label key={option} className="flex items-center gap-2 text-[14px] text-sx-body">
                  <input
                    type="radio"
                    name="gift-city-need"
                    checked={giftCityNeed === option}
                    onChange={() => setGiftCityNeed(option)}
                    className="accent-sx-ink"
                  />
                  {option === 'yes' ? 'Yes' : option === 'no' ? 'No' : 'Not sure'}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <section aria-labelledby="lf-priorities-heading" className="bg-sx-bg-light py-12 sm:py-16">
        <div className="sx-container">
          <h2
            id="lf-priorities-heading"
            className="text-[24px] font-bold text-sx-ink sm:text-[32px]"
          >
            What matters most to you?
          </h2>
          <p
            className={`mt-2 text-[14px] font-bold ${valid ? 'text-sx-ink' : 'text-red-600'}`}
            role="status"
          >
            Total weight: {total}% {valid ? '' : '— adjust the sliders to total 100%'}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FACTORS.map((factor) => (
              <label key={factor.id} className="block">
                <span className="flex items-center justify-between text-[14px] font-bold text-sx-ink">
                  {factor.label}
                  <span className="sx-figure">{Math.round(weights[factor.id])}%</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weights[factor.id]}
                  onChange={(e) => setWeight(factor.id, Number(e.target.value))}
                  className="sx-range mt-2"
                  style={{ ['--sx-fill' as string]: weights[factor.id] }}
                  aria-label={`${factor.label} weight`}
                />
              </label>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="lf-result-heading" className="sx-container py-12 sm:py-16">
        <h2 id="lf-result-heading" className="text-[24px] font-bold text-sx-ink sm:text-[32px]">
          Your shortlist.
        </h2>

        {!valid ? (
          <p className="mt-6 rounded-[16px] border border-sx-border bg-sx-bg-light p-6 text-sx-muted">
            Set your priority weights to total 100% to see your shortlist.
          </p>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <ResultCard label="Best fit" result={shortlist.best} />
              <ResultCard label="Strong alternative" result={shortlist.strongAlternative} />
              <ResultCard label="Worth considering" result={shortlist.worthConsidering} />
            </div>

            {shortlist.best && (
              <div className="mt-12">
                <h3 className="text-[20px] font-bold text-sx-ink">
                  Why {shortlist.best.city.name} came first.
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {FACTORS.map((factor) => (
                    <div
                      key={factor.id}
                      className="rounded-[16px] border border-sx-border bg-white p-4"
                    >
                      <div className="sx-eyebrow">{factor.label}</div>
                      <p className="mt-1 text-[13px] text-sx-body">
                        {shortlist.best!.city.whyThisCity[factor.id]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {shortlist.others.length > 0 && (
              <div className="mt-12">
                <h3 className="text-[20px] font-bold text-sx-ink">
                  Where the others fall short, and where they win.
                </h3>
                <ul className="mt-4 divide-y divide-sx-border rounded-[16px] border border-sx-border bg-white">
                  {shortlist.others.map((result) => (
                    <li
                      key={result.city.id}
                      className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="text-[15px] font-bold text-sx-ink">
                          {result.city.name} &middot; {result.overallScore.toFixed(2)} / 5
                        </div>
                        <p className="mt-1 text-[13px] text-sx-body">
                          {result.city.tradeOff.strength}, but{' '}
                          {result.city.tradeOff.weakness.toLowerCase()}.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ReportGate input={input} shortlist={shortlist} />
          </>
        )}

        <p className="mt-8 text-[13px] text-sx-muted">{PLACEHOLDER_DATA_NOTICE}</p>
      </section>
    </div>
  );
}

function ResultCard({
  label,
  result,
}: {
  label: string;
  result: ReturnType<typeof buildShortlist>['best'];
}) {
  if (!result) {
    return (
      <div className="rounded-[16px] border border-sx-border bg-sx-bg-light p-6 text-[13px] text-sx-muted">
        No city available for &ldquo;{label}&rdquo; with the current filters.
      </div>
    );
  }

  return (
    <div className="sx-card-hover rounded-[16px] border border-sx-border bg-white p-6">
      <div className="sx-eyebrow">{label}</div>
      <div className="mt-1 text-[22px] font-bold text-sx-ink">
        <Tick value={result.city.name} />
      </div>
      <div className="sx-figure mt-1 text-[15px] font-bold text-sx-ink">
        <Tick value={`${result.overallScore.toFixed(2)} / 5`} />
      </div>
      <div className="mt-4 space-y-2">
        {result.factorScores.slice(0, 5).map((fs) => (
          <div key={fs.id}>
            <div className="flex justify-between text-[12px] text-sx-muted">
              <span>{fs.label}</span>
              <span>{fs.score.toFixed(1)}</span>
            </div>
            {/* W7: scaleX (transform only) so re-weighting animates the bar
                without layout work. */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-sx-border">
              <div
                className="h-1.5 w-full origin-left rounded-full bg-sx-ink transition-transform duration-500 ease-sx-out"
                style={{ transform: `scaleX(${fs.score / 5})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportGate({
  input,
  shortlist,
}: {
  input: LocationFinderInput;
  shortlist: ReturnType<typeof buildShortlist>;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

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
      const res = await fetch('/api/location-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, inputs: input, result: shortlist }),
      });
      if (!res.ok) throw new Error('Request failed');
      setUnlocked(true);
      void trackToolEvent('location-finder', 'report_requested');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div
      id="report"
      className="mt-12 scroll-mt-24 rounded-[16px] border border-sx-border bg-sx-bg-light p-6 sm:p-8"
    >
      <h3 className="text-[20px] font-bold text-sx-ink">Get the full comparison as a PDF.</h3>
      {unlocked ? (
        <p className="mt-3 text-[15px] text-sx-body" role="status">
          Thank you &mdash; we&rsquo;ll email your full comparison shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Full name" name="fullName" error={errors.fullName} />
          <Field label="Work email" name="workEmail" type="email" error={errors.workEmail} />
          <Field label="Company" name="company" error={errors.company} />
          <div className="sm:col-span-3">
            {status === 'error' && (
              <p role="alert" className="mb-3 text-[13px] text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="sx-btn sx-btn-primary !h-11 text-[14px] disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Email me the report'}
            </button>
            <a href="/contact" className="ml-4 text-[14px] font-bold text-sx-ink hover:underline">
              Talk to us about the result
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  const id = `lf-report-${name}`;
  return (
    <label htmlFor={id} className="block text-[13px] font-bold text-sx-ink">
      {label}
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        className="mt-1 h-10 w-full rounded-[12px] border border-sx-border bg-white px-3 text-[14px] font-normal text-sx-body"
      />
      {error && <span className="mt-1 block font-normal text-red-600">{error}</span>}
    </label>
  );
}
