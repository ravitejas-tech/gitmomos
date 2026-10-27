import { NO_WORK } from '~/data/timesheet/constants'
import { WEEKDAY_LABELS } from '~/data/ui/calendar'
import { monthGrid } from '~/lib/calendar'
import type { TimesheetCell, TimesheetDay, TimesheetTotals, TimesheetWeek } from '~/types/timesheet'

const sumMinutes = (days: TimesheetCell[]) => days.reduce((total, { minutes }) => total + minutes, 0)

export function timesheetWeeks(month: string, days: TimesheetDay[]): TimesheetWeek[] {
    const worked = new Map(days.map((day) => [day.date, day]))
    const cells = monthGrid(month).map((day) => ({ ...NO_WORK, ...worked.get(day.date), ...day }))
    const size = WEEKDAY_LABELS.length
    return Array.from({ length: cells.length / size }, (_, week) => cells.slice(week * size, (week + 1) * size))
        .filter((week) => week.some(({ inMonth }) => inMonth))
        .map((week) => ({ days: week, minutes: sumMinutes(week) }))
}

export function hasEdits(weeks: TimesheetWeek[]): boolean {
    return weeks.some(({ days }) => days.some(({ inMonth, edited }) => inMonth && edited))
}

export function monthTotals(weeks: TimesheetWeek[]): TimesheetTotals {
    const worked = weeks.flatMap(({ days }) => days).filter(({ inMonth, minutes }) => inMonth && minutes > 0)
    return { minutes: sumMinutes(worked), days: worked.length }
}
