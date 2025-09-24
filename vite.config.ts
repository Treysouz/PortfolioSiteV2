import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson(), svelteTesting()],
	server: {
		hmr: {
			overlay: true
		}
	},
	test: {
		expect: { requireAssertions: true },
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'json-summary', 'html'],
			exclude: [
				'coverage/**',
				'dist/**',
				'**/node_modules/**',
				'**/test/**',
				'**/*.{test,spec}.{js,ts,svelte}',
				'**/vitest.config.*',
				'**/vite.config.*',
				'**/.{eslint,prettier}rc*',
				'**/tailwind.config.*',
				'**/svelte.config.*',
				'**/playwright.config.*',
				'**/mocks/**',
				'**/assets/**'
			],
			include: ['src/**/*']
		},
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['src/lib/server/**'],
		setupFiles: ['./vitest-setup.js']
	}
});
