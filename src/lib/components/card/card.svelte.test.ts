import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './card.svelte';

// Mock text content to render as the child for the Card component.
const mockTextContent = 'Test content';
describe('Card component', () => {
	it('should render children without error', () => {
		const screen = render(Card, {
			children: () => mockTextContent
		});

		expect(screen.getByRole('article')).toBeDefined();
	});

	it("should render with appropriate class when component's class is defined", () => {
		const screen = render(Card, {
			class: 'custom-class',
			children: () => mockTextContent
		});

		const card = screen.getByRole('article');

		expect(card?.className).toContain('custom-class');
	});

	it('should render with default classes when no custom class is provided', () => {
		const screen = render(Card);

		const card = screen.getByRole('article');

		expect(card?.className).toContain('rounded-lg');
		expect(card?.className).toContain('bg-black/15');
		expect(card?.className).toContain('p-4');
		expect(card?.className).toContain('shadow-md');
		expect(card?.className).toContain('backdrop-blur-sm');
	});

	it('should render without children', () => {
		const screen = render(Card);

		const card = screen.getByRole('article');

		expect(card?.textContent).toBe('');
	});
});
