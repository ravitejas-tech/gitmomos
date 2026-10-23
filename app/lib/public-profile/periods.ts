import { REPORT_PERIODS } from '~/data/public-profile/constants'
import { shiftDay } from '~/lib/calendar'
import { dateFromDay, dayKey, formatAxisDay, todayLocal } from '~/lib/format'
import type { DayRange } from '~/types/activity'
import type { PublicReport, ReportPeriod, ReportWeek } from '~/types/public-profile'

export function weekRange(date: string): DayRange {
    const from = shiftDay(date, -((dateFromDay(date).getDay() + 6) % 7))
    return { from, to: shiftDay(from, 6) }
}

function monthRange(offset: number): DayRange {
    const today = dateFromDay(todayLocal())
    return {
        from: dayKey(new Date(today.getFullYear(), today.getMonth() + offset, 1)),
        to: dayKey(new Date(today.getFullYear(), today.getMonth() + offset + 1, 0)),
    }
}

const PERIOD_RANGES: Record<Exclude<ReportPeriod, 'all'>, () => DayRange> = {
    'this-week': () => weekRange(todayLocal()),
    'last-week': () => weekRange(shiftDay(todayLocal(), -7)),
    'this-month': () => monthRange(0),
    'last-month': () => monthRange(-1),
}

export function reportPeriod(value: string | null): ReportPeriod {
    return REPORT_PERIODS.find((period) => period.value === value)?.value ?? 'all'
}

export function periodRange(period: ReportPeriod): DayRange | null {
    return period === 'all' ? null : PERIOD_RANGES[period]()
}

export function groupByWeek(reports: PublicReport[]): ReportWeek[] {
    const weeks = new Map<string, ReportWeek>()
    for (const report of reports) {
        const range = weekRange(report.date)
        const week = weeks.get(range.from) ?? { ...range, reports: [] }
        week.reports.push(report)
        weeks.set(range.from, week)
    }
    return [...weeks.values()]
}

export function weekLabel({ from }: DayRange): string {
    if (from === weekRange(todayLocal()).from) return 'This week'
    if (from === weekRange(shiftDay(todayLocal(), -7)).from) return 'Last week'
    return `Week of ${formatAxisDay(from)}`
}
