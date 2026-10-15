import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2'
import type { Database } from '../database.types.ts'
import { requireEnv } from '../lib/env.ts'

export function adminClient(): SupabaseClient<Database> {
    return createClient<Database>(requireEnv('SUPABASE_URL'), requireEnv('SUPABASE_SERVICE_ROLE_KEY'), {
        auth: { persistSession: false, autoRefreshToken: false },
    })
}
