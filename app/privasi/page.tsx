import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, Database, Lock, EyeOff, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privasi & Batas Demo",
  description:
    "Penjelasan mengenai penyimpanan data lokal peramban, ketiadaan pelacak, dan batas teknis operasional prototipe akademik AKAR.",
};

export default function PrivasiPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-16 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Transparansi Teknis
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
          Privasi & Batas Penyimpanan Demo
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          AKAR dirancang dengan prinsip transparansi penuh. Halaman ini menjelaskan bagaimana data disimpan pada perangkat Anda serta batasan operasional prototipe ini.
        </p>
      </div>

      {/* Main Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Principle 1 */}
        <div className="p-8 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
            <Database className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-ink">
            Penyimpanan Terisolasi di Peramban Lokal
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Seluruh data interaktif seperti bookmark cerita, pengaturan ukuran huruf pembaca, draf formulir kontribusi, dan catatan usulan koreksi disimpan secara lokal di peramban Anda melalui <code>localStorage</code>.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Data ini tidak dikirimkan ke server eksternal mana pun, tidak diunggah ke cloud, dan akan tetap berada di perangkat Anda hingga Anda menghapus cache peramban atau menekan tombol bersihkan koleksi.
          </p>
        </div>

        {/* Principle 2 */}
        <div className="p-8 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
            <EyeOff className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-ink">
            Tanpa Pelacak & Tanpa Iklan
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Situs ini tidak memuat skrip pelacak pihak ketiga (seperti Google Analytics, Meta Pixel, atau platform telemetri komersial). Aktivitas membaca Anda bersifat sepenuhnya privat.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Kami tidak menggunakan cookie pihak ketiga, cookie pelacak sesi, maupun alat pemprofilan perilaku pengguna.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="p-8 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
            <Lock className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-ink">
            Tanpa Autentikasi Palsu
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            AKAR sengaja tidak menyertakan sistem pendaftaran akun, formulir login dengan kata sandi pura-pura, atau token keamanan tiruan. Semua fitur prototipe dapat langsung diakses tanpa hambatan registrasi.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Formulir kontribusi juga tidak meminta nomor identitas pribadi (seperti NIK), alamat rumah, atau data sensitif yang tidak relevan dengan dokumentasi sastra.
          </p>
        </div>

        {/* Principle 4 */}
        <div className="p-8 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
            <FileText className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-ink">
            Kemandirian Berkas Ekspor
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Sebagai sarana dokumentasi mandiri, formulir kontribusi dan koreksi menyediakan tombol untuk mengunduh naskah dalam format berkas JSON terstruktur ke komputer Anda.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Anda memegang kendali penuh atas naskah yang Anda ketik dan dapat membagikannya kepada tim peneliti atau pengelola secara terpisah bila sewaktu-waktu dibutuhkan.
          </p>
        </div>
      </div>

      {/* Summary Note */}
      <div className="p-6 rounded-card bg-forest/5 border border-forest/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-forest flex-shrink-0" aria-hidden="true" />
          <span className="text-ink leading-relaxed">
            Pertanyaan seputar metodologi etika dokumentasi dapat dibaca pada halaman metodologi.
          </span>
        </div>
        <Link
          href="/metodologi"
          className="text-forest hover:text-forest-dark font-semibold inline-flex items-center gap-1.5 touch-target flex-shrink-0"
        >
          <span>Buka Metodologi</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
