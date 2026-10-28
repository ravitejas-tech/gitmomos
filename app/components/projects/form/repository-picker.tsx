import { Link } from 'react-router'
import { FolderGit2 } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { EmptyState } from '~/components/ui/empty-state'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { CONNECTIONS_PATH } from '~/data/navigation'
import { useRepositories } from '~/hooks/connections/queries'

export interface RepositoryPickerProps {
    id: string
    value: string[]
    onChange: (repositoryIds: string[]) => void
}

export function RepositoryPicker({ id, value, onChange }: RepositoryPickerProps) {
    const { data: repositories } = useRepositories()

    if (!repositories) return <Skeleton className='h-24' />

    if (!repositories.length) {
        return (
            <EmptyState
                icon={FolderGit2}
                title='No repositories yet'
                className='py-8'
                action={
                    <Button
                        asChild
                        variant='secondary'>
                        <Link to={CONNECTIONS_PATH}>Add a repository</Link>
                    </Button>
                }
            />
        )
    }

    return (
        <ul
            id={id}
            className='max-h-56 divide-y divide-border overflow-y-auto rounded-lg border border-border-strong'>
            {repositories.map((repository) => (
                <li key={repository.id}>
                    <label className='flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface-muted/50'>
                        <Checkbox
                            checked={value.includes(repository.id)}
                            onChange={(event) =>
                                onChange(
                                    event.target.checked
                                        ? [...value, repository.id]
                                        : value.filter((picked) => picked !== repository.id),
                                )
                            }
                        />
                        <Text
                            as='span'
                            variant='strong'
                            truncate
                            className='min-w-0 flex-1'>
                            {repository.full_name}
                        </Text>
                        {repository.is_private && <Badge variant='neutral'>Private</Badge>}
                    </label>
                </li>
            ))}
        </ul>
    )
}
