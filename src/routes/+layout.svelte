<script lang="ts">
	import '../styles.scss';
	import '../tailwind.css';
	import { favicon } from '$lib/assets';

	import { tsParticles } from '@tsparticles/engine';
	import { loadSlim } from '@tsparticles/slim';
	import { onMount } from 'svelte';
	import { particlesConfig } from '$lib/assets';
	import { NavBar } from '$lib/sections';

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
	<title>Tremayne Souza | Front-End Developer</title>
	<link rel="icon" type="image/png" sizes="32x32" href={favicon} />
</svelte:head>

<!--Animated Background-->
<div id="particles"></div>

<div class="main-bg flex h-screen w-screen font-mono">
	<NavBar></NavBar>

	<main class=" h-full w-full text-white">
		{@render children?.()}
	</main>
</div>
