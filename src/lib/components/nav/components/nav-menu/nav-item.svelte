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

	/** Additional classes to set for the div wrapper based on orientation value*/
	let linkWrapperClasses = $derived(
		orientation === 'vertical'
			? 'flex-col items-center space-y-2'
			: ' flex-row items-center space-x-4 justify-start w-40'
	);

	/** Additional classes to set for Icon component based on nav item orientation and whether it is active*/
	let iconClasses = $derived(
		` ${isActive ? 'text-primary' : ''} ${orientation === 'vertical' ? 'size-6 md:size-8 lg:size-10' : 'size-8'}`
	);

	/** Additional classes to set for Icon component's background based on whether it is active*/
	let iconBgClasses = $derived(
		isActive ? 'border-2 border-emphasis' : 'border-2 border-transparent'
	);

	/** Additional classes to set for nav item text based on nav item orientation and whether it is active*/
	let itemTextClasses = $derived(
		`${
			isActive ? 'text-gradient animate-gradient-move ' : ''
		} ${orientation === 'vertical' ? '' : 'pt-1'}`
	);
</script>

<a
	{onclick}
	{...anchorProps}
	class="hover:bg-secondary/25 flex items-center justify-center font-bold text-white {className}">
	<div class="flex items-center {linkWrapperClasses}">
		<IconWrapper class="text-primary {iconBgClasses}">
			<Icon {svg} class={iconClasses}></Icon>
		</IconWrapper>
		<span class="whitespace-nowrap {itemTextClasses}">{text}</span>
	</div>
</a>
