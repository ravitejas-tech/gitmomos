import { RefreshCw, Trash2 } from 'lucide-react'
import { Avatar } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { PROVIDER_ICONS } from '~/data/connections/constants'
import { useDisconnect, useRefreshRepositories } from '~/hooks/connections/mutations'
import { cn } from '~/lib/utils'
import type { Connection } from '~/types/connections'

export interface ConnectionGroupHeaderProps {
    connection: Connection
    enabledCount: number
    totalCount: number
}

export function ConnectionGroupHeader({ connection, enabledCount, totalCount }: ConnectionGroupHeaderProps) {
    const { mutate: refresh, isPending: isRefreshing } = useRefreshRepositories()
    const { mutate: disconnect, isPending: isDisconnecting } = useDisconnect()
    const host = new URL(connection.base_url).host
    const ProviderIcon = PROVIDER_ICONS[connection.provider]
    const name = connection.account_name || connection.account_login

    const confirmDisconnect = () => {
        if (window.confirm(`Disconnect ${connection.account_login} on ${host}? Existing reports are kept.`)) {
            disconnect(connection.id)
        }
    }

    return (
        <div className='flex items-center gap-3 border-b border-border bg-surface-muted/40 px-5 py-4'>
            <Avatar
                name={name}
                src={connection.avatar_url}
                size='md'
            />
            <div className='min-w-0 flex-1'>
                <Text
                    variant='title'
                    truncate>
                    {name}
                </Text>
                <Text
                    as='div'
                    variant='caption'
                    className='flex items-center gap-1.5'>
                    <ProviderIcon className='size-3.5 shrink-0' />
                    <span className='truncate'>
                        {host} · {enabledCount} of {totalCount} tracked
                    </span>
                </Text>
            </div>
            {connection.status === 'error' && <Badge variant='danger'>Needs reconnect</Badge>}
            <Button
                variant='ghost'
                size='icon'
                onClick={() => refresh(connection.id)}
                disabled={isRefreshing}
                aria-label='Refresh repository list'
                title='Refresh repository list'>
                <RefreshCw className={cn(isRefreshing && 'animate-spin')} />
            </Button>
            <Button
                variant='danger'
                size='icon'
                onClick={confirmDisconnect}
                disabled={isDisconnecting}
                aria-label='Disconnect'
                title='Disconnect'>
                <Trash2 />
            </Button>
        </div>
    )
}
