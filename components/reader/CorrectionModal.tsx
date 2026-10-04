"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Download, AlertCircle } from "lucide-react";
import { Story, ParagraphPair } from "@/types/story";
import { CorrectionProposal } from "@/types/contribution";
import { correctionSchema, CorrectionFormValues } from "@/lib/validation/correctionSchema";

interface CorrectionModalProps {
  story: Story;
  paragraph?: ParagraphPair | null;
  isOpen: boolean;
  onClose: () => void;
}

const CORRECTIONS_STORAGE_KEY = "akar_corrections_v1";

export function CorrectionModal({
  story,
  paragraph,
  isOpen,
  onClose,
}: CorrectionModalProps) {
  const [selectedParagraphId, setSelectedParagraphId] = useState(
    paragraph?.id || story.paragraphs[0]?.id || "p1"
  );
  const [correctionType, setCorrectionType] = useState<CorrectionFormValues["correctionType"]>(
    "Ejaan Bahasa Sunda"
  );
  const [suggestedText, setSuggestedText] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedProposal, setSavedProposal] = useState<CorrectionProposal | null>(null);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const activePair = story.paragraphs.find((p) => p.id === selectedParagraphId);

  useEffect(() => {
    if (paragraph) {
      setSelectedParagraphId(paragraph.id);
    }
  }, [paragraph]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setIsSuccess(false);
      setErrors({});
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const formData = {
      storyId: story.id,
      storyTitle: story.titleId,
      paragraphId: selectedParagraphId,
      correctionType,
      originalText: activePair?.su || "",
      suggestedText,
      notes,
    };

    const result = correctionSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);

      // Focus first error
      const firstKey = Object.keys(fieldErrors)[0];
      const targetElement = formRef.current?.querySelector(`[name="${firstKey}"]`) as HTMLElement;
      targetElement?.focus();
      return;
    }

    // Save proposal to browser localStorage
    const newProposal: CorrectionProposal = {
      id: `corr-${Date.now()}`,
      storyId: story.id,
      storyTitle: story.titleId,
      paragraphId: selectedParagraphId,
      correctionType,
      originalText: activePair?.su || "",
      suggestedText,
      notes,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(CORRECTIONS_STORAGE_KEY) || "[]");
      existing.push(newProposal);
      localStorage.setItem(CORRECTIONS_STORAGE_KEY, JSON.stringify(existing));
      setSavedProposal(newProposal);
      setIsSuccess(true);
    } catch (err) {
      console.error("Gagal menyimpan koreksi lokal:", err);
    }
  }

  function handleExportJSON() {
    if (!savedProposal) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedProposal, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `koreksi-${story.slug}-${savedProposal.paragraphId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="correction-dialog-title"
        className="relative w-full max-w-xl bg-surface rounded-card p-6 sm:p-8 border border-[#23483D]/15 shadow-lifted flex flex-col gap-6 my-8 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="correction-dialog-title" className="font-serif text-2xl font-bold text-forest">
              Usulkan Koreksi Teks
            </h2>
            <p className="text-xs text-ink-muted mt-1">
              Cerita: <span className="font-semibold text-ink">{story.titleId}</span> ({story.titleSu})
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-ink-muted hover:text-ink hover:bg-forest/10 transition-colors touch-target"
            aria-label="Tutup jendela usulan koreksi"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Demo transparency banner */}
        <div className="p-3.5 rounded-xl bg-forest/5 border border-forest/20 text-xs text-forest flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-semibold block">Pemberitahuan Demo Lokal:</span>
            Usulan koreksi yang Anda masukkan tersimpan di penyimpanan peramban lokal perangkat ini untuk keperluan simulasi prototipe dan dapat diekspor sebagai berkas JSON.
          </div>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-forest/5 border border-forest/20 flex flex-col items-center text-center gap-4">
            <CheckCircle2 className="w-12 h-12 text-forest" aria-hidden="true" />
            <div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Koreksi Tersimpan di Perangkat Ini
              </h3>
              <p className="text-xs text-ink-muted mt-1 max-w-md">
                Data usulan telah dicatat di peramban lokal. Belum dikirim kepada pengelola karena prototipe beroperasi tanpa backend server.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="px-4 py-2 rounded-full bg-forest text-white text-xs font-semibold flex items-center gap-2 hover:bg-forest-dark transition-colors touch-target"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Unduh Berkas JSON</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-surface border border-[#23483D]/20 text-xs font-semibold text-ink hover:bg-background transition-colors touch-target"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Paragraph selector */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="paragraph-select" className="text-xs font-semibold text-ink">
                Pilih Paragraf yang Dikoreksi:
              </label>
              <select
                id="paragraph-select"
                value={selectedParagraphId}
                onChange={(e) => setSelectedParagraphId(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink font-medium focus:outline-none focus:border-forest"
              >
                {story.paragraphs.map((p, idx) => (
                  <option key={p.id} value={p.id}>
                    Paragraf {idx + 1}: {p.su.slice(0, 45)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Original paragraph snippet */}
            {activePair && (
              <div className="p-3.5 rounded-xl bg-background border border-[#23483D]/10 text-xs flex flex-col gap-1">
                <span className="font-semibold text-ink-muted">Teks Asli Saat Ini:</span>
                <p className="font-serif italic text-ink" lang="su">
                  &ldquo;{activePair.su}&rdquo;
                </p>
              </div>
            )}

            {/* Correction Type */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="correction-type-select" className="text-xs font-semibold text-ink">
                Jenis Usulan Koreksi:
              </label>
              <select
                id="correction-type-select"
                value={correctionType}
                onChange={(e) => setCorrectionType(e.target.value as any)}
                className="px-3.5 py-2.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink font-medium focus:outline-none focus:border-forest"
              >
                <option value="Ejaan Bahasa Sunda">Ejaan Bahasa Sunda (Undak Usuk / Aksara)</option>
                <option value="Ketepatan Terjemahan">Ketepatan Terjemahan ke Bahasa Indonesia</option>
                <option value="Konteks Budaya">Konteks Budaya Lokal Purwakarta</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Suggested Text Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="suggested-text" className="text-xs font-semibold text-ink">
                Teks Usulan Perbaikan <span className="text-terracotta">*</span>
              </label>
              <textarea
                id="suggested-text"
                name="suggestedText"
                rows={3}
                value={suggestedText}
                onChange={(e) => setSuggestedText(e.target.value)}
                placeholder="Tuliskan kalimat atau ejaan yang Anda usulkan..."
                className="w-full p-3 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                aria-invalid={Boolean(errors.suggestedText)}
                aria-describedby={errors.suggestedText ? "suggested-text-error" : undefined}
              />
              {errors.suggestedText && (
                <p id="suggested-text-error" className="text-xs text-terracotta font-medium">
                  {errors.suggestedText}
                </p>
              )}
            </div>

            {/* Notes Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="correction-notes" className="text-xs font-semibold text-ink">
                Alasan atau Catatan Tambahan (Opsional):
              </label>
              <textarea
                id="correction-notes"
                name="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misalnya: Dialek yang lazim di daerah Wanayasa menggunakan kata..."
                className="w-full p-3 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-surface border border-[#23483D]/20 text-xs font-semibold text-ink hover:bg-background transition-colors touch-target"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-forest text-white text-xs font-semibold hover:bg-forest-dark transition-colors touch-target shadow-sm"
              >
                Simpan Usulan Koreksi
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
