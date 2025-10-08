import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
	const testRoutes = ['/'];

	testRoutes.forEach((route) => {
		test.describe(`"${route}" Route`, () => {
			test('should not have any automatically detectable accessibility issues', async ({
				page
			}) => {
				//Go to route
				await page.goto(route, { waitUntil: 'networkidle' });

				//wait for particles background to load
				await page.waitForSelector('#particles');

				const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

				expect(accessibilityScanResults.violations).toEqual([]);
			});
		});
	});
});
