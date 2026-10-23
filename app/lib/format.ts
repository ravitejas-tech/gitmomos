const relativeTime = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 365 * 24 * 3600],
    ['month', 30 * 24 * 3600],
    ['week', 7 * 24 * 3600],
    ['day', 24 * 3600],
    ['hour', 3600],
    ['minute', 60],
]

export function timeAgo(iso: string | null | undefined): string {
    if (!iso) return 'never'
    const seconds = (Date.parse(iso) - Date.now()) / 1000
    const unit = RELATIVE_UNITS.find(([, size]) => Math.abs(seconds) >= size)
    return unit ? relativeTime.format(Math.round(seconds / unit[1]), unit[0]) : 'just now'
}

export function dayKey(date: Date): string {
    return date.toLocaleDateString('en-CA')
}

export function todayLocal(): string {
    return dayKey(new Date())
}

export const dateFromDay = (date: string) => {
    const [year = 1970, month = 1, day = 1] = date.split('-').map(Number)
    return new Date(year, month - 1, day)
}

export function formatDay(date: string, options: Intl.DateTimeFormatOptions = {}): string {
    return dateFromDay(date).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    })
}

export function formatDayRange(from: string, to: string): string {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).formatRange(
        dateFromDay(from),
        dateFromDay(to),
    )
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
    return `${count} ${count === 1 ? singular : plural}`
}

export function formatShortDay(date: string): string {
    return dateFromDay(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatDate(date: string): string {
    return dateFromDay(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatMonth(month: string): string {
    return dateFromDay(month).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

export function formatAxisDay(date: string): string {
    return dateFromDay(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function formatHour(hour: number): string {
    return new Date(2000, 0, 1, hour).toLocaleTimeString(undefined, { hour: 'numeric' })
}

export function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

export function shortSha(sha: string): string {
    return sha.slice(0, 7)
}

export function localDayRange(date: string): { start: Date; end: Date } {
    const start = dateFromDay(date)
    const end = new Date(start)
    end.setDate(end.getDate() + 1)
    return { start, end }
}
