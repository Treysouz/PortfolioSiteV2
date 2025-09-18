<script lang="ts">
	let { children = undefined, class: className = '' } = $props();

	//Add Inline Documentation
</script>

<div
	class="rounded-lg bg-black/15 p-4 shadow-md backdrop-blur-sm
 {className}"
>
	{@render children?.()}
</div>
