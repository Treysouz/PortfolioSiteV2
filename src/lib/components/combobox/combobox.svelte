<script lang="ts" generics="Entity">
	import { Dropdown, Textbox, Icon, Card } from '$lib/components';
	import Fuse from 'fuse.js';

	// Combobox component
	interface Props<T> {
		/** Display label for the combobox component */
		label: string;
		/** Array of selectable options */
		options: T[];
		/** Key within Entity to use for displaying and searching options */
		searchKey: keyof T;
		/** Key within Entity to use as the unique identifier */
		idKey: keyof T;
		/** Whether the combobox dropdown is open */
		open?: boolean;
		/** Additional CSS classes to apply to the component */
		class?: string;
		/** Text size for the search input field */
		inputTextSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
		/**Whether search box is enabled */
		enableSearch?: boolean;
		/**Placeholder text to show if no selection is made */
		placeholder?: string;
		/** Select handler */
		onselect?: (entity?: T[]) => unknown;
		/** Whether we're in multiple selection mode */
		multiple?: boolean;
		/** Array of currently selected entities */
		value?: T[];
	}

	let {
		open = $bindable(false),
		label,
		options,
		searchKey,
		idKey,
		enableSearch = false,
		value = $bindable(undefined),
		class: className = '',
		inputTextSize = undefined,
		multiple = false,
		placeholder = '',
		onselect = undefined
	}: Props<Entity> = $props();

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
		if (checked) {
			value = value ? [...value, option] : [option];
		} else {
			value = value
				? value.filter((entity) => {
						return entity[idKey] !== option[idKey];
					})
				: undefined;
		}

		onselect?.(value);
	};

	/**
	 * Scrolls the highlighted element into view.
	 * @param {number} index - The index of the element to scroll to
	 */
	const scrollToHighlighted = (index: number) => {
		const element = document.getElementById(`${label}-option-${index}`);
		element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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
			scrollToHighlighted(highlightedIndex);
		} else if (event.key === 'ArrowUp') {
			highlightedIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
			scrollToHighlighted(highlightedIndex);
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
			scrollToHighlighted(highlightedIndex);
		} else if (event.key == 'End' && open === true) {
			highlightedIndex = filteredOptions.length - 1;
			scrollToHighlighted(highlightedIndex);
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
		toggleClass="input bg-black/25 shadow-lg backdrop-blur-lg focus-within:outline-accent outline-1! focus-within:outline-offset-0 h-10 {open
			? 'outline-accent outline-1'
			: 'outline-black/50'}">
		{#snippet toggle()}
			<div
				data-testid="selected-options"
				class="flex h-full w-full flex-row items-center justify-between">
				{#if multiple && value}
					<span class="text-white">
						{label} ({value.length})
					</span>
				{:else if !multiple && value}
					<span class="text-white">
						{value[0][searchKey]}
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
				<Card class="absolute top-4 z-10 w-full overflow-hidden bg-black/50 text-white shadow-lg">
					<div class="p-4" class:hidden={!enableSearch}>
						<Textbox
							name={label}
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

							<li role="option" aria-selected={checked} id={`${label}-option-${index}`}>
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
										data-testid="combobox-option-name"
										class="peer-checked:bg-secondary/75 w-full cursor-pointer border-l-4 border-transparent px-4 py-2 text-sm outline-none peer-checked:border-white {highlighted
											? 'bg-secondary/25!'
											: 'hover:bg-secondary/25'}">
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
