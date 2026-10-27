import { formatDuration } from '~/lib/format'
import type { TimesheetTotals } from '~/types/timesheet'

export const timesheetStats = ({ minutes, days }: TimesheetTotals) => [
    { value: formatDuration(minutes), label: 'Total time' },
    { value: days.toLocaleString(), label: 'Days worked' },
    { value: days ? formatDuration(Math.round(minutes / days)) : '–', label: 'Average day' },
]
