import type { Report } from '~/types/reports'

export function writtenReports(reports: Report[] | undefined): Report[] | undefined {
    return reports?.filter((report) => report.status === 'generated')
}
