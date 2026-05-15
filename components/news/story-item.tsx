"use client";

// Client component for a single Hacker News story row.
import { useNewsStory } from "@/hooks/useNewsStory";
import { SectionError } from "../ui/section-error";
import { SectionLoadingContent } from "../ui/section-loading";

interface StoryItemProps {
	id: number;
}

export function StoryItem({ id }: StoryItemProps) {
	// Fetch this story independently so one slow row does not block the list.
	const { data, isLoading, error } = useNewsStory(id);

	if (isLoading) {
		// Render a row-sized skeleton while this specific story is pending.
		return (
			<article className="rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
				<SectionLoadingContent rows={1} className="space-y-4" />
			</article>
		);
	}

	if (error) {
		// Keep row failures local to the affected story.
		return <SectionError title="Error loading the story" message={error} />;
	}

	// Nothing renders if the API returns an empty story.
	if (!data) return null;

	return (
		<article className="rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/70">
			<div className="flex items-start gap-3">
				{/* Hacker News source badge. */}
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-sm font-bold text-orange-700 dark:border-orange-900/70 dark:bg-orange-950/40 dark:text-orange-300">
					HN
				</div>

				<div className="min-w-0 flex-1 space-y-2">
					{/* Story title and author. */}
					<div>
						<h3 className="font-semibold leading-snug">
							{data.url ? (
								<a
									className="text-zinc-900 hover:text-blue-600 hover:underline dark:text-zinc-100 dark:hover:text-blue-400"
									href={data.url}
									target="_blank"
									rel="noreferrer"
								>
									{data.title}
								</a>
							) : (
								data.title
							)}
						</h3>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							By {data.author}
						</p>
					</div>

					{/* Score, comment count, and optional story link metadata. */}
					<div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
						<span className="rounded-full bg-white px-2.5 py-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
							{data.score.toLocaleString()} points
						</span>
						<span className="rounded-full bg-white px-2.5 py-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
							{data.commentsCount.toLocaleString()} comments
						</span>
						{data.url && (
							<a
								className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700 ring-1 ring-blue-100 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60 dark:hover:bg-blue-950/70"
								href={data.url}
								target="_blank"
								rel="noreferrer"
							>
								Read story
							</a>
						)}
					</div>
				</div>
			</div>
		</article>
	);
}
