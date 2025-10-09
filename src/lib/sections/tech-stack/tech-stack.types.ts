import type { TechType } from '../../types/tech.types';

/** Options for tech type */
export interface TechTypeOption extends Record<string, unknown> {
	type: TechType;
}
