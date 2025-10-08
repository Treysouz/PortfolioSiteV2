import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Drawer from './drawer.svelte';
import { createRawSnippet } from 'svelte';

const mockContent = createRawSnippet(() => ({
	render: () => '<div data-testid="drawer-content">Drawer Content</div>'
}));

describe('Drawer component', () => {
	describe('Rendering', () => {
		it('should render content when provided', () => {
			render(Drawer, {
				content: mockContent,
				open: true
			});

			const content = screen.getByTestId('drawer-content');
			expect(content).toBeInTheDocument();
			expect(content.textContent).toBe('Drawer Content');
		});
	});

	describe('Toggle behavior', () => {
		it('should close when overlay is clicked', async () => {
			render(Drawer, {
				content: mockContent,
				open: true
			});

			// Click overlay to close drawer
			const overlay = screen.getByLabelText('Close Drawer');
			await fireEvent.click(overlay);

			const checkbox = screen.getByRole('checkbox', { hidden: true });
			expect(checkbox).not.toBeChecked();
		});

		it('should toggle open state when checkbox is toggled', async () => {
			render(Drawer, {
				content: mockContent,
				open: false
			});

			const checkbox = screen.getByRole('checkbox', { hidden: true });
			expect(checkbox).not.toBeChecked();

			//Toggle on drawer
			await fireEvent.click(checkbox);
			expect(checkbox).toBeChecked();

			//Toggle off drawer
			await fireEvent.click(checkbox);

			expect(checkbox).not.toBeChecked();
		});
	});
});
