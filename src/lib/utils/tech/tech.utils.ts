import type { QueryClient } from '@tanstack/svelte-query';
import { post } from '../api';

import type { TechType, SortConfig, PostPayload, Tech } from '../../types/tech.types';

export const queryTechData = async (
	queryClient: QueryClient,
	searchValue?: string,
	types?: TechType[],
	sortConfig?: SortConfig
): Promise<Tech[]> => {
	const payload: PostPayload = {
		value: searchValue,
		types,
		sort: sortConfig
	};

	const cacheKey = ['tech', payload];

	const response: Tech[] = await post<Tech[]>('/data/tech', payload, {
		queryClient,
		cacheKey
	});

	return response;
};
