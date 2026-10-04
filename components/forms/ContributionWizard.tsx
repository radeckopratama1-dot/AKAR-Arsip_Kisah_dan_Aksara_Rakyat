"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  BookOpen,
  ShieldCheck,
  CheckCircle,
  Download,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  UploadCloud,
  Check,
} from "lucide-react";
import { StoryCategory } from "@/types/story";
import { ContributionDraft } from "@/types/contribution";
import {
  getContributionDraft,
  saveContributionDraft,
  clearContributionDraft,
  exportDraftAsJSON,
} from "@/lib/storage/contributions";
import {
  contributionStep1Schema,
  contributionStep2Schema,
  contributionStep3Schema,
} from "@/lib/validation/contributionSchema";

const CATEGORIES: StoryCategory[] = [
  "Kehidupan Sehari-hari",
  "Pertanian & Alam",
  "Keluarga & Tradisi",
  "Gotong Royong",
  "Kerajinan & Pasar",
];

export function ContributionWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [draftRestoredNotice, setDraftRestoredNotice] = useState(false);

  // Form State
  const [titleSu, setTitleSu] = useState("");
  const [titleId, setTitleId] = useState("");
  const [category, setCategory] = useState<StoryCategory>("Kehidupan Sehari-hari");
  const [region, setRegion] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<"Sunda" | "Indonesia" | "Bilingual">("Sunda");
  const [summary, setSummary] = useState("");

  const [contentSu, setContentSu] = useState("");
  const [contentId, setContentId] = useState("");
  const [audioFileName, setAudioFileName] = useState("");
  const [audioFileSize, setAudioFileSize] = useState<number | undefined>();
  const [glossaryNotes, setGlossaryNotes] = useState("");

  const [contributorName, setContributorName] = useState("");
  const [sourceType, setSourceType] = useState("Tuturan lisan keluarga");
  const [consentStatement, setConsentStatement] = useState("");
  const [allowPublicAttribution, setAllowPublicAttribution] = useState(true);
  const [sensitiveContentExcludedDeclaration, setSensitiveContentExcludedDeclaration] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Restore draft on mount
  useEffect(() => {
    const existing = getContributionDraft();
    if (existing) {
      setTitleSu(existing.titleSu || "");
      setTitleId(existing.titleId || "");
      if (existing.category) setCategory(existing.category);
      setRegion(existing.region || "");
      if (existing.sourceLanguage) setSourceLanguage(existing.sourceLanguage);
      setSummary(existing.summary || "");

      setContentSu(existing.contentSu || "");
      setContentId(existing.contentId || "");
      setAudioFileName(existing.audioFileName || "");
      setAudioFileSize(existing.audioFileSize);
      setGlossaryNotes(existing.glossaryNotes || "");

      setContributorName(existing.contributorName || "");
      setSourceType(existing.sourceType || "Tuturan lisan keluarga");
      setConsentStatement(existing.consentStatement || "");
      setAllowPublicAttribution(existing.allowPublicAttribution ?? true);
      setSensitiveContentExcludedDeclaration(existing.sensitiveContentExcludedDeclaration ?? false);

      if (existing.step) setCurrentStep(existing.step);
      setDraftRestoredNotice(true);
    }
  }, []);

  // Construct draft object
  function getCurrentDraft(): ContributionDraft {
    return {
      id: `draft-${Date.now()}`,
      step: currentStep,
      updatedAt: new Date().toISOString(),
      titleSu,
      titleId,
      category,
      region,
      sourceLanguage,
      summary,
      contentSu,
      contentId,
      audioFileName,
      audioFileSize,
      glossaryNotes,
      contributorName,
      sourceType,
      consentStatement,
      allowPublicAttribution,
      sensitiveContentExcludedDeclaration,
    };
  }

  // Auto-save draft whenever inputs change
  useEffect(() => {
    if (titleSu || contentSu || contributorName) {
      saveContributionDraft({
        id: "local-draft",
        step: currentStep,
        updatedAt: new Date().toISOString(),
        titleSu,
        titleId,
        category,
        region,
        sourceLanguage,
        summary,
        contentSu,
        contentId,
        audioFileName,
        audioFileSize,
        glossaryNotes,
        contributorName,
        sourceType,
        consentStatement,
        allowPublicAttribution,
        sensitiveContentExcludedDeclaration,
      });
    }
  }, [
    currentStep,
    titleSu,
    titleId,
    category,
    region,
    sourceLanguage,
    summary,
    contentSu,
    contentId,
    audioFileName,
    audioFileSize,
    glossaryNotes,
    contributorName,
    sourceType,
    consentStatement,
    allowPublicAttribution,
    sensitiveContentExcludedDeclaration,
  ]);

  function focusFirstError(errorKeys: string[]) {
    if (errorKeys.length > 0 && formContainerRef.current) {
      const firstKey = errorKeys[0];
      const el = formContainerRef.current.querySelector(`[name="${firstKey}"]`) as HTMLElement;
      el?.focus();
    }
  }

  function handleNextStep() {
    setErrors({});

    if (currentStep === 1) {
      const res = contributionStep1Schema.safeParse({
        titleSu,
        titleId,
        category,
        region,
        sourceLanguage,
        summary,
      });
      if (!res.success) {
        const fieldErrors: Record<string, string> = {};
        res.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
        focusFirstError(Object.keys(fieldErrors));
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2) {
      const res = contributionStep2Schema.safeParse({
        contentSu,
        contentId,
        audioFileName,
        glossaryNotes,
      });
      if (!res.success) {
        const fieldErrors: Record<string, string> = {};
        res.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
        focusFirstError(Object.keys(fieldErrors));
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 3) {
      const res = contributionStep3Schema.safeParse({
        contributorName,
        sourceType,
        consentStatement,
        allowPublicAttribution,
        sensitiveContentExcludedDeclaration,
      });
      if (!res.success) {
        const fieldErrors: Record<string, string> = {};
        res.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
        focusFirstError(Object.keys(fieldErrors));
        return;
      }
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleFinalSave() {
    const draft = getCurrentDraft();
    saveContributionDraft(draft);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    if (window.confirm("Apakah Anda yakin ingin menghapus seluruh draf formulir ini?")) {
      clearContributionDraft();
      setTitleSu("");
      setTitleId("");
      setCategory("Kehidupan Sehari-hari");
      setRegion("");
      setSourceLanguage("Sunda");
      setSummary("");
      setContentSu("");
      setContentId("");
      setAudioFileName("");
      setAudioFileSize(undefined);
      setGlossaryNotes("");
      setContributorName("");
      setSourceType("Tuturan lisan keluarga");
      setConsentStatement("");
      setAllowPublicAttribution(true);
      setSensitiveContentExcludedDeclaration(false);
      setCurrentStep(1);
      setIsSuccess(false);
      setErrors({});
    }
  }

  function handleAudioFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          audioFileName: "Ukuran berkas audio maksimal 10 MB untuk demonstrasi lokal.",
        }));
        return;
      }
      setAudioFileName(file.name);
      setAudioFileSize(file.size);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.audioFileName;
        return copy;
      });
    }
  }

  return (
    <div ref={formContainerRef} className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Draft Restored Banner */}
      {draftRestoredNotice && (
        <div className="p-4 rounded-xl bg-forest/10 border border-forest/20 text-xs text-forest flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-forest" aria-hidden="true" />
            <span>Draf formulir sebelumnya berhasil dipulihkan dari peramban lokal Anda.</span>
          </div>
          <button
            type="button"
            onClick={() => setDraftRestoredNotice(false)}
            className="text-xs font-semibold underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Demo Boundary Notice */}
      <div className="p-5 rounded-2xl bg-surface border border-[#23483D]/12 shadow-soft flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-ink leading-relaxed">
          <span className="font-bold text-terracotta block mb-0.5">
            Pemberitahuan Transparansi Penyimpanan Prototipe:
          </span>
          Seluruh data yang Anda masukkan pada formulir ini hanya tersimpan di peramban lokal perangkat Anda (localStorage) dan belum dikirim kepada pengelola situs. Tidak ada data pribadi sensitif seperti NIK atau alamat rumah yang diminta.
        </div>
      </div>

      {/* Step Indicator Progress Bar */}
      <nav aria-label="Langkah Formulir Kontribusi" className="bg-surface p-4 sm:p-6 rounded-card border border-[#23483D]/10 shadow-soft">
        <ol className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, title: "Informasi Cerita" },
            { num: 2, title: "Isi & Audio" },
            { num: 3, title: "Sumber & Izin" },
            { num: 4, title: "Tinjau & Simpan" },
          ].map((item) => (
            <li
              key={item.num}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${
                currentStep === item.num
                  ? "bg-forest/10 font-bold text-forest"
                  : currentStep > item.num
                  ? "text-forest font-semibold"
                  : "text-ink-muted opacity-60"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === item.num
                    ? "bg-forest text-white"
                    : currentStep > item.num
                    ? "bg-forest text-white"
                    : "bg-background text-ink-muted border border-[#23483D]/15"
                }`}
              >
                {currentStep > item.num ? "✓" : item.num}
              </span>
              <span className="hidden sm:inline text-[11px] leading-tight">{item.title}</span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Success View */}
      {isSuccess ? (
        <div className="p-8 sm:p-12 rounded-card bg-surface border border-[#23483D]/15 shadow-lifted flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center text-forest">
            <CheckCircle className="w-10 h-10" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Kontribusi Tersimpan di Perangkat Ini
          </h2>
          <p className="text-sm text-ink-muted max-w-lg leading-relaxed">
            Draf kontribusi cerita Anda telah tersimpan dengan aman di peramban lokal perangkat ini. Data ini belum dikirim ke server karena aplikasi beroperasi sebagai prototipe akademik mandiri.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => exportDraftAsJSON(getCurrentDraft())}
              className="px-6 py-3 rounded-full bg-forest text-white font-semibold text-sm flex items-center gap-2 hover:bg-forest-dark transition-colors shadow-sm touch-target"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Ekspor Draf sebagai Berkas JSON</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
              }}
              className="px-6 py-3 rounded-full bg-surface border border-[#23483D]/20 text-ink font-semibold text-sm hover:bg-background transition-colors touch-target"
            >
              Ubah Data Draf
            </button>
          </div>
        </div>
      ) : (
        /* Wizard Form Container */
        <div className="p-6 sm:p-10 rounded-card bg-surface border border-[#23483D]/12 shadow-soft flex flex-col gap-8">
          {/* STEP 1: INFORMASI CERITA */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#23483D]/10 pb-4">
                <h2 className="font-serif text-2xl font-bold text-ink">
                  Tahap 1: Informasi Cerita
                </h2>
                <p className="text-xs text-ink-muted mt-1">
                  Masukkan judul dalam dua bahasa, kategori, dan gambaran umum cerita.
                </p>
              </div>

              {/* Title Su */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="titleSu" className="text-xs font-semibold text-ink">
                  Judul Cerita dalam Basa Sunda <span className="text-terracotta">*</span>
                </label>
                <input
                  id="titleSu"
                  name="titleSu"
                  type="text"
                  value={titleSu}
                  onChange={(e) => setTitleSu(e.target.value)}
                  placeholder="Contoh: Panén Cengkéh di Pasawahan"
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink focus:outline-none focus:border-forest"
                  aria-invalid={Boolean(errors.titleSu)}
                  aria-describedby={errors.titleSu ? "titleSu-error" : undefined}
                />
                {errors.titleSu && (
                  <p id="titleSu-error" className="text-xs text-terracotta font-medium">
                    {errors.titleSu}
                  </p>
                )}
              </div>

              {/* Title Id */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="titleId" className="text-xs font-semibold text-ink">
                  Judul Cerita dalam Bahasa Indonesia <span className="text-terracotta">*</span>
                </label>
                <input
                  id="titleId"
                  name="titleId"
                  type="text"
                  value={titleId}
                  onChange={(e) => setTitleId(e.target.value)}
                  placeholder="Contoh: Panen Cengkih di Pasawahan"
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink focus:outline-none focus:border-forest"
                  aria-invalid={Boolean(errors.titleId)}
                  aria-describedby={errors.titleId ? "titleId-error" : undefined}
                />
                {errors.titleId && (
                  <p id="titleId-error" className="text-xs text-terracotta font-medium">
                    {errors.titleId}
                  </p>
                )}
              </div>

              {/* Category & Region Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-xs font-semibold text-ink">
                    Kategori Cerita <span className="text-terracotta">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StoryCategory)}
                    className="p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink focus:outline-none focus:border-forest font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="region" className="text-xs font-semibold text-ink">
                    Asal Wilayah Umum di Purwakarta <span className="text-terracotta">*</span>
                  </label>
                  <input
                    id="region"
                    name="region"
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Contoh: Kecamatan Wanayasa"
                    className="p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink focus:outline-none focus:border-forest"
                    aria-invalid={Boolean(errors.region)}
                    aria-describedby={errors.region ? "region-error" : undefined}
                  />
                  {errors.region && (
                    <p id="region-error" className="text-xs text-terracotta font-medium">
                      {errors.region}
                    </p>
                  )}
                </div>
              </div>

              {/* Source Language */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-ink">
                  Bahasa Asli Tuturan Sumber <span className="text-terracotta">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["Sunda", "Indonesia", "Bilingual"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSourceLanguage(lang)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all touch-target ${
                        sourceLanguage === lang
                          ? "bg-forest text-white border-forest shadow-xs"
                          : "bg-background text-ink border-[#23483D]/15 hover:bg-forest/5"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="summary" className="text-xs font-semibold text-ink">
                  Ringkasan Cerita <span className="text-terracotta">*</span>
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Gambarkan inti kisah secara ringkas (minimal 10 karakter)..."
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                  aria-invalid={Boolean(errors.summary)}
                  aria-describedby={errors.summary ? "summary-error" : undefined}
                />
                {errors.summary && (
                  <p id="summary-error" className="text-xs text-terracotta font-medium">
                    {errors.summary}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: ISI & AUDIO */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#23483D]/10 pb-4">
                <h2 className="font-serif text-2xl font-bold text-ink">
                  Tahap 2: Isi Teks & Rekaman Audio
                </h2>
                <p className="text-xs text-ink-muted mt-1">
                  Ketik teks cerita Sunda, padanan terjemahan, dan unggah uji rekaman audio lokal jika tersedia.
                </p>
              </div>

              {/* Content Su */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contentSu" className="text-xs font-semibold text-ink">
                  Teks Cerita dalam Basa Sunda <span className="text-terracotta">*</span>
                </label>
                <textarea
                  id="contentSu"
                  name="contentSu"
                  rows={6}
                  value={contentSu}
                  onChange={(e) => setContentSu(e.target.value)}
                  placeholder="Tuliskan naskah tuturan basa Sunda (minimal 20 karakter)..."
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest font-serif"
                  aria-invalid={Boolean(errors.contentSu)}
                  aria-describedby={errors.contentSu ? "contentSu-error" : undefined}
                />
                {errors.contentSu && (
                  <p id="contentSu-error" className="text-xs text-terracotta font-medium">
                    {errors.contentSu}
                  </p>
                )}
              </div>

              {/* Content Id (Optional) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contentId" className="text-xs font-semibold text-ink">
                  Terjemahan Bahasa Indonesia (Opsional)
                </label>
                <textarea
                  id="contentId"
                  name="contentId"
                  rows={5}
                  value={contentId}
                  onChange={(e) => setContentId(e.target.value)}
                  placeholder="Dapat dikosongkan jika belum tersedia terjemahan..."
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                />
              </div>

              {/* Audio Upload (Local demo test file) */}
              <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-background border border-[#23483D]/10">
                <label className="text-xs font-semibold text-ink flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-forest" aria-hidden="true" />
                  <span>Uji Muat Berkas Audio Lokal (Opsional)</span>
                </label>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Untuk keperluan demo, Anda dapat memilih berkas audio (MP3/WAV, maks. 10 MB) dari perangkat Anda. Berkas ini hanya diuji pada peramban ini dan tidak dilabeli sebagai rekaman penutur asli terverifikasi.
                </p>

                <input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileChange}
                  className="mt-2 text-xs text-ink file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-forest file:text-white hover:file:bg-forest-dark cursor-pointer"
                />

                {audioFileName && (
                  <p className="text-xs font-mono text-forest mt-1">
                    Berkas terpilih: {audioFileName} ({Math.round((audioFileSize || 0) / 1024)} KB)
                  </p>
                )}

                {errors.audioFileName && (
                  <p className="text-xs text-terracotta font-medium mt-1">
                    {errors.audioFileName}
                  </p>
                )}
              </div>

              {/* Glossary Notes */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="glossaryNotes" className="text-xs font-semibold text-ink">
                  Catatan Istilah atau Kosakata Khusus (Opsional)
                </label>
                <textarea
                  id="glossaryNotes"
                  name="glossaryNotes"
                  rows={2}
                  value={glossaryNotes}
                  onChange={(e) => setGlossaryNotes(e.target.value)}
                  placeholder="Contoh: Kata hanca bermakna pekerjaan yang belum tuntas..."
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                />
              </div>
            </div>
          )}

          {/* STEP 3: SUMBER & PERSETUJUAN */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#23483D]/10 pb-4">
                <h2 className="font-serif text-2xl font-bold text-ink">
                  Tahap 3: Sumber, Atribusi & Persetujuan
                </h2>
                <p className="text-xs text-ink-muted mt-1">
                  Tegaskan etika dokumentasi, keterangan izin, dan pilihan atribusi nama.
                </p>
              </div>

              {/* Contributor Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contributorName" className="text-xs font-semibold text-ink">
                  Nama Tampilan atau Nama Samaran <span className="text-terracotta">*</span>
                </label>
                <input
                  id="contributorName"
                  name="contributorName"
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="Contoh: Penggiat Budaya Pasawahan"
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink focus:outline-none focus:border-forest"
                  aria-invalid={Boolean(errors.contributorName)}
                  aria-describedby={errors.contributorName ? "contributorName-error" : undefined}
                />
                {errors.contributorName && (
                  <p id="contributorName-error" className="text-xs text-terracotta font-medium">
                    {errors.contributorName}
                  </p>
                )}
              </div>

              {/* Source Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sourceType" className="text-xs font-semibold text-ink">
                  Jenis Sumber Cerita <span className="text-terracotta">*</span>
                </label>
                <select
                  id="sourceType"
                  name="sourceType"
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  className="p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink focus:outline-none focus:border-forest font-medium"
                >
                  <option value="Tuturan lisan keluarga">Tuturan lisan keluarga</option>
                  <option value="Wawancara tetua warga">Wawancara tetua warga</option>
                  <option value="Kisah pengalaman pribadi">Kisah pengalaman pribadi</option>
                  <option value="Dokumentasi komunitas lokal">Dokumentasi komunitas lokal</option>
                  <option value="Karya fiksi contoh simulasi">Karya fiksi contoh simulasi</option>
                </select>
              </div>

              {/* Consent Statement */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="consentStatement" className="text-xs font-semibold text-ink">
                  Keterangan Izin Dokumentasi Cerita <span className="text-terracotta">*</span>
                </label>
                <textarea
                  id="consentStatement"
                  name="consentStatement"
                  rows={3}
                  value={consentStatement}
                  onChange={(e) => setConsentStatement(e.target.value)}
                  placeholder="Jelaskan bahwa narasumber atau penutur telah menyetujui pendokumentasian cerita ini untuk tujuan pelestarian..."
                  className="w-full p-3.5 rounded-xl bg-background border border-[#23483D]/15 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                  aria-invalid={Boolean(errors.consentStatement)}
                  aria-describedby={errors.consentStatement ? "consentStatement-error" : undefined}
                />
                {errors.consentStatement && (
                  <p id="consentStatement-error" className="text-xs text-terracotta font-medium">
                    {errors.consentStatement}
                  </p>
                )}
              </div>

              {/* Allow Attribution Checkbox */}
              <label className="flex items-start gap-3 p-4 rounded-xl bg-background border border-[#23483D]/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowPublicAttribution}
                  onChange={(e) => setAllowPublicAttribution(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-forest"
                />
                <span className="text-xs text-ink leading-relaxed">
                  Nama tampilan atau nama samaran di atas diizinkan untuk ditampilkan sebagai atribusi cerita.
                </span>
              </label>

              {/* Sensitive Content Excluded Checkbox */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-start gap-3 p-4 rounded-xl bg-background border border-[#23483D]/10 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sensitiveContentExcludedDeclaration"
                    checked={sensitiveContentExcludedDeclaration}
                    onChange={(e) => setSensitiveContentExcludedDeclaration(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-forest"
                    aria-invalid={Boolean(errors.sensitiveContentExcludedDeclaration)}
                  />
                  <span className="text-xs text-ink leading-relaxed">
                    Saya menyatakan bahwa naskah ini tidak memuat rahasia keluarga sakral yang tabu dipublikasikan, ujaran diskriminatif, maupun data pribadi sensitif pihak lain. <span className="text-terracotta">*</span>
                  </span>
                </label>
                {errors.sensitiveContentExcludedDeclaration && (
                  <p className="text-xs text-terracotta font-medium">
                    {errors.sensitiveContentExcludedDeclaration}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: TINJAU & SIMPAN */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#23483D]/10 pb-4">
                <h2 className="font-serif text-2xl font-bold text-ink">
                  Tahap 4: Tinjau Masukan
                </h2>
                <p className="text-xs text-ink-muted mt-1">
                  Periksa kembali seluruh ringkasan informasi sebelum menyimpan draf di perangkat ini.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="flex flex-col gap-4 text-xs">
                {/* Section 1 review */}
                <div className="p-4 rounded-xl bg-background border border-[#23483D]/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px]">
                      1. Informasi Utama
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-terracotta font-semibold hover:underline"
                    >
                      Ubah
                    </button>
                  </div>
                  <div>
                    <span className="font-semibold text-ink-muted">Judul Basa Sunda:</span>{" "}
                    <span className="text-ink font-medium">{titleSu}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink-muted">Judul Bahasa Indonesia:</span>{" "}
                    <span className="text-ink font-medium">{titleId}</span>
                  </div>
                  <div className="flex gap-4">
                    <span>
                      <span className="font-semibold text-ink-muted">Kategori:</span> {category}
                    </span>
                    <span>
                      <span className="font-semibold text-ink-muted">Wilayah:</span> {region}
                    </span>
                  </div>
                  <p className="text-ink-muted mt-1 italic">&ldquo;{summary}&rdquo;</p>
                </div>

                {/* Section 2 review */}
                <div className="p-4 rounded-xl bg-background border border-[#23483D]/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px]">
                      2. Isi Cerita & Audio
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-terracotta font-semibold hover:underline"
                    >
                      Ubah
                    </button>
                  </div>
                  <div>
                    <span className="font-semibold text-ink-muted">Panjang Teks Sunda:</span>{" "}
                    {contentSu.length} karakter
                  </div>
                  {contentId && (
                    <div>
                      <span className="font-semibold text-ink-muted">Panjang Terjemahan:</span>{" "}
                      {contentId.length} karakter
                    </div>
                  )}
                  {audioFileName ? (
                    <div className="text-forest font-medium">
                      Berkas Audio: {audioFileName} ({Math.round((audioFileSize || 0) / 1024)} KB)
                    </div>
                  ) : (
                    <div className="text-ink-muted">Belum ada berkas audio lokal.</div>
                  )}
                </div>

                {/* Section 3 review */}
                <div className="p-4 rounded-xl bg-background border border-[#23483D]/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px]">
                      3. Sumber & Persetujuan
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-terracotta font-semibold hover:underline"
                    >
                      Ubah
                    </button>
                  </div>
                  <div>
                    <span className="font-semibold text-ink-muted">Nama Tampilan:</span>{" "}
                    <span className="text-ink font-medium">{contributorName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink-muted">Jenis Sumber:</span> {sourceType}
                  </div>
                  <div>
                    <span className="font-semibold text-ink-muted">Pernyataan Izin:</span>{" "}
                    {consentStatement}
                  </div>
                  <div className="text-forest font-medium">
                    Pernyataan materi terlarang telah disetujui.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation Controls */}
          <div className="pt-6 border-t border-[#23483D]/10 flex items-center justify-between gap-4">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="px-5 py-2.5 rounded-full bg-surface border border-[#23483D]/20 text-xs font-semibold text-ink hover:bg-background transition-colors flex items-center gap-1.5 touch-target"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Sebelumnya</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="p-2.5 rounded-xl text-ink-muted hover:text-terracotta transition-colors touch-target"
                title="Kosongkan formulir"
                aria-label="Kosongkan seluruh masukan formulir"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-full bg-forest text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-forest-dark transition-colors shadow-sm touch-target"
                >
                  <span>Lanjutkan</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSave}
                  className="px-7 py-3 rounded-full bg-forest text-white text-xs font-bold flex items-center gap-2 hover:bg-forest-dark transition-colors shadow-md touch-target"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Simpan Kontribusi di Perangkat</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
