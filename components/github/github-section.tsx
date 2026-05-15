"use client";

// Client component that loads and renders trending GitHub repositories.
import { useFetchData } from "@/hooks/useFetchData";
import { getTrendingRepositories } from "@/services/github";
import { SectionError } from "../ui/section-error";
import { SectionLoading } from "../ui/section-loading";
import { GithubItem } from "./github-item";

export function GithubSection() {
	// Fetch all repositories as one section-level request.
	const { data, isLoading, error } = useFetchData(
		getTrendingRepositories,
		"Failed to load GitHub repositories",
	);

	// Show a full section skeleton while repositories are loading.
	if (isLoading) return <SectionLoading title="GitHub Trending" />;

	// Show the shared section error when the repository request fails.
	if (error) return <SectionError title="GitHub Trending" message={error} />;

	// Avoid rendering an empty section if no repository data is available.
	if (!data) return null;

	return (
		<section className="rounded-xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800">
			<h2 className="text-xl font-semibold">GitHub Trending</h2>

			<div className="mt-4 space-y-4">
				{/* Render each repository as a reusable item card. */}
				{data.map((repository) => (
					<GithubItem key={repository.id} repository={repository} />
				))}
			</div>
		</section>
	);
}
