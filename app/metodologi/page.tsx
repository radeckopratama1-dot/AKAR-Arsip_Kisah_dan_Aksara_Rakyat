import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  FileCheck,
  Mic,
  FileText,
  Languages,
  Users,
  CheckCircle,
  Share2,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Alur Metodologi Dokumentasi",
  description:
    "Delapan tahap alur dokumentasi sastra lisan dan cerita lokal bilingual dari Purwakarta yang mengedepankan etika, persetujuan sumber, dan ketelitian bahasa.",
};

const METHODOLOGY_STEPS = [
  {
    step: 1,
    title: "Persetujuan Narasumber (Consent)",
    icon: FileCheck,
    status: "Dirancang dalam Standar Etika",
    description:
      "Membangun hubungan saling percaya dengan penutur. Meminta persetujuan sukarela atas perekaman, menetapkan batas materi yang boleh dipublikasikan, serta menyepakati nama atribusi atau penyamaran identitas.",
  },
  {
    step: 2,
    title: "Dokumentasi Audio & Konteks",
    icon: Mic,
    status: "Dirancang untuk Kegiatan Lapangan",
    description:
      "Merekam tuturan lisan di lingkungan tempat tinggal yang tenang untuk menjaga kenyamanan penutur. Mencatat konteks ruang, waktu, serta makna benda atau tempat yang menjadi latar cerita.",
  },
  {
    step: 3,
    title: "Transkripsi Tekstual Basa Sunda",
    icon: FileText,
    status: "Telah Diimplementasikan pada Naskah Contoh",
    description:
      "Mentranskripsikan rekaman suara ke bentuk tulisan beraksara latin dengan ejaan Sunda yang cermat. Mempertahankan partikel tutur lisan, kosakata arkais, dan intonasi khas setempat.",
  },
  {
    step: 4,
    title: "Penerjemahan Kontekstual ke Bahasa Indonesia",
    icon: Languages,
    status: "Telah Diimplementasikan pada Naskah Contoh",
    description:
      "Menyusun padanan kalimat bahasa Indonesia secara bersanding per pasang paragraf. Mengutamakan kelancaran makna tanpa menghilangkan nuansa emosi dan rasa bahasa aslinya.",
  },
  {
    step: 5,
    title: "Pemeriksaan Bersama Penutur Asli",
    icon: Users,
    status: "Kegiatan Lapangan yang Belum Dilaksanakan",
    description:
      "Membacakan kembali hasil transkripsi dan terjemahan kepada penutur atau sesepuh masyarakat untuk memastikan tidak ada kekeliruan tafsir budaya maupun salah eja.",
  },
  {
    step: 6,
    title: "Penyuntingan & Penyelarasan Glosarium",
    icon: CheckCircle,
    status: "Telah Diimplementasikan pada Kamus Kosakata",
    description:
      "Mengidentifikasi kata-kata kunci kebudayaan, membuat catatan glosarium kontekstual, dan menyelaraskan tanda waktu (timestamp) audio dengan teks.",
  },
  {
    step: 7,
    title: "Publikasi Sesuai Batasan Izin",
    icon: Share2,
    status: "Telah Diimplementasikan pada Prototipe Web",
    description:
      "Menampilkan naskah cerita secara terbuka di katalog web bilingual, lengkap dengan informasi atribusi dan label transparansi status pemeriksaan.",
  },
  {
    step: 8,
    title: "Koreksi Terbuka & Pembaruan Partisipatif",
    icon: RefreshCw,
    status: "Telah Diimplementasikan via Formulir Usulan",
    description:
      "Membuka ruang bagi pembaca dan pemerhati bahasa untuk mengusulkan perbaikan jika ditemukan ketidaktepatan ejaan atau usulan padanan yang lebih selaras.",
  },
];

export default function MetodologiPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-16 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Kerangka Kerja Dokumentasi
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
          Metodologi Dokumentasi Cerita
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Alur delapan tahap yang dirancang AKAR untuk mendokumentasikan tradisi lisan secara bermartabat, menghormati hak narasumber, dan menjaga ketepatan makna bahasa.
        </p>
      </div>

      {/* Status Transparency Matrix Banner */}
      <div className="p-6 rounded-card bg-surface border border-[#23483D]/12 shadow-soft flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-forest" aria-hidden="true" />
          <h2 className="font-serif text-xl font-bold text-ink">
            Transparansi Status Pengembangan Prototipe
          </h2>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          Sebagai prototipe akademik pendukung esai, penting untuk membedakan secara jujur antara alur yang dirancang secara konseptual, fitur teknis yang telah diimplementasikan dalam aplikasi ini, dan kegiatan lapangan nyata yang masih merupakan rencana masa depan:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-2">
          <div className="p-4 rounded-xl bg-forest/5 border border-forest/15 flex flex-col gap-1.5">
            <span className="font-bold text-forest uppercase tracking-wider text-[11px]">
              Fitur yang Sudah Berfungsi:
            </span>
            <ul className="text-ink-muted flex flex-col gap-1 list-disc list-inside">
              <li>Pembaca bilingual sejajar</li>
              <li>Pemutar audio dengan pelacakan waktu</li>
              <li>Kamus glosarium kontekstual interaktif</li>
              <li>Penyimpanan bookmark dan formulir koreksi lokal</li>
              <li>Draf kontribusi mandiri dengan ekspor JSON</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gold/10 border border-gold/25 flex flex-col gap-1.5">
            <span className="font-bold text-gold-dark uppercase tracking-wider text-[11px]">
              Alur yang Dirancang (Konseptual):
            </span>
            <ul className="text-ink-muted flex flex-col gap-1 list-disc list-inside">
              <li>Protokol perizinan narasumber etis</li>
              <li>Standar transkripsi undak usuk basa</li>
              <li>Sistem peninjauan ganda oleh penutur</li>
              <li>Tata kelola hak cipta komunitas adat</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-terracotta/5 border border-terracotta/20 flex flex-col gap-1.5">
            <span className="font-bold text-terracotta uppercase tracking-wider text-[11px]">
              Kegiatan Lapangan yang Belum Dilaksanakan:
            </span>
            <ul className="text-ink-muted flex flex-col gap-1 list-disc list-inside">
              <li>Perekaman langsung penutur asli di lapangan</li>
              <li>Wawancara narasumber perseorangan</li>
              <li>Validasi leksikografi oleh dewan bahasa</li>
              <li>Integrasi pangkalan data server terpusat</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 8-Step Methodology Cards */}
      <section aria-label="Tahapan Metodologi" className="flex flex-col gap-6">
        <h2 className="font-serif text-2xl font-bold text-ink">
          Delapan Tahap Alur Dokumentasi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {METHODOLOGY_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-6 sm:p-7 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest font-bold text-sm">
                      {step.step}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-forest/5 text-forest border border-forest/10">
                      {step.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <Icon className="w-4 h-4 text-terracotta" aria-hidden="true" />
                    <h3 className="font-serif text-lg font-bold text-ink">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Link to Explore Stories */}
      <div className="p-8 rounded-card bg-background border border-[#23483D]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg font-bold text-ink">
            Lihat Penerapannya pada Naskah Cerita
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Buka katalog cerita untuk melihat implementasi pembaca bilingual dan glosarium interaktif.
          </p>
        </div>

        <Link
          href="/jelajah"
          className="px-6 py-3 rounded-full bg-forest text-white font-semibold text-xs hover:bg-forest-dark transition-colors flex items-center gap-2 touch-target"
        >
          <span>Buka Katalog Cerita</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
