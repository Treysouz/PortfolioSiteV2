import { describe, expect, it, beforeAll, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Combobox from './combobox.svelte';

interface TestOption {
	id: string;
	name: string;
}

const mockOptions: TestOption[] = [
	{ id: '1', name: 'Option 1' },
	{ id: '2', name: 'Option 2' },
	{ id: '3', name: 'Option 3' },
	{ id: '4', name: 'Option 4' }
];

// Mock scrollIntoView for jsdom
beforeAll(() => {
	Element.prototype.scrollIntoView = vi.fn();
});

describe('Combobox component', () => {
	describe('Rendering', () => {
		it('should display placeholder when no selection', () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				placeholder: 'Select an option'
			});

			const selectedOptions = screen.getByTestId('selected-options');

			expect(selectedOptions).toHaveTextContent('Select an option');
		});

		it('should display selected value in single mode', async () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				value: [mockOptions[0]]
			});

			const selectedOptions = screen.getByTestId('selected-options');

			expect(selectedOptions).toHaveTextContent('Option 1');
		});

		it('should display count in multiple mode', () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				multiple: true,
				value: [mockOptions[0], mockOptions[1]]
			});

			const selectedOptions = screen.getByTestId('selected-options');

			expect(selectedOptions).toHaveTextContent('Test (2)');
		});

		it('should show clear button when value is selected', () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				value: [mockOptions[0]]
			});

			const clearButton = screen.getByLabelText('Clear selection');
			expect(clearButton).toBeDefined();
		});
		it('should render listbox with options when open', () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				open: true
			});

			const listbox = screen.getByRole('listbox');
			expect(listbox).toBeDefined();

			const options = screen.getAllByRole('option');
			expect(options.length).toBe(4);
		});
	});

	describe('Selection behavior', () => {
		it('should mark multiple selected options in multiple mode', () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				multiple: true,
				value: [mockOptions[0], mockOptions[2]],
				open: true
			});

			const options = screen.getAllByRole('option');
			expect(options[0].getAttribute('aria-selected')).toBe('true');
			expect(options[1].getAttribute('aria-selected')).toBe('false');
			expect(options[2].getAttribute('aria-selected')).toBe('true');
		});

		it('should clear selection when clear button clicked', async () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				value: [mockOptions[0]]
			});

			const clearButton = screen.getByLabelText('Clear selection');
			await fireEvent.click(clearButton);

			expect(clearButton).not.toBeVisible();
		});
	});

	describe('Search Box', () => {
		it('should filter options based on search input', async () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				enableSearch: true,
				open: true
			});

			const searchbox = screen.getByRole('textbox');
			await fireEvent.input(searchbox, { target: { value: 'Option 1' } });

			const options = screen.getAllByRole('option');

			expect(options.length).toBeLessThan(4);
		});
	});

	describe('Keyboard navigation', () => {
		it('should highlight option on ArrowDown', async () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				open: true,
				enableSearch: true
			});

			const searchbox = screen.getByRole('textbox');
			await fireEvent.keyDown(searchbox, { key: 'ArrowDown' });

			// First option should be highlighted
			const firstOption = screen.getAllByTestId('combobox-option-name')[0];
			expect(firstOption.className).toContain('bg-secondary/25');
		});

		it('should close dropdown on Escape', async () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				open: true
			});

			const searchbox = screen.getByRole('textbox');
			await fireEvent.keyDown(searchbox, { key: 'Escape' });

			const listbox = screen.getByRole('listbox');
			expect(listbox).not.toBeVisible();
		});

		it('should support Home key to jump to first option', async () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				open: true
			});

			const searchbox = screen.getByRole('textbox');
			await fireEvent.keyDown(searchbox, { key: 'Home' });

			const firstOption = screen.getAllByTestId('combobox-option-name')[0];
			expect(firstOption.className).toContain('bg-secondary/25');
		});

		it('should support End key to jump to last option', async () => {
			render(Combobox<TestOption>, {
				label: 'Test',
				options: mockOptions,
				searchKey: 'name',
				idKey: 'id',
				open: true
			});

			const searchbox = screen.getByRole('textbox');
			await fireEvent.keyDown(searchbox, { key: 'End' });

			const lastOption = screen.getAllByTestId('combobox-option-name')[3];
			expect(lastOption.className).toContain('bg-secondary/25');
		});
	});
});
