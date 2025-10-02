import { QueryClient } from '@tanstack/svelte-query';

/**
 * Creates a QueryClient instance with custom default options.
 * - Cache persists during navigation but clears on page refresh
 * - Data never becomes stale to prevent automatic refetching
 */
export const createQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity
			}
		}
	});
};
