import { getSupabaseClient } from '../packages/shared/src/supabase/client.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

async function test() {
    console.log('Testing Supabase connection...');
    const supabase = getSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Attempt to list projects (should be empty but shouldn't error)
    const { data: projects, error: fetchError } = await supabase
        .from('projects')
        .select('*');
        
    if (fetchError) {
        console.error('Fetch error:', fetchError);
        return;
    }
    
    console.log('Successfully connected! Projects count:', projects?.length);
    console.log('Schema verification complete.');
}

test();
