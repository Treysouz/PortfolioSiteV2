<script lang="ts" generics="Entity">
	import { Dropdown, Textbox, Icon, Card } from '$lib/components';
	import Fuse from 'fuse.js';
	import type { MultipleComboboxProps, SingleComboboxProps } from './combobox.types';

	// Combobox component
	type Props = SingleComboboxProps<Entity> | MultipleComboboxProps<Entity>;

	let {
		open = $bindable(false),
		label,
		options,
		searchKey,
		idKey,
		enableSearch = false,
		value = $bindable(undefined),
		class: className = '',
		inputTextSize = 'base',
		multiple = false,
		placeholder = ''
	}: Props = $props();

	/** Reference to the Textbox component*/
	let textboxComponent: ReturnType<typeof Textbox>;
	/** Current filtered options based on search box input */
	let filteredOptions: Entity[] = $state(options);
	/**
	 * Fuse.js instance for fuzzy search functionality.
	 * Automatically updates when options or searchKey changes.
	 */
	let fuse = $derived(
		new Fuse(options, {
			keys: [String(searchKey)],
			threshold: 0.1
		})
	);

	/** Set of selected IDs  */
	let selectedIds = $derived(
		new Set(Array.isArray(value) ? value.map((option) => option[idKey]) : [value?.[idKey]])
	);

	/** Index of the currently highlighted option for keyboard navigation */
	let highlightedIndex: number = $state(-1);

	/** Clears all selected values from the combobox.*/
	const clearValue = () => {
		value = undefined;
	};

	/**
	 * Filters the options list based on the search box input using Fuse.js fuzzy search.
	 * If the query is empty, shows all options.
	 * @param {string} value - The search input string
	 */
	const filterOptions = (value: string) => {
		if (value.trim()) {
			const searchResults = fuse.search(value);

			filteredOptions = searchResults.map((result) => result.item);
		} else {
			filteredOptions = options;
		}
	};

	/**
	 * Handles option selection/deselection.
	 * In multiple mode, adds/removes items from the value array.
	 * In single mode, sets or clears the single value and closes the dropdown.
	 * @param {boolean} checked - Whether the option should be selected or deselected
	 * @param {Entity} option - The entity to select/deselect
	 */
	const handleChange = (checked: boolean, option: Entity) => {
		if (multiple) {
			if (checked) {
				value = Array.isArray(value) ? [...value, option] : [option];
			} else {
				value = Array.isArray(value)
					? value.filter((entity) => {
							return entity[idKey] !== option[idKey];
						})
					: undefined;
			}
		} else {
			value = checked ? option : undefined;
			open = false;
		}
	};

	/**
	 * Handles keyboard navigation and selection within the combobox.
	 * Supports:
	 * - ArrowDown/ArrowUp: Navigate through options
	 * - Enter: Select/deselect highlighted option
	 * - Tab/Escape: Close dropdown
	 * - Home/End: Jump to first/last option
	 * @param {KeyboardEvent} event - The keyboard event
	 */
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowDown') {
			open = true;
			highlightedIndex = (highlightedIndex + 1) % filteredOptions.length;
			event.preventDefault(); // Prevent page scroll
		} else if (event.key === 'ArrowUp') {
			highlightedIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
			event.preventDefault(); // Prevent page scroll
		} else if (event.key === 'Enter' && highlightedIndex > -1) {
			const option = filteredOptions[highlightedIndex];
			handleChange(!selectedIds.has(option[idKey]), option);
			event.preventDefault(); // Prevent form submission
		} else if (event.key === 'Tab') {
			open = false;
		} else if (event.key === 'Escape') {
			open = false;
		} else if (event.key == 'Home' && open === true) {
			highlightedIndex = 0;
			event.preventDefault(); // Prevent page scroll
		} else if (event.key == 'End' && open === true) {
			highlightedIndex = filteredOptions.length - 1;
			event.preventDefault(); // Prevent page scroll
		}
	};

	/** When combobox is open, focus the search box. When closed, set highlighted index to 0 */
	$effect(() => {
		if (open) {
			textboxComponent?.focusInput();
		} else {
			highlightedIndex = -1;
		}
	});
	/** If options updates, reset highlighted index and reset filteredOptions*/
	$effect(() => {
		filteredOptions = options;
		highlightedIndex = -1;
	});
</script>

<div
	role="combobox"
	aria-expanded={open}
	aria-controls="combobox-menu"
	aria-haspopup="listbox"
	aria-label={label}
	class={className}>
	<Dropdown
		{label}
		bind:open
		class="h-full w-full"
		onkeydown={handleKeydown}
		toggleClass="rounded-lg outline-none focus:ring-emphasis focus:ring-1">
		{#snippet toggle()}
			<div
				data-testid="selected-options"
				class="flex h-full w-full flex-row items-center justify-between rounded-lg bg-black/75 px-2 py-4 shadow-lg backdrop-blur-lg"
				class:ring-emphasis={open}
				class:ring-1={open}>
				{#if Array.isArray(value) && value.length && multiple}
					<span class="text-white">
						{label} ({value.length})
					</span>
				{:else if value && !Array.isArray(value)}
					<span class="text-white">
						{value[searchKey]}
					</span>
				{:else}
					<span class="text-gray-400">{placeholder}</span>
				{/if}

				<div class="flex h-full items-center justify-center space-x-2 pl-2">
					{#if Array.isArray(value) ? value.length : value}
						<button
							aria-label="Clear selection"
							onclick={clearValue}
							class="flex h-min w-min cursor-pointer items-center justify-center opacity-50 hover:opacity-100">
							<Icon svg="x-mark" class="size-5"></Icon>
						</button>
					{/if}
					<Icon svg={open ? 'chevron-up' : 'chevron-down'} class="size-5"></Icon>
				</div>
			</div>
		{/snippet}
		{#snippet menu()}
			<div class="relative flex h-0 justify-center">
				<Card class="absolute top-4 z-10 w-full overflow-hidden bg-black/75 text-white shadow-lg">
					<div class="p-4" class:hidden={!enableSearch}>
						<Textbox
							aria-label={`Search ${label}`}
							type="search"
							bind:this={textboxComponent}
							textSize={inputTextSize}
							placeholder="Search"
							oninput={(event) => {
								filterOptions(event.currentTarget.value);
							}}
							onkeydown={handleKeydown}
							aria-activedescendant={highlightedIndex >= 0
								? `${label}-option-${highlightedIndex}`
								: undefined}>
						</Textbox>
					</div>
					<ul
						id="combobox-menu"
						class="max-h-50 w-full overflow-auto"
						role="listbox"
						aria-multiselectable={multiple}>
						{#each filteredOptions as option, index (index)}
							{@const optionName = `${option[searchKey]}`}
							{@const checked = selectedIds.has(option[idKey])}
							{@const highlighted = index === highlightedIndex}
							<li
								role="option"
								aria-selected={checked}
								id={`${label}-option-${index}`}
								class="outline-none {highlighted ? 'bg-secondary/25' : ''}">
								<label
									><input
										type="checkbox"
										class="peer sr-only"
										{checked}
										onchange={(event) => {
											handleChange(event.currentTarget.checked, option);
										}}
										name={optionName}
										value={option} />
									<div
										class="hover:bg-secondary/25 peer-checked:bg-secondary/75 w-full cursor-pointer border-l-4 border-transparent px-4 py-2 peer-checked:border-white">
										{optionName}
									</div></label>
							</li>
						{/each}
					</ul>
				</Card>
			</div>
		{/snippet}
	</Dropdown>
</div>
