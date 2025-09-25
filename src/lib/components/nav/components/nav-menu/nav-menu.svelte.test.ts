import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import NavMenu from './nav-menu.svelte';

// Mock querySelectorAll
const mockQuerySelectorAll = vi.fn();

describe('NavMenu component', () => {
	beforeEach(() => {
		// Set up DOM mocks
		Object.defineProperty(document, 'querySelectorAll', {
			writable: true,
			configurable: true,
			value: mockQuerySelectorAll.mockReturnValue([])
		});

		// Reset the global IntersectionObserver mock
		globalThis.mockIntersectionObserver.mockClear();
		globalThis.mockObserverInstance.observe.mockClear();
		globalThis.mockObserverInstance.unobserve.mockClear();
		globalThis.mockObserverInstance.disconnect.mockClear();

		// Reset querySelectorAll mock
		mockQuerySelectorAll.mockClear();
		mockQuerySelectorAll.mockReturnValue([]);

		// Reset page mock to default route
		globalThis.mockPage.route.id = '/';
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	test('sets up intersection observer with $effect when page loads', () => {
		// Mock query selector to return mock sleections.
		const mockSections = [{ id: 'about' }, { id: 'tech' }, { id: 'projects' }, { id: 'contact' }];
		mockQuerySelectorAll.mockReturnValue(mockSections);

		render(NavMenu);

		// Check that IntersectionObserver was created with correct options
		expect(globalThis.mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
			threshold: 0.5,
			rootMargin: '-20% 0px -20% 0px'
		});

		// Check that observe was called for each section
		mockSections.forEach((section) => {
			expect(globalThis.mockObserverInstance.observe).toHaveBeenCalledWith(section);
		});
	});

	test('cleans up intersection observer on unmount', () => {
		const mockSections = [{ id: 'about' }, { id: 'tech' }];
		mockQuerySelectorAll.mockReturnValue(mockSections);

		const { unmount } = render(NavMenu);

		unmount();

		// Check that unobserve was called for each section
		mockSections.forEach((section) => {
			expect(globalThis.mockObserverInstance.unobserve).toHaveBeenCalledWith(section);
		});
	});
});
