import { StoryCategory } from "./story";

export interface ContributionDraft {
  id: string;
  step: number;
  updatedAt: string;

  // Step 1: Informasi cerita
  titleSu: string;
  titleId: string;
  category: StoryCategory;
  region: string;
  sourceLanguage: "Sunda" | "Indonesia" | "Bilingual";
  summary: string;

  // Step 2: Isi cerita & audio
  contentSu: string;
  contentId?: string;
  audioFileName?: string;
  audioFileSize?: number;
  glossaryNotes?: string;

  // Step 3: Sumber & persetujuan
  contributorName: string;
  sourceType: string;
  consentStatement: string;
  allowPublicAttribution: boolean;
  sensitiveContentExcludedDeclaration: boolean;
}

export interface CorrectionProposal {
  id: string;
  storyId: string;
  storyTitle: string;
  paragraphId: string;
  correctionType: "Ejaan Bahasa Sunda" | "Ketepatan Terjemahan" | "Konteks Budaya" | "Lainnya";
  originalText: string;
  suggestedText: string;
  notes: string;
  createdAt: string;
}
