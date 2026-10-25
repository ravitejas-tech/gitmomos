import { AI_PROVIDER_NAMES, aiEmptyMessage } from '../constants/ai.constants.ts'
import { JSON_SCHEMA_NAME, jsonSchemaInstruction, OPENAI_COMPATIBLE } from '../constants/openai.constants.ts'
import { AiUnavailableError } from '../ai/ai-unavailable-error.ts'
import { jsonSchema } from '../ai/json-schema.ts'
import { requestJson } from '../ai/request-json.ts'
import type { AiRequest } from '../types/ai.types.ts'
import type { ChatCompletion, OpenAiCompatible } from '../types/openai.types.ts'

export async function generateChatCompletion(
    provider: OpenAiCompatible,
    { apiKey, model, timeoutMs, system, messages, schema }: AiRequest,
): Promise<string> {
    const { structuredOutputs } = OPENAI_COMPATIBLE[provider]
    const responseSchema = jsonSchema(schema)
    const instructions = [system, !structuredOutputs && jsonSchemaInstruction(responseSchema)].filter(Boolean)

    const data = await requestJson<ChatCompletion>(provider, apiKey, 'chat/completions', {
        timeoutMs,
        body: {
            model,
            messages: [
                ...(instructions.length ? [{ role: 'system', content: instructions.join('\n\n') }] : []),
                ...messages.map(({ role, text }) => ({ role, content: text })),
            ],
            response_format: structuredOutputs
                ? { type: 'json_schema', json_schema: { name: JSON_SCHEMA_NAME, strict: true, schema: responseSchema } }
                : { type: 'json_object' },
        },
    })
    const text = data.choices?.[0]?.message?.content
    if (!text) throw new AiUnavailableError(502, aiEmptyMessage(AI_PROVIDER_NAMES[provider]))
    return text
}
