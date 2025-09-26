<script lang="ts">
	import NavMenu from '../nav-menu/nav-menu.svelte';
	import { Icon, SVGS } from '$lib/components';
	import { onMount } from 'svelte';

	/** Mobile navigation component. */

	/** Whether the navigation menu is open. */
	let openMenu: boolean = $state(false);
	/** Reference to navigation element. */
	let navElement: HTMLElement;

	/** Accessibility label for toggle button */
	let toggleLabel: string = $derived(openMenu ? 'Close Menu' : 'Open Menu');
	/** Icon to render for toggleButton */
	let toggleIcon: keyof typeof SVGS = $derived(openMenu ? 'x-mark' : 'bars-3');

	/**
	 * Closes the navigation menu.
	 */
	const closeMenu = () => {
		openMenu = false;
	};

	/**
	 * Click event handler that closes the navigation menu if a click occurs outside of the component.
	 *
	 *  @param {MouseEvent} event  - Mouse event that occurs when a click occurs.
	 */
	const handleClickOutside = (event: MouseEvent) => {
		if (
			openMenu &&
			navElement &&
			event.target instanceof Node &&
			!navElement.contains(event.target)
		) {
			closeMenu();
		}
	};

	onMount(() => {
		// Add click event listener for click handler.
		document.addEventListener('click', handleClickOutside);

		return () => {
			// Stop listening to click event when component unmounts.
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<nav
	class="animate-slide-down fixed z-50 flex w-screen items-center justify-between bg-black/20 shadow-md backdrop-blur-lg will-change-transform"
	data-testid="mobile-nav"
	bind:this={navElement}>
	<details class="w-full" bind:open={openMenu}>
		<summary
			aria-expanded={openMenu}
			class="my-4 ml-8 flex w-min items-center text-white"
			aria-label={toggleLabel}
			title={toggleLabel}>
			<Icon svg={toggleIcon} class="size-10"></Icon>
		</summary>
		<NavMenu varient="mobile" onItemClick={closeMenu}></NavMenu>
	</details>
</nav>
