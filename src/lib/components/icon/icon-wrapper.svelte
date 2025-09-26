<script lang="ts">
	import type { Snippet } from 'svelte';

	/** White background wrapper for Icon Component */
	interface Props {
		/** Content to render inside the wrapper */
		children?: Snippet;
		/** Additional CSS classes to apply to the wrapper */
		class?: string;
	}

	let { children = undefined, class: className = '' }: Props = $props();
</script>

<div class="flex items-center justify-center rounded-full bg-white p-1 {className}">
	{@render children?.()}
</div>
