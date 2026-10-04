"use client";

import React, { useEffect, useRef } from "react";
import { X, Sparkles, AlertCircle } from "lucide-react";
import { GlossaryTerm } from "@/types/glossary";

interface GlossaryModalProps {
  term: GlossaryTerm | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export function GlossaryModal({ term, isOpen, onClose, triggerElement }: GlossaryModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (triggerElement) {
        triggerElement.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerElement]);

  if (!isOpen || !term) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="glossary-term-title"
        aria-describedby="glossary-term-meaning"
        className="relative w-full max-w-lg bg-surface rounded-card p-6 sm:p-8 border border-[#23483D]/15 shadow-lifted flex flex-col gap-5 animate-in zoom-in-95 duration-200"
      >
        {/* Header: Term, review badge, close button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Kosakata Kontekstual Sunda
              </span>
            </div>
            <h2
              id="glossary-term-title"
              className="font-serif text-2xl sm:text-3xl font-bold text-forest capitalize"
            >
              {term.termSu}
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-ink-muted hover:text-ink hover:bg-forest/10 transition-colors touch-target focus-visible:outline-forest"
            aria-label="Tutup jendela kosakata"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Status badge: Clearly marks if not yet reviewed */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              term.reviewStatus === "Telah ditinjau penutur"
                ? "bg-forest/10 text-forest"
                : "bg-terracotta/10 text-terracotta"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Status: {term.reviewStatus}</span>
          </span>
        </div>

        {/* Meaning in Indonesian */}
        <div className="p-4 rounded-xl bg-background border border-[#23483D]/10">
          <span className="text-xs font-semibold text-ink-muted block mb-1">
            Makna dalam Bahasa Indonesia:
          </span>
          <p id="glossary-term-meaning" className="text-base text-ink leading-relaxed">
            {term.meaningId}
          </p>
        </div>

        {/* Example Sentences */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-ink-muted">Contoh Penggunaan:</span>
          <div className="p-3.5 rounded-xl bg-forest/5 border-l-4 border-forest">
            <p className="font-serif italic text-sm text-forest" lang="su">
              &ldquo;{term.exampleSentenceSu}&rdquo;
            </p>
            <p className="text-xs text-ink-muted mt-1" lang="id">
              Artinya: {term.exampleSentenceId}
            </p>
          </div>
        </div>

        {/* Contextual cultural notes if present */}
        {term.notes && (
          <div className="text-xs text-ink-muted leading-relaxed">
            <span className="font-semibold text-ink">Catatan Budaya:</span> {term.notes}
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-forest text-white font-medium text-sm hover:bg-forest-dark transition-colors touch-target"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
