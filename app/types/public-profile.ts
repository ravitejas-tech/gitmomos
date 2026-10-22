import type { z } from 'zod'
import type { ReportContent } from '~/schemas/report.schema'
import type { publicProfileSchema } from '~/schemas/public-profile.schema'

export type PublicProfile = z.infer<typeof publicProfileSchema>
export type ProfileStats = PublicProfile['stats']
export type RecentWork = PublicProfile['recent'][number]

export type PublicReport = Pick<ReportContent, 'headline' | 'summary' | 'highlights' | 'key_work_areas'> & {
    date: string
}

export interface ProfileAnswer {
    answer: string
    sources: PublicReport[]
}

export interface ChatTurn {
    role: 'visitor' | 'assistant'
    text: string
}

export type ProfileQuestion = {
    handle: string
    question: string
    history: ChatTurn[]
}

export type ChatMessage = ChatTurn & {
    id: string
    sources?: PublicReport[]
}
