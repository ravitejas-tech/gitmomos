import { GEMINI_API_URL, GEMINI_KEY_INVALID_MESSAGE, VERIFY_KEY_TIMEOUT_MS } from '../constants/gemini.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { geminiError } from './gemini-error.ts'
import { GeminiKeyError } from './gemini-key-error.ts'

export async function verifyGeminiKey(apiKey: string) {
    const res = await fetch(`${GEMINI_API_URL}/models?pageSize=1`, {
        headers: { 'x-goog-api-key': apiKey },
        signal: AbortSignal.timeout(VERIFY_KEY_TIMEOUT_MS),
    })
    if (res.ok) return

    const error = await geminiError(res)
    throw error instanceof GeminiKeyError ? new HttpError(400, GEMINI_KEY_INVALID_MESSAGE) : error
}
