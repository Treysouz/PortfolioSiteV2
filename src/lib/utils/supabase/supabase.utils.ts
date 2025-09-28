import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import type { Database } from './supabase.types.js';

/** Supabase URL */
const supabaseUrl: string = SUPABASE_URL;

/** Supabase API key */
const supabaseKey: string = SUPABASE_KEY;

/** Supabase client instance */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
