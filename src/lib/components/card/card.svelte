<script lang="ts">
	import type { Snippet } from 'svelte';

	// Card Component
	interface Props {
		/** Content to render inside the card */
		children?: Snippet;
		/** Additional CSS classes to apply to the card */
		class?: string;
	}

	let { children = undefined, class: className = '' }: Props = $props();
</script>

<article
	class="rounded-lg bg-black/15 p-8 shadow-md backdrop-blur-lg
 {className}"
	id="card-component"
>
	{@render children?.()}
</article>
