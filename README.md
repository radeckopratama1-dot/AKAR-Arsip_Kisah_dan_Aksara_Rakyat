# AKAR: Arsip Kisah, Aksara, dan Ragam Budaya

> "Merawat cerita, menghubungkan generasi."

AKAR adalah ruang dokumentasi cerita lokal yang mempertemukan bahasa Sunda dan bahasa Indonesia melalui teks, rekaman suara, dan konteks budaya. Prototipe ini dikembangkan secara khusus untuk mendokumentasikan cerita lokal Purwakarta dalam bahasa Sunda dan terjemahan bahasa Indonesia, sebagai media pendukung esai akademik mahasiswa.

Prototipe ini merupakan proyek akademik independen dan tidak berafiliasi atau bermitra resmi dengan pemerintah daerah, komunitas, maupun lembaga komersial tertentu. Seluruh data cerita awal merupakan konten fiksi demonstrasi dan teks Sunda belum ditinjau oleh penutur asli maupun ahli bahasa.

## Fitur Utama

1. **Katalog Cerita dan Pencarian Interaktif (/jelajah)**
   - Pencarian multi-bidang (judul bahasa Sunda dan Indonesia, ringkasan, dan tag cerita).
   - Filter dinamis berdasarkan kategori (Kehidupan Desa, Tradisi, Kuliner dan Pasar, Benda Pusaka, Lingkungan).
   - Filter ketersediaan rekaman audio.
   - Pengurutan berdasarkan tanggal rilis atau abjad judul.
   - Sinkronisasi URL search parameters sehingga hasil filter dan pencarian dapat dibagikan langsung.
   - Indikator jumlah hasil dan tombol pembersih filter yang responsif.

2. **Pembaca Cerita Bilingual (/cerita/[slug])**
   - Mode membaca tiga arah: Berdampingan (Bilingual), Bahasa Sunda saja, atau Bahasa Indonesia saja.
   - Penjajaran paragraf terstruktur dengan ID pasangan paragraf (`pair-01`, `pair-02`, dst.) sehingga keselarasan terjaga di desktop (dua kolom paralel) maupun mobile (vertikal bertumpuk).
   - Pemutar audio terintegrasi dengan pemutar HTML5 native, kontrol laju kecepatan (0.75x hingga 1.5x), pemutaran tunggal (hanya 1 audio aktif), dan indikasi jelas bila rekaman audio belum tersedia.
   - Penandaan bahasa semantik dengan atribut `lang="su"` dan `lang="id"`.
   - Glosarium kontekstual interaktif: kata-kata Sunda bergaris bawah putus-putus dapat diklik atau diakses dengan keyboard (Enter/Spasi) untuk menampilkan modal penjelasan istilah, contoh kalimat, dan status tinjauan penutur.
   - Kontrol pembaca kustom: ukuran teks fleksibel (16px sampai 24px), mode fokus baca (menyamarkan elemen sekunder), dan tombol bagikan tautan.
   - Formulir Usulkan Koreksi: masukan koreksi pembaca tersimpan secara aman di penyimpanan lokal peramban (localStorage) serta dapat diunduh sebagai berkas JSON untuk demonstrasi.

3. **Glosarium Budaya (/glosarium)**
   - Daftar kosakata bahasa Sunda lengkap dengan padanan bahasa Indonesia, contoh kalimat, status peninjauan penutur, dan keterkaitan cerita.
   - Pencarian kosakata cepat dan filter abjad alfabetis.

4. **Koleksi Cerita Pribadi (/koleksi)**
   - Penyimpanan bookmark tanpa perlu autentikasi atau login, berbasis penyimpanan lokal peramban (localStorage).
   - Manajemen koleksi: penambahan atau penghapusan kartu cerita secara instan serta tombol konfirmasi pengosongan koleksi.

5. **Wisaya Kontribusi Bertahap (/kontribusi)**
   - 4 tahap kontribusi terstruktur: Informasi Cerita, Isi dan Terjemahan, Sumber dan Persetujuan Etis, serta Tinjau dan Simpan.
   - Validasi formulir mendalam menggunakan Zod dan React Hook Form dengan pesan kesalahan bahasa Indonesia yang terarah pada input terkait.
   - Dukungan unggah berkas audio lokal penguji yang diproses di IndexedDB / memori lokal untuk demo teknis, dengan keterangan tegas bahwa berkas tersebut bukan rekaman narasumber asli.
   - Fasilitas penyimpanan draf otomatis di peramban serta ekspor draf kontribusi ke berkas JSON.
   - Penegasan etika dan privasi: tidak mengumpulkan NIK atau alamat pribadi, dan kontribusi lokal tidak pernah otomatis dipublikasikan ke katalog umum.

