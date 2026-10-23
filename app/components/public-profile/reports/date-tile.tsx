import { Text } from '~/components/ui/text'
import { dateFromDay } from '~/lib/format'

export function DateTile({ date }: { date: string }) {
    const day = dateFromDay(date)

    return (
        <div className='flex w-14 shrink-0 flex-col items-center rounded-xl border border-border bg-surface py-1.5 shadow-card'>
            <Text
                as='span'
                variant='label'
                tone='accent'>
                {day.toLocaleDateString(undefined, { weekday: 'short' })}
            </Text>
            <Text
                as='span'
                variant='heading'
                numeric>
                {day.getDate()}
            </Text>
            <Text
                as='span'
                variant='micro'>
                {day.toLocaleDateString(undefined, { month: 'short' })}
            </Text>
        </div>
    )
}
