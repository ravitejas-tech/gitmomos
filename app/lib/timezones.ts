export function canonicalTimezone(zone: string): string {
    try {
        return new Intl.DateTimeFormat('en-US', { timeZone: zone }).resolvedOptions().timeZone
    } catch {
        return zone
    }
}

export function sameTimezone(a: string, b: string): boolean {
    return canonicalTimezone(a) === canonicalTimezone(b)
}

export function timezoneOptions(current: string): string[] {
    const zones = Intl.supportedValuesOf('timeZone')
    return [...new Set(['UTC', current, ...zones])]
}

export function browserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}
