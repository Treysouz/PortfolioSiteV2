import { describe, expect, vi, beforeEach, test } from 'vitest';
import { getErrorData } from './api.utils.js';
import type { PostgrestError } from '@supabase/supabase-js';

describe('api.utils', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getErrorData()', () => {
		const createMockPgError = (
			code: string,
			message: string = 'Database error'
		): PostgrestError => ({
			code,
			message,
			details: '',
			hint: '',
			name: ''
		});

		const testCases = [
			{
				pgErrorCode: '23505',
				expectedCode: 409
			},
			{
				pgErrorCode: '23505',
				expectedCode: 409
			},
			{
				pgErrorCode: '23505',
				expectedCode: 409
			},
			{
				pgErrorCode: '23503',
				expectedCode: 400
			},
			{
				pgErrorCode: '42P01',
				expectedCode: 500
			},
			{
				pgErrorCode: '42703',
				expectedCode: 500
			},
			{
				pgErrorCode: 'INVALID',
				expectedCode: 500
			}
		];

		test.each(testCases)(
			'should construct error with $expectedCode for Postgres error status code $pgErrorCode',
			({ pgErrorCode, expectedCode }) => {
				const pgError = createMockPgError(pgErrorCode, 'Test Postgres Message');

				const response = getErrorData('Test Error Message', pgError);

				expect(response.status).toStrictEqual(expectedCode);
			}
		);
	});
});
