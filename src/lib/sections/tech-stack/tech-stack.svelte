<script lang="ts">
	import { Section, Card, Table, Icon } from '$lib/components';
	import { onMount } from 'svelte';
	import { Constants } from '$lib/types/supabase.types';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryTechData } from '$lib/utils/tech';
	import {
		getCoreRowModel,
		type ColumnDef,
		type FilterConfig,
		type OnChangeFn,
		type TableOptions
	} from '@tanstack/table-core';
	import type { TechTypeOption } from './tech-stack.types';
	import type { Tech } from '$lib/types/tech.types';

	/** Section to show tech experience */

	let data: Tech[] = $state([]);
	let globalFilterValue: string = $state('');
	let loading: boolean = $state(true);

	const TECH_TYPE_OPTIONS: TechTypeOption[] = Constants.public.Enums['Tech Type'].map(
		(option, index) => ({
			type: option,
			id: index
		})
	);

	const starArray = new Array(5);

	const queryClient = useQueryClient();

	const queryData = async () => {
		await queryTechData(queryClient, globalFilterValue)
			.then((response) => {
				data = response;
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				loading = false;
			});
	};

	const handleGlobalFilterChange: OnChangeFn<string> = (updater) => {
		if (typeof updater === 'string') {
			globalFilterValue = updater;
		} else {
			globalFilterValue = updater(globalFilterValue);
		}

		loading = true;

		queryData();
	};

	const createTableOptions = (data: Tech[]): TableOptions<Tech> => {
		const typeFilterConfig: FilterConfig<TechTypeOption> = {
			filterType: 'multi-select',
			data: TECH_TYPE_OPTIONS,
			multiple: true,
			idKey: 'id',
			searchkey: 'type',
			label: 'Tech Type',
			placeholder: 'Select a Tech Type'
		};

		const columns: ColumnDef<Tech>[] = [
			{ accessorKey: 'name' },
			{ accessorKey: 'imgUrl', enableGlobalFilter: false, enableColumnFilter: false },
			{ accessorKey: 'proficiency', enableGlobalFilter: false, enableColumnFilter: false },
			{
				accessorKey: 'type',
				enableGlobalFilter: false,
				meta: {
					filterConfig: typeFilterConfig
				}
			}
		];

		return {
			data,
			columns,
			getCoreRowModel: getCoreRowModel(),
			manualFiltering: true,
			onGlobalFilterChange: handleGlobalFilterChange
		};
	};

	let options: TableOptions<Tech> = $derived(createTableOptions(data));

	$effect(() => {
		if (data) {
			options = createTableOptions(data);
		}
	});

	onMount(() => {
		queryData();
	});
</script>

<Section id="tech" header="Tech Stack" class="h-full">
	<Table {data} {options} {loading} label="Tech List">
		{#snippet tableItem(row)}
			{@const { name, imgUrl, proficiency } = row.original}
			<Card class="size-45 flex items-center justify-center p-2 sm:p-4">
				<div class="flex flex-col items-center justify-around space-y-2 sm:space-y-4">
					<span class="text-center text-lg font-bold">{name}</span>
					<div class="flex flex-row">
						{#each starArray as _, index (index)}
							<Icon
								svg={index + 1 <= (proficiency || 0) ? 'star-filled' : 'star-outline'}
								class="size-4"></Icon>
						{/each}
					</div>
					<div>
						<img class="size-16 object-contain sm:size-16" loading="lazy" alt={name} src={imgUrl} />
					</div>
				</div>
			</Card>
		{/snippet}
	</Table>
</Section>
