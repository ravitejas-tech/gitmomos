import { TimesheetCard } from '~/components/timesheet/card'
import { SAMPLE_TIMESHEET } from '~/data/landing/showcase-samples'
import { TIMESHEET_NOTE } from '~/data/timesheet/constants'

export function TimesheetShowcase() {
    return (
        <TimesheetCard
            month={SAMPLE_TIMESHEET.month}
            days={SAMPLE_TIMESHEET.days}
            isError={false}
            title={SAMPLE_TIMESHEET.title}
            note={TIMESHEET_NOTE}
            onRetry={() => undefined}
            onMonthChange={() => undefined}
        />
    )
}
