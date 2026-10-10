import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Visual Screenshots for Essay Presentation', () => {
  const screenshotDir = path.join(process.cwd(), 'screenshots');

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  test('Desktop screenshots (1280x800 - Focused Viewport)', async ({ page }) => {
    // Standard desktop presentation viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // 1. Beranda (Landing page with interactive photo carousel & hero)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Allow carousel to mount cleanly
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-beranda.png'), fullPage: false });

    // 2. Jelajah (Katalog cerita dengan filter kategori & pencarian)
    await page.goto('/jelajah');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-jelajah.png'), fullPage: false });

    // 3. Reader (Pembaca bilingual dengan kontrol mode bahasa & teks berdampingan)
    await page.goto('/cerita/panen-cengkeh-di-pasawahan');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    // Scroll so the reader toolbar and bilingual parallel columns are perfectly framed
    await page.evaluate(() => {
      const el = document.querySelector('[role="toolbar"]');
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.scrollBy(0, -90);
      }
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-reader.png'), fullPage: false });
  });

  test('Mobile screenshots (390x844 - Smartphone Viewport)', async ({ page }) => {
    // Standard modern smartphone viewport (iPhone 14/15/Pixel)
    await page.setViewportSize({ width: 390, height: 844 });

    // 1. Beranda Mobile (Responsive Hero & Story Carousel)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    const berandaScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(berandaScrollWidth).toBeLessThanOrEqual(395);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-beranda.png'), fullPage: false });

    // 2. Jelajah Mobile (Katalog & filter di layar ponsel)
    await page.goto('/jelajah');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    const jelajahScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(jelajahScrollWidth).toBeLessThanOrEqual(395);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-jelajah.png'), fullPage: false });

    // 3. Reader Mobile (Pembaca cerita dengan kontrol & paragraf di ponsel)
    await page.goto('/cerita/panen-cengkeh-di-pasawahan');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    const readerScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(readerScrollWidth).toBeLessThanOrEqual(395);
    // Scroll so the mobile reader controls and stacked bilingual text are nicely framed
    await page.evaluate(() => {
      const el = document.querySelector('[role="toolbar"]');
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.scrollBy(0, -90);
      }
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-reader.png'), fullPage: false });
  });
});
