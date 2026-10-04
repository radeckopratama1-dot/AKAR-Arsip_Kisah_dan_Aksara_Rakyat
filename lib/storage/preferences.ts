export type ReadingMode = "bilingual" | "su" | "id";

export interface ReaderPreferences {
  fontSize: number; // 16 to 24 px
  readingMode: ReadingMode;
  focusMode: boolean;
}

const PREFERENCES_KEY = "akar_reader_preferences_v1";

const DEFAULT_PREFERENCES: ReaderPreferences = {
  fontSize: 18,
  readingMode: "bilingual",
  focusMode: false,
};

export function getReaderPreferences(): ReaderPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return {
      fontSize: typeof parsed.fontSize === "number" ? Math.min(Math.max(parsed.fontSize, 16), 24) : 18,
      readingMode: ["bilingual", "su", "id"].includes(parsed.readingMode) ? parsed.readingMode : "bilingual",
      focusMode: Boolean(parsed.focusMode),
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveReaderPreferences(prefs: Partial<ReaderPreferences>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getReaderPreferences();
    const updated = { ...current, ...prefs };
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Gagal menyimpan preferensi membaca:", err);
  }
}
