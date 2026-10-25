import {
    AI_FALLBACK_MODELS,
    AI_KEY_REQUIRED_MESSAGE,
    AI_PREFERRED_MODELS,
    AI_PROVIDER_NAMES,
    aiBusyMessage,
    aiKeyInvalidMessage,
    aiNoModelsMessage,
} from '../constants/ai.constants.ts'
import { HttpError } from '../http/http-error.ts'
import type { AiModel, AiModelCatalog, AiProvider, AiTask } from '../types/ai.types.ts'
import { AI_CLIENTS } from './ai-clients.ts'
import { AiKeyError } from './ai-key-error.ts'
import { AiUnavailableError } from './ai-unavailable-error.ts'
import { findAiKey } from './find-ai-key.ts'

export async function modelCatalog(userId: string, provider: AiProvider, apiKey?: string): Promise<AiModelCatalog> {
    const models = await listModels(provider, apiKey ?? (await savedApiKey(userId, provider)), Boolean(apiKey))
    const [first] = models
    if (!first) throw new HttpError(400, aiNoModelsMessage(AI_PROVIDER_NAMES[provider]))

    const recommend = (task: AiTask) =>
        AI_FALLBACK_MODELS[provider][task].find((id) => models.some((model) => model.id === id)) ??
        models.find(({ id }) => AI_PREFERRED_MODELS[provider][task].test(id))?.id ??
        first.id
    return { models, recommended: { report: recommend('report'), chat: recommend('chat') } }
}

async function listModels(provider: AiProvider, apiKey: string, isNewKey: boolean): Promise<AiModel[]> {
    const name = AI_PROVIDER_NAMES[provider]
    try {
        return await AI_CLIENTS[provider].listModels(apiKey)
    } catch (err) {
        if (err instanceof AiUnavailableError) throw new HttpError(503, aiBusyMessage(name))
        if (err instanceof AiKeyError && isNewKey) throw new HttpError(400, aiKeyInvalidMessage(name))
        throw err
    }
}

async function savedApiKey(userId: string, provider: AiProvider): Promise<string> {
    const key = await findAiKey(userId)
    if (key?.provider !== provider) throw new HttpError(400, AI_KEY_REQUIRED_MESSAGE)
    return key.apiKey
}
