<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { class: className = '', children, ...props }: HTMLButtonAttributes = $props();
</script>

<button {...props} class="btn {className}">
	{@render children?.()}
</button>
