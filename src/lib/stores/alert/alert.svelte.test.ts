import { describe, expect, it, beforeEach, vi } from 'vitest';
import { alertStore, addErrorToStore, removeErrorFromStore } from './alert.svelte';
import type { AlertConfig } from './alert.types';

// Mock uuid
const mockV4 = vi.fn();
vi.mock('uuid', () => ({
	v4: () => mockV4()
}));

const mockErrors: AlertConfig[] = [
	{ header: 'Error 1', message: 'Message 1' },
	{ header: 'Error 2', message: 'Message 2' },
	{ header: 'Error 3', message: 'Message 3' }
];

beforeEach(() => {
	// Clear the errors map
	alertStore.clear();

	mockV4.mockReset();
	mockV4.mockReturnValueOnce('uuid-1').mockReturnValueOnce('uuid-2').mockReturnValueOnce('uuid-3');
});

describe('Alert Store', () => {
	describe('addErrorToStore()', () => {
		it('should add error to store', () => {
			// Add error to store
			addErrorToStore(mockErrors[0].header, new Error(mockErrors[0].message));

			const storedError = alertStore.get('uuid-1');

			expect(storedError).toEqual(mockErrors[0]);
		});

		it('should add multiple errors to store', async () => {
			//Add errors to store
			mockErrors.forEach((error) => {
				addErrorToStore(error.header, new Error(error.message));
			});

			const firstStoredError = alertStore.get('uuid-1');
			const secondStoredError = alertStore.get('uuid-2');
			const thirdStoredError = alertStore.get('uuid-3');

			expect(firstStoredError).toEqual(mockErrors[0]);
			expect(secondStoredError).toEqual(mockErrors[1]);
			expect(thirdStoredError).toEqual(mockErrors[2]);
		});
	});

	describe('removeErrorFromStore()', () => {
		it('should remove error from store by key', () => {
			//Add errors to store
			mockErrors.forEach((error) => {
				addErrorToStore(error.header, new Error(error.message));
			});

			removeErrorFromStore('uuid-1');

			expect(alertStore.size).toBe(2);
			expect(alertStore.has('uuid-1')).toBe(false);
			expect(alertStore.has('uuid-2')).toBe(true);
			expect(alertStore.has('uuid-3')).toBe(true);
		});
	});
});
