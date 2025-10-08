<script lang="ts">
	import { Icon, Button } from '$lib/components';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { class: className = '', ...props }: HTMLButtonAttributes = $props();
</script>

<Button
	class="btn-ghost hover:bg-secondary/25 mb-1 flex size-8 items-center justify-center border-none p-0 text-white shadow-none {className}"
	{...props}>
	<Icon svg="x-mark" class="size-6"></Icon>
</Button>
