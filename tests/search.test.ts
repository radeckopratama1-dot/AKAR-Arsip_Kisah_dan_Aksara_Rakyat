import { describe, it, expect } from "vitest";
import { SAMPLE_STORIES } from "@/data/stories";
import { filterAndSortStories } from "@/lib/search/storySearch";
import { GLOSSARY_TERMS } from "@/data/glossary";
import { filterGlossaryTerms } from "@/lib/search/glossarySearch";

describe("Story Search and Filter Logic", () => {
  it("should return all stories when query and filters are empty", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, {});
    expect(results.length).toBe(SAMPLE_STORIES.length);
  });

  it("should search case-insensitively by Indonesian title", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { query: "panen" });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].slug).toBe("panen-cengkeh-di-pasawahan");
  });

  it("should search case-insensitively by Sundanese title", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { query: "gunem catur" });
    expect(results.length).toBe(1);
    expect(results[0].slug).toBe("gunem-catur-di-tepas-imah");
  });

  it("should search by region name", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { query: "wanayasa" });
    expect(results.length).toBeGreaterThanOrEqual(2);
  });

  it("should filter by category accurately", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { category: "Gotong Royong" });
    expect(results.length).toBe(1);
    expect(results[0].slug).toBe("sauyunan-ngabersihan-solokan");
  });

  it("should filter by audio availability (hasAudio = true)", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { hasAudio: true });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((s) => {
      expect(Boolean(s.audioSu?.src || s.audioId?.src)).toBe(true);
    });
  });

  it("should filter by audio availability (hasAudio = false)", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { hasAudio: false });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((s) => {
      expect(Boolean(s.audioSu?.src || s.audioId?.src)).toBe(false);
    });
  });

  it("should sort alphabetically by Indonesian title", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { sortBy: "title-id" });
    const titles = results.map((s) => s.titleId);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b, "id"));
    expect(titles).toEqual(sorted);
  });

  it("should sort by reading time ascending", () => {
    const results = filterAndSortStories(SAMPLE_STORIES, { sortBy: "reading-time" });
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].readingTimeMinutes).toBeLessThanOrEqual(results[i + 1].readingTimeMinutes);
    }
  });
});

describe("Glossary Search and Filter Logic", () => {
  it("should filter glossary terms by initial letter", () => {
    const results = filterGlossaryTerms(GLOSSARY_TERMS, { letter: "B" });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((t) => {
      expect(t.termSu.toUpperCase().startsWith("B")).toBe(true);
    });
  });

  it("should search glossary terms by query", () => {
    const results = filterGlossaryTerms(GLOSSARY_TERMS, { query: "sauyunan" });
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("sauyunan");
  });

  it("should search glossary by meaning in Indonesian", () => {
    const results = filterGlossaryTerms(GLOSSARY_TERMS, { query: "bambu" });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });
});
