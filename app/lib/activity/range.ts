import { dayKey } from '~/lib/format'
import type { DayRange } from '~/types/activity'

export function lastDays(days: number, end = new Date()): DayRange {
    const start = new Date(end)
    start.setDate(start.getDate() - (days - 1))
    return { from: dayKey(start), to: dayKey(end) }
}

export function lastWeeks(weeks: number, end = new Date()): DayRange {
    const start = new Date(end)
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7) - (weeks - 1) * 7)
    return { from: dayKey(start), to: dayKey(end) }
}
