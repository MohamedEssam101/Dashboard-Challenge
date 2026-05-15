import { slowFetch } from "@/shared/slow-fetch";
import type {
	HackerNewsStory,
	HackerNewsStoryId,
	HackerNewsStoryResponse,
} from "@/types/news";

const HACKER_NEWS_TOP_STORIES_URL =
	"https://hacker-news.firebaseio.com/v0/topstories.json";

export async function getHackerNewsStoryIds(): Promise<HackerNewsStoryId[]> {
	const response = await slowFetch(HACKER_NEWS_TOP_STORIES_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch Hacker News story IDs");
	}
	const ids: HackerNewsStoryId[] = await response.json();
	return ids.slice(0, 5);
}



export async function getHackerNewsStory(
	id: HackerNewsStoryId,
): Promise<HackerNewsStory> {
	const response = await slowFetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
	);
	if (!response.ok) {
		throw new Error("Failed to fetch Hacker News story");
	}
	const story: HackerNewsStoryResponse = await response.json();
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
