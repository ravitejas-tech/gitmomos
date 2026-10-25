import { modelCatalog } from '../ai/model-catalog.ts'
import type { AiModelCatalog } from '../types/ai.types.ts'
import type { ConnectionsRequestOf } from '../types/connections.types.ts'

export function listAiModels(
    userId: string,
    { provider, apiKey }: ConnectionsRequestOf<'ai_models'>,
): Promise<AiModelCatalog> {
    return modelCatalog(userId, provider, apiKey)
}
