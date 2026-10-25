import { LIST_MODELS_TIMEOUT_MS } from '../constants/ai.constants.ts'
import { OPENAI_COMPATIBLE } from '../constants/openai.constants.ts'
import { requestJson } from '../ai/request-json.ts'
import type { AiModel } from '../types/ai.types.ts'
import type { OpenAiCompatible, OpenAiModels } from '../types/openai.types.ts'

export async function listOpenAiModels(provider: OpenAiCompatible, apiKey: string): Promise<AiModel[]> {
    const { included, excluded } = OPENAI_COMPATIBLE[provider]
    const { data = [] } = await requestJson<OpenAiModels>(provider, apiKey, 'models', {
        timeoutMs: LIST_MODELS_TIMEOUT_MS,
    })
    return data
        .filter(({ id, active }) => active !== false && included.test(id) && !excluded.test(id))
        .toSorted((a, b) => (b.created ?? 0) - (a.created ?? 0) || a.id.localeCompare(b.id))
        .map(({ id }) => ({ id, name: id }))
}
