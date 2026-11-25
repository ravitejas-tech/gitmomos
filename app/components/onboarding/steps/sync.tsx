import { LatestReportCard } from '~/components/overview/latest-report-card'
import { SyncButton } from '~/components/reports/sync-button'
import { ErrorState } from '~/components/ui/error-state'
import { useRepositories } from '~/hooks/connections/queries'
import { useReports } from '~/hooks/reports/queries'
import { hasSynced } from '~/lib/connections/synced'
import { writtenReports } from '~/lib/reports/written'

export function SyncStep() {
    const { data: repositories } = useRepositories()
    const { data: reports, isLoading, isError, refetch } = useReports({ variables: undefined })

    if (isError) return <ErrorState onRetry={() => refetch()} />

    return (
        <LatestReportCard
            report={writtenReports(reports)?.[0]}
            isLoading={isLoading}
            actions={
                <SyncButton
                    size='sm'
                    variant={hasSynced(repositories) ? 'secondary' : 'primary'}
                />
            }
        />
    )
}
