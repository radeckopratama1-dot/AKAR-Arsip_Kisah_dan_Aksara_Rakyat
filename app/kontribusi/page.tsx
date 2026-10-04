import React from "react";
import { Metadata } from "next";
import { ContributionWizard } from "@/components/forms/ContributionWizard";

export const metadata: Metadata = {
  title: "Bagikan Cerita Lokal",
  description:
    "Formulir bertahap untuk mencatat draf cerita lokal, tuturan lisan bahasa Sunda, terjemahan, dan keterangan izin narasumber pada peramban lokal.",
};

export default function KontribusiPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-14 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Partisipasi Dokumentasi
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
          Bagikan Cerita Lokal
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Bantu rawat ingatan kolektif dengan mendokumentasikan cerita keluarga atau tuturan warga sekitar. Masukkan naskah bertahap dan simpan drafnya di perangkat Anda.
        </p>
      </div>

      {/* Multi-step form wizard */}
      <ContributionWizard />
    </div>
  );
}
