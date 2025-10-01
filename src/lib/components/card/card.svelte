<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Card Component */
	interface Props {
		/** Content to render inside the card */
		children?: Snippet;
		/** Additional CSS classes to apply to the card */
		class?: string;
	}

	let { children = undefined, class: className = '' }: Props = $props();
</script>

<div
	class="animate-fade-in rounded-lg bg-black/25 shadow-md backdrop-blur-lg
 {className}">
	{#if children}
		{@render children()}
	{/if}
</div>
