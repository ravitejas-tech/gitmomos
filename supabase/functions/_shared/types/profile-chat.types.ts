import type { ReportContent } from './report.types.ts'

export interface ProfileOwner {
    id: string
    name: string
    timezone: string
}

export interface ProfileReport {
    date: string
    content: ReportContent
}

export type PublicReport = Pick<ReportContent, 'headline' | 'summary' | 'highlights' | 'key_work_areas'> & {
    date: string
}

export interface ProfileAnswer {
    answer: string
    sources: PublicReport[]
}
