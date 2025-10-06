import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
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

	it('should render nav without error', () => {
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
});
