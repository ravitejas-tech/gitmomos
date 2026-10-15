const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function isIsoDate(value: unknown): value is string {
    return typeof value === 'string' && DATE_RE.test(value)
}

export function localDate(timeZone: string, at = new Date()): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(at)
}

export function addDays(date: string, days: number): string {
    const d = new Date(`${date}T00:00:00Z`)
    d.setUTCDate(d.getUTCDate() + days)
    return d.toISOString().slice(0, 10)
}

function offsetMs(timeZone: string, at: Date): number {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-US', {
            timeZone,
            hourCycle: 'h23',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
            .formatToParts(at)
            .map((p) => [p.type, p.value]),
    )
    const asUtc = Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day),
        Number(parts.hour),
        Number(parts.minute),
        Number(parts.second),
    )
    return asUtc - Math.floor(at.getTime() / 1000) * 1000
}

function startOfDay(date: string, timeZone: string): Date {
    const naive = Date.parse(`${date}T00:00:00Z`)
    const first = naive - offsetMs(timeZone, new Date(naive))
    return new Date(naive - offsetMs(timeZone, new Date(first)))
}

export function dayWindow(date: string, timeZone: string): { start: Date; end: Date } {
    return { start: startOfDay(date, timeZone), end: startOfDay(addDays(date, 1), timeZone) }
}
