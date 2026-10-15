import { useCallback, useRef, useState } from 'react'
import { CalendarSearch, ChevronDown } from 'lucide-react'
import { DatePickerLegend } from '~/components/reports/date-picker/legend'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { useReportDays } from '~/hooks/reports/queries'
import { useDismiss } from '~/hooks/use-dismiss'
import { monthRange, monthStart } from '~/lib/calendar'
import { formatShortDay, todayLocal } from '~/lib/format'
import { reportMarks } from '~/lib/reports/calendar'

export interface ReportDatePickerProps {
    selected: string | undefined
    onSelect: (date: string) => void
}

export function ReportDatePicker({ selected, onSelect }: ReportDatePickerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [month, setMonth] = useState(() => monthStart(selected ?? todayLocal()))
    const { data: days } = useReportDays({ variables: monthRange(month), enabled: isOpen })
    const close = useCallback(() => setIsOpen(false), [])
    useDismiss(ref, close, isOpen)

    const toggle = () => {
        if (!isOpen) setMonth(monthStart(selected ?? todayLocal()))
        setIsOpen(!isOpen)
    }

    return (
        <div
            ref={ref}
            className='relative'>
            <Button
                variant='secondary'
                onClick={toggle}
                aria-expanded={isOpen}
                aria-haspopup='dialog'>
                <CalendarSearch />
                {selected ? formatShortDay(selected) : 'Find a date'}
                <ChevronDown className='text-text-muted' />
            </Button>
            {isOpen && (
                <div
                    role='dialog'
                    aria-label='Choose a date'
                    className='absolute top-full right-0 z-30 mt-2 w-76 space-y-3 rounded-xl border border-border bg-surface p-3 shadow-overlay'>
                    <Calendar
                        month={month}
                        selected={selected}
                        marks={reportMarks(days)}
                        max={todayLocal()}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                            onSelect(date)
                            close()
                        }}
                    />
                    <div className='flex items-center justify-between border-t border-border pt-3'>
                        <DatePickerLegend />
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
