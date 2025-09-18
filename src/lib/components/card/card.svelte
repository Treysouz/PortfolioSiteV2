<script lang="ts">
	/**
	 * Card component.
	 *
	 * @prop children - Svelte snippet content to render inside the card
	 * @prop class - Additional CSS classes to apply to the card
	 */
	let { children = undefined, class: className = '' } = $props();
</script>

<article
	class="rounded-lg bg-black/15 p-4 shadow-md backdrop-blur-lg
 {className}"
	id="card-component"
>
	{@render children?.()}
</article>
