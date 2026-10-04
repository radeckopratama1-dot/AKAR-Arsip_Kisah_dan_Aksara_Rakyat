import { z } from "zod";

export const contributionStep1Schema = z.object({
  titleSu: z
    .string()
    .min(3, "Judul bahasa Sunda wajib diisi minimal 3 karakter.")
    .max(120, "Judul bahasa Sunda maksimal 120 karakter."),
  titleId: z
    .string()
    .min(3, "Judul bahasa Indonesia wajib diisi minimal 3 karakter.")
    .max(120, "Judul bahasa Indonesia maksimal 120 karakter."),
  category: z.enum([
    "Kehidupan Sehari-hari",
    "Pertanian & Alam",
    "Keluarga & Tradisi",
    "Gotong Royong",
    "Kerajinan & Pasar",
  ], {
    errorMap: () => ({ message: "Pilih salah satu kategori cerita." }),
  }),
  region: z
    .string()
    .min(3, "Asal wilayah umum wajib diisi (contoh: Wanayasa, Pasawahan, Plered)."),
  sourceLanguage: z.enum(["Sunda", "Indonesia", "Bilingual"], {
    errorMap: () => ({ message: "Pilih bahasa sumber cerita." }),
  }),
  summary: z
    .string()
    .min(10, "Ringkasan cerita wajib diisi minimal 10 karakter.")
    .max(300, "Ringkasan maksimal 300 karakter."),
});

export const contributionStep2Schema = z.object({
  contentSu: z
    .string()
    .min(20, "Teks cerita bahasa Sunda wajib diisi minimal 20 karakter."),
  contentId: z.string().optional(),
  audioFileName: z.string().optional(),
  glossaryNotes: z.string().optional(),
});

export const contributionStep3Schema = z.object({
  contributorName: z
    .string()
    .min(2, "Nama tampilan atau nama samaran wajib diisi minimal 2 karakter."),
  sourceType: z
    .string()
    .min(3, "Jenis sumber wajib diisi (contoh: Cerita keluarga, tuturan warga)."),
  consentStatement: z
    .string()
    .min(10, "Keterangan izin dokumentasi wajib diisi minimal 10 karakter."),
  allowPublicAttribution: z.boolean().default(true),
  sensitiveContentExcludedDeclaration: z
    .boolean()
    .refine((val) => val === true, {
      message: "Pernyataan bebas materi terlarang / data sensitif wajib disetujui.",
    }),
});

export const completeContributionSchema = contributionStep1Schema
  .merge(contributionStep2Schema)
  .merge(contributionStep3Schema);

export type CompleteContributionFormValues = z.infer<typeof completeContributionSchema>;
