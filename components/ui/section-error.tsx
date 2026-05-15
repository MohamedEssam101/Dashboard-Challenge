interface SectionErrorProps {
	title: string;
	message?: string | null;
}

// Shared error state for dashboard sections and story rows.
export function SectionError({ title, message }: SectionErrorProps) {
	return (
		<section>
			<h2>{title}</h2>
			<p>{message}</p>
		</section>
	);
}
