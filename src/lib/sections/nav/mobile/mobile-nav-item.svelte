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
	}

	let { text = '', svg = 'home', href = '', isActive = false }: Props = $props();
</script>

<li>
	<a
		{href}
		class="hover:bg-primary flex w-full items-center justify-start gap-x-4 px-4 py-2 text-sm text-white hover:cursor-pointer md:text-lg {isActive
			? 'bg-primary border-primary border-l-4 pl-3'
			: 'text-white'}">
		<Icon {svg} class="group inline-block size-8"></Icon>
		<span class="inline-block whitespace-nowrap">{text}</span>
	</a>
</li>
