'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { track, ANALYTICS_EVENTS } from '@/lib/analytics';
import { Reveal } from '@/components/motion/reveal';

type Errors = Partial<Record<'fullName' | 'company' | 'workEmail' | 'country', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Record<string, string>): Errors {
  const errors: Errors = {};
  if (!data.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!data.company.trim()) errors.company = 'Company is required.';
  if (!data.workEmail.trim()) {
    errors.workEmail = 'Work email is required.';
  } else if (!EMAIL_RE.test(data.workEmail.trim())) {
    errors.workEmail = 'Enter a valid email address.';
  }
  if (!data.country.trim()) errors.country = 'Country is required.';
  return errors;
}

// Part A, Section 11 — "Book a consultation". Navy band left (headline,
// body, contact details in white), white form card right (Part C4 Section
// 11). Client-side validation mirrors the /api/consultation stub's
// server-side checks.
export function ConsultationForm({ variant = 'band' }: { variant?: 'band' | 'page' } = {}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [planPrefill, setPlanPrefill] = useState('');

  // The GCC Planner's "Send me the full plan" CTA links here with a
  // ?message= summary of the profile; prefill the plan field with it.
  // (window.location, not useSearchParams, to keep the page statically
  // prerenderable without a Suspense boundary.)
  useEffect(() => {
    const message = new URLSearchParams(window.location.search).get('message');
    if (message) setPlanPrefill(message);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('submitting');
    setServerError(null);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (body?.fieldErrors) {
          setErrors(body.fieldErrors);
          setStatus('idle');
          return;
        }
        throw new Error('Request failed');
      }

      setStatus('success');
      form.reset();
      void track(ANALYTICS_EVENTS.CONSULTATION_SUBMITTED, { company: data.company });
    } catch {
      setStatus('error');
      setServerError('Something went wrong. Please try again, or email us directly.');
    }
  }

  const formCard = (
    <>
      {status === 'success' ? (
        <div role="status" className="sx-drop py-6 text-center">
          <div className="text-[20px] font-bold text-sx-ink">Thank you.</div>
          <p className="mt-2 text-[15px] text-sx-body">
            Our team will reply within one working day.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className={variant === 'page' ? 'grid gap-x-4 gap-y-4 sm:grid-cols-2' : ''}>
            <Field
              label="Full name"
              name="fullName"
              required
              error={errors.fullName}
              flat={variant === 'page'}
            />
            <Field
              label="Company"
              name="company"
              required
              error={errors.company}
              flat={variant === 'page'}
            />
            <Field
              label="Work email"
              name="workEmail"
              type="email"
              required
              error={errors.workEmail}
              flat={variant === 'page'}
            />
            <Field
              label="Country"
              name="country"
              required
              error={errors.country}
              flat={variant === 'page'}
            />
          </div>
          <Field label="Phone (optional)" name="phone" type="tel" />

          <div className="mt-4">
            <label htmlFor="plan" className="text-[14px] font-bold text-sx-ink">
              What are you planning?
            </label>
            <textarea
              id="plan"
              name="plan"
              key={planPrefill || 'empty'}
              defaultValue={planPrefill}
              rows={4}
              className="mt-1 w-full rounded-[12px] border border-sx-border bg-white p-3 text-[15px] text-sx-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-sx-ink"
            />
          </div>

          {serverError && (
            <p role="alert" className="mt-4 text-[14px] text-red-600">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="sx-btn sx-btn-primary mt-6 w-full disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Book a consultation'}
          </button>
          <p className="mt-3 text-center text-[13px] text-sx-muted">
            We use your details only to reply to you.{' '}
            <a href="/privacy" className="text-sx-ink hover:underline">
              Privacy policy
            </a>
          </p>
        </form>
      )}
    </>
  );

  if (variant === 'page') {
    return (
      <Reveal variant="zoom" className="sx-card p-6 sm:p-10">
        {formCard}
      </Reveal>
    );
  }

  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden bg-sx-ink">
      <div
        aria-hidden="true"
        className="sx-grid-lines-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,#000_10%,transparent_70%)]"
      />
      <div className="sx-section sx-container grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="text-sx-white">
          <div className="sx-eyebrow !text-white/55">Book a consultation</div>
          <h2 className="sx-h2 mt-3 text-sx-white">Tell us what you want to build in India.</h2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-[1.6] text-white/75 sm:text-[18px]">
            Share the functions, team size and timeline. Within two weeks you get a location
            recommendation, a cost model and a set-up plan.
          </p>

          <dl className="mt-10 space-y-4 text-[15px]">
            <div>
              <dt className="text-white/70">Email</dt>
              <dd>
                <a href="mailto:info@scaleax.com" className="hover:underline">
                  info@scaleax.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/70">Ahmedabad</dt>
              <dd>Ahmedabad, Gujarat, India</dd>
            </div>
            <div>
              <dt className="text-white/70">GIFT City</dt>
              <dd>GIFT City, Gandhinagar, Gujarat, India</dd>
            </div>
            <div>
              <dt className="text-white/70">LinkedIn</dt>
              <dd>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Follow ScaleAX
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal variant="zoom" className="rounded-[20px] bg-white p-6 sm:p-8">
          {formCard}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  error,
  flat = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  flat?: boolean;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={flat ? '' : 'mt-4 first:mt-0'}>
      <label htmlFor={id} className="text-[14px] font-bold text-sx-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="mt-1 h-11 w-full rounded-[12px] border border-sx-border bg-white px-3 text-[15px] text-sx-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-sx-ink"
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
