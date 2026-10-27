import { useSearchParams } from 'react-router'
import { MONTH_PARAM } from '~/data/timesheet/constants'
import { monthStart } from '~/lib/calendar'
import { todayLocal } from '~/lib/format'
import { monthFromParam, monthParam } from '~/lib/timesheet/month'

export function useTimesheetMonth() {
    const [params, setParams] = useSearchParams()
    const month = monthFromParam(params.get(MONTH_PARAM), monthStart(todayLocal()))

    const setMonth = (next: string) =>
        setParams(
            (current) => {
                const updated = new URLSearchParams(current)
                updated.set(MONTH_PARAM, monthParam(next))
                return updated
            },
            { replace: true, preventScrollReset: true },
        )

    return { month, setMonth }
}
