export interface ReportCommit {
    repository: string
    message: string
    committedAt: string
}

export type ReportHighlight = {
    title: string
    detail: string
}

export type ReportContent = {
    headline: string
    summary: string
    highlights: ReportHighlight[]
    key_work_areas: string[]
    suggestions: string[]
    repositories: { name: string; commit_count: number; summary: string }[]
}
