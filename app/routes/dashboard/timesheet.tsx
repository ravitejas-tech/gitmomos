import { useState } from 'react'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { TimesheetCard } from '~/components/timesheet/card'
import { EditHoursModal } from '~/components/timesheet/edit-hours-modal'
import { NO_WORK } from '~/data/timesheet/constants'
import { useTimesheet } from '~/hooks/timesheet/queries'
import { useTimesheetMonth } from '~/hooks/timesheet/use-timesheet-month'
import { monthRange } from '~/lib/calendar'

export default function Timesheet() {
    const { month, setMonth } = useTimesheetMonth()
    const [editing, setEditing] = useState<string | null>(null)
    const { data, isError, refetch } = useTimesheet({ variables: monthRange(month) })

    return (
        <DashboardPage title='Timesheet'>
            <TimesheetCard
                month={month}
                days={data}
                isError={isError}
                onRetry={() => refetch()}
                onMonthChange={setMonth}
                onEdit={setEditing}
            />
            {editing && (
                <EditHoursModal
                    key={editing}
                    day={data?.find((day) => day.date === editing) ?? { ...NO_WORK, date: editing }}
                    onClose={() => setEditing(null)}
                />
            )}
        </DashboardPage>
    )
}
