import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import resumePdf from '$lib/assets/documents/resume.pdf?url';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response = await fetch(resumePdf);

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
