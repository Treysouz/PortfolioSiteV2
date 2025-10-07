import { describe, expect, it, test, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import SettingsDrawer from './settings-drawer.svelte';
import { SettingsStore, DEFAULT_SETTINGS } from '$lib/stores/settings.svelte';

beforeEach(() => {
	SettingsStore.animatedBg = DEFAULT_SETTINGS.animatedBg;
	SettingsStore.animatedGradient = DEFAULT_SETTINGS.animatedGradient;
	SettingsStore.opacityEffect = DEFAULT_SETTINGS.opacityEffect;
	SettingsStore.transitions = DEFAULT_SETTINGS.transitions;
	SettingsStore.jonahMode = DEFAULT_SETTINGS.jonahMode;
});

describe('Settings Drawer component', () => {
	describe('Close functionality', () => {
		it('should close drawer when close button is clicked', async () => {
			render(SettingsDrawer, { open: true });

			const closeButton = screen.getByRole('button', { name: 'Close Drawer' });
			await fireEvent.click(closeButton);

			const checkbox = screen.getByRole('checkbox', { name: 'Close Drawer' });
			expect(checkbox).not.toBeChecked();
		});
	});

	describe('Animation toggles', () => {
		it('should collapse animations section when all animations are disabled', async () => {
			render(SettingsDrawer, { open: true });

			const animationsToggle = screen.getByLabelText('Animations');

			//Disable Animated Background
			const animatedBackgroundToggle = screen.getByLabelText('Animated Background');
			await fireEvent.click(animatedBackgroundToggle);

			//Disable Gradient Animation
			const gradientToggle = screen.getByLabelText('Gradient Text Animation');
			await fireEvent.click(gradientToggle);

			//Disable Transitions
			const transitionsToggle = screen.getByLabelText('Transitions');
			await fireEvent.click(transitionsToggle);

			expect(animationsToggle).not.toBeChecked();
		});

		it('should toggle animations as checked when any animation is enabled', async () => {
			render(SettingsDrawer, { open: true });

			const animationsToggle = screen.getByLabelText('Animations');

			//Disable Animated Background
			const animatedBackgroundToggle = screen.getByLabelText('Animated Background');
			await fireEvent.click(animatedBackgroundToggle);

			//Disable Gradient Animation
			const gradientToggle = screen.getByLabelText('Gradient Text Animation');
			await fireEvent.click(gradientToggle);

			expect(animationsToggle).toBeChecked();
		});
	});

	describe('Individual setting toggles', () => {
		const testCases: { toggleLabel: string; storeKey: keyof typeof SettingsStore }[] = [
			{
				toggleLabel: 'Gradient Text Animation',
				storeKey: 'animatedGradient'
			},
			{
				toggleLabel: 'Animated Background',
				storeKey: 'animatedBg'
			},
			{
				toggleLabel: 'Transitions',
				storeKey: 'transitions'
			},
			{
				toggleLabel: 'Opacity Effect',
				storeKey: 'opacityEffect'
			}
		];

		test.each(testCases)('should toggle $toggleLabel', async ({ toggleLabel, storeKey }) => {
			render(SettingsDrawer, { open: true });

			expect(SettingsStore[storeKey]).toBe(true);

			//Disable setting
			const toggle = screen.getByLabelText(toggleLabel);
			await fireEvent.click(toggle);

			expect(SettingsStore[storeKey]).toBe(false);

			//Enable setting
			await fireEvent.click(toggle);

			expect(SettingsStore[storeKey]).toBe(true);
		});
	});
});
