import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-[#F7F3EA] mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & Mission column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative">
                <Image
                  src="/illustrations/logo-akar.svg"
                  alt="Logo AKAR"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FFFCF6] leading-none">
                  AKAR
                </span>
                <span className="text-xs text-[#EAE4D3] mt-1">
                  Arsip Kisah dan Aksara Rakyat
                </span>
              </div>
            </div>

            <p className="text-sm italic text-gold font-medium">
              &ldquo;Merawat cerita, menghubungkan generasi.&rdquo;
            </p>

            <p className="text-sm text-[#D8CEBA] leading-relaxed max-w-lg mt-1">
              AKAR adalah ruang dokumentasi cerita lokal yang mempertemukan bahasa Sunda dan bahasa Indonesia melalui teks, rekaman suara, dan konteks budaya. Berfokus pada dinamika tutur dan kearifan lokal di wilayah Purwakarta.
            </p>

            {/* Academic Prototype Notice */}
            <div className="mt-3 p-3.5 rounded-xl bg-forest/60 border border-white/10 text-xs text-[#EAE4D3]">
              <span className="font-semibold text-white block mb-1">Pemberitahuan Prototipe Akademik:</span>
              Aplikasi ini dikembangkan sebagai prototipe mandiri pendukung esai mahasiswa. Belum ada kemitraan resmi dengan lembaga pemerintah atau komunitas tertentu, dan seluruh data masukan demo hanya tersimpan di peramban lokal.
            </div>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-sm font-semibold tracking-wider uppercase text-gold">
              Navigasi Koleksi
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#EAE4D3]">
              <li>
                <Link href="/jelajah" className="hover:text-white transition-colors">
                  Katalog Cerita
                </Link>
              </li>
              <li>
                <Link href="/glosarium" className="hover:text-white transition-colors">
                  Glosarium Kosakata
                </Link>
              </li>
              <li>
                <Link href="/koleksi" className="hover:text-white transition-colors">
                  Cerita Tersimpan
                </Link>
              </li>
              <li>
                <Link href="/kontribusi" className="hover:text-white transition-colors">
                  Draf Kontribusi Lokal
                </Link>
              </li>
            </ul>
          </div>

          {/* Methodology & Transparency links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-sm font-semibold tracking-wider uppercase text-gold">
              Dokumentasi & Etika
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#EAE4D3]">
              <li>
                <Link href="/tentang" className="hover:text-white transition-colors">
                  Tentang Proyek AKAR
                </Link>
              </li>
              <li>
                <Link href="/metodologi" className="hover:text-white transition-colors">
                  Alur Metodologi 8 Tahap
                </Link>
              </li>
              <li>
                <Link href="/privasi" className="hover:text-white transition-colors">
                  Penyimpanan Lokal & Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line without decorative hr */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C5B9A2]">
          <p>
            &copy; {currentYear} AKAR (Arsip Kisah dan Aksara Rakyat). Hak cipta dilindungi undang-undang.
          </p>
          <p className="text-center sm:text-right">
            Prototipe demonstrasi akademik sastra lisan Sunda dan bahasa Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
