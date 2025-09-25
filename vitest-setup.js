import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock IntersectionObserver globally
const mockObserverInstance = {
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
};

const mockIntersectionObserver = vi.fn(() => mockObserverInstance);

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: mockIntersectionObserver
});

// Mock SvelteKit page store
const mockPage = {
	route: {
		id: '/'
	},
	url: new URL('http://testing.com'),
	params: {},
	data: {}
};

vi.mock('$app/state', () => ({
	page: mockPage
}));

// Make mock available globally for tests
globalThis.mockIntersectionObserver = mockIntersectionObserver;
globalThis.mockObserverInstance = mockObserverInstance;
globalThis.mockPage = mockPage;
