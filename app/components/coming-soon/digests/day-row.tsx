import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { pluralize } from '~/lib/format'

export interface DigestDayRowProps {
    day: string
    headline: string
    commits: number
}

export function DigestDayRow({ day, headline, commits }: DigestDayRowProps) {
    return (
        <ListRow>
            <Text
                as='span'
                variant='caption-strong'
                className='w-9 shrink-0'>
                {day}
            </Text>
            <Text
                as='span'
                truncate
                className='min-w-0 flex-1'>
                {headline}
            </Text>
            <Text
                as='span'
                variant='caption'
                numeric
                className='shrink-0'>
                {pluralize(commits, 'commit')}
            </Text>
        </ListRow>
    )
}
