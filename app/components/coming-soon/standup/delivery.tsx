import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { IconChip } from '~/components/ui/icon-chip'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { STANDUP_CHANNELS, STANDUP_SCHEDULE } from '~/data/coming-soon/standup'

export function StandupDelivery() {
    return (
        <Card>
            <CardHeader
                title='Delivery'
                description={STANDUP_SCHEDULE}
            />
            <ul className='divide-y divide-border border-t border-border'>
                {STANDUP_CHANNELS.map(({ icon, name, target, on }) => (
                    <ListRow key={name}>
                        <IconChip icon={icon} />
                        <div className='min-w-0 flex-1'>
                            <Text
                                variant='strong'
                                truncate>
                                {name}
                            </Text>
                            <Text
                                variant='caption'
                                truncate>
                                {target}
                            </Text>
                        </div>
                        <Badge variant={on ? 'success' : 'neutral'}>{on ? 'On' : 'Off'}</Badge>
                    </ListRow>
                ))}
            </ul>
        </Card>
    )
}
