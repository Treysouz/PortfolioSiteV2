import { test, expect } from '@playwright/test';

test.describe('Settings Drawer', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the home page
		await page.goto('/');

		// Clear localStorage
		await page.evaluate(() => localStorage.clear());
	});

	test.describe('Opening and Closing', () => {
		test('should open settings drawer when Settings button is clicked', async ({ page }) => {
			// Click the Settings button
			await page.click('text=Settings');

			const settingsHeader = page.getByRole('heading', { name: 'Settings' });
			await expect(settingsHeader).toBeVisible();
		});

		test('should close settings drawer when close button is clicked', async ({ page }) => {
			// Open the drawer
			await page.click('text=Settings');
			await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

			// Click the close button
			await page.click('[aria-label="Close Drawer"]');

			// Check that the drawer is closed
			await expect(page.locator('text=Customize your site experience.')).not.toBeVisible();
		});

		test('should close settings drawer when overlay is clicked', async ({ page }) => {
			// Open the drawer
			await page.click('text=Settings');
			await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

			// Click the overlay
			await page.locator('.drawer-overlay').click();

			// Check that the drawer is closed
			await expect(page.locator('text=Customize your site experience.')).not.toBeVisible();
		});
	});

	test.describe('Animation Settings', () => {
		test('should toggle all animations when master toggle is clicked', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Find the master animations toggle
			const animationsToggle = page.locator('[id="animations-toggle"]').locator('..');

			// Click to disable all animations
			await animationsToggle.click();

			// Verify all nested animation toggles are disabled
			const gradientToggle = page.locator('[id="gradient-text-toggle"]');
			const bgToggle = page.locator('[id="animated-bg-toggle"]');
			const transitionsToggle = page.locator('[id="transitions-toggle"]');

			await expect(gradientToggle.locator('input[type="checkbox"]')).not.toBeChecked();
			await expect(bgToggle.locator('input[type="checkbox"]')).not.toBeChecked();
			await expect(transitionsToggle.locator('input[type="checkbox"]')).not.toBeChecked();
		});

		test('should expand/collapse animation details section', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Initially, nested animations should be visible (if details is open by default)
			// or hidden (if closed)
			const details = page.locator('details');
			const isOpen = await details.evaluate((el: HTMLDetailsElement) => el.open);

			// Click the summary to toggle
			await page.locator('summary').first().click();

			// Check that the state has toggled
			const isOpenAfter = await details.evaluate((el: HTMLDetailsElement) => el.open);
			expect(isOpenAfter).toBe(!isOpen);
		});

		test('should toggle gradient text animation independently', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Expand animations if collapsed
			const details = page.locator('details');
			const isOpen = await details.evaluate((el: HTMLDetailsElement) => el.open);
			if (!isOpen) {
				await page.locator('summary').first().click();
			}

			// Find gradient animation toggle
			const gradientToggle = page
				.locator('[id="gradient-text-toggle"]')
				.locator('input[type="checkbox"]');

			// Get initial state
			const initialState = await gradientToggle.isChecked();

			// Toggle it
			await gradientToggle.click();

			// Verify it changed
			await expect(gradientToggle).toHaveProperty('checked', !initialState);
		});

		test('should toggle animated background independently', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Expand animations if collapsed
			const details = page.locator('details');
			const isOpen = await details.evaluate((el: HTMLDetailsElement) => el.open);
			if (!isOpen) {
				await page.locator('summary').first().click();
			}

			// Find animated background toggle
			const bgToggle = page.locator('[id="animated-bg-toggle"]').locator('input[type="checkbox"]');

			// Get initial state
			const initialState = await bgToggle.isChecked();

			// Toggle it
			await bgToggle.click();

			// Verify it changed
			await expect(bgToggle).toHaveProperty('checked', !initialState);

			// Verify the particles container visibility changed
			const particlesContainer = page.locator('#particles');
			if (!initialState) {
				// Was off, now on - should be visible
				await expect(particlesContainer).toBeVisible();
			} else {
				// Was on, now off - should be hidden
				await expect(particlesContainer).toBeHidden();
			}
		});

		test('should toggle transitions independently', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Expand animations if collapsed
			const details = page.locator('details');
			const isOpen = await details.evaluate((el: HTMLDetailsElement) => el.open);
			if (!isOpen) {
				await page.locator('summary').first().click();
			}

			// Find transitions toggle
			const transitionsToggle = page
				.locator('[id="transitions-toggle"]')
				.locator('input[type="checkbox"]');

			// Get initial state
			const initialState = await transitionsToggle.isChecked();

			// Toggle it
			await transitionsToggle.click();

			// Verify it changed
			await expect(transitionsToggle).toHaveProperty('checked', !initialState);

			// Verify data attribute changed
			const rootDiv = page.locator('.bg-theme').first();
			const dataTransitions = await rootDiv.getAttribute('data-transitions');
			expect(dataTransitions).toBe((!initialState).toString());
		});
	});

	test.describe('Opacity Effect Setting', () => {
		test('should toggle opacity effect', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Find opacity effect toggle
			const opacityToggle = page
				.locator('[id="opacity-effect-toggle"]')
				.locator('input[type="checkbox"]');

			// Get initial state
			const initialState = await opacityToggle.isChecked();

			// Toggle it
			await opacityToggle.click();

			// Verify it changed
			await expect(opacityToggle).toHaveProperty('checked', !initialState);

			// Verify data attribute changed
			const rootDiv = page.locator('.bg-theme').first();
			const dataOpacity = await rootDiv.getAttribute('data-opacity-effect');
			expect(dataOpacity).toBe((!initialState).toString());
		});
	});

	test.describe('Settings Persistence', () => {
		test('should persist settings to localStorage', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Change a setting
			const opacityToggle = page
				.locator('[id="opacity-effect-toggle"]')
				.locator('input[type="checkbox"]');
			await opacityToggle.click();

			// Check localStorage
			const storedSettings = await page.evaluate(() => localStorage.getItem('portfolio-settings'));
			expect(storedSettings).toBeTruthy();

			const settings = JSON.parse(storedSettings!);
			expect(settings.opacityEffect).toBe(false);
		});

		test('should load settings from localStorage on page load', async ({ page }) => {
			// Set settings in localStorage
			await page.evaluate(() => {
				const settings = {
					animatedGradient: false,
					animatedBg: false,
					transitions: false,
					opacityEffect: false,
					jonahMode: false
				};
				localStorage.setItem('portfolio-settings', JSON.stringify(settings));
			});

			// Reload the page
			await page.reload();
			await page.waitForLoadState('networkidle');

			// Open settings
			await page.click('text=Settings');

			// Verify settings are applied
			const opacityToggle = page
				.locator('[id="opacity-effect-toggle"]')
				.locator('input[type="checkbox"]');
			await expect(opacityToggle).not.toBeChecked();

			// Verify data attributes reflect loaded settings
			const rootDiv = page.locator('.bg-theme').first();
			const dataOpacity = await rootDiv.getAttribute('data-opacity-effect');
			expect(dataOpacity).toBe('false');
		});
	});

	test.describe('Tooltips', () => {
		test('should display tooltips on hover', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Hover over a toggle
			const animationsToggle = page.locator('[id="animations-toggle"]').locator('..');
			await animationsToggle.hover();

			// Check for tooltip attribute
			const tooltip = await animationsToggle.getAttribute('data-tip');
			expect(tooltip).toBe('All site animations and transitions.');
		});
	});

	test.describe('Visual Effects', () => {
		test('should apply gradient text animation when enabled', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Make sure gradient animation is enabled
			const details = page.locator('details');
			const isOpen = await details.evaluate((el: HTMLDetailsElement) => el.open);
			if (!isOpen) {
				await page.locator('summary').first().click();
			}

			const gradientToggle = page
				.locator('[id="gradient-text-toggle"]')
				.locator('input[type="checkbox"]');

			const isChecked = await gradientToggle.isChecked();
			if (!isChecked) {
				await gradientToggle.click();
			}

			// Close drawer
			await page.click('[aria-label="Close Drawer"]');

			// Check that gradient animation is applied
			const gradientElement = page.locator('.animate-gradient-move').first();
			await expect(gradientElement).toBeVisible();

			// Verify it has the animation class
			const hasClass = await gradientElement.evaluate((el) =>
				el.classList.contains('animate-gradient-move')
			);
			expect(hasClass).toBe(true);
		});

		test('should hide particles background when disabled', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Expand animations
			const details = page.locator('details');
			const isOpen = await details.evaluate((el: HTMLDetailsElement) => el.open);
			if (!isOpen) {
				await page.locator('summary').first().click();
			}

			// Disable animated background
			const bgToggle = page.locator('[id="animated-bg-toggle"]').locator('input[type="checkbox"]');
			await bgToggle.uncheck();

			// Close drawer
			await page.click('[aria-label="Close Drawer"]');

			// Verify particles container is hidden
			const particlesContainer = page.locator('#particles');
			await expect(particlesContainer).toBeHidden();
		});
	});

	test.describe('Accessibility', () => {
		test('should be keyboard navigable', async ({ page }) => {
			// Tab to Settings button
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab'); // May need to adjust tabs

			// Press Enter to open
			await page.keyboard.press('Enter');

			// Verify drawer opened
			await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
		});

		test('should have proper ARIA labels', async ({ page }) => {
			// Open settings
			await page.click('text=Settings');

			// Check for ARIA labels
			const closeButton = page.locator('[aria-label="Close Drawer"]');
			await expect(closeButton).toBeVisible();

			// Check toggles have proper labels
			const animationsToggle = page.locator('[aria-label="Animations"]');
			await expect(animationsToggle).toBeVisible();
		});
	});
});
