import React from "react";
import { Info, ShieldCheck, MapPin, Calendar, Edit3, AlertTriangle } from "lucide-react";
import { Story } from "@/types/story";

interface SourceMetadataProps {
  story: Story;
  onOpenCorrection: () => void;
}

export function SourceMetadata({ story, onOpenCorrection }: SourceMetadataProps) {
  return (
    <section
      className="p-4 sm:p-8 rounded-card bg-surface border border-[#23483D]/12 shadow-soft flex flex-col gap-6 w-full min-w-0"
      aria-labelledby="source-metadata-title"
    >
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <Info className="w-5 h-5 text-forest" aria-hidden="true" />
          <h2 id="source-metadata-title" className="font-serif text-xl font-bold text-ink">
            Sumber & Metadata Dokumentasi
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenCorrection}
          className="px-4 py-2 rounded-full bg-forest/10 hover:bg-forest hover:text-white text-forest text-xs font-semibold flex items-center gap-1.5 transition-all touch-target"
        >
          <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Usulkan Koreksi Teks</span>
        </button>
      </div>

      {/* Synthetic Demo Warning */}
      {story.isDemo && (
        <div className="p-4 rounded-xl bg-terracotta/10 border border-terracotta/25 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs text-ink leading-relaxed">
            <span className="font-bold text-terracotta block mb-0.5">
              Catatan Validitas Konten Contoh:
            </span>
            Cerita fiksi untuk demonstrasi. Teks Sunda belum ditinjau penutur. Narasi ini disusun semata-mata untuk menguji keselarasan antarmuka bilingual, glosarium, dan pemutar audio dalam konteks prototipe akademik.
          </div>
        </div>
      )}

      {/* Grid of metadata items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs">
        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-background border border-[#23483D]/10">
          <span className="font-semibold text-ink-muted">Jenis Sumber:</span>
          <span className="text-ink font-medium">{story.sourceType}</span>
        </div>

        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-background border border-[#23483D]/10">
          <span className="font-semibold text-ink-muted flex items-center gap-1">
            <MapPin className="w-3 h-3 text-terracotta" aria-hidden="true" />
            <span>Asal Dokumentasi:</span>
          </span>
          <span className="text-ink font-medium">{story.region}</span>
        </div>

        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-background border border-[#23483D]/10">
          <span className="font-semibold text-ink-muted flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-forest" aria-hidden="true" />
            <span>Status Pemeriksaan:</span>
          </span>
          <span className="text-ink font-medium">{story.reviewStatus}</span>
        </div>

        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-background border border-[#23483D]/10">
          <span className="font-semibold text-ink-muted">Atribusi / Penulis:</span>
          <span className="text-ink font-medium">{story.attribution}</span>
        </div>

        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-background border border-[#23483D]/10">
          <span className="font-semibold text-ink-muted flex items-center gap-1">
            <Calendar className="w-3 h-3 text-forest" aria-hidden="true" />
            <span>Pembaruan Terakhir:</span>
          </span>
          <span className="text-ink font-medium">{story.updatedAt}</span>
        </div>

        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-background border border-[#23483D]/10">
          <span className="font-semibold text-ink-muted">Status Publikasi:</span>
          <span className="text-ink font-medium">{story.publicationStatus}</span>
        </div>
      </div>

      {/* Consent Statement */}
      <div className="p-4 rounded-xl bg-background border border-[#23483D]/10 text-xs text-ink-muted">
        <span className="font-semibold text-ink block mb-1">
          Izin & Etika Dokumentasi:
        </span>
        <p className="leading-relaxed">
          {story.consentMetadata.statement} (Model izin: {story.consentMetadata.consentType})
        </p>
      </div>
    </section>
  );
}
