"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, Volume2, ArrowUpDown } from "lucide-react";
import { StoryCategory } from "@/types/story";

interface FilterBarProps {
  categories: StoryCategory[];
  totalResults: number;
  totalStories: number;
}

export function FilterBar({ categories, totalResults, totalStories }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const currentCategory = searchParams.get("kategori") || "Semua";
  const audioFilter = searchParams.get("audio") || "semua";
  const sortBy = searchParams.get("urut") || "newest";

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "" || val === "semua" || val === "Semua") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleReset() {
    router.replace(pathname, { scroll: false });
  }

  const hasActiveFilters = Boolean(
    query || (currentCategory && currentCategory !== "Semua") || (audioFilter && audioFilter !== "semua") || (sortBy && sortBy !== "newest")
  );

  return (
    <div className="bg-surface rounded-card p-6 border border-[#23483D]/10 shadow-soft flex flex-col gap-6">
      {/* Top row: Search input & sort selector */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search input with accessible label */}
        <div className="relative flex-1">
          <label htmlFor="story-search-input" className="sr-only">
            Cari cerita berdasarkan judul Sunda, Indonesia, ringkasan, atau tag
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            id="story-search-input"
            type="search"
            value={query}
            onChange={(e) => updateParams({ q: e.target.value })}
            placeholder="Cari judul Sunda, Indonesia, daerah, atau kata kunci..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:bg-surface focus:outline-none focus:border-forest transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateParams({ q: null })}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-muted hover:text-ink touch-target"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <label htmlFor="sort-selector" className="text-xs font-medium text-ink-muted flex items-center gap-1.5 whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5 text-forest" aria-hidden="true" />
            <span>Urutkan:</span>
          </label>
          <select
            id="sort-selector"
            value={sortBy}
            onChange={(e) => updateParams({ urut: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink font-medium focus:outline-none focus:border-forest"
          >
            <option value="newest">Terbaru Ditambahkan</option>
            <option value="title-id">Judul Indonesia (A ke Z)</option>
            <option value="title-su">Judul Sunda (A ke Z)</option>
            <option value="reading-time">Durasi Baca Singkat</option>
          </select>
        </div>
      </div>

      {/* Middle row: Category chips & Audio filters */}
      <div className="flex flex-col gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter berdasarkan kategori">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1">
            Kategori:
          </span>
          <button
            type="button"
            onClick={() => updateParams({ kategori: null })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              currentCategory === "Semua"
                ? "bg-forest text-white shadow-sm"
                : "bg-background text-ink hover:bg-forest/10"
            }`}
          >
            Semua ({totalStories})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateParams({ kategori: cat })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                currentCategory === cat
                  ? "bg-forest text-white shadow-sm"
                  : "bg-background text-ink hover:bg-forest/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Audio Availability Filter */}
        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter ketersediaan audio">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span>Format Audio:</span>
          </span>
          {[
            { id: "semua", label: "Semua Format" },
            { id: "ada", label: "Tersedia Rekaman" },
            { id: "tanpa", label: "Hanya Teks" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateParams({ audio: item.id })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                audioFilter === item.id
                  ? "bg-forest text-white shadow-sm"
                  : "bg-background text-ink hover:bg-forest/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row: Counter and Clear button */}
      <div className="pt-4 border-t border-[#23483D]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
        <div>
          Menampilkan <span className="font-bold text-forest">{totalResults}</span> dari {totalStories} cerita contoh
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="text-terracotta hover:text-terracotta-dark font-medium underline underline-offset-4 touch-target"
          >
            Hapus Semua Filter
          </button>
        )}
      </div>
    </div>
  );
}
