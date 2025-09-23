<script lang="ts">
	import { onMount } from 'svelte';

	import DesktopNav from './components/desktop-nav.svelte';
	import MobileNav from './components/mobile-nav.svelte';

	//Navigation component.

	// Whether to render the mobile nav component.
	let renderMobileNav: boolean = $state(false);

	/**
	 * Checks whether to render the mobile nav component based on if window width is less than or equal to 1024px.
	 */
	const handleResize = () => {
		renderMobileNav = window.innerWidth <= 1024;
	};

	onMount(() => {
		// Call handleResize() on mount to handle the current window width.
		handleResize();

		// Call handleResize() on each resize event.
		window.addEventListener('resize', handleResize);

		return () => {
			// Stop listening for resize event if component unmounts.
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

{#if renderMobileNav}
	<MobileNav></MobileNav>
{:else}
	<DesktopNav></DesktopNav>
{/if}
