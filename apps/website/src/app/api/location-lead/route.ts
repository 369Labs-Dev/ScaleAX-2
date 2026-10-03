import { NextResponse } from 'next/server';
import { sendLeadToCrm } from '@/lib/crm';

// Part D1 "Lead capture" — the PDF report is emailed after name, work email
// and company. Same validate-then-stub-CRM shape as /api/consultation.
export interface LocationLeadPayload {
  fullName: string;
  workEmail: string;
  company: string;
  inputs?: Record<string, unknown>;
  result?: Record<string, unknown>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<LocationLeadPayload>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!body.fullName?.trim()) errors.fullName = 'Full name is required.';
  if (!body.workEmail?.trim()) {
    errors.workEmail = 'Work email is required.';
  } else if (!EMAIL_RE.test(body.workEmail.trim())) {
    errors.workEmail = 'Enter a valid email address.';
  }
  if (!body.company?.trim()) errors.company = 'Company is required.';
  return errors;
}

export async function POST(request: Request) {
  let body: Partial<LocationLeadPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const fieldErrors = validate(body);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  await sendLeadToCrm({
    tool: 'location-finder',
    fullName: body.fullName as string,
    workEmail: body.workEmail as string,
    company: body.company as string,
    inputs: body.inputs ?? {},
    result: body.result,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
