<script lang="ts">
	import NavMenu from '../nav-menu/nav-menu.svelte';
	import { Icon, SVGS, Dropdown } from '$lib/components';

	/** Mobile navigation component. */

	/** Whether the navigation menu is open. */
	let openMenu: boolean = $state(false);

	/** Icon to render for toggleButton */
	let toggleIcon: keyof typeof SVGS = $derived(openMenu ? 'x-mark' : 'bars-3');
</script>

<nav
	class="animate-slide-down fixed z-50 flex w-screen items-center justify-between bg-black/25 shadow-md backdrop-blur-lg will-change-transform"
	data-testid="mobile-nav">
	<Dropdown label="Nav" class="w-full" bind:open={openMenu}>
		{#snippet toggle()}
			<div class=" flex w-min items-center p-4 text-white">
				<Icon svg={toggleIcon} class="size-10"></Icon>
			</div>
		{/snippet}
		{#snippet menu()}
			<NavMenu varient="mobile" onItemClick={() => (openMenu = false)}></NavMenu>
		{/snippet}
	</Dropdown>
</nav>
