import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import NavItem from './nav-item.svelte';

describe('NavItem component', () => {
	it('should call onclick handler when clicked', async () => {
		// Mock click handler.
		const mockClick = vi.fn();

		const linkName = 'About Me';

		render(NavItem, {
			text: linkName,
			onclick: mockClick
		});

		const link = screen.getByText(linkName);

		await fireEvent.click(link);

		expect(mockClick).toHaveBeenCalledWith(expect.any(MouseEvent));
	});
});
