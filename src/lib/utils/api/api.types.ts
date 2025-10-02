import type { QueryClient } from '@tanstack/svelte-query';

/** Object representing data for an API error */
export interface ApiError {
	/** Status code for error */
	status: number;
	/** Message for error */
	message: string;
}
/** Options for managing caching for an API request */
export interface QueryOptions {
	/** QueryClient instance for caching */
	queryClient?: QueryClient;
	/** Cache key for storing the response */
	cacheKey?: unknown[];
}
