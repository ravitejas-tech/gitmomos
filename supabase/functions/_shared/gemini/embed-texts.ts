import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL, EMBEDDING_TIMEOUT_MS } from '../constants/gemini.constants.ts'
import { HttpError } from '../http/http-error.ts'
import type { GeminiEmbeddings } from '../types/gemini.types.ts'
import { callGemini } from './call-gemini.ts'
import { firstAvailable } from './first-available.ts'

export async function embedTexts(apiKey: string, texts: string[]): Promise<number[][]> {
    const { embeddings } = await firstAvailable([EMBEDDING_MODEL], (model) =>
        callGemini<GeminiEmbeddings>({
            apiKey,
            path: `${model}:batchEmbedContents`,
            timeoutMs: EMBEDDING_TIMEOUT_MS,
            body: {
                requests: texts.map((text) => ({
                    model,
                    content: { parts: [{ text }] },
                    outputDimensionality: EMBEDDING_DIMENSIONS,
                })),
            },
        }),
    )
    if (embeddings?.length !== texts.length) throw new HttpError(502, 'Gemini returned no embeddings')
    return embeddings.map(({ values }) => values)
}
