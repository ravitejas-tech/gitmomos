import { HttpError } from '../http/http-error.ts'
import type { GeminiResponse, GenerateJsonRequest } from '../types/gemini.types.ts'
import { callGemini } from './call-gemini.ts'

export async function generateJson<T>({ model, system, contents, schema }: GenerateJsonRequest): Promise<T> {
    const data = await callGemini<GeminiResponse>(`models/${model}:generateContent`, {
        ...(system && { systemInstruction: { parts: [{ text: system }] } }),
        contents,
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema },
    })

    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('')
    if (!text) throw new HttpError(502, 'Gemini returned an empty response')
    return JSON.parse(text)
}
