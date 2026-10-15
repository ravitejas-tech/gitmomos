import { useSearchParams } from 'react-router'
import { FileText } from 'lucide-react'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { ReportDatePicker } from '~/components/reports/date-picker/report-date-picker'
import { ReportsSplit } from '~/components/reports/split/reports-split'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { useReports } from '~/hooks/reports/queries'
import { pluralize } from '~/lib/format'

export default function Reports() {
    const [params, setParams] = useSearchParams()
    const dateParam = params.get('date')
    const { data: reports, isLoading, isError, refetch } = useReports({ variables: undefined })
    const listed = dateParam ? reports?.find((report) => report.date === dateParam) : reports?.[0]
    const needsLookup = Boolean(dateParam && reports && !listed)
    const { data: lookup, isLoading: isLookingUp } = useReports({
        variables: dateParam ?? undefined,
        enabled: needsLookup,
    })
    const selected = listed ?? (needsLookup ? lookup?.[0] : undefined)
    const select = (date: string | null) => setParams(date ? { date } : {}, { replace: true })

    return (
        <DashboardPage
            title='Reports'
            description={reports ? pluralize(reports.length, 'daily report') : undefined}
            actions={
                <ReportDatePicker
                    selected={dateParam ?? selected?.date}
                    onSelect={select}
                />
            }>
            {isLoading && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {reports?.length === 0 && !dateParam && (
                <EmptyState
                    icon={FileText}
                    title='No reports yet'
                    description='Sync now to write today’s report.'
                />
            )}
            {reports && (reports.length > 0 || dateParam) && (
                <ReportsSplit
                    reports={reports}
                    selected={selected}
                    selectedDate={dateParam}
                    isLoadingSelection={needsLookup && isLookingUp}
                    onSelect={select}
                />
            )}
        </DashboardPage>
    )
}
