import { useEffect, useState } from "react";

// Function shape accepted by the reusable fetch hook.
export type AsyncFetcher<T> = () => Promise<T>;

// State shape returned by section-level data requests.
export interface UseFetchDataState<T> {
	data: T | null;
	isLoading: boolean;
	error: string | null;
}

// Client-only hook for loading one section-level async resource.
export function useFetchData<T>(
	fetcher: AsyncFetcher<T>,
	errorMessage = "Failed to load data",
): UseFetchDataState<T> {
	// Each section owns its own data, loading, and error state.
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isCancelled = false;
		async function loadData() {
			try {
				// Reset the state before every request so retries show the correct UI.
				setIsLoading(true);
				setError(null);
				const result = await fetcher();

				if (!isCancelled) {
					setData(result);
				}
			} catch {
				if (!isCancelled) {
					setError(errorMessage);
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false);
				}
			}
		}
		loadData();
		return () => {
			// Ignore late responses if the component unmounts while the request is running.
			isCancelled = true;
		};
	}, [fetcher, errorMessage]);

	return { data, isLoading, error };
}
