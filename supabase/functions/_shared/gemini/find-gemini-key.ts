import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'

export async function findGeminiKey(userId: string): Promise<string | null> {
    return unwrap(await adminClient().rpc('get_gemini_key', { p_user_id: userId }))
}