6. **Transparansi Metodologi dan Privasi (/metodologi dan /privasi)**
   - Penjelasan alur dokumentasi 8 tahap: Persetujuan narasumber, dokumentasi audio, transkripsi, penerjemahan, pemeriksaan bersama penutur, penyuntingan, publikasi berizin, serta koreksi dan pembaruan.
   - Batasan arsitektur demo dijelaskan transparan: data pengguna disimpan di peramban pengguna dan belum dikirim ke server pusat.

## Panduan Demonstrasi Presentasi Esai Mahasiswa

Gunakan 6 langkah demonstrasi berikut saat mempresentasikan prototipe AKAR di hadapan penguji atau audiens:

1. **Langkah 1: Menjelajahi Beranda dan Katalog Cerita**
   - Buka halaman utama di `/`. Tunjukkan identitas produk, kartu cerita pilihan, serta penjelasan alur dengar dan baca.
   - Klik tombol "Jelajahi Cerita" menuju `/jelajah`.
   - Ketik kata kunci (misalnya "kebun" atau "pasar") pada bilah pencarian, atau pilih filter kategori "Tradisi". Tunjukkan bahwa URL berubah secara dinamis dan tombol hapus filter bekerja.

2. **Langkah 2: Membuka Pembaca Cerita Bilingual**
   - Pilih cerita "Panen Cengkeh di Pasawahan" (`/cerita/panen-cengkeh-di-pasawahan`).
   - Tunjukkan tampilan teks dua bahasa: teks Sunda di kolom kiri dan terjemahan Indonesia di kolom kanan (atau tampilan berurutan jika dibuka di perangkat seluler).
   - Ubah mode tampilan menggunakan kontrol baca di bagian atas: beralih ke "Sunda Saja", "Indonesia Saja", lalu kembali ke "Bilingual".
   - Sesuaikan ukuran teks menggunakan tombol perbesar/perkecil font (A- dan A+), serta nyalakan mode "Fokus Baca".

3. **Langkah 3: Menguji Glosarium Kontekstual dan Audio**
   - Pada teks cerita bahasa Sunda, klik kata bergaris bawah putus-putus seperti "ngarojong" atau "ngariung".
   - Tunjukkan modal pop-up yang muncul: menampilkan arti kata, contoh penggunaan, serta label status peninjauan penutur.
   - Tutup modal menggunakan tombol silang atau tombol keyboard `Escape`.
   - Putar rekaman audio narasi di bagian pemutar audio atas, atur kecepatan pemutaran menjadi 1.25x atau 1.5x.

4. **Langkah 4: Menyimpan Bookmark ke Koleksi Lokal**
   - Klik tombol "Simpan Cerita" pada bagian tajuk cerita.
   - Navigasi ke menu "Koleksi" (`/koleksi`).
   - Tunjukkan bahwa cerita telah tersimpan rapi. Segarkan peramban (reload page) untuk membuktikan bahwa data tetap bertahan di peramban lokal.

5. **Langkah 5: Mengisi Formulir Kontribusi Bertahap**
   - Klik tombol "Bagikan Cerita" di navigasi atas (`/kontribusi`).
   - Isi Tahap 1 (Judul, Kategori, Wilayah, Ringkasan) lalu klik "Lanjut ke Isi Cerita".
   - Isi Tahap 2 dengan paragraf cerita pendek Sunda dan terjemahannya.
   - Isi Tahap 3 mengenai sumber cerita dan persetujuan etis.
   - Pada Tahap 4 (Tinjau), klik tombol "Simpan Kontribusi di Perangkat".
   - Tunjukkan pesan konfirmasi yang transparan bahwa data tersimpan lokal di perangkat dan belum terkirim ke server pengelola. Uji juga tombol "Unduh Berkas JSON (Ekspor Draf)".

6. **Langkah 6: Meninjau Metodologi Dokumentasi dan Kebijakan Privasi**
   - Buka halaman `/metodologi` untuk mendiskusikan alur etika pelestarian bahasa daerah dan 8 tahapan dokumentasi yang dirancang.
   - Buka halaman `/privasi` untuk menegaskan bahwa prototipe ini menjaga integritas akademik tanpa pelacak komersial, tanpa autentikasi palsu, dan tanpa klaim sepihak.

## Tumpukan Teknologi

- **Kerangka Kerja**: Next.js 14 (App Router)
- **Bahasa**: TypeScript (Strict Mode)
- **Komponen dan Desain**: React 18, Tailwind CSS, Lucide React
- **Validasi dan Formulir**: Zod, React Hook Form
- **Penyimpanan Lokal**: Browser Web Storage (localStorage) dan IndexedDB
- **Pengujian Logika**: Vitest
- **Pengujian End-to-End**: Playwright (menjalankan Google Chrome lokal)

