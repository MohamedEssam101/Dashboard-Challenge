interface SectionLoadingProps {
	title: string;
}

// Props for reusable skeleton content inside full sections or smaller rows.
interface SectionLoadingContentProps {
	rows?: number;
	className?: string;
}

// Shared full-section loading state used by dashboard panels.
export function SectionLoading({ title }: SectionLoadingProps) {
	return (
		<section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
			<div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
				<div className="flex items-center justify-between gap-4">
					<h2 className="text-xl font-semibold">{title}</h2>
					<div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
				</div>
			</div>

			<SectionLoadingContent />
		</section>
	);
}

// Reusable skeleton rows for full sections and row-level placeholders.
export function SectionLoadingContent({
	rows = 3,
	className = "space-y-4 p-4",
}: SectionLoadingContentProps) {
	return (
		<div className={className}>
			{Array.from({ length: rows }).map((_, index) => (
				<div key={index} className="animate-pulse space-y-2">
					<div className="h-4 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
					<div className="h-3 w-1/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
					<div className="h-3 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
				</div>
			))}
		</div>
	);
}
