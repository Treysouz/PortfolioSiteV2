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

	//Whehter the animated background has loaded.
	let particlesLoaded: boolean = $state(false);

	onMount(async () => {
		try {
			// Initialize the tsParticles engine with slim bundle
			await loadSlim(tsParticles);

			// Load particles configuration
			await tsParticles.load({
				id: 'particles',
				options: particlesConfig
			});
			particlesLoaded = true;
		} catch (e) {
			console.error(e);
		}
	});
</script>

<svelte:head>
	<title>Tremayne Souza | Front-End Developer</title>
	<link rel="icon" type="image/png" sizes="32x32" href={favicon} />
</svelte:head>

<!--Animated Background-->
<div id="particles"></div>

<div class="bg-theme flex h-screen w-full flex-col font-mono lg:flex-row">
	{#if particlesLoaded}
		<NavBar></NavBar>

		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<main tabindex="0" class="lg-pb-0 h-screen w-full overflow-auto pb-6 text-white">
			{@render children?.()}
		</main>
	{/if}
</div>
