import type { TechType } from '../../types/tech.types';

export interface TechTypeOption extends Record<string, unknown> {
	type: TechType;
}
