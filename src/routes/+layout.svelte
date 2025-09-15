<script lang="ts">
	import '../app.css';
	import { favicon } from '$lib/assets';

	import { tsParticles } from '@tsparticles/engine';
	import { loadSlim } from '@tsparticles/slim';
	import { onMount } from 'svelte';
	import { particlesConfig } from '$lib/components/particles/particles.config';

	let { children } = $props();

	onMount(async () => {
		// Initialize the tsParticles engine with slim bundle
		await loadSlim(tsParticles);

		// Load particles configuration
		await tsParticles.load({
			id: 'particles',
			options: particlesConfig
		});
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href={favicon} />
</svelte:head>

<!--Nav Here-->

<main class="main-bg h-screen w-screen p-4 font-mono text-white" id="particles">
	{@render children?.()}
</main>
