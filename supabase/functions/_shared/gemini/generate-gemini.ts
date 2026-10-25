import { AI_PROVIDER_NAMES, aiEmptyMessage } from '../constants/ai.constants.ts'
import { GEMINI_ROLES } from '../constants/gemini.constants.ts'
import { AiUnavailableError } from '../ai/ai-unavailable-error.ts'
import { requestJson } from '../ai/request-json.ts'
import type { AiRequest } from '../types/ai.types.ts'
import type { GeminiResponse } from '../types/gemini.types.ts'

export async function generateGemini({
    apiKey,
    model,
    timeoutMs,
    system,
    messages,
    schema,
}: AiRequest): Promise<string> {
    const data = await requestJson<GeminiResponse>('gemini', apiKey, `models/${model}:generateContent`, {
        timeoutMs,
        body: {
            ...(system && { systemInstruction: { parts: [{ text: system }] } }),
            contents: messages.map(({ role, text }) => ({ role: GEMINI_ROLES[role], parts: [{ text }] })),
            generationConfig: { responseMimeType: 'application/json', responseSchema: schema },
        },
    })
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('')
    if (!text) throw new AiUnavailableError(502, aiEmptyMessage(AI_PROVIDER_NAMES.gemini))
    return text
}
