"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Story } from "@/types/story";
import { GlossaryTerm } from "@/types/glossary";
import { ReadingMode, getReaderPreferences, saveReaderPreferences } from "@/lib/storage/preferences";
import { isBookmarked, toggleBookmark, BOOKMARKS_CHANGED_EVENT } from "@/lib/storage/bookmarks";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { ReaderControls } from "@/components/reader/ReaderControls";
import { BilingualReader } from "@/components/reader/BilingualReader";
import { SourceMetadata } from "@/components/reader/SourceMetadata";
import { CorrectionModal } from "@/components/reader/CorrectionModal";
import { ChevronRight, Clock, MapPin, Tag } from "lucide-react";

interface StoryReaderClientProps {
  story: Story;
  glossaryTerms: GlossaryTerm[];
}

export function StoryReaderClient({ story, glossaryTerms }: StoryReaderClientProps) {
  const [readingMode, setReadingMode] = useState<ReadingMode>("bilingual");
  const [fontSize, setFontSize] = useState<number>(18);
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState<boolean>(false);

  // Load preferences & bookmark on mount
  useEffect(() => {
    const prefs = getReaderPreferences();
    setReadingMode(prefs.readingMode);
    setFontSize(prefs.fontSize);
    setFocusMode(prefs.focusMode);

    setBookmarked(isBookmarked(story.slug));

    function onBookmarkChange() {
      setBookmarked(isBookmarked(story.slug));
    }
    window.addEventListener(BOOKMARKS_CHANGED_EVENT, onBookmarkChange);
    return () => window.removeEventListener(BOOKMARKS_CHANGED_EVENT, onBookmarkChange);
  }, [story.slug]);

  function handleModeChange(mode: ReadingMode) {
    setReadingMode(mode);
    saveReaderPreferences({ readingMode: mode });
  }

  function handleFontSizeChange(size: number) {
    setFontSize(size);
    saveReaderPreferences({ fontSize: size });
  }

  function handleFocusModeChange(focus: boolean) {
    setFocusMode(focus);
    saveReaderPreferences({ focusMode: focus });
  }

  function handleToggleBookmark() {
    const next = toggleBookmark(story.slug);
    setBookmarked(next);
  }

  return (
    <div className={`max-w-[1200px] w-full min-w-0 mx-auto px-5 sm:px-8 py-8 sm:py-12 flex flex-col gap-8 sm:gap-10 ${focusMode ? "max-w-4xl" : ""}`}>
      {/* Breadcrumb Navigation */}
      {!focusMode && (
        <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-forest transition-colors">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-ink-faint" />
            </li>
            <li>
              <Link href="/jelajah" className="hover:text-forest transition-colors">
                Jelajah Cerita
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-ink-faint" />
            </li>
            <li className="font-semibold text-forest truncate max-w-[130px] sm:max-w-xs" aria-current="page">
              {story.titleId}
            </li>
          </ol>
        </nav>
      )}

      {/* Story Header (Single H1) */}
      <header className="flex flex-col gap-4">
        {/* Category & Status badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-forest text-white font-semibold">
            {story.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-medium border border-terracotta/20">
            {story.reviewStatus}
          </span>
          {story.isDemo && (
            <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold-dark font-medium border border-gold/30">
              Konten demonstrasi
            </span>
          )}
        </div>

        {/* Dual Titles */}
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
            {story.titleId}
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-terracotta mt-2" lang="su">
            {story.titleSu}
          </p>
        </div>

        {/* Metadata info: Region, Reading Time, Tags */}
        {!focusMode && (
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-muted pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-terracotta" aria-hidden="true" />
              <span>{story.region}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forest" aria-hidden="true" />
              <span>{story.readingTimeMinutes} menit membaca</span>
            </span>
            <div className="flex flex-wrap gap-1.5 items-center">
              {story.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-forest/5 text-ink-muted"
                >
                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Context summary */}
        <p className="text-base text-ink-muted leading-relaxed max-w-3xl pt-2">
          {story.summaryId}
        </p>
      </header>

      {/* Audio Player Component */}
      <AudioPlayer
        audio={story.audioSu || story.audioId}
        onTimeUpdate={(t) => setCurrentTime(t)}
        title={story.titleId}
      />

      {/* Interactive Reader Controls Bar */}
      <ReaderControls
        readingMode={readingMode}
        onReadingModeChange={handleModeChange}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        focusMode={focusMode}
        onFocusModeChange={handleFocusModeChange}
        isBookmarked={bookmarked}
        onToggleBookmark={handleToggleBookmark}
        title={story.titleId}
      />

      {/* Bilingual Reader Content */}
      <BilingualReader
        story={story}
        readingMode={readingMode}
        fontSize={fontSize}
        currentTime={currentTime}
        glossaryTerms={glossaryTerms}
      />

      {/* Source Metadata & Documentation Transparency */}
      {!focusMode && (
        <SourceMetadata
          story={story}
          onOpenCorrection={() => setCorrectionModalOpen(true)}
        />
      )}

      {/* Correction Proposal Modal */}
      <CorrectionModal
        story={story}
        isOpen={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
      />
    </div>
  );
}
