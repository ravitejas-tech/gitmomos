import type { Activity, DayCount } from '~/types/activity'

export function percentChange(current: number, previous: number): number | null {
    if (!previous) return null
    return Math.round(((current - previous) / previous) * 100)
}

export function share(part: number, total: number): number {
    return total ? Math.round((part / total) * 100) : 0
}

export function totalCommits(daily: DayCount[]): number {
    return daily.reduce((sum, day) => sum + day.commits, 0)
}

export function activeDays(daily: DayCount[]): number {
    return daily.filter((day) => day.commits > 0).length
}

export function currentStreak(daily: DayCount[]): number {
    const days = [...daily].reverse()
    const counted = days[0]?.commits === 0 ? days.slice(1) : days
    const gap = counted.findIndex((day) => day.commits === 0)
    return gap === -1 ? counted.length : gap
}

export function peakHour(hours: Activity['hours']): number | null {
    const peak = hours.reduce<Activity['hours'][number] | null>(
        (best, hour) => (hour.commits > (best?.commits ?? 0) ? hour : best),
        null,
    )
    return peak?.hour ?? null
}

export function activeHourWindow(hours: Activity['hours']): Activity['hours'] {
    const active = hours.filter((hour) => hour.commits > 0).map((hour) => hour.hour)
    if (!active.length) return hours
    const from = Math.max(0, Math.min(...active) - 1)
    const to = Math.min(23, Math.max(...active) + 1)
    return hours.filter((hour) => hour.hour >= from && hour.hour <= to)
}
