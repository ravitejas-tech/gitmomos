import { cva } from 'class-variance-authority'
import { Dot } from '~/components/ui/dot'
import { Text } from '~/components/ui/text'
import { EDITED_DOT } from '~/data/timesheet/constants'
import { formatDay, formatDecimalHours, formatDuration, formatShortDay, pluralize } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { TimesheetCell } from '~/types/timesheet'

const cellVariants = cva(
    'relative flex min-h-12 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 @2xl:min-h-20 @2xl:items-start @2xl:justify-between @2xl:gap-1 @2xl:p-2',
    {
        variants: {
            tone: {
                worked: 'bg-accent-subtle',
                idle: 'bg-surface-muted',
                blank: '',
            },
            today: { true: 'ring-1 ring-accent/40', false: '' },
            editable: {
                true: 'cursor-pointer transition-shadow hover:ring-2 hover:ring-accent/50 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none',
                false: '',
            },
        },
    },
)

export interface TimesheetDayCellProps {
    day: TimesheetCell
    today: boolean
    future: boolean
    onEdit?: ((date: string) => void) | undefined
}

export function TimesheetDayCell({ day, today, future, onEdit }: TimesheetDayCellProps) {
    const { date, inMonth, minutes, commits, edited } = day
    const tone = !inMonth || future ? 'blank' : minutes ? 'worked' : 'idle'
    const hoursTone = inMonth ? 'accent' : 'muted'
    const editable = Boolean(onEdit) && inMonth && !future
    const summary = [
        formatShortDay(date),
        minutes ? `${formatDuration(minutes)}, ${pluralize(commits, 'commit')}` : '',
        edited ? 'edited by hand' : '',
    ]
        .filter(Boolean)
        .join(' · ')
    const content = (
        <>
            {edited && inMonth && <Dot className={cn('absolute top-1.5 right-1.5 size-1.5', EDITED_DOT)} />}
            <Text
                as='span'
                variant='micro'
                tone={today ? 'accent' : inMonth ? 'secondary' : 'muted'}
                numeric>
                {Number(date.slice(8))}
            </Text>
            {minutes > 0 && (
                <>
                    <Text
                        as='span'
                        variant='eyebrow'
                        tone={hoursTone}
                        numeric
                        className='@2xl:hidden'>
                        {formatDecimalHours(minutes)}
                    </Text>
                    <Text
                        as='span'
                        variant='caption-strong'
                        tone={hoursTone}
                        numeric
                        className='hidden @2xl:block'>
                        {formatDuration(minutes)}
                    </Text>
                </>
            )}
        </>
    )

    if (editable && onEdit) {
        return (
            <button
                type='button'
                title={summary}
                aria-label={`Edit hours for ${formatDay(date)}`}
                onClick={() => onEdit(date)}
                className={cellVariants({ tone, today, editable })}>
                {content}
            </button>
        )
    }

    return (
        <div
            title={summary}
            className={cellVariants({ tone, today, editable })}>
            {content}
        </div>
    )
}
