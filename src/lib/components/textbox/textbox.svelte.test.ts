import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Textbox from './textbox.svelte';
import { createRawSnippet } from 'svelte';

describe('Textbox component', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe('Snippets', () => {
		it('should render boxPrefix snippet', () => {
			const prefixSnippet = createRawSnippet(() => ({
				render: () => '<span data-testid="prefix">Prefix</span>'
			}));

			render(Textbox, { boxPrefix: prefixSnippet, name: 'test' });
			expect(screen.getByTestId('prefix')).toBeDefined();
		});

		it('should render boxSuffix snippet', () => {
			const suffixSnippet = createRawSnippet(() => ({
				render: () => '<span data-testid="suffix">Suffix</span>'
			}));

			render(Textbox, { boxSuffix: suffixSnippet, name: 'test' });
			expect(screen.getByTestId('suffix')).toBeDefined();
		});

		it('should render search icon for search type', () => {
			render(Textbox, { type: 'search', name: 'test' });
			const { container } = render(Textbox, { type: 'search', name: 'test' });
			const svg = container.querySelector('svg');
			expect(svg).toBeDefined();
		});
	});

	describe('focusInput', () => {
		it('should focus the input box', () => {
			const rendering = render(Textbox, { type: 'search', name: 'test' });

			const input = screen.getByRole('textbox');

			rendering.component.focusInput();

			expect(document.activeElement).toBe(input);
		});
	});

	describe('Debouncing', () => {
		it('should call oninput immediately when debounce is 0', async () => {
			const mockOnInput = vi.fn();
			render(Textbox, { name: 'test', debounce: 0, oninput: mockOnInput });

			const input = screen.getByRole('textbox');
			await fireEvent.input(input, { target: { value: 'test' } });

			expect(mockOnInput).toHaveBeenCalledTimes(1);
		});

		it('should debounce oninput when debounce is greater than 0', async () => {
			const mockOnInput = vi.fn();
			render(Textbox, { name: 'test', debounce: 300, oninput: mockOnInput });

			const input = screen.getByRole('textbox');
			await fireEvent.input(input, { target: { value: 't' } });
			await fireEvent.input(input, { target: { value: 'te' } });
			await fireEvent.input(input, { target: { value: 'tes' } });

			expect(mockOnInput).not.toHaveBeenCalled();

			// Advance time by 300 ms
			vi.advanceTimersByTime(300);

			expect(mockOnInput).toHaveBeenCalledTimes(1);
		});
	});
});
