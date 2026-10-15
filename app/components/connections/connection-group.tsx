import { ConnectionGroupHeader } from '~/components/connections/connection-group-header'
import { RepositoryRow } from '~/components/connections/repository-row'
import { Alert } from '~/components/ui/alert'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import type { Connection, Repository } from '~/types/connections'

export interface ConnectionGroupProps {
    connection: Connection
    repositories: Repository[]
    totalCount: number
    enabledCount: number
}

export function ConnectionGroup({ connection, repositories, totalCount, enabledCount }: ConnectionGroupProps) {
    return (
        <Card>
            <ConnectionGroupHeader
                connection={connection}
                enabledCount={enabledCount}
                totalCount={totalCount}
            />
            {connection.status === 'error' && (
                <div className='border-b border-border px-5 py-3'>
                    <Alert>{connection.last_error ?? 'Access was revoked'}. Connect this account again.</Alert>
                </div>
            )}
            <ul className='divide-y divide-border'>
                {repositories.map((repository) => (
                    <RepositoryRow
                        key={repository.id}
                        repository={repository}
                    />
                ))}
            </ul>
            {!repositories.length && (
                <Text
                    variant='caption'
                    className='px-5 py-4'>
                    No matching repositories.
                </Text>
            )}
        </Card>
    )
}
