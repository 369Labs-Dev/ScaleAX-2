import { NextResponse } from 'next/server';

// Part A, Section 11 — "Book a consultation" stub API. No CRM/email
// integration yet; this validates the required fields server-side (in
// addition to the form's client-side validation) and logs the submission,
// so the form has somewhere real to post to ahead of the real integration.
export interface ConsultationPayload {
  fullName: string;
  company: string;
  workEmail: string;
  country: string;
  phone?: string;
  plan?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<ConsultationPayload>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!body.fullName?.trim()) errors.fullName = 'Full name is required.';
  if (!body.company?.trim()) errors.company = 'Company is required.';
  if (!body.workEmail?.trim()) {
    errors.workEmail = 'Work email is required.';
  } else if (!EMAIL_RE.test(body.workEmail.trim())) {
    errors.workEmail = 'Enter a valid email address.';
  }
  if (!body.country?.trim()) errors.country = 'Country is required.';

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<ConsultationPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const fieldErrors = validate(body);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  // TODO: wire to CRM / email once the integration is chosen. For now, log
  // the submission so it's visible in server logs during development.
  console.log('[consultation] submission received', {
    company: body.company,
    country: body.country,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
