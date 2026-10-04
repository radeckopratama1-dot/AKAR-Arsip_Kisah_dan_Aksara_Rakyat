"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Clock, Volume2, VolumeX, MapPin, Tag } from "lucide-react";
import { Story } from "@/types/story";
import { isBookmarked, toggleBookmark, BOOKMARKS_CHANGED_EVENT } from "@/lib/storage/bookmarks";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const hasAudio = Boolean(story.audioSu?.src || story.audioId?.src);

  useEffect(() => {
    function check() {
      setBookmarked(isBookmarked(story.slug));
    }
    check();
    window.addEventListener(BOOKMARKS_CHANGED_EVENT, check);
    return () => window.removeEventListener(BOOKMARKS_CHANGED_EVENT, check);
  }, [story.slug]);

  function handleBookmarkClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleBookmark(story.slug);
    setBookmarked(newState);
  }

  return (
    <article className="group relative flex flex-col bg-surface rounded-card border border-[#23483D]/10 overflow-hidden shadow-soft hover:shadow-lifted transition-all duration-300">
      {/* Visual Cover Area */}
      <Link href={`/cerita/${story.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-background">
        <Image
          src={story.cover.src}
          alt={story.cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category & Demo Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-forest text-white shadow-sm">
            {story.category}
          </span>
          {story.isDemo && (
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[#FFFCF6]/90 text-terracotta border border-terracotta/30 backdrop-blur-sm">
              Konten contoh
            </span>
          )}
        </div>

        {/* Audio Availability Indicator */}
        <div className="absolute bottom-3 left-3">
          {hasAudio ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-forest-dark/85 text-[#F7F3EA] backdrop-blur-sm">
              <Volume2 className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
              <span>Tersedia Audio</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-ink/75 text-[#F7F3EA] backdrop-blur-sm">
              <VolumeX className="w-3.5 h-3.5 text-ink-faint" aria-hidden="true" />
              <span>Hanya Teks</span>
            </span>
          )}
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Region and Reading Time */}
          <div className="flex items-center justify-between text-xs text-ink-muted mb-2.5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
              <span>{story.region}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{story.readingTimeMinutes} menit baca</span>
            </span>
          </div>

          {/* Titles */}
          <Link href={`/cerita/${story.slug}`} className="block group-hover:text-forest transition-colors">
            <h3 className="font-serif text-xl font-bold text-ink leading-snug">
              {story.titleId}
            </h3>
            <p className="font-serif italic text-sm text-terracotta mt-1">
              {story.titleSu}
            </p>
          </Link>

          {/* Summary snippet */}
          <p className="text-sm text-ink-muted line-clamp-3 mt-3 leading-relaxed">
            {story.summaryId}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {story.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-ink-muted bg-forest/5 rounded-md"
              >
                <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Action Links & Bookmark */}
        <div className="mt-6 pt-4 border-t border-[#23483D]/10 flex items-center justify-between">
          <Link
            href={`/cerita/${story.slug}`}
            className="text-sm font-semibold text-forest hover:text-forest-dark transition-colors inline-flex items-center gap-1.5"
          >
            <span>Baca Cerita</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <button
            type="button"
            onClick={handleBookmarkClick}
            className={`touch-target p-2 rounded-xl transition-all ${
              bookmarked
                ? "bg-terracotta text-white shadow-sm"
                : "text-ink-muted hover:text-terracotta hover:bg-terracotta/10"
            }`}
            aria-label={bookmarked ? `Hapus bookmark untuk ${story.titleId}` : `Simpan bookmark ${story.titleId}`}
            title={bookmarked ? "Tersimpan di koleksi" : "Simpan ke koleksi"}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-white" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
