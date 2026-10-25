import {
    AI_PROVIDER_NAMES,
    REJECTED_KEY_REASON,
    REJECTED_KEY_STATUSES,
    RETIRED_MODEL_REASON,
    RETRYABLE_STATUSES,
} from '../constants/ai.constants.ts'
import { HttpError } from '../http/http-error.ts'
import type { AiProvider } from '../types/ai.types.ts'
import { AiKeyError } from './ai-key-error.ts'
import { AiUnavailableError } from './ai-unavailable-error.ts'

export async function providerError(provider: AiProvider, res: Response): Promise<Error> {
    const body = await res.text()
    const message = `${AI_PROVIDER_NAMES[provider]} ${res.status}: ${body.slice(0, 300)}`

    if (REJECTED_KEY_STATUSES.includes(res.status) || body.includes(REJECTED_KEY_REASON)) {
        return new AiKeyError(provider)
    }
    if (RETRYABLE_STATUSES.includes(res.status) || body.includes(RETIRED_MODEL_REASON)) {
        return new AiUnavailableError(res.status, message)
    }
    return new HttpError(502, message)
}
