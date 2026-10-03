import { expect, test } from '@playwright/test';

/**
 * Journey 2 (W6, W8 nav): home -> "What we offer" mega menu -> a solution
 * page -> contact form submit. Exercises the keyboard/pointer-accessible
 * mega menu (nav-menu.tsx) and the shared consultation form reused on
 * /contact (Section 11 / PAGE B18).
 */
test('home to solutions mega menu to solution page to contact submit', async ({ page }) => {
  await page.goto('/');

  const solutionsTrigger = page.getByRole('button', { name: 'What we offer' });
  await solutionsTrigger.click();
  await expect(solutionsTrigger).toHaveAttribute('aria-expanded', 'true');

  const solutionsMenu = page.getByRole('menu', { name: 'What we offer' });
  await expect(solutionsMenu).toBeVisible();
  await solutionsMenu.getByRole('menuitem', { name: /Real estate and workspace/i }).click();

  await expect(page).toHaveURL(/\/solutions\/real-estate$/);
  await expect(
    page.getByRole('heading', { name: 'Start in a managed office. Grow into your own.' }),
  ).toBeVisible();

  await page
    .getByRole('contentinfo')
    .getByRole('link', { name: 'Contact us', exact: true })
    .click();
  await expect(page).toHaveURL(/\/contact$/);

  await page.getByLabel('Full name', { exact: false }).fill('Grace Hopper');
  await page.getByLabel('Company', { exact: false }).fill('E2E Testing Co');
  await page.getByLabel('Work email', { exact: false }).fill(`e2e-${Date.now()}@scaleax-e2e.test`);
  await page.getByLabel('Country', { exact: false }).fill('United States');

  await page.getByRole('button', { name: 'Book a consultation' }).click();

  // /api/consultation is a validating, console-logging stub — no DB or CRM
  // involved — so a real submit reaches the success state.
  await expect(page.getByRole('status')).toContainText('Thank you.');
});
