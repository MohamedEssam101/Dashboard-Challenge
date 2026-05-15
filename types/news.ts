// Hacker News story IDs are numeric API item IDs.
export type HackerNewsStoryId = number;

// Raw Hacker News story response shape.
export interface HackerNewsStoryResponse {
	id: number;
	by: string;
	descendants?: number;
	kids?: number[];
	score: number;
	time: number;
	title: string;
	type: "story";
	url?: string;
}

// Story shape used by React components after mapping the API response.
export interface HackerNewsStory {
	id: number;
	title: string;
	author: string;
	score: number;
	commentsCount: number;
	publishedAt: number;
	url?: string;
}
