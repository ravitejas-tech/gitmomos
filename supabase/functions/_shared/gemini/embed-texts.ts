import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL } from '../constants/gemini.constants.ts'
import { HttpError } from '../http/http-error.ts'
import type { GeminiEmbeddings } from '../types/gemini.types.ts'
import { callGemini } from './call-gemini.ts'

export async function embedTexts(texts: string[]): Promise<number[][]> {
    const { embeddings } = await callGemini<GeminiEmbeddings>(`${EMBEDDING_MODEL}:batchEmbedContents`, {
        requests: texts.map((text) => ({
            model: EMBEDDING_MODEL,
            content: { parts: [{ text }] },
            outputDimensionality: EMBEDDING_DIMENSIONS,
        })),
    })
    if (embeddings?.length !== texts.length) throw new HttpError(502, 'Gemini returned no embeddings')
    return embeddings.map(({ values }) => values)
}
