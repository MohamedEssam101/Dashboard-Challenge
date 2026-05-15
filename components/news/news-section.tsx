"use client";

// Client component that fetches the top Hacker News story IDs.
import { getHackerNewsStoryIds } from "@/services/hacker-news";
import { SectionLoading } from "../ui/section-loading";
import { SectionError } from "../ui/section-error";
import { useFetchData } from "@/hooks/useFetchData";
import { StoryItem } from "./story-item";

export function NewsSection() {
	// Load only story IDs here; each row fetches its own story details.
	const { data, isLoading, error } = useFetchData(
		getHackerNewsStoryIds,
		"Failed to load tech news",
	);

	// Show a section-level skeleton while the top-story ID request is pending.
	if (isLoading) return <SectionLoading title="Tech News" />;

	// If the ID request fails, the whole news section cannot render.
	if (error || !data) return <SectionError title="Tech News" message={error} />;

	return (
		<section className="rounded-xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800">
			<h2 className="text-xl font-semibold">Tech News</h2>

			<div className="mt-4 space-y-4">
				{/* Render one independent story row for each selected Hacker News ID. */}
				{data.map((id) => (
					<StoryItem key={id} id={id} />
				))}
			</div>
		</section>
	);
}
