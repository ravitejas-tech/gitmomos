import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useActivity } from '~/hooks/activity/queries'
import { useDayCommits, useRecentCommits } from '~/hooks/commits/queries'
import { useConnections, useRepositories } from '~/hooks/connections/queries'
import { useReportDays, useReports } from '~/hooks/reports/queries'
import { SYNC_MESSAGES } from '~/data/reports/sync-messages'
import { pluralize } from '~/lib/format'
import { notify } from '~/lib/notify'
import { queryClient } from '~/services/query-client'
import { reportsService } from '~/services/reports.service'

export const useUpdateReport = createMutation({
    mutationFn: reportsService.updateReport,
    onSuccess: () => {
        toast.success('Report saved')
        queryClient.invalidateQueries({ queryKey: useReportDays.getKey() })
        queryClient.invalidateQueries({ queryKey: useReports.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

export const useSync = createMutation({
    mutationFn: (date: string | undefined) => reportsService.sync(date),
    onSuccess: ({ report, errors }) => {
        const { message, tone } = SYNC_MESSAGES[report]
        const unreadable = errors.length
            ? ` ${pluralize(errors.length, 'repository', 'repositories')} could not be read.`
            : ''
        notify(errors.length ? 'error' : tone, message + unreadable)
        for (const key of [
            useReports.getKey(),
            useReportDays.getKey(),
            useActivity.getKey(),
            useDayCommits.getKey(),
            useRecentCommits.getKey(),
            useConnections.getKey(),
            useRepositories.getKey(),
        ]) {
            queryClient.invalidateQueries({ queryKey: key })
        }
    },
    onError: (error) => toast.error(error.message),
})
