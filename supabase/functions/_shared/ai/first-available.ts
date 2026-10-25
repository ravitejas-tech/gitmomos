import { AI_PROVIDER_NAMES, aiBusyMessage, aiQuotaMessage, QUOTA_STATUSES } from '../constants/ai.constants.ts'
import { HttpError } from '../http/http-error.ts'
import type { AiProvider } from '../types/ai.types.ts'
import { AiUnavailableError } from './ai-unavailable-error.ts'

export async function firstAvailable<T>(
    provider: AiProvider,
    models: string[],
    call: (model: string) => Promise<T>,
): Promise<T> {
    const failures: AiUnavailableError[] = []
    for (const model of models) {
        try {
            return await call(model)
        } catch (err) {
            if (!(err instanceof AiUnavailableError)) throw err
            console.warn(`${model} unavailable: ${err.message}`)
            failures.push(err)
        }
    }
    const name = AI_PROVIDER_NAMES[provider]
    const quotaOnly = failures.every(({ status }) => QUOTA_STATUSES.includes(status))
    throw new HttpError(503, quotaOnly ? aiQuotaMessage(name) : aiBusyMessage(name))
}
