import { AI_PROVIDER_NAMES, aiEmptyMessage } from '../constants/ai.constants.ts'
import { CLAUDE_INCOMPLETE_STOPS, CLAUDE_MAX_TOKENS } from '../constants/claude.constants.ts'
import { AiUnavailableError } from '../ai/ai-unavailable-error.ts'
import { jsonSchema } from '../ai/json-schema.ts'
import { requestJson } from '../ai/request-json.ts'
import type { AiRequest } from '../types/ai.types.ts'
import type { ClaudeMessage } from '../types/claude.types.ts'

export async function generateClaude({
    apiKey,
    model,
    timeoutMs,
    system,
    messages,
    schema,
}: AiRequest): Promise<string> {
    const data = await requestJson<ClaudeMessage>('claude', apiKey, 'messages', {
        timeoutMs,
        body: {
            model,
            max_tokens: CLAUDE_MAX_TOKENS,
            ...(system && { system }),
            messages: messages.map(({ role, text }) => ({ role, content: text })),
            output_config: { format: { type: 'json_schema', schema: jsonSchema(schema) } },
        },
    })
    const text = data.content?.find((block) => block.type === 'text')?.text
    if (!text || CLAUDE_INCOMPLETE_STOPS.includes(data.stop_reason ?? '')) {
        throw new AiUnavailableError(502, aiEmptyMessage(AI_PROVIDER_NAMES.claude))
    }
    return text
}
