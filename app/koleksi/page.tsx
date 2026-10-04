import React from "react";
import { Metadata } from "next";
import { storyRepository } from "@/lib/repositories/storyRepository";
import { KoleksiClient } from "./KoleksiClient";

export const metadata: Metadata = {
  title: "Koleksi Cerita Tersimpan",
  description:
    "Daftar cerita favorit yang disimpan secara lokal di peramban pengguna untuk dibaca kembali kapan saja tanpa perlu akun atau login.",
};

export default async function KoleksiPage() {
  const allStories = await storyRepository.getAll();

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-14 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Daftar Bacaan Pribadi
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
          Koleksi Cerita Tersimpan
        </h1>
        <p className="text-base text-ink-muted max-w-2xl leading-relaxed">
          Koleksi ini merekam cerita-cerita yang Anda tandai selama berselancar di AKAR. Anda dapat membacanya kembali sewaktu-waktu atau mengelola daftarnya.
        </p>
      </div>

      {/* Interactive Client Component */}
      <KoleksiClient allStories={allStories} />
    </div>
  );
}
