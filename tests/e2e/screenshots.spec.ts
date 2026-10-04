import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Visual Screenshots Verification', () => {
  const screenshotDir = path.join(process.cwd(), 'screenshots');

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  test('Desktop screenshots (1280x800)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // 1. Beranda
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-beranda.png'), fullPage: true });

    // 2. Jelajah
    await page.goto('/jelajah');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-jelajah.png'), fullPage: true });

    // 3. Reader
    await page.goto('/cerita/panen-cengkeh-di-pasawahan');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-reader.png'), fullPage: true });

    // 4. Glosarium
    await page.goto('/glosarium');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-glosarium.png'), fullPage: true });

    // 5. Metodologi
    await page.goto('/metodologi');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-metodologi.png'), fullPage: true });
  });

  test('Mobile screenshots (360x740) and overflow check', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });

    // 1. Beranda
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const berandaScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(berandaScrollWidth).toBeLessThanOrEqual(365);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-beranda.png'), fullPage: true });

    // 2. Reader
    await page.goto('/cerita/panen-cengkeh-di-pasawahan');
    await page.waitForLoadState('networkidle');
    const readerScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(readerScrollWidth).toBeLessThanOrEqual(365);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-reader.png'), fullPage: true });

    // 3. Kontribusi
    await page.goto('/kontribusi');
    await page.waitForLoadState('networkidle');
    const kontribusiScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(kontribusiScrollWidth).toBeLessThanOrEqual(365);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-kontribusi.png'), fullPage: true });
  });
});
