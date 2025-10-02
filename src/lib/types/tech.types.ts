import type { Database } from '$lib/types/supabase.types.js';

/** Type that best categorizes the tech */
export type TechType = Database['public']['Enums']['Tech Type'];

/** Entity representing a tech tool (from Supabase) */
export type Tech = {
	imgUrl?: Database['public']['Tables']['Tech']['Row']['img_url'];
	name?: Database['public']['Tables']['Tech']['Row']['name'];
	proficiency?: number;
	type?: Database['public']['Enums']['Tech Type'] | null;
};

/** Config for sorting tech*/
export interface SortConfig {
	/** Data table column to sort by */
	column: keyof Tech;
	/**  Order to sort data*/
	ascending?: boolean;
}

/** Expected paylod from request for POST endpoint*/
export interface PostPayload {
	/** Type of tech to filter by */
	types?: TechType[];
	/** Text to filter data by */
	value?: string;
	/** Config for sorting tech*/
	sort?: SortConfig;
}
