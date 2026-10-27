import type { COMING_SOON } from '~/data/coming-soon/features'

export type ComingSoonSlug = (typeof COMING_SOON)[number]['slug']

export interface AskSource {
    sha: string
    repository: string
}

export interface AskMessage {
    role: 'user' | 'assistant'
    text: string
    points?: readonly string[]
    sources?: readonly AskSource[]
}
