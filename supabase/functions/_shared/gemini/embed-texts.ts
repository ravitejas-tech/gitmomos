import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL, EMBEDDING_TIMEOUT_MS } from '../constants/gemini.constants.ts'
import { firstAvailable } from '../ai/first-available.ts'
import { requestJson } from '../ai/request-json.ts'
import { HttpError } from '../http/http-error.ts'
import type { GeminiEmbeddings } from '../types/gemini.types.ts'

export async function embedTexts(apiKey: string, texts: string[]): Promise<number[][]> {
    const { embeddings } = await firstAvailable('gemini', [EMBEDDING_MODEL], (model) =>
        requestJson<GeminiEmbeddings>('gemini', apiKey, `${model}:batchEmbedContents`, {
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
