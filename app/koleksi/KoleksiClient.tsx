"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowRight, BookOpen, AlertCircle, Info } from "lucide-react";
import { Story } from "@/types/story";
import { getBookmarks, removeBookmark, clearAllBookmarks, BOOKMARKS_CHANGED_EVENT } from "@/lib/storage/bookmarks";
import { StoryCard } from "@/components/stories/StoryCard";

interface KoleksiClientProps {
  allStories: Story[];
}

export function KoleksiClient({ allStories }: KoleksiClientProps) {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function load() {
      setBookmarkedSlugs(getBookmarks());
      setIsLoaded(true);
    }
    load();
    window.addEventListener(BOOKMARKS_CHANGED_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(BOOKMARKS_CHANGED_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const savedStories = allStories.filter((s) => bookmarkedSlugs.includes(s.slug));

  function handleClearAll() {
    if (window.confirm("Apakah Anda yakin ingin menghapus seluruh koleksi cerita yang disimpan di peramban ini?")) {
      clearAllBookmarks();
    }
  }

  if (!isLoaded) {
    return <div className="h-64 rounded-card bg-surface animate-pulse" />;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Transparency Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-[#23483D]/10 shadow-soft flex items-start gap-3.5">
        <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-ink leading-relaxed">
          <span className="font-bold text-forest block mb-0.5">
            Penyimpanan Koleksi Lokal:
          </span>
          Cerita yang Anda simpan tersimpan secara aman di memori peramban lokal perangkat ini (localStorage). Anda tidak memerlukan akun atau kata sandi untuk mengaksesnya kembali.
        </div>
      </div>

      {savedStories.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Action header */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Menampilkan {savedStories.length} cerita tersimpan
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1.5 touch-target"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Hapus Seluruh Koleksi</span>
            </button>
          </div>

          {/* Grid of saved story cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col items-center justify-center text-center gap-5 my-4">
          <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center text-forest">
            <Bookmark className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink">
            Belum Ada Cerita yang Disimpan
          </h2>
          <p className="text-sm text-ink-muted max-w-md leading-relaxed">
            Anda dapat menyimpan cerita favorit dari katalog dengan menekan tombol ikon bookmark di setiap kartu cerita atau di halaman pembaca.
          </p>
          <Link
            href="/jelajah"
            className="mt-2 px-7 py-3 rounded-full bg-forest text-white font-semibold text-sm hover:bg-forest-dark transition-colors inline-flex items-center gap-2 shadow-sm touch-target"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Mulai Jelajahi Cerita</span>
          </Link>
        </div>
      )}
    </div>
  );
}
