import { error } from '@sveltejs/kit';
import type { PostgrestError } from '@supabase/supabase-js';

/**
 * Maps PostgreSQL error codes to appropriate HTTP status codes
 * @param {string} pgErrorCode - The PostgreSQL error code to map
 * @returns {number} The corresponding HTTP status code
 */
const getStatusCodeByPGError = (pgErrorCode: string) => {
	switch (pgErrorCode) {
		case '23505':
			return 409; // Unique violation
		case '23503':
			return 400; // Foreign key violation
		case '42P01':
			return 500; // Undefined table
		case '42703':
			return 500; // Undefined column
		default:
			return 500; // Internal server error
	}
};

/**
 * Constructs a SvelteKit error object from a PostgreSQL error
 * @param {string} message - The error message to display to the user
 * @param {PostgrestError} pgError - The PostgreSQL error object from Supabase
 * @returns {never} A SvelteKit error object with appropriate status code and message
 */
export const constructError = (message: string, pgError: PostgrestError): never => {
	const isProd = import.meta.env.PROD;

	message = `${message}${isProd ? `:${pgError}` : ''}`;

	const status = getStatusCodeByPGError(pgError.code);

	return error(status, message);
};
