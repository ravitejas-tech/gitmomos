import { LIST_MODELS_TIMEOUT_MS } from '../constants/ai.constants.ts'
import {
    GEMINI_EXCLUDED_MODELS,
    GEMINI_GENERATE_METHOD,
    GEMINI_MODEL_PREFIX,
    GEMINI_MODELS_PAGE_SIZE,
    GEMINI_TEXT_MODELS,
} from '../constants/gemini.constants.ts'
import { requestJson } from '../ai/request-json.ts'
import type { AiModel } from '../types/ai.types.ts'
import type { GeminiModels } from '../types/gemini.types.ts'

export async function listGeminiModels(apiKey: string): Promise<AiModel[]> {
    const { models = [] } = await requestJson<GeminiModels>(
        'gemini',
        apiKey,
        `models?pageSize=${GEMINI_MODELS_PAGE_SIZE}`,
        { timeoutMs: LIST_MODELS_TIMEOUT_MS },
    )
    return models
        .filter(
            ({ name, supportedGenerationMethods = [] }) =>
                supportedGenerationMethods.includes(GEMINI_GENERATE_METHOD) &&
                GEMINI_TEXT_MODELS.test(name) &&
                !GEMINI_EXCLUDED_MODELS.test(name),
        )
        .map(({ name, displayName }) => {
            const id = name.replace(GEMINI_MODEL_PREFIX, '')
            return { id, name: displayName || id }
        })
}
