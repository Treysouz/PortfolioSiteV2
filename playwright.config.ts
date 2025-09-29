import { defineConfig } from '@playwright/test';

// Whether running E2E tests in CI
const isCI = process.env.CI === 'true';

// Build command to run based on whether isCI is true
const buildCommand = `${isCI ? `SUPABASE_URL="${process.env.SUPABASE_URL}" SUPABASE_KEY="${process.env.SUPABASE_KEY}"` : ``} npm run build`;

export default defineConfig({
	webServer: {
		command: `${buildCommand} && npm run preview`,
		port: 4173
	},
	testDir: 'e2e'
});
