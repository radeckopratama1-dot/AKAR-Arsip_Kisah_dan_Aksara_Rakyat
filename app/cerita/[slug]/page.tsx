import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { storyRepository } from "@/lib/repositories/storyRepository";
import { glossaryRepository } from "@/lib/repositories/glossaryRepository";
import { StoryReaderClient } from "./StoryReaderClient";

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const stories = await storyRepository.getAll();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await storyRepository.getBySlug(slug);

  if (!story) {
    return {
      title: "Cerita Tidak Ditemukan",
    };
  }

  return {
    title: `${story.titleId} (${story.titleSu})`,
    description: story.summaryId,
    openGraph: {
      title: `${story.titleId} | AKAR`,
      description: story.summaryId,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await storyRepository.getBySlug(slug);

  if (!story) {
    notFound();
  }

  // Fetch glossary terms for contextual popups
  const glossaryTerms = await glossaryRepository.getAll();

  return <StoryReaderClient story={story} glossaryTerms={glossaryTerms} />;
}
