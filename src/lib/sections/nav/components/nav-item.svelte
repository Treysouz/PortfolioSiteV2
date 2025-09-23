<script lang="ts">
	import { SVGS, Icon } from '$lib/components';

	//Icon link for navigation bar
	interface Props {
		/** Text to render inside the link */
		text?: string;
		/** The name of the SVG icon to display (must be a valid key from svgs.ts) */
		svg?: keyof typeof SVGS;
		/** Destination URL for link*/
		href?: string;
		/** Whether this nav item is currently active */
		isActive?: boolean;
		// Handler for item click
		onclick?: (event: MouseEvent) => unknown;
	}

	let {
		text = '',
		svg = 'home',
		href = '',
		isActive = false,
		onclick = undefined
	}: Props = $props();
</script>

<li>
	<a
		{onclick}
		{href}
		class="hover:lg:bg-primary w-54 flex items-center gap-x-4 py-2 text-sm text-white md:text-lg lg:rounded-lg lg:text-xl {isActive
			? 'bg-primary/50 border-primary border-l-4 pl-3 pr-4'
			: 'px-4'}">
		<Icon {svg} class="group inline-block size-6 md:size-8 lg:size-10"></Icon>
		<span class="inline-block whitespace-nowrap pt-1">{text}</span>
	</a>
</li>
