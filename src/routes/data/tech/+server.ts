import { json, error } from '@sveltejs/kit';
import { getErrorData } from '$lib/utils/api';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import type { Database } from '$lib/types/supabase.types.js';
import type { PostPayload, Tech } from '../../../lib/types/tech.types.js';

/** Supabase URL */
const supabaseUrl: string = SUPABASE_URL;

/** Supabase API key */
const supabaseKey: string = SUPABASE_KEY;

/** Supabase client instance */
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const POST = async ({ request }) => {
	const { value, types, sort }: PostPayload = await request.json();

	let query = supabase.from('Tech').select('*');

	if (value) {
		query = query.ilike('name', `%${value}%`);
	}

	if (types) {
		let orQuery = '';
		types.forEach((type) => {
			orQuery += `type.eq.${type}`;
		});
		query = query.or(orQuery);
	}

	if (sort) {
		query = query.order(sort.column || '', { ascending: sort.ascending });
	}

	const response = await query;

	if (response.error) {
		const { status, message } = getErrorData('Failed to load Tech Stack data', response.error);

		error(status, message);
	}

	const formattedData: Tech[] = response.data?.map((entity) => {
		const { img_url, name, proficiency, type } = entity;
		return {
			imgUrl: img_url,
			name,
			proficiency: proficiency > 5 || proficiency < 0 ? 0 : proficiency,
			type: type
		};
	});

	return json(formattedData);
};
