<script lang="ts">
	import '../styles.scss';
	import '../tailwind.css';
	import { favicon } from '$lib/assets';

	import { tsParticles } from '@tsparticles/engine';
	import { loadSlim } from '@tsparticles/slim';
	import { onMount } from 'svelte';
	import { particlesConfig } from '$lib/assets';
	import { NavBar } from '$lib/components';

	let { children } = $props();

	/** Whether the animated background has loaded. */
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
<div id="particles"></div>

<div
	class="bg-theme flex h-screen min-h-[420px] w-full flex-col items-center font-mono sm:flex-col-reverse lg:flex-row">
	{#if particlesLoaded}
		<NavBar></NavBar>

		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<main tabindex="0" class="mt-18 z-10 h-full w-full grow overflow-auto text-white sm:mt-0">
			{@render children?.()}
		</main>
	{/if}
</div>
