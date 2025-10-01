<script lang="ts">
	import { Section, Card, Table, Icon } from '$lib/components';
	import type { ColumnDef } from '@tanstack/table-core';

	/** Section to show tech experience of developer. */

	interface Person {
		name: string;
		age: number;
	}

	let data: Person[] = Array.from({ length: 24 }, () => ({ name: 'John', age: 30 }));

	const columns: ColumnDef<Person>[] = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'age', header: 'Age' }
	];
</script>

<Section id="tech" header="Tech Stack" class="h-full">
	<Table {data} {columns} label="Tech List">
		{#snippet tableItem()}
			<Card class="size-38 p-2 sm:size-52 sm:p-4">
				<div class="flex h-full w-full flex-col items-center space-y-2 sm:space-y-4">
					<span class="text-lg font-bold">Test</span>
					<div>
						<img
							class="size-16 bg-red-100 object-contain sm:size-20"
							alt="cat"
							src="https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png" />
					</div>
					<div class="flex flex-row">
						<Icon svg="star-filled" class="size-6"></Icon><Icon svg="star-outline" class="size-6"
						></Icon
						><Icon svg="star-outline" class="size-6"></Icon><Icon svg="star-outline" class="size-6"
						></Icon>
						<Icon svg="star-outline" class="size-6"></Icon>
					</div>
				</div>
			</Card>
		{/snippet}
	</Table>
</Section>
