<script lang="ts">
	/** Section Wrapper Component */

	import type { Snippet } from 'svelte';

	interface Props {
		/**ID for section element*/
		id: string;
		/**Header for section*/
		header?: string;
		/** Content to render inside the card */
		children?: Snippet;
		/** Additional CSS classes to apply to the card */
		class?: string;
	}

	let { children = undefined, class: className = '', header = '', id }: Props = $props();
</script>

<section {id} class="flex min-h-full w-full grow items-center p-4 sm:p-8 {className}">
	<div class="flex h-full w-full flex-col">
		{#if header}
			<div class="flex max-w-xl flex-row items-center space-x-4 pb-4 sm:pb-8">
				<h2 class="whitespace-nowrap text-lg font-bold text-white lg:text-xl 2xl:text-3xl">
					{header}
				</h2>
				<div class="h-0.5 w-full bg-white"></div>
			</div>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</section>
