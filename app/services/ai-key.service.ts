import { authService } from '~/services/auth.service'
import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import type { AiModelsData } from '~/schemas/ai-key.schema'
import type { AiCredentials, AiModelCatalog } from '~/types/ai-key'

export const aiKeyService = {
    async getAiKey() {
        const { data, error } = await supabase
            .from('ai_keys')
            .select('provider, report_model, chat_model, hint, updated_at')
            .maybeSingle()
        if (error) throw error
        return data
    },

    loadModels({ provider, apiKey }: AiCredentials) {
        return invokeFunction<AiModelCatalog>('connections', { action: 'ai_models', provider, apiKey })
    },

    async saveAiKey({ provider, apiKey, reportModel, chatModel }: AiCredentials & AiModelsData) {
        await invokeFunction('connections', { action: 'ai_connect', provider, apiKey, reportModel, chatModel })
    },

    async removeAiKey() {
        const userId = await authService.requireUserId()
        const { error } = await supabase.from('ai_keys').delete().eq('user_id', userId)
        if (error) throw error
    },
}
