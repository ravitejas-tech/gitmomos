import { generateClaude } from '../claude/generate-claude.ts'
import { listClaudeModels } from '../claude/list-claude-models.ts'
import { generateGemini } from '../gemini/generate-gemini.ts'
import { listGeminiModels } from '../gemini/list-gemini-models.ts'
import { generateChatCompletion } from '../openai/generate-chat-completion.ts'
import { listOpenAiModels } from '../openai/list-openai-models.ts'
import type { AiClient, AiProvider } from '../types/ai.types.ts'

export const AI_CLIENTS: Record<AiProvider, AiClient> = {
    gemini: { listModels: listGeminiModels, generate: generateGemini },
    groq: {
        listModels: (apiKey) => listOpenAiModels('groq', apiKey),
        generate: (request) => generateChatCompletion('groq', request),
    },
    claude: { listModels: listClaudeModels, generate: generateClaude },
    openai: {
        listModels: (apiKey) => listOpenAiModels('openai', apiKey),
        generate: (request) => generateChatCompletion('openai', request),
    },
}
