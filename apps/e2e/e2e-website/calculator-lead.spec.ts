import { expect, test } from '@playwright/test';

/**
 * Journey 1 (W9): home -> GCC Planner -> adjust the profile -> "Send me
 * the full plan" (required full name / work email / company) -> lead
 * submitted with the profile, confirmation shown.
 *
 * The planner's defaults (US HQ / USD, 150 seats, 12-month ramp,
 * 50/20/20/10 mix, Balanced, BOT, recommended city) render the full result
 * with no gating.
 */
test('home to planner to prefilled contact form', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.getByRole('link', { name: 'Estimate your cost' }).click();
  await expect(page).toHaveURL(/\/calculator$/);
  await expect(
    page.getByRole('heading', { name: 'Plan your centre in a minute, not a quarter.' }),
  ).toBeVisible();

  // The defaults produce the full result surface immediately — no gate.
  await expect(page.getByText('Three-year saving vs. home market')).toBeVisible();
  await expect(page.getByText('City fit for this profile')).toBeVisible();
  await expect(page.getByText('Launch timeline, weeks')).toBeVisible();
  await expect(page.getByText('Full strength in')).toBeVisible();

  // Managed seats swaps the entity phase out of the timeline.
  await page.getByRole('button', { name: 'Managed seats' }).click();
  await expect(page.getByText('Managed seats ready')).toBeVisible();

  // An explicit city pick drives the costs and is called out against the
  // recommendation.
  await page.getByRole('button', { name: 'Mumbai' }).click();
  await expect(page.getByText(/You chose Mumbai\. Costs above use it\./)).toBeVisible();

  // The plan form requires its three fields before it will submit.
  const planForm = page.getByRole('form', { name: 'Send me the full plan' });
  await page.getByRole('button', { name: /Send me the full plan/ }).click();
  await expect(page.getByText('Full name is required.')).toBeVisible();

  // A valid submission posts the lead (console-logging stub) and confirms.
  await planForm.getByLabel('Full name').fill('Ada Lovelace');
  await planForm.getByLabel('Work email').fill(`e2e-${Date.now()}@scaleax-e2e.test`);
  await planForm.getByLabel('Company').fill('E2E Testing Co');
  await page.getByRole('button', { name: /Send me the full plan/ }).click();
  await expect(page.getByText('Thank you — your plan is on its way.')).toBeVisible();
});
