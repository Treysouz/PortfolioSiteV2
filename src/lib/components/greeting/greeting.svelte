<script lang="ts">
	import { generateGreeting, getHourOfDay } from './greeting.util';

	/** A text component that renders a greeting based on the user's current time. */

	/** Greeting text to render. */
	let greeting: string = $state('');

	// Get the current hour of the day to use as parameter for generateGreeting()
	const currentHour = getHourOfDay();

	// Set greeting to the return value of generateGreeting()
	greeting = generateGreeting(currentHour);
</script>

{greeting}
