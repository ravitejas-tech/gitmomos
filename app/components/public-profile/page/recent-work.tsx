import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { formatAxisDay } from '~/lib/format'
import type { RecentWork } from '~/types/public-profile'

export function PublicProfileRecentWork({ recent }: { recent: RecentWork[] }) {
    if (!recent.length) return null

    return (
        <Card>
            <CardHeader title='Recently shipped' />
            <ul className='divide-y divide-border border-t border-border'>
                {recent.map(({ date, headline }) => (
                    <ListRow
                        key={date}
                        align='start'>
                        <Text
                            as='span'
                            variant='caption'
                            className='w-14 shrink-0'>
                            {formatAxisDay(date)}
                        </Text>
                        <Text as='span'>{headline}</Text>
                    </ListRow>
                ))}
            </ul>
        </Card>
    )
}
