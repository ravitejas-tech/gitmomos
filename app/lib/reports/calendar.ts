import type { CalendarMark } from '~/types/calendar'
import type { Report } from '~/types/reports'

export function reportMarks(days: Pick<Report, 'date' | 'status'>[] | undefined): Record<string, CalendarMark> {
    return Object.fromEntries((days ?? []).map(({ date, status }) => [date, status === 'failed' ? 'danger' : 'accent']))
}
