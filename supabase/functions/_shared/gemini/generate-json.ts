import type { GeminiResponse, GenerateJsonRequest } from '../types/gemini.types.ts'
import { callGemini } from './call-gemini.ts'
import { firstAvailable } from './first-available.ts'
import { GeminiUnavailableError } from './gemini-unavailable-error.ts'

export async function generateJson<T>({
    apiKey,
    models,
    timeoutMs,
    system,
    contents,
    schema,
}: GenerateJsonRequest): Promise<T> {
    const text = await firstAvailable(models, async (model) =>
        responseText(
            await callGemini<GeminiResponse>({
                apiKey,
                path: `models/${model}:generateContent`,
                timeoutMs,
                body: {
                    ...(system && { systemInstruction: { parts: [{ text: system }] } }),
                    contents,
                    generationConfig: { responseMimeType: 'application/json', responseSchema: schema },
                },
            }),
        ),
    )
    return JSON.parse(text)
}

function responseText(data: GeminiResponse): string {
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('')
    if (!text) throw new GeminiUnavailableError(502, 'Gemini returned an empty response')
    return text
}
