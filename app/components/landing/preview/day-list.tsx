import { PreviewDayRow } from '~/components/landing/preview/day-row'
import { Text } from '~/components/ui/text'
import { SAMPLE_DAYS } from '~/data/landing/sample-report'

export function PreviewDayList() {
    return (
        <div className='border-r border-border p-2'>
            <Text
                variant='micro'
                className='px-2.5 pt-1.5 pb-2'>
                This week
            </Text>
            <ul className='flex flex-col gap-0.5'>
                {SAMPLE_DAYS.map((day, index) => (
                    <PreviewDayRow
                        key={day.date}
                        active={index === 0}
                        {...day}
                    />
                ))}
            </ul>
        </div>
    )
}
