"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, AlertCircle, Loader2 } from "lucide-react";
import { AudioAsset } from "@/types/story";

interface AudioPlayerProps {
  audio?: AudioAsset;
  onTimeUpdate?: (currentTime: number) => void;
  title?: string;
}

export function AudioPlayer({ audio, onTimeUpdate, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(audio?.duration || 0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If no audio asset is provided
  if (!audio || !audio.src) {
    return (
      <div
        className="p-5 rounded-2xl bg-surface border border-[#23483D]/10 flex items-center gap-3.5 text-sm text-ink-muted"
        role="region"
        aria-label="Pemutar Audio"
      >
        <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0 text-ink-faint">
          <Volume2 className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-ink">Rekaman belum tersedia.</p>
          <p className="text-xs text-ink-muted mt-0.5">
            Cerita ini saat ini hanya terdokumentasi dalam format teks bilingual.
          </p>
        </div>
      </div>
    );
  }

  function formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setHasError(false);
      setIsLoading(true);
      audioRef.current
        .play()
        .then(() => {
          setIsLoading(false);
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
          setIsLoading(false);
          setIsPlaying(false);
          setHasError(true);
        });
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    if (onTimeUpdate) {
      onTimeUpdate(newTime);
    }
  }

  function handleRateChange(rate: number) {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }

  function handleReset() {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (onTimeUpdate) onTimeUpdate(0);
  }

  return (
    <div
      className="p-4 sm:p-6 rounded-card bg-surface border border-[#23483D]/12 shadow-soft flex flex-col gap-4 w-full min-w-0"
      role="region"
      aria-label={`Pemutar audio untuk ${title || "cerita"}`}
    >
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={audio.src}
        preload="metadata"
        onTimeUpdate={() => {
          if (!audioRef.current) return;
          const ct = audioRef.current.currentTime;
          setCurrentTime(ct);
          if (onTimeUpdate) onTimeUpdate(ct);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || audio.duration || 0);
          }
        }}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (onTimeUpdate) onTimeUpdate(0);
        }}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
          setHasError(true);
        }}
      />

      {/* Top Header: Label & Attribution */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-forest animate-pulse" aria-hidden="true" />
          <span className="font-semibold text-forest uppercase tracking-wider text-[11px]">
            Rekaman Suara ({audio.language === "su" ? "Basa Sunda" : "Bahasa Indonesia"})
          </span>
        </div>
        <span className="text-ink-muted text-[11px] truncate max-w-[140px] sm:max-w-[200px]" title={audio.attribution}>
          {audio.attribution}
        </span>
      </div>

      {/* Center Controls: Play, Time, Seek Slider */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full min-w-0">
        {/* Play/Pause & Reset Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            disabled={hasError}
            className="w-12 h-12 rounded-full bg-forest text-white hover:bg-forest-dark transition-all flex items-center justify-center shadow-md active:scale-95 disabled:opacity-50 touch-target focus-visible:outline-forest"
            aria-label={isPlaying ? "Jeda rekaman audio" : "Putar rekaman audio"}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-white" aria-hidden="true" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 rounded-xl text-ink-muted hover:text-ink hover:bg-forest/5 transition-colors touch-target"
            aria-label="Kembalikan audio ke awal"
            title="Ulangi dari awal"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Seek Slider and Time Indicators */}
        <div className="flex-1 w-full flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-ink-muted w-11 text-right tabular-nums">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              disabled={hasError || duration === 0}
              className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-forest focus:outline-none"
              aria-label="Posisi pemutaran audio"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              aria-valuetext={`${formatTime(currentTime)} dari ${formatTime(duration)}`}
            />
          </div>

          <span className="text-xs font-mono font-medium text-ink-muted w-11 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-background p-1 rounded-xl border border-[#23483D]/10">
          {[0.75, 1, 1.25, 1.5].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => handleRateChange(rate)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                playbackRate === rate
                  ? "bg-forest text-white shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
              aria-label={`Kecepatan putar ${rate} kali`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* Error state alert if playback fails */}
      {hasError && (
        <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/20 text-xs text-terracotta flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>Berkas audio tidak dapat diputar pada peramban Anda atau format tidak didukung.</span>
        </div>
      )}
    </div>
  );
}
