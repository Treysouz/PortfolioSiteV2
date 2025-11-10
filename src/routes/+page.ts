import { generateGreeting, getHourOfDay } from '$lib/utils/greeting';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	/**  Get the current hour of the day to use as parameter for generateGreeting()*/
	const currentHour = getHourOfDay();

	/** Set greeting to the return value of generateGreeting()*/
	const greeting = generateGreeting(currentHour);

	return {
		greeting
	};
};
