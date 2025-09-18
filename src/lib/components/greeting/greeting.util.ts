/**
 * Gets the current hour of the day from the system clock.
 *
 * @returns {number} The current hour (0-23) in 24-hour format
 */
export const getHourOfDay = (): number => {
	// Generate a new Date object.
	const currentDate = new Date();

	//Get the current hour
	const hours = currentDate.getHours();

	return hours;
};

/**
 * Renders an appropriate greeting message based on the hour of the day.
 *
 * @param {number} hour  - The hour of the day (0-23) in 24-hour format
 * @returns {string} A greeting string appropriate for the given time
 *
 * Time ranges:
 * - 0-5: "Can't Sleep? Neither Can I..."
 * - 6-11: "Good Morning!"
 * - 12-17: "Good Afternoon!"
 * - 18-24: "Good Evening!"
 */
export const generateGreeting = (hour: number): string => {
	if (hour > 5 && hour < 12) {
		return 'Good Morning!';
	} else if (hour >= 12 && hour < 18) {
		return 'Good Afternoon!';
	} else if (hour >= 18 && hour <= 24) {
		return 'Good Evening!';
	} else {
		return "Can't Sleep? Neither Can I...";
	}
};
