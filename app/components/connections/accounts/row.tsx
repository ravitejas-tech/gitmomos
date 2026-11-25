import { Unplug } from 'lucide-react'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { PROVIDER_ICONS } from '~/data/connections/constants'
import { useDisconnect } from '~/hooks/connections/mutations'
import { hostOf } from '~/lib/url'
import type { Connection } from '~/types/connections'

export function AccountRow({ connection }: { connection: Connection }) {
    const { mutate: disconnect, isPending } = useDisconnect()
    const host = hostOf(connection.base_url)
    const ProviderIcon = PROVIDER_ICONS[connection.provider]
    const name = connection.account_name || connection.account_login

    const confirmDisconnect = () => {
        if (window.confirm(`Disconnect ${connection.account_login} on ${host}? Existing reports are kept.`)) {
            disconnect(connection.id)
        }
    }

    return (
        <ListRow>
            <Avatar
                name={name}
                src={connection.avatar_url}
                size='md'
            />
            <div className='min-w-0 flex-1'>
                <Text
                    variant='strong'
                    truncate>
                    {name}
                </Text>
                <Text
                    as='div'
                    variant='caption'
                    className='flex items-center gap-1.5'>
                    <ProviderIcon className='size-3.5 shrink-0' />
                    <span className='truncate'>{host}</span>
                </Text>
                {connection.status === 'error' && (
                    <Text
                        variant='caption'
                        tone='danger'
                        className='mt-1'>
                        {connection.last_error ?? 'Access was revoked'}. Connect this account again.
                    </Text>
                )}
            </div>
            <Button
                variant='danger'
                size='icon'
                onClick={confirmDisconnect}
                disabled={isPending}
                aria-label={`Disconnect ${name}`}
                title='Disconnect'>
                <Unplug />
            </Button>
        </ListRow>
    )
}
