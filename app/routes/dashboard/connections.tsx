import { AccountsCard } from '~/components/connections/accounts/card'
import { AccountsEmptyState } from '~/components/connections/accounts/empty-state'
import { RepositoriesCard } from '~/components/connections/repositories/card'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { useConnections, useRepositories } from '~/hooks/connections/queries'

export default function Repositories() {
    const { data: connections, isLoading, isError, refetch } = useConnections()
    const { data: repositories } = useRepositories()

    return (
        <DashboardPage title='Repositories'>
            {isLoading && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {connections?.length === 0 && <AccountsEmptyState />}
            {!!connections?.length && (
                <div className='grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]'>
                    <RepositoriesCard repositories={repositories} />
                    <AccountsCard connections={connections} />
                </div>
            )}
        </DashboardPage>
    )
}
