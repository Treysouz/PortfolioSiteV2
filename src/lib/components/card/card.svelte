<!--Card Component-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Content to render inside the card */
		children?: Snippet;
		/** Additional CSS classes to apply to the card */
		class?: string;
	}

	let { children = undefined, class: className = '' }: Props = $props();
</script>

<div
	data-testid="card"
	class="animate-fade-in card bg-black/25 shadow-lg backdrop-blur-lg
 {className}">
	{@render children?.()}
</div>
