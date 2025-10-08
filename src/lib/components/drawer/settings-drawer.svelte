<script lang="ts">
	/** Drawer component for adjusting settings */

	import Drawer from './drawer.svelte';
	import Icon from '../icon/icon.svelte';
	import SettingsToggle from './components/settings-toggle.svelte';
	import { SettingsStore, SETTINGS_STORAGE_KEY } from '$lib/stores/settings.svelte.js';
	import type { ChangeEventHandler } from 'svelte/elements';

	interface Props {
		open?: boolean;
	}

	let { open = $bindable(false) }: Props = $props();

	/** Whether to show granular animation settings */
	let openAnimationCollapse: boolean = $state(false);

	/** Close drawer*/
	const closeDrawer = () => {
		open = false;
	};

	/** Toggle all animations */
	const toggleAnimations: ChangeEventHandler<HTMLInputElement> = (event) => {
		const checked = event.currentTarget.checked;

		SettingsStore.animatedGradient = checked;
		SettingsStore.animatedBg = checked;
		SettingsStore.transitions = checked;

		if (!checked) {
			openAnimationCollapse = false;
		}
	};

	/** Whether all animations for the site are disabled*/
	let allAnimationsDisabled = $derived(
		!SettingsStore.animatedGradient && !SettingsStore.animatedBg && !SettingsStore.transitions
	);

	$effect(() => {
		localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(SettingsStore));
	});
</script>

<Drawer bind:open>
	{#snippet content()}
		<div class="sm:w-120 flex min-h-full w-dvw flex-col bg-black/75 text-white backdrop-blur-lg">
			<div class="p-4 sm:p-8">
				<div class="flex w-full flex-row items-center justify-between">
					<div class="flex grow flex-row items-center space-x-4">
						<h3 class="text-lg font-bold lg:text-2xl 2xl:text-3xl">Settings</h3>
						<div class="max-w-46 h-0.5 w-full bg-white"></div>
					</div>
					<button
						class="btn btn-ghost hover:bg-secondary/25 mb-1 flex size-8 items-center justify-center border-none p-0 shadow-none hover:text-white/50"
						onclick={closeDrawer}
						title="Close Drawer"
						aria-label="Close Drawer">
						<Icon svg="x-mark" class="size-6"></Icon>
					</button>
				</div>
			</div>
			<div class="mx-4 border-b pb-4 sm:mx-8 sm:pb-8">
				<p class="text-shadow-lg text-xs sm:text-base">Customize the site's UI.</p>
			</div>
			<ul class="pt-4 sm:px-4 2xl:text-lg">
				<li>
					<details bind:open={openAnimationCollapse}>
						<summary
							class="bg-transparent! flex flex-row gap-0 rounded-none p-0 pr-4 after:content-none"
							><SettingsToggle
								id="animations-toggle"
								title="Animations"
								isCollapseTitle={true}
								checked={!allAnimationsDisabled}
								tooltip="All site animations and transitions."
								onchange={toggleAnimations}>
							</SettingsToggle>

							<Icon
								svg={openAnimationCollapse ? 'chevron-up' : 'chevron-down'}
								class="size-4 sm:size-6"></Icon>
						</summary>
						<ul class="border-l">
							<SettingsToggle
								id="gradient-text-toggle"
								title="Gradient Text Animation"
								bind:checked={SettingsStore.animatedGradient}
								tooltip="Animated text gradient."></SettingsToggle>
							<SettingsToggle
								id="animated-bg-toggle"
								title="Animated Background"
								tooltip="Animated bubble particles background."
								bind:checked={SettingsStore.animatedBg}></SettingsToggle>
							<SettingsToggle
								id="transitions-toggle"
								title="Transitions"
								bind:checked={SettingsStore.transitions}
								tooltip="All transitions like fading in or sliding in."></SettingsToggle>
						</ul>
					</details>
				</li>
				<SettingsToggle
					id="opacity-effect-toggle"
					title="Opacity Effect"
					tooltip="Background opacity on various components. Changes to solid color if disabled."
					bind:checked={SettingsStore.opacityEffect}></SettingsToggle>

				<!-- Will implement on a later date -->

				<!-- <SettingsToggle
					id="jonah-mode-toggle"
					title="Jonah Mode"
					tooltip="CLASSIFIED"
					bind:checked={SettingsStore.jonahMode}></SettingsToggle> -->
			</ul>
		</div>
	{/snippet}
</Drawer>
