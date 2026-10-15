import { createQuery } from 'react-query-kit'
import { reportsService } from '~/services/reports.service'
import type { DayRange } from '~/types/activity'

export const useReports = createQuery({
    queryKey: ['reports'],
    fetcher: (date: string | undefined) => reportsService.getReports(date),
})

export const useReportDays = createQuery({
    queryKey: ['report-days'],
    fetcher: (range: DayRange) => reportsService.getReportDays(range),
})
