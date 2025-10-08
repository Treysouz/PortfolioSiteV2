declare global {
	namespace App {}
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
