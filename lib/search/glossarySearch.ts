import { GlossaryTerm } from "@/types/glossary";

export interface GlossaryFilterOptions {
  query?: string;
  letter?: string;
}

export function filterGlossaryTerms(
  terms: GlossaryTerm[],
  options: GlossaryFilterOptions
): GlossaryTerm[] {
  const { query, letter } = options;

  let result = [...terms];

  // 1. Starting letter filter
  if (letter && letter !== "Semua") {
    const l = letter.toUpperCase();
    result = result.filter((t) => t.termSu.charAt(0).toUpperCase() === l);
  }

  // 2. Query filter
  if (query && query.trim() !== "") {
    const q = query.trim().toLowerCase();
    result = result.filter(
      (t) =>
        t.termSu.toLowerCase().includes(q) ||
        t.meaningId.toLowerCase().includes(q) ||
        t.exampleSentenceSu.toLowerCase().includes(q) ||
        t.exampleSentenceId.toLowerCase().includes(q) ||
        (t.notes && t.notes.toLowerCase().includes(q))
    );
  }

  return result.sort((a, b) => a.termSu.localeCompare(b.termSu, "su"));
}
