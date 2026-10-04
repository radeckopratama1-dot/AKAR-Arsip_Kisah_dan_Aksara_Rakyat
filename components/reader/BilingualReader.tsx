"use client";

import React, { useState } from "react";
import { Story, ParagraphPair } from "@/types/story";
import { GlossaryTerm } from "@/types/glossary";
import { ReadingMode } from "@/lib/storage/preferences";
import { GlossaryModal } from "./GlossaryModal";
import { Sparkles } from "lucide-react";

interface BilingualReaderProps {
  story: Story;
  readingMode: ReadingMode;
  fontSize: number;
  currentTime?: number;
  glossaryTerms: GlossaryTerm[];
}

export function BilingualReader({
  story,
  readingMode,
  fontSize,
  currentTime = 0,
  glossaryTerms,
}: BilingualReaderProps) {
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [activeTrigger, setActiveTrigger] = useState<HTMLElement | null>(null);

  // Helper to find term by id or name
  function getTermForWord(word: string): GlossaryTerm | undefined {
    const clean = word.toLowerCase().replace(/[^a-z0-9-]/g, "");
    return glossaryTerms.find(
      (t) =>
        t.termSu.toLowerCase() === clean ||
        t.id.toLowerCase() === clean ||
        t.termSu.toLowerCase().includes(clean)
    );
  }

  // Render text with interactive glossary buttons
  function renderWithGlossary(text: string, isSunda: boolean) {
    if (!isSunda) {
      return text;
    }

    // Split words while preserving spaces and punctuation
    const tokens = text.split(/(\s+|[.,;!?()]+)/);

    return tokens.map((token, index) => {
      const match = getTermForWord(token);
      if (match) {
        return (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSelectedTerm(match);
              setActiveTrigger(e.currentTarget);
            }}
            className="glossary-trigger inline-flex items-center gap-0.5 rounded px-1 -mx-0.5"
            aria-label={`Buka penjelasan kosakata Sunda untuk ${token}`}
            title="Klik untuk melihat penjelasan kosakata"
          >
            <span>{token}</span>
            <Sparkles className="w-2.5 h-2.5 text-terracotta/70 inline" aria-hidden="true" />
          </button>
        );
      }
      return token;
    });
  }

  return (
    <div className="w-full flex flex-col gap-6" role="region" aria-label="Naskah Cerita">
      {/* Column Headers in bilingual mode on desktop */}
      {readingMode === "bilingual" && (
        <div className="hidden md:grid md:grid-cols-2 gap-8 px-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-forest" aria-hidden="true" />
            <span>Teks Asli Basa Sunda</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta" aria-hidden="true" />
            <span>Terjemahan Bahasa Indonesia</span>
          </div>
        </div>
      )}

      {/* Paragraph pairs list */}
      <div className="flex flex-col gap-8">
        {story.paragraphs.map((pair, index) => {
          const isAudioActive =
            typeof pair.audioStart === "number" &&
            typeof pair.audioEnd === "number" &&
            currentTime >= pair.audioStart &&
            currentTime < pair.audioEnd;

          return (
            <div
              key={pair.id}
              id={`paragraph-pair-${pair.id}`}
              className={`p-5 sm:p-7 rounded-2xl transition-all duration-300 ${
                isAudioActive
                  ? "bg-forest/5 border-2 border-forest shadow-sm"
                  : "bg-surface border border-[#23483D]/10 hover:border-[#23483D]/25"
              }`}
            >
              {/* Paragraph number indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-background text-ink-muted">
                  Bagian {index + 1}
                </span>

                {isAudioActive && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest">
                    <span className="w-2 h-2 rounded-full bg-forest animate-ping" aria-hidden="true" />
                    <span>Sedang diputar</span>
                  </span>
                )}
              </div>

              {/* Mode: Bilingual */}
              {readingMode === "bilingual" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Sunda Text */}
                  <div className="flex flex-col">
                    <span className="md:hidden text-[11px] font-semibold uppercase tracking-wider text-forest mb-1.5">
                      Basa Sunda:
                    </span>
                    <p
                      lang="su"
                      style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
                      className="font-serif text-ink tracking-normal"
                    >
                      {renderWithGlossary(pair.su, true)}
                    </p>
                  </div>

                  {/* Indonesian Text */}
                  <div className="flex flex-col pt-4 md:pt-0 border-t md:border-t-0 border-[#23483D]/10">
                    <span className="md:hidden text-[11px] font-semibold uppercase tracking-wider text-terracotta mb-1.5">
                      Bahasa Indonesia:
                    </span>
                    <p
                      lang="id"
                      style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
                      className="text-ink-muted tracking-normal"
                    >
                      {pair.idText}
                    </p>
                  </div>
                </div>
              )}

              {/* Mode: Sunda Only */}
              {readingMode === "su" && (
                <div className="flex flex-col">
                  <p
                    lang="su"
                    style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
                    className="font-serif text-ink max-w-[65ch]"
                  >
                    {renderWithGlossary(pair.su, true)}
                  </p>
                </div>
              )}

              {/* Mode: Indonesia Only */}
              {readingMode === "id" && (
                <div className="flex flex-col">
                  <p
                    lang="id"
                    style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
                    className="text-ink max-w-[65ch]"
                  >
                    {pair.idText}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Accessible Contextual Glossary Modal */}
      <GlossaryModal
        term={selectedTerm}
        isOpen={Boolean(selectedTerm)}
        onClose={() => setSelectedTerm(null)}
        triggerElement={activeTrigger}
      />
    </div>
  );
}
