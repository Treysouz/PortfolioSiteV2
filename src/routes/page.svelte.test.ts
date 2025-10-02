import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import { QueryClientProvider } from '@tanstack/svelte-query';
import { createQueryClient } from '$lib/utils/tanstack';
import { createRawSnippet } from 'svelte';

// Mock content to render
const mockSnippet = createRawSnippet(() => ({
	render: () => '<div><h1>Test</h1></div>'
}));

describe('/+page.svelte', () => {
	it('should render h1', () => {
		const queryClient = createQueryClient();

		const screen = render(QueryClientProvider, {
			props: {
				client: queryClient,
				children: mockSnippet
			}
		});
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeDefined();
	});
});
