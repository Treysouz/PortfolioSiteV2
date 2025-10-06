import { describe, expect, it } from 'vitest';
import { createQueryClient } from './query.utils';
import { QueryClient } from '@tanstack/svelte-query';

describe('query.utils', () => {
	describe('createQueryClient()', () => {
		it('should return a QueryClient instance', () => {
			const queryClient = createQueryClient();

			expect(queryClient).toBeInstanceOf(QueryClient);
		});
	});
});
