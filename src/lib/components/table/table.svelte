<script lang="ts" generics="Entity">
	import { createSvelteTable } from '$lib/utils/table/table.utils.svelte';
	// import { Textbox, Combobox } from '$lib/components';
	import { getCoreRowModel, type ColumnDef } from '@tanstack/table-core';
	import type { Snippet } from 'svelte';
	import type { Row } from '@tanstack/table-core';

	interface Props {
		label: string;
		data: Entity[];
		columns: ColumnDef<Entity>[];
		tableItem: Snippet<[Row<Entity>]>;
	}

	let { data, columns, tableItem, label }: Props = $props();

	const table = createSvelteTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<div class="flex h-full min-h-0 flex-col space-y-4 sm:space-y-8">
	<!-- <div class="z-10 flex w-full flex-row flex-wrap gap-4 sm:gap-8 xl:flex-nowrap">
		<Textbox type="search" class="w-full bg-black/75 md:max-w-lg" placeholder="Search for tech"
		></Textbox>
		<div class="flex w-full flex-row flex-wrap gap-4 sm:gap-8 md:flex-nowrap">
			<Combobox
				label="Name"
				options={data}
				idKey="name"
				searchKey="name"
				class="md:w-xs h-10 w-full"
				multiple
				enableSearch
				placeholder="Select a type"></Combobox>
			<Combobox
				label="Name"
				options={data}
				idKey="name"
				searchKey="name"
				class="md:w-xs h-10 w-full"
				placeholder="Select an order"></Combobox>
		</div>
	</div> -->

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="flex h-full w-full flex-row flex-wrap justify-center gap-4 overflow-auto sm:gap-8"
		role="list"
		aria-label={label}
		tabindex="0">
		{#each table.getRowModel().rows as row (row.id)}
			<div role="listitem">
				{@render tableItem(row)}
			</div>
		{/each}
	</div>
</div>
