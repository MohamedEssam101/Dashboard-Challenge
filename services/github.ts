import { slowFetch } from "@/shared/slow-fetch";
import { GithubRepository, GithubSearchResponse } from "@/types/github";

// GitHub search endpoint for recently updated high-star repositories.
const GITHUB_URL =
	"https://api.github.com/search/repositories?q=stars:>10000&sort=updated&per_page=5";

export async function getTrendingRepositories(): Promise<GithubRepository[]> {
	// GitHub returns the five repositories in one response, so this section loads as one unit.
	const response = await slowFetch(GITHUB_URL);
	if (!response.ok) {
		// A failed search request means the whole GitHub section cannot render.
		throw new Error("Failed to fetch GitHub repositories");
	}

	const data: GithubSearchResponse = await response.json();

	// Map GitHub's search items into the repository model used by the UI.
	return data.items.map((repository) => ({
		id: repository.id,
		name: repository.name,
		fullName: repository.full_name,
		url: repository.html_url,
		description: repository.description,
		stars: repository.stargazers_count,
		forks: repository.forks_count,
		language: repository.language,
		updatedAt: repository.updated_at,
		owner: {
			name: repository.owner.login,
			avatarUrl: repository.owner.avatar_url,
			url: repository.owner.html_url,
		},
	}));
}
