<script lang="ts">
	import '../styles.scss';
	import '../tailwind.css';
	import { favicon } from '$lib/assets';

	import { tsParticles } from '@tsparticles/engine';
	import { loadSlim } from '@tsparticles/slim';
	import { onMount } from 'svelte';
	import { particlesConfig } from '$lib/assets';
	import { NavBar, NavItem, SettingsDrawer, AlertCenter } from '$lib/components';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { createQueryClient } from '$lib/utils/tanstack';
	import { SettingsStore } from '$lib/stores/settings';
	import { addErrorToStore } from '$lib/stores/alert';

	let { children } = $props();

	/** Whether the animated background has loaded. */
	let particlesLoaded: boolean = $state(false);
	/** Whether to open the settings drawer. */
	let openSettings: boolean = $state(false);

	/** Tanstack query client for caching API responses*/
	const queryClient = createQueryClient();

	/** Open settings drawer*/
	const openSettingsDrawer = () => {
		openSettings = true;
	};

	const loadParticlesBackground = async () => {
		try {
			// Initialize the tsParticles engine with slim bundle
			await loadSlim(tsParticles);
			// Load particles configuration
			await tsParticles.load({
				id: 'particles',
				options: particlesConfig
			});
			particlesLoaded = true;
		} catch (error) {
			addErrorToStore('Failed to Load Animated Particles Background', error);
		}
	};

	onMount(async () => {
		await loadParticlesBackground();
	});
</script>

<svelte:head>
	<title>Tremayne Souza | Front-End Developer</title>
	<link rel="icon" type="image/png" sizes="32x32" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div
		class="bg-theme flex h-dvh w-full flex-col-reverse items-center font-mono lg:flex-row"
		data-animated-gradient={SettingsStore.animatedGradient}
		data-animated-bg={SettingsStore.animatedBg}
		data-transitions={SettingsStore.transitions}
		data-opacity-effect={SettingsStore.opacityEffect}
		data-jonah-mode={SettingsStore.jonahMode}>
		<SettingsDrawer bind:open={openSettings}></SettingsDrawer>

		<AlertCenter></AlertCenter>

		<div
			class="fixed flex h-dvh w-full items-center justify-center overflow-hidden"
			class:hidden={!SettingsStore.animatedBg}>
			<div id="particles" class="animate-fade-in fixed hidden h-[2160px] w-[3840px] sm:block"></div>
		</div>

		{#if particlesLoaded}
			<NavBar>
				{#snippet additionalItems()}
					<li role="menuitem" class="w-full">
						<NavItem
							onclick={openSettingsDrawer}
							class="lg:size-30 w-full cursor-pointer p-2 text-sm sm:p-4 md:text-lg"
							svg="cog"
							text="Settings"></NavItem>
					</li>
				{/snippet}
			</NavBar>

			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<main tabindex="0" class="z-10 h-full w-full grow overflow-auto text-white">
				{@render children?.()}
			</main>
		{/if}
	</div>
</QueryClientProvider>
