import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { CalendarDayButton } from '~/components/ui/calendar-day'
import { Text } from '~/components/ui/text'
import { WEEKDAY_LABELS } from '~/data/ui/calendar'
import { monthGrid, shiftMonth } from '~/lib/calendar'
import { formatDay, formatMonth, todayLocal } from '~/lib/format'
import type { CalendarMark } from '~/types/calendar'

export interface CalendarProps {
    month: string
    selected: string | undefined
    marks: Record<string, CalendarMark>
    max: string
    onMonthChange: (month: string) => void
    onSelect: (date: string) => void
}

export function Calendar({ month, selected, marks, max, onMonthChange, onSelect }: CalendarProps) {
    const today = todayLocal()

    return (
        <div className='space-y-2'>
            <div className='flex items-center justify-between'>
                <Button
                    variant='ghost'
                    size='icon'
                    aria-label='Previous month'
                    onClick={() => onMonthChange(shiftMonth(month, -1))}>
                    <ChevronLeft />
                </Button>
                <Text variant='title'>{formatMonth(month)}</Text>
                <Button
                    variant='ghost'
                    size='icon'
                    aria-label='Next month'
                    disabled={shiftMonth(month, 1) > max}
                    onClick={() => onMonthChange(shiftMonth(month, 1))}>
                    <ChevronRight />
                </Button>
            </div>
            <div className='grid grid-cols-7 gap-0.5'>
                {WEEKDAY_LABELS.map((label) => (
                    <Text
                        key={label}
                        as='span'
                        variant='micro'
                        className='flex h-8 items-center justify-center'>
                        {label}
                    </Text>
                ))}
                {monthGrid(month).map(({ date, inMonth }) => (
                    <CalendarDayButton
                        key={date}
                        day={Number(date.slice(8))}
                        label={formatDay(date)}
                        state={
                            date === selected ? 'selected' : date === today ? 'today' : inMonth ? 'default' : 'outside'
                        }
                        mark={marks[date]}
                        disabled={date > max}
                        onSelect={() => onSelect(date)}
                    />
                ))}
            </div>
        </div>
    )
}
