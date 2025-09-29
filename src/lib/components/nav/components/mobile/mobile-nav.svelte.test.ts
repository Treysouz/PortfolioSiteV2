import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import MobileNav from './mobile-nav.svelte';

describe('MobileNav component', () => {
	beforeEach(() => {
		// Spying on EventListener
		vi.spyOn(document, 'addEventListener');
		vi.spyOn(document, 'removeEventListener');
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should toggle menu when button is clicked', async () => {
		render(MobileNav);

		const menuButton = screen.getByTitle('Open Menu');

		expect(menuButton).toHaveAttribute('aria-expanded', 'false');

		// Open menu
		await fireEvent.click(menuButton);

		await waitFor(() => {
			expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		});

		const navMenu = screen.getByRole('menu');
		expect(navMenu).toBeVisible();

		// Close menu
		await fireEvent.click(menuButton);

		await waitFor(() => {
			expect(menuButton).toHaveAttribute('aria-expanded', 'false');
		});

		expect(navMenu).not.toBeVisible();
	});

	it('should set up click event listener on mount', () => {
		render(MobileNav);

		expect(document.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
	});

	it('should clean up click event listener on unmount', () => {
		const { unmount } = render(MobileNav);

		unmount();

		expect(document.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
	});

	it('should close menu when clicking outside', async () => {
		render(MobileNav);

		const menuButton = screen.getByTitle('Open Menu');

		// Open menu
		await fireEvent.click(menuButton);

		const navMenu = screen.getByRole('menu');

		expect(navMenu).toBeVisible();

		await waitFor(() => {
			expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		});

		// Add element to body as a target for outside click.
		const outsideElement = document.createElement('div');

		document.body.appendChild(outsideElement);

		// Close menu by clicking the outside element.
		await fireEvent.click(outsideElement);

		await waitFor(() => {
			expect(menuButton).toHaveAttribute('aria-expanded', 'false');
			expect(navMenu).not.toBeVisible();
		});
	});
});
