import type { CalendarMark } from '~/types/calendar'
import type { Report } from '~/types/reports'

export type MarkedDay = Pick<Report, 'date'> & Partial<Pick<Report, 'status'>>

export function reportMarks(days: MarkedDay[] | undefined): Record<string, CalendarMark> {
    return Object.fromEntries((days ?? []).map(({ date, status }) => [date, status === 'failed' ? 'danger' : 'accent']))
}
