<!--Icon component for displaying SVG icons with type safety -->

<script lang="ts">
	import svgs from './svgs.js';

	interface Props {
		/** The name of the SVG icon to display (must be a valid key from svgs.ts) */
		svg: keyof typeof svgs;
		/** Additional CSS classes to apply to the component */
		class?: string;
	}

	let { svg, class: className = '' }: Props = $props();
</script>

<span class="inline-block {className}">
	<!-- Safe to ignore this error since we are not injecting dynamic, user-inputter content-->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html svgs[svg]}
</span>
