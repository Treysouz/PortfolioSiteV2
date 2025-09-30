import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Textbox from './textbox.svelte';
import { createRawSnippet } from 'svelte';

describe('Textbox component', () => {
	describe('Snippets', () => {
		it('should render boxPrefix snippet', () => {
			const prefixSnippet = createRawSnippet(() => ({
				render: () => '<span data-testid="prefix">Prefix</span>'
			}));

			render(Textbox, { boxPrefix: prefixSnippet });
			expect(screen.getByTestId('prefix')).toBeDefined();
		});

		it('should render boxSuffix snippet', () => {
			const suffixSnippet = createRawSnippet(() => ({
				render: () => '<span data-testid="suffix">Suffix</span>'
			}));

			render(Textbox, { boxSuffix: suffixSnippet });
			expect(screen.getByTestId('suffix')).toBeDefined();
		});

		it('should render search icon for search type', () => {
			render(Textbox, { type: 'search' });
			const { container } = render(Textbox, { type: 'search' });
			const svg = container.querySelector('svg');
			expect(svg).toBeDefined();
		});
	});
	describe('focusInput', () => {
		it('should focus the input box', () => {
			const rendering = render(Textbox, { type: 'search' });

			const input = screen.getByRole('textbox');

			rendering.component.focusInput();

			expect(document.activeElement).toBe(input);
		});
	});
});
