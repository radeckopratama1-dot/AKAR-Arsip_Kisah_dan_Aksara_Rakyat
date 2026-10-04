import { describe, it, expect, beforeEach } from "vitest";
import {
  getBookmarks,
  toggleBookmark,
  isBookmarked,
  removeBookmark,
  clearAllBookmarks,
} from "@/lib/storage/bookmarks";
import {
  getReaderPreferences,
  saveReaderPreferences,
} from "@/lib/storage/preferences";

describe("LocalStorage Bookmarks Helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty array initially", () => {
    expect(getBookmarks()).toEqual([]);
  });

  it("should add a bookmark when toggled", () => {
    const slug = "panen-cengkeh-di-pasawahan";
    const added = toggleBookmark(slug);
    expect(added).toBe(true);
    expect(isBookmarked(slug)).toBe(true);
    expect(getBookmarks()).toEqual([slug]);
  });

  it("should remove bookmark when toggled again", () => {
    const slug = "panen-cengkeh-di-pasawahan";
    toggleBookmark(slug);
    const removed = toggleBookmark(slug);
    expect(removed).toBe(false);
    expect(isBookmarked(slug)).toBe(false);
    expect(getBookmarks()).toEqual([]);
  });

  it("should remove a specific bookmark", () => {
    toggleBookmark("story-1");
    toggleBookmark("story-2");
    removeBookmark("story-1");
    expect(getBookmarks()).toEqual(["story-2"]);
  });

  it("should clear all bookmarks", () => {
    toggleBookmark("story-1");
    toggleBookmark("story-2");
    clearAllBookmarks();
    expect(getBookmarks()).toEqual([]);
  });
});

describe("Reader Preferences Helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return default preferences if empty", () => {
    const prefs = getReaderPreferences();
    expect(prefs.fontSize).toBe(18);
    expect(prefs.readingMode).toBe("bilingual");
    expect(prefs.focusMode).toBe(false);
  });

  it("should save and restore preferences within bounds", () => {
    saveReaderPreferences({ fontSize: 22, readingMode: "su", focusMode: true });
    const prefs = getReaderPreferences();
    expect(prefs.fontSize).toBe(22);
    expect(prefs.readingMode).toBe("su");
    expect(prefs.focusMode).toBe(true);
  });

  it("should clamp font size between 16 and 24", () => {
    saveReaderPreferences({ fontSize: 40 });
    expect(getReaderPreferences().fontSize).toBe(24);

    saveReaderPreferences({ fontSize: 10 });
    expect(getReaderPreferences().fontSize).toBe(16);
  });
});
