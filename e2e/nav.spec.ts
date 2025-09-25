import { test, expect } from '@playwright/test';

test.describe('Navigation E2E Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the home page
		await page.goto('/');
	});

	test('desktop nav links navigate to correct anchors', async ({ page }) => {
		// Test on desktop viewport
		await page.setViewportSize({ width: 1280, height: 720 });

		// Wait for the page to load
		await page.waitForSelector('[data-testid="desktop-nav"]');

		// Test About Me link
		await page.click('text=About Me');
		await page.waitForURL('/#about');
		expect(page.url()).toContain('#about');

		// Test Tech Stack link
		await page.click('text=Tech Stack');
		await page.waitForURL('/#tech');
		expect(page.url()).toContain('#tech');

		// Test Projects link
		await page.click('text=Projects');
		await page.waitForURL('/#projects');
		expect(page.url()).toContain('#projects');

		// Test Contact Me link
		await page.click('text=Contact Me');
		await page.waitForURL('/#contact');
		expect(page.url()).toContain('#contact');

		// Test Welcome link
		await page.click('text=Welcome');
		await page.waitForURL('/#welcome');
		expect(page.url()).toContain('#welcome');

		// Test Settings link
		await page.click('text=Settings');
		await page.waitForURL('/settings');
		expect(page.url()).toContain('/settings');
	});

	test('mobile nav links navigate to correct anchors', async ({ page }) => {
		// Test on mobile viewport
		await page.setViewportSize({ width: 630, height: 1024 });

		// Wait for the mobile nav to load
		await page.waitForSelector('[data-testid="mobile-nav"]');

		// Open mobile menu
		const menuButton = page.getByTitle('Open Menu');
		await menuButton.click();
		await page.waitForSelector('[role="menu"]', { state: 'visible' });

		// Test About Me link
		await page.click('text=About Me');
		await page.waitForURL('/#about');
		expect(page.url()).toContain('#about');

		// Reopen menu for next test
		await menuButton.click();
		await page.waitForSelector('[role="menu"]', { state: 'visible' });

		// Test Tech Stack link
		await page.click('text=Tech Stack');
		await page.waitForURL('/#tech');
		expect(page.url()).toContain('#tech');

		// Reopen menu for next test
		await menuButton.click();
		await page.waitForSelector('[role="menu"]', { state: 'visible' });

		// Test Projects link
		await page.click('text=Projects');
		await page.waitForURL('/#projects');
		expect(page.url()).toContain('#projects');

		// Reopen menu for next test
		await menuButton.click();
		await page.waitForSelector('[role="menu"]', { state: 'visible' });

		// Test Contact Me link
		await page.click('text=Contact Me');
		await page.waitForURL('/#contact');
		expect(page.url()).toContain('#contact');

		// Reopen menu for next test
		await menuButton.click();
		await page.waitForSelector('[role="menu"]', { state: 'visible' });

		// Test Welcome link
		await page.click('text=Welcome');
		await page.waitForURL('/#welcome');
		expect(page.url()).toContain('#welcome');

		// Reopen menu for next test
		await menuButton.click();
		await page.waitForSelector('[role="menu"]', { state: 'visible' });

		// Test Settings link
		await page.click('text=Settings');
		await page.waitForURL('/settings');
		expect(page.url()).toContain('/settings');
	});
});
