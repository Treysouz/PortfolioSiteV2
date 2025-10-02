<script lang="ts" generics="Entity">
	/** Table Component */
	import { createSvelteTable } from '$lib/utils/tanstack/table.utils.svelte';
	import { Textbox, Combobox, IconWrapper } from '$lib/components';
	import NoResults from './components/no-results.svelte';
	import type { Snippet } from 'svelte';
	import type { Row, TableOptions, Column } from '@tanstack/table-core';
	import type { FormEventHandler } from 'svelte/elements';
	import Card from '../card/card.svelte';

	interface Props {
		/** Accessible label for the table */
		label: string;
		/** TanStack Table configuration options */
		options: TableOptions<Entity>;
		/** Snippet for rendering individual table rows */
		tableItem: Snippet<[Row<Entity>]>;
		/** Array of data entities to display */
		data?: Entity[];
		/** Whether data is currently loading */
		loading?: boolean;
	}

	let { options, tableItem, label, loading = false, data = undefined }: Props = $props();

	const updateGlobalFilter: FormEventHandler<HTMLInputElement> = (event) => {
		if (event.target && 'value' in event.target) {
			table.setGlobalFilter(event.target?.value);
		}
	};

	const updateFilter = <TFilterData,>(column: Column<Entity, unknown>, value?: TFilterData[]) => {
		column.setFilterValue(value);
	};

	let table = $derived(createSvelteTable(options));
	let columns = $derived(table.getAllColumns());
</script>

<div class="flex h-full min-h-0 flex-col space-y-4 sm:space-y-8">
	<div class="z-10 flex w-full flex-row flex-wrap items-center gap-4 sm:gap-8 xl:flex-nowrap">
		<Textbox
			name={label}
			type="search"
			class="w-full md:max-w-lg"
			placeholder="Search for tech"
			debounce={500}
			oninput={updateGlobalFilter}></Textbox>
		<div class="flex w-full flex-row flex-wrap gap-4 sm:gap-8 md:flex-nowrap">
			{#each columns as column (column.id)}
				{@const canFilter = column.getCanFilter()}
				{@const filterConfig = column.columnDef.meta?.filterConfig}
				{#if canFilter && filterConfig}
					<Combobox
						label={filterConfig.label}
						options={filterConfig.data}
						idKey={filterConfig.idKey}
						searchKey={filterConfig.searchkey}
						class="md:w-xs h-10 w-full"
						multiple={filterConfig.multiple}
						enableSearch
						placeholder={filterConfig.placeholder}
						onselect={(value) => {
							updateFilter(column, value);
						}}></Combobox>
				{/if}
			{/each}
		</div>
	</div>

	{#if loading}
		<div class="flex h-full w-full items-center justify-center">
			<span class="loading size-12 sm:size-16 lg:size-32"></span>
		</div>
	{:else if table && data?.length}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="flex w-full flex-row flex-wrap items-start justify-center gap-4 overflow-auto border-t pt-4 sm:justify-start sm:gap-8 sm:pt-8"
			role="list"
			aria-label={label}
			tabindex="0">
			{#each table.getRowModel().rows as row (row.id)}
				<div role="listitem">
					{@render tableItem(row)}
				</div>
			{/each}
		</div>
	{:else}
		<NoResults isError={!table}></NoResults>
	{/if}
</div>
