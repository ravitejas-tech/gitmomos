import { FolderGit2 } from 'lucide-react'
import { AddRepositoryForm } from '~/components/connections/add-repository-form'
import { RepositoryRow } from '~/components/connections/repository-row'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { EmptyState } from '~/components/ui/empty-state'
import { LoadingState } from '~/components/ui/loading-state'
import type { Repository } from '~/types/connections'

export function RepositoriesCard({ repositories }: { repositories: Repository[] | undefined }) {
    return (
        <Card>
            <CardHeader
                title='Tracked repositories'
                description='Paste a GitHub or Gitea repository URL to add it.'
                actions={repositories && <Badge variant='neutral'>{repositories.length}</Badge>}
            />
            <CardContent className='border-b border-border'>
                <AddRepositoryForm />
            </CardContent>
            {!repositories && <LoadingState />}
            {repositories?.length === 0 && (
                <EmptyState
                    tone='plain'
                    icon={FolderGit2}
                    title='No repositories yet'
                    description='Add the projects your daily reports should cover.'
                />
            )}
            {!!repositories?.length && (
                <ul className='divide-y divide-border'>
                    {repositories.map((repository) => (
                        <RepositoryRow
                            key={repository.id}
                            repository={repository}
                        />
                    ))}
                </ul>
            )}
        </Card>
    )
}
