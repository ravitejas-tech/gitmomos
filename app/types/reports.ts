import type { reportsService } from '~/services/reports.service'

export type Report = Awaited<ReturnType<typeof reportsService.getReports>>[number]

export interface SyncResult {
    date: string
    commitCount: number
    report: 'generated' | 'failed' | 'skipped' | 'kept_edited'
    errors: string[]
    reportError?: string
}
