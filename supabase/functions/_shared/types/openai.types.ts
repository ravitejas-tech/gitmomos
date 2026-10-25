import type { AiProvider } from './ai.types.ts'

export type OpenAiCompatible = Extract<AiProvider, 'groq' | 'openai'>

export interface OpenAiCompatibleConfig {
    structuredOutputs: boolean
    included: RegExp
    excluded: RegExp
}

export interface OpenAiModels {
    data?: { id: string; created?: number; active?: boolean }[]
}

export interface ChatCompletion {
    choices?: { message?: { content?: string | null } }[]
}
