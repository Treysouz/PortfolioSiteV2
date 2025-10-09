<script lang="ts">
	// Settings Toggle Component

	import type { ChangeEventHandler } from 'svelte/elements';

	interface Props {
		/** The label text displayed next to the toggle */
		title: string;
		/** ID for the toggle element */
		id: string;
		/** Whether toggle is on */
		checked: boolean;
		/** Tooltip text shown on hover */
		tooltip?: string;
		/** Whether component is intended to be a title for a collapsable section*/
		isCollapseTitle?: boolean;
		/** Toggle change event */
		onchange?: ChangeEventHandler<HTMLInputElement>;
	}

	let {
		title,
		id,
		checked = $bindable(),
		tooltip = '',
		isCollapseTitle = false,
		onchange = undefined
	}: Props = $props();

	/** Tag of parent element*/
	let parentName = $derived(isCollapseTitle ? 'div' : 'li');
</script>

<svelte:element
	this={parentName}
	data-tip={tooltip}
	class:tooltip={!!tooltip}
	class="tooltip-primary pointer-events-auto flex w-full flex-row items-center justify-between">
	<div
		class="bg-transparent! flex h-full w-full flex-row rounded-none p-4 {isCollapseTitle
			? ''
			: 'pr-11.5 sm:pr-13.5 cursor-default'}">
		<span {id} class="w-full">{title}</span>
		<input
			type="checkbox"
			aria-labelledby={id}
			id="toggle-checkbox"
			bind:checked
			{onchange}
			class="toggle lg:toggle-lg checked:text-primary pointer-events-auto" />
	</div>
</svelte:element>
