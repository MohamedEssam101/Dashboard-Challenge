export type HackerNewsStoryId = number;

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
export interface HackerNewsStory {
	id: number;
	title: string;
	author: string;
	score: number;
	commentsCount: number;
	publishedAt: number;
	url?: string;
}
