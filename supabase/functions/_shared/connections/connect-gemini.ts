import { verifyGeminiKey } from '../gemini/verify-gemini-key.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { ConnectionsRequestOf } from '../types/connections.types.ts'

export async function connectGemini(userId: string, { apiKey }: ConnectionsRequestOf<'gemini_connect'>) {
    await verifyGeminiKey(apiKey)
    unwrap(await adminClient().rpc('save_gemini_key', { p_user_id: userId, p_key: apiKey }))
    return { saved: true }
}
