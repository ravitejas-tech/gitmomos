import { ExternalLink, X } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { IconChip } from '~/components/ui/icon-chip'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { PROVIDER_ICONS } from '~/data/connections/constants'
import { useUntrackRepository } from '~/hooks/connections/mutations'
import { timeAgo } from '~/lib/format'
import { hostOf } from '~/lib/url'
import type { Repository } from '~/types/connections'

export function RepositoryRow({ repository }: { repository: Repository }) {
    const { mutate: untrack, isPending } = useUntrackRepository()
    const synced = repository.last_synced_at ? `Synced ${timeAgo(repository.last_synced_at)}` : 'Not synced yet'

    return (
        <ListRow className='group'>
            <IconChip icon={PROVIDER_ICONS[repository.connection.provider]} />
            <div className='min-w-0 flex-1'>
                <a
                    href={repository.html_url}
                    target='_blank'
                    rel='noreferrer'
                    className='flex min-w-0 items-center gap-1.5 hover:underline'>
                    <Text
                        as='span'
                        variant='strong'
                        truncate>
                        {repository.full_name}
                    </Text>
                    <ExternalLink className='size-3.5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100' />
                </a>
                <Text
                    variant='caption'
                    truncate>
                    {hostOf(repository.html_url)} · {synced}
                </Text>
            </div>
            {repository.is_private && (
                <Badge
                    variant='neutral'
                    className='max-sm:hidden'>
                    Private
                </Badge>
            )}
            <Button
                variant='danger'
                size='icon'
                onClick={() => untrack(repository)}
                disabled={isPending}
                aria-label={`Remove ${repository.full_name}`}
                title='Remove'>
                <X />
            </Button>
        </ListRow>
    )
}
