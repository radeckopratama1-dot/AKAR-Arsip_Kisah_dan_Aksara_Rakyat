import { z } from "zod";

export const correctionSchema = z.object({
  storyId: z.string(),
  storyTitle: z.string(),
  paragraphId: z.string(),
  correctionType: z.enum(
    [
      "Ejaan Bahasa Sunda",
      "Ketepatan Terjemahan",
      "Konteks Budaya",
      "Lainnya",
    ],
    {
      errorMap: () => ({ message: "Pilih jenis koreksi yang diajukan." }),
    }
  ),
  originalText: z.string(),
  suggestedText: z
    .string()
    .min(3, "Usulan perbaikan wajib diisi minimal 3 karakter.")
    .max(500, "Usulan perbaikan maksimal 500 karakter."),
  notes: z
    .string()
    .max(300, "Catatan tambahan maksimal 300 karakter.")
    .optional(),
});

export type CorrectionFormValues = z.infer<typeof correctionSchema>;
