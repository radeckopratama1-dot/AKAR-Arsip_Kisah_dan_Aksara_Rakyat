import { Story, StoryCategory } from "@/types/story";
import { SAMPLE_STORIES } from "@/data/stories";

export interface IStoryRepository {
  getAll(): Promise<Story[]>;
  getBySlug(slug: string): Promise<Story | null>;
  getById(id: string): Promise<Story | null>;
  getCategories(): Promise<StoryCategory[]>;
  getAllTags(): Promise<string[]>;
}

export class LocalStoryRepository implements IStoryRepository {
  private stories: Story[] = SAMPLE_STORIES;

  async getAll(): Promise<Story[]> {
    return [...this.stories];
  }

  async getBySlug(slug: string): Promise<Story | null> {
    const found = this.stories.find((s) => s.slug === slug);
    return found ? { ...found } : null;
  }

  async getById(id: string): Promise<Story | null> {
    const found = this.stories.find((s) => s.id === id);
    return found ? { ...found } : null;
  }

  async getCategories(): Promise<StoryCategory[]> {
    const set = new Set<StoryCategory>();
    this.stories.forEach((s) => set.add(s.category));
    return Array.from(set);
  }

  async getAllTags(): Promise<string[]> {
    const set = new Set<string>();
    this.stories.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }
}

export const storyRepository = new LocalStoryRepository();
