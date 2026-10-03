import { expect, test, type Page } from '@playwright/test';

/**
 * W7 — motion system guarantees, in a real browser:
 *  1. prefers-reduced-motion: the motion gate is never armed and every
 *     reveal target renders at full opacity with no transform (no content
 *     stranded at opacity 0), and the marquee stops.
 *  2. With motion on: scrolling the whole page reveals every target (again,
 *     nothing stranded) and the page's cumulative layout shift stays ~0.
 */

const REVEAL_TARGETS = '[data-reveal], [data-reveal-stagger] > *';

async function hiddenRevealTargets(page: Page) {
  return page.$$eval(REVEAL_TARGETS, (els) =>
    els
      .filter((el) => (el as HTMLElement).offsetParent !== null)
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.99)
      .map((el) => el.outerHTML.slice(0, 120)),
  );
}

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      // 'instant': the site sets scroll-behavior: smooth, which would
      // otherwise interrupt each programmatic step.
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
  });
}

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  for (const path of ['/', '/how-we-work/build', '/solutions/real-estate']) {
    test(`${path} renders every reveal target visible without scrolling`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();

      const armed = await page.evaluate(() =>
        document.documentElement.classList.contains('sx-motion'),
      );
      expect(armed).toBe(false);

      expect(await page.locator(REVEAL_TARGETS).count()).toBeGreaterThan(0);
      expect(await hiddenRevealTargets(page)).toEqual([]);
    });
  }

  test('the partner band does not auto-scroll', async ({ page }) => {
    await page.goto('/');
    const track = page.locator('.sx-marquee-track').first();
    const animation = await track.evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe('none');
  });
});

test.describe('motion on', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('home: every reveal target ends visible and layout shift stays ~0', async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as {
          value: number;
          hadRecentInput: boolean;
        }[]) {
          if (!entry.hadRecentInput) (window as unknown as { __cls: number }).__cls += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto('/');
    await expect
      .poll(() => page.evaluate(() => document.documentElement.classList.contains('sx-motion')))
      .toBe(true);

    await scrollThrough(page);
    // Longest reveal is 700ms + a 7-step stagger; give it a moment to settle.
    await expect.poll(() => hiddenRevealTargets(page), { timeout: 5_000 }).toEqual([]);

    const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
    expect(cls).toBeLessThan(0.05);
  });

  test('route entrance never blocks navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Estimate your cost' }).click();
    await expect(page).toHaveURL(/\/calculator$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.classList.contains('sx-nav')))
      .toBe(true);
  });
});
