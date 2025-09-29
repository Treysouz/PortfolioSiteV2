/**
 * Auto-generated TypeScript types for Supabase database schema.
 *
 * To regenerate these types, run:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/lib/utils/supabase/supabase.types.ts
 *
 * @fileoverview Database type definitions for type-safe Supabase operations
 */

/** JSON-compatible value type for Supabase operations */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

/** Complete database schema type definition */
export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '13.0.5';
	};
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					extensions?: Json;
					operationName?: string;
					query?: string;
					variables?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	/** Main public schema containing application tables */
	public: {
		Tables: {
			/** Technology/tools table for portfolio skills */
			Tech: {
				Row: {
					img_url: string;
					name: string;
					proficiency: number;
					type: Database['public']['Enums']['Tech Type'] | null;
				};
				Insert: {
					img_url: string;
					name: string;
					proficiency?: number;
					type?: Database['public']['Enums']['Tech Type'] | null;
				};
				Update: {
					img_url?: string;
					name?: string;
					proficiency?: number;
					type?: Database['public']['Enums']['Tech Type'] | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			/** Categories for different types of technologies */
			'Tech Type':
				| 'Hosting & Infrastructure'
				| 'Programming Languages'
				| 'Frameworks & Libraries'
				| 'Build & DevOps'
				| 'Project Management'
				| 'Testing & QA'
				| 'Design'
				| 'Dev Env';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

/**
 * Helper type to extract table row types from the database schema.
 *
 * @example
 * ```typescript
 * type TechRow = Tables<'Tech'>; // Gets the Tech table row type
 * ```
 */
export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

/**
 * Helper type to extract table insert types from the database schema.
 * Use this for creating new records with .insert() operations.
 *
 * @example
 * ```typescript
 * type NewTech = TablesInsert<'Tech'>; // Gets the Tech table insert type
 * ```
 */
export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

/**
 * Helper type to extract table update types from the database schema.
 * Use this for updating existing records with .update() operations.
 *
 * @example
 * ```typescript
 * type TechUpdate = TablesUpdate<'Tech'>; // Gets the Tech table update type
 * ```
 */
export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

/**
 * Helper type to extract enum types from the database schema.
 *
 * @example
 * ```typescript
 * type TechTypeEnum = Enums<'Tech Type'>; // Gets the Tech Type enum values
 * ```
 */
export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema['Enums']
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

/**
 * Helper type to extract composite types from the database schema.
 * Composite types are custom PostgreSQL types composed of multiple fields.
 */
export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

/**
 * Runtime constants for database enums.
 * Useful for validation, dropdown options, or runtime enum checks.
 *
 * @example
 * ```typescript
 * const techTypes = Constants.public.Enums['Tech Type']; // ['Platform', 'Language', ...]
 * ```
 */
export const Constants = {
	graphql_public: {
		Enums: {}
	},
	public: {
		Enums: {
			'Tech Type': [
				'Hosting & Infrastructure',
				'Programming Languages',
				'Frameworks & Libraries',
				'Build & DevOps',
				'Project Management',
				'Testing & QA',
				'Design',
				'Dev Env'
			]
		}
	}
} as const;
