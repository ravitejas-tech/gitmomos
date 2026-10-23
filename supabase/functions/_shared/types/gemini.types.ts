import type { ReportContent } from './report.types.ts'

export interface GeminiResponse {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
}

export interface GeminiEmbeddings {
    embeddings?: { values: number[] }[]
}

export interface GeminiContent {
    role: 'user' | 'model'
    parts: { text: string }[]
}

export interface GeminiCall {
    apiKey: string
    path: string
    body: unknown
    timeoutMs: number
}

export interface GenerateJsonRequest {
    apiKey: string
    models: string[]
    timeoutMs: number
    system?: string
    contents: GeminiContent[]
    schema: object
}

export type GeminiReport = Partial<Omit<ReportContent, 'repositories'>> & {
    repositories?: { name: string; summary: string }[]
}
