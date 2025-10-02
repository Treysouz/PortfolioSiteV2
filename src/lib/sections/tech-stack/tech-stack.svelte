<script lang="ts">
	import { Section, Card, Table, Icon } from '$lib/components';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryTechData } from '$lib/utils/tech';
	import {
		getCoreRowModel,
		type ColumnDef,
		type FilterConfig,
		type OnChangeFn,
		type TableOptions,
		type ColumnFiltersState
	} from '@tanstack/table-core';
	import type { TechTypeOption } from './tech-stack.types';
	import type { Tech, TechType } from '$lib/types/tech.types';

	/** Section to show tech experience */

	let data: Tech[] = $state([]);
	let globalFilterValue: string = $state('');
	let columnFilterState: ColumnFiltersState = $state([]);
	let loading: boolean = $state(true);

	const TECH_TYPE_OPTIONS: TechTypeOption[] = [
		{
			type: 'Hosting & Infrastructure'
		},
		{
			type: 'Programming Languages'
		},
		{
			type: 'Frameworks & Libraries'
		},
		{
			type: 'Build & DevOps'
		},
		{
			type: 'Project Management'
		},
		{
			type: 'Testing & QA'
		},
		{
			type: 'Design'
		},
		{
			type: 'Dev Env'
		}
	];

	const queryClient = useQueryClient();

	const queryData = async (searchValue?: string, columnFilters?: ColumnFiltersState) => {
		loading = true;
		try {
			const techTypeFilterState = columnFilterState.find((f) => f.id === 'type');

			const filterValue: TechTypeOption[] | undefined =
				techTypeFilterState?.value as TechTypeOption[];

			const selectedTechTypes: TechType[] = filterValue?.map((option) => option.type);

			const response = await queryTechData(queryClient, searchValue, selectedTechTypes);

			data = response;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	const handleGlobalFilterChange: OnChangeFn<string> = (updater) => {
		if (typeof updater === 'function') {
			globalFilterValue = updater(globalFilterValue);
		} else {
			globalFilterValue = updater;
		}
	};

	const handleColumnFilterChange: OnChangeFn<ColumnFiltersState> = (updater) => {
		if (typeof updater === 'function') {
			columnFilterState = updater(columnFilterState);
		} else {
			columnFilterState = updater;
		}
	};

	const createTableOptions = (data: Tech[]): TableOptions<Tech> => {
		const typeFilterConfig: FilterConfig<TechTypeOption> = {
			filterType: 'multi-select',
			data: TECH_TYPE_OPTIONS,
			multiple: true,
			idKey: 'type',
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
			state: {
				globalFilter: globalFilterValue,
				columnFilters: columnFilterState
			},
			getCoreRowModel: getCoreRowModel(),
			manualFiltering: true,
			onGlobalFilterChange: handleGlobalFilterChange,
			onColumnFiltersChange: handleColumnFilterChange
		};
	};

	let options: TableOptions<Tech> = $derived(createTableOptions(data));

	$effect(() => {
		queryData(globalFilterValue, columnFilterState);
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
						{#each Array(5) as _, index (index)}
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
