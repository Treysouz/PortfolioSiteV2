<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	/** Dropdown component. */
	interface Props {
		/** Label for dropdown*/
		label: string;
		/** Content to render as the toggle for the menu */
		toggle: Snippet;
		/** Content to render as the menu */
		menu: Snippet;
		/** Additional CSS classes to apply to the component */
		class?: string;
		/** Additional CSS classes to apply to toggle*/
		toggleClass?: string;
		/** Whether the dropdown is open. */
		open?: boolean;
		/** Handlers for when key is pressed*/
		onkeydown?: (event: KeyboardEvent) => unknown;
	}

	let {
		toggle,
		menu,
		toggleClass = '',
		open = $bindable(false),
		class: className = '',
		label,
		onkeydown = undefined
	}: Props = $props();

	/** Reference to details element. */
	let detailsElement: HTMLElement;

	/** Accessibility label for toggle button */
	let toggleLabel: string = $derived(`${open ? 'Close' : 'Open'} Dropdown`);

	/**
	 * Closes the navigation menu.
	 */
	const closeMenu = () => {
		open = false;
	};

	/**
	 * Click event handler that closes the navigation menu if a click occurs outside of the component.
	 *
	 *  @param {MouseEvent} event  - Mouse event that occurs when a click occurs.
	 */
	const handleClickOutside = (event: MouseEvent) => {
		if (
			open &&
			detailsElement &&
			event.target instanceof Node &&
			!detailsElement.contains(event.target)
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

<details class="cursor-pointer {className}" bind:open bind:this={detailsElement}>
	<summary
		aria-expanded={open}
		aria-label={toggleLabel}
		title={toggleLabel}
		class="h-full {toggleClass}"
		{onkeydown}>
		{@render toggle()}
	</summary>
	{@render menu()}
</details>

<style>
	details > summary {
		list-style: none;
	}
	details > summary::-webkit-details-marker {
		display: none;
	}
</style>
