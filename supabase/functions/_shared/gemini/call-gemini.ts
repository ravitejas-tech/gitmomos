import { GEMINI_API_URL } from '../constants/gemini.constants.ts'
import { errorMessage } from '../lib/error-message.ts'
import type { GeminiCall } from '../types/gemini.types.ts'
import { geminiError } from './gemini-error.ts'
import { GeminiUnavailableError } from './gemini-unavailable-error.ts'

export async function callGemini<T>({ apiKey, path, body, timeoutMs }: GeminiCall): Promise<T> {
    const res = await fetch(`${GEMINI_API_URL}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
    }).catch((err) => {
        throw new GeminiUnavailableError(504, `Gemini did not answer: ${errorMessage(err)}`)
    })
    if (!res.ok) throw await geminiError(res)
    return res.json()
}