## Struktur Direktori

```text
├── app/
│   ├── layout.tsx             # Root layout dengan font, navbar, footer, skip link
│   ├── page.tsx               # Halaman Beranda (Hero, Cerita Pilihan, Pengantar Baca)
│   ├── jelajah/page.tsx       # Katalog cerita dengan filter dan pencarian
│   ├── cerita/[slug]/page.tsx # Halaman pembaca bilingual interaktif
│   ├── glosarium/page.tsx     # Indeks istilah kosakata Sunda dan pencarian
│   ├── koleksi/page.tsx       # Manajemen bookmark lokal pengguna
│   ├── kontribusi/page.tsx    # Wisaya formulir kontribusi bertahap
│   ├── tentang/page.tsx       # Penjelasan identitas dan sasaran AKAR
│   ├── metodologi/page.tsx    # 8 Tahapan alur dokumentasi budaya
│   ├── privasi/page.tsx       # Penjelasan penyimpanan lokal dan batasan privasi
│   ├── not-found.tsx          # Halaman penanganan 404 ramah pengguna
│   └── error.tsx              # Error boundary global
├── components/
│   ├── audio/                 # Pemutar audio native dengan kontrol laju dan status
│   ├── forms/                 # Form kontribusi bertahap dan uploader audio lokal
│   ├── layout/                # Navbar (dengan drawer seluler), Footer, SkipLink
│   ├── reader/                # BilingualReader, ReaderControls, GlossaryModal, CorrectionModal
│   ├── stories/               # StoryCard, FilterBar
│   └── ui/                    # Komponen tombol dan badge
├── data/
│   ├── stories.ts             # 6 cerita bilingual contoh dari Purwakarta
│   └── glossary.ts            # 16 entri istilah kosakata kontekstual
├── lib/
│   ├── repositories/          # Abstraksi antarmuka repositori data
│   ├── search/                # Algoritma pencarian dan penyaringan data
│   ├── storage/               # Modul penyimpanan localStorage (bookmark, preferensi, draf)
│   └── validation/            # Skema Zod untuk formulir kontribusi dan koreksi
├── public/
│   ├── audio/                 # Berkas audio demonstrasi sintesis suara
│   └── illustrations/         # Ilustrasi SVG editorial lokal
├── tests/
│   ├── unit/                  # Pengujian unit Vitest (pencarian, storage, validasi)
│   └── e2e/                   # Pengujian Playwright (alur pengguna beranda, katalog, reader, bookmark, form)
└── types/                     # Definisi antarmuka TypeScript terpusat
```

## Cara Menjalankan Proyek Secara Lokal

### Prasyarat

- Node.js versi 18 atau lebih tinggi
- Package manager `pnpm` (atau `npm`)

### Instalasi Dependensi

```bash
pnpm install
```

### Menjalankan Server Pengembangan

```bash
pnpm run dev
```

Buka peramban pada alamat `http://localhost:3000`.

### Menjalankan Pengujian

1. **Uji Unit dan Logika (Vitest)**
   ```bash
   pnpm test
   ```
   Menjalankan 27 pengujian unit yang mencakup modul pencarian, penyaringan, validasi formulir Zod, dan operasi penyimpanan lokal.

2. **Uji Validasi Tipe (TypeScript)**
   ```bash
   pnpm run typecheck
   ```
   Memeriksa konsistensi seluruh kode TypeScript dalam strict mode.

3. **Uji End-to-End (Playwright)**
   ```bash
   pnpm test:e2e
   ```
   Menjalankan 6 skenario perjalanan pengguna di peramban Chrome: navigasi beranda, penyaringan katalog, pembacaan bilingual, retensi bookmark, simpan draf kontribusi, dan halaman metodologi.

4. **Kompilasi Produksi (Production Build)**
   ```bash
   pnpm run build
   ```
   Menghasilkan 17 rute statis teroptimasi tanpa kesalahan kompilasi.

## Batasan Prototipe Akademik

1. **Data Bersifat Contoh**: Seluruh cerita dan rekaman audio dalam prototipe ini ditujukan murni untuk demonstrasi teknis antarmuka dan esai akademik mahasiswa, bukan hasil dokumentasi etnografi lapangan yang sudah divalidasi.
2. **Penyimpanan Lokal**: Seluruh data bookmark, draf kontribusi, dan usulan koreksi disimpan di peramban pengguna melalui Web Storage API. Tidak ada server backend aktif yang menyimpan data tersebut di awan.
3. **Rekaman Audio**: Audio yang disediakan merupakan sampel contoh demonstrasi berdurasi 60 detik. Cerita lain yang belum memiliki audio menampilkan status terbuka "Rekaman belum tersedia." tanpa pemalsuan durasi.
