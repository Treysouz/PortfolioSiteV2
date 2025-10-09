import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response = await fetch(
			'https://kfppfwgizztmqwhyymqq.supabase.co/storage/v1/object/public/Documents/Tremayne%20Souza%20-%20Resume%20-%20Front%20End%20Developer.pdf'
		);

		if (!response.ok) {
			error(404, 'File not found');
		}

		const pdfBuffer = await response.arrayBuffer();

		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'inline; filename="Tremayne_Souza_Resume.pdf"'
			}
		});
	} catch (e) {
		error(500, `Failed to retrieve file. ${e instanceof Error ? e.message : ''}`);
	}
};
