import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Layout from './+layout.svelte';
import { createRawSnippet } from 'svelte';

// Mock tsParticles
const mockLoadSlim = vi.fn().mockResolvedValue(undefined);
const mockLoad = vi.fn().mockResolvedValue(undefined);

vi.mock('@tsparticles/engine', () => ({
	tsParticles: {
		load: () => {
			mockLoad();
		}
	}
}));

vi.mock('@tsparticles/slim', () => ({
	loadSlim: () => {
		mockLoadSlim();
	}
}));

// Mock content to render
const mockSnippet = createRawSnippet(() => {
	return {
		render: () => '<div>Mock content</div>'
	};
});

describe('+layout.svelte', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('it should render navbar and main content when particles are loaded', async () => {
		render(Layout, {
			props: {
				children: mockSnippet
			}
		});

		// Wait for particles to load
		await vi.waitFor(async () => {
			expect(mockLoad).toHaveBeenCalled();
		});

		expect(screen.getByRole('navigation')).toBeInTheDocument();
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	it('it should not render content when particles are not loaded', () => {
		// Mock particles failing to load
		mockLoad.mockRejectedValue('test');

		render(Layout, {
			props: {
				children: mockSnippet
			}
		});

		expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
		expect(screen.queryByRole('main')).not.toBeInTheDocument();
	});
});
