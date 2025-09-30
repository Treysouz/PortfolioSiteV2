<script lang="ts" generics="Entity">
	import { createSvelteTable } from '$lib/utils/table/table.utils.svelte';
	import { Card, Icon } from '$lib/components';
	import { getCoreRowModel, type ColumnDef } from '@tanstack/table-core';

	interface Props {
		data: Entity[];
		columns: ColumnDef<Entity>[];
	}

	let { data, columns }: Props = $props();

	const table = createSvelteTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<div class="flex w-full flex-row flex-wrap gap-8" role="table">
	{#each table.getRowModel().rows as row (row.id)}
		<div role="cell" class="shrink-0">
			<Card class="size-54 p-4">
				<figure class="flex h-full w-full flex-col items-center space-y-4">
					<figcaption class="text-lg font-bold">Test</figcaption>
					<img
						class="size-24 bg-red-100 object-contain"
						alt="cat"
						src="https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png" />
					<div class="flex flex-row">
						<Icon svg="star-filled" class="size-6"></Icon><Icon svg="star-outline" class="size-6"
						></Icon
						><Icon svg="star-outline" class="size-6"></Icon><Icon svg="star-outline" class="size-6"
						></Icon>
						<Icon svg="star-outline" class="size-6"></Icon>
					</div>
				</figure>
			</Card>
		</div>
	{/each}
</div>
