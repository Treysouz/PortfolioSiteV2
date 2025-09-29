import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabase';
import { getErrorData } from '$lib/utils/api';

import type { GetParams, Tech } from './tech.types.js';

export const GET = async (request) => {
	const { value, type, sort }: GetParams = request.params;

	let query = supabase.from('Tech').select('*');

	if (value) {
		query = query.textSearch('name', value || '');
	}

	if (type) {
		query = query.eq('type', type);
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
