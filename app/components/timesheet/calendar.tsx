import { Fragment } from 'react'
import { TimesheetDayCell } from '~/components/timesheet/day-cell'
import { Text } from '~/components/ui/text'
import { WEEKDAY_LABELS } from '~/data/ui/calendar'
import { formatDuration } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { TimesheetWeek } from '~/types/timesheet'

export interface TimesheetCalendarProps {
    weeks: TimesheetWeek[]
    today: string
    loading: boolean
    onEdit?: ((date: string) => void) | undefined
}

export function TimesheetCalendar({ weeks, today, loading, onEdit }: TimesheetCalendarProps) {
    return (
        <div className='@container'>
            <div
                aria-busy={loading}
                className={cn('grid grid-cols-7 gap-1 @2xl:grid-cols-8 @2xl:gap-1.5', loading && 'animate-pulse')}>
                {WEEKDAY_LABELS.map((label) => (
                    <Text
                        key={label}
                        as='span'
                        variant='micro'
                        className='text-center @2xl:px-2 @2xl:text-left'>
                        {label}
                    </Text>
                ))}
                <Text
                    as='span'
                    variant='micro'
                    className='hidden px-2 text-right @2xl:block'>
                    Week
                </Text>
                {weeks.map(({ days, minutes }) => (
                    <Fragment key={days[0]?.date}>
                        {days.map((day) => (
                            <TimesheetDayCell
                                key={day.date}
                                day={day}
                                today={day.date === today}
                                future={day.date > today}
                                onEdit={onEdit}
                            />
                        ))}
                        <Text
                            as='span'
                            variant='strong'
                            tone={minutes ? 'primary' : 'muted'}
                            numeric
                            className='hidden self-end p-2 text-right @2xl:block'>
                            {minutes ? formatDuration(minutes) : '–'}
                        </Text>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
