import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render h1', () => {
		const screen = render(Page);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeDefined();
	});
});
