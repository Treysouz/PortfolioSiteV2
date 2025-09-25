<script lang="ts">
	import { SVGS, Icon } from '$lib/components';
	import type { NavItemOrientation } from '../../nav.types';

	/** Icon link for navigation bar */
	interface Props {
		/** Text to render inside the link */
		text?: string;
		/** The name of the SVG icon to display (must be a valid key from svgs.ts) */
		svg?: keyof typeof SVGS;
		/** Destination URL for link*/
		href?: string;
		/** Whether this nav item is currently active */
		isActive?: boolean;
		/** Handler for item click */
		onclick?: (event: MouseEvent) => unknown;
		/** Whether to render the icon and text vertically or horizontally */
		orientation?: NavItemOrientation;
	}

	let {
		text = '',
		svg = 'home',
		href = '',
		isActive = false,
		onclick = undefined,
		orientation = 'vertical'
	}: Props = $props();

	/** Additional classes to set for anchor element based on orientation value*/
	let anchorClasses = $derived(
		orientation === 'vertical'
			? 'flex-col items-center  space-y-2  text-sm md:text-lg lg:text-xl '
			: ' flex-row items-center space-x-2'
	);

	/** Additional classes to set for Icon component based on nav item orientation and whether it is active*/
	let iconClasses = $derived(
		`${isActive ? 'text-emphasis' : ''} ${
			orientation === 'vertical' ? 'size-6 md:size-8 lg:size-10' : 'size-8'
		}`
	);

	/** Additional classes to set for nav item text based on nav item orientation and whether it is active*/
	let itemTextClasses = $derived(
		`${
			isActive ? 'text-gradient animate-gradient-move' : ''
		} ${orientation === 'vertical' ? '' : 'pt-1'}`
	);
</script>

<li role="menuitem" class="w-full">
	<a
		{onclick}
		{href}
		class="hover:bg-primary/50 flex w-full justify-center p-4 font-bold text-white {anchorClasses}">
		<Icon {svg} class="group inline-block shrink-0 {iconClasses}"></Icon>
		<span class="inline-block whitespace-nowrap {itemTextClasses}">{text}</span>
	</a>
</li>
