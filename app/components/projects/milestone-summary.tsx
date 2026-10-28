import { Text } from '~/components/ui/text'
import { formatDay } from '~/lib/format'

export interface MilestoneSummaryProps {
    date: string
    title: string
    detail: string
    muted?: boolean
}

export function MilestoneSummary({ date, title, detail, muted }: MilestoneSummaryProps) {
    return (
        <div className='min-w-0 flex-1 space-y-1'>
            <Text
                as='time'
                variant='caption'
                dateTime={date}>
                {formatDay(date)}
            </Text>
            <Text
                as='h3'
                variant='subheading'
                tone={muted ? 'muted' : 'primary'}>
                {title}
            </Text>
            {detail && <Text tone={muted ? 'muted' : 'secondary'}>{detail}</Text>}
        </div>
    )
}
