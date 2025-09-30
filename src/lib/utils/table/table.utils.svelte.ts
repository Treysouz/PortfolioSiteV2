/** Svelte 5 adapter code provided by KevinVanday: https://github.com/TanStack/table/pull/5403/files with some adjustments to remove deprecated logic*/

import {
	createTable,
	type RowData,
	type TableOptions,
	type TableOptionsResolved,
	type TableState
} from '@tanstack/table-core';
import type { Component } from 'svelte';

/**
 * Creates a reactive TanStack table object for Svelte.
 * @param options Table options to create the table with.
 * @returns A reactive table object.
 * @example
 * ```svelte
 * <script>
 *   const table = createSvelteTable({ ... })
 * </script>
 *
 * <table>
 *   <thead>
 *     {#each table.getHeaderGroups() as headerGroup}
 *       <tr>
 *         {#each headerGroup.headers as header}
 *           <th colspan={header.colSpan}>
 *         	   <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
 *         	 </th>
 *         {/each}
 *       </tr>
 *     {/each}
 *   </thead>
 * 	 <!-- ... -->
 * </table>
 * ```
 */
export function createSvelteTable<TData extends RowData>(options: TableOptions<TData>) {
	const resolvedOptions: TableOptionsResolved<TData> = mergeObjects(
		{
			state: {},
			onStateChange() {},
			renderFallbackValue: null,
			mergeOptions: (
				defaultOptions: TableOptions<TData>,
				options: Partial<TableOptions<TData>>
			) => {
				return mergeObjects(defaultOptions, options);
			}
		},
		options
	);

	const table = createTable(resolvedOptions);
	let state = $state<Partial<TableState>>(table.initialState);

	function updateOptions() {
		table.setOptions((prev) => {
			return mergeObjects(prev, options, {
				state: mergeObjects(state, options.state || {}),
				onStateChange: (updater: any) => {
					if (updater instanceof Function) state = updater(state);
					else state = mergeObjects(state, updater);

					options.onStateChange?.(updater);
				}
			});
		});
	}

	updateOptions();

	$effect.pre(() => {
		updateOptions();
	});

	return table;
}

/**
 * Merges objects together while keeping their getters alive.
 * Taken from SolidJS: {@link https://github.com/solidjs/solid/blob/24abc825c0996fd2bc8c1de1491efe9a7e743aff/packages/solid/src/server/rendering.ts#L82-L115}
 * */
export function mergeObjects<T>(source: T): T;
export function mergeObjects<T, U>(source: T, source1: U): T & U;
export function mergeObjects<T, U, V>(source: T, source1: U, source2: V): T & U & V;
export function mergeObjects<T, U, V, W>(
	source: T,
	source1: U,
	source2: V,
	source3: W
): T & U & V & W;
export function mergeObjects(...sources: any): any {
	const target = {};
	for (let i = 0; i < sources.length; i++) {
		let source = sources[i];
		if (typeof source === 'function') source = source();
		if (source) {
			const descriptors = Object.getOwnPropertyDescriptors(source);
			for (const key in descriptors) {
				if (key in target) continue;
				Object.defineProperty(target, key, {
					enumerable: true,
					get() {
						for (let i = sources.length - 1; i >= 0; i--) {
							let v,
								s = sources[i];
							if (typeof s === 'function') s = s();
							v = (s || {})[key];
							if (v !== undefined) return v;
						}
					}
				});
			}
		}
	}
	return target;
}

/**
 * A helper class to make it easy to identify Svelte components in `columnDef.cell` and `columnDef.header` properties.
 * @example
 * ```svelte
 * {#if cell.column.columnDef.cell(cell.getContext()) instanceof RenderComponentConfig}
 *   {@const config = columnDef.cell}
 *   <config.component {...config.props} />
 * {/if}
 * ```
 * */
export class RenderComponentConfig<TProps extends Record<string, any> = Record<string, never>> {
	constructor(
		public component: Component<TProps>,
		public props: TProps = {} as TProps
	) {}
}

/**
 * A helper function to help create cells from Svelte components through ColumnDef's `cell` and `header` properties.
 * @param component A Svelte component
 * @param props The props to pass to `component`
 * @returns A `RenderComponentConfig` object that helps svelte-table know how to render the header/cell component.
 * @example
 * ```ts
 * // +page.svelte
 * const defaultColumns = [
 *   columnHelper.accessor('name', {
 *     header: header => renderComponent(SortHeader, { label: 'Name', header }),
 *   }),
 *   columnHelper.accessor('state', {
 *     header: header => renderComponent(SortHeader, { label: 'State', header }),
 *   }),
 * ]
 * ```
 * @see {@link https://tanstack.com/table/latest/docs/guide/column-defs}
 */
export const renderComponent = <TProps extends Record<string, any> = Record<string, never>>(
	component: Component<TProps>,
	props: TProps
) => new RenderComponentConfig(component, props);
