import { authService } from '~/services/auth.service'
import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import type { GeminiKeyData } from '~/schemas/gemini-key.schema'

export const geminiKeyService = {
    async getGeminiKey() {
        const { data, error } = await supabase.from('gemini_keys').select('hint, updated_at').maybeSingle()
        if (error) throw error
        return data
    },

    async saveGeminiKey({ apiKey }: GeminiKeyData) {
        await invokeFunction('connections', { action: 'gemini_connect', apiKey })
    },

    async removeGeminiKey() {
        const userId = await authService.requireUserId()
        const { error } = await supabase.from('gemini_keys').delete().eq('user_id', userId)
        if (error) throw error
    },
}
