import type { ZodType } from 'npm:zod@4'
import { AI_FALLBACK_MODELS, AI_PROVIDER_NAMES, AI_TIMEOUT_MS, aiMalformedMessage } from '../constants/ai.constants.ts'
import type { AiKey, AiPrompt, AiTask } from '../types/ai.types.ts'
import { AI_CLIENTS } from './ai-clients.ts'
import { AiUnavailableError } from './ai-unavailable-error.ts'
import { firstAvailable } from './first-available.ts'
import { modelChain } from './model-chain.ts'

export function generateJson<T>(
    { provider, apiKey, models }: AiKey,
    task: AiTask,
    prompt: AiPrompt,
    output: ZodType<T>,
): Promise<T> {
    return firstAvailable(provider, modelChain(models[task], AI_FALLBACK_MODELS[provider][task]), async (model) => {
        const text = await AI_CLIENTS[provider].generate({
            ...prompt,
            apiKey,
            model,
            timeoutMs: AI_TIMEOUT_MS[provider][task],
        })
        try {
            return output.parse(JSON.parse(text))
        } catch {
            throw new AiUnavailableError(502, aiMalformedMessage(AI_PROVIDER_NAMES[provider]))
        }
    })
}
