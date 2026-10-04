"use client";

import React, { useState } from "react";
import { Type, Eye, EyeOff, Share2, Bookmark, Check } from "lucide-react";
import { ReadingMode } from "@/lib/storage/preferences";

interface ReaderControlsProps {
  readingMode: ReadingMode;
  onReadingModeChange: (mode: ReadingMode) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  focusMode: boolean;
  onFocusModeChange: (focus: boolean) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  title: string;
}

export function ReaderControls({
  readingMode,
  onReadingModeChange,
  fontSize,
  onFontSizeChange,
  focusMode,
  onFocusModeChange,
  isBookmarked,
  onToggleBookmark,
  title,
}: ReaderControlsProps) {
  const [copied, setCopied] = useState(false);

  function handleShare() {
    if (typeof window === "undefined") return;
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch((err) => {
        console.error("Gagal menyalin tautan:", err);
      });
  }

  return (
    <div
      className="p-3 sm:p-4 rounded-2xl bg-surface border border-[#23483D]/12 shadow-soft flex flex-wrap items-center justify-between gap-3 sm:gap-4 sticky top-24 z-30 backdrop-blur-md w-full min-w-0"
      role="toolbar"
      aria-label="Kontrol Pembaca Cerita"
    >
      {/* Mode Switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-background border border-[#23483D]/10" role="group" aria-label="Mode Bahasa Pembaca">
        <button
          type="button"
          onClick={() => onReadingModeChange("bilingual")}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            readingMode === "bilingual"
              ? "bg-forest text-white shadow-xs"
              : "text-ink-muted hover:text-ink"
          }`}
          aria-pressed={readingMode === "bilingual"}
        >
          Dua Bahasa
        </button>
        <button
          type="button"
          onClick={() => onReadingModeChange("su")}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            readingMode === "su"
              ? "bg-forest text-white shadow-xs"
              : "text-ink-muted hover:text-ink"
          }`}
          aria-pressed={readingMode === "su"}
        >
          Basa Sunda
        </button>
        <button
          type="button"
          onClick={() => onReadingModeChange("id")}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            readingMode === "id"
              ? "bg-forest text-white shadow-xs"
              : "text-ink-muted hover:text-ink"
          }`}
          aria-pressed={readingMode === "id"}
        >
          B. Indonesia
        </button>
      </div>

      {/* Font Size & Focus Mode & Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Font size adjustment */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-background px-1.5 sm:px-2 py-1 rounded-xl border border-[#23483D]/10">
          <Type className="w-3.5 h-3.5 text-forest ml-1 mr-0.5" aria-hidden="true" />
          <button
            type="button"
            onClick={() => onFontSizeChange(Math.max(16, fontSize - 2))}
            disabled={fontSize <= 16}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold text-ink-muted hover:text-forest disabled:opacity-30 transition-colors flex items-center justify-center"
            aria-label="Perkecil ukuran teks"
            title="Perkecil teks"
          >
            A-
          </button>
          <span className="text-xs font-mono font-medium text-ink w-6 sm:w-7 text-center">
            {fontSize}
          </span>
          <button
            type="button"
            onClick={() => onFontSizeChange(Math.min(24, fontSize + 2))}
            disabled={fontSize >= 24}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold text-ink-muted hover:text-forest disabled:opacity-30 transition-colors flex items-center justify-center"
            aria-label="Perbesar ukuran teks"
            title="Perbesar teks"
          >
            A+
          </button>
        </div>

        {/* Focus mode toggle */}
        <button
          type="button"
          onClick={() => onFocusModeChange(!focusMode)}
          className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors touch-target ${
            focusMode
              ? "bg-forest text-white"
              : "bg-background text-ink-muted hover:text-ink border border-[#23483D]/10"
          }`}
          aria-pressed={focusMode}
          title={focusMode ? "Matikan mode fokus" : "Aktifkan mode fokus membaca"}
        >
          {focusMode ? (
            <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Eye className="w-3.5 h-3.5 text-forest" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">Fokus</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="p-2 rounded-xl bg-background text-ink-muted hover:text-ink border border-[#23483D]/10 transition-colors touch-target relative"
          aria-label="Salin tautan cerita ini"
          title="Salin tautan"
        >
          {copied ? (
            <Check className="w-4 h-4 text-forest" aria-hidden="true" />
          ) : (
            <Share2 className="w-4 h-4" aria-hidden="true" />
          )}
          {copied && (
            <span
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-forest text-white text-[10px] whitespace-nowrap shadow-sm"
              role="status"
            >
              Tautan disalin!
            </span>
          )}
        </button>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={onToggleBookmark}
          className={`p-2 rounded-xl transition-colors touch-target ${
            isBookmarked
              ? "bg-terracotta text-white shadow-xs"
              : "bg-background text-ink-muted hover:text-terracotta border border-[#23483D]/10"
          }`}
          aria-label={isBookmarked ? "Hapus dari koleksi tersimpan" : "Simpan ke koleksi"}
          title={isBookmarked ? "Tersimpan di koleksi" : "Simpan ke koleksi"}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
