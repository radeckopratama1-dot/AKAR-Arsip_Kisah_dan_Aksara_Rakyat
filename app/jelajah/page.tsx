import React, { Suspense } from "react";
import { Metadata } from "next";
import { storyRepository } from "@/lib/repositories/storyRepository";
import { filterAndSortStories, StoryFilterOptions } from "@/lib/search/storySearch";
import { FilterBar } from "@/components/stories/FilterBar";
import { StoryCard } from "@/components/stories/StoryCard";
import { BookX } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Cerita Lokal",
  description:
    "Jelajahi kumpulan cerita lokal Purwakarta dalam bahasa Sunda dan bahasa Indonesia dengan filter kategori, ketersediaan rekaman audio, dan pencarian kata kunci.",
};

interface JelajahPageProps {
  searchParams: Promise<{
    q?: string;
    kategori?: string;
    audio?: string;
    urut?: string;
  }>;
}

export default async function JelajahPage({ searchParams }: JelajahPageProps) {
  const resolvedParams = await searchParams;
  const allStories = await storyRepository.getAll();
  const categories = await storyRepository.getCategories();

  const query = resolvedParams.q || "";
  const category = (resolvedParams.kategori as any) || "Semua";
  const audioParam = resolvedParams.audio;
  const sortBy = (resolvedParams.urut as any) || "newest";

  let hasAudio: boolean | null = null;
  if (audioParam === "ada") hasAudio = true;
  if (audioParam === "tanpa") hasAudio = false;

  const filteredStories = filterAndSortStories(allStories, {
    query,
    category,
    hasAudio,
    sortBy,
  });

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-14 flex flex-col gap-10">
      {/* Header section */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Arsip Cerita Lisan & Tulisan
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
          Katalog Cerita Lokal Purwakarta
        </h1>
        <p className="text-base text-ink-muted max-w-2xl leading-relaxed">
          Temukan cerita-cerita pendek dalam dua bahasa. Seluruh naskah berikut merupakan materi demonstrasi prototipe yang menggambarkan tradisi, pertanian, dan kehidupan masyarakat lokal.
        </p>
      </div>

      {/* Filter and Search Bar with Suspense */}
      <Suspense fallback={<div className="h-32 bg-surface rounded-card animate-pulse" />}>
        <FilterBar
          categories={categories}
          totalResults={filteredStories.length}
          totalStories={allStories.length}
        />
      </Suspense>

      {/* Stories Grid or Empty State */}
      {filteredStories.length > 0 ? (
        <section aria-label="Daftar Cerita Hasil Filter">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      ) : (
        <div
          className="p-12 sm:p-16 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col items-center justify-center text-center gap-4 my-6"
          role="region"
          aria-label="Tidak ada hasil"
        >
          <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center text-forest">
            <BookX className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink">
            Tidak Ditemukan Cerita yang Sesuai
          </h2>
          <p className="text-sm text-ink-muted max-w-md leading-relaxed">
            Tidak ada cerita contoh yang cocok dengan kata kunci atau kombinasi filter Anda. Silakan coba kata kunci lain atau bersihkan filter pencarian.
          </p>
        </div>
      )}
    </div>
  );
}
