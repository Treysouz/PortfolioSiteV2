<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	/** Text Box component. */
	interface Props extends HTMLInputAttributes {
		/** Name of input*/
		name: string;
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
		name,
		type = 'text',
		value = $bindable(undefined),
		boxPrefix = undefined,
		boxSuffix = undefined,
		class: className = '',
		textSize = 'sm',
		...props
	}: Props = $props();

	/** Reference to input element*/
	let inputElement: HTMLInputElement;

	/** Focuses input element when called*/
	export const focusInput = () => {
		inputElement?.focus();
	};
</script>

<label
	class="input focus-within:outline-accent h-10 bg-black/75 shadow-lg backdrop-blur-lg focus-within:outline-1 focus-within:outline-offset-0 {className}">
	{#if type === 'search'}
		<div class="&>*]:rounded-l-lg flex h-full items-center justify-center">
			<Icon svg="magnifying-glass" class="-mt-0.5 size-5"></Icon>
		</div>
	{/if}
	{#if boxPrefix}
		<div class="h-full [&>*]:rounded-l-lg">
			{@render boxPrefix()}
		</div>
	{/if}
	<input
		{name}
		{...props}
		bind:value
		class="w-full bg-transparent placeholder-gray-400 ring-0 text-{textSize}"
		bind:this={inputElement} />
	{#if boxSuffix}
		<div class="h-full [&>*]:rounded-r-lg">
			{@render boxSuffix()}
		</div>
	{/if}
</label>

<style>
	input[type='search']::-webkit-search-cancel-button {
		cursor: pointer;
		filter: brightness(0) invert(0.5);
	}

	input[type='search']::-webkit-search-cancel-button:hover {
		filter: brightness(0) invert(1);
	}
</style>
