import { v4 as uuidv4 } from 'uuid';
import { SvelteMap } from 'svelte/reactivity';

import type { AlertConfig } from './alert.types';

export const alertStore: Map<string, AlertConfig> = new SvelteMap();

export const addErrorToStore = (header: string, error: unknown) => {
	if (error instanceof Error) {
		const newConfig: AlertConfig = {
			header,
			message: error.message
		};
		alertStore.set(uuidv4(), newConfig);
	}
};

export const removeErrorFromStore = (alertKey: string) => {
	alertStore.delete(alertKey);
};
