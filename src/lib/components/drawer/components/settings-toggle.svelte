<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	interface Props {
		title: string;
		id: string;
		checked: boolean;
		tooltip?: string;
		isCollapseTitle?: boolean;
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

	let wrapperName = $derived(isCollapseTitle ? 'div' : 'li');
</script>

<svelte:element
	this={wrapperName}
	data-tip={tooltip}
	class:tooltip={!!tooltip}
	class="pointer-events-auto flex w-full flex-row items-center justify-between">
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
