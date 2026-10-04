import React from "react";
import { Metadata } from "next";
import { glossaryRepository } from "@/lib/repositories/glossaryRepository";
import { GlossaryClient } from "./GlossaryClient";

export const metadata: Metadata = {
  title: "Glosarium Kosakata Kontekstual",
  description:
    "Kamus istilah budaya dan kosakata bahasa Sunda dari cerita lokal Purwakarta beserta padanan bahasa Indonesia, contoh kalimat, dan status peninjauan.",
};

export default async function GlosariumPage() {
  const terms = await glossaryRepository.getAll();
  const letters = await glossaryRepository.getLetters();

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-14 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Kamus Budaya Lokal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
          Glosarium Kosakata Sunda
        </h1>
        <p className="text-base text-ink-muted max-w-2xl leading-relaxed">
          Pelajari istilah-istilah khas yang muncul dalam arsip cerita lokal. Setiap kata dilengkapi makna kontekstual dalam bahasa Indonesia, contoh tuturan, dan tautan cerita terkait.
        </p>
      </div>

      {/* Interactive Client Component */}
      <GlossaryClient initialTerms={terms} letters={letters} />
    </div>
  );
}
