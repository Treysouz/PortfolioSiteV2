import type { Database } from '$lib/types/supabase.types.js';

/** Enum of technology types from Supabase */
export type TechType = Database['public']['Enums']['Tech Type'];

/** Represents a technology/tool with its metadata. */
export type Tech = {
	/** URL to the tech's logo image */
	imgUrl?: Database['public']['Tables']['Tech']['Row']['img_url'];
	/** Name of the tech  */
	name?: Database['public']['Tables']['Tech']['Row']['name'];
	/** Proficiency level from 0-5  */
	proficiency?: number;
	/** Type of the tech */
	type?: Database['public']['Enums']['Tech Type'] | null;
};

/** Configuration for sorting tech data */
export interface SortConfig {
	/** Tech property to sort by */
	column: string;
	/** Sort order: true for ascending, false for descending */
	ascending?: boolean;
}

/** Request payload for POST /data/tech endpoint. */
export interface PostPayload {
	/** Filter by one or more technology types */
	types?: TechType[];
	/** Text search filter (searches by technology name) */
	value?: string;
	/** Sort configuration */
	sort?: SortConfig;
}
