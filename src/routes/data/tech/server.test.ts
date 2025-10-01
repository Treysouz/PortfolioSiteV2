import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server.js';
import type { GetParams } from './tech.types.js';
import type { Database } from '$lib/utils/supabase/supabase.types.js';

// Mock data that would come from Supabase
const mockTechData: Database['public']['Tables']['Tech']['Row'][] = [
	{
		img_url: 'https://example.com/testone.png',
		name: 'Test',
		proficiency: 4,
		type: 'Build & DevOps'
	},
	{
		img_url: 'https://example.com/testtwo.png',
		name: 'Test Two',
		proficiency: 3,
		type: 'Dev Env'
	}
];

// Formated mock data that would come from GET request
const formattedMockTechData = [
	{
		imgUrl: 'https://example.com/testone.png',
		name: 'Test',
		proficiency: 4,
		type: 'Build & DevOps'
	},
	{
		imgUrl: 'https://example.com/testtwo.png',
		name: 'Test Two',
		proficiency: 3,
		type: 'Dev Env'
	}
];

// Mock Supabase Query
const mockSupabaseQuery = vi.fn();
// Mock Test Search Query
const mockTextSearch = vi.fn();
// Mock Or Query
const mockOrQuery = vi.fn();
// Mock Order Query
const mockOrderQuery = vi.fn();

// Mock Supabase Utils
vi.mock('$lib/utils/supabase', () => ({
	supabase: {
		from: vi.fn(() => ({
			select: vi.fn(() => mockSupabaseQuery())
		}))
	}
}));

beforeEach(() => {
	// Reset the mock before each test
	vi.clearAllMocks();
});

describe('GET /data/tech', () => {
	const createMockRequest = (params: GetParams = {}) => ({
		params
	});

	it('should return formatted tech data when no filters are applied', async () => {
		//Mock query resolved value
		mockSupabaseQuery.mockResolvedValue({ data: mockTechData, error: null });

		// Mock Request
		const mockRequest = createMockRequest({});
		// Response from mock request
		const response = await GET(mockRequest);
		// Data from response
		const result = await response.json();

		expect(result).toEqual(formattedMockTechData);
	});

	it('should apply text search when value is provided', async () => {
		//Mock query resolved value
		mockTextSearch.mockResolvedValue({ data: mockTechData, error: null });

		//Mock query return value
		mockSupabaseQuery.mockReturnValue({
			textSearch: mockTextSearch
		});

		// Mock Request
		const mockRequest = createMockRequest({ value: 'React' });
		// Response from mock request
		const response = await GET(mockRequest);
		// Data from response
		const result = await response.json();

		expect(result).toStrictEqual(formattedMockTechData);
		expect(mockTextSearch).toHaveBeenCalledWith('name', 'React');
	});

	it('should apply type filter when type is provided', async () => {
		//Mock query resolved value
		mockOrQuery.mockResolvedValue({ data: mockTechData, error: null });

		//Mock query return value
		mockSupabaseQuery.mockReturnValue({
			or: mockOrQuery
		});

		// Mock Request
		const mockRequest = createMockRequest({ types: ['Design'] });
		// Response from mock request
		const response = await GET(mockRequest);
		// Data from response
		const result = await response.json();

		expect(result).toStrictEqual(formattedMockTechData);
		expect(mockOrQuery).toHaveBeenCalledWith('type.eq.Design');
	});

	it('should apply order filter when sort confiog is provided', async () => {
		//Mock query resolved value
		mockOrderQuery.mockResolvedValue({ data: mockTechData, error: null });

		//Mock query return value
		mockSupabaseQuery.mockReturnValue({
			order: mockOrderQuery
		});

		// Mock Request
		const mockRequest = createMockRequest({
			sort: {
				column: 'name',
				ascending: true
			}
		});

		// Response from mock request
		const response = await GET(mockRequest);
		// Data from response
		const result = await response.json();

		expect(result).toStrictEqual(formattedMockTechData);
		expect(mockOrderQuery).toHaveBeenCalledWith('name', {
			ascending: true
		});
	});

	it('should set proficiency values above 5 to 0', async () => {
		const tooHighProficiencyMockEntity: Database['public']['Tables']['Tech']['Row'] = {
			...mockTechData[0],
			proficiency: 7
		};

		//Mock query resolved value
		mockSupabaseQuery.mockResolvedValue({ data: [tooHighProficiencyMockEntity], error: null });

		// Mock Request
		const mockRequest = createMockRequest({});
		// Response from mock request
		const response = await GET(mockRequest);
		// Data from response
		const result = await response.json();

		expect(result[0].proficiency).toEqual(0);
	});

	it('should set proficiency values below 0 to 0', async () => {
		const tooLowProficiencyMockEntity: Database['public']['Tables']['Tech']['Row'] = {
			...mockTechData[0],
			proficiency: -7
		};

		//Mock query resolved value
		mockSupabaseQuery.mockResolvedValue({ data: [tooLowProficiencyMockEntity], error: null });

		// Mock Request
		const mockRequest = createMockRequest({});
		// Response from mock request
		const response = await GET(mockRequest);
		// Data from response
		const result = await response.json();

		expect(result[0].proficiency).toEqual(0);
	});

	it('should handle Supabase errors', async () => {
		//Mock query resolved value with error
		mockSupabaseQuery.mockResolvedValue({ data: [], error: { status: '23505', message: 'test' } });

		// Mock Request
		const mockRequest = createMockRequest({});

		await expect(GET(mockRequest)).rejects.toThrow();
	});
});
