import { describe, expect, it, vi, beforeEach } from 'vitest';
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from './settings.svelte';
import { addErrorToStore } from '../alert';

// Mock $app/environment
vi.mock('$app/environment', () => ({
	browser: true
}));

// Mock alert store
vi.mock('../alert', () => ({
	addErrorToStore: vi.fn()
}));

beforeEach(() => {
	// Clear localStorage before each test
	localStorage.clear();
	vi.resetAllMocks();
});

describe('Settings Store', () => {
	describe('loadFromlocalStorage()', () => {
		it('should return default settings when localStorage is empty', async () => {
			const { SettingsStore } = await import('./settings.svelte');

			expect(SettingsStore.animatedGradient).toBe(DEFAULT_SETTINGS.animatedGradient);
			expect(SettingsStore.animatedBg).toBe(DEFAULT_SETTINGS.animatedBg);
			expect(SettingsStore.transitions).toBe(DEFAULT_SETTINGS.transitions);
			expect(SettingsStore.opacityEffect).toBe(DEFAULT_SETTINGS.opacityEffect);
			expect(SettingsStore.jonahMode).toBe(DEFAULT_SETTINGS.jonahMode);
		});

		it('should load settings from localStorage when available', async () => {
			const storedSettings = {
				animatedGradient: false,
				animatedBg: false,
				transitions: false,
				opacityEffect: false,
				jonahMode: true
			};

			localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(storedSettings));

			// Import store
			vi.resetModules();
			const { SettingsStore } = await import('./settings.svelte');

			expect(SettingsStore.animatedGradient).toBe(false);
			expect(SettingsStore.animatedBg).toBe(false);
			expect(SettingsStore.transitions).toBe(false);
			expect(SettingsStore.opacityEffect).toBe(false);
			expect(SettingsStore.jonahMode).toBe(true);
		});

		it('should handle partial settings from localStorage', async () => {
			const partialSettings = {
				animatedGradient: false,
				jonahMode: true
			};

			localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(partialSettings));

			// Import store
			vi.resetModules();
			const { SettingsStore } = await import('./settings.svelte');

			expect(SettingsStore.animatedGradient).toBe(false);
			expect(SettingsStore.jonahMode).toBe(true);
		});

		it('should return default settings when localStorage contains invalid JSON and call error handler', async () => {
			localStorage.setItem(SETTINGS_STORAGE_KEY, 'invalid-json');

			// Import store
			vi.resetModules();
			await import('./settings.svelte');

			expect(addErrorToStore).toHaveBeenCalledWith(
				'Failed to Load Settings From Cache',
				expect.any(Error)
			);
		});
	});
});
