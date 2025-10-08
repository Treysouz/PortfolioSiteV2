import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			config: './wranger.json',
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			fallback: 'plaintext'
		})
	}
};

export default config;
