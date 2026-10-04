import { Story, StoryCategory } from "@/types/story";

export interface StoryFilterOptions {
  query?: string;
  category?: StoryCategory | "Semua";
  hasAudio?: boolean | null;
  sortBy?: "newest" | "title-id" | "title-su" | "reading-time";
}

export function filterAndSortStories(
  stories: Story[],
  options: StoryFilterOptions
): Story[] {
  const { query, category, hasAudio, sortBy = "newest" } = options;

  let result = [...stories];

  // 1. Text Search (Case-insensitive across titles, summaries, tags, region)
  if (query && query.trim() !== "") {
    const q = query.trim().toLowerCase();
    result = result.filter((story) => {
      const matchTitleSu = story.titleSu.toLowerCase().includes(q);
      const matchTitleId = story.titleId.toLowerCase().includes(q);
      const matchSummarySu = story.summarySu.toLowerCase().includes(q);
      const matchSummaryId = story.summaryId.toLowerCase().includes(q);
      const matchRegion = story.region.toLowerCase().includes(q);
      const matchTags = story.tags.some((tag) => tag.toLowerCase().includes(q));

      return (
        matchTitleSu ||
        matchTitleId ||
        matchSummarySu ||
        matchSummaryId ||
        matchRegion ||
        matchTags
      );
    });
  }

  // 2. Category Filter
  if (category && category !== "Semua") {
    result = result.filter((story) => story.category === category);
  }

  // 3. Audio Filter
  if (typeof hasAudio === "boolean") {
    result = result.filter((story) => {
      const hasAudioTrack = Boolean(story.audioSu?.src || story.audioId?.src);
      return hasAudio ? hasAudioTrack : !hasAudioTrack;
    });
  }

  // 4. Sorting
  result.sort((a, b) => {
    switch (sortBy) {
      case "title-id":
        return a.titleId.localeCompare(b.titleId, "id");
      case "title-su":
        return a.titleSu.localeCompare(b.titleSu, "su");
      case "reading-time":
        return a.readingTimeMinutes - b.readingTimeMinutes;
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return result;
}
