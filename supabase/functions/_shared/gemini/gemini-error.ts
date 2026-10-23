import { REJECTED_KEY_REASON, REJECTED_KEY_STATUSES, RETRYABLE_STATUSES } from '../constants/gemini.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { GeminiKeyError } from './gemini-key-error.ts'
import { GeminiUnavailableError } from './gemini-unavailable-error.ts'

export async function geminiError(res: Response): Promise<Error> {
    const body = await res.text()
    const message = `Gemini ${res.status}: ${body.slice(0, 300)}`

    if (REJECTED_KEY_STATUSES.includes(res.status) || body.includes(REJECTED_KEY_REASON)) return new GeminiKeyError()
    if (RETRYABLE_STATUSES.includes(res.status)) return new GeminiUnavailableError(res.status, message)
    return new HttpError(502, message)
}
