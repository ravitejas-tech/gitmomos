import { TimesheetCalendar } from '~/components/timesheet/calendar'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { ErrorState } from '~/components/ui/error-state'
import { Legend } from '~/components/ui/legend'
import { MiniStatGrid } from '~/components/ui/mini-stat-grid'
import { MonthStepper } from '~/components/ui/month-stepper'
import { Skeleton } from '~/components/ui/skeleton'
import { EDITED_LEGEND } from '~/data/timesheet/constants'
import { timesheetStats } from '~/data/timesheet/stats'
import { monthStart } from '~/lib/calendar'
import { formatMonth, todayLocal } from '~/lib/format'
import { hasEdits, monthTotals, timesheetWeeks } from '~/lib/timesheet/weeks'
import type { TimesheetDay } from '~/types/timesheet'

export interface TimesheetCardProps {
    month: string
    days: TimesheetDay[] | undefined
    isError: boolean
    title?: string
    note?: string
    onRetry: () => void
    onMonthChange: (month: string) => void
    onEdit?: (date: string) => void
}

export function TimesheetCard({
    month,
    days,
    isError,
    title,
    note,
    onRetry,
    onMonthChange,
    onEdit,
}: TimesheetCardProps) {
    const today = todayLocal()
    const thisMonth = monthStart(today)
    const weeks = timesheetWeeks(month, days ?? [])

    return (
        <Card>
            <CardHeader
                title={title ?? formatMonth(month)}
                description={note}
                actions={
                    <>
                        {month !== thisMonth && (
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={() => onMonthChange(thisMonth)}>
                                This month
                            </Button>
                        )}
                        <MonthStepper
                            month={month}
                            max={today}
                            onChange={onMonthChange}
                        />
                    </>
                }
            />
            <CardContent className='space-y-6'>
                {isError ? (
                    <ErrorState onRetry={onRetry} />
                ) : (
                    <>
                        {days ? (
                            <MiniStatGrid stats={timesheetStats(monthTotals(weeks))} />
                        ) : (
                            <Skeleton className='h-12' />
                        )}
                        <TimesheetCalendar
                            weeks={weeks}
                            today={today}
                            loading={!days}
                            onEdit={onEdit}
                        />
                        {hasEdits(weeks) && <Legend items={EDITED_LEGEND} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}
