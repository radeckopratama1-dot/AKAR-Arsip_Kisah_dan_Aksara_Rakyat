import { GlossaryTerm } from "@/types/glossary";
import { GLOSSARY_TERMS } from "@/data/glossary";

export interface IGlossaryRepository {
  getAll(): Promise<GlossaryTerm[]>;
  getById(id: string): Promise<GlossaryTerm | null>;
  getByIds(ids: string[]): Promise<GlossaryTerm[]>;
  getLetters(): Promise<string[]>;
}

export class LocalGlossaryRepository implements IGlossaryRepository {
  private terms: GlossaryTerm[] = GLOSSARY_TERMS;

  async getAll(): Promise<GlossaryTerm[]> {
    return [...this.terms].sort((a, b) => a.termSu.localeCompare(b.termSu, "su"));
  }

  async getById(id: string): Promise<GlossaryTerm | null> {
    const found = this.terms.find((t) => t.id.toLowerCase() === id.toLowerCase());
    return found ? { ...found } : null;
  }

  async getByIds(ids: string[]): Promise<GlossaryTerm[]> {
    const set = new Set(ids.map((i) => i.toLowerCase()));
    return this.terms.filter((t) => set.has(t.id.toLowerCase()));
  }

  async getLetters(): Promise<string[]> {
    const letters = new Set<string>();
    this.terms.forEach((t) => {
      const first = t.termSu.charAt(0).toUpperCase();
      if (first) letters.add(first);
    });
    return Array.from(letters).sort();
  }
}

export const glossaryRepository = new LocalGlossaryRepository();
