import { GEMINI_BUSY_MESSAGE, GEMINI_QUOTA_MESSAGE } from '../constants/gemini.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { GeminiUnavailableError } from './gemini-unavailable-error.ts'

export async function firstAvailable<T>(models: string[], call: (model: string) => Promise<T>): Promise<T> {
    const failures: GeminiUnavailableError[] = []
    for (const model of models) {
        try {
            return await call(model)
        } catch (err) {
            if (!(err instanceof GeminiUnavailableError)) throw err
            console.warn(`${model} unavailable: ${err.message}`)
            failures.push(err)
        }
    }
    const quotaOnly = failures.every(({ status }) => status === 429)
    throw new HttpError(503, quotaOnly ? GEMINI_QUOTA_MESSAGE : GEMINI_BUSY_MESSAGE)
}
