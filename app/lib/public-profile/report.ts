import { daysAgo } from '~/lib/calendar'
import { formatAxisDay, formatDay, formatDayRange } from '~/lib/format'
import type { ReportFilter, SharedReport } from '~/types/public-profile'

export function reportPdfTitle({ name, date }: Pick<SharedReport, 'name' | 'date'>): string {
    return `${name} – Daily report – ${formatDay(date)}`
}

export function digestTitle({ query, from, to }: ReportFilter): string {
    const range = from && to ? formatDayRange(from, to) : ''
    if (!query) return range || 'All shared reports'
    return [`Reports about “${query}”`, range].filter(Boolean).join(', ')
}

export function digestPdfTitle(name: string, filter: ReportFilter): string {
    return `${name} – Work summary – ${digestTitle(filter)}`
}

export function updatedLabel(date: string): string {
    const age = daysAgo(date)
    if (age <= 0) return 'Updated today'
    if (age === 1) return 'Updated yesterday'
    if (age < 7) return `Updated ${age} days ago`
    return `Updated ${formatAxisDay(date)}`
}
