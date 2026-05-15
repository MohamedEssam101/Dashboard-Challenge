import { useEffect, useState } from "react";
import { getHackerNewsStory } from "@/services/hacker-news";
import type { HackerNewsStory, HackerNewsStoryId } from "@/types/news";

// Client-only hook used by story rows to fetch one Hacker News story.
export function useNewsStory(id: HackerNewsStoryId) {
	// Each story row has its own state so one slow or failed story does not affect the rest.
	const [data, setData] = useState<HackerNewsStory | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Depend on the story ID, not a callback, so finishing a fetch does not trigger a refetch loop.
	useEffect(() => {
		let isCancelled = false;

		async function loadStory() {
			try {
				// Show the row skeleton while this specific story is loading.
				setIsLoading(true);
				setError(null);

				const story = await getHackerNewsStory(id);

				if (!isCancelled) {
					setData(story);
				}
			} catch {
				if (!isCancelled) {
					setError("Failed to load story");
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false);
				}
			}
		}

		loadStory();

		return () => {
			// Avoid updating state after the row is removed or replaced.
			isCancelled = true;
		};
	}, [id]);

	return { data, isLoading, error };
}
