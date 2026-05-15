interface SectionErrorProps {
	title: string;
	message?: string | null;
}

// Shared error state for dashboard sections and story rows.
export function SectionError({ title, message }: SectionErrorProps) {
	return (
		<section className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-900/50 dark:bg-red-950/30">
			<div className="flex items-start gap-3">
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<circle cx="12" cy="12" r="10"/>
						<line x1="12" y1="8" x2="12" y2="12"/>
						<line x1="12" y1="16" x2="12.01" y2="16"/>
					</svg>
				</div>
				<div className="flex-1">
					<h2 className="font-semibold text-red-900 dark:text-red-200">{title}</h2>
					<p className="mt-1 text-sm text-red-700 dark:text-red-300">
						{message || "Something went wrong while loading this section."}
					</p>
				</div>
			</div>
		</section>
	);
}
