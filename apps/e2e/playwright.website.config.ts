import { defineConfig, devices } from '@playwright/test';

/**
 * Separate config for @scaleax/website (kept apart from playwright.config.ts
 * so the auth-flow project's Postgres/Redis/auth-service/gateway webServer
 * stack stays untouched — see the Monorepo gotcha in
 * docs/SCALEAX_IMPLEMENTATION_MAP.md §2A: @playwright/test must never
 * become a dependency of any package that depends on `next`, so this lives
 * here in @scaleax/e2e like the auth-flow spec does).
 *
 * No database or backend service is needed: the website's lead/consultation
 * API routes are self-contained stubs (console-logged, no Prisma/Kafka), so
 * this config only ever boots `next build && next start` for the website
 * itself, on a non-default 43xxx port (this machine runs other stacks on
 * the common ports).
 */
const WEBSITE_PORT = Number(process.env.E2E_WEBSITE_PORT ?? 43200);
const baseURL = process.env.E2E_WEBSITE_BASE_URL ?? `http://127.0.0.1:${WEBSITE_PORT}`;

export default defineConfig({
  testDir: './e2e-website',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never', outputFolder: 'website-playwright-report' }]]
    : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    name: 'website',
    cwd: '../website',
    command: 'pnpm build && E2E_WEBSITE_PORT=' + WEBSITE_PORT + ' pnpm start:e2e',
    url: `http://127.0.0.1:${WEBSITE_PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: { PORT: String(WEBSITE_PORT) },
  },
});
