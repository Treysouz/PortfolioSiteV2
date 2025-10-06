import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the home page
		await page.goto('/');
	});

	const testCases = [
		{
			text: 'Welcome',
			href: '/#welcome'
		},
		{
			text: 'About Me',
			href: '/#about'
		},
		{
			text: 'Tech Stack',
			href: '/#tech'
		},
		{
			text: 'Projects',
			href: '/#projects'
		},
		{
			text: 'Settings',
			href: '/settings'
		}
	];

	testCases.forEach((testCase) => {
		test.describe(`${testCase.text} Link`, () => {
			test('nav link navigate to correct anchors', async ({ page }) => {
				// Test on desktop viewport
				await page.setViewportSize({ width: 1280, height: 720 });

				// Wait for the page to load
				await page.waitForSelector('[data-testid="desktop-nav"]');

				// Test link
				await page.click(`text=${testCase.text}`);
				await page.waitForURL(testCase.href);
				expect(page.url()).toContain(testCase.href);
			});
		});
	});
});
