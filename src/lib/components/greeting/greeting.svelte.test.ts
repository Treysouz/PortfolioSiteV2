import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Greeting from './greeting.svelte';
import { generateGreeting } from './greeting.util';

describe('Greeting component', () => {
	const testCases = Array.from({ length: 24 }, (_, i) => [generateGreeting(i), i + 1] as const);

	test.each(testCases)(
		'should render the text "%s" if current hour is %i in 24-hour format',
		(expectedGreeting, hour) => {
			const mockDate = new Date();
			mockDate.setHours(hour, 0, 0, 0);
			vi.setSystemTime(mockDate);

			const screen = render(Greeting);
			const greeting = screen.queryByText(expectedGreeting);

			expect(greeting).toBeDefined();
		}
	);
});
