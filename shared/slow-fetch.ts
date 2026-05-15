// Fetch wrapper that simulates slow public APIs for the challenge.
export async function slowFetch(url: string): Promise<Response> {
	// Add a random 2-3 second delay before making the real request.
	const delay = 2000 + Math.random() * 1000;
	await new Promise((resolve) => setTimeout(resolve, delay));
	return fetch(url);
}
