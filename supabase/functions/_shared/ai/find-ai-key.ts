import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { AiKey } from '../types/ai.types.ts'

export async function findAiKey(userId: string): Promise<AiKey | null> {
    const key = unwrap(await adminClient().rpc('get_ai_key', { p_user_id: userId }).maybeSingle())
    if (!key) return null
    return { provider: key.provider, apiKey: key.api_key, models: { report: key.report_model, chat: key.chat_model } }
}
