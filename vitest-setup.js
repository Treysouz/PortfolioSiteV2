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

// Make mock available globally for tests
globalThis.mockIntersectionObserver = mockIntersectionObserver;
globalThis.mockObserverInstance = mockObserverInstance;
