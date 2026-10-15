import { BookMarked, ExternalLink, Lock } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Switch } from '~/components/ui/switch'
import { Text } from '~/components/ui/text'
import { useSetRepositoryEnabled } from '~/hooks/connections/mutations'
import { timeAgo } from '~/lib/format'
import type { Repository } from '~/types/connections'

export function RepositoryRow({ repository }: { repository: Repository }) {
    const { mutate: setEnabled } = useSetRepositoryEnabled()
    const Icon = repository.is_private ? Lock : BookMarked

    return (
        <li className='group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-muted/40'>
            <Icon className='size-4 shrink-0 text-text-muted' />
            <div className='min-w-0 flex-1'>
                <a
                    href={repository.html_url}
                    target='_blank'
                    rel='noreferrer'
                    className='flex min-w-0 items-center gap-1.5 hover:underline'>
                    <Text
                        as='span'
                        variant='strong'
                        tone={repository.enabled ? 'primary' : 'secondary'}
                        truncate>
                        {repository.full_name}
                    </Text>
                    <ExternalLink className='size-3.5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100' />
                </a>
                <Text variant='caption'>Last push {timeAgo(repository.pushed_at)}</Text>
            </div>
            {repository.is_private && (
                <Badge
                    variant='neutral'
                    className='max-sm:hidden'>
                    Private
                </Badge>
            )}
            <Switch
                checked={repository.enabled}
                onChange={(enabled) => setEnabled({ id: repository.id, enabled })}
                label={`Track ${repository.full_name}`}
            />
        </li>
    )
}
