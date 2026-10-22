import { HANDLE_PATTERN, HANDLE_PREFIX } from '~/data/public-profile/constants'

export function profilePath(handle: string): string {
    return `/${HANDLE_PREFIX}${handle}`
}

export function handleFromSegment(segment: string | undefined): string | null {
    const handle = segment?.startsWith(HANDLE_PREFIX) ? segment.slice(HANDLE_PREFIX.length).toLowerCase() : ''
    return HANDLE_PATTERN.test(handle) ? handle : null
}
