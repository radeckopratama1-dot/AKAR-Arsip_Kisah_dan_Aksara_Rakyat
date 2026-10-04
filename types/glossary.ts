import { ReviewStatus } from "./story";

export interface GlossaryTerm {
  id: string;
  termSu: string;
  meaningId: string;
  exampleSentenceSu: string;
  exampleSentenceId: string;
  relatedStorySlugs: string[];
  reviewStatus: ReviewStatus;
  notes?: string;
}
