// Shared CRM/lead handoff, used by both tools' API routes (Part D1 "Lead
// capture" and D2 "Send the lead and all inputs to [CRM / info@scaleax.com]").
// No real CRM integration exists yet, so this is a typed stub — the same
// pattern as /api/consultation's inline validation, pulled out here because
// two tools need it. Swapping in a real CRM/email provider later means
// replacing the body of `sendLeadToCrm`, not the call sites.

import { track, ANALYTICS_EVENTS } from './analytics';

export type ToolEvent =
  | 'tool_started'
  | 'result_viewed'
  | 'report_requested'
  | 'calculator_started'
  | 'breakdown_unlocked'
  | 'review_booked'
  | 'plan_requested';

export interface CrmLead {
  tool: 'location-finder' | 'cost-calculator';
  fullName: string;
  workEmail: string;
  company: string;
  /** The visitor's tool inputs, for the ScaleAX team to see alongside the lead. */
  inputs: Record<string, unknown>;
  /** The result shown to the visitor, if applicable (e.g. the shortlist or the cost breakdown). */
  result?: Record<string, unknown>;
}

export async function sendLeadToCrm(lead: CrmLead): Promise<void> {
  // TODO: wire to the real CRM / info@scaleax.com once the integration is
  // chosen (Part D "Lead capture" / Appendix 3 #16). For now, log server-side
  // so submissions are visible during development and in server logs.
  console.log(`[crm] ${lead.tool} lead received`, {
    company: lead.company,
    workEmail: lead.workEmail,
  });
}

export async function trackToolEvent(
  tool: 'location-finder' | 'cost-calculator',
  event: ToolEvent,
  meta?: Record<string, unknown>,
): Promise<void> {
  // Part D asks both tools to "track events" (tool started, result viewed,
  // report requested / calculator started, breakdown unlocked, review
  // booked). Routed through the shared, vendor-neutral `track()` in
  // `lib/analytics.ts` so both tools and the console/dev provider agree on
  // one pipe; the two key conversions also get their own named constant.
  await track(`${tool}:${event}`, meta);
  if (tool === 'cost-calculator' && event === 'breakdown_unlocked') {
    await track(ANALYTICS_EVENTS.CALCULATOR_EMAIL_GATE_SUBMITTED, meta);
  }
  if (tool === 'location-finder' && event === 'report_requested') {
    await track(ANALYTICS_EVENTS.LOCATION_REPORT_GATE_SUBMITTED, meta);
  }
}
