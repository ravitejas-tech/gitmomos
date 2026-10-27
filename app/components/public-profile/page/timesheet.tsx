import { TimesheetCard } from '~/components/timesheet/card'
import { TIMESHEET_NOTE } from '~/data/timesheet/constants'
import { usePublicTimesheet } from '~/hooks/timesheet/queries'
import { useTimesheetMonth } from '~/hooks/timesheet/use-timesheet-month'
import { monthRange } from '~/lib/calendar'

export function ProfileTimesheet({ handle }: { handle: string }) {
    const { month, setMonth } = useTimesheetMonth()
    const { data, isError, refetch } = usePublicTimesheet({ variables: { handle, ...monthRange(month) } })

    return (
        <TimesheetCard
            month={month}
            days={data}
            isError={isError}
            note={TIMESHEET_NOTE}
            onRetry={() => refetch()}
            onMonthChange={setMonth}
        />
    )
}
