import type { z } from 'zod'
import type { REPORT_PERIODS } from '~/data/public-profile/constants'
import type { publicReportSchema, reportSearchSchema } from '~/schemas/public-profile.schema'
import type { publicProfileService } from '~/services/public-profile.service'
import type { DayRange } from '~/types/activity'

export type PublicProfile = NonNullable<Awaited<ReturnType<typeof publicProfileService.getPublicProfile>>>
export type ProfileStats = PublicProfile['stats']
export type ShippedWork = PublicProfile['shipped'][number]
export type FocusArea = PublicProfile['areas'][number]
export type RecentReport = PublicProfile['recent'][number]
export type ReportSearch = z.infer<typeof reportSearchSchema>
export type PublicReport = ReportSearch['reports'][number]
export type SharedReport = z.infer<typeof publicReportSchema>
export type ReportPeriod = (typeof REPORT_PERIODS)[number]['value']

export interface ReportFilter {
    query: string
    from?: string | undefined
    to?: string | undefined
}

export type ReportSearchQuery = ReportFilter & { handle: string }

export type ReportWeek = DayRange & { reports: PublicReport[] }

export interface SharedReportQuery {
    handle: string
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
