import { EMBEDDING_QUERY_PREFIX } from '../constants/gemini.constants.ts'
import type { ProfileReport } from '../types/profile-chat.types.ts'
import { reportText } from './report-text.ts'

export function reportEmbeddingText({ date, content }: ProfileReport): string {
    const projects = content.repositories.map(({ name }) => name).join(', ')
    return `title: ${content.headline || 'none'} | text: ${date}\n${reportText(content)}\nProjects: ${projects}`
}

export function questionEmbeddingText(question: string): string {
    return `${EMBEDDING_QUERY_PREFIX}${question}`
}
