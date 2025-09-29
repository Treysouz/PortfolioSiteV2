import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: {
			SUPABASE_URL: process.env.SUPABASE_URL || '',
			SUPABASE_KEY: process.env.SUPABASE_KEY || ''
		}
	},
	testDir: 'e2e'
});
