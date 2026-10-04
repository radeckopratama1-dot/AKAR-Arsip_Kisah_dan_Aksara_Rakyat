const BOOKMARKS_STORAGE_KEY = "akar_bookmarks_v1";
export const BOOKMARKS_CHANGED_EVENT = "akar_bookmarks_changed";

function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__akar_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getBookmarks(): string[] {
  if (!isStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function notifyChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(BOOKMARKS_CHANGED_EVENT));
  }
}

export function isBookmarked(slug: string): boolean {
  const current = getBookmarks();
  return current.includes(slug);
}

export function toggleBookmark(slug: string): boolean {
  if (!isStorageAvailable()) return false;
  const current = getBookmarks();
  const exists = current.includes(slug);
  let updated: string[];

  if (exists) {
    updated = current.filter((s) => s !== slug);
  } else {
    updated = [...current, slug];
  }

  try {
    window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    notifyChange();
    return !exists;
  } catch (err) {
    console.error("Gagal menyimpan bookmark ke penyimpanan lokal:", err);
    return exists;
  }
}

export function removeBookmark(slug: string): void {
  if (!isStorageAvailable()) return;
  const current = getBookmarks();
  const updated = current.filter((s) => s !== slug);
  try {
    window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    notifyChange();
  } catch (err) {
    console.error("Gagal menghapus bookmark:", err);
  }
}

export function clearAllBookmarks(): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(BOOKMARKS_STORAGE_KEY);
    notifyChange();
  } catch (err) {
    console.error("Gagal membersihkan bookmark:", err);
  }
}
