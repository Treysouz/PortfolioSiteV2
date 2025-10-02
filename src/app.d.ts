// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@tanstack/table-core' {
	interface FilterConfig<Entity> {
		filterType: 'select' | 'multi-select';
		label: string;
		data: Entity[];
		searchkey: keyof Entity;
		idKey: keyof Entity;
		multiple?: boolean;
		placeholder?: string;
	}

	interface ColumnMeta {
		filterConfig?: FilterConfig<Entity>;
	}
}

export {};
