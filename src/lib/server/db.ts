import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import type { Database } from '$lib/types/supabase';
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
