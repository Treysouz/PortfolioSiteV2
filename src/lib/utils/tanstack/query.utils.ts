import { QueryClient } from '@tanstack/svelte-query';

/**
 * Creates a QueryClient instance for Tanstack Query.
 * @returns {QueryClient} Configured QueryClient instance
 */
export const createQueryClient = (): QueryClient => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity
			}
		}
	});
};
