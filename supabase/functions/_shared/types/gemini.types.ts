import type { ReportContent } from './report.types.ts'

export interface GeminiResponse {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
}

export type GeminiReport = Partial<Omit<ReportContent, 'repositories'>> & {
    repositories?: { name: string; summary: string }[]
}
