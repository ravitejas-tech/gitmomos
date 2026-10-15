import { useState } from 'react'
import { GitBranch } from 'lucide-react'
import { ConnectActions } from '~/components/connections/connect-actions'
import { ConnectionGroup } from '~/components/connections/connection-group'
import { RepositoryFilter } from '~/components/connections/repository-filter'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { LoadingState } from '~/components/ui/loading-state'
import { useConnections, useRepositories } from '~/hooks/connections/queries'
import { groupRepositories } from '~/lib/connections/group'

export default function Repositories() {
    const [search, setSearch] = useState('')
    const { data: connections, isLoading, isError, refetch } = useConnections()
    const { data: repositories } = useRepositories()
    const groups = groupRepositories(connections ?? [], repositories ?? [], search)
    const tracked = repositories?.filter((repository) => repository.enabled).length ?? 0

    return (
        <DashboardPage
            title='Repositories'
            description={repositories ? `${tracked} tracked for your reports` : undefined}
            actions={<ConnectActions />}>
            {isLoading && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {connections?.length === 0 && (
                <EmptyState
                    icon={GitBranch}
                    title='No connections yet'
                    description='Connect GitHub or Gitea to choose the repositories your reports cover.'
                />
            )}
            {groups.length > 0 && (
                <div className='space-y-5'>
                    <RepositoryFilter
                        value={search}
                        onChange={setSearch}
                    />
                    <div className='grid items-start gap-5 2xl:grid-cols-2'>
                        {groups.map((group) => (
                            <ConnectionGroup
                                key={group.connection.id}
                                {...group}
                            />
                        ))}
                    </div>
                </div>
            )}
        </DashboardPage>
    )
}
