import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
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

	test('toggles menu when button is clicked', async () => {
		render(MobileNav);

		const menuButton = screen.getByRole('button');

		expect(menuButton).toHaveAttribute('aria-expanded', 'false');

		// Open menu
		await fireEvent.click(menuButton);

		expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		const navMenu = screen.getByRole('menu');
		expect(navMenu).toBeInTheDocument();

		// Close menu
		await fireEvent.click(menuButton);

		expect(menuButton).toHaveAttribute('aria-expanded', 'false');
		expect(navMenu).toHaveClass('hidden');
	});

	test('sets up click event listener on mount', () => {
		render(MobileNav);

		expect(document.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
	});

	test('cleans up click event listener on unmount', () => {
		const { unmount } = render(MobileNav);

		unmount();

		expect(document.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
	});

	test('closes menu when clicking outside', async () => {
		render(MobileNav);

		const menuButton = screen.getByRole('button');

		// Open menu
		await fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute('aria-expanded', 'true');

		// Add element to body as a target for outside click.
		const outsideElement = document.createElement('div');

		document.body.appendChild(outsideElement);

		// Close menu by clicking the outside element.
		await fireEvent.click(outsideElement);

		expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	});
});
