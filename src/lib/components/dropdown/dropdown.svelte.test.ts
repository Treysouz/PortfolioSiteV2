import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Dropdown from './dropdown.svelte';
import { createRawSnippet } from 'svelte';

const mockToggleComponent = createRawSnippet(() => ({
	render: () => '<span>Toggle Button</span>'
}));

const mockMenuComponent = createRawSnippet(() => ({
	render: () => '<span>Menu Content</span>'
}));

describe('Dropdown component', () => {
	describe('Rendering', () => {
		it('should render with toggle content', () => {
			const { container } = render(Dropdown, {
				toggle: mockToggleComponent,
				menu: mockMenuComponent,
				label: 'Test'
			});

			expect(container.textContent).toContain('Toggle Button');
		});

		it('should render menu content when opened', async () => {
			const { container } = render(Dropdown, {
				toggle: mockToggleComponent,
				menu: mockMenuComponent,
				label: 'Test',
				open: true
			});

			expect(container.textContent).toContain('Menu Content');
		});
	});

	describe('Open/Close behavior', () => {
		it('should toggle open state when clicked', async () => {
			render(Dropdown, {
				toggle: mockToggleComponent,
				menu: mockMenuComponent,
				label: 'Test'
			});

			const summary = screen.getByText('Toggle Button');

			await fireEvent.click(summary);

			const menu = screen.queryByText('Menu Content');
			expect(menu).toBeVisible();

			await fireEvent.click(summary);
			expect(menu).not.toBeVisible();
		});

		it('should close when clicking outside', async () => {
			render(Dropdown, {
				open: true,
				toggle: mockToggleComponent,
				menu: mockMenuComponent,
				label: 'Test'
			});

			const menu = screen.getByText('Menu Content');

			// Click outside the dropdown
			await fireEvent.click(document.body);

			expect(menu).not.toBeVisible();
		});
	});
});
