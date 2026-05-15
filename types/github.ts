// Raw GitHub search response shape.
export interface GithubSearchResponse {
	items: GithubRepositoryResponse[];
}

// Raw GitHub repository item shape from the search API.
export interface GithubRepositoryResponse {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	updated_at: string;
	owner: {
		login: string;
		avatar_url: string;
		html_url: string;
	};
}

// Repository shape used by React components after mapping the API response.
export interface GithubRepository {
	id: number;
	name: string;
	fullName: string;
	url: string;
	description: string | null;
	stars: number;
	forks: number;
	language: string | null;
	updatedAt: string;
	owner: {
		name: string;
		avatarUrl: string;
		url: string;
	};
}
