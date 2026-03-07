import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  (typeof process !== 'undefined' ? process.env.SUPABASE_URL : undefined) || 
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '');

const supabaseAnonKey = 
  (typeof process !== 'undefined' ? process.env.SUPABASE_ANON_KEY : undefined) || 
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_ANON_KEY : '');

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
