import { createInfiniteQuery, createQuery } from 'react-query-kit'
import { publicProfileService } from '~/services/public-profile.service'
import type { ReportSearchQuery, SharedReportQuery } from '~/types/public-profile'

export const usePublicProfile = createQuery({
    queryKey: ['public-profile'],
    fetcher: (handle: string) => publicProfileService.getPublicProfile(handle),
})

export const useSharedReports = createInfiniteQuery({
    queryKey: ['shared-reports'],
    fetcher: (variables: ReportSearchQuery, { pageParam }) => publicProfileService.searchReports(variables, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
        const loaded = pages.reduce((count, page) => count + (page?.reports.length ?? 0), 0)
        return lastPage && loaded < lastPage.total ? loaded : undefined
    },
})

export const useReportDigest = createQuery({
    queryKey: ['report-digest'],
    fetcher: (variables: ReportSearchQuery) => publicProfileService.getDigest(variables),
})

export const useSharedReportDays = createQuery({
    queryKey: ['shared-report-days'],
    fetcher: (variables: ReportSearchQuery) => publicProfileService.getReportDays(variables),
})

export const useSharedReport = createQuery({
    queryKey: ['shared-report'],
    fetcher: (variables: SharedReportQuery) => publicProfileService.getReport(variables),
})
