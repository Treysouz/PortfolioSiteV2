<script lang="ts">
	import { Section, Textbox, Combobox, Table } from '$lib/components';
	import type { ColumnDef } from '@tanstack/table-core';

	/** Section to show tech experience of developer. */

	interface Person {
		name: string;
		age: number;
	}

	let data: Person[] = $state([
		{ name: 'John', age: 30 },
		{ name: 'Jane', age: 25 }
	]);

	const columns: ColumnDef<Person>[] = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'age', header: 'Age' }
	];
</script>

<Section id="tech" header="Tech Stack">
	<div class="flex h-full w-full flex-col items-center justify-center space-y-8">
		<div class="flex w-full flex-row space-x-8">
			<Textbox type="search" class="w-xl bg-black/50" placeholder="Search for tech"></Textbox>
			<Combobox
				label="Name"
				options={data}
				idKey="name"
				searchKey="name"
				class="w-xs h-10"
				multiple
				enableSearch
				placeholder="Select a type"></Combobox>
			<Combobox
				label="Name"
				options={data}
				idKey="name"
				searchKey="name"
				class="w-xs h-10"
				placeholder="Select an order"></Combobox>
		</div>
		<Table {data} {columns}></Table>
	</div>
</Section>
