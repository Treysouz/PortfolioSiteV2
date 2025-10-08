<script lang="ts">
	/** Navigation component. */

	import NavMenu from './components/nav-menu.svelte';
	import { Card } from '$lib/components';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Additional items to render in nav menu*/
		additionalItems?: Snippet;
	}

	let { additionalItems = undefined }: Props = $props();
</script>

<nav data-testid="desktop-nav" class="z-50 w-full lg:w-min">
	<Card
		class="animate-slide-up lg:animate-slide-right flex overflow-hidden rounded-none lg:rounded-r-lg">
		<NavMenu class="flex w-full items-center justify-around lg:w-min lg:flex-col lg:justify-center">
			{#snippet additional()}
				{#if additionalItems}
					{@render additionalItems()}
				{/if}
			{/snippet}
		</NavMenu>
	</Card>
</nav>
