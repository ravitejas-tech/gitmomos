import { CALENDAR_DAYS, DAY_MS } from '~/data/ui/calendar'
import { dateFromDay, dayKey, todayLocal } from '~/lib/format'
import type { DayRange } from '~/types/activity'
import type { CalendarDay } from '~/types/calendar'

export function monthStart(date: string): string {
    return `${date.slice(0, 7)}-01`
}

export function shiftMonth(month: string, delta: number): string {
    const date = dateFromDay(month)
    date.setMonth(date.getMonth() + delta)
    return dayKey(date)
}

export function monthGrid(month: string): CalendarDay[] {
    const first = dateFromDay(month)
    const start = new Date(first)
    start.setDate(1 - ((first.getDay() + 6) % 7))
    return Array.from({ length: CALENDAR_DAYS }, (_, index) => {
        const day = new Date(start)
        day.setDate(start.getDate() + index)
        return { date: dayKey(day), inMonth: day.getMonth() === first.getMonth() }
    })
}

export function monthRange(month: string): DayRange {
    const grid = monthGrid(month)
    return { from: grid[0]?.date ?? month, to: grid.at(-1)?.date ?? month }
}

export function shiftDay(date: string, days: number): string {
    const day = dateFromDay(date)
    day.setDate(day.getDate() + days)
    return dayKey(day)
}

export function daysAgo(date: string): number {
    return Math.round((dateFromDay(todayLocal()).getTime() - dateFromDay(date).getTime()) / DAY_MS)
}
