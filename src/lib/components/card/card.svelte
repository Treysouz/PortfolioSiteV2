<script lang="ts">
	let { children = undefined, class: className = '' } = $props();

	//Add Inline Documentation
</script>

<div class="h-min w-min rounded-lg bg-black/50 p-4 shadow-md {className}">
	{@render children?.()}
</div>
