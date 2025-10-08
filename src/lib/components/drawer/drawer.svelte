<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		content: Snippet;
	}

	let { open = $bindable(false), content }: Props = $props();
</script>

<dialog class="drawer z-100 absolute">
	<input
		id="drawer-toggle"
		type="checkbox"
		aria-label="Drawer Overlay"
		class="drawer-toggle"
		bind:checked={open} />

	<div class="drawer-side">
		<label for="drawer-toggle" aria-label="Close Drawer" class="drawer-overlay backdrop-blur-lg"
		></label>
		<div class="menu h-full p-0">
			{@render content?.()}
		</div>
	</div>
</dialog>
