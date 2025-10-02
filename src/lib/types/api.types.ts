import type { QueryClient } from '@tanstack/svelte-query';

/**
 * Represents an API error with status code and message.
 * Used for consistent error handling across API utilities.
 */
export interface ApiError {
	/** HTTP status code (e.g., 400, 404, 500) */
	status: number;
	/** Human-readable error message */
	message: string;
}

/**
 * Options for TanStack Query caching in API requests.
 * Pass these options to enable client-side caching via QueryClient.
 */
export interface QueryOptions {
	/** TanStack QueryClient instance for managing cache */
	queryClient?: QueryClient;
	/** Unique cache key array (e.g., ['tech', { filter: 'React' }]) */
	cacheKey?: unknown[];
}
