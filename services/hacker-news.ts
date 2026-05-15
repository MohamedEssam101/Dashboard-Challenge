import { slowFetch } from "@/shared/slow-fetch";
import type {
	HackerNewsStory,
	HackerNewsStoryId,
	HackerNewsStoryResponse,
} from "@/types/news";

// Hacker News API endpoint for the global top stories list.
const HACKER_NEWS_TOP_STORIES_URL =
	"https://hacker-news.firebaseio.com/v0/topstories.json";

// The parent section fetches only IDs first, then renders one story row per ID.
export async function getHackerNewsStoryIds(): Promise<HackerNewsStoryId[]> {
	const response = await slowFetch(HACKER_NEWS_TOP_STORIES_URL);
	if (!response.ok) {
		// Without IDs, the news section cannot render any story rows.
		throw new Error("Failed to fetch Hacker News story IDs");
	}
	const ids: HackerNewsStoryId[] = await response.json();

	// Only the first five IDs are needed for the dashboard list.
	return ids.slice(0, 5);
}

export async function getHackerNewsStory(
	id: HackerNewsStoryId,
): Promise<HackerNewsStory> {
	// Fetching one story at a time lets each row resolve independently in the UI.
	const response = await slowFetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
	);
	if (!response.ok) {
		// A failed item request should only affect this story row.
		throw new Error("Failed to fetch Hacker News story");
	}
	const story: HackerNewsStoryResponse = await response.json();

	// Map the Hacker News item payload into the flat story model used by the UI.
	return {
		id: story.id,
		title: story.title,
		author: story.by,
		score: story.score,
		commentsCount: story.descendants ?? 0,
		publishedAt: story.time,
		url: story.url,
	};
}
