import { RELEASES_PATH } from '~/data/navigation'

export function releasePath(tag: string) {
    return `${RELEASES_PATH}/${tag}`
}

export function formatReleaseDate(iso: string, month: 'short' | 'long') {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric' })
}

export function codeLanguage(className: unknown) {
    const classes = Array.isArray(className) ? className.join(' ') : String(className ?? '')
    return /language-([\w-]+)/.exec(classes)?.[1] ?? 'text'
}
