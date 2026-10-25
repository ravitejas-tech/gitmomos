import { LIST_MODELS_TIMEOUT_MS } from '../constants/ai.constants.ts'
import { CLAUDE_MODELS_PAGE_SIZE } from '../constants/claude.constants.ts'
import { requestJson } from '../ai/request-json.ts'
import type { AiModel } from '../types/ai.types.ts'
import type { ClaudeModels } from '../types/claude.types.ts'

export async function listClaudeModels(apiKey: string): Promise<AiModel[]> {
    const { data = [] } = await requestJson<ClaudeModels>('claude', apiKey, `models?limit=${CLAUDE_MODELS_PAGE_SIZE}`, {
        timeoutMs: LIST_MODELS_TIMEOUT_MS,
    })
    return data
        .filter(({ capabilities }) => capabilities?.structured_outputs?.supported !== false)
        .map(({ id, display_name }) => ({ id, name: display_name || id }))
}
