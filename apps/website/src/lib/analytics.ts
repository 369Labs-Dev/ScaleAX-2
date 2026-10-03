// W6 — pluggable analytics event interface. No vendor lock: the rest of
// the app calls `track()` with a typed event name/props, never a vendor
// SDK directly. Swapping GA4/PostHog/Segment/etc. in later means writing
// one new `AnalyticsProvider` and calling `setAnalyticsProvider()`, not
// touching a single call site.
//
// The default `consoleProvider` is the dev-visible stand-in referenced by
// Part D's "track events" requirement — the same role `trackToolEvent` in
// `crm.ts` already played for the two tools; this module gives that a
// proper home and lets `crm.ts` (and anything else — the consultation
// form, mega-menu clicks) report through the same pipe.

export interface AnalyticsEvent {
  name: string;
  /** Free-form event properties; kept JSON-serializable for any future provider. */
  properties?: Record<string, unknown>;
}

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void | Promise<void>;
}

/** Logs to the console — visible in dev tools and server logs, never sends data anywhere. */
export const consoleProvider: AnalyticsProvider = {
  track(event) {
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${event.name}`, event.properties ?? {});
  },
};

/** Swallows every event — used by tests so specs don't depend on console output. */
export const noopProvider: AnalyticsProvider = {
  track() {},
};

let provider: AnalyticsProvider = process.env.NODE_ENV === 'test' ? noopProvider : consoleProvider;

/** Swap the active provider (e.g. to a real vendor SDK) without touching call sites. */
export function setAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next;
}

export function getAnalyticsProvider(): AnalyticsProvider {
  return provider;
}

/** Fire-and-forget: call sites never await this, matching `trackToolEvent`'s existing `void` usage. */
export async function track(name: string, properties?: Record<string, unknown>): Promise<void> {
  await provider.track({ name, properties });
}

// Key conversions this app tracks today (Part D "track events" + the
// consultation form). Named as constants so call sites and future
// dashboards agree on spelling.
export const ANALYTICS_EVENTS = {
  CALCULATOR_EMAIL_GATE_SUBMITTED: 'calculator_email_gate_submitted',
  LOCATION_REPORT_GATE_SUBMITTED: 'location_report_gate_submitted',
  CONSULTATION_SUBMITTED: 'consultation_submitted',
} as const;
