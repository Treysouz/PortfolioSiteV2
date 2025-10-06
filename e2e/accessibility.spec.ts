import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
	const testRoutes = ['/'];

	testRoutes.forEach((route) => {
		test.describe(`"${route}" Route`, () => {
			test('should not have any automatically detectable accessibility issues', async ({
				page
			}) => {
				await page.goto(route);

				const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

				expect(accessibilityScanResults.violations).toEqual([]);
			});
		});
	});
});
