export type ReviewStatus = 
  | "Belum ditinjau penutur"
  | "Draf demonstrasi"
  | "Telah ditinjau penutur";

export type PublicationStatus = 
  | "Prototipe contoh"
  | "Terbit";

export type StoryCategory = 
  | "Kehidupan Sehari-hari"
  | "Pertanian & Alam"
  | "Keluarga & Tradisi"
  | "Gotong Royong"
  | "Kerajinan & Pasar";

export interface ParagraphPair {
  id: string;
  su: string;
  idText: string;
  audioStart?: number;
  audioEnd?: number;
}

export interface AudioAsset {
  language: "su" | "id";
  src: string;
  mimeType: string;
  duration?: number;
  sourceType: string;
  attribution: string;
}

export interface ConsentMetadata {
  hasConsent: boolean;
  consentType: string;
  statement: string;
  displayAttributionAllowed: boolean;
  recordedDate?: string;
}

export interface CoverImage {
  src: string;
  alt: string;
  attribution: string;
}

export interface Story {
  id: string;
  slug: string;
  titleSu: string;
  titleId: string;
  summarySu: string;
  summaryId: string;
  category: StoryCategory;
  tags: string[];
  region: string;
  readingTimeMinutes: number;
  cover: CoverImage;
  paragraphs: ParagraphPair[];
  glossaryTermIds: string[];
  sourceType: string;
  sourceDescription: string;
  attribution: string;
  isDemo: boolean;
  reviewStatus: ReviewStatus;
  publicationStatus: PublicationStatus;
  consentMetadata: ConsentMetadata;
  createdAt: string;
  updatedAt: string;
  audioSu?: AudioAsset;
  audioId?: AudioAsset;
}
