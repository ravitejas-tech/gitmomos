import type { LucideIcon } from 'lucide-react'
import type { COMING_SOON } from '~/data/coming-soon/features'

export interface ComingSoonPoint {
    icon: LucideIcon
    title: string
    description: string
}

export interface ComingSoonFeature {
    slug: string
    label: string
    title: string
    description: string
    icon: LucideIcon
    points: readonly ComingSoonPoint[]
}

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
