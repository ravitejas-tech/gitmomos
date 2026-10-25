import type { Enums } from '../database.types.ts'

export type AiProvider = Enums<'ai_provider'>

export type AiTask = 'report' | 'chat'

export interface AiKey {
    provider: AiProvider
    apiKey: string
    models: Record<AiTask, string>
}

export interface AiModel {
    id: string
    name: string
}

export interface AiModelCatalog {
    models: AiModel[]
    recommended: Record<AiTask, string>
}

export interface AiMessage {
    role: 'user' | 'assistant'
    text: string
}

export type ResponseSchema =
    | { type: 'STRING' }
    | { type: 'ARRAY'; items: ResponseSchema }
    | { type: 'OBJECT'; properties: Record<string, ResponseSchema>; required: string[] }

export interface AiPrompt {
    system?: string
    messages: AiMessage[]
    schema: ResponseSchema
}

export interface AiRequest extends AiPrompt {
    apiKey: string
    model: string
    timeoutMs: number
}

export interface AiClient {
    listModels: (apiKey: string) => Promise<AiModel[]>
    generate: (request: AiRequest) => Promise<string>
}

export interface ProviderRequest {
    timeoutMs: number
    body?: unknown
}
