import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AlertCenter from './alert-center.svelte';
import { alertStore } from '$lib/stores/alert';
import type { AlertConfig } from '$lib/stores/alert/alert.types';

beforeEach(() => {
	// Clear the errors map
	alertStore.clear();
});

describe('Alert Center component', () => {
	describe('Rendering', () => {
		it('should not render when there are no errors', () => {
			render(AlertCenter);

			const alertCener = screen.queryByTestId('alert-center');

			expect(alertCener).not.toBeInTheDocument();
		});

		it('should render Alerts when there are errors', () => {
			const mockErrors: AlertConfig[] = [
				{ header: 'Error 1', message: 'Message 1' },
				{ header: 'Error 2', message: 'Message 2' },
				{ header: 'Error 3', message: 'Message 3' }
			];

			mockErrors.forEach((errorConfig, index) => {
				alertStore.set(`error-${index + 1}`, errorConfig);
			});

			render(AlertCenter);

			expect(screen.getByText('Error 1')).toBeInTheDocument();
			expect(screen.getByText('Message 1')).toBeInTheDocument();

			expect(screen.getByText('Error 2')).toBeInTheDocument();
			expect(screen.getByText('Message 2')).toBeInTheDocument();

			expect(screen.getByText('Error 3')).toBeInTheDocument();
			expect(screen.getByText('Message 3')).toBeInTheDocument();

			const alerts = screen.getAllByRole('alert');
			expect(alerts).toHaveLength(3);
		});
	});
});
