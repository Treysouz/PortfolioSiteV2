import { describe, expect, it, vi, test } from 'vitest';

import * as GreetingUtils from './greeting.util';

describe('Greeting Utils', () => {
	describe('generateGreeting()', () => {
		const testCases = Array.from({ length: 24 }, (_, i) => i);

		test.each(testCases)(
			'should return the appropriate string if hour is defined as %i',
			(hour) => {
				const greeting = GreetingUtils.generateGreeting(hour);
				let expectedGreeting = '';

				if (hour > 5 && hour < 12) {
					expectedGreeting = 'Good Morning!';
				} else if (hour >= 12 && hour < 18) {
					expectedGreeting = 'Good Afternoon!';
				} else if (hour >= 18 && hour <= 24) {
					expectedGreeting = 'Good Evening!';
				} else {
					expectedGreeting = "Can't Sleep? Neither Can I...";
				}

				expect(greeting).toStrictEqual(expectedGreeting);
			}
		);
	});
	describe('getHourOfDay()', () => {
		it('should return the appropriate hour if mock time is 7:00am', () => {
			const mockDate = new Date();
			mockDate.setHours(6, 0, 0, 0);
			vi.setSystemTime(mockDate);

			const hour = GreetingUtils.getHourOfDay();

			expect(hour).toStrictEqual(6);
		});
	});
});
