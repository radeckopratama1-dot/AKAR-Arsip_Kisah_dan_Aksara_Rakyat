"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Volume2, Sparkles, MapPin, Clock, ArrowRight } from "lucide-react";
import { Story } from "@/types/story";

interface HeroStoryCarouselProps {
  stories: Story[];
}

export function HeroStoryCarousel({ stories }: HeroStoryCarouselProps) {
  // State to hold the displayed stories list (randomized on client)
  const [displayStories, setDisplayStories] = useState<Story[]>(stories || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Randomize stories on client mount so each session has a fresh order
  useEffect(() => {
    if (stories.length > 1) {
      // Fisher-Yates shuffle for true uniform randomness
      const shuffled = [...stories];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setDisplayStories(shuffled);
      // Random starting index
      setCurrentIndex(Math.floor(Math.random() * shuffled.length));
    }
  }, [stories]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayStories.length);
  }, [displayStories.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + displayStories.length) % displayStories.length);
  }, [displayStories.length]);

  const goToIndex = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Reset autoplay timer whenever current slide changes or pause state changes
  useEffect(() => {
    if (isPaused || displayStories.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, displayStories.length, goToNext, currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  if (!displayStories || displayStories.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Sorotan Cerita Pilihan"
      aria-roledescription="carousel"
      className="relative w-full max-w-lg aspect-[4/3] rounded-card overflow-hidden shadow-lifted border border-[#23483D]/15 bg-surface group select-none outline-none focus-visible:ring-2 focus-visible:ring-forest"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {displayStories.map((story, idx) => {
          const isActive = idx === currentIndex;
          const hasAudio = Boolean(story.audioSu?.src || story.audioId?.src);

          return (
            <div
              key={story.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} dari ${displayStories.length}: ${story.titleId}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Clickable link covering the slide */}
              <Link
                href={`/cerita/${story.slug}`}
                className="block relative w-full h-full group/slide focus:outline-none"
                tabIndex={isActive ? 0 : -1}
                aria-label={`Buka cerita: ${story.titleId} (${story.titleSu})`}
              >
                {/* Background Photography Image */}
                <Image
                  src={story.cover.src}
                  alt={story.cover.alt}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover transition-transform duration-700 ease-out group-hover/slide:scale-105"
                />

                {/* Gradient Overlays: Top and Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18352D]/95 via-[#18352D]/40 to-black/30 transition-opacity duration-300 group-hover/slide:opacity-90" />

                {/* Top Badges Bar */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-20 pointer-events-none">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-forest-dark/85 backdrop-blur-md text-white border border-white/15 shadow-sm">
                      {story.category}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/45 backdrop-blur-md text-white/90 border border-white/10">
                      <Sparkles className="w-3 h-3 text-gold" aria-hidden="true" />
                      <span>Sorotan Acak</span>
                    </span>
                  </div>

                  {/* Slide Counter Indicator */}
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/50 backdrop-blur-md text-white border border-white/10 shadow-sm shrink-0">
                    {idx + 1} / {displayStories.length}
                  </span>
                </div>

                {/* Bottom Story Summary & CTA */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-20 text-white flex flex-col gap-1.5 pointer-events-none">
                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-[11px] text-[#F7F3EA]/80 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-terracotta-light" aria-hidden="true" />
                      <span className="truncate max-w-[140px] sm:max-w-none">{story.region}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" aria-hidden="true" />
                      <span>{story.readingTimeMinutes} mnt baca</span>
                    </span>
                    {hasAudio && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-emerald-300">
                        <Volume2 className="w-3 h-3" aria-hidden="true" />
                        <span>Audio</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#FFFCF6] leading-tight line-clamp-1 group-hover/slide:text-gold-light transition-colors">
                      {story.titleId}
                    </h2>
                    <p className="font-serif italic text-xs sm:text-sm text-gold-light/95 mt-0.5 line-clamp-1" lang="su">
                      {story.titleSu}
                    </p>
                  </div>

                  {/* Short excerpt & CTA Row */}
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <p className="text-xs text-[#F7F3EA]/85 line-clamp-1 pr-2 max-w-[260px] sm:max-w-[320px]">
                      {story.summaryId}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-forest font-semibold text-xs shadow-md group-hover/slide:bg-gold group-hover/slide:text-forest-dark transition-all duration-200 shrink-0">
                      <span>Maca</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/slide:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Prev / Next) */}
      <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-30">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPrev();
          }}
          aria-label="Cerita sebelumnya"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-forest text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNext();
          }}
          aria-label="Cerita berikutnya"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-forest text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation Indicators (Dots) */}
      <div
        className="absolute bottom-1.5 inset-x-0 flex items-center justify-center gap-1.5 z-30 pointer-events-none"
        role="tablist"
        aria-label="Pilih slide cerita"
      >
        {displayStories.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Pindah ke cerita ${idx + 1}: ${s.titleId}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToIndex(idx);
              }}
              className={`pointer-events-auto transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold ${
                isActive
                  ? "w-5 sm:w-6 h-1.5 bg-gold shadow-sm"
                  : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
