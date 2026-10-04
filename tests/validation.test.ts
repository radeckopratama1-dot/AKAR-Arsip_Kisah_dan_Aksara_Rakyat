import { describe, it, expect } from "vitest";
import {
  contributionStep1Schema,
  contributionStep2Schema,
  contributionStep3Schema,
  completeContributionSchema,
} from "@/lib/validation/contributionSchema";
import { correctionSchema } from "@/lib/validation/correctionSchema";

describe("Contribution Validation Schemas", () => {
  it("should validate step 1 with valid inputs", () => {
    const validData = {
      titleSu: "Carita Lembur Pasawahan",
      titleId: "Cerita Desa Pasawahan",
      category: "Pertanian & Alam",
      region: "Pasawahan",
      sourceLanguage: "Sunda",
      summary: "Ieu mangrupakeun carita ngeunaan tradisi tatanen cengkeh.",
    };
    const result = contributionStep1Schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail step 1 if titleSu is too short", () => {
    const invalidData = {
      titleSu: "ab",
      titleId: "Cerita",
      category: "Pertanian & Alam",
      region: "Pasawahan",
      sourceLanguage: "Sunda",
      summary: "Ringkasan cerita contoh panjang.",
    };
    const result = contributionStep1Schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should validate step 2 with required contentSu", () => {
    const validData = {
      contentSu: "Dina hiji mangsa, aya carita ngeunaan kahirupan patani cengkeh di Pasawahan anu getol tatanen.",
      contentId: "Pada suatu masa ada kisah tentang kehidupan petani cengkih.",
    };
    const result = contributionStep2Schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail step 2 if contentSu is under 20 chars", () => {
    const invalidData = {
      contentSu: "Pondok pisan.",
    };
    const result = contributionStep2Schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should validate step 3 only when sensitive content declaration is checked", () => {
    const validData = {
      contributorName: "Ki Juru Pantun",
      sourceType: "Tuturan keluarga",
      consentStatement: "Narasumber parantos masihan idin kalawan ikhlas.",
      allowPublicAttribution: true,
      sensitiveContentExcludedDeclaration: true,
    };
    expect(contributionStep3Schema.safeParse(validData).success).toBe(true);

    const invalidData = {
      ...validData,
      sensitiveContentExcludedDeclaration: false,
    };
    expect(contributionStep3Schema.safeParse(invalidData).success).toBe(false);
  });
});

describe("Correction Validation Schema", () => {
  it("should validate a valid correction proposal", () => {
    const valid = {
      storyId: "story-1",
      storyTitle: "Panen Cengkih",
      paragraphId: "p1",
      correctionType: "Ejaan Bahasa Sunda",
      originalText: "Isuk keneh halimun",
      suggestedText: "Isuk kénéh halimun ngagantung",
      notes: "Perlu menggunakan aksara taling",
    };
    const res = correctionSchema.safeParse(valid);
    expect(res.success).toBe(true);
  });

  it("should reject correction with empty suggested text", () => {
    const invalid = {
      storyId: "story-1",
      storyTitle: "Panen Cengkih",
      paragraphId: "p1",
      correctionType: "Ejaan Bahasa Sunda",
      originalText: "Isuk",
      suggestedText: "",
    };
    const res = correctionSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });
});
