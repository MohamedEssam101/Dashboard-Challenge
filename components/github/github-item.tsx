import Image from "next/image";
import type { GithubRepository } from "@/types/github";

interface GithubItemProps {
	repository: GithubRepository;
}

// Presentation card for one GitHub repository.
export function GithubItem({ repository }: GithubItemProps) {
	return (
		<article className="rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/70">
			<div className="flex items-start gap-3">
				{/* Repository owner avatar linking to the owner's GitHub profile. */}
				<a href={repository.owner.url} target="_blank" rel="noreferrer">
					<Image
						className="h-10 w-10 rounded-full border border-zinc-200 dark:border-zinc-700"
						src={repository.owner.avatarUrl}
						alt={`${repository.owner.name} avatar`}
						width={40}
						height={40}
					/>
				</a>

				<div className="min-w-0 flex-1 space-y-2">
					{/* Repository name, owner name, and optional description. */}
					<div>
						<h3 className="truncate font-semibold leading-snug">
							<a
								className="text-zinc-900 hover:text-blue-600 hover:underline dark:text-zinc-100 dark:hover:text-blue-400"
								href={repository.url}
								target="_blank"
								rel="noreferrer"
							>
								{repository.fullName}
							</a>
						</h3>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							By {repository.owner.name}
						</p>
					</div>

					{repository.description && (
						<p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
							{repository.description}
						</p>
					)}

					{/* Repository stats and primary language metadata. */}
					<div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
						<span className="rounded-full bg-white px-2.5 py-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
							{repository.stars.toLocaleString()} stars
						</span>
						<span className="rounded-full bg-white px-2.5 py-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
							{repository.forks.toLocaleString()} forks
						</span>
						{repository.language && (
							<span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60">
								{repository.language}
							</span>
						)}
					</div>
				</div>
			</div>
		</article>
	);
}
