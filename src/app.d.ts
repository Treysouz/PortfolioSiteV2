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
	interface FilterConfig<T extends Record<string, unkonwn>> {
		filterType: 'select' | 'multi-select';
		label: string;
		data: T[];
		nameKey: keyof T;
		idKey: keyof T;
		multiple?: boolean;
		placeholder?: string;
	}

	interface ColumnMeta {
		filterConfig?: FilterConfig<T>;
	}
}

export {};
