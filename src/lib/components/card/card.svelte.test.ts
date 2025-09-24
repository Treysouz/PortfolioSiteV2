import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './card.svelte';
import { createRawSnippet } from 'svelte';

// Mock text content to render as the child for the Card component.
const mockTextContent = '<p>Mock content<p>';
const mockSnippet = createRawSnippet(() => {
	return { render: () => mockTextContent };
});

describe('Card component', () => {
	it('should render children without error', () => {
		const screen = render(Card, {
			children: mockSnippet
		});

		expect(screen.getByRole('article')).toBeDefined();
	});

	it("should render with appropriate class when component's class is defined", () => {
		const screen = render(Card, {
			class: 'custom-class',
			children: mockSnippet
		});

		const card = screen.getByRole('article');

		expect(card?.className).toContain('custom-class');
	});

	it('should render without children', () => {
		const screen = render(Card);

		const card = screen.getByRole('article');

		expect(card?.textContent).toBe('');
	});
});
