import { MockInstance } from 'vitest';

declare global {
	var mockIntersectionObserver: MockInstance;
	var mockObserverInstance: {
		observe: MockInstance;
		unobserve: MockInstance;
		disconnect: MockInstance;
	};
	var mockPage: {
		route: {
			id: string;
		};
	};
}
