<script lang="ts">
	import { SVGS, Icon, IconWrapper } from '$lib/components';
	import type { NavItemOrientation } from '../../nav.types';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	/** Icon link for navigation bar */
	interface Props {
		/** Text to render inside the link */
		text?: string;
		/** The name of the SVG icon to display (must be a valid key from svgs.ts) */
		svg?: keyof typeof SVGS;
		/** Props for anchor element*/
		anchorProps?: HTMLAnchorAttributes;
		/** Whether this nav item is currently active */
		isActive?: boolean;
		/** Handler for item click */
		onclick?: (event: MouseEvent) => unknown;
		/** Whether to render the icon and text vertically or horizontally */
		orientation?: NavItemOrientation;
		/** Additional CSS classes to apply to the component */
		class?: string;
	}

	let {
		text = '',
		svg = 'home',
		anchorProps = undefined,
		isActive = false,
		onclick = undefined,
		orientation = 'vertical',
		class: className = ''
	}: Props = $props();
</script>

<a
	{onclick}
	{...anchorProps}
	class="hover:bg-secondary/25 flex items-center justify-center font-bold text-white {className} {isActive
		? 'bg-secondary/50'
		: ''}">
	<div
		class="flex items-center {orientation === 'vertical'
			? 'flex-col items-center space-y-2'
			: ' w-40 flex-row items-center justify-start space-x-4'}">
		<IconWrapper class="text-primary ">
			<Icon {svg} class="md:size-8 {orientation === 'vertical' ? 'size-6 lg:size-10' : 'size-8'}"
			></Icon>
		</IconWrapper>
		<span class="whitespace-nowrap {orientation === 'vertical' ? '' : 'pt-1'}}">{text}</span>
	</div>
</a>
