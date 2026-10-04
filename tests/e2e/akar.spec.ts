import { test, expect } from "@playwright/test";

test.describe("AKAR E2E Test Suite", () => {
  test("1. Beranda loads properly with single H1 and navigates to catalog", async ({ page }) => {
    await page.goto("/");
    // Check single H1
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Cerita berakar, budaya tetap hidup.");

    // Check CTA link
    const cta = page.getByRole("link", { name: "Jelajahi Cerita" }).first();
    await cta.click();
    await expect(page).toHaveURL(/.*\/jelajah/);
    await expect(page.locator("h1")).toContainText("Katalog Cerita Lokal Purwakarta");
  });

  test("2. Catalog search and filtering works correctly", async ({ page }) => {
    await page.goto("/jelajah");
    // Count initial cards (6)
    const cards = page.locator("article");
    await expect(cards).toHaveCount(6);

    // Filter by Gotong Royong
    await page.getByRole("button", { name: "Gotong Royong" }).click();
    await expect(page).toHaveURL(/.*kategori=Gotong/);
    await expect(page.locator("article")).toHaveCount(1);
    await expect(page.locator("article h3")).toContainText("Kebersamaan Membersihkan Saluran Air");

    // Clear filters
    await page.getByRole("button", { name: "Hapus Semua Filter" }).click();
    await expect(page.locator("article")).toHaveCount(6);

    // Search query
    const searchInput = page.getByRole("searchbox");
    await searchInput.fill("Wanayasa");
    await expect(page).toHaveURL(/.*q=Wanayasa/);
    // Should match stories from Wanayasa
    const filteredCount = await page.locator("article").count();
    expect(filteredCount).toBeGreaterThanOrEqual(1);
  });

  test("3. Bilingual Reader modes, audio status, and glossary modal", async ({ page }) => {
    // Open story 1 (with audio)
    await page.goto("/cerita/panen-cengkeh-di-pasawahan");
    await expect(page.locator("h1")).toContainText("Panen Cengkih di Pasawahan");

    // Check Audio Player is rendered with audio track
    await expect(page.getByRole("region", { name: /Pemutar audio/i })).toBeVisible();

    // Check Reading mode switcher
    const suOnlyBtn = page.getByRole("button", { name: "Basa Sunda" });
    await suOnlyBtn.click();
    await expect(suOnlyBtn).toHaveAttribute("aria-pressed", "true");

    const idOnlyBtn = page.getByRole("button", { name: "B. Indonesia" });
    await idOnlyBtn.click();
    await expect(idOnlyBtn).toHaveAttribute("aria-pressed", "true");

    const bilingualBtn = page.getByRole("button", { name: "Dua Bahasa" });
    await bilingualBtn.click();
    await expect(bilingualBtn).toHaveAttribute("aria-pressed", "true");

    // Contextual glossary term click
    const glossaryButton = page.locator(".glossary-trigger").first();
    await expect(glossaryButton).toBeVisible();
    await glossaryButton.click();

    // Verify modal dialog appears
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await expect(modal.locator("h2")).toBeVisible();

    // Close modal via Escape key
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();

    // Check Story without audio (story-2)
    await page.goto("/cerita/gunem-catur-di-tepas-imah");
    await expect(page.getByText("Rekaman belum tersedia.")).toBeVisible();
  });

  test("4. Bookmark functionality persists after reload", async ({ page }) => {
    await page.goto("/jelajah");
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    // Click bookmark on first card
    const firstBookmarkBtn = page.locator("article button[aria-label*='Simpan bookmark']").first();
    await firstBookmarkBtn.click();

    // Navigate to /koleksi
    await page.goto("/koleksi");
    await expect(page.locator("h1")).toContainText("Koleksi Cerita Tersimpan");

    // Card should appear in collection
    const savedCards = page.locator("article");
    await expect(savedCards).toHaveCount(1);

    // Reload page to verify persistence
    await page.reload();
    await expect(page.locator("article")).toHaveCount(1);

    // Delete bookmark
    const removeBtn = page.getByRole("button", { name: "Hapus Seluruh Koleksi" });
    page.on("dialog", (dialog) => dialog.accept());
    await removeBtn.click();

    // Empty state should appear
    await expect(page.getByText("Belum Ada Cerita yang Disimpan")).toBeVisible();
  });

  test("5. Multi-step contribution form validation and local draft save", async ({ page }) => {
    await page.goto("/kontribusi");
    await expect(page.locator("h1")).toContainText("Bagikan Cerita Lokal");

    // Try clicking Lanjutkan with empty fields to trigger validation
    await page.getByRole("button", { name: "Lanjutkan" }).click();

    // Validation errors should be visible and input kept
    await expect(page.getByText("Judul bahasa Sunda wajib diisi")).toBeVisible();
    await expect(page.getByText("Judul bahasa Indonesia wajib diisi")).toBeVisible();

    // Fill valid Step 1
    await page.locator("#titleSu").fill("Carita Cai Herang");
    await page.locator("#titleId").fill("Cerita Air Jernih");
    await page.locator("#region").fill("Wanayasa");
    await page.locator("#summary").fill("Ringkasan singkat carita cai herang di Wanayasa.");

    await page.getByRole("button", { name: "Lanjutkan" }).click();

    // Step 2 should be active
    await expect(page.getByText("Tahap 2: Isi Teks & Rekaman Audio")).toBeVisible();

    // Fill valid Step 2
    await page.locator("#contentSu").fill("Dina mangsa katiga warga Wanayasa tetep ngajaga sumber cai sangkan walungan beresih.");
    await page.getByRole("button", { name: "Lanjutkan" }).click();

    // Step 3 should be active
    await expect(page.getByText("Tahap 3: Sumber, Atribusi & Persetujuan")).toBeVisible();

    // Fill valid Step 3
    await page.locator("#contributorName").fill("Warga Wanayasa");
    await page.locator("#consentStatement").fill("Narasumber parantos masihan idin kalawan ikhlas kanggo dokumentasi.");
    await page.locator("input[name='sensitiveContentExcludedDeclaration']").check();

    await page.getByRole("button", { name: "Lanjutkan" }).click();

    // Step 4 Review
    await expect(page.getByText("Tahap 4: Tinjau Masukan")).toBeVisible();
    await expect(page.getByText("Carita Cai Herang", { exact: true })).toBeVisible();

    // Final Save
    await page.getByRole("button", { name: "Simpan Kontribusi di Perangkat" }).click();
    await expect(page.getByText("Kontribusi Tersimpan di Perangkat Ini")).toBeVisible();
  });

  test("6. Methodology and Privacy pages are clear and complete", async ({ page }) => {
    await page.goto("/metodologi");
    await expect(page.locator("h1")).toContainText("Metodologi Dokumentasi Cerita");
    await expect(page.getByText("Persetujuan Narasumber (Consent)")).toBeVisible();

    await page.goto("/privasi");
    await expect(page.locator("h1")).toContainText("Privasi & Batas Penyimpanan Demo");
    await expect(page.getByText("Penyimpanan Terisolasi di Peramban Lokal")).toBeVisible();
  });
});
