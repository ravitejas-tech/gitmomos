import { AI_MODEL_UNAVAILABLE_MESSAGE } from '../constants/ai.constants.ts'
import { modelCatalog } from '../ai/model-catalog.ts'
import { HttpError } from '../http/http-error.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { ConnectionsRequestOf } from '../types/connections.types.ts'

export async function connectAi(
    userId: string,
    { provider, apiKey, reportModel, chatModel }: ConnectionsRequestOf<'ai_connect'>,
) {
    const { models } = await modelCatalog(userId, provider, apiKey)
    if (![reportModel, chatModel].every((chosen) => models.some(({ id }) => id === chosen))) {
        throw new HttpError(400, AI_MODEL_UNAVAILABLE_MESSAGE)
    }

    if (apiKey) {
        unwrap(
            await adminClient().rpc('save_ai_key', {
                p_user_id: userId,
                p_provider: provider,
                p_key: apiKey,
                p_report_model: reportModel,
                p_chat_model: chatModel,
            }),
        )
    } else {
        unwrap(
            await adminClient()
                .from('ai_keys')
                .update({ report_model: reportModel, chat_model: chatModel })
                .eq('user_id', userId)
                .eq('provider', provider),
        )
    }
    return { saved: true }
}
