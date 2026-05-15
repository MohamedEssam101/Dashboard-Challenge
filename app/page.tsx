import { GithubSection } from "@/components/github/github-section";
import { NewsSection } from "@/components/news/news-section";
import { WeatherSection } from "@/components/weather/weather-section";

// Home route that composes the three independent dashboard sections.
export default function Home() {
	return (
		<main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
			{/* Page heading and short dashboard description. */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					Weather, tech news, and GitHub repositories loaded from slow public
					APIs.
				</p>
			</div>

			{/* Each section manages its own data, loading, and error state. */}
			<div className="flex flex-col gap-4">
				<WeatherSection />
				<NewsSection />
				<GithubSection />
			</div>
		</main>
	);
}
