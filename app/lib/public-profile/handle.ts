import {
    FROM_PARAM,
    HANDLE_PATTERN,
    HANDLE_PREFIX,
    ISO_DATE_PATTERN,
    PRINT_PARAM,
    SEARCH_PARAM,
    TAB_PARAM,
    TO_PARAM,
} from '~/data/public-profile/constants'
import type { ReportFilter } from '~/types/public-profile'

export function profilePath(handle: string): string {
    return `/${HANDLE_PREFIX}${handle}`
}

export function profileTabPath(handle: string, tab: string): string {
    return `${profilePath(handle)}?${TAB_PARAM}=${tab}`
}

export function projectPath(handle: string, slug: string): string {
    return `${profilePath(handle)}/projects/${slug}`
}

export function reportPath(handle: string, date: string, print = false): string {
    return `${profilePath(handle)}/reports/${date}${print ? `?${PRINT_PARAM}=1` : ''}`
}

export function digestPath(handle: string, { query, from, to }: ReportFilter, print = false): string {
    const params = new URLSearchParams(
        Object.entries({
            [SEARCH_PARAM]: query,
            [FROM_PARAM]: from,
            [TO_PARAM]: to,
            [PRINT_PARAM]: print ? '1' : '',
        }).filter((entry): entry is [string, string] => Boolean(entry[1])),
    )
    return `${profilePath(handle)}/reports${params.size ? `?${params}` : ''}`
}

export function isoDateParam(params: URLSearchParams, key: string): string | undefined {
    const value = params.get(key)
    return value && ISO_DATE_PATTERN.test(value) ? value : undefined
}

export function digestFilter(params: URLSearchParams): ReportFilter {
    return {
        query: params.get(SEARCH_PARAM)?.trim() ?? '',
        from: isoDateParam(params, FROM_PARAM),
        to: isoDateParam(params, TO_PARAM),
    }
}

export function handleFromSegment(segment: string | undefined): string | null {
    const handle = segment?.startsWith(HANDLE_PREFIX) ? segment.slice(HANDLE_PREFIX.length).toLowerCase() : ''
    return HANDLE_PATTERN.test(handle) ? handle : null
}
