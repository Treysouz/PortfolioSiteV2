<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	/** Text Box component. */
	interface Props extends HTMLInputAttributes {
		/** Text in box*/
		value?: string | number;
		/** Content to render before textbox input*/
		boxPrefix?: Snippet;
		/** Content to render after textbox input */
		boxSuffix?: Snippet;
		/** Additional CSS classes to apply to the component */
		class?: string;
		/** Text size*/
		textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
	}

	let {
		type,
		value = $bindable(undefined),
		boxPrefix = undefined,
		boxSuffix = undefined,
		class: className = '',
		textSize = 'base',
		...props
	}: Props = $props();

	/** Reference to input element*/
	let inputElement: HTMLInputElement;

	/** Class pertaining to input text size*/
	let textSizeClass = $derived(`text-${textSize}`);

	/** Focuses input element when called*/
	export const focusInput = () => {
		inputElement?.focus();
	};
</script>

<div
	class="focus-within:ring-emphasis flex h-10 flex-row items-center rounded-lg shadow-lg backdrop-blur-lg focus-within:ring-1 {className}">
	{#if type === 'search'}
		<div class="&>*]:rounded-l-lg flex h-full items-center justify-center pl-2">
			<Icon svg="magnifying-glass" class="-mt-0.5 size-5"></Icon>
		</div>
	{/if}
	{#if boxPrefix}
		<div class="h-full [&>*]:rounded-l-lg">
			{@render boxPrefix()}
		</div>
	{/if}
	<input
		{...props}
		bind:value
		class="w-full border-none bg-transparent placeholder-gray-400 ring-0 {textSizeClass}"
		bind:this={inputElement} />
	{#if boxSuffix}
		<div class="h-full [&>*]:rounded-r-lg">
			{@render boxSuffix()}
		</div>
	{/if}
</div>

<style>
	input[type='search']::-webkit-search-cancel-button {
		cursor: pointer;
		filter: brightness(0) invert(0.5);
	}

	input[type='search']::-webkit-search-cancel-button:hover {
		filter: brightness(0) invert(1);
	}
</style>
