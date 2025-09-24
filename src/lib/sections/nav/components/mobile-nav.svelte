<script lang="ts">
	import NavLogo from './nav-logo.svelte';
	import NavMenu from './nav-menu.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import { onMount } from 'svelte';

	//Mobile navigation component.

	// Whether the navigation menu is open.
	let openMenu: boolean = $state(false);
	// Reference to navigation element.
	let navElement: HTMLElement;

	/**
	 * Toggles the navigation menu.
	 */
	const toggleMenu = () => {
		openMenu = !openMenu;
	};

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
	data-testid="mobile-nav"
	bind:this={navElement}
	class="z-5 animate-slide-down flex h-min w-screen items-center justify-between bg-black/15 px-8 py-4 shadow-md backdrop-blur-lg">
	<NavLogo></NavLogo>
	<div class="relative">
		<button
			aria-expanded={openMenu}
			class="text-white {openMenu ? 'opacity-50' : ''}"
			onclick={toggleMenu}>
			<Icon svg="bars-3" class="size-10"></Icon>
		</button>
		<NavMenu
			onItemClick={closeMenu}
			class="w-50 animate-fade-in absolute right-1 overflow-hidden rounded-lg bg-black/90 backdrop-blur-lg {openMenu
				? 'visible'
				: 'hidden'}"></NavMenu>
	</div>
</nav>
