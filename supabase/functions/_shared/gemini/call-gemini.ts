import { GEMINI_API_URL, GEMINI_BUSY_MESSAGE } from '../constants/gemini.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { requireEnv } from '../lib/env.ts'

export async function callGemini<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${GEMINI_API_URL}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': requireEnv('GEMINI_API_KEY') },
        body: JSON.stringify(body),
    })
    if (res.status === 429) throw new HttpError(503, GEMINI_BUSY_MESSAGE)
    if (!res.ok) throw new HttpError(502, `Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`)
    return res.json()
}
