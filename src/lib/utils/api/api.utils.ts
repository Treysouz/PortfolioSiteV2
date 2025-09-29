import type { PostgrestError } from '@supabase/supabase-js';
import type { ApiError } from './api.types';

/**
 * Maps PostgreSQL error codes to appropriate HTTP status codes
 * @param {string} pgErrorCode - The PostgreSQL error code to map
 * @returns {number} The corresponding HTTP status code
 */
const getStatusCodeByPGError = (pgErrorCode: string): number => {
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
 * @returns {ApiError} Object representing data for an API error
 */
export const getErrorData = (message: string, pgError: PostgrestError): ApiError => {
	// Whether this is running in a Prod environment.
	const isProd = import.meta.env.PROD;

	// Update error message to provide more context based on Postgress error if environment is not Prod.
	message = `${message}${isProd ? `: ${pgError.message}` : ''}`;

	// Get HTTP status code based on Postgress error code.
	const status = getStatusCodeByPGError(pgError.code);

	return { status, message };
};
