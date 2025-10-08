import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Alert from './alert.svelte';
import * as alertStore from '$lib/stores/alert';

const mockErrorConfig = {
	header: 'Error Header',
	alertKey: 'test-key',
	message: 'Error message details'
};

// Mock the removeErrorFromStore function
vi.mock('$lib/stores/alert', () => ({
	removeErrorFromStore: vi.fn()
}));

describe('Alert component', () => {
	describe('Rendering', () => {
		it('should render with header and message', () => {
			render(Alert, mockErrorConfig);

			expect(screen.getByText('Error Header')).toBeInTheDocument();
			expect(screen.getByText('Error message details')).toBeInTheDocument();
		});
	});

	describe('Close button', () => {
		it('should call removeErrorFromStore() when clicked', async () => {
			const mockRemoveError = vi.mocked(alertStore.removeErrorFromStore);

			render(Alert, mockErrorConfig);

			const closeButton = screen.getByRole('button');
			await fireEvent.click(closeButton);

			expect(mockRemoveError).toHaveBeenCalledWith('test-key');
		});
	});
});
