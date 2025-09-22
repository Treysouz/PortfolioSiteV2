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
		class="hover:lg:bg-primary hover:text-emphasis lg:w-54 2xl:w-75 flex h-20 flex-col items-center justify-around gap-x-4 py-2 text-sm hover:cursor-pointer md:text-lg lg:flex-row lg:justify-start lg:rounded-lg lg:text-xl hover:lg:text-white 2xl:text-3xl {isActive
			? 'lg:bg-primary/50 border-emphasis lg:border-primary text-emphasis border-b-4 lg:border-b-0 lg:border-l-4 lg:pl-3 lg:pr-4 lg:text-white '
			: 'text-white lg:px-4'}">
		<Icon {svg} class="group inline-block size-6 md:size-8 lg:size-10 2xl:size-12"></Icon>
		<span class="inline-block whitespace-nowrap pt-1.5">{text}</span>
	</a>
</li>
