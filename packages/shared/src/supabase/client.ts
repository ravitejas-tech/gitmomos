import { createClient } from '@supabase/supabase-js';

export const getSupabaseClient = (supabaseUrl: string, supabaseKey: string) => {
  return createClient(supabaseUrl, supabaseKey);
};
