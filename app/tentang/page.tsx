import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Compass, Users, Sparkles, ShieldAlert, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang AKAR",
  description:
    "Mengenal AKAR (Arsip Kisah, Aksara, dan Ragam Budaya), ruang dokumentasi cerita bilingual dari Purwakarta yang mempertemukan bahasa Sunda dan bahasa Indonesia.",
};

export default function TentangPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-16 flex flex-col gap-14">
      {/* Header (Single H1) */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Identitas & Gagasan Dasar
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink leading-tight">
          Tentang AKAR: Merawat Cerita, Menghubungkan Generasi
        </h1>
        <p className="text-lg text-ink-muted leading-relaxed">
          AKAR (Arsip Kisah, Aksara, dan Ragam Budaya) adalah ruang dokumentasi cerita lokal yang mempertemukan bahasa Sunda dan bahasa Indonesia melalui teks, rekaman suara, dan konteks budaya.
        </p>
      </div>

      {/* Makna Nama & Filosofi */}
      <section className="p-8 sm:p-12 rounded-card bg-surface border border-[#23483D]/12 shadow-soft flex flex-col md:flex-row items-center gap-10">
        <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 relative">
          <Image
            src="/illustrations/logo-akar.svg"
            alt="Logo lambang AKAR"
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl font-bold text-forest">
            Makna Nama & Filosofi
          </h2>
          <p className="text-sm text-ink leading-relaxed">
            Kata <strong className="text-forest">AKAR</strong> dipilih sebagai metafora bagi ingatan kultural dan bahasa ibu. Seperti halnya pohon yang membutuhkan akar yang kokoh di dalam tanah untuk terus tumbuh rimbun, masyarakat modern membutuhkan tautan batin dengan cerita para leluhurnya agar tidak kehilangan pegangan nilai.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Akar tidak terlihat di permukaan, tetapi dialah yang menyerap sari kehidupan. Cerita-cerita keseharian di pedesaan Purwakarta, mulai dari kebun cengkih Pasawahan hingga bengkel kriya Plered, adalah akar-akar kecil yang menopang pohon kebudayaan kita.
          </p>
        </div>
      </section>

      {/* Fokus Dua Bahasa */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-labelledby="focus-title">
        <div className="p-8 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
            <BookOpen className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 id="focus-title" className="font-serif text-2xl font-bold text-ink">
            Fokus Sunda & Indonesia
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Bahasa Sunda memiliki kekayaan tingkatan tutur (undak usuk basa), onomatope, dan idiom yang melekat erat pada bentang alam Priangan. AKAR menyajikan teks Sunda dalam bentuk aslinya tanpa disederhanakan secara berlebihan, agar keaslian ekspresi tetap utuh.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Secara bersamaan, terjemahan bahasa Indonesia hadir berdampingan untuk memperluas akses bagi pembaca yang sedang belajar, generasi muda di perkotaan, maupun sahabat pembaca dari berbagai penjuru Nusantara.
          </p>
        </div>

        {/* Sasaran Pengguna */}
        <div className="p-8 rounded-card bg-surface border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta">
            <Users className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink">
            Sasaran Pembaca & Pengguna
          </h2>
          <ul className="text-sm text-ink-muted flex flex-col gap-2.5">
            <li className="flex items-start gap-2">
              <span className="text-forest font-bold">•</span>
              <span><strong>Generasi Muda & Pelajar:</strong> Membantu pemahaman sastra lisan dan kosakata bahasa Sunda dengan bantuan terjemahan kontekstual.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forest font-bold">•</span>
              <span><strong>Penutur & Warga Lokal:</strong> Memberikan ruang terhormat bagi cerita keseharian dan tuturan keluarga agar tidak lenyap ditelan waktu.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forest font-bold">•</span>
              <span><strong>Pembaca Lintas Daerah:</strong> Mengenalkan kekayaan cara pandang masyarakat Purwakarta kepada publik luas.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Perjumpaan Budaya */}
      <section className="p-8 sm:p-10 rounded-card bg-background border border-[#23483D]/15 flex flex-col gap-4">
        <h2 className="font-serif text-2xl font-bold text-ink">
          Dokumentasi Bahasa sebagai Perjumpaan Budaya
        </h2>
        <p className="text-sm text-ink leading-relaxed">
          Mendokumentasikan cerita bukan sekadar menyimpan arsip statis di dalam lemari digital. Dokumentasi yang baik adalah perjumpaan yang hidup antara penutur yang mengingat dan pendengar yang menghargai. Dengan menghadirkan rekaman suara dan glosarium budaya, AKAR berupaya mendekatkan jarak emosional antara teks di layar dengan manusia di balik tuturan tersebut.
        </p>
      </section>

      {/* Batasan Prototipe Akademik */}
      <section className="p-8 sm:p-10 rounded-card bg-terracotta/5 border border-terracotta/20 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-terracotta" aria-hidden="true" />
          <h2 className="font-serif text-2xl font-bold text-terracotta">
            Status Prototipe Akademik & Batasannya
          </h2>
        </div>
        <p className="text-sm text-ink leading-relaxed">
          Situs web ini merupakan <strong>prototipe akademik</strong> yang dirancang mandiri untuk mendukung penulisan esai mahasiswa mengenai dokumentasi bahasa dan sastra lisan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ink-muted mt-2">
          <div className="p-4 rounded-xl bg-surface border border-terracotta/15">
            <span className="font-bold text-ink block mb-1">Tanpa Kemitraan Resmi:</span>
            Aplikasi ini belum bermitra dengan instansi pemerintah, balai bahasa, maupun lembaga adat tertentu.
          </div>
          <div className="p-4 rounded-xl bg-surface border border-terracotta/15">
            <span className="font-bold text-ink block mb-1">Konten Demonstrasi:</span>
            Seluruh naskah cerita dan rekaman saat ini merupakan bahan simulasi sintetis dan belum melalui uji validasi lapangan.
          </div>
          <div className="p-4 rounded-xl bg-surface border border-terracotta/15">
            <span className="font-bold text-ink block mb-1">Penyimpanan Terisolasi:</span>
            Seluruh bookmark dan usulan kontribusi hanya tersimpan pada peramban lokal perangkat Anda.
          </div>
          <div className="p-4 rounded-xl bg-surface border border-terracotta/15">
            <span className="font-bold text-ink block mb-1">Tanpa Klaim Kuantitatif Palsu:</span>
            Tidak ada data statistik jumlah pengunjung, persentase keberhasilan, atau testimoni palsu yang dicantumkan.
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <Link
            href="/metodologi"
            className="text-xs font-semibold text-forest hover:text-forest-dark flex items-center gap-1.5 touch-target"
          >
            <span>Pelajari Alur Metodologi Dokumentasi</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
