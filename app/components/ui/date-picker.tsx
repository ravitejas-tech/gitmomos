import { CalendarSearch, ChevronDown, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Legend } from '~/components/ui/legend'
import type { LegendItemProps } from '~/components/ui/legend-item'
import { useDismiss } from '~/hooks/use-dismiss'
import { monthStart } from '~/lib/calendar'
import { formatShortDay, todayLocal } from '~/lib/format'
import type { CalendarMark, DatePickerState } from '~/types/calendar'

export interface DatePickerProps {
    picker: DatePickerState
    selected: string | undefined
    placeholder: string
    marks: Record<string, CalendarMark>
    legend: readonly LegendItemProps[]
    compact?: boolean
    onSelect: (date: string) => void
    onClear?: (() => void) | undefined
}

export function DatePicker({
    picker,
    selected,
    placeholder,
    marks,
    legend,
    compact,
    onSelect,
    onClear,
}: DatePickerProps) {
    const { anchorRef, position, isOpen, month, setMonth, close, toggle } = picker
    const label = selected ? formatShortDay(selected) : placeholder
    useDismiss(anchorRef, close, isOpen)

    return (
        <div
            ref={anchorRef}
            className='flex shrink-0 items-center gap-1'>
            <Button
                variant='secondary'
                onClick={toggle}
                aria-expanded={isOpen}
                aria-haspopup='dialog'
                aria-label={compact ? label : undefined}>
                <CalendarSearch />
                <span className={compact ? 'max-sm:hidden' : undefined}>{label}</span>
                <ChevronDown className='text-text-muted' />
            </Button>
            {selected && onClear && (
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={onClear}
                    aria-label='Clear date'
                    title='Clear date'>
                    <X />
                </Button>
            )}
            {position && (
                <div
                    role='dialog'
                    aria-label='Choose a date'
                    style={position}
                    className='fixed z-30 space-y-3 rounded-xl border border-border bg-surface p-3 shadow-overlay'>
                    <Calendar
                        month={month}
                        selected={selected}
                        marks={marks}
                        max={todayLocal()}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                            onSelect(date)
                            close()
                        }}
                    />
                    <div className='flex items-center justify-between gap-3 border-t border-border pt-3'>
                        <Legend items={legend} />
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => setMonth(monthStart(todayLocal()))}>
                            This month
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
