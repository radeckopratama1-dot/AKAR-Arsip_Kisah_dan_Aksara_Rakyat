import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Volume2, Sparkles, Shield, ArrowRight, PlusCircle, CheckCircle } from "lucide-react";
import { storyRepository } from "@/lib/repositories/storyRepository";
import { StoryCard } from "@/components/stories/StoryCard";

export default async function HomePage() {
  const stories = await storyRepository.getAll();
  const featuredStories = stories.slice(0, 3);
  const totalCount = stories.length;

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-8 sm:pt-14 pb-6" aria-labelledby="hero-title">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              {/* Small Category Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/10 border border-forest/15 text-forest text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-forest" aria-hidden="true" />
                <span>Arsip cerita bilingual dari Purwakarta</span>
              </div>

              {/* Main Headline (Single H1) */}
              <h1
                id="hero-title"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.15]"
              >
                Cerita berakar, budaya tetap hidup.
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-ink-muted leading-relaxed max-w-2xl">
                Jelajahi kisah dalam bahasa Sunda dan bahasa Indonesia. Temukan suara, makna, dan ingatan yang menghubungkan kita.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/jelajah"
                  className="px-8 py-4 rounded-full bg-forest text-white hover:bg-forest-dark transition-all text-base font-semibold shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2.5 touch-target"
                >
                  <span>Jelajahi Cerita</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/tentang"
                  className="px-8 py-4 rounded-full bg-surface border border-[#23483D]/20 text-forest hover:bg-forest/5 transition-all text-base font-semibold active:scale-95 touch-target"
                >
                  Kenali AKAR
                </Link>
              </div>

              {/* Data Transparency Note */}
              <div className="pt-4 flex items-center gap-3 text-xs text-ink-muted">
                <span className="font-semibold text-forest">{totalCount} cerita contoh</span>
                <span>tercatat dalam prototipe demonstrasi akademik ini</span>
              </div>
            </div>

            {/* Visual Column: Bilingual Reader Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-card overflow-hidden shadow-lifted border border-[#23483D]/10 bg-surface">
                <Image
                  src="/illustrations/hero-bilingual.svg"
                  alt="Pratinjau antarmuka pembaca cerita dua bahasa AKAR dengan teks Sunda dan Indonesia yang saling bersanding."
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILIHAN CERITA CONTOH */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 w-full" aria-labelledby="featured-stories-title">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest mb-2">
              <Sparkles className="w-4 h-4 text-gold" aria-hidden="true" />
              <span>Koleksi Terpilih</span>
            </div>
            <h2 id="featured-stories-title" className="font-serif text-3xl font-bold text-ink">
              Pilihan Cerita Demonstrasi
            </h2>
          </div>

          <Link
            href="/jelajah"
            className="text-sm font-semibold text-forest hover:text-forest-dark transition-colors inline-flex items-center gap-1.5 touch-target"
          >
            <span>Lihat semua {totalCount} cerita</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* PENJELASAN: MEMBACA, MENDENGAR, MEMAHAMI */}
      <section className="bg-surface py-16 border-y border-[#23483D]/10" aria-labelledby="three-pillars-title">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest">
              Pendekatan Tiga Dimensi
            </span>
            <h2 id="three-pillars-title" className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-2">
              Membaca, Mendengar, dan Memahami
            </h2>
            <p className="text-sm text-ink-muted mt-3 leading-relaxed">
              AKAR merancang pengalaman membaca yang tidak mencabut bahasa Sunda dari akarnya, sembari membuka akses seluas-luasnya melalui bahasa Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-card bg-background border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ink">
                Teks Bersanding Rapi
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Naskah Sunda dan terjemahan bahasa Indonesia diselaraskan per pasang paragraf dengan identitas tetap. Pembaca dapat beralih antara tampilan dua bahasa atau fokus pada salah satu bahasa.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-card bg-background border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta">
                <Volume2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ink">
                Rekaman Suara Nyata
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Intonasi dan ritme tutur lisan dirawat melalui pemutar audio tanpa data palsu. Jika rekaman belum tersedia, sistem secara jujur menampilkan status ketiadaan audio.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-card bg-background border border-[#23483D]/10 shadow-soft flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center text-gold-dark">
                <Sparkles className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ink">
                Glosarium Kontekstual
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Istilah khas yang sarat filosofi budaya dapat diklik langsung di dalam naskah untuk membuka makna terperinci, contoh kalimat, dan status peninjauan penutur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PENJELASAN HUBUNGAN DUA BAHASA */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 w-full" aria-labelledby="bilingual-relations-title">
        <div className="p-8 sm:p-12 rounded-card bg-gradient-to-br from-forest-dark to-forest text-[#F7F3EA] shadow-lifted">
          <div className="max-w-2xl flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              Refleksi Linguistik & Kebudayaan
            </span>
            <h2 id="bilingual-relations-title" className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Bahasa Sunda Menyimpan Rasa, Bahasa Indonesia Menautkan Pemahaman
            </h2>
            <p className="text-sm sm:text-base text-[#D8CEBA] leading-relaxed">
              Bahasa daerah memuat cara pandang, humor, keakraban, dan kearifan ekologis yang tidak selalu dapat dialihbahasakan secara harfiah. Hadirnya padanan bahasa Indonesia bukan untuk menggantikan bahasa asli, melainkan menjadi jembatan agar generasi muda dan pembaca lintas daerah dapat menyelami kedalaman cerita tanpa kehilangan konteks asalnya.
            </p>
            <div className="pt-3">
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F7F3EA] text-forest font-semibold text-sm hover:bg-white transition-colors active:scale-95 touch-target shadow-sm"
              >
                <span>Pelajari Pendekatan AKAR</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRATINJAU ALUR DOKUMENTASI METODOLOGI */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 w-full" aria-labelledby="documentation-flow-title">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest mb-2">
              <Shield className="w-4 h-4 text-forest" aria-hidden="true" />
              <span>Integritas Penulisan</span>
            </div>
            <h2 id="documentation-flow-title" className="font-serif text-3xl font-bold text-ink">
              Alur Dokumentasi Budaya
            </h2>
          </div>

          <Link
            href="/metodologi"
            className="text-sm font-semibold text-forest hover:text-forest-dark transition-colors inline-flex items-center gap-1.5 touch-target"
          >
            <span>Baca metodologi 8 tahap selengkapnya</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* 4 Steps preview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-surface border border-[#23483D]/10 flex flex-col gap-2.5">
            <span className="w-8 h-8 rounded-full bg-forest/10 font-bold text-forest flex items-center justify-center text-sm">
              1
            </span>
            <h3 className="font-serif text-base font-bold text-ink">Persetujuan Sumber</h3>
            <p className="text-ink-muted leading-relaxed">
              Memastikan narasumber memberikan izin pencatatan dan publikasi serta menghormati batasan materi privat.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-[#23483D]/10 flex flex-col gap-2.5">
            <span className="w-8 h-8 rounded-full bg-forest/10 font-bold text-forest flex items-center justify-center text-sm">
              2
            </span>
            <h3 className="font-serif text-base font-bold text-ink">Transkripsi & Bahasa</h3>
            <p className="text-ink-muted leading-relaxed">
              Mentranskripsikan tuturan lisan ke aksara latin Sunda baku tanpa memotong idiom atau kekhasan dialek setempat.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-[#23483D]/10 flex flex-col gap-2.5">
            <span className="w-8 h-8 rounded-full bg-forest/10 font-bold text-forest flex items-center justify-center text-sm">
              3
            </span>
            <h3 className="font-serif text-base font-bold text-ink">Pemeriksaan Bersama</h3>
            <p className="text-ink-muted leading-relaxed">
              Meninjau kembali naskah bersama penutur asli untuk memastikan ketepatan ejaan dan nuansa rasa bahasa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-[#23483D]/10 flex flex-col gap-2.5">
            <span className="w-8 h-8 rounded-full bg-forest/10 font-bold text-forest flex items-center justify-center text-sm">
              4
            </span>
            <h3 className="font-serif text-base font-bold text-ink">Koreksi Terbuka</h3>
            <p className="text-ink-muted leading-relaxed">
              Menyediakan ruang bagi pembaca untuk mengusulkan perbaikan jika menemukan ejaan atau terjemahan yang kurang pas.
            </p>
          </div>
        </div>
      </section>

      {/* AJAKAN BERKONTRIBUSI */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 w-full" aria-labelledby="contribution-cta-title">
        <div className="p-8 sm:p-12 rounded-card bg-surface border border-[#23483D]/15 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
              Partisipasi Kolektif
            </span>
            <h2 id="contribution-cta-title" className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              Punya Cerita atau Tuturan dari Lingkungan Anda?
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Bagikan kisah keluarga, ingatan tentang perkebunan, atau perbincangan berharga di tempat tinggal Anda. Simpan drafnya di peramban ini dan ekspor dalam format data terstruktur.
            </p>
          </div>

          <Link
            href="/kontribusi"
            className="flex-shrink-0 px-8 py-4 rounded-full bg-forest text-white font-semibold text-sm hover:bg-forest-dark transition-all flex items-center gap-2.5 shadow-md active:scale-95 touch-target"
          >
            <PlusCircle className="w-5 h-5" aria-hidden="true" />
            <span>Bagikan Cerita di Sini</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
