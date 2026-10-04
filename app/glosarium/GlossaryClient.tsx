"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, Sparkles, BookOpen, AlertCircle, ArrowUpRight } from "lucide-react";
import { GlossaryTerm } from "@/types/glossary";
import { filterGlossaryTerms } from "@/lib/search/glossarySearch";
import { GlossaryModal } from "@/components/reader/GlossaryModal";

interface GlossaryClientProps {
  initialTerms: GlossaryTerm[];
  letters: string[];
}

export function GlossaryClient({ initialTerms, letters }: GlossaryClientProps) {
  const [query, setQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("Semua");
  const [selectedModalTerm, setSelectedModalTerm] = useState<GlossaryTerm | null>(null);

  const filtered = filterGlossaryTerms(initialTerms, {
    query,
    letter: selectedLetter,
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Search & Letter Filter Card */}
      <div className="p-6 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col gap-5">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="glossary-search" className="sr-only">
            Cari istilah basa Sunda atau maknanya
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kata Sunda (misal: hanca, sauyunan, boboko) atau artinya..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-muted hover:text-ink touch-target"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Letter chips */}
        <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter berdasarkan huruf awal">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1">
            Huruf:
          </span>
          <button
            type="button"
            onClick={() => setSelectedLetter("Semua")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors touch-target ${
              selectedLetter === "Semua"
                ? "bg-forest text-white"
                : "bg-background text-ink-muted hover:text-ink"
            }`}
          >
            Semua ({initialTerms.length})
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors touch-target ${
                selectedLetter === letter
                  ? "bg-forest text-white"
                  : "bg-background text-ink-muted hover:text-ink"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Result Counter & Prototype Note */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-muted px-1">
        <span>
          Menampilkan <strong className="text-forest">{filtered.length}</strong> istilah dari total {initialTerms.length} kosakata contoh
        </span>
        <span className="text-[11px] text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full font-medium">
          Draf kosakata contoh, belum ditinjau ahli leksikografi
        </span>
      </div>

      {/* Terms Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
          {filtered.map((term) => (
            <article
              key={term.id}
              role="listitem"
              className="p-6 rounded-card bg-surface border border-[#23483D]/10 shadow-soft hover:shadow-lifted transition-all flex flex-col justify-between gap-5 group"
            >
              <div className="flex flex-col gap-3">
                {/* Header: Term & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-terracotta" aria-hidden="true" />
                    <h2 className="font-serif text-2xl font-bold text-forest capitalize group-hover:text-forest-dark transition-colors">
                      {term.termSu}
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-terracotta/10 text-terracotta">
                    {term.reviewStatus}
                  </span>
                </div>

                {/* Indonesian Meaning */}
                <p className="text-sm text-ink leading-relaxed">
                  {term.meaningId}
                </p>

                {/* Example sentence */}
                <div className="p-3.5 rounded-xl bg-background border border-[#23483D]/10 flex flex-col gap-1 text-xs">
                  <p className="font-serif italic text-forest font-medium" lang="su">
                    &ldquo;{term.exampleSentenceSu}&rdquo;
                  </p>
                  <p className="text-ink-muted" lang="id">
                    Artinya: {term.exampleSentenceId}
                  </p>
                </div>

                {/* Notes if available */}
                {term.notes && (
                  <p className="text-xs text-ink-muted italic">
                    Catatan: {term.notes}
                  </p>
                )}
              </div>

              {/* Related stories links */}
              {term.relatedStorySlugs && term.relatedStorySlugs.length > 0 && (
                <div className="pt-3 border-t border-[#23483D]/10 flex items-center justify-between gap-2 text-xs">
                  <span className="text-ink-muted flex items-center gap-1 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-forest" aria-hidden="true" />
                    <span>Cerita Terkait:</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {term.relatedStorySlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/cerita/${slug}`}
                        className="text-forest hover:text-forest-dark font-semibold inline-flex items-center gap-0.5 underline underline-offset-2 touch-target"
                      >
                        <span>Buka cerita</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-card bg-surface border border-[#23483D]/10 text-center flex flex-col items-center gap-3">
          <AlertCircle className="w-8 h-8 text-ink-muted" aria-hidden="true" />
          <h2 className="font-serif text-xl font-bold text-ink">
            Istilah Tidak Ditemukan
          </h2>
          <p className="text-xs text-ink-muted max-w-sm">
            Tidak ada kosakata yang cocok dengan pencarian &ldquo;{query}&rdquo;.
          </p>
        </div>
      )}

      {/* Detail Modal if clicked */}
      <GlossaryModal
        term={selectedModalTerm}
        isOpen={Boolean(selectedModalTerm)}
        onClose={() => setSelectedModalTerm(null)}
      />
    </div>
  );
}
