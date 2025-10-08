import { browser } from '$app/environment';
import type { Settings } from './settings.types';

/** Default settings */
export const DEFAULT_SETTINGS: Settings = {
	animatedGradient: true,
	animatedBg: true,
	transitions: true,
	opacityEffect: true,
	jonahMode: false
};

/** Local storage key for Settings */
export const SETTINGS_STORAGE_KEY = 'portfolio-settings';

const loadFromlocalStorage = () => {
	try {
		if (browser) {
			const storedValue = localStorage.getItem(SETTINGS_STORAGE_KEY);

			if (storedValue) {
				return JSON.parse(storedValue);
			}
		}
		return DEFAULT_SETTINGS;
	} catch (error) {
		console.error(error);
	}
};

/** State for settings */
export const SettingsStore: Settings = $state(loadFromlocalStorage());
