import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Nav from './nav.svelte';

describe('Nav component', () => {
	let originalInnerWidth: number;

	beforeEach(() => {
		originalInnerWidth = window.innerWidth;

		// Spying on EventListener
		vi.spyOn(window, 'addEventListener');
		vi.spyOn(window, 'removeEventListener');
	});

	afterEach(() => {
		// Restore original window width
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: originalInnerWidth
		});
		vi.restoreAllMocks();
	});

	test('renders desktop nav when window width is greater than 640px', () => {
		// Mock window width for desktop
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 1200
		});

		render(Nav);

		const desktopNav = screen.getByTestId('desktop-nav');

		expect(desktopNav).toBeInTheDocument();
	});

	test('renders mobile nav when window width is 640px or less', () => {
		// Mock window width for mobile
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 620
		});

		render(Nav);

		const mobileNav = screen.getByTestId('mobile-nav');

		expect(mobileNav).toBeInTheDocument();
	});

	test('sets up resize event listener on mount', () => {
		render(Nav);

		expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
	});

	test('cleans up resize event listener on unmount', () => {
		const { unmount } = render(Nav);

		unmount();

		expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
	});
});
