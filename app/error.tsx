"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 flex-1 flex flex-col items-center justify-center text-center">
      <div className="p-8 sm:p-12 rounded-card bg-surface border border-[#23483D]/10 shadow-soft max-w-lg flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
          <AlertTriangle className="w-8 h-8" aria-hidden="true" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
          Terjadi Kendala Memuat Halaman
        </span>

        <h1 className="font-serif text-3xl font-bold text-ink">
          Halaman Mengalami Gangguan Sementara
        </h1>

        <p className="text-sm text-ink-muted leading-relaxed">
          Sistem mendeteksi kendala tak terduga saat memproses tampilan. Anda dapat mencoba memuat ulang halaman ini.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-forest text-white font-semibold text-xs hover:bg-forest-dark transition-colors flex items-center gap-2 touch-target shadow-sm"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Coba Muat Ulang</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-surface border border-[#23483D]/20 text-ink font-semibold text-xs hover:bg-background transition-colors flex items-center gap-2 touch-target"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
