import type { PostgrestError } from '@supabase/supabase-js';
import type { ApiError, QueryOptions } from './api.types';

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

/**
 * Makes a POST request to the specified URL with the given payload
 * Supports optional TanStack Query caching that persists during navigation but clears on page refresh
 * @param {string} url - The endpoint URL to POST to
 * @param {unknown} payload - The data to send in the request body
 * @param {PostOptions} options - Optional configuration including QueryClient and cache key
 * @returns {Promise<T>} The JSON response from the server
 */
export const post = async <T = unknown>(
	url: string,
	payload: unknown,
	queryOptions?: QueryOptions
): Promise<T> => {
	const { queryClient, cacheKey } = queryOptions || {};

	// Check cache if QueryClient and cacheKey provided
	if (queryClient && cacheKey) {
		const cachedData = queryClient.getQueryData<T>(cacheKey);
		if (cachedData) {
			return cachedData;
		}
	}

	// Make the request
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// Throw error if fetching fails
	if (!response.ok) {
		throw new Error(`HTTP error with status: ${response.status}`);
	}

	const data = await response.json();

	// Store in cache if QueryClient and cacheKey provided
	if (queryClient && cacheKey) {
		queryClient.setQueryData(cacheKey, data);
	}

	return data;
};
