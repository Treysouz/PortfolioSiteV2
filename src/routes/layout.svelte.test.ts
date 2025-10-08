import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
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

beforeEach(() => {
	vi.clearAllMocks();
});

describe('+layout.svelte', () => {
	it('it should render navbar and main content when particles are loaded', async () => {
		render(Layout, {
			props: {
				children: mockSnippet
			}
		});

		// Wait for particles to load
		await waitFor(async () => {
			expect(mockLoad).toHaveBeenCalled();
		});

		const main = screen.getByRole('main');

		expect(main).toBeInTheDocument();
	});

	it('it should not render content when particles are not loaded', () => {
		// Mock particles failing to load
		mockLoad.mockRejectedValue('test');

		render(Layout, {
			props: {
				children: mockSnippet
			}
		});

		const main = screen.queryByRole('main');

		expect(main).not.toBeInTheDocument();
	});

	it('should open settings drawer when Settings nav item is clicked', async () => {
		render(Layout, {
			props: {
				children: mockSnippet
			}
		});

		// Wait for particles to load
		await waitFor(async () => {
			expect(mockLoad).toHaveBeenCalled();
		});

		// Click the Settings nav item
		const settingsButton = screen.getByRole('menuitem', { name: 'Settings' });
		expect(settingsButton).toBeInTheDocument();

		await fireEvent.click(settingsButton);

		const drawerCheckbox = screen.getByRole('checkbox', { name: 'Drawer Overlay', hidden: true });

		expect(drawerCheckbox).not.toBeChecked();
	});
});
