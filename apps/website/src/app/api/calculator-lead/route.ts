import { NextResponse } from 'next/server';
import { sendLeadToCrm } from '@/lib/crm';

// Part D2 "Behaviour" — email gate unlocks the detailed breakdown. Same
// validate-then-stub-CRM shape as /api/consultation and /api/location-lead.
export interface CalculatorLeadPayload {
  fullName: string;
  workEmail: string;
  company: string;
  inputs?: Record<string, unknown>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<CalculatorLeadPayload>): Record<string, string> {
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
  let body: Partial<CalculatorLeadPayload>;

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
    tool: 'cost-calculator',
    fullName: body.fullName as string,
    workEmail: body.workEmail as string,
    company: body.company as string,
    inputs: body.inputs ?? {},
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
